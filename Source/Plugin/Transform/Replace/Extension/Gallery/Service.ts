/**
 * Replace VS Code's `ExtensionGalleryService` body with a no-op stub.
 *
 * Same body-rewrite rationale as `ReplaceTelemetryService.ts`. The gallery
 * service talks to `marketplace.visualstudio.com` for search / install /
 * update of extensions. Land does not - user extensions are sideloaded
 * from `~/.land/extensions/` and managed by `IExtensionManagementService`
 * (which stays live). Built-in extensions ship with the binary.
 *
 * The canonical no-op stub is authored at
 * `Element/Output/Source/Service/CELNullExtensionGalleryService.ts` and
 * dropped by `ApplyPipeline.ts` at
 * `vs/platform/extensionManagement/common/CELNullExtensionGalleryService.js`
 * BEFORE this transform runs. The transform reduces the original module
 * body to a one-line re-export pointing at the canonical sibling.
 */

import type { TransformPlugin } from "../../../../Type.js";

const PathRegex =
	/vs\/platform\/extensionManagement\/common\/extensionGalleryService\.js$/;

const ReExport =
	"export { ExtensionGalleryService, AbstractExtensionGalleryService, ExtensionGalleryService_default } from './CELNullExtensionGalleryService.js';\n" +
	"export { default } from './CELNullExtensionGalleryService.js';\n";

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "ReplaceExtensionGalleryService",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
