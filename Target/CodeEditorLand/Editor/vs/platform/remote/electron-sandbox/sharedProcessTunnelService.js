import { registerSharedProcessRemoteService } from "../../ipc/electron-sandbox/services.js";
import {
  ipcSharedProcessTunnelChannelName,
  ISharedProcessTunnelService
} from "../common/sharedProcessTunnelService.js";
registerSharedProcessRemoteService(
  ISharedProcessTunnelService,
  ipcSharedProcessTunnelChannelName
);
//# sourceMappingURL=sharedProcessTunnelService.js.map
