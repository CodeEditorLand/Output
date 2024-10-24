var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../base/common/cancellation.js";
import { Emitter } from "../../../base/common/event.js";
import { dispose, IDisposable } from "../../../base/common/lifecycle.js";
import { ExtHostCommands } from "./extHostCommands.js";
import { IExtHostWorkspaceProvider } from "./extHostWorkspace.js";
import { InputBox, InputBoxOptions, InputBoxValidationMessage, QuickInput, QuickInputButton, QuickPick, QuickPickItem, QuickPickItemButtonEvent, QuickPickOptions, WorkspaceFolder, WorkspaceFolderPickOptions } from "vscode";
import { ExtHostQuickOpenShape, IMainContext, MainContext, TransferQuickInput, TransferQuickInputButton, TransferQuickPickItemOrSeparator } from "./extHost.protocol.js";
import { URI } from "../../../base/common/uri.js";
import { ThemeIcon, QuickInputButtons, QuickPickItemKind, InputBoxValidationSeverity } from "./extHostTypes.js";
import { isCancellationError } from "../../../base/common/errors.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import { coalesce } from "../../../base/common/arrays.js";
import Severity from "../../../base/common/severity.js";
import { ThemeIcon as ThemeIconUtils } from "../../../base/common/themables.js";
import { isProposedApiEnabled } from "../../services/extensions/common/extensions.js";
import { MarkdownString } from "./extHostTypeConverters.js";
function createExtHostQuickOpen(mainContext, workspace, commands) {
  const proxy = mainContext.getProxy(MainContext.MainThreadQuickOpen);
  class ExtHostQuickOpenImpl {
    static {
      __name(this, "ExtHostQuickOpenImpl");
    }
    _workspace;
    _commands;
    _onDidSelectItem;
    _validateInput;
    _sessions = /* @__PURE__ */ new Map();
    _instances = 0;
    constructor(workspace2, commands2) {
      this._workspace = workspace2;
      this._commands = commands2;
    }
    showQuickPick(extension, itemsOrItemsPromise, options, token = CancellationToken.None) {
      this._onDidSelectItem = void 0;
      const itemsPromise = Promise.resolve(itemsOrItemsPromise);
      const instance = ++this._instances;
      const quickPickWidget = proxy.$show(instance, {
        title: options?.title,
        placeHolder: options?.placeHolder,
        matchOnDescription: options?.matchOnDescription,
        matchOnDetail: options?.matchOnDetail,
        ignoreFocusLost: options?.ignoreFocusOut,
        canPickMany: options?.canPickMany
      }, token);
      const widgetClosedMarker = {};
      const widgetClosedPromise = quickPickWidget.then(() => widgetClosedMarker);
      return Promise.race([widgetClosedPromise, itemsPromise]).then((result) => {
        if (result === widgetClosedMarker) {
          return void 0;
        }
        const allowedTooltips = isProposedApiEnabled(extension, "quickPickItemTooltip");
        return itemsPromise.then((items) => {
          const pickItems = [];
          for (let handle = 0; handle < items.length; handle++) {
            const item = items[handle];
            if (typeof item === "string") {
              pickItems.push({ label: item, handle });
            } else if (item.kind === QuickPickItemKind.Separator) {
              pickItems.push({ type: "separator", label: item.label });
            } else {
              if (item.tooltip && !allowedTooltips) {
                console.warn(`Extension '${extension.identifier.value}' uses a tooltip which is proposed API that is only available when running out of dev or with the following command line switch: --enable-proposed-api ${extension.identifier.value}`);
              }
              const icon = item.iconPath ? getIconPathOrClass(item.iconPath) : void 0;
              pickItems.push({
                label: item.label,
                iconPath: icon?.iconPath,
                iconClass: icon?.iconClass,
                description: item.description,
                detail: item.detail,
                picked: item.picked,
                alwaysShow: item.alwaysShow,
                tooltip: allowedTooltips ? MarkdownString.fromStrict(item.tooltip) : void 0,
                handle
              });
            }
          }
          if (options && typeof options.onDidSelectItem === "function") {
            this._onDidSelectItem = (handle) => {
              options.onDidSelectItem(items[handle]);
            };
          }
          proxy.$setItems(instance, pickItems);
          return quickPickWidget.then((handle) => {
            if (typeof handle === "number") {
              return items[handle];
            } else if (Array.isArray(handle)) {
              return handle.map((h) => items[h]);
            }
            return void 0;
          });
        });
      }).then(void 0, (err) => {
        if (isCancellationError(err)) {
          return void 0;
        }
        proxy.$setError(instance, err);
        return Promise.reject(err);
      });
    }
    $onItemSelected(handle) {
      this._onDidSelectItem?.(handle);
    }
    // ---- input
    showInput(options, token = CancellationToken.None) {
      this._validateInput = options?.validateInput;
      return proxy.$input(options, typeof this._validateInput === "function", token).then(void 0, (err) => {
        if (isCancellationError(err)) {
          return void 0;
        }
        return Promise.reject(err);
      });
    }
    async $validateInput(input) {
      if (!this._validateInput) {
        return;
      }
      const result = await this._validateInput(input);
      if (!result || typeof result === "string") {
        return result;
      }
      let severity;
      switch (result.severity) {
        case InputBoxValidationSeverity.Info:
          severity = Severity.Info;
          break;
        case InputBoxValidationSeverity.Warning:
          severity = Severity.Warning;
          break;
        case InputBoxValidationSeverity.Error:
          severity = Severity.Error;
          break;
        default:
          severity = result.message ? Severity.Error : Severity.Ignore;
          break;
      }
      return {
        content: result.message,
        severity
      };
    }
    // ---- workspace folder picker
    async showWorkspaceFolderPick(options, token = CancellationToken.None) {
      const selectedFolder = await this._commands.executeCommand("_workbench.pickWorkspaceFolder", [options]);
      if (!selectedFolder) {
        return void 0;
      }
      const workspaceFolders = await this._workspace.getWorkspaceFolders2();
      if (!workspaceFolders) {
        return void 0;
      }
      return workspaceFolders.find((folder) => folder.uri.toString() === selectedFolder.uri.toString());
    }
    // ---- QuickInput
    createQuickPick(extension) {
      const session = new ExtHostQuickPick(extension, () => this._sessions.delete(session._id));
      this._sessions.set(session._id, session);
      return session;
    }
    createInputBox(extension) {
      const session = new ExtHostInputBox(extension, () => this._sessions.delete(session._id));
      this._sessions.set(session._id, session);
      return session;
    }
    $onDidChangeValue(sessionId, value) {
      const session = this._sessions.get(sessionId);
      session?._fireDidChangeValue(value);
    }
    $onDidAccept(sessionId) {
      const session = this._sessions.get(sessionId);
      session?._fireDidAccept();
    }
    $onDidChangeActive(sessionId, handles) {
      const session = this._sessions.get(sessionId);
      if (session instanceof ExtHostQuickPick) {
        session._fireDidChangeActive(handles);
      }
    }
    $onDidChangeSelection(sessionId, handles) {
      const session = this._sessions.get(sessionId);
      if (session instanceof ExtHostQuickPick) {
        session._fireDidChangeSelection(handles);
      }
    }
    $onDidTriggerButton(sessionId, handle) {
      const session = this._sessions.get(sessionId);
      session?._fireDidTriggerButton(handle);
    }
    $onDidTriggerItemButton(sessionId, itemHandle, buttonHandle) {
      const session = this._sessions.get(sessionId);
      if (session instanceof ExtHostQuickPick) {
        session._fireDidTriggerItemButton(itemHandle, buttonHandle);
      }
    }
    $onDidHide(sessionId) {
      const session = this._sessions.get(sessionId);
      session?._fireDidHide();
    }
  }
  class ExtHostQuickInput {
    constructor(_extension, _onDidDispose) {
      this._extension = _extension;
      this._onDidDispose = _onDidDispose;
    }
    static {
      __name(this, "ExtHostQuickInput");
    }
    static _nextId = 1;
    _id = ExtHostQuickPick._nextId++;
    _title;
    _steps;
    _totalSteps;
    _visible = false;
    _expectingHide = false;
    _enabled = true;
    _busy = false;
    _ignoreFocusOut = true;
    _value = "";
    _placeholder;
    _buttons = [];
    _handlesToButtons = /* @__PURE__ */ new Map();
    _onDidAcceptEmitter = new Emitter();
    _onDidChangeValueEmitter = new Emitter();
    _onDidTriggerButtonEmitter = new Emitter();
    _onDidHideEmitter = new Emitter();
    _updateTimeout;
    _pendingUpdate = { id: this._id };
    _disposed = false;
    _disposables = [
      this._onDidTriggerButtonEmitter,
      this._onDidHideEmitter,
      this._onDidAcceptEmitter,
      this._onDidChangeValueEmitter
    ];
    get title() {
      return this._title;
    }
    set title(title) {
      this._title = title;
      this.update({ title });
    }
    get step() {
      return this._steps;
    }
    set step(step) {
      this._steps = step;
      this.update({ step });
    }
    get totalSteps() {
      return this._totalSteps;
    }
    set totalSteps(totalSteps) {
      this._totalSteps = totalSteps;
      this.update({ totalSteps });
    }
    get enabled() {
      return this._enabled;
    }
    set enabled(enabled) {
      this._enabled = enabled;
      this.update({ enabled });
    }
    get busy() {
      return this._busy;
    }
    set busy(busy) {
      this._busy = busy;
      this.update({ busy });
    }
    get ignoreFocusOut() {
      return this._ignoreFocusOut;
    }
    set ignoreFocusOut(ignoreFocusOut) {
      this._ignoreFocusOut = ignoreFocusOut;
      this.update({ ignoreFocusOut });
    }
    get value() {
      return this._value;
    }
    set value(value) {
      this._value = value;
      this.update({ value });
    }
    get placeholder() {
      return this._placeholder;
    }
    set placeholder(placeholder) {
      this._placeholder = placeholder;
      this.update({ placeholder });
    }
    onDidChangeValue = this._onDidChangeValueEmitter.event;
    onDidAccept = this._onDidAcceptEmitter.event;
    get buttons() {
      return this._buttons;
    }
    set buttons(buttons) {
      const allowedButtonLocation = isProposedApiEnabled(this._extension, "quickInputButtonLocation");
      if (!allowedButtonLocation && buttons.some((button) => button.location)) {
        console.warn(`Extension '${this._extension.identifier.value}' uses a button location which is proposed API that is only available when running out of dev or with the following command line switch: --enable-proposed-api ${this._extension.identifier.value}`);
      }
      this._buttons = buttons.slice();
      this._handlesToButtons.clear();
      buttons.forEach((button, i) => {
        const handle = button === QuickInputButtons.Back ? -1 : i;
        this._handlesToButtons.set(handle, button);
      });
      this.update({
        buttons: buttons.map((button, i) => {
          return {
            ...getIconPathOrClass(button.iconPath),
            tooltip: button.tooltip,
            handle: button === QuickInputButtons.Back ? -1 : i,
            location: allowedButtonLocation ? button.location : void 0
          };
        })
      });
    }
    onDidTriggerButton = this._onDidTriggerButtonEmitter.event;
    show() {
      this._visible = true;
      this._expectingHide = true;
      this.update({ visible: true });
    }
    hide() {
      this._visible = false;
      this.update({ visible: false });
    }
    onDidHide = this._onDidHideEmitter.event;
    _fireDidAccept() {
      this._onDidAcceptEmitter.fire();
    }
    _fireDidChangeValue(value) {
      this._value = value;
      this._onDidChangeValueEmitter.fire(value);
    }
    _fireDidTriggerButton(handle) {
      const button = this._handlesToButtons.get(handle);
      if (button) {
        this._onDidTriggerButtonEmitter.fire(button);
      }
    }
    _fireDidHide() {
      if (this._expectingHide) {
        this._expectingHide = this._visible;
        this._onDidHideEmitter.fire();
      }
    }
    dispose() {
      if (this._disposed) {
        return;
      }
      this._disposed = true;
      this._fireDidHide();
      this._disposables = dispose(this._disposables);
      if (this._updateTimeout) {
        clearTimeout(this._updateTimeout);
        this._updateTimeout = void 0;
      }
      this._onDidDispose();
      proxy.$dispose(this._id);
    }
    update(properties) {
      if (this._disposed) {
        return;
      }
      for (const key of Object.keys(properties)) {
        const value = properties[key];
        this._pendingUpdate[key] = value === void 0 ? null : value;
      }
      if ("visible" in this._pendingUpdate) {
        if (this._updateTimeout) {
          clearTimeout(this._updateTimeout);
          this._updateTimeout = void 0;
        }
        this.dispatchUpdate();
      } else if (this._visible && !this._updateTimeout) {
        this._updateTimeout = setTimeout(() => {
          this._updateTimeout = void 0;
          this.dispatchUpdate();
        }, 0);
      }
    }
    dispatchUpdate() {
      proxy.$createOrUpdate(this._pendingUpdate);
      this._pendingUpdate = { id: this._id };
    }
  }
  function getIconUris(iconPath) {
    if (iconPath instanceof ThemeIcon) {
      return { id: iconPath.id };
    }
    const dark = getDarkIconUri(iconPath);
    const light = getLightIconUri(iconPath);
    return {
      dark: typeof dark === "string" ? URI.file(dark) : dark,
      light: typeof light === "string" ? URI.file(light) : light
    };
  }
  __name(getIconUris, "getIconUris");
  function getLightIconUri(iconPath) {
    return typeof iconPath === "object" && "light" in iconPath ? iconPath.light : iconPath;
  }
  __name(getLightIconUri, "getLightIconUri");
  function getDarkIconUri(iconPath) {
    return typeof iconPath === "object" && "dark" in iconPath ? iconPath.dark : iconPath;
  }
  __name(getDarkIconUri, "getDarkIconUri");
  function getIconPathOrClass(icon) {
    const iconPathOrIconClass = getIconUris(icon);
    let iconPath;
    let iconClass;
    if ("id" in iconPathOrIconClass) {
      iconClass = ThemeIconUtils.asClassName(iconPathOrIconClass);
    } else {
      iconPath = iconPathOrIconClass;
    }
    return {
      iconPath,
      iconClass
    };
  }
  __name(getIconPathOrClass, "getIconPathOrClass");
  class ExtHostQuickPick extends ExtHostQuickInput {
    static {
      __name(this, "ExtHostQuickPick");
    }
    _items = [];
    _handlesToItems = /* @__PURE__ */ new Map();
    _itemsToHandles = /* @__PURE__ */ new Map();
    _canSelectMany = false;
    _matchOnDescription = true;
    _matchOnDetail = true;
    _sortByLabel = true;
    _keepScrollPosition = false;
    _activeItems = [];
    _onDidChangeActiveEmitter = new Emitter();
    _selectedItems = [];
    _onDidChangeSelectionEmitter = new Emitter();
    _onDidTriggerItemButtonEmitter = new Emitter();
    constructor(extension, onDispose) {
      super(extension, onDispose);
      this._disposables.push(
        this._onDidChangeActiveEmitter,
        this._onDidChangeSelectionEmitter,
        this._onDidTriggerItemButtonEmitter
      );
      this.update({ type: "quickPick" });
    }
    get items() {
      return this._items;
    }
    set items(items) {
      this._items = items.slice();
      this._handlesToItems.clear();
      this._itemsToHandles.clear();
      items.forEach((item, i) => {
        this._handlesToItems.set(i, item);
        this._itemsToHandles.set(item, i);
      });
      const allowedTooltips = isProposedApiEnabled(this._extension, "quickPickItemTooltip");
      const pickItems = [];
      for (let handle = 0; handle < items.length; handle++) {
        const item = items[handle];
        if (item.kind === QuickPickItemKind.Separator) {
          pickItems.push({ type: "separator", label: item.label });
        } else {
          if (item.tooltip && !allowedTooltips) {
            console.warn(`Extension '${this._extension.identifier.value}' uses a tooltip which is proposed API that is only available when running out of dev or with the following command line switch: --enable-proposed-api ${this._extension.identifier.value}`);
          }
          const icon = item.iconPath ? getIconPathOrClass(item.iconPath) : void 0;
          pickItems.push({
            handle,
            label: item.label,
            iconPath: icon?.iconPath,
            iconClass: icon?.iconClass,
            description: item.description,
            detail: item.detail,
            picked: item.picked,
            alwaysShow: item.alwaysShow,
            tooltip: allowedTooltips ? MarkdownString.fromStrict(item.tooltip) : void 0,
            buttons: item.buttons?.map((button, i) => {
              return {
                ...getIconPathOrClass(button.iconPath),
                tooltip: button.tooltip,
                handle: i
              };
            })
          });
        }
      }
      this.update({
        items: pickItems
      });
    }
    get canSelectMany() {
      return this._canSelectMany;
    }
    set canSelectMany(canSelectMany) {
      this._canSelectMany = canSelectMany;
      this.update({ canSelectMany });
    }
    get matchOnDescription() {
      return this._matchOnDescription;
    }
    set matchOnDescription(matchOnDescription) {
      this._matchOnDescription = matchOnDescription;
      this.update({ matchOnDescription });
    }
    get matchOnDetail() {
      return this._matchOnDetail;
    }
    set matchOnDetail(matchOnDetail) {
      this._matchOnDetail = matchOnDetail;
      this.update({ matchOnDetail });
    }
    get sortByLabel() {
      return this._sortByLabel;
    }
    set sortByLabel(sortByLabel) {
      this._sortByLabel = sortByLabel;
      this.update({ sortByLabel });
    }
    get keepScrollPosition() {
      return this._keepScrollPosition;
    }
    set keepScrollPosition(keepScrollPosition) {
      this._keepScrollPosition = keepScrollPosition;
      this.update({ keepScrollPosition });
    }
    get activeItems() {
      return this._activeItems;
    }
    set activeItems(activeItems) {
      this._activeItems = activeItems.filter((item) => this._itemsToHandles.has(item));
      this.update({ activeItems: this._activeItems.map((item) => this._itemsToHandles.get(item)) });
    }
    onDidChangeActive = this._onDidChangeActiveEmitter.event;
    get selectedItems() {
      return this._selectedItems;
    }
    set selectedItems(selectedItems) {
      this._selectedItems = selectedItems.filter((item) => this._itemsToHandles.has(item));
      this.update({ selectedItems: this._selectedItems.map((item) => this._itemsToHandles.get(item)) });
    }
    onDidChangeSelection = this._onDidChangeSelectionEmitter.event;
    _fireDidChangeActive(handles) {
      const items = coalesce(handles.map((handle) => this._handlesToItems.get(handle)));
      this._activeItems = items;
      this._onDidChangeActiveEmitter.fire(items);
    }
    _fireDidChangeSelection(handles) {
      const items = coalesce(handles.map((handle) => this._handlesToItems.get(handle)));
      this._selectedItems = items;
      this._onDidChangeSelectionEmitter.fire(items);
    }
    onDidTriggerItemButton = this._onDidTriggerItemButtonEmitter.event;
    _fireDidTriggerItemButton(itemHandle, buttonHandle) {
      const item = this._handlesToItems.get(itemHandle);
      if (!item || !item.buttons || !item.buttons.length) {
        return;
      }
      const button = item.buttons[buttonHandle];
      if (button) {
        this._onDidTriggerItemButtonEmitter.fire({
          button,
          item
        });
      }
    }
  }
  class ExtHostInputBox extends ExtHostQuickInput {
    static {
      __name(this, "ExtHostInputBox");
    }
    _password = false;
    _prompt;
    _valueSelection;
    _validationMessage;
    constructor(extension, onDispose) {
      super(extension, onDispose);
      this.update({ type: "inputBox" });
    }
    get password() {
      return this._password;
    }
    set password(password) {
      this._password = password;
      this.update({ password });
    }
    get prompt() {
      return this._prompt;
    }
    set prompt(prompt) {
      this._prompt = prompt;
      this.update({ prompt });
    }
    get valueSelection() {
      return this._valueSelection;
    }
    set valueSelection(valueSelection) {
      this._valueSelection = valueSelection;
      this.update({ valueSelection });
    }
    get validationMessage() {
      return this._validationMessage;
    }
    set validationMessage(validationMessage) {
      this._validationMessage = validationMessage;
      if (!validationMessage) {
        this.update({ validationMessage: void 0, severity: Severity.Ignore });
      } else if (typeof validationMessage === "string") {
        this.update({ validationMessage, severity: Severity.Error });
      } else {
        this.update({ validationMessage: validationMessage.message, severity: validationMessage.severity ?? Severity.Error });
      }
    }
  }
  return new ExtHostQuickOpenImpl(workspace, commands);
}
__name(createExtHostQuickOpen, "createExtHostQuickOpen");
export {
  createExtHostQuickOpen
};
//# sourceMappingURL=extHostQuickOpen.js.map
