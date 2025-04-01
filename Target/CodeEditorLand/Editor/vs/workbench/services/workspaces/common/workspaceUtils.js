var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { URI } from "../../../../base/common/uri.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import {
  IStorageService,
  StorageScope
} from "../../../../platform/storage/common/storage.js";
import { IWorkspace } from "../../../../platform/workspace/common/workspace.js";
function isChatTransferredWorkspace(workspace, storageService) {
  const workspaceUri = workspace.folders[0]?.uri;
  if (!workspaceUri) {
    return false;
  }
  const chatWorkspaceTransfer = storageService.getObject(
    "chat.workspaceTransfer",
    StorageScope.PROFILE,
    []
  );
  const toWorkspace = chatWorkspaceTransfer.map(
    (item) => {
      return { toWorkspace: URI.from(item.toWorkspace) };
    }
  );
  return toWorkspace.some(
    (item) => item.toWorkspace.toString() === workspaceUri.toString()
  );
}
__name(isChatTransferredWorkspace, "isChatTransferredWorkspace");
async function areWorkspaceFoldersEmpty(workspace, fileService) {
  for (const folder of workspace.folders) {
    const folderStat = await fileService.resolve(folder.uri);
    if (folderStat.children && folderStat.children.length > 0) {
      return false;
    }
  }
  return true;
}
__name(areWorkspaceFoldersEmpty, "areWorkspaceFoldersEmpty");
export {
  areWorkspaceFoldersEmpty,
  isChatTransferredWorkspace
};
//# sourceMappingURL=workspaceUtils.js.map
