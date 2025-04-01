import { Event, IWaitUntil } from "../../../../base/common/event.js";
import { IReference } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { NotebookTextModel } from "./model/notebookTextModel.js";
import {
  IResolvedNotebookEditorModel,
  NotebookEditorModelCreationOptions
} from "./notebookCommon.js";
const INotebookEditorModelResolverService = createDecorator(
  "INotebookModelResolverService"
);
export {
  INotebookEditorModelResolverService
};
//# sourceMappingURL=notebookEditorModelResolverService.js.map
