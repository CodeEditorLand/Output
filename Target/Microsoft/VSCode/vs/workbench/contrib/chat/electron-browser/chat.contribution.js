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
import { localize } from "../../../../nls.js";
import { InlineVoiceChatAction, QuickVoiceChatAction, StartVoiceChatAction, VoiceChatInChatViewAction, StopListeningAction, StopListeningAndSubmitAction, KeywordActivationContribution, InstallSpeechProviderForVoiceChatAction, HoldToVoiceChatInChatViewAction, ReadChatResponseAloud, StopReadAloud, StopReadChatItemAloud } from "./actions/voiceChatActions.js";
import { registerAction2 } from "../../../../platform/actions/common/actions.js";
import { registerWorkbenchContribution2 } from "../../../common/contributions.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILanguageModelToolsService } from "../common/languageModelToolsService.js";
import { FetchWebPageTool, FetchWebPageToolData } from "./tools/fetchPageTool.js";
import { registerChatDeveloperActions } from "./actions/chatDeveloperActions.js";
import { INativeWorkbenchEnvironmentService } from "../../../services/environment/electron-browser/environmentService.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { ACTION_ID_NEW_CHAT, CHAT_OPEN_ACTION_ID } from "../browser/actions/chatActions.js";
import { ChatModeKind } from "../common/constants.js";
import { ipcRenderer } from "../../../../base/parts/sandbox/electron-browser/globals.js";
import { IWorkspaceTrustRequestService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { URI } from "../../../../base/common/uri.js";
import { resolve } from "../../../../base/common/path.js";
import { showChatView } from "../browser/chat.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { ILogService } from "../../../../platform/log/common/log.js";
let NativeBuiltinToolsContribution = class NativeBuiltinToolsContribution2 extends Disposable {
  static {
    __name(this, "NativeBuiltinToolsContribution");
  }
  static {
    this.ID = "chat.nativeBuiltinTools";
  }
  constructor(toolsService, instantiationService) {
    super();
    const editTool = instantiationService.createInstance(FetchWebPageTool);
    this._register(toolsService.registerToolData(FetchWebPageToolData));
    this._register(toolsService.registerToolImplementation(FetchWebPageToolData.id, editTool));
  }
};
NativeBuiltinToolsContribution = __decorate([
  __param(0, ILanguageModelToolsService),
  __param(1, IInstantiationService)
], NativeBuiltinToolsContribution);
let ChatCommandLineHandler = class ChatCommandLineHandler2 extends Disposable {
  static {
    __name(this, "ChatCommandLineHandler");
  }
  static {
    this.ID = "workbench.contrib.chatCommandLineHandler";
  }
  constructor(environmentService, commandService, workspaceTrustRequestService, viewsService, logService) {
    super();
    this.environmentService = environmentService;
    this.commandService = commandService;
    this.workspaceTrustRequestService = workspaceTrustRequestService;
    this.viewsService = viewsService;
    this.logService = logService;
    this.registerListeners();
  }
  registerListeners() {
    ipcRenderer.on("vscode:handleChatRequest", (_, args) => {
      this.logService.trace("vscode:handleChatRequest", args);
      this.prompt(args);
    });
  }
  async prompt(args) {
    if (!Array.isArray(args?._)) {
      return;
    }
    const trusted = await this.workspaceTrustRequestService.requestWorkspaceTrust({
      message: localize("copilotWorkspaceTrust", "Copilot is currently only supported in trusted workspaces.")
    });
    if (!trusted) {
      return;
    }
    const opts = {
      query: args._.length > 0 ? args._.join(" ") : "",
      mode: args.mode ?? ChatModeKind.Agent,
      attachFiles: args["add-file"]?.map((file) => URI.file(resolve(file)))
      // use `resolve` to deal with relative paths properly
    };
    const chatWidget = await showChatView(this.viewsService);
    await chatWidget?.waitForReady();
    await this.commandService.executeCommand(ACTION_ID_NEW_CHAT);
    await this.commandService.executeCommand(CHAT_OPEN_ACTION_ID, opts);
  }
};
ChatCommandLineHandler = __decorate([
  __param(0, INativeWorkbenchEnvironmentService),
  __param(1, ICommandService),
  __param(2, IWorkspaceTrustRequestService),
  __param(3, IViewsService),
  __param(4, ILogService)
], ChatCommandLineHandler);
registerAction2(StartVoiceChatAction);
registerAction2(InstallSpeechProviderForVoiceChatAction);
registerAction2(VoiceChatInChatViewAction);
registerAction2(HoldToVoiceChatInChatViewAction);
registerAction2(QuickVoiceChatAction);
registerAction2(InlineVoiceChatAction);
registerAction2(StopListeningAction);
registerAction2(StopListeningAndSubmitAction);
registerAction2(ReadChatResponseAloud);
registerAction2(StopReadChatItemAloud);
registerAction2(StopReadAloud);
registerChatDeveloperActions();
registerWorkbenchContribution2(
  KeywordActivationContribution.ID,
  KeywordActivationContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
registerWorkbenchContribution2(
  NativeBuiltinToolsContribution.ID,
  NativeBuiltinToolsContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
registerWorkbenchContribution2(
  ChatCommandLineHandler.ID,
  ChatCommandLineHandler,
  2
  /* WorkbenchPhase.BlockRestore */
);
//# sourceMappingURL=chat.contribution.js.map
