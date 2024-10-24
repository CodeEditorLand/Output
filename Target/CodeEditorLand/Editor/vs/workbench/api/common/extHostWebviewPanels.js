var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Emitter } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { generateUuid } from "../../../base/common/uuid.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import * as typeConverters from "./extHostTypeConverters.js";
import { serializeWebviewOptions, ExtHostWebview, ExtHostWebviews, toExtensionData, shouldSerializeBuffersForPostMessage } from "./extHostWebview.js";
import { IExtHostWorkspace } from "./extHostWorkspace.js";
import { EditorGroupColumn } from "../../services/editor/common/editorGroupColumn.js";
import * as extHostProtocol from "./extHost.protocol.js";
import * as extHostTypes from "./extHostTypes.js";
class ExtHostWebviewPanel extends Disposable {
  static {
    __name(this, "ExtHostWebviewPanel");
  }
  #handle;
  #proxy;
  #viewType;
  #webview;
  #options;
  #title;
  #iconPath;
  #viewColumn = void 0;
  #visible = true;
  #active;
  #isDisposed = false;
  #onDidDispose = this._register(new Emitter());
  onDidDispose = this.#onDidDispose.event;
  #onDidChangeViewState = this._register(new Emitter());
  onDidChangeViewState = this.#onDidChangeViewState.event;
  constructor(handle, proxy, webview, params) {
    super();
    this.#handle = handle;
    this.#proxy = proxy;
    this.#webview = webview;
    this.#viewType = params.viewType;
    this.#options = params.panelOptions;
    this.#viewColumn = params.viewColumn;
    this.#title = params.title;
    this.#active = params.active;
  }
  dispose() {
    if (this.#isDisposed) {
      return;
    }
    this.#isDisposed = true;
    this.#onDidDispose.fire();
    this.#proxy.$disposeWebview(this.#handle);
    this.#webview.dispose();
    super.dispose();
  }
  get webview() {
    this.assertNotDisposed();
    return this.#webview;
  }
  get viewType() {
    this.assertNotDisposed();
    return this.#viewType;
  }
  get title() {
    this.assertNotDisposed();
    return this.#title;
  }
  set title(value) {
    this.assertNotDisposed();
    if (this.#title !== value) {
      this.#title = value;
      this.#proxy.$setTitle(this.#handle, value);
    }
  }
  get iconPath() {
    this.assertNotDisposed();
    return this.#iconPath;
  }
  set iconPath(value) {
    this.assertNotDisposed();
    if (this.#iconPath !== value) {
      this.#iconPath = value;
      this.#proxy.$setIconPath(this.#handle, URI.isUri(value) ? { light: value, dark: value } : value);
    }
  }
  get options() {
    return this.#options;
  }
  get viewColumn() {
    this.assertNotDisposed();
    if (typeof this.#viewColumn === "number" && this.#viewColumn < 0) {
      return void 0;
    }
    return this.#viewColumn;
  }
  get active() {
    this.assertNotDisposed();
    return this.#active;
  }
  get visible() {
    this.assertNotDisposed();
    return this.#visible;
  }
  _updateViewState(newState) {
    if (this.#isDisposed) {
      return;
    }
    if (this.active !== newState.active || this.visible !== newState.visible || this.viewColumn !== newState.viewColumn) {
      this.#active = newState.active;
      this.#visible = newState.visible;
      this.#viewColumn = newState.viewColumn;
      this.#onDidChangeViewState.fire({ webviewPanel: this });
    }
  }
  reveal(viewColumn, preserveFocus) {
    this.assertNotDisposed();
    this.#proxy.$reveal(this.#handle, {
      viewColumn: typeof viewColumn === "undefined" ? void 0 : typeConverters.ViewColumn.from(viewColumn),
      preserveFocus: !!preserveFocus
    });
  }
  assertNotDisposed() {
    if (this.#isDisposed) {
      throw new Error("Webview is disposed");
    }
  }
}
class ExtHostWebviewPanels extends Disposable {
  constructor(mainContext, webviews, workspace) {
    super();
    this.webviews = webviews;
    this.workspace = workspace;
    this._proxy = mainContext.getProxy(extHostProtocol.MainContext.MainThreadWebviewPanels);
  }
  static {
    __name(this, "ExtHostWebviewPanels");
  }
  static newHandle() {
    return generateUuid();
  }
  _proxy;
  _webviewPanels = /* @__PURE__ */ new Map();
  _serializers = /* @__PURE__ */ new Map();
  dispose() {
    super.dispose();
    this._webviewPanels.forEach((value) => value.dispose());
    this._webviewPanels.clear();
  }
  createWebviewPanel(extension, viewType, title, showOptions, options = {}) {
    const viewColumn = typeof showOptions === "object" ? showOptions.viewColumn : showOptions;
    const webviewShowOptions = {
      viewColumn: typeConverters.ViewColumn.from(viewColumn),
      preserveFocus: typeof showOptions === "object" && !!showOptions.preserveFocus
    };
    const serializeBuffersForPostMessage = shouldSerializeBuffersForPostMessage(extension);
    const handle = ExtHostWebviewPanels.newHandle();
    this._proxy.$createWebviewPanel(toExtensionData(extension), handle, viewType, {
      title,
      panelOptions: serializeWebviewPanelOptions(options),
      webviewOptions: serializeWebviewOptions(extension, this.workspace, options),
      serializeBuffersForPostMessage
    }, webviewShowOptions);
    const webview = this.webviews.createNewWebview(handle, options, extension);
    const panel = this.createNewWebviewPanel(handle, viewType, title, viewColumn, options, webview, true);
    return panel;
  }
  $onDidChangeWebviewPanelViewStates(newStates) {
    const handles = Object.keys(newStates);
    handles.sort((a, b) => {
      const stateA = newStates[a];
      const stateB = newStates[b];
      if (stateA.active) {
        return 1;
      }
      if (stateB.active) {
        return -1;
      }
      return +stateA.visible - +stateB.visible;
    });
    for (const handle of handles) {
      const panel = this.getWebviewPanel(handle);
      if (!panel) {
        continue;
      }
      const newState = newStates[handle];
      panel._updateViewState({
        active: newState.active,
        visible: newState.visible,
        viewColumn: typeConverters.ViewColumn.to(newState.position)
      });
    }
  }
  async $onDidDisposeWebviewPanel(handle) {
    const panel = this.getWebviewPanel(handle);
    panel?.dispose();
    this._webviewPanels.delete(handle);
    this.webviews.deleteWebview(handle);
  }
  registerWebviewPanelSerializer(extension, viewType, serializer) {
    if (this._serializers.has(viewType)) {
      throw new Error(`Serializer for '${viewType}' already registered`);
    }
    this._serializers.set(viewType, { serializer, extension });
    this._proxy.$registerSerializer(viewType, {
      serializeBuffersForPostMessage: shouldSerializeBuffersForPostMessage(extension)
    });
    return new extHostTypes.Disposable(() => {
      this._serializers.delete(viewType);
      this._proxy.$unregisterSerializer(viewType);
    });
  }
  async $deserializeWebviewPanel(webviewHandle, viewType, initData, position) {
    const entry = this._serializers.get(viewType);
    if (!entry) {
      throw new Error(`No serializer found for '${viewType}'`);
    }
    const { serializer, extension } = entry;
    const webview = this.webviews.createNewWebview(webviewHandle, initData.webviewOptions, extension);
    const revivedPanel = this.createNewWebviewPanel(webviewHandle, viewType, initData.title, position, initData.panelOptions, webview, initData.active);
    await serializer.deserializeWebviewPanel(revivedPanel, initData.state);
  }
  createNewWebviewPanel(webviewHandle, viewType, title, position, options, webview, active) {
    const panel = new ExtHostWebviewPanel(webviewHandle, this._proxy, webview, { viewType, title, viewColumn: position, panelOptions: options, active });
    this._webviewPanels.set(webviewHandle, panel);
    return panel;
  }
  getWebviewPanel(handle) {
    return this._webviewPanels.get(handle);
  }
}
function serializeWebviewPanelOptions(options) {
  return {
    enableFindWidget: options.enableFindWidget,
    retainContextWhenHidden: options.retainContextWhenHidden
  };
}
__name(serializeWebviewPanelOptions, "serializeWebviewPanelOptions");
export {
  ExtHostWebviewPanels
};
//# sourceMappingURL=extHostWebviewPanels.js.map
