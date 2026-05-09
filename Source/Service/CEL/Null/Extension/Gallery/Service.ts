// @ts-nocheck
/**
 * @module CELNullExtensionGalleryService
 *
 * No-op stub for VS Code's `ExtensionGalleryService`. Land does not talk
 * to `marketplace.visualstudio.com`. User extensions are sideloaded from
 * `~/.land/extensions/` and managed by `IExtensionManagementService`
 * (which stays live). Built-in extensions ship with the binary.
 *
 * Returns:
 *   - empty arrays for query results
 *   - rejected promises for install / download
 *   - `false` for `isExtensionCompatible` / `canInstall`
 *
 * Consumers that import this module (the Extensions sidebar's "Browse
 * marketplace" view, the recommendation services) still resolve their
 * imports but the calls are inert. The Extensions panel still works for
 * already-installed extensions; it just cannot fetch new ones from MS.
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELNullExtensionGalleryService.js` and
 * `ApplyPipeline.ts` drops at
 * `Target/Microsoft/VSCode/vs/platform/extensionManagement/common/
 * CELNullExtensionGalleryService.js`. The `ReplaceExtensionGalleryService`
 * transform reduces the original module body to a one-line re-export
 * pointing here.
 */

const EmptyPager = {
	firstPage: [] as unknown[],

	total: 0,

	pageSize: 50,

	getPage: async (): Promise<unknown[]> => [],
};

const Reject = (Operation: string) => (): Promise<never> =>
	Promise.reject(
		new Error(
			"[LandFix] ExtensionGalleryService is no-op (offline marketplace): " +
				Operation,
		),
	);

class NullExtensionGalleryService {
	readonly _serviceBrand: undefined = undefined;

	isEnabled(): boolean {
		return false;
	}

	async query(
		_Options: unknown,

		_Token: unknown,
	): Promise<typeof EmptyPager> {
		return EmptyPager;
	}

	async getExtensions(
		_ExtensionInfos: unknown,

		_Arg2?: unknown,

		_Arg3?: unknown,
	): Promise<unknown[]> {
		return [];
	}

	async isExtensionCompatible(_Extension: unknown): Promise<boolean> {
		return false;
	}

	async getCompatibleExtension(
		_Extension: unknown,

		_IncludePreRelease: unknown,

		_TargetPlatform: unknown,
	): Promise<null> {
		return null;
	}

	async getAllCompatibleVersions(
		_Extension: unknown,

		_IncludePreRelease: unknown,

		_TargetPlatform: unknown,
	): Promise<unknown[]> {
		return [];
	}

	async download(
		_Extension: unknown,

		_Location: unknown,

		_Operation: unknown,
	): Promise<never> {
		return Reject("download")();
	}

	async downloadSignatureArchive(
		_Extension: unknown,

		_Location: unknown,
	): Promise<never> {
		return Reject("downloadSignatureArchive")();
	}

	async reportStatistic(
		_Publisher: unknown,

		_Name: unknown,

		_Version: unknown,

		_Type: unknown,
	): Promise<void> {}

	async getReadme(_Extension: unknown, _Token: unknown): Promise<string> {
		return "";
	}

	async getManifest(_Extension: unknown, _Token: unknown): Promise<null> {
		return null;
	}

	async getChangelog(_Extension: unknown, _Token: unknown): Promise<string> {
		return "";
	}

	async getCoreTranslation(
		_Extension: unknown,

		_LanguageId: unknown,
	): Promise<null> {
		return null;
	}

	async getExtensionsControlManifest(): Promise<{
		malicious: unknown[];

		deprecated: Record<string, unknown>;

		search: unknown[];
	}> {
		return { malicious: [], deprecated: {}, search: [] };
	}

	async getExtensionMcpManifest(): Promise<null> {
		return null;
	}
}

export { NullExtensionGalleryService as ExtensionGalleryService };

export { NullExtensionGalleryService as AbstractExtensionGalleryService };

export const ExtensionGalleryService_default = NullExtensionGalleryService;

export default NullExtensionGalleryService;
