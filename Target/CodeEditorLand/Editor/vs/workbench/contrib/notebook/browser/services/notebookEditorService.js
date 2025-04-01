import { Dimension } from "../../../../../base/browser/dom.js";
import { CodeWindow } from "../../../../../base/browser/window.js";
import { Event } from "../../../../../base/common/event.js";
import { URI } from "../../../../../base/common/uri.js";
import {
  createDecorator,
  ServicesAccessor
} from "../../../../../platform/instantiation/common/instantiation.js";
import {
  INotebookEditor,
  INotebookEditorCreationOptions
} from "../notebookBrowser.js";
import { NotebookEditorWidget } from "../notebookEditorWidget.js";
const INotebookEditorService = createDecorator(
  "INotebookEditorWidgetService"
);
export {
  INotebookEditorService
};
//# sourceMappingURL=notebookEditorService.js.map
