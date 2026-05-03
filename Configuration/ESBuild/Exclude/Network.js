var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var Network_default = /* @__PURE__ */ __name((Prefix) => [
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
  `${Prefix}/workbench/contrib/welcomeViews/browser/walkthroughBundles.js`
], "default");
export {
  Network_default as default
};
//# sourceMappingURL=Network.js.map
