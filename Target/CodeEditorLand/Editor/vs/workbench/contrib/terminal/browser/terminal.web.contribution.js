import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { KeybindingWeight, KeybindingsRegistry } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
import { ITerminalProfileResolverService, TerminalCommandId } from "../common/terminal.js";
import { InstantiationType, registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { BrowserTerminalProfileResolverService } from "./terminalProfileResolverService.js";
import { TerminalContextKeys } from "../common/terminalContextKey.js";
registerSingleton(ITerminalProfileResolverService, BrowserTerminalProfileResolverService, InstantiationType.Delayed);
KeybindingsRegistry.registerKeybindingRule({
  id: TerminalCommandId.New,
  weight: KeybindingWeight.WorkbenchContrib,
  when: TerminalContextKeys.notFocus,
  primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyC
});
//# sourceMappingURL=terminal.web.contribution.js.map
