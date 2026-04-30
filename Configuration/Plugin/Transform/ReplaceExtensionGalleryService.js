var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const PathRegex = /vs\/platform\/extensionManagement\/common\/extensionGalleryService\.js$/;
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
const Plugin = {
  Kind: "Transform",
  Name: "ReplaceExtensionGalleryService",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform() {
    return { Kind: "Rewrite", Source: Stub };
  }
};
var ReplaceExtensionGalleryService_default = Plugin;
export {
  ReplaceExtensionGalleryService_default as default
};
//# sourceMappingURL=ReplaceExtensionGalleryService.js.map
