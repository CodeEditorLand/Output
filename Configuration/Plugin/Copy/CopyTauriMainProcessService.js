var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const CopyTauriMainProcessService = /* @__PURE__ */ __name(({
  OutputService,
  WindService,
  Destination
}) => ({
  Kind: "Copy",
  Name: "CopyTauriMainProcessService",
  Enabled: /* @__PURE__ */ __name(() => process.env["Electron"] === "true", "Enabled"),
  Entries: [
    {
      From: [OutputService, WindService],
      To: Destination
    }
  ]
}), "CopyTauriMainProcessService");
var CopyTauriMainProcessService_default = CopyTauriMainProcessService;
export {
  CopyTauriMainProcessService,
  CopyTauriMainProcessService_default as default
};
//# sourceMappingURL=CopyTauriMainProcessService.js.map
