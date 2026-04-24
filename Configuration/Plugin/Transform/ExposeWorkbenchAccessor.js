var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const WebMainMarker = "const instantiationService = workbench.startup();";
const WebMainReplacement = "const instantiationService = workbench.startup();\n// [Land] Expose the live workbench IInstantiationService so Sky-side\n// bridges can resolve internal services (IStatusbarService, ISCMService,\n// ICommandService, \u2026) via\n//   __CEL_INSTANTIATION_SERVICE__.invokeFunction(a => a.get(I\u2026))\nglobalThis.__CEL_INSTANTIATION_SERVICE__ = instantiationService;";
const WebFactoryMarker = "workbenchPromise.complete(workbench);";
const WebFactoryReplacement = 'workbenchPromise.complete(workbench);\n        // [Land] Expose the IWorkbench facade + signal readiness so Sky\'s\n        // SkyBridge + any Astro component can synchronously call\n        // `__CEL_WORKBENCH__.commands.executeCommand(\u2026)`.\n        globalThis.__CEL_WORKBENCH__ = workbench;\n        try { window.dispatchEvent(new Event("cel:workbench-ready")); } catch {}';
const Plugin = {
  Kind: "Transform",
  Name: "ExposeWorkbenchAccessor",
  Match: /* @__PURE__ */ __name(({ Path }) => /\/vs\/workbench\/browser\/web\.main\.js$/.test(Path) || /\/vs\/workbench\/browser\/web\.factory\.js$/.test(Path), "Match"),
  Transform({ Path, Source }) {
    if (Source.includes("__CEL_INSTANTIATION_SERVICE__")) {
      return { Kind: "Unchanged" };
    }
    if (/web\.main\.js$/.test(Path)) {
      if (!Source.includes(WebMainMarker)) return { Kind: "Unchanged" };
      const Next = Source.replace(WebMainMarker, WebMainReplacement);
      return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
    }
    if (/web\.factory\.js$/.test(Path)) {
      if (!Source.includes(WebFactoryMarker)) return { Kind: "Unchanged" };
      const Next = Source.replace(WebFactoryMarker, WebFactoryReplacement);
      return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
    }
    return { Kind: "Unchanged" };
  }
};
var ExposeWorkbenchAccessor_default = Plugin;
export {
  ExposeWorkbenchAccessor_default as default
};
//# sourceMappingURL=ExposeWorkbenchAccessor.js.map
