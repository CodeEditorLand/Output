var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { net } from "electron";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { IRequestContext, IRequestOptions } from "../../../base/parts/request/common/request.js";
import { IRawRequestFunction, RequestService as NodeRequestService } from "../node/requestService.js";
function getRawRequest(options) {
  return net.request;
}
__name(getRawRequest, "getRawRequest");
class RequestService extends NodeRequestService {
  static {
    __name(this, "RequestService");
  }
  request(options, token) {
    return super.request({ ...options || {}, getRawRequest, isChromiumNetwork: true }, token);
  }
}
export {
  RequestService
};
//# sourceMappingURL=requestService.js.map
