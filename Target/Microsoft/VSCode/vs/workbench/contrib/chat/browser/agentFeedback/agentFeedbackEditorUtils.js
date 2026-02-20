var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { URI } from "../../../../../base/common/uri.js";
import { EditorResourceAccessor, SideBySideEditor } from "../../../../common/editor.js";
function getActiveResourceCandidates(input) {
  const result = [];
  const resources = EditorResourceAccessor.getOriginalUri(input, { supportSideBySide: SideBySideEditor.BOTH });
  if (!resources) {
    return result;
  }
  if (URI.isUri(resources)) {
    result.push(resources);
    return result;
  }
  if (resources.secondary) {
    result.push(resources.secondary);
  }
  if (resources.primary) {
    result.push(resources.primary);
  }
  return result;
}
__name(getActiveResourceCandidates, "getActiveResourceCandidates");
export {
  getActiveResourceCandidates
};
//# sourceMappingURL=agentFeedbackEditorUtils.js.map
