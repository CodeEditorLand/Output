/**
 * Replace VS Code's `ExtensionGalleryService` body with a no-op
 * stub.
 *
 * Same body-rewrite rationale as `ReplaceTelemetryService.ts`. The
 * gallery service talks to `marketplace.visualstudio.com` for
 * search / install / update of extensions. Land does not - user
 * extensions are sideloaded from `~/.land/extensions/` and
 * managed by `IExtensionManagementService` (which stays live).
 * Built-in extensions ship with the binary.
 *
 * The no-op stub returns:
 *   - empty arrays for query results
 *   - rejected promises for install / download
 *   - `false` for isExtensionCompatible / canInstall
 *
 * Consumers that import this module (the Extensions sidebar's
 * "Browse marketplace" view, the recommendation services) still
 * resolve their imports but the calls are inert. The Extensions
 * panel still works for already-installed extensions; it just
 * cannot fetch new ones from MS.
 *
 * # API surface preserved
 *
 * Mirrors the `IExtensionGalleryService` interface from
 * `vs/platform/extensionManagement/common/extensionManagement.ts`.
 */

import type { TransformPlugin } from "../Type.js";

const PathRegex =
	/vs\/platform\/extensionManagement\/common\/extensionGalleryService\.js$/;

const Stub = `// LAND-PATCH: extensionGalleryService body replaced with no-op stub.
// See Land/Element/Output/Source/Plugin/Transform/ReplaceExtensionGalleryService.ts.
const EMPTY_PAGER = {
	firstPage: [],
	total: 0,
	pageSize: 50,
	getPage: async () => [],
};
const REJECT = (op) => () =>
	Promise.reject(new Error("[LandFix] ExtensionGalleryService is no-op (offline marketplace): " + op));

class NullExtensionGalleryService {
	constructor() {
		this._serviceBrand = undefined;
	}
	isEnabled() {
		return false;
	}
	async query(_options, _token) {
		return EMPTY_PAGER;
	}
	async getExtensions(_extensionInfos, _arg2, _arg3) {
		return [];
	}
	async isExtensionCompatible(_extension) {
		return false;
	}
	async getCompatibleExtension(_extension, _includePreRelease, _targetPlatform) {
		return null;
	}
	async getAllCompatibleVersions(_extension, _includePreRelease, _targetPlatform) {
		return [];
	}
	async download(_extension, _location, _operation) {
		return REJECT("download")();
	}
	async downloadSignatureArchive(_extension, _location) {
		return REJECT("downloadSignatureArchive")();
	}
	async reportStatistic(_publisher, _name, _version, _type) {}
	async getReadme(_extension, _token) {
		return "";
	}
	async getManifest(_extension, _token) {
		return null;
	}
	async getChangelog(_extension, _token) {
		return "";
	}
	async getCoreTranslation(_extension, _languageId) {
		return null;
	}
	async getExtensionsControlManifest() {
		return { malicious: [], deprecated: {}, search: [] };
	}
	async getExtensionMcpManifest() {
		return null;
	}
}

export { NullExtensionGalleryService as ExtensionGalleryService };
export { NullExtensionGalleryService as AbstractExtensionGalleryService };
export const ExtensionGalleryService_default = NullExtensionGalleryService;
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceExtensionGalleryService",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		return { Kind: "Rewrite", Source: Stub };
	},
};

export default Plugin;
