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
import { match, splitGlobAware } from "../../../../../base/common/glob.js";
import { ResourceMap, ResourceSet } from "../../../../../base/common/map.js";
import { Schemas } from "../../../../../base/common/network.js";
import { basename, joinPath } from "../../../../../base/common/resources.js";
import { localize } from "../../../../../nls.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { ILogService } from "../../../../../platform/log/common/log.js";
import { IWorkspaceContextService } from "../../../../../platform/workspace/common/workspace.js";
import { IChatRequestVariableEntry, isPromptFileVariableEntry, toPromptFileVariableEntry, toPromptTextVariableEntry, PromptFileVariableKind } from "../chatVariableEntries.js";
import { PromptsConfig } from "./config/config.js";
import { COPILOT_CUSTOM_INSTRUCTIONS_FILENAME, isPromptOrInstructionsFile } from "./config/promptFileLocations.js";
import { PromptsType } from "./promptTypes.js";
import { IPromptsService } from "./service/promptsService.js";
let ComputeAutomaticInstructions = class ComputeAutomaticInstructions2 {
  static {
    __name(this, "ComputeAutomaticInstructions");
  }
  constructor(_readFileTool, _promptsService, _logService, _labelService, _configurationService, _workspaceService, _fileService) {
    this._readFileTool = _readFileTool;
    this._promptsService = _promptsService;
    this._logService = _logService;
    this._labelService = _labelService;
    this._configurationService = _configurationService;
    this._workspaceService = _workspaceService;
    this._fileService = _fileService;
    this._parseResults = new ResourceMap();
    this._autoAddedInstructions = [];
  }
  get autoAddedInstructions() {
    return this._autoAddedInstructions;
  }
  async _parseInstructionsFile(uri, token) {
    if (this._parseResults.has(uri)) {
      return this._parseResults.get(uri);
    }
    const result = await this._promptsService.parse(uri, PromptsType.instructions, token);
    this._parseResults.set(uri, result);
    return result;
  }
  async collect(variables, token) {
    const instructionFiles = await this._promptsService.listPromptFiles(PromptsType.instructions, token);
    this._logService.trace(`[InstructionsContextComputer] ${instructionFiles.length} instruction files available.`);
    const context = this._getContext(variables);
    const autoAddedInstructions = await this.findInstructionFilesFor(instructionFiles, context, token);
    variables.add(...autoAddedInstructions);
    this._autoAddedInstructions.push(...autoAddedInstructions);
    const copilotInstructions = await this._getCopilotInstructions();
    for (const entry of copilotInstructions) {
      variables.add(entry);
    }
    this._logService.trace(`[InstructionsContextComputer]  ${copilotInstructions.length} Copilot instructions files added.`);
    const instructionsWithPatternsList = await this._getInstructionsWithPatternsList(instructionFiles, variables, token);
    if (instructionsWithPatternsList.length > 0) {
      const text = instructionsWithPatternsList.join("\n");
      variables.add(toPromptTextVariableEntry(text, PromptsConfig.COPILOT_INSTRUCTIONS));
    }
    await this._addReferencedInstructions(variables, token);
  }
  /** public for testing */
  async findInstructionFilesFor(instructionFiles, context, token) {
    const autoAddedInstructions = [];
    for (const instructionFile of instructionFiles) {
      const { metadata, uri } = await this._parseInstructionsFile(instructionFile.uri, token);
      if (metadata?.promptType !== PromptsType.instructions) {
        this._logService.trace(`[InstructionsContextComputer] Not an instruction file: ${uri}`);
        continue;
      }
      const applyTo = metadata?.applyTo;
      if (!applyTo) {
        this._logService.trace(`[InstructionsContextComputer] No 'applyTo' found: ${uri}`);
        continue;
      }
      if (context.instructions.has(uri)) {
        this._logService.trace(`[InstructionsContextComputer] Skipping already processed instruction file: ${uri}`);
        continue;
      }
      const match2 = this._matches(context.files, applyTo);
      if (match2) {
        this._logService.trace(`[InstructionsContextComputer] Match for ${uri} with ${match2.pattern}${match2.file ? ` for file ${match2.file}` : ""}`);
        const reason = !match2.file ? localize("instruction.file.reason.allFiles", "Automatically attached as pattern is **") : localize("instruction.file.reason.specificFile", "Automatically attached as pattern {0} matches {1}", applyTo, this._labelService.getUriLabel(match2.file, { relative: true }));
        autoAddedInstructions.push(toPromptFileVariableEntry(uri, PromptFileVariableKind.Instruction, reason));
      } else {
        this._logService.trace(`[InstructionsContextComputer] No match for ${uri} with ${applyTo}`);
      }
    }
    return autoAddedInstructions;
  }
  _getContext(attachedContext) {
    const files = new ResourceSet();
    const instructions = new ResourceSet();
    for (const variable of attachedContext.asArray()) {
      if (isPromptFileVariableEntry(variable)) {
        instructions.add(variable.value);
      } else {
        const uri = IChatRequestVariableEntry.toUri(variable);
        if (uri) {
          files.add(uri);
        }
      }
    }
    return { files, instructions };
  }
  async _getCopilotInstructions() {
    const useCopilotInstructionsFiles = this._configurationService.getValue(PromptsConfig.USE_COPILOT_INSTRUCTION_FILES);
    if (!useCopilotInstructionsFiles) {
      return [];
    }
    const instructionFiles = [];
    instructionFiles.push(`.github/` + COPILOT_CUSTOM_INSTRUCTIONS_FILENAME);
    const { folders } = this._workspaceService.getWorkspace();
    const entries = [];
    for (const folder of folders) {
      for (const instructionFilePath of instructionFiles) {
        const file = joinPath(folder.uri, instructionFilePath);
        if (await this._fileService.exists(file)) {
          entries.push(toPromptFileVariableEntry(file, PromptFileVariableKind.Instruction, localize("instruction.file.reason.copilot", "Automatically attached as setting {0} is enabled", PromptsConfig.USE_COPILOT_INSTRUCTION_FILES)));
        }
      }
    }
    return entries;
  }
  _matches(files, applyToPattern) {
    const patterns = splitGlobAware(applyToPattern, ",");
    const patterMatches = /* @__PURE__ */ __name((pattern) => {
      pattern = pattern.trim();
      if (pattern.length === 0) {
        return void 0;
      }
      if (pattern === "**" || pattern === "**/*" || pattern === "*") {
        return { pattern };
      }
      if (!pattern.startsWith("/") && !pattern.startsWith("**/")) {
        pattern = "**/" + pattern;
      }
      for (const file of files) {
        if (match(pattern, file.path)) {
          return { pattern, file };
        }
      }
      return void 0;
    }, "patterMatches");
    for (const pattern of patterns) {
      const matchResult = patterMatches(pattern);
      if (matchResult) {
        return matchResult;
      }
    }
    return void 0;
  }
  async _getInstructionsWithPatternsList(instructionFiles, _existingVariables, token) {
    if (!this._readFileTool) {
      this._logService.trace("[InstructionsContextComputer] No readFile tool available, skipping instructions with patterns list.");
      return [];
    }
    const entries = [];
    for (const instructionFile of instructionFiles) {
      const { metadata, uri } = await this._parseInstructionsFile(instructionFile.uri, token);
      if (metadata?.promptType !== PromptsType.instructions) {
        continue;
      }
      const applyTo = metadata?.applyTo;
      const description = metadata?.description ?? "";
      if (applyTo && applyTo !== "**" && applyTo !== "**/*" && applyTo !== "*") {
        entries.push(`| ${metadata.applyTo} | '${getFilePath(uri)}' | ${description} |`);
      }
    }
    if (entries.length === 0) {
      return entries;
    }
    const toolName = "read_file";
    return [
      "Here is a list of instruction files that contain rules for modifying or creating new code.",
      "These files are important for ensuring that the code is modified or created correctly.",
      "Please make sure to follow the rules specified in these files when working with the codebase.",
      `If the file is not already available as attachment, use the \`${toolName}\` tool to acquire it.`,
      "Make sure to acquire the instructions before making any changes to the code.",
      "| Pattern | File Path | Description |",
      "| ------- | --------- | ----------- |"
    ].concat(entries);
  }
  async _addReferencedInstructions(attachedContext, token) {
    const seen = new ResourceSet();
    const todo = [];
    for (const variable of attachedContext.asArray()) {
      if (isPromptFileVariableEntry(variable)) {
        if (!seen.has(variable.value)) {
          todo.push(variable.value);
          seen.add(variable.value);
        }
      }
    }
    let next = todo.pop();
    while (next) {
      const result = await this._parseInstructionsFile(next, token);
      const refsToCheck = [];
      for (const ref of result.references) {
        if (!seen.has(ref) && isPromptOrInstructionsFile(ref)) {
          refsToCheck.push({ resource: ref });
          seen.add(ref);
        }
      }
      if (refsToCheck.length > 0) {
        const stats = await this._fileService.resolveAll(refsToCheck);
        for (let i = 0; i < stats.length; i++) {
          const stat = stats[i];
          const uri = refsToCheck[i].resource;
          if (stat.success && stat.stat?.isFile) {
            todo.push(uri);
            const reason = localize("instruction.file.reason.referenced", "Referenced by {0}", basename(next));
            attachedContext.add(toPromptFileVariableEntry(uri, PromptFileVariableKind.InstructionReference, reason));
          }
        }
      }
      next = todo.pop();
    }
  }
};
ComputeAutomaticInstructions = __decorate([
  __param(1, IPromptsService),
  __param(2, ILogService),
  __param(3, ILabelService),
  __param(4, IConfigurationService),
  __param(5, IWorkspaceContextService),
  __param(6, IFileService)
], ComputeAutomaticInstructions);
function getFilePath(uri) {
  if (uri.scheme === Schemas.file || uri.scheme === Schemas.vscodeRemote) {
    return uri.fsPath;
  }
  return uri.toString();
}
__name(getFilePath, "getFilePath");
export {
  ComputeAutomaticInstructions
};
//# sourceMappingURL=computeAutomaticInstructions.js.map
