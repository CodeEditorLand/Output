var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var EditContext;
((EditContext2) => {
  function supported(obj) {
    return typeof obj?.EditContext === "function";
  }
  EditContext2.supported = supported;
  __name(supported, "supported");
  function create(window, options) {
    return new window.EditContext(options);
  }
  EditContext2.create = create;
  __name(create, "create");
})(EditContext || (EditContext = {}));
export {
  EditContext
};
//# sourceMappingURL=editContextFactory.js.map
