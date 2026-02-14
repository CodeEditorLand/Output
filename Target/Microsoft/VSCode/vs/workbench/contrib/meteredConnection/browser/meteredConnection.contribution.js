import { registerWorkbenchContribution2 } from "../../../common/contributions.js";
import { MeteredConnectionStatusContribution } from "./meteredConnectionStatus.js";
import "../../../../platform/meteredConnection/common/meteredConnection.config.contribution.js";
registerWorkbenchContribution2(
  MeteredConnectionStatusContribution.ID,
  MeteredConnectionStatusContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
//# sourceMappingURL=meteredConnection.contribution.js.map
