var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
(async function() {
  const bootstrapWindow = window.MonacoBootstrapWindow;
  const { result, configuration } = await bootstrapWindow.load("vs/workbench/contrib/issue/electron-sandbox/issueReporterMain", {
    configureDeveloperSettings: /* @__PURE__ */ __name(function() {
      return {
        forceEnableDeveloperKeybindings: true,
        disallowReloadKeybinding: true
      };
    }, "configureDeveloperSettings")
  });
  result.startup(configuration);
})();
//# sourceMappingURL=issueReporter.js.map
