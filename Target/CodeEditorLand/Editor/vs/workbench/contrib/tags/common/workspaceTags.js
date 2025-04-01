var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { URI } from "../../../../base/common/uri.js";
import { getRemotes } from "../../../../platform/extensionManagement/common/configRemotes.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import {
  IWorkspace,
  WorkbenchState
} from "../../../../platform/workspace/common/workspace.js";
const IWorkspaceTagsService = createDecorator(
  "workspaceTagsService"
);
async function getHashedRemotesFromConfig(text, stripEndingDotGit = false, sha1Hex) {
  return Promise.all(
    getRemotes(text, stripEndingDotGit).map((remote) => sha1Hex(remote))
  );
}
__name(getHashedRemotesFromConfig, "getHashedRemotesFromConfig");
export {
  IWorkspaceTagsService,
  getHashedRemotesFromConfig
};
//# sourceMappingURL=workspaceTags.js.map
