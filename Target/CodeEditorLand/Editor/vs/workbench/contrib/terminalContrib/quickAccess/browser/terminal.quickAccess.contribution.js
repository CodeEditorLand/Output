import*as i from"../../../../../nls.js";import{CommandsRegistry as c}from"../../../../../platform/commands/common/commands.js";import{ContextKeyExpr as a}from"../../../../../platform/contextkey/common/contextkey.js";import{Extensions as m}from"../../../../../platform/quickinput/common/quickAccess.js";import{IQuickInputService as l}from"../../../../../platform/quickinput/common/quickInput.js";import{Registry as k}from"../../../../../platform/registry/common/platform.js";import{getQuickNavigateHandler as s}from"../../../../browser/quickaccess.js";import{registerTerminalAction as p}from"../../../terminal/browser/terminalActions.js";import{TerminalContextKeys as n}from"../../../terminal/common/terminalContextKey.js";import{TerminalQuickAccessProvider as r}from"../../../terminalContrib/quickAccess/browser/terminalQuickAccess.js";var u=(e=>(e.QuickOpenTerm="workbench.action.quickOpenTerm",e))(u||{});const d=k.as(m.Quickaccess),T="inTerminalPicker";d.registerQuickAccessProvider({ctor:r,prefix:r.PREFIX,contextKey:T,placeholder:i.localize("tasksQuickAccessPlaceholder","Type the name of a terminal to open."),helpEntries:[{description:i.localize("tasksQuickAccessHelp","Show All Opened Terminals"),commandId:"workbench.action.quickOpenTerm"}]});const o="workbench.action.quickOpenNavigateNextInTerminalPicker";c.registerCommand({id:o,handler:s(o,!0)});const t="workbench.action.quickOpenNavigatePreviousInTerminalPicker";c.registerCommand({id:t,handler:s(t,!1)}),p({id:"workbench.action.quickOpenTerm",title:i.localize2("quickAccessTerminal","Switch Active Terminal"),precondition:a.or(n.processSupported,n.terminalHasBeenCreated),run:(g,e)=>e.get(l).quickAccess.show(r.PREFIX)});
