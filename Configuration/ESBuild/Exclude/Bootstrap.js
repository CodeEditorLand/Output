var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var Bootstrap_default = /* @__PURE__ */ __name((Prefix) => [
  // When compiling from src/, bootstrap files are at the root of out/
  // (not in a "out" subdirectory since we're not using VSCode's prebuilt structure)
  "bootstrap-cli.js",
  "bootstrap-fork.js",
  "bootstrap-node.js",
  "bootstrap-server.js",
  "cli.js",
  "main.js",
  "server-cli.js",
  "server-main.js",
  // These are specific to VSCode's output structure, keep them
  `${Prefix}/code/node/cli.js`,
  `${Prefix}/code/node/cliProcessMain.js`,
  `${Prefix}/workbench/workbench.desktop.main.js`
], "default");
export {
  Bootstrap_default as default
};
//# sourceMappingURL=Bootstrap.js.map
