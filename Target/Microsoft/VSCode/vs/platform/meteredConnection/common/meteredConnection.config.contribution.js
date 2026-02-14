import { localize } from "../../../nls.js";
import { Extensions as ConfigurationExtensions } from "../../configuration/common/configurationRegistry.js";
import { Registry } from "../../registry/common/platform.js";
const configurationRegistry = Registry.as(ConfigurationExtensions.Configuration);
configurationRegistry.registerConfiguration({
  id: "network",
  order: 14,
  title: localize("networkConfigurationTitle", "Network"),
  type: "object",
  properties: {
    "network.respectMeteredConnections": {
      type: "boolean",
      default: true,
      scope: 1,
      description: localize("respectMeteredConnections", "When enabled, automatic updates and downloads will be postponed when on a metered network connection (such as mobile data or tethering)."),
      tags: ["usesOnlineServices"]
    }
  }
});
//# sourceMappingURL=meteredConnection.config.contribution.js.map
