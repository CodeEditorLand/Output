const n =
		/workbench\/services\/extensions\/(?:electron-browser|browser)\/extensionsScannerService\.js$/,
	t = `import { URI } from '../../../../base/common/uri.js';
import { IExtensionsScannerService } from '../../../../platform/extensionManagement/common/extensionsScannerService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { Emitter } from '../../../../base/common/event.js';

const _t = (Tag, Detail) => { try { performance.mark('land:exthost:' + Tag, Detail ? { detail: Detail } : undefined); } catch {} };
const _w = (...Args) => { try { console.warn('[Land Scanner]', ...Args); } catch {} };

class ExtensionsScannerService {
	constructor(logService) {
		this._logService = logService;
		this.userExtensionsLocation = URI.file('/extensions');
		this._onDidChangeCache = new Emitter();
		this.onDidChangeCache = this._onDidChangeCache.event;
		_t('scanner:construct');
		_w('Constructed');
	}

	async _fetchFromMountain(Method, ForceBuiltin) {
		_t('scanner:fetch:start', { method: Method });
		try {
			const Invoke = globalThis.__TAURI__?.core?.invoke ?? globalThis.__TAURI__?.invoke;
			if (typeof Invoke !== 'function') {
				_t('scanner:fetch:no-tauri');
				_w('No Tauri invoke available');
				return [];
			}
			const RawResult = await Invoke('MountainIPCInvoke', {
				method: Method,
				params: [],
			});
			let Extensions = Array.isArray(RawResult) ? RawResult : [];
			_t('scanner:fetch:result', { method: Method, count: Extensions.length, type: typeof RawResult, isArray: Array.isArray(RawResult) });
			_w('IPC', Method, 'returned', Extensions.length, 'extensions');

			// Both scan paths (system + user) need retry parity. Mountain
			// runs the disk scan asynchronously - the workbench's
			// IExtensionService calls scanAllExtensions = Promise.all([
			// scanSystemExtensions, scanUserExtensions]) at boot. Without
			// the retry on the user-side path, an empty initial response
			// silently passes 0 user extensions through to
			// viewsExtensionPoint and ExtensionsRegistry, which means
			// every user-extension contribution (gitlens panes, clangd
			// views, dependencies trees, contributes.{commands,
			// configuration,languages}) stays unregistered for the rest
			// of the session. The system path was retried; mirror that.
			//
			// 5 retries * exponential backoff capped at 1500 ms - tighter
			// than the original 5 * 1000 ms because Mountain's scan
			// usually finishes in ~500 ms; long retries were padding boot.
			if (Extensions.length === 0 && (
				Method === 'extensions:scanSystemExtensions' ||
				Method === 'extensions:scanUserExtensions'
			)) {
				const Schedule = [100, 200, 400, 800, 1500];
				for (let Retry = 0; Retry < Schedule.length; Retry++) {
					_w('0 extensions for', Method, '- retry', Retry + 1, '/' + Schedule.length, 'in', Schedule[Retry], 'ms');
					await new Promise(R => setTimeout(R, Schedule[Retry]));
					const RetryResult = await Invoke('MountainIPCInvoke', { method: Method, params: [] });
					Extensions = Array.isArray(RetryResult) ? RetryResult : [];
					_t('scanner:fetch:retry', { method: Method, retry: Retry + 1, count: Extensions.length });
					_w('Retry', Retry + 1, 'returned', Extensions.length, 'extensions for', Method);
					if (Extensions.length > 0) break;
				}
			}
			if (Extensions.length === 0) return [];

			const Mapped = [];
			let Errors = 0;
			for (let I = 0; I < Extensions.length; I++) {
				const ext = Extensions[I];
				try {
					// Mountain scanSystem/UserExtensions return an
					// ILocalExtension-WRAPPED shape with identifier.id,
					// manifest.{name,publisher,version,...}, location,
					// isBuiltin, type. The older extensions:getAll path
					// returned a FLAT manifest (name/publisher/version at
					// top level with extensionLocation). Read nested first,
					// fall back to flat so a future backend shape swap does
					// not silently collapse every extension to id='unknown'
					// / name='' / publisher=''.
					const m = (ext.manifest && typeof ext.manifest === 'object') ? ext.manifest : ext;
					const rawLoc = ext.location ?? ext.extensionLocation;
					const location = rawLoc
						? (typeof rawLoc === 'string' ? URI.parse(rawLoc) : URI.revive(rawLoc))
						: URI.file('/extensions/' + (m.name || 'unknown'));
					const id = ext.identifier?.id
						|| ext.identifier?.value
						|| (m.publisher && m.name ? m.publisher + '.' + m.name : m.name)
						|| 'unknown';
					// Mountain's ILocalExtension envelope includes per-path
					// isBuiltin + type + source. Honour the server-side
					// classification so @installed / @builtin split correctly.
					// Fall back to ForceBuiltin when Mountain didn't stamp a
					// value (older envelopes, or the unified getAll path).
					const ExtType = typeof ext.type === 'number' ? ext.type : (ForceBuiltin ? 0 : 1);
					const IsBuiltin = typeof ext.isBuiltin === 'boolean' ? ext.isBuiltin : ForceBuiltin;
					Mapped.push({
						type: ExtType,
						identifier: { id },
						manifest: {
							name: m.name || '',
							publisher: m.publisher || '',
							version: m.version || '0.0.0',
							engines: m.engines || { vscode: '*' },
							main: m.main || undefined,
							browser: m.browser || undefined,
							activationEvents: m.activationEvents || [],
							contributes: m.contributes || {},
							extensionDependencies: m.extensionDependencies || [],
							extensionPack: m.extensionPack || [],
							enabledApiProposals: m.enabledApiProposals || [],
						},
						location,
						isBuiltin: IsBuiltin,
						targetPlatform: ext.targetPlatform || 'undefined',
						isValid: ext.isValid !== false,
						validationMessages: ext.validationMessages || [],
					});
				} catch (e) {
					Errors++;
					if (Errors <= 3) _w('Map error for ext', I, ':', String(e).slice(0, 100));
				}
			}
			_t('scanner:fetch:mapped', { method: Method, mapped: Mapped.length, errors: Errors });
			_w('Mapped', Mapped.length, 'extensions,', Errors, 'errors');
			if (Mapped.length > 0) {
				_w('First:', Mapped[0].identifier.id, 'name:', Mapped[0].manifest.name, 'pub:', Mapped[0].manifest.publisher, 'loc:', Mapped[0].location?.toString?.()?.slice(0, 80));
			}
			return Mapped;
		} catch (e) {
			_t('scanner:fetch:error', { method: Method, message: String(e).slice(0, 200) });
			_w('Fetch error:', String(e).slice(0, 200));
			return [];
		}
	}

	async scanAllExtensions(systemScanOptions, userScanOptions) {
		_t('scanner:scanAll:start');
		const sys = await this.scanSystemExtensions(systemScanOptions);
		const usr = await this.scanUserExtensions(userScanOptions);
		const all = [...sys, ...usr];
		_t('scanner:scanAll:done', { system: sys.length, user: usr.length, total: all.length });
		_w('scanAll:', sys.length, 'system +', usr.length, 'user =', all.length);
		return all;
	}

	async scanSystemExtensions(scanOptions) {
		_t('scanner:scanSystem:start');
		const result = await this._fetchFromMountain('extensions:scanSystemExtensions', true);
		_t('scanner:scanSystem:done', { count: result.length });
		_w('scanSystemExtensions returning', result.length);
		return result;
	}

	async scanUserExtensions(scanOptions) {
		_t('scanner:scanUser:start');
		const result = await this._fetchFromMountain('extensions:scanUserExtensions', false);
		_t('scanner:scanUser:done', { count: result.length });
		_w('scanUserExtensions returning', result.length);
		return result;
	}

	getTargetPlatform() { return Promise.resolve('undefined'); }
	getProductVersion() { return { version: '0.0.1', date: undefined }; }
	async scanAllUserExtensions(scanOptions) { return await this.scanUserExtensions(scanOptions); }
	async scanExtensionsUnderDevelopment(existingExtensions, scanOptions) { _t('scanner:scanDev'); return []; }
	async scanExistingExtension(extensionLocation, extensionType, scanOptions) { return null; }
	async scanOneOrMultipleExtensions(extensionLocation, extensionType, scanOptions) { return []; }
	async scanMetadata(extensionLocation) { return undefined; }
	async updateMetadata(extensionLocation, metadata) { return undefined; }
	async initializeDefaultProfileExtensions() { _t('scanner:initDefaults'); }
}

var __decorate = function(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
	return function(target, key) { decorator(target, key, paramIndex); };
};
ExtensionsScannerService = __decorate([
	__param(0, ILogService)
], ExtensionsScannerService);

registerSingleton(IExtensionsScannerService, ExtensionsScannerService, InstantiationType.Delayed);
export { ExtensionsScannerService, IExtensionsScannerService };
`,
	s = {
		Kind: "Transform",
		Name: "ExtensionScannerIPC",
		Match: ({ Path: e }) => n.test(e),
		Transform() {
			return { Kind: "Rewrite", Source: t };
		},
	};
var r = s;
export { r as default };
