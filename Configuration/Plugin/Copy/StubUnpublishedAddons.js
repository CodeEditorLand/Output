var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { join } from "node:path";
const DefaultStubs = [
  {
    Package: "@xterm/addon-progress",
    Body: "define([],function(){var n=function(){};var P=function(){this.activate=n;this.dispose=n;this.onChange=function(){return{dispose:n}}};return{ProgressAddon:P}})"
  }
];
const DataPrefix = "data:text/javascript,";
const StubUnpublishedAddons = /* @__PURE__ */ __name(({
  Destination,
  Stubs = DefaultStubs
}) => ({
  Kind: "Copy",
  Name: "StubUnpublishedAddons",
  Entries: Stubs.map((Stub) => {
    const FileName = Stub.Package.split("/").pop();
    return {
      From: [DataPrefix + Stub.Body],
      To: join(Destination, Stub.Package, "lib", `${FileName}.js`)
    };
  })
}), "StubUnpublishedAddons");
const StubDataPrefix = DataPrefix;
var StubUnpublishedAddons_default = StubUnpublishedAddons;
export {
  DefaultStubs,
  StubDataPrefix,
  StubUnpublishedAddons,
  StubUnpublishedAddons_default as default
};
//# sourceMappingURL=StubUnpublishedAddons.js.map
