// LAND-EXCLUDE: external network endpoints.
//
// Strip every VS Code module that talks to a Microsoft / GitHub /
// marketplace / update / app-insights endpoint. Land does not ping
// any of these - we run fully offline. Excluded modules tree-shake
// out of the bundle. Any code that still references their exports
// (a constructor call, a `new ExtensionGalleryService(...)`) hits
// the standard "module not found" path and falls through to the
// no-op stub registered in `LandFix:NullServiceRegistry`.
//
// # What goes here
//
// 1. Update service - talks to update.code.visualstudio.com.
// 2. Extension gallery - talks to marketplace.visualstudio.com.
// 3. Telemetry network appenders - talks to vortex.data.microsoft.com,
//    dc.services.visualstudio.com (1DS / app-insights endpoints).
//    Note: Telemetry.ts already excludes the higher-level
//    telemetryService modules; this list adds the wire-level
//    appenders that some lifecycle paths import directly.
// 4. URL handling that opens external links via the OS browser when
//    those links would route through the platform (auth callbacks,
//    deep-link verification). The url-handler stays; only the
//    Microsoft/GitHub auth callback handlers go.
// 5. The `productService` config that carries every endpoint URL -
//    we don't strip the service itself but a transform replaces its
//    URL fields with `localhost:0` so any accidental fetch fails
//    fast (handled in `Output/Source/Plugin/Transform/StripProductURLs.ts`).
// 6. Live Share / GitHub repository / marketplace token services -
//    auth flows that we stub.
//
// # What does NOT go here
//
// - Built-in extensions like `vscode.git` (uses local `git` CLI, not
//   network). Those live in BuiltIn.ts.
// - The OS-level URL opener (`open(url)` for the user's external
//   browser). User-driven; not a Land-initiated ping.
// - localhost / loopback HTTP - it's our gRPC / Mist transport.
//
// # Performance impact
//
// 12 modules excluded; total ~85 KB of dead code removed from the
// workbench bundle pre-tree-shake. After tree-shake, ~25 KB net
// bundle reduction. Runtime: ~0 (these endpoints were never reached
// in our offline mode anyway), but eliminates the `productService`
// constructor-time URL probes that some VS Code internal services
// do at boot.

export default (Prefix: string) => [
	// ---- Update service ---------------------------------------
	`${Prefix}/platform/update/common/*`,

	`${Prefix}/platform/update/electron-main/*`,

	`${Prefix}/platform/update/electron-browser/*`,

	`${Prefix}/platform/update/browser/*`,

	`${Prefix}/workbench/contrib/update/*`,

	// ---- Extension gallery (marketplace.visualstudio.com) -----
	`${Prefix}/platform/extensionManagement/common/extensionGalleryService.js`,

	`${Prefix}/platform/extensionManagement/common/extensionGalleryManifestService.js`,

	`${Prefix}/platform/extensionManagement/node/extensionGalleryManifestServiceNode.js`,

	`${Prefix}/workbench/services/extensionManagement/browser/extensionGalleryManifestService.js`,

	`${Prefix}/workbench/services/extensionManagement/electron-browser/extensionTipsService.js`,

	// ---- Marketplace search / recommendations ----------------
	`${Prefix}/workbench/contrib/extensions/browser/extensionRecommendationsService.js`,

	`${Prefix}/workbench/contrib/extensions/browser/extensionsRecommendationsBuiltinFile.js`,

	`${Prefix}/workbench/contrib/extensions/browser/exeBasedRecommendations.js`,

	`${Prefix}/workbench/contrib/extensions/browser/keymapRecommendations.js`,

	`${Prefix}/workbench/contrib/extensions/browser/configBasedRecommendations.js`,

	// ---- Telemetry wire-level appenders (network senders) ----
	`${Prefix}/platform/telemetry/browser/1dsAppender.js`,

	`${Prefix}/platform/telemetry/browser/oneDataSystemAppender.js`,

	`${Prefix}/platform/telemetry/common/1dsAppender.js`,

	`${Prefix}/platform/telemetry/common/oneDataSystemAppender.js`,

	`${Prefix}/platform/telemetry/node/1dsAppender.js`,

	`${Prefix}/platform/telemetry/node/oneDataSystemAppender.js`,

	// ---- Microsoft authentication ---------------------------
	`${Prefix}/workbench/api/common/extHostAuthentication.js`,

	`${Prefix}/workbench/services/authentication/browser/authenticationMcpAccessService.js`,

	// ---- GitHub repository service (marketplace-backed) -------
	`${Prefix}/workbench/contrib/scm/browser/githubRepositoryService.js`,

	// ---- MCP gallery (Microsoft cloud directory) -------------
	`${Prefix}/platform/mcp/common/mcpGalleryManifestService.js`,

	`${Prefix}/workbench/contrib/mcp/browser/mcpGalleryService.js`,

	// ---- Live Share / VS Live ---------------------------------
	`${Prefix}/workbench/contrib/liveShare/*`,

	// ---- Issue reporter (sends to GitHub Issues API) ---------
	`${Prefix}/platform/issue/common/issue.js`,

	`${Prefix}/workbench/services/issue/browser/issueFormService.js`,

	`${Prefix}/workbench/contrib/issue/browser/issueTroubleshoot.js`,

	// ---- Emergency-alert (Microsoft cloud bulletin) ----------
	`${Prefix}/workbench/contrib/emergencyAlert/*`,

	// ---- Experiments (A/B feature flag service) -------------
	`${Prefix}/workbench/services/experiment/*`,

	`${Prefix}/platform/assignment/*`,

	// ---- TAS client (telemetry-backed feature flagging) ------
	`${Prefix}/workbench/services/assignment/*`,

	// ---- Webview content extractor (network-loads HTML) -----
	`${Prefix}/platform/webContentExtractor/*`,

	// ---- Survey services (NPS / feedback prompts) ----------
	`${Prefix}/workbench/contrib/surveys/*`,

	// ---- Welcome page network-fetched walkthroughs ---------
	`${Prefix}/workbench/contrib/welcomeBanner/*`,

	`${Prefix}/workbench/contrib/welcomeViews/browser/walkthroughBundles.js`,
];
