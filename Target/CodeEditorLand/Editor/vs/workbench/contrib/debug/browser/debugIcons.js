import { Codicon } from "../../../../base/common/codicons.js";
import { localize } from "../../../../nls.js";
import { registerIcon } from "../../../../platform/theme/common/iconRegistry.js";
const debugConsoleViewIcon = registerIcon("debug-console-view-icon", Codicon.debugConsole, localize("debugConsoleViewIcon", "View icon of the debug console view."));
const runViewIcon = registerIcon("run-view-icon", Codicon.debugAlt, localize("runViewIcon", "View icon of the run view."));
const variablesViewIcon = registerIcon("variables-view-icon", Codicon.debugAlt, localize("variablesViewIcon", "View icon of the variables view."));
const watchViewIcon = registerIcon("watch-view-icon", Codicon.debugAlt, localize("watchViewIcon", "View icon of the watch view."));
const callStackViewIcon = registerIcon("callstack-view-icon", Codicon.debugAlt, localize("callStackViewIcon", "View icon of the call stack view."));
const breakpointsViewIcon = registerIcon("breakpoints-view-icon", Codicon.debugAlt, localize("breakpointsViewIcon", "View icon of the breakpoints view."));
const loadedScriptsViewIcon = registerIcon("loaded-scripts-view-icon", Codicon.debugAlt, localize("loadedScriptsViewIcon", "View icon of the loaded scripts view."));
const breakpoint = {
  regular: registerIcon("debug-breakpoint", Codicon.debugBreakpoint, localize("debugBreakpoint", "Icon for breakpoints.")),
  disabled: registerIcon("debug-breakpoint-disabled", Codicon.debugBreakpointDisabled, localize("debugBreakpointDisabled", "Icon for disabled breakpoints.")),
  unverified: registerIcon("debug-breakpoint-unverified", Codicon.debugBreakpointUnverified, localize("debugBreakpointUnverified", "Icon for unverified breakpoints.")),
  pending: registerIcon("debug-breakpoint-pending", Codicon.debugBreakpointPending, localize("debugBreakpointPendingOnTrigger", "Icon for breakpoints waiting on another breakpoint."))
};
const functionBreakpoint = {
  regular: registerIcon("debug-breakpoint-function", Codicon.debugBreakpointFunction, localize("debugBreakpointFunction", "Icon for function breakpoints.")),
  disabled: registerIcon("debug-breakpoint-function-disabled", Codicon.debugBreakpointFunctionDisabled, localize("debugBreakpointFunctionDisabled", "Icon for disabled function breakpoints.")),
  unverified: registerIcon("debug-breakpoint-function-unverified", Codicon.debugBreakpointFunctionUnverified, localize("debugBreakpointFunctionUnverified", "Icon for unverified function breakpoints."))
};
const conditionalBreakpoint = {
  regular: registerIcon("debug-breakpoint-conditional", Codicon.debugBreakpointConditional, localize("debugBreakpointConditional", "Icon for conditional breakpoints.")),
  disabled: registerIcon("debug-breakpoint-conditional-disabled", Codicon.debugBreakpointConditionalDisabled, localize("debugBreakpointConditionalDisabled", "Icon for disabled conditional breakpoints.")),
  unverified: registerIcon("debug-breakpoint-conditional-unverified", Codicon.debugBreakpointConditionalUnverified, localize("debugBreakpointConditionalUnverified", "Icon for unverified conditional breakpoints."))
};
const dataBreakpoint = {
  regular: registerIcon("debug-breakpoint-data", Codicon.debugBreakpointData, localize("debugBreakpointData", "Icon for data breakpoints.")),
  disabled: registerIcon("debug-breakpoint-data-disabled", Codicon.debugBreakpointDataDisabled, localize("debugBreakpointDataDisabled", "Icon for disabled data breakpoints.")),
  unverified: registerIcon("debug-breakpoint-data-unverified", Codicon.debugBreakpointDataUnverified, localize("debugBreakpointDataUnverified", "Icon for unverified data breakpoints."))
};
const logBreakpoint = {
  regular: registerIcon("debug-breakpoint-log", Codicon.debugBreakpointLog, localize("debugBreakpointLog", "Icon for log breakpoints.")),
  disabled: registerIcon("debug-breakpoint-log-disabled", Codicon.debugBreakpointLogDisabled, localize("debugBreakpointLogDisabled", "Icon for disabled log breakpoint.")),
  unverified: registerIcon("debug-breakpoint-log-unverified", Codicon.debugBreakpointLogUnverified, localize("debugBreakpointLogUnverified", "Icon for unverified log breakpoints."))
};
const debugBreakpointHint = registerIcon("debug-hint", Codicon.debugHint, localize("debugBreakpointHint", "Icon for breakpoint hints shown on hover in editor glyph margin."));
const debugBreakpointUnsupported = registerIcon("debug-breakpoint-unsupported", Codicon.debugBreakpointUnsupported, localize("debugBreakpointUnsupported", "Icon for unsupported breakpoints."));
const allBreakpoints = [breakpoint, functionBreakpoint, conditionalBreakpoint, dataBreakpoint, logBreakpoint];
const debugStackframe = registerIcon("debug-stackframe", Codicon.debugStackframe, localize("debugStackframe", "Icon for a stackframe shown in the editor glyph margin."));
const debugStackframeFocused = registerIcon("debug-stackframe-focused", Codicon.debugStackframeFocused, localize("debugStackframeFocused", "Icon for a focused stackframe  shown in the editor glyph margin."));
const debugGripper = registerIcon("debug-gripper", Codicon.gripper, localize("debugGripper", "Icon for the debug bar gripper."));
const debugRestartFrame = registerIcon("debug-restart-frame", Codicon.debugRestartFrame, localize("debugRestartFrame", "Icon for the debug restart frame action."));
const debugStop = registerIcon("debug-stop", Codicon.debugStop, localize("debugStop", "Icon for the debug stop action."));
const debugDisconnect = registerIcon("debug-disconnect", Codicon.debugDisconnect, localize("debugDisconnect", "Icon for the debug disconnect action."));
const debugRestart = registerIcon("debug-restart", Codicon.debugRestart, localize("debugRestart", "Icon for the debug restart action."));
const debugStepOver = registerIcon("debug-step-over", Codicon.debugStepOver, localize("debugStepOver", "Icon for the debug step over action."));
const debugStepInto = registerIcon("debug-step-into", Codicon.debugStepInto, localize("debugStepInto", "Icon for the debug step into action."));
const debugStepOut = registerIcon("debug-step-out", Codicon.debugStepOut, localize("debugStepOut", "Icon for the debug step out action."));
const debugStepBack = registerIcon("debug-step-back", Codicon.debugStepBack, localize("debugStepBack", "Icon for the debug step back action."));
const debugPause = registerIcon("debug-pause", Codicon.debugPause, localize("debugPause", "Icon for the debug pause action."));
const debugContinue = registerIcon("debug-continue", Codicon.debugContinue, localize("debugContinue", "Icon for the debug continue action."));
const debugReverseContinue = registerIcon("debug-reverse-continue", Codicon.debugReverseContinue, localize("debugReverseContinue", "Icon for the debug reverse continue action."));
const debugRun = registerIcon("debug-run", Codicon.run, localize("debugRun", "Icon for the run or debug action."));
const debugStart = registerIcon("debug-start", Codicon.debugStart, localize("debugStart", "Icon for the debug start action."));
const debugConfigure = registerIcon("debug-configure", Codicon.gear, localize("debugConfigure", "Icon for the debug configure action."));
const debugConsole = registerIcon("debug-console", Codicon.gear, localize("debugConsole", "Icon for the debug console open action."));
const debugRemoveConfig = registerIcon("debug-remove-config", Codicon.trash, localize("debugRemoveConfig", "Icon for removing debug configurations."));
const debugCollapseAll = registerIcon("debug-collapse-all", Codicon.collapseAll, localize("debugCollapseAll", "Icon for the collapse all action in the debug views."));
const callstackViewSession = registerIcon("callstack-view-session", Codicon.bug, localize("callstackViewSession", "Icon for the session icon in the call stack view."));
const debugConsoleClearAll = registerIcon("debug-console-clear-all", Codicon.clearAll, localize("debugConsoleClearAll", "Icon for the clear all action in the debug console."));
const watchExpressionsRemoveAll = registerIcon("watch-expressions-remove-all", Codicon.closeAll, localize("watchExpressionsRemoveAll", "Icon for the Remove All action in the watch view."));
const watchExpressionRemove = registerIcon("watch-expression-remove", Codicon.removeClose, localize("watchExpressionRemove", "Icon for the Remove action in the watch view."));
const watchExpressionsAdd = registerIcon("watch-expressions-add", Codicon.add, localize("watchExpressionsAdd", "Icon for the add action in the watch view."));
const watchExpressionsAddFuncBreakpoint = registerIcon("watch-expressions-add-function-breakpoint", Codicon.add, localize("watchExpressionsAddFuncBreakpoint", "Icon for the add function breakpoint action in the watch view."));
const watchExpressionsAddDataBreakpoint = registerIcon("watch-expressions-add-data-breakpoint", Codicon.variableGroup, localize("watchExpressionsAddDataBreakpoint", "Icon for the add data breakpoint action in the breakpoints view."));
const breakpointsRemoveAll = registerIcon("breakpoints-remove-all", Codicon.closeAll, localize("breakpointsRemoveAll", "Icon for the Remove All action in the breakpoints view."));
const breakpointsActivate = registerIcon("breakpoints-activate", Codicon.activateBreakpoints, localize("breakpointsActivate", "Icon for the activate action in the breakpoints view."));
const debugConsoleEvaluationInput = registerIcon("debug-console-evaluation-input", Codicon.arrowSmallRight, localize("debugConsoleEvaluationInput", "Icon for the debug evaluation input marker."));
const debugConsoleEvaluationPrompt = registerIcon("debug-console-evaluation-prompt", Codicon.chevronRight, localize("debugConsoleEvaluationPrompt", "Icon for the debug evaluation prompt."));
const debugInspectMemory = registerIcon("debug-inspect-memory", Codicon.fileBinary, localize("debugInspectMemory", "Icon for the inspect memory action."));
export {
  allBreakpoints,
  breakpoint,
  breakpointsActivate,
  breakpointsRemoveAll,
  breakpointsViewIcon,
  callStackViewIcon,
  callstackViewSession,
  conditionalBreakpoint,
  dataBreakpoint,
  debugBreakpointHint,
  debugBreakpointUnsupported,
  debugCollapseAll,
  debugConfigure,
  debugConsole,
  debugConsoleClearAll,
  debugConsoleEvaluationInput,
  debugConsoleEvaluationPrompt,
  debugConsoleViewIcon,
  debugContinue,
  debugDisconnect,
  debugGripper,
  debugInspectMemory,
  debugPause,
  debugRemoveConfig,
  debugRestart,
  debugRestartFrame,
  debugReverseContinue,
  debugRun,
  debugStackframe,
  debugStackframeFocused,
  debugStart,
  debugStepBack,
  debugStepInto,
  debugStepOut,
  debugStepOver,
  debugStop,
  functionBreakpoint,
  loadedScriptsViewIcon,
  logBreakpoint,
  runViewIcon,
  variablesViewIcon,
  watchExpressionRemove,
  watchExpressionsAdd,
  watchExpressionsAddDataBreakpoint,
  watchExpressionsAddFuncBreakpoint,
  watchExpressionsRemoveAll,
  watchViewIcon
};
//# sourceMappingURL=debugIcons.js.map
