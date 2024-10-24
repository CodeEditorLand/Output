import { Codicon } from "../../../../base/common/codicons.js";
import { localize } from "../../../../nls.js";
import { registerIcon } from "../../../../platform/theme/common/iconRegistry.js";
const terminalViewIcon = registerIcon("terminal-view-icon", Codicon.terminal, localize("terminalViewIcon", "View icon of the terminal view."));
const renameTerminalIcon = registerIcon("terminal-rename", Codicon.edit, localize("renameTerminalIcon", "Icon for rename in the terminal quick menu."));
const killTerminalIcon = registerIcon("terminal-kill", Codicon.trash, localize("killTerminalIcon", "Icon for killing a terminal instance."));
const newTerminalIcon = registerIcon("terminal-new", Codicon.add, localize("newTerminalIcon", "Icon for creating a new terminal instance."));
const configureTerminalProfileIcon = registerIcon("terminal-configure-profile", Codicon.gear, localize("configureTerminalProfileIcon", "Icon for creating a new terminal profile."));
const terminalDecorationMark = registerIcon("terminal-decoration-mark", Codicon.circleSmallFilled, localize("terminalDecorationMark", "Icon for a terminal decoration mark."));
const terminalDecorationIncomplete = registerIcon("terminal-decoration-incomplete", Codicon.circle, localize("terminalDecorationIncomplete", "Icon for a terminal decoration of a command that was incomplete."));
const terminalDecorationError = registerIcon("terminal-decoration-error", Codicon.errorSmall, localize("terminalDecorationError", "Icon for a terminal decoration of a command that errored."));
const terminalDecorationSuccess = registerIcon("terminal-decoration-success", Codicon.circleFilled, localize("terminalDecorationSuccess", "Icon for a terminal decoration of a command that was successful."));
const commandHistoryRemoveIcon = registerIcon("terminal-command-history-remove", Codicon.close, localize("terminalCommandHistoryRemove", "Icon for removing a terminal command from command history."));
const commandHistoryOutputIcon = registerIcon("terminal-command-history-output", Codicon.output, localize("terminalCommandHistoryOutput", "Icon for viewing output of a terminal command."));
const commandHistoryFuzzySearchIcon = registerIcon("terminal-command-history-fuzzy-search", Codicon.searchFuzzy, localize("terminalCommandHistoryFuzzySearch", "Icon for toggling fuzzy search of command history."));
export {
  commandHistoryFuzzySearchIcon,
  commandHistoryOutputIcon,
  commandHistoryRemoveIcon,
  configureTerminalProfileIcon,
  killTerminalIcon,
  newTerminalIcon,
  renameTerminalIcon,
  terminalDecorationError,
  terminalDecorationIncomplete,
  terminalDecorationMark,
  terminalDecorationSuccess,
  terminalViewIcon
};
//# sourceMappingURL=terminalIcons.js.map
