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
import { TopError } from "./topError.js";
import { ChatModeKind } from "../../constants.js";
import { ModeHeader } from "./promptHeader/modeHeader.js";
import { URI } from "../../../../../../base/common/uri.js";
import { PromptToken } from "../codecs/tokens/promptToken.js";
import * as path from "../../../../../../base/common/path.js";
import { ChatPromptCodec } from "../codecs/chatPromptCodec.js";
import { FileReference } from "../codecs/tokens/fileReference.js";
import { assertDefined } from "../../../../../../base/common/types.js";
import { Emitter } from "../../../../../../base/common/event.js";
import { DeferredPromise } from "../../../../../../base/common/async.js";
import { InstructionsHeader } from "./promptHeader/instructionsHeader.js";
import { ILogService } from "../../../../../../platform/log/common/log.js";
import { PromptVariableWithData } from "../codecs/tokens/promptVariable.js";
import { assert, assertNever } from "../../../../../../base/common/assert.js";
import { basename, dirname } from "../../../../../../base/common/resources.js";
import { BaseToken } from "../codecs/base/baseToken.js";
import { PromptHeader } from "./promptHeader/promptHeader.js";
import { ObservableDisposable } from "../utils/observableDisposable.js";
import { INSTRUCTIONS_LANGUAGE_ID, MODE_LANGUAGE_ID, PROMPT_LANGUAGE_ID } from "../promptTypes.js";
import { LinesDecoder } from "../codecs/base/linesCodec/linesDecoder.js";
import { IWorkspaceContextService } from "../../../../../../platform/workspace/common/workspace.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { MarkdownLink } from "../codecs/base/markdownCodec/tokens/markdownLink.js";
import { MarkdownToken } from "../codecs/base/markdownCodec/tokens/markdownToken.js";
import { FrontMatterHeader } from "../codecs/base/markdownExtensionsCodec/tokens/frontMatterHeader.js";
import { RecursiveReference, ResolveError } from "../../promptFileReferenceErrors.js";
let BasePromptParser = class BasePromptParser2 extends ObservableDisposable {
  static {
    __name(this, "BasePromptParser");
  }
  /**
   * List of all tokens that were parsed from the prompt contents so far.
   */
  get tokens() {
    return [...this.receivedTokens];
  }
  /**
   * Reference to the prompt header object that holds metadata associated
   * with the prompt.
   */
  get header() {
    return this.promptHeader;
  }
  /**
   * Get contents of the prompt body.
   */
  async getBody() {
    const startLineNumber = this.header !== void 0 ? this.header.range.endLineNumber + 1 : 1;
    const decoder = new LinesDecoder(await this.promptContentsProvider.contents);
    const tokens = (await decoder.consumeAll()).filter(({ range }) => {
      return range.startLineNumber >= startLineNumber;
    });
    return BaseToken.render(tokens);
  }
  /**
   * Event that is fired when the current prompt parser is settled.
   */
  onSettled(callback) {
    const disposable = this._onSettled.event(callback);
    const streamEnded = this.stream?.ended && this.stream.isDisposed === false;
    if (streamEnded || this.errorCondition) {
      setTimeout(callback.bind(void 0, this.errorCondition));
      return disposable;
    }
    return disposable;
  }
  /**
   * If file reference resolution fails, this attribute will be set
   * to an error instance that describes the error condition.
   */
  get errorCondition() {
    return this._errorCondition;
  }
  /**
   * Whether file references resolution failed.
   * Set to `undefined` if the `resolve` method hasn't been ever called yet.
   */
  get resolveFailed() {
    if (!this.firstParseResult.gotFirstResult) {
      return void 0;
    }
    return !!this._errorCondition;
  }
  /**
   * Returned promise is resolved when the parser process is settled.
   * The settled state means that the prompt parser stream exists and
   * has ended, or an error condition has been set in case of failure.
   *
   * Furthermore, this function can be called multiple times and will
   * block until the latest prompt contents parsing logic is settled
   * (e.g., for every `onContentChanged` event of the prompt source).
   */
  async settled() {
    assert(this.started, "Cannot wait on the parser that did not start yet.");
    await this.firstParseResult.promise;
    if (this.errorCondition) {
      return this;
    }
    if (this.isDisposed) {
      return this;
    }
    assertDefined(this.stream, "No stream reference found.");
    await this.stream.settled;
    if (this.promptHeader) {
      await this.promptHeader.settled;
    }
    return this;
  }
  /**
   * Same as {@link settled} but also waits for all possible
   * nested child prompt references and their children to be settled.
   */
  async allSettled() {
    await this.settled();
    return this;
  }
  constructor(promptContentsProvider, options, instantiationService, workspaceService, logService) {
    super();
    this.promptContentsProvider = promptContentsProvider;
    this.instantiationService = instantiationService;
    this.workspaceService = workspaceService;
    this.logService = logService;
    this.receivedTokens = [];
    this._references = [];
    this._onUpdate = this._register(new Emitter());
    this.onUpdate = this._onUpdate.event;
    this._onSettled = this._register(new Emitter());
    this.firstParseResult = new FirstParseResult();
    this.started = false;
    this.options = options;
    const seenReferences = [...this.options.seenReferences];
    if (seenReferences.includes(this.uri.path)) {
      seenReferences.push(this.uri.path);
      this._errorCondition = new RecursiveReference(this.uri, seenReferences);
      this._onUpdate.fire();
      this.firstParseResult.end();
      return this;
    }
    seenReferences.push(this.uri.path);
    this._register(this.promptContentsProvider.onContentChanged((streamOrError) => {
      this.onContentsChanged(streamOrError, seenReferences);
      this.firstParseResult.end();
    }));
    this._register(this.promptContentsProvider.onDispose(this.dispose.bind(this)));
  }
  /**
   * Handler the event event that is triggered when prompt contents change.
   *
   * @param streamOrError Either a binary stream of file contents, or an error object
   * 						that was generated during the reference resolve attempt.
   * @param seenReferences List of parent references that we've have already seen
   * 					 	during the process of traversing the references tree. It's
   * 						used to prevent the tree navigation to fall into an infinite
   * 						references recursion.
   */
  onContentsChanged(streamOrError, seenReferences) {
    this.stream?.dispose();
    delete this.stream;
    delete this._errorCondition;
    this.receivedTokens = [];
    this.promptHeader?.dispose();
    delete this.promptHeader;
    this.disposeReferences();
    if (streamOrError instanceof ResolveError) {
      this._errorCondition = streamOrError;
      this._onUpdate.fire();
      this._onSettled.fire(streamOrError);
      return;
    }
    this.stream = ChatPromptCodec.decode(streamOrError);
    this.stream.on("error", this.onStreamEnd.bind(this, this.stream));
    this.stream.on("end", this.onStreamEnd.bind(this, this.stream));
    this.stream.on("data", (token) => {
      if (token instanceof MarkdownToken || token instanceof PromptToken) {
        this.receivedTokens.push(token);
      }
      if (token instanceof FrontMatterHeader) {
        return this.createHeader(token);
      }
      if (token instanceof PromptVariableWithData) {
        try {
          this.handleLinkToken(FileReference.from(token), [...seenReferences]);
        } catch (error) {
        }
      }
      if (token instanceof MarkdownLink && !token.isURL) {
        this.handleLinkToken(token, [...seenReferences]);
      }
    });
    if (this.stream.isDisposed) {
      this.logService.warn(`[prompt parser][${basename(this.uri)}] cannot start stream that has been already disposed, aborting`);
      return;
    }
    this.stream.start();
  }
  /**
   * Create header object base on the target prompt file language ID.
   * The language ID is important here, because it defines what type
   * of metadata is valid for a prompt file and what type of related
   * diagnostics we would show to the user.
   */
  createHeader(headerToken) {
    const { languageId } = this.promptContentsProvider;
    if (languageId === PROMPT_LANGUAGE_ID) {
      this.promptHeader = new PromptHeader(headerToken, languageId);
    }
    if (languageId === INSTRUCTIONS_LANGUAGE_ID) {
      this.promptHeader = new InstructionsHeader(headerToken, languageId);
    }
    if (languageId === MODE_LANGUAGE_ID) {
      this.promptHeader = new ModeHeader(headerToken, languageId);
    }
    this.promptHeader?.start();
  }
  /**
   * Handle a new reference token inside prompt contents.
   */
  handleLinkToken(token, seenReferences) {
    const { parentFolder } = this;
    const referenceUri = parentFolder !== null && path.isAbsolute(token.path) === false ? URI.joinPath(parentFolder, token.path) : URI.file(token.path);
    this._references.push(new PromptReference(referenceUri, token));
    this._onUpdate.fire();
    return this;
  }
  /**
   * Handle the `stream` end event.
   *
   * @param stream The stream that has ended.
   * @param error Optional error object if stream ended with an error.
   */
  onStreamEnd(stream, error) {
    if (stream.isDisposed === true) {
      return this;
    }
    if (error) {
      this.logService.warn(`[prompt parser][${basename(this.uri)}] received an error on the chat prompt decoder stream: ${error}`);
    }
    this._onUpdate.fire();
    this._onSettled.fire(error);
    return this;
  }
  disposeReferences() {
    this._references.length = 0;
  }
  /**
   * Start the prompt parser.
   */
  start(token) {
    if (this.started) {
      return this;
    }
    this.started = true;
    if (this.errorCondition) {
      return this;
    }
    this.promptContentsProvider.start(token);
    return this;
  }
  /**
   * Associated URI of the prompt.
   */
  get uri() {
    return this.promptContentsProvider.uri;
  }
  /**
   * Get the parent folder URI of the prompt.
   * For instance, if prompt URI points to a file on a disk, this
   * function will return the folder URI that contains that file,
   * but if the URI points to an `untitled` document, will try to
   * use a different folder URI based on the workspace state.
   */
  get parentFolder() {
    if (this.uri.scheme === "file") {
      return dirname(this.uri);
    }
    const { folders } = this.workspaceService.getWorkspace();
    if (folders.length === 1) {
      return folders[0].uri;
    }
    return null;
  }
  /**
   * Get a list of immediate child references of the prompt.
   */
  get references() {
    return [...this._references];
  }
  /**
   * Valid metadata records defined in the prompt header.
   */
  get metadata() {
    const { promptType } = this.promptContentsProvider;
    if (promptType === "non-prompt") {
      return null;
    }
    if (this.header === void 0) {
      return { promptType };
    }
    if (this.header instanceof InstructionsHeader || this.header instanceof ModeHeader) {
      return { promptType, ...this.header.metadata };
    }
    const { tools, mode, description, model } = this.header.metadata;
    const result = {};
    if (description !== void 0) {
      result.description = description;
    }
    if (tools !== void 0 && mode !== ChatModeKind.Ask && mode !== ChatModeKind.Edit) {
      result.tools = tools;
      result.mode = ChatModeKind.Agent;
    } else if (mode !== void 0) {
      result.mode = mode;
    }
    if (model !== void 0) {
      result.model = model;
    }
    return { promptType, ...result };
  }
  /**
   * The top most error of the current reference or any of its
   * possible child reference errors.
   */
  get topError() {
    if (this.errorCondition) {
      return new TopError({
        errorSubject: "root",
        errorsCount: 1,
        originalError: this.errorCondition
      });
    }
    return void 0;
  }
  /**
   * Returns a string representation of this object.
   */
  toString() {
    return `prompt:${this.uri.path}`;
  }
  /**
   * @inheritdoc
   */
  dispose() {
    if (this.isDisposed) {
      return;
    }
    this.disposeReferences();
    this.stream?.dispose();
    delete this.stream;
    this.promptHeader?.dispose();
    delete this.promptHeader;
    super.dispose();
  }
};
BasePromptParser = __decorate([
  __param(2, IInstantiationService),
  __param(3, IWorkspaceContextService),
  __param(4, ILogService)
], BasePromptParser);
class PromptReference {
  static {
    __name(this, "PromptReference");
  }
  constructor(uri, token) {
    this.uri = uri;
    this.token = token;
  }
  /**
   * Get the range of the `link` part of the reference.
   */
  get linkRange() {
    if (this.token instanceof FileReference) {
      return this.token.dataRange;
    }
    if (this.token instanceof MarkdownLink) {
      return this.token.linkRange;
    }
    return void 0;
  }
  /**
   * Type of the reference, - either a prompt `#file` variable,
   * or a `markdown link` reference (`[caption](/path/to/file.md)`).
   */
  get type() {
    if (this.token instanceof FileReference) {
      return "file";
    }
    if (this.token instanceof MarkdownLink) {
      return "file";
    }
    assertNever(this.token, `Unknown token type '${this.token}'.`);
  }
  /**
   * Subtype of the reference, - either a prompt `#file` variable,
   * or a `markdown link` reference (`[caption](/path/to/file.md)`).
   */
  get subtype() {
    if (this.token instanceof FileReference) {
      return "prompt";
    }
    if (this.token instanceof MarkdownLink) {
      return "markdown";
    }
    assertNever(this.token, `Unknown token type '${this.token}'.`);
  }
  get range() {
    return this.token.range;
  }
  get path() {
    return this.token.path;
  }
  get text() {
    return this.token.text;
  }
  /**
   * Returns a string representation of this object.
   */
  toString() {
    return `prompt-reference/${this.type}:${this.subtype}/${this.token}`;
  }
}
class FirstParseResult extends DeferredPromise {
  static {
    __name(this, "FirstParseResult");
  }
  constructor() {
    super(...arguments);
    this._gotResult = false;
  }
  /**
   * Whether we've received at least one result.
   */
  get gotFirstResult() {
    return this._gotResult;
  }
  /**
   * Get underlying promise reference.
   */
  get promise() {
    return this.p;
  }
  /**
   * Complete the underlying promise.
   */
  end() {
    this._gotResult = true;
    super.complete(void 0).catch(() => {
    });
    return;
  }
}
export {
  BasePromptParser,
  PromptReference
};
//# sourceMappingURL=basePromptParser.js.map
