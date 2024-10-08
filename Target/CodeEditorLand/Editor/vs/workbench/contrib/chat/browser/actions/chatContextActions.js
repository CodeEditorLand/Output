var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { KeyCode, KeyMod } from "../../../../../base/common/keyCodes.js";
import { Schemas } from "../../../../../base/common/network.js";
import { compare } from "../../../../../base/common/strings.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { URI } from "../../../../../base/common/uri.js";
import { ServicesAccessor } from "../../../../../editor/browser/editorExtensions.js";
import { IRange } from "../../../../../editor/common/core/range.js";
import { EditorType } from "../../../../../editor/common/editorCommon.js";
import { Command } from "../../../../../editor/common/languages.js";
import { AbstractGotoSymbolQuickAccessProvider, IGotoSymbolQuickPickItem } from "../../../../../editor/contrib/quickAccess/browser/gotoSymbolQuickAccess.js";
import { localize, localize2 } from "../../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { IClipboardService } from "../../../../../platform/clipboard/common/clipboardService.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr, IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { KeybindingWeight } from "../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { AnythingQuickAccessProviderRunOptions } from "../../../../../platform/quickinput/common/quickAccess.js";
import { IQuickInputService, IQuickPickItem, IQuickPickItemWithResource, IQuickPickSeparator, QuickPickItem } from "../../../../../platform/quickinput/common/quickInput.js";
import { ActiveEditorContext } from "../../../../common/contextkeys.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { AnythingQuickAccessProvider } from "../../../search/browser/anythingQuickAccess.js";
import { ISymbolQuickPickItem, SymbolsQuickAccessProvider } from "../../../search/browser/symbolsQuickAccess.js";
import { SearchContext } from "../../../search/common/constants.js";
import { VIEW_ID as SEARCH_VIEW_ID } from "../../../../services/search/common/search.js";
import { ChatAgentLocation, IChatAgentService } from "../../common/chatAgents.js";
import { CONTEXT_CHAT_LOCATION, CONTEXT_IN_CHAT_INPUT } from "../../common/chatContextKeys.js";
import { IChatEditingService } from "../../common/chatEditingService.js";
import { IChatRequestVariableEntry } from "../../common/chatModel.js";
import { ChatRequestAgentPart } from "../../common/chatParserTypes.js";
import { IChatVariableData, IChatVariablesService } from "../../common/chatVariables.js";
import { ILanguageModelToolsService } from "../../common/languageModelToolsService.js";
import { imageToHash, isImage } from "../chatPasteProviders.js";
import { IChatWidget, IChatWidgetService, IQuickChatService, showChatView } from "../chat.js";
import { isQuickChat } from "../chatWidget.js";
import { CHAT_CATEGORY } from "./chatActions.js";
import { SearchView } from "../../../search/browser/searchView.js";
function registerChatContextActions() {
  registerAction2(AttachContextAction);
  registerAction2(AttachFileAction);
  registerAction2(AttachSelectionAction);
}
__name(registerChatContextActions, "registerChatContextActions");
function isIGotoSymbolQuickPickItem(obj) {
  return typeof obj === "object" && typeof obj.symbolName === "string" && !!obj.uri && !!obj.range;
}
__name(isIGotoSymbolQuickPickItem, "isIGotoSymbolQuickPickItem");
function isISymbolQuickPickItem(obj) {
  return typeof obj === "object" && typeof obj.symbol === "object" && !!obj.symbol;
}
__name(isISymbolQuickPickItem, "isISymbolQuickPickItem");
function isIQuickPickItemWithResource(obj) {
  return typeof obj === "object" && typeof obj.resource === "object" && URI.isUri(obj.resource);
}
__name(isIQuickPickItemWithResource, "isIQuickPickItemWithResource");
function isIOpenEditorsQuickPickItem(obj) {
  return typeof obj === "object" && obj.id === "open-editors";
}
__name(isIOpenEditorsQuickPickItem, "isIOpenEditorsQuickPickItem");
function isISearchResultsQuickPickItem(obj) {
  return typeof obj === "object" && obj.kind === "search-results";
}
__name(isISearchResultsQuickPickItem, "isISearchResultsQuickPickItem");
class AttachFileAction extends Action2 {
  static {
    __name(this, "AttachFileAction");
  }
  static ID = "workbench.action.chat.attachFile";
  constructor() {
    super({
      id: AttachFileAction.ID,
      title: localize2("workbench.action.chat.attachFile.label", "Add File to Chat"),
      category: CHAT_CATEGORY,
      f1: false,
      precondition: ActiveEditorContext.isEqualTo("workbench.editors.files.textFileEditor"),
      menu: {
        id: MenuId.ChatCommandCenter,
        group: "a_chat",
        order: 10
      }
    });
  }
  async run(accessor, ...args) {
    const variablesService = accessor.get(IChatVariablesService);
    const textEditorService = accessor.get(IEditorService);
    const activeUri = textEditorService.activeEditor?.resource;
    if (textEditorService.activeTextEditorControl?.getEditorType() === EditorType.ICodeEditor && activeUri && [Schemas.file, Schemas.vscodeRemote, Schemas.untitled].includes(activeUri.scheme)) {
      (await showChatView(accessor.get(IViewsService)))?.focusInput();
      variablesService.attachContext("file", activeUri, ChatAgentLocation.Panel);
    }
  }
}
class AttachSelectionAction extends Action2 {
  static {
    __name(this, "AttachSelectionAction");
  }
  static ID = "workbench.action.chat.attachSelection";
  constructor() {
    super({
      id: AttachSelectionAction.ID,
      title: localize2("workbench.action.chat.attachSelection.label", "Add Selection to Chat"),
      category: CHAT_CATEGORY,
      f1: false,
      precondition: ActiveEditorContext.isEqualTo("workbench.editors.files.textFileEditor"),
      menu: {
        id: MenuId.ChatCommandCenter,
        group: "a_chat",
        order: 11
      }
    });
  }
  async run(accessor, ...args) {
    const variablesService = accessor.get(IChatVariablesService);
    const textEditorService = accessor.get(IEditorService);
    const activeEditor = textEditorService.activeTextEditorControl;
    const activeUri = textEditorService.activeEditor?.resource;
    if (textEditorService.activeTextEditorControl?.getEditorType() === EditorType.ICodeEditor && activeUri && [Schemas.file, Schemas.vscodeRemote, Schemas.untitled].includes(activeUri.scheme)) {
      const selection = activeEditor?.getSelection();
      if (selection) {
        (await showChatView(accessor.get(IViewsService)))?.focusInput();
        variablesService.attachContext("file", { uri: activeUri, range: selection }, ChatAgentLocation.Panel);
      }
    }
  }
}
class AttachContextAction extends Action2 {
  static {
    __name(this, "AttachContextAction");
  }
  static ID = "workbench.action.chat.attachContext";
  // used to enable/disable the keybinding and defined menu containment
  static _cdt = ContextKeyExpr.or(
    ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Panel)),
    ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Editor), ContextKeyExpr.equals("config.chat.experimental.variables.editor", true)),
    ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Notebook), ContextKeyExpr.equals("config.chat.experimental.variables.notebook", true)),
    ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Terminal), ContextKeyExpr.equals("config.chat.experimental.variables.terminal", true))
  );
  constructor() {
    super({
      id: AttachContextAction.ID,
      title: localize2("workbench.action.chat.attachContext.label", "Attach Context"),
      icon: Codicon.attach,
      category: CHAT_CATEGORY,
      precondition: ContextKeyExpr.or(AttachContextAction._cdt, ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession))),
      keybinding: {
        when: CONTEXT_IN_CHAT_INPUT,
        primary: KeyMod.CtrlCmd | KeyCode.Slash,
        weight: KeybindingWeight.EditorContrib
      },
      menu: [
        {
          when: ContextKeyExpr.or(ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession)), ContextKeyExpr.and(ContextKeyExpr.or(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Panel), CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession)), AttachContextAction._cdt)),
          id: MenuId.ChatInput,
          group: "navigation",
          order: 2
        },
        {
          when: ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Panel).negate(), AttachContextAction._cdt),
          id: MenuId.ChatExecute,
          group: "navigation",
          order: 1
        }
      ]
    });
  }
  _getFileContextId(item) {
    if ("resource" in item) {
      return item.resource.toString();
    }
    return item.uri.toString() + (item.range.startLineNumber !== item.range.endLineNumber ? `:${item.range.startLineNumber}-${item.range.endLineNumber}` : `:${item.range.startLineNumber}`);
  }
  async _attachContext(widget, commandService, clipboardService, editorService, labelService, viewsService, chatEditingService, ...picks) {
    const toAttach = [];
    for (const pick of picks) {
      if (isISymbolQuickPickItem(pick) && pick.symbol) {
        toAttach.push({
          id: this._getFileContextId(pick.symbol.location),
          value: pick.symbol.location,
          fullName: pick.label,
          name: pick.symbol.name,
          isDynamic: true
        });
      } else if (isIQuickPickItemWithResource(pick) && pick.resource) {
        if (/\.(png|jpg|jpeg|bmp|gif|tiff)$/i.test(pick.resource.path)) {
          toAttach.push({
            id: pick.resource.toString(),
            name: pick.label,
            fullName: pick.label,
            value: pick.resource,
            isDynamic: true,
            isImage: true
          });
        } else {
          toAttach.push({
            id: this._getFileContextId({ resource: pick.resource }),
            value: pick.resource,
            name: pick.label,
            isFile: true,
            isDynamic: true
          });
          chatEditingService?.addFileToWorkingSet(pick.resource);
        }
      } else if (isIGotoSymbolQuickPickItem(pick) && pick.uri && pick.range) {
        toAttach.push({
          range: void 0,
          id: this._getFileContextId({ uri: pick.uri, range: pick.range.decoration }),
          value: { uri: pick.uri, range: pick.range.decoration },
          fullName: pick.label,
          name: pick.symbolName,
          isDynamic: true
        });
      } else if (isIOpenEditorsQuickPickItem(pick)) {
        for (const editor of editorService.editors) {
          if (editor.resource) {
            toAttach.push({
              id: this._getFileContextId({ resource: editor.resource }),
              value: editor.resource,
              name: labelService.getUriBasenameLabel(editor.resource),
              isFile: true,
              isDynamic: true
            });
            chatEditingService?.addFileToWorkingSet(editor.resource);
          }
        }
      } else if (isISearchResultsQuickPickItem(pick)) {
        const searchView = viewsService.getViewWithId(SEARCH_VIEW_ID);
        for (const result of searchView.model.searchResult.matches()) {
          toAttach.push({
            id: this._getFileContextId({ resource: result.resource }),
            value: result.resource,
            name: labelService.getUriBasenameLabel(result.resource),
            isFile: true,
            isDynamic: true
          });
          chatEditingService?.addFileToWorkingSet(result.resource);
        }
      } else {
        const attachmentPick = pick;
        if (attachmentPick.kind === "command") {
          const selection = await commandService.executeCommand(attachmentPick.command.id, ...attachmentPick.command.arguments ?? []);
          if (!selection) {
            continue;
          }
          toAttach.push({
            ...attachmentPick,
            isDynamic: attachmentPick.isDynamic,
            value: attachmentPick.value,
            name: `${typeof attachmentPick.value === "string" && attachmentPick.value.startsWith("#") ? attachmentPick.value.slice(1) : ""}${selection}`,
            // Apply the original icon with the new name
            fullName: selection
          });
        } else if (attachmentPick.kind === "tool") {
          toAttach.push({
            id: attachmentPick.id,
            name: attachmentPick.label,
            fullName: attachmentPick.label,
            value: void 0,
            icon: attachmentPick.icon,
            isTool: true
          });
        } else if (attachmentPick.kind === "image") {
          const fileBuffer = await clipboardService.readImage();
          toAttach.push({
            id: await imageToHash(fileBuffer),
            name: localize("pastedImage", "Pasted Image"),
            fullName: localize("pastedImage", "Pasted Image"),
            value: fileBuffer,
            isDynamic: true,
            isImage: true
          });
        } else if (attachmentPick.kind === "variable") {
          toAttach.push({
            range: void 0,
            id: pick.id ?? "",
            value: void 0,
            fullName: pick.label,
            name: attachmentPick.variable.name,
            icon: attachmentPick.variable.icon
          });
        }
      }
    }
    widget.attachmentModel.addContext(...toAttach);
  }
  async run(accessor, ...args) {
    const quickInputService = accessor.get(IQuickInputService);
    const chatAgentService = accessor.get(IChatAgentService);
    const chatVariablesService = accessor.get(IChatVariablesService);
    const commandService = accessor.get(ICommandService);
    const widgetService = accessor.get(IChatWidgetService);
    const languageModelToolsService = accessor.get(ILanguageModelToolsService);
    const quickChatService = accessor.get(IQuickChatService);
    const clipboardService = accessor.get(IClipboardService);
    const configurationService = accessor.get(IConfigurationService);
    const editorService = accessor.get(IEditorService);
    const labelService = accessor.get(ILabelService);
    const contextKeyService = accessor.get(IContextKeyService);
    const viewsService = accessor.get(IViewsService);
    const context = args[0];
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    const chatEditingService = widget.location === ChatAgentLocation.EditingSession ? accessor.get(IChatEditingService) : void 0;
    const usedAgent = widget.parsedInput.parts.find((p) => p instanceof ChatRequestAgentPart);
    const slowSupported = usedAgent ? usedAgent.agent.metadata.supportsSlowVariables : true;
    const quickPickItems = [];
    if (!context || !context.showFilesOnly) {
      for (const variable of chatVariablesService.getVariables(widget.location)) {
        if (variable.fullName && (!variable.isSlow || slowSupported)) {
          quickPickItems.push({
            kind: "variable",
            variable,
            label: variable.fullName,
            id: variable.id,
            iconClass: variable.icon ? ThemeIcon.asClassName(variable.icon) : void 0
          });
        }
      }
      if (configurationService.getValue("chat.experimental.imageAttachments")) {
        const imageData = await clipboardService.readImage();
        if (isImage(imageData)) {
          quickPickItems.push({
            kind: "image",
            id: await imageToHash(imageData),
            label: localize("imageFromClipboard", "Image from Clipboard"),
            iconClass: ThemeIcon.asClassName(Codicon.fileMedia)
          });
        }
      }
      if (widget.viewModel?.sessionId) {
        const agentPart = widget.parsedInput.parts.find((part) => part instanceof ChatRequestAgentPart);
        if (agentPart) {
          const completions = await chatAgentService.getAgentCompletionItems(agentPart.agent.id, "", CancellationToken.None);
          for (const variable of completions) {
            if (variable.fullName && variable.command) {
              quickPickItems.push({
                kind: "command",
                label: variable.fullName,
                id: variable.id,
                command: variable.command,
                icon: variable.icon,
                iconClass: variable.icon ? ThemeIcon.asClassName(variable.icon) : void 0,
                value: variable.value,
                isDynamic: true,
                name: variable.name
              });
            } else {
            }
          }
        }
      }
      if (!usedAgent || usedAgent.agent.supportsToolReferences) {
        for (const tool of languageModelToolsService.getTools()) {
          if (tool.canBeInvokedManually) {
            const item = {
              kind: "tool",
              label: tool.displayName ?? tool.name ?? "",
              id: tool.id,
              icon: ThemeIcon.isThemeIcon(tool.icon) ? tool.icon : void 0
              // TODO need to support icon path?
            };
            if (ThemeIcon.isThemeIcon(tool.icon)) {
              item.iconClass = ThemeIcon.asClassName(tool.icon);
            } else if (tool.icon) {
              item.iconPath = tool.icon;
            }
            quickPickItems.push(item);
          }
        }
      }
      quickPickItems.push({
        kind: "quickaccess",
        label: localize("chatContext.symbol", "Symbol..."),
        iconClass: ThemeIcon.asClassName(Codicon.symbolField),
        prefix: SymbolsQuickAccessProvider.PREFIX,
        id: "symbol"
      });
      if (widget.location === ChatAgentLocation.Notebook) {
        quickPickItems.push({
          kind: "command",
          id: "chatContext.notebook.kernelVariable",
          isDynamic: true,
          icon: ThemeIcon.fromId(Codicon.serverEnvironment.id),
          iconClass: ThemeIcon.asClassName(Codicon.serverEnvironment),
          value: "kernelVariable",
          label: localize("chatContext.notebook.kernelVariable", "Kernel Variable..."),
          command: {
            id: "notebook.chat.selectAndInsertKernelVariable",
            title: localize("chatContext.notebook.selectkernelVariable", "Select and Insert Kernel Variable"),
            arguments: [{ widget, range: void 0 }]
          }
        });
      }
    } else if (context.showFilesOnly) {
      if (editorService.count > 0) {
        quickPickItems.push({
          kind: "open-editors",
          id: "open-editors",
          label: localize("chatContext.editors", "Open Editors"),
          iconClass: ThemeIcon.asClassName(Codicon.files)
        });
      }
      if (SearchContext.HasSearchResults.getValue(contextKeyService)) {
        quickPickItems.push({
          kind: "search-results",
          id: "search-results",
          label: localize("chatContext.searchResults", "Search Results"),
          iconClass: ThemeIcon.asClassName(Codicon.search)
        });
      }
    }
    function extractTextFromIconLabel(label) {
      if (!label) {
        return "";
      }
      const match = label.match(/\$\([^\)]+\)\s*(.+)/);
      return match ? match[1] : label;
    }
    __name(extractTextFromIconLabel, "extractTextFromIconLabel");
    this._show(quickInputService, commandService, widget, quickChatService, quickPickItems.sort(function(a, b) {
      const first = extractTextFromIconLabel(a.label).toUpperCase();
      const second = extractTextFromIconLabel(b.label).toUpperCase();
      return compare(first, second);
    }), clipboardService, editorService, labelService, viewsService, chatEditingService, "", context?.placeholder);
  }
  _show(quickInputService, commandService, widget, quickChatService, quickPickItems, clipboardService, editorService, labelService, viewsService, chatEditingService, query = "", placeholder) {
    const providerOptions = {
      handleAccept: /* @__PURE__ */ __name((item) => {
        if ("prefix" in item) {
          this._show(quickInputService, commandService, widget, quickChatService, quickPickItems, clipboardService, editorService, labelService, viewsService, chatEditingService, item.prefix, placeholder);
        } else {
          if (!clipboardService) {
            return;
          }
          this._attachContext(widget, commandService, clipboardService, editorService, labelService, viewsService, chatEditingService, item);
          if (isQuickChat(widget)) {
            quickChatService.open();
          }
        }
      }, "handleAccept"),
      additionPicks: quickPickItems,
      filter: /* @__PURE__ */ __name((item) => {
        const attachedContext = widget.attachmentModel.getAttachmentIDs();
        if (isIOpenEditorsQuickPickItem(item)) {
          for (const editor of editorService.editors) {
            if (editor.resource && !attachedContext.has(this._getFileContextId({ resource: editor.resource }))) {
              return true;
            }
          }
          return false;
        }
        if ("kind" in item && item.kind === "image") {
          return !attachedContext.has(item.id);
        }
        if ("symbol" in item && item.symbol) {
          return !attachedContext.has(this._getFileContextId(item.symbol.location));
        }
        if (item && typeof item === "object" && "resource" in item && URI.isUri(item.resource)) {
          return [Schemas.file, Schemas.vscodeRemote].includes(item.resource.scheme) && !attachedContext.has(this._getFileContextId({ resource: item.resource }));
        }
        if (item && typeof item === "object" && "uri" in item && item.uri && item.range) {
          return !attachedContext.has(this._getFileContextId({ uri: item.uri, range: item.range.decoration }));
        }
        if (!("command" in item) && item.id) {
          return !attachedContext.has(item.id);
        }
        return true;
      }, "filter")
    };
    quickInputService.quickAccess.show(query, {
      enabledProviderPrefixes: [
        AnythingQuickAccessProvider.PREFIX,
        SymbolsQuickAccessProvider.PREFIX,
        AbstractGotoSymbolQuickAccessProvider.PREFIX
      ],
      placeholder: placeholder ?? localize("chatContext.attach.placeholder", "Search attachments"),
      providerOptions
    });
  }
}
export {
  AttachContextAction,
  registerChatContextActions
};
//# sourceMappingURL=chatContextActions.js.map
