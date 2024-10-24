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
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { isPatternInWord } from "../../../../../base/common/filters.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { ResourceSet } from "../../../../../base/common/map.js";
import { URI } from "../../../../../base/common/uri.js";
import { generateUuid } from "../../../../../base/common/uuid.js";
import { Position } from "../../../../../editor/common/core/position.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { IWordAtPosition, getWordAtText } from "../../../../../editor/common/core/wordHelper.js";
import { CompletionContext, CompletionItem, CompletionItemKind, CompletionItemProvider, CompletionList } from "../../../../../editor/common/languages.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { ILanguageFeaturesService } from "../../../../../editor/common/services/languageFeatures.js";
import { localize } from "../../../../../nls.js";
import { Action2, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { CommandsRegistry } from "../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IInstantiationService, ServicesAccessor } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { Registry } from "../../../../../platform/registry/common/platform.js";
import { IWorkspaceContextService } from "../../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from "../../../../common/contributions.js";
import { IHistoryService } from "../../../../services/history/common/history.js";
import { LifecyclePhase } from "../../../../services/lifecycle/common/lifecycle.js";
import { QueryBuilder } from "../../../../services/search/common/queryBuilder.js";
import { ISearchService } from "../../../../services/search/common/search.js";
import { ChatAgentLocation, IChatAgentData, IChatAgentNameService, IChatAgentService, getFullyQualifiedId } from "../../common/chatAgents.js";
import { ChatRequestAgentPart, ChatRequestAgentSubcommandPart, ChatRequestTextPart, ChatRequestToolPart, ChatRequestVariablePart, chatAgentLeader, chatSubcommandLeader, chatVariableLeader } from "../../common/chatParserTypes.js";
import { IChatSlashCommandService } from "../../common/chatSlashCommands.js";
import { IChatVariablesService, IDynamicVariable } from "../../common/chatVariables.js";
import { ILanguageModelToolsService } from "../../common/languageModelToolsService.js";
import { SubmitAction } from "../actions/chatExecuteActions.js";
import { IChatWidget, IChatWidgetService } from "../chat.js";
import { ChatInputPart } from "../chatInputPart.js";
import { ChatDynamicVariableModel, SelectAndInsertFileAction } from "./chatDynamicVariables.js";
let SlashCommandCompletions = class extends Disposable {
  constructor(languageFeaturesService, chatWidgetService, chatSlashCommandService) {
    super();
    this.languageFeaturesService = languageFeaturesService;
    this.chatWidgetService = chatWidgetService;
    this.chatSlashCommandService = chatSlashCommandService;
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "globalSlashCommands",
      triggerCharacters: ["/"],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, _token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (!widget || !widget.viewModel) {
          return null;
        }
        const range = computeCompletionRanges(model, position, /\/\w*/g);
        if (!range) {
          return null;
        }
        const parsedRequest = widget.parsedInput.parts;
        const usedAgent = parsedRequest.find((p) => p instanceof ChatRequestAgentPart);
        if (usedAgent) {
          return;
        }
        const slashCommands = this.chatSlashCommandService.getCommands(widget.location);
        if (!slashCommands) {
          return null;
        }
        return {
          suggestions: slashCommands.map((c, i) => {
            const withSlash = `/${c.command}`;
            return {
              label: withSlash,
              insertText: c.executeImmediately ? "" : `${withSlash} `,
              detail: c.detail,
              range: new Range(1, 1, 1, 1),
              sortText: c.sortText ?? "a".repeat(i + 1),
              kind: CompletionItemKind.Text,
              // The icons are disabled here anyway,
              command: c.executeImmediately ? { id: SubmitAction.ID, title: withSlash, arguments: [{ widget, inputValue: `${withSlash} ` }] } : void 0
            };
          })
        };
      }, "provideCompletionItems")
    }));
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "globalSlashCommandsAt",
      triggerCharacters: ["@"],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, _token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (!widget || !widget.viewModel) {
          return null;
        }
        const range = computeCompletionRanges(model, position, /@\w*/g);
        if (!range) {
          return null;
        }
        const slashCommands = this.chatSlashCommandService.getCommands(widget.location);
        if (!slashCommands) {
          return null;
        }
        return {
          suggestions: slashCommands.map((c, i) => {
            const withSlash = `${chatSubcommandLeader}${c.command}`;
            return {
              label: withSlash,
              insertText: c.executeImmediately ? "" : `${withSlash} `,
              detail: c.detail,
              range: new Range(1, 1, 1, 1),
              filterText: `${chatAgentLeader}${c.command}`,
              sortText: c.sortText ?? "z".repeat(i + 1),
              kind: CompletionItemKind.Text,
              // The icons are disabled here anyway,
              command: c.executeImmediately ? { id: SubmitAction.ID, title: withSlash, arguments: [{ widget, inputValue: `${withSlash} ` }] } : void 0
            };
          })
        };
      }, "provideCompletionItems")
    }));
  }
  static {
    __name(this, "SlashCommandCompletions");
  }
};
SlashCommandCompletions = __decorateClass([
  __decorateParam(0, ILanguageFeaturesService),
  __decorateParam(1, IChatWidgetService),
  __decorateParam(2, IChatSlashCommandService)
], SlashCommandCompletions);
Registry.as(WorkbenchExtensions.Workbench).registerWorkbenchContribution(SlashCommandCompletions, LifecyclePhase.Eventually);
let AgentCompletions = class extends Disposable {
  constructor(languageFeaturesService, chatWidgetService, chatAgentService, chatAgentNameService) {
    super();
    this.languageFeaturesService = languageFeaturesService;
    this.chatWidgetService = chatWidgetService;
    this.chatAgentService = chatAgentService;
    this.chatAgentNameService = chatAgentNameService;
    const subCommandProvider = {
      _debugDisplayName: "chatAgentSubcommand",
      triggerCharacters: ["/"],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (!widget || !widget.viewModel) {
          return;
        }
        const range = computeCompletionRanges(model, position, /\/\w*/g);
        if (!range) {
          return null;
        }
        const parsedRequest = widget.parsedInput.parts;
        const usedAgentIdx = parsedRequest.findIndex((p) => p instanceof ChatRequestAgentPart);
        if (usedAgentIdx < 0) {
          return;
        }
        const usedSubcommand = parsedRequest.find((p) => p instanceof ChatRequestAgentSubcommandPart);
        if (usedSubcommand) {
          return;
        }
        for (const partAfterAgent of parsedRequest.slice(usedAgentIdx + 1)) {
          if (!(partAfterAgent instanceof ChatRequestTextPart) || !partAfterAgent.text.trim().match(/^(\/\w*)?$/)) {
            return;
          }
        }
        const usedAgent = parsedRequest[usedAgentIdx];
        return {
          suggestions: usedAgent.agent.slashCommands.map((c, i) => {
            const withSlash = `/${c.name}`;
            return {
              label: withSlash,
              insertText: `${withSlash} `,
              detail: c.description,
              range,
              kind: CompletionItemKind.Text
              // The icons are disabled here anyway
            };
          })
        };
      }, "provideCompletionItems")
    };
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, subCommandProvider));
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "chatAgentAndSubcommand",
      triggerCharacters: [chatAgentLeader],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        const viewModel = widget?.viewModel;
        if (!widget || !viewModel) {
          return;
        }
        const range = computeCompletionRanges(model, position, /(@|\/)\w*/g);
        if (!range) {
          return null;
        }
        const agents = this.chatAgentService.getAgents().filter((a) => a.locations.includes(widget.location));
        const getFilterText = /* @__PURE__ */ __name((agent, command) => {
          const dummyPrefix = agent.id === "github.copilot.terminalPanel" ? `0000` : ``;
          return `${chatAgentLeader}${dummyPrefix}${agent.name}.${command}`;
        }, "getFilterText");
        const justAgents = agents.filter((a) => !a.isDefault).map((agent) => {
          const { label: agentLabel, isDupe } = this.getAgentCompletionDetails(agent);
          const detail = agent.description;
          return {
            label: isDupe ? { label: agentLabel, description: agent.description, detail: ` (${agent.publisherDisplayName})` } : agentLabel,
            detail,
            filterText: `${chatAgentLeader}${agent.name}`,
            insertText: `${agentLabel} `,
            range: new Range(1, 1, 1, 1),
            kind: CompletionItemKind.Text,
            sortText: `${chatAgentLeader}${agent.name}`,
            command: { id: AssignSelectedAgentAction.ID, title: AssignSelectedAgentAction.ID, arguments: [{ agent, widget }] }
          };
        });
        return {
          suggestions: justAgents.concat(
            agents.flatMap((agent) => agent.slashCommands.map((c, i) => {
              const { label: agentLabel, isDupe } = this.getAgentCompletionDetails(agent);
              const label = `${agentLabel} ${chatSubcommandLeader}${c.name}`;
              const item = {
                label: isDupe ? { label, description: c.description, detail: isDupe ? ` (${agent.publisherDisplayName})` : void 0 } : label,
                detail: c.description,
                filterText: getFilterText(agent, c.name),
                commitCharacters: [" "],
                insertText: label + " ",
                range: new Range(1, 1, 1, 1),
                kind: CompletionItemKind.Text,
                // The icons are disabled here anyway
                sortText: `x${chatAgentLeader}${agent.name}${c.name}`,
                command: { id: AssignSelectedAgentAction.ID, title: AssignSelectedAgentAction.ID, arguments: [{ agent, widget }] }
              };
              if (agent.isDefault) {
                const label2 = `${chatSubcommandLeader}${c.name}`;
                item.label = label2;
                item.insertText = `${label2} `;
                item.detail = c.description;
              }
              return item;
            }))
          )
        };
      }, "provideCompletionItems")
    }));
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "chatAgentAndSubcommand",
      triggerCharacters: [chatSubcommandLeader],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        const viewModel = widget?.viewModel;
        if (!widget || !viewModel) {
          return;
        }
        const range = computeCompletionRanges(model, position, /(@|\/)\w*/g);
        if (!range) {
          return null;
        }
        const agents = this.chatAgentService.getAgents().filter((a) => a.locations.includes(widget.location));
        return {
          suggestions: agents.flatMap((agent) => agent.slashCommands.map((c, i) => {
            const { label: agentLabel, isDupe } = this.getAgentCompletionDetails(agent);
            const withSlash = `${chatSubcommandLeader}${c.name}`;
            const item = {
              label: { label: withSlash, description: agentLabel, detail: isDupe ? ` (${agent.publisherDisplayName})` : void 0 },
              commitCharacters: [" "],
              insertText: `${agentLabel} ${withSlash} `,
              detail: `(${agentLabel}) ${c.description ?? ""}`,
              range: new Range(1, 1, 1, 1),
              kind: CompletionItemKind.Text,
              // The icons are disabled here anyway
              sortText: `${chatSubcommandLeader}${agent.name}${c.name}`,
              command: { id: AssignSelectedAgentAction.ID, title: AssignSelectedAgentAction.ID, arguments: [{ agent, widget }] }
            };
            if (agent.isDefault) {
              const label = `${chatSubcommandLeader}${c.name}`;
              item.label = label;
              item.insertText = `${label} `;
              item.detail = c.description;
            }
            return item;
          }))
        };
      }, "provideCompletionItems")
    }));
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "installChatExtensions",
      triggerCharacters: [chatAgentLeader],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, token) => {
        if (!model.getLineContent(1).startsWith(chatAgentLeader)) {
          return;
        }
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (widget?.location !== ChatAgentLocation.Panel) {
          return;
        }
        const label = localize("installLabel", "Install Chat Extensions...");
        const item = {
          label,
          insertText: "",
          range: new Range(1, 1, 1, 1),
          kind: CompletionItemKind.Text,
          // The icons are disabled here anyway
          command: { id: "workbench.extensions.search", title: "", arguments: ["@tag:chat-participant"] },
          filterText: chatAgentLeader + label,
          sortText: "zzz"
        };
        return {
          suggestions: [item]
        };
      }, "provideCompletionItems")
    }));
  }
  static {
    __name(this, "AgentCompletions");
  }
  getAgentCompletionDetails(agent) {
    const isAllowed = this.chatAgentNameService.getAgentNameRestriction(agent);
    const agentLabel = `${chatAgentLeader}${isAllowed ? agent.name : getFullyQualifiedId(agent)}`;
    const isDupe = isAllowed && this.chatAgentService.agentHasDupeName(agent.id);
    return { label: agentLabel, isDupe };
  }
};
AgentCompletions = __decorateClass([
  __decorateParam(0, ILanguageFeaturesService),
  __decorateParam(1, IChatWidgetService),
  __decorateParam(2, IChatAgentService),
  __decorateParam(3, IChatAgentNameService)
], AgentCompletions);
Registry.as(WorkbenchExtensions.Workbench).registerWorkbenchContribution(AgentCompletions, LifecyclePhase.Eventually);
class AssignSelectedAgentAction extends Action2 {
  static {
    __name(this, "AssignSelectedAgentAction");
  }
  static ID = "workbench.action.chat.assignSelectedAgent";
  constructor() {
    super({
      id: AssignSelectedAgentAction.ID,
      title: ""
      // not displayed
    });
  }
  async run(accessor, ...args) {
    const arg = args[0];
    if (!arg || !arg.widget || !arg.agent) {
      return;
    }
    arg.widget.lastSelectedAgent = arg.agent;
  }
}
registerAction2(AssignSelectedAgentAction);
class ReferenceArgument {
  constructor(widget, variable) {
    this.widget = widget;
    this.variable = variable;
  }
  static {
    __name(this, "ReferenceArgument");
  }
}
let BuiltinDynamicCompletions = class extends Disposable {
  constructor(historyService, workspaceContextService, searchService, labelService, languageFeaturesService, chatWidgetService, instantiationService) {
    super();
    this.historyService = historyService;
    this.workspaceContextService = workspaceContextService;
    this.searchService = searchService;
    this.labelService = labelService;
    this.languageFeaturesService = languageFeaturesService;
    this.chatWidgetService = chatWidgetService;
    this.instantiationService = instantiationService;
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "chatDynamicCompletions",
      triggerCharacters: [chatVariableLeader],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, token) => {
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (!widget || !widget.supportsFileReferences) {
          return null;
        }
        const result = { suggestions: [] };
        const range = computeCompletionRanges(model, position, BuiltinDynamicCompletions.VariableNameDef, true);
        if (range) {
          const afterRange = new Range(position.lineNumber, range.replace.startColumn, position.lineNumber, range.replace.startColumn + "#file:".length);
          result.suggestions.push({
            label: `${chatVariableLeader}file`,
            insertText: `${chatVariableLeader}file:`,
            detail: localize("pickFileLabel", "Pick a file"),
            range,
            kind: CompletionItemKind.Text,
            command: { id: SelectAndInsertFileAction.ID, title: SelectAndInsertFileAction.ID, arguments: [{ widget, range: afterRange }] },
            sortText: "z"
          });
        }
        const range2 = computeCompletionRanges(model, position, new RegExp(`${chatVariableLeader}[^\\s]*`, "g"), true);
        if (range2) {
          await this.addFileEntries(widget, result, range2, token);
        }
        return result;
      }, "provideCompletionItems")
    }));
    this._register(CommandsRegistry.registerCommand(BuiltinDynamicCompletions.addReferenceCommand, (_services, arg) => this.cmdAddReference(arg)));
    this.queryBuilder = this.instantiationService.createInstance(QueryBuilder);
  }
  static {
    __name(this, "BuiltinDynamicCompletions");
  }
  static addReferenceCommand = "_addReferenceCmd";
  static VariableNameDef = new RegExp(`${chatVariableLeader}\\w*`, "g");
  // MUST be using `g`-flag
  queryBuilder;
  cacheKey;
  async addFileEntries(widget, result, info, token) {
    const makeFileCompletionItem = /* @__PURE__ */ __name((resource) => {
      const basename = this.labelService.getUriBasenameLabel(resource);
      const text = `${chatVariableLeader}file:${basename}`;
      return {
        label: { label: basename, description: this.labelService.getUriLabel(resource, { relative: true }) },
        filterText: `${chatVariableLeader}${basename}`,
        insertText: info.varWord?.endColumn === info.replace.endColumn ? `${text} ` : text,
        range: info,
        kind: CompletionItemKind.File,
        sortText: "{",
        // after `z`
        command: {
          id: BuiltinDynamicCompletions.addReferenceCommand,
          title: "",
          arguments: [new ReferenceArgument(widget, {
            id: "vscode.file",
            range: { startLineNumber: info.replace.startLineNumber, startColumn: info.replace.startColumn, endLineNumber: info.replace.endLineNumber, endColumn: info.replace.startColumn + text.length },
            data: resource
          })]
        }
      };
    }, "makeFileCompletionItem");
    let pattern;
    if (info.varWord?.word && info.varWord.word.startsWith(chatVariableLeader)) {
      pattern = info.varWord.word.toLowerCase().slice(1);
    }
    const seen = new ResourceSet();
    const len = result.suggestions.length;
    for (const item of this.historyService.getHistory()) {
      if (!item.resource || !this.workspaceContextService.getWorkspaceFolder(item.resource)) {
        continue;
      }
      if (pattern) {
        const basename = this.labelService.getUriBasenameLabel(item.resource).toLowerCase();
        if (!isPatternInWord(pattern, 0, pattern.length, basename, 0, basename.length)) {
          continue;
        }
      }
      seen.add(item.resource);
      const newLen = result.suggestions.push(makeFileCompletionItem(item.resource));
      if (newLen - len >= 5) {
        break;
      }
    }
    if (pattern) {
      if (this.cacheKey && Date.now() - this.cacheKey.time > 6e4) {
        this.searchService.clearCache(this.cacheKey.key);
        this.cacheKey = void 0;
      }
      if (!this.cacheKey) {
        this.cacheKey = {
          key: generateUuid(),
          time: Date.now()
        };
      }
      this.cacheKey.time = Date.now();
      const query = this.queryBuilder.file(this.workspaceContextService.getWorkspace().folders, {
        filePattern: pattern,
        sortByScore: true,
        maxResults: 250,
        cacheKey: this.cacheKey.key
      });
      const data = await this.searchService.fileSearch(query, token);
      for (const match of data.results) {
        if (seen.has(match.resource)) {
          continue;
        }
        result.suggestions.push(makeFileCompletionItem(match.resource));
      }
    }
    result.incomplete = true;
  }
  cmdAddReference(arg) {
    arg.widget.getContrib(ChatDynamicVariableModel.ID)?.addReference(arg.variable);
  }
};
BuiltinDynamicCompletions = __decorateClass([
  __decorateParam(0, IHistoryService),
  __decorateParam(1, IWorkspaceContextService),
  __decorateParam(2, ISearchService),
  __decorateParam(3, ILabelService),
  __decorateParam(4, ILanguageFeaturesService),
  __decorateParam(5, IChatWidgetService),
  __decorateParam(6, IInstantiationService)
], BuiltinDynamicCompletions);
Registry.as(WorkbenchExtensions.Workbench).registerWorkbenchContribution(BuiltinDynamicCompletions, LifecyclePhase.Eventually);
function computeCompletionRanges(model, position, reg, onlyOnWordStart = false) {
  const varWord = getWordAtText(position.column, reg, model.getLineContent(position.lineNumber), 0);
  if (!varWord && model.getWordUntilPosition(position).word) {
    return;
  }
  if (!varWord && position.column > 1) {
    const textBefore = model.getValueInRange(new Range(position.lineNumber, position.column - 1, position.lineNumber, position.column));
    if (textBefore !== " ") {
      return;
    }
  }
  if (varWord && onlyOnWordStart) {
    const wordBefore = model.getWordUntilPosition({ lineNumber: position.lineNumber, column: varWord.startColumn });
    if (wordBefore.word) {
      return;
    }
  }
  let insert;
  let replace;
  if (!varWord) {
    insert = replace = Range.fromPositions(position);
  } else {
    insert = new Range(position.lineNumber, varWord.startColumn, position.lineNumber, position.column);
    replace = new Range(position.lineNumber, varWord.startColumn, position.lineNumber, varWord.endColumn);
  }
  return { insert, replace, varWord };
}
__name(computeCompletionRanges, "computeCompletionRanges");
let VariableCompletions = class extends Disposable {
  // MUST be using `g`-flag
  constructor(languageFeaturesService, chatWidgetService, chatVariablesService, configService, toolsService) {
    super();
    this.languageFeaturesService = languageFeaturesService;
    this.chatWidgetService = chatWidgetService;
    this.chatVariablesService = chatVariablesService;
    this._register(this.languageFeaturesService.completionProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, hasAccessToAllModels: true }, {
      _debugDisplayName: "chatVariables",
      triggerCharacters: [chatVariableLeader],
      provideCompletionItems: /* @__PURE__ */ __name(async (model, position, _context, _token) => {
        const locations = /* @__PURE__ */ new Set();
        locations.add(ChatAgentLocation.Panel);
        locations.add(ChatAgentLocation.EditingSession);
        for (const value of Object.values(ChatAgentLocation)) {
          if (typeof value === "string" && configService.getValue(`chat.experimental.variables.${value}`)) {
            locations.add(value);
          }
        }
        const widget = this.chatWidgetService.getWidgetByInputUri(model.uri);
        if (!widget || !locations.has(widget.location)) {
          return null;
        }
        const range = computeCompletionRanges(model, position, VariableCompletions.VariableNameDef, true);
        if (!range) {
          return null;
        }
        const usedAgent = widget.parsedInput.parts.find((p) => p instanceof ChatRequestAgentPart);
        const slowSupported = usedAgent ? usedAgent.agent.metadata.supportsSlowVariables : true;
        const usedVariables = widget.parsedInput.parts.filter((p) => p instanceof ChatRequestVariablePart);
        const usedVariableNames = new Set(usedVariables.map((v) => v.variableName));
        const variableItems = Array.from(this.chatVariablesService.getVariables(widget.location)).filter((v) => !usedVariableNames.has(v.name)).filter((v) => !v.isSlow || slowSupported).map((v) => {
          const withLeader = `${chatVariableLeader}${v.name}`;
          return {
            label: withLeader,
            range,
            insertText: withLeader + " ",
            detail: v.description,
            kind: CompletionItemKind.Text,
            // The icons are disabled here anyway
            sortText: "z"
          };
        });
        const usedTools = widget.parsedInput.parts.filter((p) => p instanceof ChatRequestToolPart);
        const usedToolNames = new Set(usedTools.map((v) => v.toolName));
        const toolItems = [];
        toolItems.push(...Array.from(toolsService.getTools()).filter((t) => t.canBeReferencedInPrompt).filter((t) => !usedToolNames.has(t.toolReferenceName ?? "")).map((t) => {
          const withLeader = `${chatVariableLeader}${t.toolReferenceName}`;
          return {
            label: withLeader,
            range,
            insertText: withLeader + " ",
            detail: t.userDescription,
            kind: CompletionItemKind.Text,
            sortText: "z"
          };
        }));
        return {
          suggestions: [...variableItems, ...toolItems]
        };
      }, "provideCompletionItems")
    }));
  }
  static {
    __name(this, "VariableCompletions");
  }
  static VariableNameDef = new RegExp(`(?<=^|\\s)${chatVariableLeader}\\w*`, "g");
};
VariableCompletions = __decorateClass([
  __decorateParam(0, ILanguageFeaturesService),
  __decorateParam(1, IChatWidgetService),
  __decorateParam(2, IChatVariablesService),
  __decorateParam(3, IConfigurationService),
  __decorateParam(4, ILanguageModelToolsService)
], VariableCompletions);
Registry.as(WorkbenchExtensions.Workbench).registerWorkbenchContribution(VariableCompletions, LifecyclePhase.Eventually);
export {
  computeCompletionRanges
};
//# sourceMappingURL=chatInputCompletions.js.map
