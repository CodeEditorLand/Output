var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Disposable } from "../../../../base/common/lifecycle.js";
import { localize, localize2 } from "../../../../nls.js";
import { Action2, MenuRegistry, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { EditorPaneDescriptor } from "../../../../workbench/browser/editor.js";
import { EditorExtensions } from "../../../../workbench/common/editor.js";
import { IEditorGroupsService } from "../../../../workbench/services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../../workbench/services/editor/common/editorService.js";
import { ChatContextKeys } from "../../../../workbench/contrib/chat/common/actions/chatContextKeys.js";
import { CHAT_CATEGORY } from "../../../../workbench/contrib/chat/browser/actions/chatActions.js";
import { AICustomizationManagementEditor } from "./aiCustomizationManagementEditor.js";
import { AICustomizationManagementEditorInput } from "./aiCustomizationManagementEditorInput.js";
import { AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID, AI_CUSTOMIZATION_MANAGEMENT_EDITOR_INPUT_ID, AICustomizationManagementCommands, AICustomizationManagementItemMenuId } from "./aiCustomizationManagement.js";
import { registerWorkbenchContribution2 } from "../../../../workbench/common/contributions.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { URI } from "../../../../base/common/uri.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { PromptsType } from "../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js";
import { PromptsStorage } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { basename } from "../../../../base/common/resources.js";
import { Schemas } from "../../../../base/common/network.js";
import { isWindows, isMacintosh } from "../../../../base/common/platform.js";
Registry.as(EditorExtensions.EditorPane).registerEditorPane(EditorPaneDescriptor.create(AICustomizationManagementEditor, AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID, localize("aiCustomizationManagementEditor", "AI Customizations Editor")), [
  // Note: Using the class directly since we use a singleton pattern
  new SyncDescriptor(AICustomizationManagementEditorInput)
]);
class AICustomizationManagementEditorInputSerializer {
  static {
    __name(this, "AICustomizationManagementEditorInputSerializer");
  }
  canSerialize(editorInput) {
    return editorInput instanceof AICustomizationManagementEditorInput;
  }
  serialize(input) {
    return "";
  }
  deserialize(instantiationService) {
    return AICustomizationManagementEditorInput.getOrCreate();
  }
}
Registry.as(EditorExtensions.EditorFactory).registerEditorSerializer(AI_CUSTOMIZATION_MANAGEMENT_EDITOR_INPUT_ID, AICustomizationManagementEditorInputSerializer);
function extractURI(context) {
  if (URI.isUri(context)) {
    return context;
  }
  if (typeof context === "string") {
    return URI.parse(context);
  }
  if (URI.isUri(context.uri)) {
    return context.uri;
  }
  return URI.parse(context.uri);
}
__name(extractURI, "extractURI");
function extractStorage(context) {
  if (URI.isUri(context) || typeof context === "string") {
    return void 0;
  }
  return context.storage;
}
__name(extractStorage, "extractStorage");
const OPEN_AI_CUSTOMIZATION_MGMT_FILE_ID = "aiCustomizationManagement.openFile";
registerAction2(class extends Action2 {
  constructor() {
    super({
      id: OPEN_AI_CUSTOMIZATION_MGMT_FILE_ID,
      title: localize2("open", "Open"),
      icon: Codicon.goToFile
    });
  }
  async run(accessor, context) {
    const editorService = accessor.get(IEditorService);
    await editorService.openEditor({
      resource: extractURI(context)
    });
  }
});
const RUN_PROMPT_MGMT_ID = "aiCustomizationManagement.runPrompt";
registerAction2(class extends Action2 {
  constructor() {
    super({
      id: RUN_PROMPT_MGMT_ID,
      title: localize2("runPrompt", "Run Prompt"),
      icon: Codicon.play
    });
  }
  async run(accessor, context) {
    const commandService = accessor.get(ICommandService);
    await commandService.executeCommand("workbench.action.chat.run.prompt.current", extractURI(context));
  }
});
const REVEAL_IN_OS_LABEL = isWindows ? localize2("revealInWindows", "Reveal in File Explorer") : isMacintosh ? localize2("revealInMac", "Reveal in Finder") : localize2("openContainer", "Open Containing Folder");
const REVEAL_AI_CUSTOMIZATION_IN_OS_ID = "aiCustomizationManagement.revealInOS";
registerAction2(class extends Action2 {
  constructor() {
    super({
      id: REVEAL_AI_CUSTOMIZATION_IN_OS_ID,
      title: REVEAL_IN_OS_LABEL,
      icon: Codicon.folderOpened
    });
  }
  async run(accessor, context) {
    const commandService = accessor.get(ICommandService);
    const uri = extractURI(context);
    await commandService.executeCommand("revealFileInOS", uri);
  }
});
const DELETE_AI_CUSTOMIZATION_ID = "aiCustomizationManagement.delete";
registerAction2(class extends Action2 {
  constructor() {
    super({
      id: DELETE_AI_CUSTOMIZATION_ID,
      title: localize2("delete", "Delete"),
      icon: Codicon.trash
    });
  }
  async run(accessor, context) {
    const fileService = accessor.get(IFileService);
    const dialogService = accessor.get(IDialogService);
    const uri = extractURI(context);
    const fileName = basename(uri);
    const storage = extractStorage(context);
    if (storage === PromptsStorage.extension) {
      await dialogService.info(localize("cannotDeleteExtension", "Cannot Delete Extension File"), localize("cannotDeleteExtensionDetail", "Files provided by extensions cannot be deleted. You can disable the extension if you no longer want to use this customization."));
      return;
    }
    const confirmation = await dialogService.confirm({
      message: localize("confirmDelete", "Are you sure you want to delete '{0}'?", fileName),
      detail: localize("confirmDeleteDetail", "This action cannot be undone."),
      primaryButton: localize("delete", "Delete"),
      type: "warning"
    });
    if (confirmation.confirmed) {
      await fileService.del(uri, { useTrash: true });
    }
  }
});
const AI_CUSTOMIZATION_ITEM_TYPE_KEY = "aiCustomizationManagementItemType";
MenuRegistry.appendMenuItem(AICustomizationManagementItemMenuId, {
  command: { id: OPEN_AI_CUSTOMIZATION_MGMT_FILE_ID, title: localize("open", "Open") },
  group: "1_open",
  order: 1
});
MenuRegistry.appendMenuItem(AICustomizationManagementItemMenuId, {
  command: { id: RUN_PROMPT_MGMT_ID, title: localize("runPrompt", "Run Prompt"), icon: Codicon.play },
  group: "2_run",
  order: 1,
  when: ContextKeyExpr.equals(AI_CUSTOMIZATION_ITEM_TYPE_KEY, PromptsType.prompt)
});
MenuRegistry.appendMenuItem(AICustomizationManagementItemMenuId, {
  command: { id: REVEAL_AI_CUSTOMIZATION_IN_OS_ID, title: REVEAL_IN_OS_LABEL.value },
  group: "3_file",
  order: 1,
  when: ContextKeyExpr.or(ContextKeyExpr.regex("aiCustomizationManagementItemUri", new RegExp(`^${Schemas.file}:`)), ContextKeyExpr.regex("aiCustomizationManagementItemUri", new RegExp(`^${Schemas.vscodeUserData}:`)))
});
MenuRegistry.appendMenuItem(AICustomizationManagementItemMenuId, {
  command: { id: DELETE_AI_CUSTOMIZATION_ID, title: localize("delete", "Delete") },
  group: "4_modify",
  order: 1
});
class AICustomizationManagementActionsContribution extends Disposable {
  static {
    __name(this, "AICustomizationManagementActionsContribution");
  }
  static {
    this.ID = "workbench.contrib.aiCustomizationManagementActions";
  }
  constructor() {
    super();
    this.registerActions();
  }
  registerActions() {
    this._register(registerAction2(class extends Action2 {
      constructor() {
        super({
          id: AICustomizationManagementCommands.OpenEditor,
          title: localize2("openAICustomizations", "Open AI Customizations"),
          category: CHAT_CATEGORY,
          precondition: ChatContextKeys.enabled,
          f1: true
        });
      }
      async run(accessor) {
        const editorGroupsService = accessor.get(IEditorGroupsService);
        const input = AICustomizationManagementEditorInput.getOrCreate();
        await editorGroupsService.activeGroup.openEditor(input, { pinned: true });
      }
    }));
  }
}
registerWorkbenchContribution2(
  AICustomizationManagementActionsContribution.ID,
  AICustomizationManagementActionsContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
//# sourceMappingURL=aiCustomizationManagement.contribution.js.map
