var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { ExtHostContext, MainContext, MainThreadUrlsShape, ExtHostUrlsShape } from "../common/extHost.protocol.js";
import { extHostNamedCustomer, IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { IURLService, IOpenURLOptions } from "../../../platform/url/common/url.js";
import { URI, UriComponents } from "../../../base/common/uri.js";
import { IDisposable } from "../../../base/common/lifecycle.js";
import { IExtensionContributedURLHandler, IExtensionUrlHandler } from "../../services/extensions/browser/extensionUrlHandler.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
class ExtensionUrlHandler {
  constructor(proxy, handle, extensionId, extensionDisplayName) {
    this.proxy = proxy;
    this.handle = handle;
    this.extensionId = extensionId;
    this.extensionDisplayName = extensionDisplayName;
  }
  static {
    __name(this, "ExtensionUrlHandler");
  }
  handleURL(uri, options) {
    if (!ExtensionIdentifier.equals(this.extensionId, uri.authority)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(this.proxy.$handleExternalUri(this.handle, uri)).then(() => true);
  }
}
let MainThreadUrls = class {
  constructor(context, urlService, extensionUrlHandler) {
    this.urlService = urlService;
    this.extensionUrlHandler = extensionUrlHandler;
    this.proxy = context.getProxy(ExtHostContext.ExtHostUrls);
  }
  proxy;
  handlers = /* @__PURE__ */ new Map();
  $registerUriHandler(handle, extensionId, extensionDisplayName) {
    const handler = new ExtensionUrlHandler(this.proxy, handle, extensionId, extensionDisplayName);
    const disposable = this.urlService.registerHandler(handler);
    this.handlers.set(handle, { extensionId, disposable });
    this.extensionUrlHandler.registerExtensionHandler(extensionId, handler);
    return Promise.resolve(void 0);
  }
  $unregisterUriHandler(handle) {
    const tuple = this.handlers.get(handle);
    if (!tuple) {
      return Promise.resolve(void 0);
    }
    const { extensionId, disposable } = tuple;
    this.extensionUrlHandler.unregisterExtensionHandler(extensionId);
    this.handlers.delete(handle);
    disposable.dispose();
    return Promise.resolve(void 0);
  }
  async $createAppUri(uri) {
    return this.urlService.create(uri);
  }
  dispose() {
    this.handlers.forEach(({ disposable }) => disposable.dispose());
    this.handlers.clear();
  }
};
__name(MainThreadUrls, "MainThreadUrls");
MainThreadUrls = __decorateClass([
  extHostNamedCustomer(MainContext.MainThreadUrls),
  __decorateParam(1, IURLService),
  __decorateParam(2, IExtensionUrlHandler)
], MainThreadUrls);
export {
  MainThreadUrls
};
//# sourceMappingURL=mainThreadUrls.js.map
