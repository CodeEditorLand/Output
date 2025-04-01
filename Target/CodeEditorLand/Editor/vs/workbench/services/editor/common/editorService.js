var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Event } from "../../../../base/common/event.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import {
  IDiffEditor,
  IEditor
} from "../../../../editor/common/editorCommon.js";
import {
  IEditorOptions,
  IResourceEditorInput,
  IResourceEditorInputIdentifier,
  ITextResourceEditorInput
} from "../../../../platform/editor/common/editor.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import {
  EditorsOrder,
  GroupIdentifier,
  IEditorCloseEvent,
  IEditorIdentifier,
  IEditorPane,
  IEditorWillOpenEvent,
  IFindEditorOptions,
  IResourceDiffEditorInput,
  IRevertOptions,
  ISaveOptions,
  ITextDiffEditorPane,
  IUntitledTextResourceEditorInput,
  IUntypedEditorInput,
  IVisibleEditorPane
} from "../../../common/editor.js";
import { IGroupModelChangeEvent } from "../../../common/editor/editorGroupModel.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import {
  ICloseEditorOptions,
  IEditorGroup,
  IEditorGroupsContainer,
  isEditorGroup
} from "./editorGroupsService.js";
const IEditorService = createDecorator("editorService");
const ACTIVE_GROUP = -1;
const SIDE_GROUP = -2;
const AUX_WINDOW_GROUP = -3;
function isPreferredGroup(obj) {
  const candidate = obj;
  return typeof obj === "number" || isEditorGroup(candidate);
}
__name(isPreferredGroup, "isPreferredGroup");
export {
  ACTIVE_GROUP,
  AUX_WINDOW_GROUP,
  IEditorService,
  SIDE_GROUP,
  isPreferredGroup
};
//# sourceMappingURL=editorService.js.map
