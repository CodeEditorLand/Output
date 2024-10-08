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
import * as dom from "../../../../../base/browser/dom.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { Emitter } from "../../../../../base/common/event.js";
import { IMarkdownString } from "../../../../../base/common/htmlContent.js";
import { Disposable, IDisposable } from "../../../../../base/common/lifecycle.js";
import { equalsIgnoreCase } from "../../../../../base/common/strings.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { URI } from "../../../../../base/common/uri.js";
import { MarkdownRenderer } from "../../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { getIconClasses } from "../../../../../editor/common/services/getIconClasses.js";
import { IModelService } from "../../../../../editor/common/services/model.js";
import { IResolvedTextEditorModel, ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { MenuId } from "../../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { FileKind } from "../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { IMarkdownVulnerability } from "../../common/annotations.js";
import { IChatProgressRenderableResponseContent } from "../../common/chatModel.js";
import { isRequestVM, isResponseVM } from "../../common/chatViewModel.js";
import { CodeBlockModelCollection } from "../../common/codeBlockModelCollection.js";
import { IChatCodeBlockInfo, IChatListItemRendererOptions } from "../chat.js";
import { IChatRendererDelegate } from "../chatListRenderer.js";
import { ChatMarkdownDecorationsRenderer } from "../chatMarkdownDecorationsRenderer.js";
import { ChatEditorOptions } from "../chatOptions.js";
import { CodeBlockPart, ICodeBlockData, localFileLanguageId, parseLocalFileData } from "../codeBlockPart.js";
import "../media/chatCodeBlockPill.css";
import { IDisposableReference, ResourcePool } from "./chatCollections.js";
import { IChatContentPart, IChatContentPartRenderContext } from "./chatContentParts.js";
const $ = dom.$;
let ChatMarkdownContentPart = class extends Disposable {
  constructor(markdown, context, editorPool, fillInIncompleteTokens = false, codeBlockStartIndex = 0, renderer, currentWidth, codeBlockModelCollection, rendererOptions, contextKeyService, textModelService, instantiationService) {
    super();
    this.markdown = markdown;
    this.editorPool = editorPool;
    this.codeBlockModelCollection = codeBlockModelCollection;
    this.rendererOptions = rendererOptions;
    this.textModelService = textModelService;
    this.instantiationService = instantiationService;
    const element = context.element;
    const markdownDecorationsRenderer = instantiationService.createInstance(ChatMarkdownDecorationsRenderer);
    const orderedDisposablesList = [];
    let codeBlockIndex = codeBlockStartIndex;
    const result = this._register(renderer.render(markdown, {
      fillInIncompleteTokens,
      codeBlockRendererSync: /* @__PURE__ */ __name((languageId, text, raw) => {
        const isCodeBlockComplete = !isResponseVM(context.element) || context.element.isComplete || !raw || raw?.endsWith("```");
        const index = codeBlockIndex++;
        let textModel;
        let range;
        let vulns;
        let codemapperUri;
        if (equalsIgnoreCase(languageId, localFileLanguageId)) {
          try {
            const parsedBody = parseLocalFileData(text);
            range = parsedBody.range && Range.lift(parsedBody.range);
            textModel = this.textModelService.createModelReference(parsedBody.uri).then((ref) => ref.object);
          } catch (e) {
            return $("div");
          }
        } else {
          const sessionId = isResponseVM(element) || isRequestVM(element) ? element.sessionId : "";
          const modelEntry = this.codeBlockModelCollection.getOrCreate(sessionId, element, index);
          vulns = modelEntry.vulns;
          codemapperUri = modelEntry.codemapperUri;
          textModel = modelEntry.model;
        }
        const hideToolbar = isResponseVM(element) && element.errorDetails?.responseIsFiltered;
        const codeBlockInfo = { languageId, textModel, codeBlockIndex: index, element, range, hideToolbar, parentContextKeyService: contextKeyService, vulns, codemapperUri };
        if (!rendererOptions.renderCodeBlockPills) {
          const ref = this.renderCodeBlock(codeBlockInfo, text, currentWidth, rendererOptions.editableCodeBlock);
          this.allRefs.push(ref);
          this._register(ref.object.onDidChangeContentHeight(() => this._onDidChangeHeight.fire()));
          const ownerMarkdownPartId = this.id;
          const info = new class {
            ownerMarkdownPartId = ownerMarkdownPartId;
            codeBlockIndex = index;
            element = element;
            isStreaming = !rendererOptions.renderCodeBlockPills;
            codemapperUri = void 0;
            // will be set async
            get uri() {
              return ref.object.uri;
            }
            focus() {
              ref.object.focus();
            }
            getContent() {
              return ref.object.editor.getValue();
            }
          }();
          this.codeblocks.push(info);
          orderedDisposablesList.push(ref);
          return ref.object.element;
        } else {
          const ref = this.renderCodeBlockPill(codeBlockInfo.codemapperUri, isCodeBlockComplete);
          if (isResponseVM(codeBlockInfo.element)) {
            this.codeBlockModelCollection.update(codeBlockInfo.element.sessionId, codeBlockInfo.element, codeBlockInfo.codeBlockIndex, { text, languageId: codeBlockInfo.languageId }).then((e) => {
              this.codeblocks[codeBlockInfo.codeBlockIndex].codemapperUri = e.codemapperUri;
              this._onDidChangeHeight.fire();
            });
          }
          this.allRefs.push(ref);
          const ownerMarkdownPartId = this.id;
          const info = new class {
            ownerMarkdownPartId = ownerMarkdownPartId;
            codeBlockIndex = index;
            element = element;
            isStreaming = !isCodeBlockComplete;
            codemapperUri = void 0;
            // will be set async
            get uri() {
              return void 0;
            }
            focus() {
              return ref.object.element.focus();
            }
            getContent() {
              return "";
            }
          }();
          this.codeblocks.push(info);
          orderedDisposablesList.push(ref);
          return ref.object.element;
        }
      }, "codeBlockRendererSync"),
      asyncRenderCallback: /* @__PURE__ */ __name(() => this._onDidChangeHeight.fire(), "asyncRenderCallback")
    }));
    this._register(markdownDecorationsRenderer.walkTreeAndAnnotateReferenceLinks(result.element));
    orderedDisposablesList.reverse().forEach((d) => this._register(d));
    this.domNode = result.element;
  }
  static {
    __name(this, "ChatMarkdownContentPart");
  }
  static idPool = 0;
  id = String(++ChatMarkdownContentPart.idPool);
  domNode;
  allRefs = [];
  _onDidChangeHeight = this._register(new Emitter());
  onDidChangeHeight = this._onDidChangeHeight.event;
  codeblocks = [];
  renderCodeBlockPill(codemapperUri, isCodeBlockComplete) {
    const codeBlock = this.instantiationService.createInstance(CollapsedCodeBlock);
    if (codemapperUri) {
      codeBlock.render(codemapperUri, !isCodeBlockComplete);
    }
    return {
      object: codeBlock,
      isStale: /* @__PURE__ */ __name(() => false, "isStale"),
      dispose: /* @__PURE__ */ __name(() => codeBlock.dispose(), "dispose")
    };
  }
  renderCodeBlock(data, text, currentWidth, editableCodeBlock) {
    const ref = this.editorPool.get();
    const editorInfo = ref.object;
    if (isResponseVM(data.element)) {
      this.codeBlockModelCollection.update(data.element.sessionId, data.element, data.codeBlockIndex, { text, languageId: data.languageId }).then((e) => {
        this.codeblocks[data.codeBlockIndex].codemapperUri = e.codemapperUri;
        this._onDidChangeHeight.fire();
      });
    }
    editorInfo.render(data, currentWidth, editableCodeBlock);
    return ref;
  }
  hasSameContent(other) {
    return other.kind === "markdownContent" && !!(other.content.value === this.markdown.value || this.rendererOptions.renderCodeBlockPills && this.codeblocks.at(-1)?.isStreaming && this.codeblocks.at(-1)?.codemapperUri !== void 0 && other.content.value.lastIndexOf("```") === this.markdown.value.lastIndexOf("```"));
  }
  layout(width) {
    this.allRefs.forEach((ref, index) => {
      if (ref.object instanceof CodeBlockPart) {
        ref.object.layout(width);
      } else if (ref.object instanceof CollapsedCodeBlock) {
        const codeblockModel = this.codeblocks[index];
        if (codeblockModel.codemapperUri && ref.object.uri?.toString() !== codeblockModel.codemapperUri.toString()) {
          ref.object.render(codeblockModel.codemapperUri, codeblockModel.isStreaming);
        }
      }
    });
  }
  addDisposable(disposable) {
    this._register(disposable);
  }
};
ChatMarkdownContentPart = __decorateClass([
  __decorateParam(9, IContextKeyService),
  __decorateParam(10, ITextModelService),
  __decorateParam(11, IInstantiationService)
], ChatMarkdownContentPart);
let EditorPool = class extends Disposable {
  static {
    __name(this, "EditorPool");
  }
  _pool;
  inUse() {
    return this._pool.inUse;
  }
  constructor(options, delegate, overflowWidgetsDomNode, instantiationService) {
    super();
    this._pool = this._register(new ResourcePool(() => {
      return instantiationService.createInstance(CodeBlockPart, options, MenuId.ChatCodeBlock, delegate, overflowWidgetsDomNode);
    }));
  }
  get() {
    const codeBlock = this._pool.get();
    let stale = false;
    return {
      object: codeBlock,
      isStale: /* @__PURE__ */ __name(() => stale, "isStale"),
      dispose: /* @__PURE__ */ __name(() => {
        codeBlock.reset();
        stale = true;
        this._pool.release(codeBlock);
      }, "dispose")
    };
  }
};
EditorPool = __decorateClass([
  __decorateParam(3, IInstantiationService)
], EditorPool);
let CollapsedCodeBlock = class extends Disposable {
  constructor(labelService, editorService, modelService, languageService) {
    super();
    this.labelService = labelService;
    this.editorService = editorService;
    this.modelService = modelService;
    this.languageService = languageService;
    this.element = $(".chat-codeblock-pill-widget");
    this.element.classList.add("show-file-icons");
    this._register(dom.addDisposableListener(this.element, "click", () => {
      if (this.uri) {
        this.editorService.openEditor({ resource: this.uri });
      }
    }));
  }
  static {
    __name(this, "CollapsedCodeBlock");
  }
  element;
  _uri;
  get uri() {
    return this._uri;
  }
  isStreaming;
  render(uri, isStreaming) {
    if (this.uri?.toString() === uri.toString() && this.isStreaming === isStreaming) {
      return;
    }
    this._uri = uri;
    this.isStreaming = isStreaming;
    const iconText = this.labelService.getUriBasenameLabel(uri);
    let iconClasses = [];
    if (isStreaming) {
      const codicon = ThemeIcon.modify(Codicon.loading, "spin");
      iconClasses = ThemeIcon.asClassNameArray(codicon);
    } else {
      const fileKind = uri.path.endsWith("/") ? FileKind.FOLDER : FileKind.FILE;
      iconClasses = getIconClasses(this.modelService, this.languageService, uri, fileKind);
    }
    const iconEl = dom.$("span.icon");
    iconEl.classList.add(...iconClasses);
    this.element.replaceChildren(iconEl, dom.$("span.icon-label", {}, iconText));
  }
};
CollapsedCodeBlock = __decorateClass([
  __decorateParam(0, ILabelService),
  __decorateParam(1, IEditorService),
  __decorateParam(2, IModelService),
  __decorateParam(3, ILanguageService)
], CollapsedCodeBlock);
export {
  ChatMarkdownContentPart,
  EditorPool
};
//# sourceMappingURL=chatMarkdownContentPart.js.map
