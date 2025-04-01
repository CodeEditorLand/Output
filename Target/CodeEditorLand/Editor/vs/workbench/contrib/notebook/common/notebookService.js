var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import {
  VSBuffer,
  VSBufferReadableStream
} from "../../../../base/common/buffer.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ConfigurationTarget } from "../../../../platform/configuration/common/configuration.js";
import {
  IFileStatWithMetadata,
  IWriteFileOptions
} from "../../../../platform/files/common/files.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { ITextQuery } from "../../../services/search/common/search.js";
import { SnapshotContext } from "../../../services/workingCopy/common/fileWorkingCopy.js";
import { NotebookPriorityInfo } from "../../search/common/search.js";
import { INotebookFileMatchNoModel } from "../../search/common/searchNotebookHelpers.js";
import { NotebookCellTextModel } from "./model/notebookCellTextModel.js";
import { NotebookTextModel } from "./model/notebookTextModel.js";
import {
  INotebookContributionData,
  INotebookRendererInfo,
  INotebookStaticPreloadInfo,
  IOrderedMimeType,
  IOutputDto,
  NotebookData,
  NotebookExtensionDescription,
  TransientOptions
} from "./notebookCommon.js";
import { NotebookProviderInfo } from "./notebookProvider.js";
const INotebookService = createDecorator("notebookService");
class SimpleNotebookProviderInfo {
  constructor(viewType, serializer, extensionData) {
    this.viewType = viewType;
    this.serializer = serializer;
    this.extensionData = extensionData;
  }
  static {
    __name(this, "SimpleNotebookProviderInfo");
  }
}
export {
  INotebookService,
  SimpleNotebookProviderInfo
};
//# sourceMappingURL=notebookService.js.map
