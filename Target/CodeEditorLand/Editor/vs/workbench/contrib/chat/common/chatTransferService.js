var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { IFileService } from "../../../../platform/files/common/files.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import {
  areWorkspaceFoldersEmpty,
  isChatTransferredWorkspace
} from "../../../services/workspaces/common/workspaceUtils.js";
const IChatTransferService = createDecorator(
  "chatTransferService"
);
let ChatTransferService = class {
  constructor(workspaceService, storageService, fileService, workspaceTrustManagementService) {
    this.workspaceService = workspaceService;
    this.storageService = storageService;
    this.fileService = fileService;
    this.workspaceTrustManagementService = workspaceTrustManagementService;
  }
  static {
    __name(this, "ChatTransferService");
  }
  _serviceBrand;
  async checkAndSetWorkspaceTrust() {
    const workspace = this.workspaceService.getWorkspace();
    if (isChatTransferredWorkspace(workspace, this.storageService) && await areWorkspaceFoldersEmpty(workspace, this.fileService)) {
      await this.workspaceTrustManagementService.setWorkspaceTrust(true);
    }
  }
};
ChatTransferService = __decorateClass([
  __decorateParam(0, IWorkspaceContextService),
  __decorateParam(1, IStorageService),
  __decorateParam(2, IFileService),
  __decorateParam(3, IWorkspaceTrustManagementService)
], ChatTransferService);
export {
  ChatTransferService,
  IChatTransferService
};
//# sourceMappingURL=chatTransferService.js.map
