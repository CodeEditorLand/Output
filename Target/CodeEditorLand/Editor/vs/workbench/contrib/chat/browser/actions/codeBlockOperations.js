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
import { coalesce } from "../../../../../base/common/arrays.js";
import { AsyncIterableObject } from "../../../../../base/common/async.js";
import { VSBuffer } from "../../../../../base/common/buffer.js";
import { CancellationTokenSource } from "../../../../../base/common/cancellation.js";
import { CharCode } from "../../../../../base/common/charCode.js";
import { isCancellationError } from "../../../../../base/common/errors.js";
import { isEqual } from "../../../../../base/common/resources.js";
import * as strings from "../../../../../base/common/strings.js";
import { IActiveCodeEditor, isCodeEditor, isDiffEditor } from "../../../../../editor/browser/editorBrowser.js";
import { IBulkEditService, ResourceTextEdit } from "../../../../../editor/browser/services/bulkEditService.js";
import { ICodeEditorService } from "../../../../../editor/browser/services/codeEditorService.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { ConversationRequest, ConversationResponse, DocumentContextItem, IWorkspaceFileEdit, IWorkspaceTextEdit } from "../../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { ILanguageFeaturesService } from "../../../../../editor/common/services/languageFeatures.js";
import { localize } from "../../../../../nls.js";
import { IDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { ILogService } from "../../../../../platform/log/common/log.js";
import { IProgressService, ProgressLocation } from "../../../../../platform/progress/common/progress.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { ITextFileService } from "../../../../services/textfile/common/textfiles.js";
import { InlineChatController } from "../../../inlineChat/browser/inlineChatController.js";
import { insertCell } from "../../../notebook/browser/controller/cellOperations.js";
import { IActiveNotebookEditor, INotebookEditor } from "../../../notebook/browser/notebookBrowser.js";
import { CellKind, NOTEBOOK_EDITOR_ID } from "../../../notebook/common/notebookCommon.js";
import { getReferencesAsDocumentContext } from "../../common/chatCodeMapperService.js";
import { ChatUserAction, IChatService } from "../../common/chatService.js";
import { isRequestVM, isResponseVM } from "../../common/chatViewModel.js";
import { ICodeBlockActionContext } from "../codeBlockPart.js";
let InsertCodeBlockOperation = class {
  constructor(editorService, textFileService, bulkEditService, codeEditorService, chatService, languageService, dialogService) {
    this.editorService = editorService;
    this.textFileService = textFileService;
    this.bulkEditService = bulkEditService;
    this.codeEditorService = codeEditorService;
    this.chatService = chatService;
    this.languageService = languageService;
    this.dialogService = dialogService;
  }
  static {
    __name(this, "InsertCodeBlockOperation");
  }
  async run(context) {
    const activeEditorControl = getEditableActiveCodeEditor(this.editorService);
    if (activeEditorControl) {
      await this.handleTextEditor(activeEditorControl, context);
    } else {
      const activeNotebookEditor = getActiveNotebookEditor(this.editorService);
      if (activeNotebookEditor) {
        await this.handleNotebookEditor(activeNotebookEditor, context);
      } else {
        this.notify(localize("insertCodeBlock.noActiveEditor", "To insert the code block, open a code editor or notebook editor and set the cursor at the location where to insert the code block."));
      }
    }
    notifyUserAction(this.chatService, context, {
      kind: "insert",
      codeBlockIndex: context.codeBlockIndex,
      totalCharacters: context.code.length
    });
  }
  async handleNotebookEditor(notebookEditor, codeBlockContext) {
    if (notebookEditor.isReadOnly) {
      this.notify(localize("insertCodeBlock.readonlyNotebook", "Cannot insert the code block to read-only notebook editor."));
      return false;
    }
    const focusRange = notebookEditor.getFocus();
    const next = Math.max(focusRange.end - 1, 0);
    insertCell(this.languageService, notebookEditor, next, CellKind.Code, "below", codeBlockContext.code, true);
    return true;
  }
  async handleTextEditor(codeEditor, codeBlockContext) {
    const activeModel = codeEditor.getModel();
    if (isReadOnly(activeModel, this.textFileService)) {
      this.notify(localize("insertCodeBlock.readonly", "Cannot insert the code block to read-only code editor."));
      return false;
    }
    const range = codeEditor.getSelection() ?? new Range(activeModel.getLineCount(), 1, activeModel.getLineCount(), 1);
    const text = reindent(codeBlockContext.code, activeModel, range.startLineNumber);
    const edits = [new ResourceTextEdit(activeModel.uri, { range, text })];
    await this.bulkEditService.apply(edits);
    this.codeEditorService.listCodeEditors().find((editor) => editor.getModel()?.uri.toString() === activeModel.uri.toString())?.focus();
    return true;
  }
  notify(message) {
    this.dialogService.info(message);
  }
};
InsertCodeBlockOperation = __decorateClass([
  __decorateParam(0, IEditorService),
  __decorateParam(1, ITextFileService),
  __decorateParam(2, IBulkEditService),
  __decorateParam(3, ICodeEditorService),
  __decorateParam(4, IChatService),
  __decorateParam(5, ILanguageService),
  __decorateParam(6, IDialogService)
], InsertCodeBlockOperation);
let ApplyCodeBlockOperation = class {
  constructor(editorService, textFileService, bulkEditService, codeEditorService, chatService, languageFeaturesService, progressService, languageService, fileService, dialogService, logService) {
    this.editorService = editorService;
    this.textFileService = textFileService;
    this.bulkEditService = bulkEditService;
    this.codeEditorService = codeEditorService;
    this.chatService = chatService;
    this.languageFeaturesService = languageFeaturesService;
    this.progressService = progressService;
    this.languageService = languageService;
    this.fileService = fileService;
    this.dialogService = dialogService;
    this.logService = logService;
  }
  static {
    __name(this, "ApplyCodeBlockOperation");
  }
  inlineChatPreview;
  async run(context) {
    if (this.inlineChatPreview && this.inlineChatPreview.isOpen()) {
      await this.dialogService.info(
        localize("overlap", "Another code change is being previewed. Please apply or discard the pending changes first.")
      );
      return;
    }
    let activeEditorControl = getEditableActiveCodeEditor(this.editorService);
    if (context.codemapperUri && !isEqual(activeEditorControl?.getModel().uri, context.codemapperUri)) {
      try {
        if (!await this.fileService.exists(context.codemapperUri)) {
          await this.fileService.writeFile(context.codemapperUri, VSBuffer.fromString(""));
        }
        await this.editorService.openEditor({ resource: context.codemapperUri });
        activeEditorControl = getEditableActiveCodeEditor(this.editorService);
        if (activeEditorControl) {
          this.tryToRevealCodeBlock(activeEditorControl, context.code);
        }
      } catch (e) {
        this.logService.info("[ApplyCodeBlockOperation] error opening code mapper file", context.codemapperUri, e);
      }
    }
    let result = void 0;
    if (activeEditorControl) {
      await this.handleTextEditor(activeEditorControl, context);
    } else {
      const activeNotebookEditor = getActiveNotebookEditor(this.editorService);
      if (activeNotebookEditor) {
        result = await this.handleNotebookEditor(activeNotebookEditor, context);
      } else {
        this.notify(localize("applyCodeBlock.noActiveEditor", "To apply this code block, open a code or notebook editor."));
      }
    }
    notifyUserAction(this.chatService, context, {
      kind: "apply",
      codeBlockIndex: context.codeBlockIndex,
      totalCharacters: context.code.length,
      codeMapper: result?.codeMapper,
      editsProposed: !!result?.edits
    });
  }
  async handleNotebookEditor(notebookEditor, codeBlockContext) {
    if (notebookEditor.isReadOnly) {
      this.notify(localize("applyCodeBlock.readonlyNotebook", "Cannot apply code block to read-only notebook editor."));
      return void 0;
    }
    const focusRange = notebookEditor.getFocus();
    const next = Math.max(focusRange.end - 1, 0);
    insertCell(this.languageService, notebookEditor, next, CellKind.Code, "below", codeBlockContext.code, true);
    return void 0;
  }
  async handleTextEditor(codeEditor, codeBlockContext) {
    if (isReadOnly(codeEditor.getModel(), this.textFileService)) {
      this.notify(localize("applyCodeBlock.readonly", "Cannot apply code block to read-only file."));
      return void 0;
    }
    const result = await this.computeEdits(codeEditor, codeBlockContext);
    if (result.edits) {
      const showWithPreview = await this.applyWithInlinePreview(result.edits, codeEditor);
      if (!showWithPreview) {
        await this.bulkEditService.apply(result.edits, { showPreview: true });
        const activeModel = codeEditor.getModel();
        this.codeEditorService.listCodeEditors().find((editor) => editor.getModel()?.uri.toString() === activeModel.uri.toString())?.focus();
      }
    }
    return result;
  }
  async computeEdits(codeEditor, codeBlockActionContext) {
    const activeModel = codeEditor.getModel();
    const mappedEditsProviders = this.languageFeaturesService.mappedEditsProvider.ordered(activeModel);
    if (mappedEditsProviders.length > 0) {
      const docRefs = [];
      collectDocumentContextFromSelections(codeEditor, docRefs);
      collectDocumentContextFromContext(codeBlockActionContext, docRefs);
      const cancellationTokenSource = new CancellationTokenSource();
      let codeMapper;
      try {
        const result = await this.progressService.withProgress(
          { location: ProgressLocation.Notification, delay: 500, sticky: true, cancellable: true },
          async (progress) => {
            for (const provider of mappedEditsProviders) {
              codeMapper = provider.displayName;
              progress.report({ message: localize("applyCodeBlock.progress", "Applying code block using {0}...", codeMapper) });
              const mappedEdits = await provider.provideMappedEdits(
                activeModel,
                [codeBlockActionContext.code],
                {
                  documents: docRefs,
                  conversation: getChatConversation(codeBlockActionContext)
                },
                cancellationTokenSource.token
              );
              if (mappedEdits) {
                return { edits: mappedEdits.edits, codeMapper };
              }
            }
            return void 0;
          },
          () => cancellationTokenSource.cancel()
        );
        if (result) {
          return result;
        }
      } catch (e) {
        if (!isCancellationError(e)) {
          this.notify(localize("applyCodeBlock.error", "Failed to apply code block: {0}", e.message));
        }
      } finally {
        cancellationTokenSource.dispose();
      }
      return { edits: [], codeMapper };
    }
    return { edits: [], codeMapper: void 0 };
  }
  async applyWithInlinePreview(edits, codeEditor) {
    const firstEdit = edits[0];
    if (!ResourceTextEdit.is(firstEdit)) {
      return false;
    }
    const resource = firstEdit.resource;
    const textEdits = coalesce(edits.map((edit) => ResourceTextEdit.is(edit) && isEqual(resource, edit.resource) ? edit.textEdit : void 0));
    if (textEdits.length !== edits.length) {
      return false;
    }
    const editorToApply = await this.codeEditorService.openCodeEditor({ resource }, codeEditor);
    if (editorToApply) {
      const inlineChatController = InlineChatController.get(editorToApply);
      if (inlineChatController) {
        const tokenSource = new CancellationTokenSource();
        let isOpen = true;
        const firstEdit2 = textEdits[0];
        editorToApply.revealLineInCenterIfOutsideViewport(firstEdit2.range.startLineNumber);
        const promise = inlineChatController.reviewEdits(textEdits[0].range, AsyncIterableObject.fromArray(textEdits), tokenSource.token);
        promise.finally(() => {
          isOpen = false;
          tokenSource.dispose();
        });
        this.inlineChatPreview = {
          promise,
          isOpen: /* @__PURE__ */ __name(() => isOpen, "isOpen"),
          cancel: /* @__PURE__ */ __name(() => tokenSource.cancel(), "cancel")
        };
        return true;
      }
    }
    return false;
  }
  tryToRevealCodeBlock(codeEditor, codeBlock) {
    const match = codeBlock.match(/(\S[^\n]*)\n/);
    if (match && match[1].length > 10) {
      const findMatch = codeEditor.getModel().findNextMatch(match[1], { lineNumber: 1, column: 1 }, false, false, null, false);
      if (findMatch) {
        codeEditor.revealRangeInCenter(findMatch.range);
      }
    }
  }
  notify(message) {
    this.dialogService.info(message);
  }
};
ApplyCodeBlockOperation = __decorateClass([
  __decorateParam(0, IEditorService),
  __decorateParam(1, ITextFileService),
  __decorateParam(2, IBulkEditService),
  __decorateParam(3, ICodeEditorService),
  __decorateParam(4, IChatService),
  __decorateParam(5, ILanguageFeaturesService),
  __decorateParam(6, IProgressService),
  __decorateParam(7, ILanguageService),
  __decorateParam(8, IFileService),
  __decorateParam(9, IDialogService),
  __decorateParam(10, ILogService)
], ApplyCodeBlockOperation);
function notifyUserAction(chatService, context, action) {
  if (isResponseVM(context.element)) {
    chatService.notifyUserAction({
      agentId: context.element.agent?.id,
      command: context.element.slashCommand?.name,
      sessionId: context.element.sessionId,
      requestId: context.element.requestId,
      result: context.element.result,
      action
    });
  }
}
__name(notifyUserAction, "notifyUserAction");
function getActiveNotebookEditor(editorService) {
  const activeEditorPane = editorService.activeEditorPane;
  if (activeEditorPane?.getId() === NOTEBOOK_EDITOR_ID) {
    const notebookEditor = activeEditorPane.getControl();
    if (notebookEditor.hasModel()) {
      return notebookEditor;
    }
  }
  return void 0;
}
__name(getActiveNotebookEditor, "getActiveNotebookEditor");
function getEditableActiveCodeEditor(editorService) {
  const activeCodeEditorInNotebook = getActiveNotebookEditor(editorService)?.activeCodeEditor;
  if (activeCodeEditorInNotebook && activeCodeEditorInNotebook.hasTextFocus() && activeCodeEditorInNotebook.hasModel()) {
    return activeCodeEditorInNotebook;
  }
  let activeEditorControl = editorService.activeTextEditorControl;
  if (isDiffEditor(activeEditorControl)) {
    activeEditorControl = activeEditorControl.getOriginalEditor().hasTextFocus() ? activeEditorControl.getOriginalEditor() : activeEditorControl.getModifiedEditor();
  }
  if (!isCodeEditor(activeEditorControl)) {
    return void 0;
  }
  if (!activeEditorControl.hasModel()) {
    return void 0;
  }
  return activeEditorControl;
}
__name(getEditableActiveCodeEditor, "getEditableActiveCodeEditor");
function isReadOnly(model, textFileService) {
  const activeTextModel = textFileService.files.get(model.uri) ?? textFileService.untitled.get(model.uri);
  return !!activeTextModel?.isReadonly();
}
__name(isReadOnly, "isReadOnly");
function collectDocumentContextFromSelections(codeEditor, result) {
  const activeModel = codeEditor.getModel();
  const currentDocUri = activeModel.uri;
  const currentDocVersion = activeModel.getVersionId();
  const selections = codeEditor.getSelections();
  if (selections.length > 0) {
    result.push([
      {
        uri: currentDocUri,
        version: currentDocVersion,
        ranges: selections
      }
    ]);
  }
}
__name(collectDocumentContextFromSelections, "collectDocumentContextFromSelections");
function collectDocumentContextFromContext(context, result) {
  if (isResponseVM(context.element) && context.element.usedContext?.documents) {
    result.push(context.element.usedContext.documents);
  }
}
__name(collectDocumentContextFromContext, "collectDocumentContextFromContext");
function getChatConversation(context) {
  if (isResponseVM(context.element)) {
    return [{
      type: "response",
      message: context.element.response.getMarkdown(),
      references: getReferencesAsDocumentContext(context.element.contentReferences)
    }];
  } else if (isRequestVM(context.element)) {
    return [{
      type: "request",
      message: context.element.messageText
    }];
  } else {
    return [];
  }
}
__name(getChatConversation, "getChatConversation");
function reindent(codeBlockContent, model, seletionStartLine) {
  const newContent = strings.splitLines(codeBlockContent);
  if (newContent.length === 0) {
    return codeBlockContent;
  }
  const formattingOptions = model.getFormattingOptions();
  const codeIndentLevel = computeIndentation(model.getLineContent(seletionStartLine), formattingOptions.tabSize).level;
  const indents = newContent.map((line) => computeIndentation(line, formattingOptions.tabSize));
  const newContentIndentLevel = indents.reduce((min, indent, index) => {
    if (indent.length !== newContent[index].length) {
      return Math.min(indent.level, min);
    }
    return min;
  }, Number.MAX_VALUE);
  if (newContentIndentLevel === Number.MAX_VALUE || newContentIndentLevel === codeIndentLevel) {
    return codeBlockContent;
  }
  const newLines = [];
  for (let i = 0; i < newContent.length; i++) {
    const { level, length } = indents[i];
    const newLevel = Math.max(0, codeIndentLevel + level - newContentIndentLevel);
    const newIndentation = formattingOptions.insertSpaces ? " ".repeat(formattingOptions.tabSize * newLevel) : "	".repeat(newLevel);
    newLines.push(newIndentation + newContent[i].substring(length));
  }
  return newLines.join("\n");
}
__name(reindent, "reindent");
function computeIndentation(line, tabSize) {
  let nSpaces = 0;
  let level = 0;
  let i = 0;
  let length = 0;
  const len = line.length;
  while (i < len) {
    const chCode = line.charCodeAt(i);
    if (chCode === CharCode.Space) {
      nSpaces++;
      if (nSpaces === tabSize) {
        level++;
        nSpaces = 0;
        length = i + 1;
      }
    } else if (chCode === CharCode.Tab) {
      level++;
      nSpaces = 0;
      length = i + 1;
    } else {
      break;
    }
    i++;
  }
  return { level, length };
}
__name(computeIndentation, "computeIndentation");
export {
  ApplyCodeBlockOperation,
  InsertCodeBlockOperation,
  computeIndentation
};
//# sourceMappingURL=codeBlockOperations.js.map
