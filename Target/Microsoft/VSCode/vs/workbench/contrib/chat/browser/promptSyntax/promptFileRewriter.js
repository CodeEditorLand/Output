var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import { ICodeEditorService } from "../../../../../editor/browser/services/codeEditorService.js";
import { EditOperation } from "../../../../../editor/common/core/editOperation.js";
import { ToolSet } from "../../common/languageModelToolsService.js";
import { IPromptsService } from "../../common/promptSyntax/service/promptsService.js";
let PromptFileRewriter = class PromptFileRewriter2 {
  static {
    __name(this, "PromptFileRewriter");
  }
  constructor(_codeEditorService, _promptsService) {
    this._codeEditorService = _codeEditorService;
    this._promptsService = _promptsService;
  }
  async openAndRewriteTools(uri, newTools, token) {
    const editor = await this._codeEditorService.openCodeEditor({ resource: uri }, this._codeEditorService.getFocusedCodeEditor());
    if (!editor || !editor.hasModel()) {
      return;
    }
    const model = editor.getModel();
    const parser = this._promptsService.getSyntaxParserFor(model);
    const { header } = await parser.start(token).settled();
    if (header === void 0 || token.isCancellationRequested) {
      return void 0;
    }
    if ("tools" in header.metadataUtility === false) {
      return void 0;
    }
    const { tools } = header.metadataUtility;
    if (tools === void 0) {
      return void 0;
    }
    editor.setSelection(tools.range);
    await this.rewriteTools(model, newTools, tools.range);
  }
  rewriteTools(model, newTools, range) {
    const newToolNames = [];
    if (newTools === void 0) {
      model.pushStackElement();
      model.pushEditOperations(null, [EditOperation.replaceMove(range, "")], () => null);
      model.pushStackElement();
      return;
    }
    for (const [item, picked] of newTools) {
      if (picked) {
        if (item instanceof ToolSet) {
          newToolNames.push(item.referenceName);
        } else {
          newToolNames.push(item.toolReferenceName ?? item.displayName);
        }
      }
    }
    model.pushStackElement();
    model.pushEditOperations(null, [EditOperation.replaceMove(range, `tools: [${newToolNames.map((s) => `'${s}'`).join(", ")}]`)], () => null);
    model.pushStackElement();
  }
};
PromptFileRewriter = __decorate([
  __param(0, ICodeEditorService),
  __param(1, IPromptsService)
], PromptFileRewriter);
export {
  PromptFileRewriter
};
//# sourceMappingURL=promptFileRewriter.js.map
