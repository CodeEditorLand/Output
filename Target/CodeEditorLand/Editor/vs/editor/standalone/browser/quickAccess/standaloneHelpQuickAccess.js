import { Registry } from "../../../../platform/registry/common/platform.js";
import { IQuickAccessRegistry, Extensions } from "../../../../platform/quickinput/common/quickAccess.js";
import { QuickHelpNLS } from "../../../common/standaloneStrings.js";
import { HelpQuickAccessProvider } from "../../../../platform/quickinput/browser/helpQuickAccess.js";
Registry.as(Extensions.Quickaccess).registerQuickAccessProvider({
  ctor: HelpQuickAccessProvider,
  prefix: "",
  helpEntries: [{ description: QuickHelpNLS.helpQuickAccessActionLabel }]
});
//# sourceMappingURL=standaloneHelpQuickAccess.js.map
