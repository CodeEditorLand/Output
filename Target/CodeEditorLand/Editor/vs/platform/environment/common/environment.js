import { URI } from "../../../base/common/uri.js";
import {
  createDecorator,
  refineServiceDecorator
} from "../../instantiation/common/instantiation.js";
import { NativeParsedArgs } from "./argv.js";
const IEnvironmentService = createDecorator("environmentService");
const INativeEnvironmentService = refineServiceDecorator(IEnvironmentService);
export {
  IEnvironmentService,
  INativeEnvironmentService
};
//# sourceMappingURL=environment.js.map
