var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const InertBody = "// [Land] disabled by DisableUnusedServices transform.\nexport default {};\n";
const DisablePathSegments = [
  // A. Auto-update
  "workbench/contrib/update/browser/update.contribution.js",
  "workbench/contrib/update/electron-browser/update.contribution.js",
  // B. Issue reporter
  "workbench/contrib/issue/browser/issue.contribution.js",
  "workbench/contrib/issue/electron-browser/issue.contribution.js",
  // C. MS account / settings sync UI surface
  "workbench/contrib/userDataSync/browser/userDataSync.contribution.js",
  // D. Process explorer - electron-shell window with a live PID list.
  //    No matching Mountain side; previously rendered an empty pane.
  //
  // (`welcomeGettingStarted.contribution.js` is intentionally left
  // alive: it registers the `walkthrough.*` commands and a few view
  // containers other contributions reference. Disabling silently
  // breaks the Help menu surface.)
  "workbench/contrib/processExplorer/electron-browser/processExplorer.contribution.js"
];
const PathRegex = new RegExp(
  `(?:${DisablePathSegments.map(
    (P) => P.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|")})$`
);
const Plugin = {
  Kind: "Transform",
  Name: "DisableUnusedServices",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes("[Land] disabled by DisableUnusedServices")) {
      return { Kind: "Unchanged" };
    }
    return { Kind: "Rewrite", Source: InertBody };
  }
};
var Services_default = Plugin;
export {
  Services_default as default
};
//# sourceMappingURL=Services.js.map
