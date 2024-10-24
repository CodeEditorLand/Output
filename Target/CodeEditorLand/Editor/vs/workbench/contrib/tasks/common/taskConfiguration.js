var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as nls from "../../../../nls.js";
import * as Objects from "../../../../base/common/objects.js";
import { IStringDictionary } from "../../../../base/common/collections.js";
import { IJSONSchemaMap } from "../../../../base/common/jsonSchema.js";
import { Platform } from "../../../../base/common/platform.js";
import * as Types from "../../../../base/common/types.js";
import * as UUID from "../../../../base/common/uuid.js";
import { ValidationStatus, IProblemReporter as IProblemReporterBase } from "../../../../base/common/parsers.js";
import {
  INamedProblemMatcher,
  ProblemMatcherParser,
  Config as ProblemMatcherConfig,
  isNamedProblemMatcher,
  ProblemMatcherRegistry,
  ProblemMatcher
} from "./problemMatcher.js";
import { IWorkspaceFolder, IWorkspace } from "../../../../platform/workspace/common/workspace.js";
import * as Tasks from "./tasks.js";
import { ITaskDefinitionRegistry, TaskDefinitionRegistry } from "./taskDefinitionRegistry.js";
import { ConfiguredInput } from "../../../services/configurationResolver/common/configurationResolver.js";
import { URI } from "../../../../base/common/uri.js";
import { ShellExecutionSupportedContext, ProcessExecutionSupportedContext } from "./taskService.js";
import { IContextKeyService, RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
var ShellQuoting = /* @__PURE__ */ ((ShellQuoting2) => {
  ShellQuoting2[ShellQuoting2["escape"] = 1] = "escape";
  ShellQuoting2[ShellQuoting2["strong"] = 2] = "strong";
  ShellQuoting2[ShellQuoting2["weak"] = 3] = "weak";
  return ShellQuoting2;
})(ShellQuoting || {});
var ITaskIdentifier;
((ITaskIdentifier2) => {
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && Types.isString(value.type);
  }
  ITaskIdentifier2.is = is;
  __name(is, "is");
})(ITaskIdentifier || (ITaskIdentifier = {}));
var CommandString;
((CommandString2) => {
  function value(value2) {
    if (Types.isString(value2)) {
      return value2;
    } else if (Types.isStringArray(value2)) {
      return value2.join(" ");
    } else {
      if (Types.isString(value2.value)) {
        return value2.value;
      } else {
        return value2.value.join(" ");
      }
    }
  }
  CommandString2.value = value;
  __name(value, "value");
})(CommandString || (CommandString = {}));
var ProblemMatcherKind = /* @__PURE__ */ ((ProblemMatcherKind2) => {
  ProblemMatcherKind2[ProblemMatcherKind2["Unknown"] = 0] = "Unknown";
  ProblemMatcherKind2[ProblemMatcherKind2["String"] = 1] = "String";
  ProblemMatcherKind2[ProblemMatcherKind2["ProblemMatcher"] = 2] = "ProblemMatcher";
  ProblemMatcherKind2[ProblemMatcherKind2["Array"] = 3] = "Array";
  return ProblemMatcherKind2;
})(ProblemMatcherKind || {});
const EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function assignProperty(target, source, key) {
  const sourceAtKey = source[key];
  if (sourceAtKey !== void 0) {
    target[key] = sourceAtKey;
  }
}
__name(assignProperty, "assignProperty");
function fillProperty(target, source, key) {
  const sourceAtKey = source[key];
  if (target[key] === void 0 && sourceAtKey !== void 0) {
    target[key] = sourceAtKey;
  }
}
__name(fillProperty, "fillProperty");
function _isEmpty(value, properties, allowEmptyArray = false) {
  if (value === void 0 || value === null || properties === void 0) {
    return true;
  }
  for (const meta of properties) {
    const property = value[meta.property];
    if (property !== void 0 && property !== null) {
      if (meta.type !== void 0 && !meta.type.isEmpty(property)) {
        return false;
      } else if (!Array.isArray(property) || property.length > 0 || allowEmptyArray) {
        return false;
      }
    }
  }
  return true;
}
__name(_isEmpty, "_isEmpty");
function _assignProperties(target, source, properties) {
  if (!source || _isEmpty(source, properties)) {
    return target;
  }
  if (!target || _isEmpty(target, properties)) {
    return source;
  }
  for (const meta of properties) {
    const property = meta.property;
    let value;
    if (meta.type !== void 0) {
      value = meta.type.assignProperties(target[property], source[property]);
    } else {
      value = source[property];
    }
    if (value !== void 0 && value !== null) {
      target[property] = value;
    }
  }
  return target;
}
__name(_assignProperties, "_assignProperties");
function _fillProperties(target, source, properties, allowEmptyArray = false) {
  if (!source || _isEmpty(source, properties)) {
    return target;
  }
  if (!target || _isEmpty(target, properties, allowEmptyArray)) {
    return source;
  }
  for (const meta of properties) {
    const property = meta.property;
    let value;
    if (meta.type) {
      value = meta.type.fillProperties(target[property], source[property]);
    } else if (target[property] === void 0) {
      value = source[property];
    }
    if (value !== void 0 && value !== null) {
      target[property] = value;
    }
  }
  return target;
}
__name(_fillProperties, "_fillProperties");
function _fillDefaults(target, defaults, properties, context) {
  if (target && Object.isFrozen(target)) {
    return target;
  }
  if (target === void 0 || target === null || defaults === void 0 || defaults === null) {
    if (defaults !== void 0 && defaults !== null) {
      return Objects.deepClone(defaults);
    } else {
      return void 0;
    }
  }
  for (const meta of properties) {
    const property = meta.property;
    if (target[property] !== void 0) {
      continue;
    }
    let value;
    if (meta.type) {
      value = meta.type.fillDefaults(target[property], context);
    } else {
      value = defaults[property];
    }
    if (value !== void 0 && value !== null) {
      target[property] = value;
    }
  }
  return target;
}
__name(_fillDefaults, "_fillDefaults");
function _freeze(target, properties) {
  if (target === void 0 || target === null) {
    return void 0;
  }
  if (Object.isFrozen(target)) {
    return target;
  }
  for (const meta of properties) {
    if (meta.type) {
      const value = target[meta.property];
      if (value) {
        meta.type.freeze(value);
      }
    }
  }
  Object.freeze(target);
  return target;
}
__name(_freeze, "_freeze");
var RunOnOptions;
((RunOnOptions2) => {
  function fromString(value) {
    if (!value) {
      return Tasks.RunOnOptions.default;
    }
    switch (value.toLowerCase()) {
      case "folderopen":
        return Tasks.RunOnOptions.folderOpen;
      case "default":
      default:
        return Tasks.RunOnOptions.default;
    }
  }
  RunOnOptions2.fromString = fromString;
  __name(fromString, "fromString");
})(RunOnOptions || (RunOnOptions = {}));
var RunOptions;
((RunOptions2) => {
  const properties = [{ property: "reevaluateOnRerun" }, { property: "runOn" }, { property: "instanceLimit" }];
  function fromConfiguration(value) {
    return {
      reevaluateOnRerun: value ? value.reevaluateOnRerun : true,
      runOn: value ? RunOnOptions.fromString(value.runOn) : Tasks.RunOnOptions.default,
      instanceLimit: value ? value.instanceLimit : 1
    };
  }
  RunOptions2.fromConfiguration = fromConfiguration;
  __name(fromConfiguration, "fromConfiguration");
  function assignProperties(target, source) {
    return _assignProperties(target, source, properties);
  }
  RunOptions2.assignProperties = assignProperties;
  __name(assignProperties, "assignProperties");
  function fillProperties(target, source) {
    return _fillProperties(target, source, properties);
  }
  RunOptions2.fillProperties = fillProperties;
  __name(fillProperties, "fillProperties");
})(RunOptions || (RunOptions = {}));
var ShellConfiguration;
((ShellConfiguration2) => {
  const properties = [{ property: "executable" }, { property: "args" }, { property: "quoting" }];
  function is(value) {
    const candidate = value;
    return candidate && (Types.isString(candidate.executable) || Types.isStringArray(candidate.args));
  }
  ShellConfiguration2.is = is;
  __name(is, "is");
  function from(config, context) {
    if (!is(config)) {
      return void 0;
    }
    const result = {};
    if (config.executable !== void 0) {
      result.executable = config.executable;
    }
    if (config.args !== void 0) {
      result.args = config.args.slice();
    }
    if (config.quoting !== void 0) {
      result.quoting = Objects.deepClone(config.quoting);
    }
    return result;
  }
  ShellConfiguration2.from = from;
  __name(from, "from");
  function isEmpty(value) {
    return _isEmpty(value, properties, true);
  }
  ShellConfiguration2.isEmpty = isEmpty;
  __name(isEmpty, "isEmpty");
  function assignProperties(target, source) {
    return _assignProperties(target, source, properties);
  }
  ShellConfiguration2.assignProperties = assignProperties;
  __name(assignProperties, "assignProperties");
  function fillProperties(target, source) {
    return _fillProperties(target, source, properties, true);
  }
  ShellConfiguration2.fillProperties = fillProperties;
  __name(fillProperties, "fillProperties");
  function fillDefaults(value, context) {
    return value;
  }
  ShellConfiguration2.fillDefaults = fillDefaults;
  __name(fillDefaults, "fillDefaults");
  function freeze(value) {
    if (!value) {
      return void 0;
    }
    return Object.freeze(value);
  }
  ShellConfiguration2.freeze = freeze;
  __name(freeze, "freeze");
})(ShellConfiguration || (ShellConfiguration = {}));
var CommandOptions;
((CommandOptions2) => {
  const properties = [{ property: "cwd" }, { property: "env" }, { property: "shell", type: ShellConfiguration }];
  const defaults = { cwd: "${workspaceFolder}" };
  function from(options, context) {
    const result = {};
    if (options.cwd !== void 0) {
      if (Types.isString(options.cwd)) {
        result.cwd = options.cwd;
      } else {
        context.taskLoadIssues.push(nls.localize("ConfigurationParser.invalidCWD", "Warning: options.cwd must be of type string. Ignoring value {0}\n", options.cwd));
      }
    }
    if (options.env !== void 0) {
      result.env = Objects.deepClone(options.env);
    }
    result.shell = ShellConfiguration.from(options.shell, context);
    return isEmpty(result) ? void 0 : result;
  }
  CommandOptions2.from = from;
  __name(from, "from");
  function isEmpty(value) {
    return _isEmpty(value, properties);
  }
  CommandOptions2.isEmpty = isEmpty;
  __name(isEmpty, "isEmpty");
  function assignProperties(target, source) {
    if (source === void 0 || isEmpty(source)) {
      return target;
    }
    if (target === void 0 || isEmpty(target)) {
      return source;
    }
    assignProperty(target, source, "cwd");
    if (target.env === void 0) {
      target.env = source.env;
    } else if (source.env !== void 0) {
      const env = /* @__PURE__ */ Object.create(null);
      if (target.env !== void 0) {
        Object.keys(target.env).forEach((key) => env[key] = target.env[key]);
      }
      if (source.env !== void 0) {
        Object.keys(source.env).forEach((key) => env[key] = source.env[key]);
      }
      target.env = env;
    }
    target.shell = ShellConfiguration.assignProperties(target.shell, source.shell);
    return target;
  }
  CommandOptions2.assignProperties = assignProperties;
  __name(assignProperties, "assignProperties");
  function fillProperties(target, source) {
    return _fillProperties(target, source, properties);
  }
  CommandOptions2.fillProperties = fillProperties;
  __name(fillProperties, "fillProperties");
  function fillDefaults(value, context) {
    return _fillDefaults(value, defaults, properties, context);
  }
  CommandOptions2.fillDefaults = fillDefaults;
  __name(fillDefaults, "fillDefaults");
  function freeze(value) {
    return _freeze(value, properties);
  }
  CommandOptions2.freeze = freeze;
  __name(freeze, "freeze");
})(CommandOptions || (CommandOptions = {}));
var CommandConfiguration;
((CommandConfiguration2) => {
  let PresentationOptions;
  ((PresentationOptions2) => {
    const properties2 = [{ property: "echo" }, { property: "reveal" }, { property: "revealProblems" }, { property: "focus" }, { property: "panel" }, { property: "showReuseMessage" }, { property: "clear" }, { property: "group" }, { property: "close" }];
    function from2(config, context) {
      let echo;
      let reveal;
      let revealProblems;
      let focus;
      let panel;
      let showReuseMessage;
      let clear;
      let group;
      let close;
      let hasProps = false;
      if (Types.isBoolean(config.echoCommand)) {
        echo = config.echoCommand;
        hasProps = true;
      }
      if (Types.isString(config.showOutput)) {
        reveal = Tasks.RevealKind.fromString(config.showOutput);
        hasProps = true;
      }
      const presentation = config.presentation || config.terminal;
      if (presentation) {
        if (Types.isBoolean(presentation.echo)) {
          echo = presentation.echo;
        }
        if (Types.isString(presentation.reveal)) {
          reveal = Tasks.RevealKind.fromString(presentation.reveal);
        }
        if (Types.isString(presentation.revealProblems)) {
          revealProblems = Tasks.RevealProblemKind.fromString(presentation.revealProblems);
        }
        if (Types.isBoolean(presentation.focus)) {
          focus = presentation.focus;
        }
        if (Types.isString(presentation.panel)) {
          panel = Tasks.PanelKind.fromString(presentation.panel);
        }
        if (Types.isBoolean(presentation.showReuseMessage)) {
          showReuseMessage = presentation.showReuseMessage;
        }
        if (Types.isBoolean(presentation.clear)) {
          clear = presentation.clear;
        }
        if (Types.isString(presentation.group)) {
          group = presentation.group;
        }
        if (Types.isBoolean(presentation.close)) {
          close = presentation.close;
        }
        hasProps = true;
      }
      if (!hasProps) {
        return void 0;
      }
      return { echo, reveal, revealProblems, focus, panel, showReuseMessage, clear, group, close };
    }
    PresentationOptions2.from = from2;
    __name(from2, "from");
    function assignProperties2(target, source) {
      return _assignProperties(target, source, properties2);
    }
    PresentationOptions2.assignProperties = assignProperties2;
    __name(assignProperties2, "assignProperties");
    function fillProperties2(target, source) {
      return _fillProperties(target, source, properties2);
    }
    PresentationOptions2.fillProperties = fillProperties2;
    __name(fillProperties2, "fillProperties");
    function fillDefaults2(value, context) {
      const defaultEcho = context.engine === Tasks.ExecutionEngine.Terminal ? true : false;
      return _fillDefaults(value, { echo: defaultEcho, reveal: Tasks.RevealKind.Always, revealProblems: Tasks.RevealProblemKind.Never, focus: false, panel: Tasks.PanelKind.Shared, showReuseMessage: true, clear: false }, properties2, context);
    }
    PresentationOptions2.fillDefaults = fillDefaults2;
    __name(fillDefaults2, "fillDefaults");
    function freeze2(value) {
      return _freeze(value, properties2);
    }
    PresentationOptions2.freeze = freeze2;
    __name(freeze2, "freeze");
    function isEmpty2(value) {
      return _isEmpty(value, properties2);
    }
    PresentationOptions2.isEmpty = isEmpty2;
    __name(isEmpty2, "isEmpty");
  })(PresentationOptions = CommandConfiguration2.PresentationOptions || (CommandConfiguration2.PresentationOptions = {}));
  let ShellString;
  ((ShellString2) => {
    function from2(value) {
      if (value === void 0 || value === null) {
        return void 0;
      }
      if (Types.isString(value)) {
        return value;
      } else if (Types.isStringArray(value)) {
        return value.join(" ");
      } else {
        const quoting = Tasks.ShellQuoting.from(value.quoting);
        const result = Types.isString(value.value) ? value.value : Types.isStringArray(value.value) ? value.value.join(" ") : void 0;
        if (result) {
          return {
            value: result,
            quoting
          };
        } else {
          return void 0;
        }
      }
    }
    ShellString2.from = from2;
    __name(from2, "from");
  })(ShellString || (ShellString = {}));
  const properties = [
    { property: "runtime" },
    { property: "name" },
    { property: "options", type: CommandOptions },
    { property: "args" },
    { property: "taskSelector" },
    { property: "suppressTaskName" },
    { property: "presentation", type: PresentationOptions }
  ];
  function from(config, context) {
    let result = fromBase(config, context);
    let osConfig = void 0;
    if (config.windows && context.platform === Platform.Windows) {
      osConfig = fromBase(config.windows, context);
    } else if (config.osx && context.platform === Platform.Mac) {
      osConfig = fromBase(config.osx, context);
    } else if (config.linux && context.platform === Platform.Linux) {
      osConfig = fromBase(config.linux, context);
    }
    if (osConfig) {
      result = assignProperties(result, osConfig, context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0);
    }
    return isEmpty(result) ? void 0 : result;
  }
  CommandConfiguration2.from = from;
  __name(from, "from");
  function fromBase(config, context) {
    const name = ShellString.from(config.command);
    let runtime;
    if (Types.isString(config.type)) {
      if (config.type === "shell" || config.type === "process") {
        runtime = Tasks.RuntimeType.fromString(config.type);
      }
    }
    if (Types.isBoolean(config.isShellCommand) || ShellConfiguration.is(config.isShellCommand)) {
      runtime = Tasks.RuntimeType.Shell;
    } else if (config.isShellCommand !== void 0) {
      runtime = !!config.isShellCommand ? Tasks.RuntimeType.Shell : Tasks.RuntimeType.Process;
    }
    const result = {
      name,
      runtime,
      presentation: PresentationOptions.from(config, context)
    };
    if (config.args !== void 0) {
      result.args = [];
      for (const arg of config.args) {
        const converted = ShellString.from(arg);
        if (converted !== void 0) {
          result.args.push(converted);
        } else {
          context.taskLoadIssues.push(
            nls.localize(
              "ConfigurationParser.inValidArg",
              "Error: command argument must either be a string or a quoted string. Provided value is:\n{0}",
              arg ? JSON.stringify(arg, void 0, 4) : "undefined"
            )
          );
        }
      }
    }
    if (config.options !== void 0) {
      result.options = CommandOptions.from(config.options, context);
      if (result.options && result.options.shell === void 0 && ShellConfiguration.is(config.isShellCommand)) {
        result.options.shell = ShellConfiguration.from(config.isShellCommand, context);
        if (context.engine !== Tasks.ExecutionEngine.Terminal) {
          context.taskLoadIssues.push(nls.localize("ConfigurationParser.noShell", "Warning: shell configuration is only supported when executing tasks in the terminal."));
        }
      }
    }
    if (Types.isString(config.taskSelector)) {
      result.taskSelector = config.taskSelector;
    }
    if (Types.isBoolean(config.suppressTaskName)) {
      result.suppressTaskName = config.suppressTaskName;
    }
    return isEmpty(result) ? void 0 : result;
  }
  __name(fromBase, "fromBase");
  function hasCommand(value) {
    return value && !!value.name;
  }
  CommandConfiguration2.hasCommand = hasCommand;
  __name(hasCommand, "hasCommand");
  function isEmpty(value) {
    return _isEmpty(value, properties);
  }
  CommandConfiguration2.isEmpty = isEmpty;
  __name(isEmpty, "isEmpty");
  function assignProperties(target, source, overwriteArgs) {
    if (isEmpty(source)) {
      return target;
    }
    if (isEmpty(target)) {
      return source;
    }
    assignProperty(target, source, "name");
    assignProperty(target, source, "runtime");
    assignProperty(target, source, "taskSelector");
    assignProperty(target, source, "suppressTaskName");
    if (source.args !== void 0) {
      if (target.args === void 0 || overwriteArgs) {
        target.args = source.args;
      } else {
        target.args = target.args.concat(source.args);
      }
    }
    target.presentation = PresentationOptions.assignProperties(target.presentation, source.presentation);
    target.options = CommandOptions.assignProperties(target.options, source.options);
    return target;
  }
  CommandConfiguration2.assignProperties = assignProperties;
  __name(assignProperties, "assignProperties");
  function fillProperties(target, source) {
    return _fillProperties(target, source, properties);
  }
  CommandConfiguration2.fillProperties = fillProperties;
  __name(fillProperties, "fillProperties");
  function fillGlobals(target, source, taskName) {
    if (source === void 0 || isEmpty(source)) {
      return target;
    }
    target = target || {
      name: void 0,
      runtime: void 0,
      presentation: void 0
    };
    if (target.name === void 0) {
      fillProperty(target, source, "name");
      fillProperty(target, source, "taskSelector");
      fillProperty(target, source, "suppressTaskName");
      let args = source.args ? source.args.slice() : [];
      if (!target.suppressTaskName && taskName) {
        if (target.taskSelector !== void 0) {
          args.push(target.taskSelector + taskName);
        } else {
          args.push(taskName);
        }
      }
      if (target.args) {
        args = args.concat(target.args);
      }
      target.args = args;
    }
    fillProperty(target, source, "runtime");
    target.presentation = PresentationOptions.fillProperties(target.presentation, source.presentation);
    target.options = CommandOptions.fillProperties(target.options, source.options);
    return target;
  }
  CommandConfiguration2.fillGlobals = fillGlobals;
  __name(fillGlobals, "fillGlobals");
  function fillDefaults(value, context) {
    if (!value || Object.isFrozen(value)) {
      return;
    }
    if (value.name !== void 0 && value.runtime === void 0) {
      value.runtime = Tasks.RuntimeType.Process;
    }
    value.presentation = PresentationOptions.fillDefaults(value.presentation, context);
    if (!isEmpty(value)) {
      value.options = CommandOptions.fillDefaults(value.options, context);
    }
    if (value.args === void 0) {
      value.args = EMPTY_ARRAY;
    }
    if (value.suppressTaskName === void 0) {
      value.suppressTaskName = context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0;
    }
  }
  CommandConfiguration2.fillDefaults = fillDefaults;
  __name(fillDefaults, "fillDefaults");
  function freeze(value) {
    return _freeze(value, properties);
  }
  CommandConfiguration2.freeze = freeze;
  __name(freeze, "freeze");
})(CommandConfiguration || (CommandConfiguration = {}));
var ProblemMatcherConverter;
((ProblemMatcherConverter2) => {
  function namedFrom(declares, context) {
    const result = /* @__PURE__ */ Object.create(null);
    if (!Array.isArray(declares)) {
      return result;
    }
    declares.forEach((value) => {
      const namedProblemMatcher = new ProblemMatcherParser(context.problemReporter).parse(value);
      if (isNamedProblemMatcher(namedProblemMatcher)) {
        result[namedProblemMatcher.name] = namedProblemMatcher;
      } else {
        context.problemReporter.error(nls.localize("ConfigurationParser.noName", "Error: Problem Matcher in declare scope must have a name:\n{0}\n", JSON.stringify(value, void 0, 4)));
      }
    });
    return result;
  }
  ProblemMatcherConverter2.namedFrom = namedFrom;
  __name(namedFrom, "namedFrom");
  function fromWithOsConfig(external, context) {
    let result = {};
    if (external.windows && external.windows.problemMatcher && context.platform === Platform.Windows) {
      result = from(external.windows.problemMatcher, context);
    } else if (external.osx && external.osx.problemMatcher && context.platform === Platform.Mac) {
      result = from(external.osx.problemMatcher, context);
    } else if (external.linux && external.linux.problemMatcher && context.platform === Platform.Linux) {
      result = from(external.linux.problemMatcher, context);
    } else if (external.problemMatcher) {
      result = from(external.problemMatcher, context);
    }
    return result;
  }
  ProblemMatcherConverter2.fromWithOsConfig = fromWithOsConfig;
  __name(fromWithOsConfig, "fromWithOsConfig");
  function from(config, context) {
    const result = [];
    if (config === void 0) {
      return { value: result };
    }
    const errors = [];
    function addResult(matcher) {
      if (matcher.value) {
        result.push(matcher.value);
      }
      if (matcher.errors) {
        errors.push(...matcher.errors);
      }
    }
    __name(addResult, "addResult");
    const kind = getProblemMatcherKind(config);
    if (kind === 0 /* Unknown */) {
      const error = nls.localize(
        "ConfigurationParser.unknownMatcherKind",
        "Warning: the defined problem matcher is unknown. Supported types are string | ProblemMatcher | Array<string | ProblemMatcher>.\n{0}\n",
        JSON.stringify(config, null, 4)
      );
      context.problemReporter.warn(error);
    } else if (kind === 1 /* String */ || kind === 2 /* ProblemMatcher */) {
      addResult(resolveProblemMatcher(config, context));
    } else if (kind === 3 /* Array */) {
      const problemMatchers = config;
      problemMatchers.forEach((problemMatcher) => {
        addResult(resolveProblemMatcher(problemMatcher, context));
      });
    }
    return { value: result, errors };
  }
  ProblemMatcherConverter2.from = from;
  __name(from, "from");
  function getProblemMatcherKind(value) {
    if (Types.isString(value)) {
      return 1 /* String */;
    } else if (Array.isArray(value)) {
      return 3 /* Array */;
    } else if (!Types.isUndefined(value)) {
      return 2 /* ProblemMatcher */;
    } else {
      return 0 /* Unknown */;
    }
  }
  __name(getProblemMatcherKind, "getProblemMatcherKind");
  function resolveProblemMatcher(value, context) {
    if (Types.isString(value)) {
      let variableName = value;
      if (variableName.length > 1 && variableName[0] === "$") {
        variableName = variableName.substring(1);
        const global = ProblemMatcherRegistry.get(variableName);
        if (global) {
          return { value: Objects.deepClone(global) };
        }
        let localProblemMatcher = context.namedProblemMatchers[variableName];
        if (localProblemMatcher) {
          localProblemMatcher = Objects.deepClone(localProblemMatcher);
          delete localProblemMatcher.name;
          return { value: localProblemMatcher };
        }
      }
      return { errors: [nls.localize("ConfigurationParser.invalidVariableReference", "Error: Invalid problemMatcher reference: {0}\n", value)] };
    } else {
      const json = value;
      return { value: new ProblemMatcherParser(context.problemReporter).parse(json) };
    }
  }
  __name(resolveProblemMatcher, "resolveProblemMatcher");
})(ProblemMatcherConverter || (ProblemMatcherConverter = {}));
var GroupKind;
((GroupKind2) => {
  function from(external) {
    if (external === void 0) {
      return void 0;
    } else if (Types.isString(external) && Tasks.TaskGroup.is(external)) {
      return { _id: external, isDefault: false };
    } else if (Types.isString(external.kind) && Tasks.TaskGroup.is(external.kind)) {
      const group = external.kind;
      const isDefault = Types.isUndefined(external.isDefault) ? false : external.isDefault;
      return { _id: group, isDefault };
    }
    return void 0;
  }
  GroupKind2.from = from;
  __name(from, "from");
  function to(group) {
    if (Types.isString(group)) {
      return group;
    } else if (!group.isDefault) {
      return group._id;
    }
    return {
      kind: group._id,
      isDefault: group.isDefault
    };
  }
  GroupKind2.to = to;
  __name(to, "to");
})(GroupKind || (GroupKind = {}));
var TaskDependency;
((TaskDependency2) => {
  function uriFromSource(context, source) {
    switch (source) {
      case 2 /* User */:
        return Tasks.USER_TASKS_GROUP_KEY;
      case 0 /* TasksJson */:
        return context.workspaceFolder.uri;
      default:
        return context.workspace && context.workspace.configuration ? context.workspace.configuration : context.workspaceFolder.uri;
    }
  }
  __name(uriFromSource, "uriFromSource");
  function from(external, context, source) {
    if (Types.isString(external)) {
      return { uri: uriFromSource(context, source), task: external };
    } else if (ITaskIdentifier.is(external)) {
      return {
        uri: uriFromSource(context, source),
        task: Tasks.TaskDefinition.createTaskIdentifier(external, context.problemReporter)
      };
    } else {
      return void 0;
    }
  }
  TaskDependency2.from = from;
  __name(from, "from");
})(TaskDependency || (TaskDependency = {}));
var DependsOrder;
((DependsOrder2) => {
  function from(order) {
    switch (order) {
      case Tasks.DependsOrder.sequence:
        return Tasks.DependsOrder.sequence;
      case Tasks.DependsOrder.parallel:
      default:
        return Tasks.DependsOrder.parallel;
    }
  }
  DependsOrder2.from = from;
  __name(from, "from");
})(DependsOrder || (DependsOrder = {}));
var ConfigurationProperties;
((ConfigurationProperties2) => {
  const properties = [
    { property: "name" },
    { property: "identifier" },
    { property: "group" },
    { property: "isBackground" },
    { property: "promptOnClose" },
    { property: "dependsOn" },
    { property: "presentation", type: CommandConfiguration.PresentationOptions },
    { property: "problemMatchers" },
    { property: "options" },
    { property: "icon" },
    { property: "hide" }
  ];
  function from(external, context, includeCommandOptions, source, properties2) {
    if (!external) {
      return {};
    }
    const result = {};
    if (properties2) {
      for (const propertyName of Object.keys(properties2)) {
        if (external[propertyName] !== void 0) {
          result[propertyName] = Objects.deepClone(external[propertyName]);
        }
      }
    }
    if (Types.isString(external.taskName)) {
      result.name = external.taskName;
    }
    if (Types.isString(external.label) && context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0) {
      result.name = external.label;
    }
    if (Types.isString(external.identifier)) {
      result.identifier = external.identifier;
    }
    result.icon = external.icon;
    result.hide = external.hide;
    if (external.isBackground !== void 0) {
      result.isBackground = !!external.isBackground;
    }
    if (external.promptOnClose !== void 0) {
      result.promptOnClose = !!external.promptOnClose;
    }
    result.group = GroupKind.from(external.group);
    if (external.dependsOn !== void 0) {
      if (Array.isArray(external.dependsOn)) {
        result.dependsOn = external.dependsOn.reduce((dependencies, item) => {
          const dependency = TaskDependency.from(item, context, source);
          if (dependency) {
            dependencies.push(dependency);
          }
          return dependencies;
        }, []);
      } else {
        const dependsOnValue = TaskDependency.from(external.dependsOn, context, source);
        result.dependsOn = dependsOnValue ? [dependsOnValue] : void 0;
      }
    }
    result.dependsOrder = DependsOrder.from(external.dependsOrder);
    if (includeCommandOptions && (external.presentation !== void 0 || external.terminal !== void 0)) {
      result.presentation = CommandConfiguration.PresentationOptions.from(external, context);
    }
    if (includeCommandOptions && external.options !== void 0) {
      result.options = CommandOptions.from(external.options, context);
    }
    const configProblemMatcher = ProblemMatcherConverter.fromWithOsConfig(external, context);
    if (configProblemMatcher.value !== void 0) {
      result.problemMatchers = configProblemMatcher.value;
    }
    if (external.detail) {
      result.detail = external.detail;
    }
    return isEmpty(result) ? {} : { value: result, errors: configProblemMatcher.errors };
  }
  ConfigurationProperties2.from = from;
  __name(from, "from");
  function isEmpty(value) {
    return _isEmpty(value, properties);
  }
  ConfigurationProperties2.isEmpty = isEmpty;
  __name(isEmpty, "isEmpty");
})(ConfigurationProperties || (ConfigurationProperties = {}));
const label = "Workspace";
var ConfiguringTask;
((ConfiguringTask2) => {
  const grunt = "grunt.";
  const jake = "jake.";
  const gulp = "gulp.";
  const npm = "vscode.npm.";
  const typescript = "vscode.typescript.";
  function from(external, context, index, source, registry) {
    if (!external) {
      return void 0;
    }
    const type = external.type;
    const customize = external.customize;
    if (!type && !customize) {
      context.problemReporter.error(nls.localize("ConfigurationParser.noTaskType", "Error: tasks configuration must have a type property. The configuration will be ignored.\n{0}\n", JSON.stringify(external, null, 4)));
      return void 0;
    }
    const typeDeclaration = type ? registry?.get?.(type) || TaskDefinitionRegistry.get(type) : void 0;
    if (!typeDeclaration) {
      const message = nls.localize("ConfigurationParser.noTypeDefinition", "Error: there is no registered task type '{0}'. Did you miss installing an extension that provides a corresponding task provider?", type);
      context.problemReporter.error(message);
      return void 0;
    }
    let identifier;
    if (Types.isString(customize)) {
      if (customize.indexOf(grunt) === 0) {
        identifier = { type: "grunt", task: customize.substring(grunt.length) };
      } else if (customize.indexOf(jake) === 0) {
        identifier = { type: "jake", task: customize.substring(jake.length) };
      } else if (customize.indexOf(gulp) === 0) {
        identifier = { type: "gulp", task: customize.substring(gulp.length) };
      } else if (customize.indexOf(npm) === 0) {
        identifier = { type: "npm", script: customize.substring(npm.length + 4) };
      } else if (customize.indexOf(typescript) === 0) {
        identifier = { type: "typescript", tsconfig: customize.substring(typescript.length + 6) };
      }
    } else {
      if (Types.isString(external.type)) {
        identifier = external;
      }
    }
    if (identifier === void 0) {
      context.problemReporter.error(nls.localize(
        "ConfigurationParser.missingType",
        "Error: the task configuration '{0}' is missing the required property 'type'. The task configuration will be ignored.",
        JSON.stringify(external, void 0, 0)
      ));
      return void 0;
    }
    const taskIdentifier = Tasks.TaskDefinition.createTaskIdentifier(identifier, context.problemReporter);
    if (taskIdentifier === void 0) {
      context.problemReporter.error(nls.localize(
        "ConfigurationParser.incorrectType",
        "Error: the task configuration '{0}' is using an unknown type. The task configuration will be ignored.",
        JSON.stringify(external, void 0, 0)
      ));
      return void 0;
    }
    const configElement = {
      workspaceFolder: context.workspaceFolder,
      file: ".vscode/tasks.json",
      index,
      element: external
    };
    let taskSource;
    switch (source) {
      case 2 /* User */: {
        taskSource = { kind: Tasks.TaskSourceKind.User, config: configElement, label };
        break;
      }
      case 1 /* WorkspaceFile */: {
        taskSource = { kind: Tasks.TaskSourceKind.WorkspaceFile, config: configElement, label };
        break;
      }
      default: {
        taskSource = { kind: Tasks.TaskSourceKind.Workspace, config: configElement, label };
        break;
      }
    }
    const result = new Tasks.ConfiguringTask(
      `${typeDeclaration.extensionId}.${taskIdentifier._key}`,
      taskSource,
      void 0,
      type,
      taskIdentifier,
      RunOptions.fromConfiguration(external.runOptions),
      { hide: external.hide }
    );
    const configuration = ConfigurationProperties.from(external, context, true, source, typeDeclaration.properties);
    result.addTaskLoadMessages(configuration.errors);
    if (configuration.value) {
      result.configurationProperties = Object.assign(result.configurationProperties, configuration.value);
      if (result.configurationProperties.name) {
        result._label = result.configurationProperties.name;
      } else {
        let label2 = result.configures.type;
        if (typeDeclaration.required && typeDeclaration.required.length > 0) {
          for (const required of typeDeclaration.required) {
            const value = result.configures[required];
            if (value) {
              label2 = label2 + ": " + value;
              break;
            }
          }
        }
        result._label = label2;
      }
      if (!result.configurationProperties.identifier) {
        result.configurationProperties.identifier = taskIdentifier._key;
      }
    }
    return result;
  }
  ConfiguringTask2.from = from;
  __name(from, "from");
})(ConfiguringTask || (ConfiguringTask = {}));
var CustomTask;
((CustomTask2) => {
  function from(external, context, index, source) {
    if (!external) {
      return void 0;
    }
    let type = external.type;
    if (type === void 0 || type === null) {
      type = Tasks.CUSTOMIZED_TASK_TYPE;
    }
    if (type !== Tasks.CUSTOMIZED_TASK_TYPE && type !== "shell" && type !== "process") {
      context.problemReporter.error(nls.localize("ConfigurationParser.notCustom", "Error: tasks is not declared as a custom task. The configuration will be ignored.\n{0}\n", JSON.stringify(external, null, 4)));
      return void 0;
    }
    let taskName = external.taskName;
    if (Types.isString(external.label) && context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0) {
      taskName = external.label;
    }
    if (!taskName) {
      context.problemReporter.error(nls.localize("ConfigurationParser.noTaskName", "Error: a task must provide a label property. The task will be ignored.\n{0}\n", JSON.stringify(external, null, 4)));
      return void 0;
    }
    let taskSource;
    switch (source) {
      case 2 /* User */: {
        taskSource = { kind: Tasks.TaskSourceKind.User, config: { index, element: external, file: ".vscode/tasks.json", workspaceFolder: context.workspaceFolder }, label };
        break;
      }
      case 1 /* WorkspaceFile */: {
        taskSource = { kind: Tasks.TaskSourceKind.WorkspaceFile, config: { index, element: external, file: ".vscode/tasks.json", workspaceFolder: context.workspaceFolder, workspace: context.workspace }, label };
        break;
      }
      default: {
        taskSource = { kind: Tasks.TaskSourceKind.Workspace, config: { index, element: external, file: ".vscode/tasks.json", workspaceFolder: context.workspaceFolder }, label };
        break;
      }
    }
    const result = new Tasks.CustomTask(
      context.uuidMap.getUUID(taskName),
      taskSource,
      taskName,
      Tasks.CUSTOMIZED_TASK_TYPE,
      void 0,
      false,
      RunOptions.fromConfiguration(external.runOptions),
      {
        name: taskName,
        identifier: taskName
      }
    );
    const configuration = ConfigurationProperties.from(external, context, false, source);
    result.addTaskLoadMessages(configuration.errors);
    if (configuration.value) {
      result.configurationProperties = Object.assign(result.configurationProperties, configuration.value);
    }
    const supportLegacy = true;
    if (supportLegacy) {
      const legacy = external;
      if (result.configurationProperties.isBackground === void 0 && legacy.isWatching !== void 0) {
        result.configurationProperties.isBackground = !!legacy.isWatching;
      }
      if (result.configurationProperties.group === void 0) {
        if (legacy.isBuildCommand === true) {
          result.configurationProperties.group = Tasks.TaskGroup.Build;
        } else if (legacy.isTestCommand === true) {
          result.configurationProperties.group = Tasks.TaskGroup.Test;
        }
      }
    }
    const command = CommandConfiguration.from(external, context);
    if (command) {
      result.command = command;
    }
    if (external.command !== void 0) {
      command.suppressTaskName = true;
    }
    return result;
  }
  CustomTask2.from = from;
  __name(from, "from");
  function fillGlobals(task, globals) {
    if (CommandConfiguration.hasCommand(task.command) || task.configurationProperties.dependsOn === void 0) {
      task.command = CommandConfiguration.fillGlobals(task.command, globals.command, task.configurationProperties.name);
    }
    if (task.configurationProperties.problemMatchers === void 0 && globals.problemMatcher !== void 0) {
      task.configurationProperties.problemMatchers = Objects.deepClone(globals.problemMatcher);
      task.hasDefinedMatchers = true;
    }
    if (task.configurationProperties.promptOnClose === void 0 && task.configurationProperties.isBackground === void 0 && globals.promptOnClose !== void 0) {
      task.configurationProperties.promptOnClose = globals.promptOnClose;
    }
  }
  CustomTask2.fillGlobals = fillGlobals;
  __name(fillGlobals, "fillGlobals");
  function fillDefaults(task, context) {
    CommandConfiguration.fillDefaults(task.command, context);
    if (task.configurationProperties.promptOnClose === void 0) {
      task.configurationProperties.promptOnClose = task.configurationProperties.isBackground !== void 0 ? !task.configurationProperties.isBackground : true;
    }
    if (task.configurationProperties.isBackground === void 0) {
      task.configurationProperties.isBackground = false;
    }
    if (task.configurationProperties.problemMatchers === void 0) {
      task.configurationProperties.problemMatchers = EMPTY_ARRAY;
    }
  }
  CustomTask2.fillDefaults = fillDefaults;
  __name(fillDefaults, "fillDefaults");
  function createCustomTask2(contributedTask, configuredProps) {
    const result = new Tasks.CustomTask(
      configuredProps._id,
      Object.assign({}, configuredProps._source, { customizes: contributedTask.defines }),
      configuredProps.configurationProperties.name || contributedTask._label,
      Tasks.CUSTOMIZED_TASK_TYPE,
      contributedTask.command,
      false,
      contributedTask.runOptions,
      {
        name: configuredProps.configurationProperties.name || contributedTask.configurationProperties.name,
        identifier: configuredProps.configurationProperties.identifier || contributedTask.configurationProperties.identifier,
        icon: configuredProps.configurationProperties.icon,
        hide: configuredProps.configurationProperties.hide
      }
    );
    result.addTaskLoadMessages(configuredProps.taskLoadMessages);
    const resultConfigProps = result.configurationProperties;
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "group");
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "isBackground");
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "dependsOn");
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "problemMatchers");
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "promptOnClose");
    assignProperty(resultConfigProps, configuredProps.configurationProperties, "detail");
    result.command.presentation = CommandConfiguration.PresentationOptions.assignProperties(
      result.command.presentation,
      configuredProps.configurationProperties.presentation
    );
    result.command.options = CommandOptions.assignProperties(result.command.options, configuredProps.configurationProperties.options);
    result.runOptions = RunOptions.assignProperties(result.runOptions, configuredProps.runOptions);
    const contributedConfigProps = contributedTask.configurationProperties;
    fillProperty(resultConfigProps, contributedConfigProps, "group");
    fillProperty(resultConfigProps, contributedConfigProps, "isBackground");
    fillProperty(resultConfigProps, contributedConfigProps, "dependsOn");
    fillProperty(resultConfigProps, contributedConfigProps, "problemMatchers");
    fillProperty(resultConfigProps, contributedConfigProps, "promptOnClose");
    fillProperty(resultConfigProps, contributedConfigProps, "detail");
    result.command.presentation = CommandConfiguration.PresentationOptions.fillProperties(
      result.command.presentation,
      contributedConfigProps.presentation
    );
    result.command.options = CommandOptions.fillProperties(result.command.options, contributedConfigProps.options);
    result.runOptions = RunOptions.fillProperties(result.runOptions, contributedTask.runOptions);
    if (contributedTask.hasDefinedMatchers === true) {
      result.hasDefinedMatchers = true;
    }
    return result;
  }
  CustomTask2.createCustomTask = createCustomTask2;
  __name(createCustomTask2, "createCustomTask");
})(CustomTask || (CustomTask = {}));
var TaskParser;
((TaskParser2) => {
  function isCustomTask(value) {
    const type = value.type;
    const customize = value.customize;
    return customize === void 0 && (type === void 0 || type === null || type === Tasks.CUSTOMIZED_TASK_TYPE || type === "shell" || type === "process");
  }
  __name(isCustomTask, "isCustomTask");
  const builtinTypeContextMap = {
    shell: ShellExecutionSupportedContext,
    process: ProcessExecutionSupportedContext
  };
  function from(externals, globals, context, source, registry) {
    const result = { custom: [], configured: [] };
    if (!externals) {
      return result;
    }
    const defaultBuildTask = { task: void 0, rank: -1 };
    const defaultTestTask = { task: void 0, rank: -1 };
    const schema2_0_0 = context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0;
    const baseLoadIssues = Objects.deepClone(context.taskLoadIssues);
    for (let index = 0; index < externals.length; index++) {
      const external = externals[index];
      const definition = external.type ? registry?.get?.(external.type) || TaskDefinitionRegistry.get(external.type) : void 0;
      let typeNotSupported = false;
      if (definition && definition.when && !context.contextKeyService.contextMatchesRules(definition.when)) {
        typeNotSupported = true;
      } else if (!definition && external.type) {
        for (const key of Object.keys(builtinTypeContextMap)) {
          if (external.type === key) {
            typeNotSupported = !ShellExecutionSupportedContext.evaluate(context.contextKeyService.getContext(null));
            break;
          }
        }
      }
      if (typeNotSupported) {
        context.problemReporter.info(nls.localize(
          "taskConfiguration.providerUnavailable",
          "Warning: {0} tasks are unavailable in the current environment.\n",
          external.type
        ));
        continue;
      }
      if (isCustomTask(external)) {
        const customTask = CustomTask.from(external, context, index, source);
        if (customTask) {
          CustomTask.fillGlobals(customTask, globals);
          CustomTask.fillDefaults(customTask, context);
          if (schema2_0_0) {
            if ((customTask.command === void 0 || customTask.command.name === void 0) && (customTask.configurationProperties.dependsOn === void 0 || customTask.configurationProperties.dependsOn.length === 0)) {
              context.problemReporter.error(nls.localize(
                "taskConfiguration.noCommandOrDependsOn",
                "Error: the task '{0}' neither specifies a command nor a dependsOn property. The task will be ignored. Its definition is:\n{1}",
                customTask.configurationProperties.name,
                JSON.stringify(external, void 0, 4)
              ));
              continue;
            }
          } else {
            if (customTask.command === void 0 || customTask.command.name === void 0) {
              context.problemReporter.warn(nls.localize(
                "taskConfiguration.noCommand",
                "Error: the task '{0}' doesn't define a command. The task will be ignored. Its definition is:\n{1}",
                customTask.configurationProperties.name,
                JSON.stringify(external, void 0, 4)
              ));
              continue;
            }
          }
          if (customTask.configurationProperties.group === Tasks.TaskGroup.Build && defaultBuildTask.rank < 2) {
            defaultBuildTask.task = customTask;
            defaultBuildTask.rank = 2;
          } else if (customTask.configurationProperties.group === Tasks.TaskGroup.Test && defaultTestTask.rank < 2) {
            defaultTestTask.task = customTask;
            defaultTestTask.rank = 2;
          } else if (customTask.configurationProperties.name === "build" && defaultBuildTask.rank < 1) {
            defaultBuildTask.task = customTask;
            defaultBuildTask.rank = 1;
          } else if (customTask.configurationProperties.name === "test" && defaultTestTask.rank < 1) {
            defaultTestTask.task = customTask;
            defaultTestTask.rank = 1;
          }
          customTask.addTaskLoadMessages(context.taskLoadIssues);
          result.custom.push(customTask);
        }
      } else {
        const configuredTask = ConfiguringTask.from(external, context, index, source, registry);
        if (configuredTask) {
          configuredTask.addTaskLoadMessages(context.taskLoadIssues);
          result.configured.push(configuredTask);
        }
      }
      context.taskLoadIssues = Objects.deepClone(baseLoadIssues);
    }
    const defaultBuildGroupName = Types.isString(defaultBuildTask.task?.configurationProperties.group) ? defaultBuildTask.task?.configurationProperties.group : defaultBuildTask.task?.configurationProperties.group?._id;
    const defaultTestTaskGroupName = Types.isString(defaultTestTask.task?.configurationProperties.group) ? defaultTestTask.task?.configurationProperties.group : defaultTestTask.task?.configurationProperties.group?._id;
    if (defaultBuildGroupName !== Tasks.TaskGroup.Build._id && defaultBuildTask.rank > -1 && defaultBuildTask.rank < 2 && defaultBuildTask.task) {
      defaultBuildTask.task.configurationProperties.group = Tasks.TaskGroup.Build;
    } else if (defaultTestTaskGroupName !== Tasks.TaskGroup.Test._id && defaultTestTask.rank > -1 && defaultTestTask.rank < 2 && defaultTestTask.task) {
      defaultTestTask.task.configurationProperties.group = Tasks.TaskGroup.Test;
    }
    return result;
  }
  TaskParser2.from = from;
  __name(from, "from");
  function assignTasks(target, source) {
    if (source === void 0 || source.length === 0) {
      return target;
    }
    if (target === void 0 || target.length === 0) {
      return source;
    }
    if (source) {
      const map = /* @__PURE__ */ Object.create(null);
      target.forEach((task) => {
        map[task.configurationProperties.name] = task;
      });
      source.forEach((task) => {
        map[task.configurationProperties.name] = task;
      });
      const newTarget = [];
      target.forEach((task) => {
        newTarget.push(map[task.configurationProperties.name]);
        delete map[task.configurationProperties.name];
      });
      Object.keys(map).forEach((key) => newTarget.push(map[key]));
      target = newTarget;
    }
    return target;
  }
  TaskParser2.assignTasks = assignTasks;
  __name(assignTasks, "assignTasks");
})(TaskParser || (TaskParser = {}));
var Globals;
((Globals2) => {
  function from(config, context) {
    let result = fromBase(config, context);
    let osGlobals = void 0;
    if (config.windows && context.platform === Platform.Windows) {
      osGlobals = fromBase(config.windows, context);
    } else if (config.osx && context.platform === Platform.Mac) {
      osGlobals = fromBase(config.osx, context);
    } else if (config.linux && context.platform === Platform.Linux) {
      osGlobals = fromBase(config.linux, context);
    }
    if (osGlobals) {
      result = Globals2.assignProperties(result, osGlobals);
    }
    const command = CommandConfiguration.from(config, context);
    if (command) {
      result.command = command;
    }
    Globals2.fillDefaults(result, context);
    Globals2.freeze(result);
    return result;
  }
  Globals2.from = from;
  __name(from, "from");
  function fromBase(config, context) {
    const result = {};
    if (config.suppressTaskName !== void 0) {
      result.suppressTaskName = !!config.suppressTaskName;
    }
    if (config.promptOnClose !== void 0) {
      result.promptOnClose = !!config.promptOnClose;
    }
    if (config.problemMatcher) {
      result.problemMatcher = ProblemMatcherConverter.from(config.problemMatcher, context).value;
    }
    return result;
  }
  Globals2.fromBase = fromBase;
  __name(fromBase, "fromBase");
  function isEmpty(value) {
    return !value || value.command === void 0 && value.promptOnClose === void 0 && value.suppressTaskName === void 0;
  }
  Globals2.isEmpty = isEmpty;
  __name(isEmpty, "isEmpty");
  function assignProperties(target, source) {
    if (isEmpty(source)) {
      return target;
    }
    if (isEmpty(target)) {
      return source;
    }
    assignProperty(target, source, "promptOnClose");
    assignProperty(target, source, "suppressTaskName");
    return target;
  }
  Globals2.assignProperties = assignProperties;
  __name(assignProperties, "assignProperties");
  function fillDefaults(value, context) {
    if (!value) {
      return;
    }
    CommandConfiguration.fillDefaults(value.command, context);
    if (value.suppressTaskName === void 0) {
      value.suppressTaskName = context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0;
    }
    if (value.promptOnClose === void 0) {
      value.promptOnClose = true;
    }
  }
  Globals2.fillDefaults = fillDefaults;
  __name(fillDefaults, "fillDefaults");
  function freeze(value) {
    Object.freeze(value);
    if (value.command) {
      CommandConfiguration.freeze(value.command);
    }
  }
  Globals2.freeze = freeze;
  __name(freeze, "freeze");
})(Globals || (Globals = {}));
var ExecutionEngine;
((ExecutionEngine2) => {
  function from(config) {
    const runner = config.runner || config._runner;
    let result;
    if (runner) {
      switch (runner) {
        case "terminal":
          result = Tasks.ExecutionEngine.Terminal;
          break;
        case "process":
          result = Tasks.ExecutionEngine.Process;
          break;
      }
    }
    const schemaVersion = JsonSchemaVersion.from(config);
    if (schemaVersion === Tasks.JsonSchemaVersion.V0_1_0) {
      return result || Tasks.ExecutionEngine.Process;
    } else if (schemaVersion === Tasks.JsonSchemaVersion.V2_0_0) {
      return Tasks.ExecutionEngine.Terminal;
    } else {
      throw new Error("Shouldn't happen.");
    }
  }
  ExecutionEngine2.from = from;
  __name(from, "from");
})(ExecutionEngine || (ExecutionEngine = {}));
var JsonSchemaVersion;
((JsonSchemaVersion2) => {
  const _default = Tasks.JsonSchemaVersion.V2_0_0;
  function from(config) {
    const version = config.version;
    if (!version) {
      return _default;
    }
    switch (version) {
      case "0.1.0":
        return Tasks.JsonSchemaVersion.V0_1_0;
      case "2.0.0":
        return Tasks.JsonSchemaVersion.V2_0_0;
      default:
        return _default;
    }
  }
  JsonSchemaVersion2.from = from;
  __name(from, "from");
})(JsonSchemaVersion || (JsonSchemaVersion = {}));
class UUIDMap {
  static {
    __name(this, "UUIDMap");
  }
  last;
  current;
  constructor(other) {
    this.current = /* @__PURE__ */ Object.create(null);
    if (other) {
      for (const key of Object.keys(other.current)) {
        const value = other.current[key];
        if (Array.isArray(value)) {
          this.current[key] = value.slice();
        } else {
          this.current[key] = value;
        }
      }
    }
  }
  start() {
    this.last = this.current;
    this.current = /* @__PURE__ */ Object.create(null);
  }
  getUUID(identifier) {
    const lastValue = this.last ? this.last[identifier] : void 0;
    let result = void 0;
    if (lastValue !== void 0) {
      if (Array.isArray(lastValue)) {
        result = lastValue.shift();
        if (lastValue.length === 0) {
          delete this.last[identifier];
        }
      } else {
        result = lastValue;
        delete this.last[identifier];
      }
    }
    if (result === void 0) {
      result = UUID.generateUuid();
    }
    const currentValue = this.current[identifier];
    if (currentValue === void 0) {
      this.current[identifier] = result;
    } else {
      if (Array.isArray(currentValue)) {
        currentValue.push(result);
      } else {
        const arrayValue = [currentValue];
        arrayValue.push(result);
        this.current[identifier] = arrayValue;
      }
    }
    return result;
  }
  finish() {
    this.last = void 0;
  }
}
var TaskConfigSource = /* @__PURE__ */ ((TaskConfigSource2) => {
  TaskConfigSource2[TaskConfigSource2["TasksJson"] = 0] = "TasksJson";
  TaskConfigSource2[TaskConfigSource2["WorkspaceFile"] = 1] = "WorkspaceFile";
  TaskConfigSource2[TaskConfigSource2["User"] = 2] = "User";
  return TaskConfigSource2;
})(TaskConfigSource || {});
class ConfigurationParser {
  static {
    __name(this, "ConfigurationParser");
  }
  workspaceFolder;
  workspace;
  problemReporter;
  uuidMap;
  platform;
  constructor(workspaceFolder, workspace, platform, problemReporter, uuidMap) {
    this.workspaceFolder = workspaceFolder;
    this.workspace = workspace;
    this.platform = platform;
    this.problemReporter = problemReporter;
    this.uuidMap = uuidMap;
  }
  run(fileConfig, source, contextKeyService) {
    const engine = ExecutionEngine.from(fileConfig);
    const schemaVersion = JsonSchemaVersion.from(fileConfig);
    const context = {
      workspaceFolder: this.workspaceFolder,
      workspace: this.workspace,
      problemReporter: this.problemReporter,
      uuidMap: this.uuidMap,
      namedProblemMatchers: {},
      engine,
      schemaVersion,
      platform: this.platform,
      taskLoadIssues: [],
      contextKeyService
    };
    const taskParseResult = this.createTaskRunnerConfiguration(fileConfig, context, source);
    return {
      validationStatus: this.problemReporter.status,
      custom: taskParseResult.custom,
      configured: taskParseResult.configured,
      engine
    };
  }
  createTaskRunnerConfiguration(fileConfig, context, source) {
    const globals = Globals.from(fileConfig, context);
    if (this.problemReporter.status.isFatal()) {
      return { custom: [], configured: [] };
    }
    context.namedProblemMatchers = ProblemMatcherConverter.namedFrom(fileConfig.declares, context);
    let globalTasks = void 0;
    let externalGlobalTasks = void 0;
    if (fileConfig.windows && context.platform === Platform.Windows) {
      globalTasks = TaskParser.from(fileConfig.windows.tasks, globals, context, source).custom;
      externalGlobalTasks = fileConfig.windows.tasks;
    } else if (fileConfig.osx && context.platform === Platform.Mac) {
      globalTasks = TaskParser.from(fileConfig.osx.tasks, globals, context, source).custom;
      externalGlobalTasks = fileConfig.osx.tasks;
    } else if (fileConfig.linux && context.platform === Platform.Linux) {
      globalTasks = TaskParser.from(fileConfig.linux.tasks, globals, context, source).custom;
      externalGlobalTasks = fileConfig.linux.tasks;
    }
    if (context.schemaVersion === Tasks.JsonSchemaVersion.V2_0_0 && globalTasks && globalTasks.length > 0 && externalGlobalTasks && externalGlobalTasks.length > 0) {
      const taskContent = [];
      for (const task of externalGlobalTasks) {
        taskContent.push(JSON.stringify(task, null, 4));
      }
      context.problemReporter.error(
        nls.localize(
          { key: "TaskParse.noOsSpecificGlobalTasks", comment: ['"Task version 2.0.0" refers to the 2.0.0 version of the task system. The "version 2.0.0" is not localizable as it is a json key and value.'] },
          "Task version 2.0.0 doesn't support global OS specific tasks. Convert them to a task with a OS specific command. Affected tasks are:\n{0}",
          taskContent.join("\n")
        )
      );
    }
    let result = { custom: [], configured: [] };
    if (fileConfig.tasks) {
      result = TaskParser.from(fileConfig.tasks, globals, context, source);
    }
    if (globalTasks) {
      result.custom = TaskParser.assignTasks(result.custom, globalTasks);
    }
    if ((!result.custom || result.custom.length === 0) && (globals.command && globals.command.name)) {
      const matchers = ProblemMatcherConverter.from(fileConfig.problemMatcher, context).value ?? [];
      const isBackground = fileConfig.isBackground ? !!fileConfig.isBackground : fileConfig.isWatching ? !!fileConfig.isWatching : void 0;
      const name = Tasks.CommandString.value(globals.command.name);
      const task = new Tasks.CustomTask(
        context.uuidMap.getUUID(name),
        Object.assign({}, source, "workspace", { config: { index: -1, element: fileConfig, workspaceFolder: context.workspaceFolder } }),
        name,
        Tasks.CUSTOMIZED_TASK_TYPE,
        {
          name: void 0,
          runtime: void 0,
          presentation: void 0,
          suppressTaskName: true
        },
        false,
        { reevaluateOnRerun: true },
        {
          name,
          identifier: name,
          group: Tasks.TaskGroup.Build,
          isBackground,
          problemMatchers: matchers
        }
      );
      const taskGroupKind = GroupKind.from(fileConfig.group);
      if (taskGroupKind !== void 0) {
        task.configurationProperties.group = taskGroupKind;
      } else if (fileConfig.group === "none") {
        task.configurationProperties.group = void 0;
      }
      CustomTask.fillGlobals(task, globals);
      CustomTask.fillDefaults(task, context);
      result.custom = [task];
    }
    result.custom = result.custom || [];
    result.configured = result.configured || [];
    return result;
  }
}
const uuidMaps = /* @__PURE__ */ new Map();
const recentUuidMaps = /* @__PURE__ */ new Map();
function parse(workspaceFolder, workspace, platform, configuration, logger, source, contextKeyService, isRecents = false) {
  const recentOrOtherMaps = isRecents ? recentUuidMaps : uuidMaps;
  let selectedUuidMaps = recentOrOtherMaps.get(source);
  if (!selectedUuidMaps) {
    recentOrOtherMaps.set(source, /* @__PURE__ */ new Map());
    selectedUuidMaps = recentOrOtherMaps.get(source);
  }
  let uuidMap = selectedUuidMaps.get(workspaceFolder.uri.toString());
  if (!uuidMap) {
    uuidMap = new UUIDMap();
    selectedUuidMaps.set(workspaceFolder.uri.toString(), uuidMap);
  }
  try {
    uuidMap.start();
    return new ConfigurationParser(workspaceFolder, workspace, platform, logger, uuidMap).run(configuration, source, contextKeyService);
  } finally {
    uuidMap.finish();
  }
}
__name(parse, "parse");
function createCustomTask(contributedTask, configuredProps) {
  return CustomTask.createCustomTask(contributedTask, configuredProps);
}
__name(createCustomTask, "createCustomTask");
export {
  CommandString,
  ExecutionEngine,
  GroupKind,
  ITaskIdentifier,
  JsonSchemaVersion,
  ProblemMatcherConverter,
  RunOnOptions,
  RunOptions,
  ShellQuoting,
  TaskConfigSource,
  TaskParser,
  UUIDMap,
  createCustomTask,
  parse
};
//# sourceMappingURL=taskConfiguration.js.map
