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
import { localize } from "../../../../nls.js";
import { CancellationToken, CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { getFileNamesMessage, IConfirmation, IDialogService, IFileDialogService, IPromptButton } from "../../../../platform/dialogs/common/dialogs.js";
import { ByteSize, FileSystemProviderCapabilities, IFileService, IFileStatWithMetadata } from "../../../../platform/files/common/files.js";
import { INotificationService, Severity } from "../../../../platform/notification/common/notification.js";
import { IProgress, IProgressService, IProgressStep, ProgressLocation } from "../../../../platform/progress/common/progress.js";
import { IExplorerService } from "./files.js";
import { IFilesConfiguration, UndoConfirmLevel, VIEW_ID } from "../common/files.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { Limiter, Promises, RunOnceWorker } from "../../../../base/common/async.js";
import { newWriteableBufferStream, VSBuffer } from "../../../../base/common/buffer.js";
import { basename, dirname, joinPath } from "../../../../base/common/resources.js";
import { ResourceFileEdit } from "../../../../editor/browser/services/bulkEditService.js";
import { ExplorerItem } from "../common/explorerModel.js";
import { URI } from "../../../../base/common/uri.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { extractEditorsAndFilesDropData } from "../../../../platform/dnd/browser/dnd.js";
import { IWorkspaceEditingService } from "../../../services/workspaces/common/workspaceEditing.js";
import { isWeb } from "../../../../base/common/platform.js";
import { getActiveWindow, isDragEvent, triggerDownload } from "../../../../base/browser/dom.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { FileAccess, Schemas } from "../../../../base/common/network.js";
import { mnemonicButtonLabel } from "../../../../base/common/labels.js";
import { listenStream } from "../../../../base/common/stream.js";
import { DisposableStore, toDisposable } from "../../../../base/common/lifecycle.js";
import { createSingleCallFunction } from "../../../../base/common/functional.js";
import { coalesce } from "../../../../base/common/arrays.js";
import { canceled } from "../../../../base/common/errors.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { WebFileSystemAccess } from "../../../../platform/files/browser/webFileSystemAccess.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
let BrowserFileUpload = class {
  constructor(progressService, dialogService, explorerService, editorService, fileService) {
    this.progressService = progressService;
    this.dialogService = dialogService;
    this.explorerService = explorerService;
    this.editorService = editorService;
    this.fileService = fileService;
  }
  static {
    __name(this, "BrowserFileUpload");
  }
  static MAX_PARALLEL_UPLOADS = 20;
  upload(target, source) {
    const cts = new CancellationTokenSource();
    const uploadPromise = this.progressService.withProgress(
      {
        location: ProgressLocation.Window,
        delay: 800,
        cancellable: true,
        title: localize("uploadingFiles", "Uploading")
      },
      async (progress) => this.doUpload(target, this.toTransfer(source), progress, cts.token),
      () => cts.dispose(true)
    );
    this.progressService.withProgress({ location: VIEW_ID, delay: 500 }, () => uploadPromise);
    return uploadPromise;
  }
  toTransfer(source) {
    if (isDragEvent(source)) {
      return source.dataTransfer;
    }
    const transfer = { items: [] };
    for (const file of source) {
      transfer.items.push({
        webkitGetAsEntry: /* @__PURE__ */ __name(() => {
          return {
            name: file.name,
            isDirectory: false,
            isFile: true,
            createReader: /* @__PURE__ */ __name(() => {
              throw new Error("Unsupported for files");
            }, "createReader"),
            file: /* @__PURE__ */ __name((resolve) => resolve(file), "file")
          };
        }, "webkitGetAsEntry")
      });
    }
    return transfer;
  }
  async doUpload(target, source, progress, token) {
    const items = source.items;
    const entries = [];
    for (const item of items) {
      entries.push(item.webkitGetAsEntry());
    }
    const results = [];
    const operation = {
      startTime: Date.now(),
      progressScheduler: new RunOnceWorker((steps) => {
        progress.report(steps[steps.length - 1]);
      }, 1e3),
      filesTotal: entries.length,
      filesUploaded: 0,
      totalBytesUploaded: 0
    };
    const uploadLimiter = new Limiter(BrowserFileUpload.MAX_PARALLEL_UPLOADS);
    await Promises.settled(entries.map((entry) => {
      return uploadLimiter.queue(async () => {
        if (token.isCancellationRequested) {
          return;
        }
        if (target && entry.name && target.getChild(entry.name)) {
          const { confirmed } = await this.dialogService.confirm(getFileOverwriteConfirm(entry.name));
          if (!confirmed) {
            return;
          }
          await this.explorerService.applyBulkEdit([new ResourceFileEdit(joinPath(target.resource, entry.name), void 0, { recursive: true, folder: target.getChild(entry.name)?.isDirectory })], {
            undoLabel: localize("overwrite", "Overwrite {0}", entry.name),
            progressLabel: localize("overwriting", "Overwriting {0}", entry.name)
          });
          if (token.isCancellationRequested) {
            return;
          }
        }
        const result = await this.doUploadEntry(entry, target.resource, target, progress, operation, token);
        if (result) {
          results.push(result);
        }
      });
    }));
    operation.progressScheduler.dispose();
    const firstUploadedFile = results[0];
    if (!token.isCancellationRequested && firstUploadedFile?.isFile) {
      await this.editorService.openEditor({ resource: firstUploadedFile.resource, options: { pinned: true } });
    }
  }
  async doUploadEntry(entry, parentResource, target, progress, operation, token) {
    if (token.isCancellationRequested || !entry.name || !entry.isFile && !entry.isDirectory) {
      return void 0;
    }
    let fileBytesUploaded = 0;
    const reportProgress = /* @__PURE__ */ __name((fileSize, bytesUploaded) => {
      fileBytesUploaded += bytesUploaded;
      operation.totalBytesUploaded += bytesUploaded;
      const bytesUploadedPerSecond = operation.totalBytesUploaded / ((Date.now() - operation.startTime) / 1e3);
      let message;
      if (fileSize < ByteSize.MB) {
        if (operation.filesTotal === 1) {
          message = `${entry.name}`;
        } else {
          message = localize("uploadProgressSmallMany", "{0} of {1} files ({2}/s)", operation.filesUploaded, operation.filesTotal, ByteSize.formatSize(bytesUploadedPerSecond));
        }
      } else {
        message = localize("uploadProgressLarge", "{0} ({1} of {2}, {3}/s)", entry.name, ByteSize.formatSize(fileBytesUploaded), ByteSize.formatSize(fileSize), ByteSize.formatSize(bytesUploadedPerSecond));
      }
      operation.progressScheduler.work({ message });
    }, "reportProgress");
    operation.filesUploaded++;
    reportProgress(0, 0);
    const resource = joinPath(parentResource, entry.name);
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
      if (token.isCancellationRequested) {
        return void 0;
      }
      if (typeof file.stream === "function" && file.size > ByteSize.MB) {
        await this.doUploadFileBuffered(resource, file, reportProgress, token);
      } else {
        await this.doUploadFileUnbuffered(resource, file, reportProgress);
      }
      return { isFile: true, resource };
    } else {
      await this.fileService.createFolder(resource);
      if (token.isCancellationRequested) {
        return void 0;
      }
      const dirReader = entry.createReader();
      const childEntries = [];
      let done = false;
      do {
        const childEntriesChunk = await new Promise((resolve, reject) => dirReader.readEntries(resolve, reject));
        if (childEntriesChunk.length > 0) {
          childEntries.push(...childEntriesChunk);
        } else {
          done = true;
        }
      } while (!done && !token.isCancellationRequested);
      operation.filesTotal += childEntries.length;
      const folderTarget = target && target.getChild(entry.name) || void 0;
      const fileChildEntries = [];
      const folderChildEntries = [];
      for (const childEntry of childEntries) {
        if (childEntry.isFile) {
          fileChildEntries.push(childEntry);
        } else if (childEntry.isDirectory) {
          folderChildEntries.push(childEntry);
        }
      }
      const fileUploadQueue = new Limiter(BrowserFileUpload.MAX_PARALLEL_UPLOADS);
      await Promises.settled(fileChildEntries.map((fileChildEntry) => {
        return fileUploadQueue.queue(() => this.doUploadEntry(fileChildEntry, resource, folderTarget, progress, operation, token));
      }));
      for (const folderChildEntry of folderChildEntries) {
        await this.doUploadEntry(folderChildEntry, resource, folderTarget, progress, operation, token);
      }
      return { isFile: false, resource };
    }
  }
  async doUploadFileBuffered(resource, file, progressReporter, token) {
    const writeableStream = newWriteableBufferStream({
      // Set a highWaterMark to prevent the stream
      // for file upload to produce large buffers
      // in-memory
      highWaterMark: 10
    });
    const writeFilePromise = this.fileService.writeFile(resource, writeableStream);
    try {
      const reader = file.stream().getReader();
      let res = await reader.read();
      while (!res.done) {
        if (token.isCancellationRequested) {
          break;
        }
        const buffer = VSBuffer.wrap(res.value);
        await writeableStream.write(buffer);
        if (token.isCancellationRequested) {
          break;
        }
        progressReporter(file.size, buffer.byteLength);
        res = await reader.read();
      }
      writeableStream.end(void 0);
    } catch (error) {
      writeableStream.error(error);
      writeableStream.end();
    }
    if (token.isCancellationRequested) {
      return void 0;
    }
    await writeFilePromise;
  }
  doUploadFileUnbuffered(resource, file, progressReporter) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          if (event.target?.result instanceof ArrayBuffer) {
            const buffer = VSBuffer.wrap(new Uint8Array(event.target.result));
            await this.fileService.writeFile(resource, buffer);
            progressReporter(file.size, buffer.byteLength);
          } else {
            throw new Error("Could not read from dropped file.");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }
};
BrowserFileUpload = __decorateClass([
  __decorateParam(0, IProgressService),
  __decorateParam(1, IDialogService),
  __decorateParam(2, IExplorerService),
  __decorateParam(3, IEditorService),
  __decorateParam(4, IFileService)
], BrowserFileUpload);
let ExternalFileImport = class {
  constructor(fileService, hostService, contextService, configurationService, dialogService, workspaceEditingService, explorerService, editorService, progressService, notificationService, instantiationService) {
    this.fileService = fileService;
    this.hostService = hostService;
    this.contextService = contextService;
    this.configurationService = configurationService;
    this.dialogService = dialogService;
    this.workspaceEditingService = workspaceEditingService;
    this.explorerService = explorerService;
    this.editorService = editorService;
    this.progressService = progressService;
    this.notificationService = notificationService;
    this.instantiationService = instantiationService;
  }
  static {
    __name(this, "ExternalFileImport");
  }
  async import(target, source, targetWindow) {
    const cts = new CancellationTokenSource();
    const importPromise = this.progressService.withProgress(
      {
        location: ProgressLocation.Window,
        delay: 800,
        cancellable: true,
        title: localize("copyingFiles", "Copying...")
      },
      async () => await this.doImport(target, source, targetWindow, cts.token),
      () => cts.dispose(true)
    );
    this.progressService.withProgress({ location: VIEW_ID, delay: 500 }, () => importPromise);
    return importPromise;
  }
  async doImport(target, source, targetWindow, token) {
    const candidateFiles = coalesce((await this.instantiationService.invokeFunction((accessor) => extractEditorsAndFilesDropData(accessor, source))).map((editor) => editor.resource));
    await Promise.all(candidateFiles.map((resource) => this.fileService.activateProvider(resource.scheme)));
    const files = coalesce(candidateFiles.filter((resource) => this.fileService.hasProvider(resource)));
    const resolvedFiles = await this.fileService.resolveAll(files.map((file) => ({ resource: file })));
    if (token.isCancellationRequested) {
      return;
    }
    this.hostService.focus(targetWindow);
    const folders = resolvedFiles.filter((resolvedFile) => resolvedFile.success && resolvedFile.stat?.isDirectory).map((resolvedFile) => ({ uri: resolvedFile.stat.resource }));
    if (folders.length > 0 && target.isRoot) {
      let ImportChoice;
      ((ImportChoice2) => {
        ImportChoice2[ImportChoice2["Copy"] = 1] = "Copy";
        ImportChoice2[ImportChoice2["Add"] = 2] = "Add";
      })(ImportChoice || (ImportChoice = {}));
      const buttons = [
        {
          label: folders.length > 1 ? localize("copyFolders", "&&Copy Folders") : localize("copyFolder", "&&Copy Folder"),
          run: /* @__PURE__ */ __name(() => 1 /* Copy */, "run")
        }
      ];
      let message;
      const workspaceFolderSchemas = this.contextService.getWorkspace().folders.map((folder) => folder.uri.scheme);
      if (folders.some((folder) => workspaceFolderSchemas.indexOf(folder.uri.scheme) >= 0)) {
        buttons.unshift({
          label: folders.length > 1 ? localize("addFolders", "&&Add Folders to Workspace") : localize("addFolder", "&&Add Folder to Workspace"),
          run: /* @__PURE__ */ __name(() => 2 /* Add */, "run")
        });
        message = folders.length > 1 ? localize("dropFolders", "Do you want to copy the folders or add the folders to the workspace?") : localize("dropFolder", "Do you want to copy '{0}' or add '{0}' as a folder to the workspace?", basename(folders[0].uri));
      } else {
        message = folders.length > 1 ? localize("copyfolders", "Are you sure to want to copy folders?") : localize("copyfolder", "Are you sure to want to copy '{0}'?", basename(folders[0].uri));
      }
      const { result } = await this.dialogService.prompt({
        type: Severity.Info,
        message,
        buttons,
        cancelButton: true
      });
      if (result === 2 /* Add */) {
        return this.workspaceEditingService.addFolders(folders);
      }
      if (result === 1 /* Copy */) {
        return this.importResources(target, files, token);
      }
    } else if (target instanceof ExplorerItem) {
      return this.importResources(target, files, token);
    }
  }
  async importResources(target, resources, token) {
    if (resources && resources.length > 0) {
      const targetStat = await this.fileService.resolve(target.resource);
      if (token.isCancellationRequested) {
        return;
      }
      const targetNames = /* @__PURE__ */ new Set();
      const caseSensitive = this.fileService.hasCapability(target.resource, FileSystemProviderCapabilities.PathCaseSensitive);
      if (targetStat.children) {
        targetStat.children.forEach((child) => {
          targetNames.add(caseSensitive ? child.name : child.name.toLowerCase());
        });
      }
      let inaccessibleFileCount = 0;
      const resourcesFiltered = coalesce(await Promises.settled(resources.map(async (resource) => {
        const fileDoesNotExist = !await this.fileService.exists(resource);
        if (fileDoesNotExist) {
          inaccessibleFileCount++;
          return void 0;
        }
        if (targetNames.has(caseSensitive ? basename(resource) : basename(resource).toLowerCase())) {
          const confirmationResult = await this.dialogService.confirm(getFileOverwriteConfirm(basename(resource)));
          if (!confirmationResult.confirmed) {
            return void 0;
          }
        }
        return resource;
      })));
      if (inaccessibleFileCount > 0) {
        this.notificationService.error(inaccessibleFileCount > 1 ? localize("filesInaccessible", "Some or all of the dropped files could not be accessed for import.") : localize("fileInaccessible", "The dropped file could not be accessed for import."));
      }
      const resourceFileEdits = resourcesFiltered.map((resource) => {
        const sourceFileName = basename(resource);
        const targetFile = joinPath(target.resource, sourceFileName);
        return new ResourceFileEdit(resource, targetFile, { overwrite: true, copy: true });
      });
      const undoLevel = this.configurationService.getValue().explorer.confirmUndo;
      await this.explorerService.applyBulkEdit(resourceFileEdits, {
        undoLabel: resourcesFiltered.length === 1 ? localize({ comment: ["substitution will be the name of the file that was imported"], key: "importFile" }, "Import {0}", basename(resourcesFiltered[0])) : localize({ comment: ["substitution will be the number of files that were imported"], key: "importnFile" }, "Import {0} resources", resourcesFiltered.length),
        progressLabel: resourcesFiltered.length === 1 ? localize({ comment: ["substitution will be the name of the file that was copied"], key: "copyingFile" }, "Copying {0}", basename(resourcesFiltered[0])) : localize({ comment: ["substitution will be the number of files that were copied"], key: "copyingnFile" }, "Copying {0} resources", resourcesFiltered.length),
        progressLocation: ProgressLocation.Window,
        confirmBeforeUndo: undoLevel === UndoConfirmLevel.Verbose || undoLevel === UndoConfirmLevel.Default
      });
      const autoOpen = this.configurationService.getValue().explorer.autoOpenDroppedFile;
      if (autoOpen && resourceFileEdits.length === 1) {
        const item = this.explorerService.findClosest(resourceFileEdits[0].newResource);
        if (item && !item.isDirectory) {
          this.editorService.openEditor({ resource: item.resource, options: { pinned: true } });
        }
      }
    }
  }
};
ExternalFileImport = __decorateClass([
  __decorateParam(0, IFileService),
  __decorateParam(1, IHostService),
  __decorateParam(2, IWorkspaceContextService),
  __decorateParam(3, IConfigurationService),
  __decorateParam(4, IDialogService),
  __decorateParam(5, IWorkspaceEditingService),
  __decorateParam(6, IExplorerService),
  __decorateParam(7, IEditorService),
  __decorateParam(8, IProgressService),
  __decorateParam(9, INotificationService),
  __decorateParam(10, IInstantiationService)
], ExternalFileImport);
let FileDownload = class {
  constructor(fileService, explorerService, progressService, logService, fileDialogService, storageService) {
    this.fileService = fileService;
    this.explorerService = explorerService;
    this.progressService = progressService;
    this.logService = logService;
    this.fileDialogService = fileDialogService;
    this.storageService = storageService;
  }
  static {
    __name(this, "FileDownload");
  }
  static LAST_USED_DOWNLOAD_PATH_STORAGE_KEY = "workbench.explorer.downloadPath";
  download(source) {
    const cts = new CancellationTokenSource();
    const downloadPromise = this.progressService.withProgress(
      {
        location: ProgressLocation.Window,
        delay: 800,
        cancellable: isWeb,
        title: localize("downloadingFiles", "Downloading")
      },
      async (progress) => this.doDownload(source, progress, cts),
      () => cts.dispose(true)
    );
    this.progressService.withProgress({ location: VIEW_ID, delay: 500 }, () => downloadPromise);
    return downloadPromise;
  }
  async doDownload(sources, progress, cts) {
    for (const source of sources) {
      if (cts.token.isCancellationRequested) {
        return;
      }
      if (isWeb) {
        await this.doDownloadBrowser(source.resource, progress, cts);
      } else {
        await this.doDownloadNative(source, progress, cts);
      }
    }
  }
  async doDownloadBrowser(resource, progress, cts) {
    const stat = await this.fileService.resolve(resource, { resolveMetadata: true });
    if (cts.token.isCancellationRequested) {
      return;
    }
    const maxBlobDownloadSize = 32 * ByteSize.MB;
    const preferFileSystemAccessWebApis = stat.isDirectory || stat.size > maxBlobDownloadSize;
    const activeWindow = getActiveWindow();
    if (preferFileSystemAccessWebApis && WebFileSystemAccess.supported(activeWindow)) {
      try {
        const parentFolder = await activeWindow.showDirectoryPicker();
        const operation = {
          startTime: Date.now(),
          progressScheduler: new RunOnceWorker((steps) => {
            progress.report(steps[steps.length - 1]);
          }, 1e3),
          filesTotal: stat.isDirectory ? 0 : 1,
          // folders increment filesTotal within downloadFolder method
          filesDownloaded: 0,
          totalBytesDownloaded: 0,
          fileBytesDownloaded: 0
        };
        if (stat.isDirectory) {
          const targetFolder = await parentFolder.getDirectoryHandle(stat.name, { create: true });
          await this.downloadFolderBrowser(stat, targetFolder, operation, cts.token);
        } else {
          await this.downloadFileBrowser(parentFolder, stat, operation, cts.token);
        }
        operation.progressScheduler.dispose();
      } catch (error) {
        this.logService.warn(error);
        cts.cancel();
      }
    } else if (stat.isFile) {
      let bufferOrUri;
      try {
        bufferOrUri = (await this.fileService.readFile(stat.resource, { limits: { size: maxBlobDownloadSize } }, cts.token)).value.buffer;
      } catch (error) {
        bufferOrUri = FileAccess.uriToBrowserUri(stat.resource);
      }
      if (!cts.token.isCancellationRequested) {
        triggerDownload(bufferOrUri, stat.name);
      }
    }
  }
  async downloadFileBufferedBrowser(resource, target, operation, token) {
    const contents = await this.fileService.readFileStream(resource, void 0, token);
    if (token.isCancellationRequested) {
      target.close();
      return;
    }
    return new Promise((resolve, reject) => {
      const sourceStream = contents.value;
      const disposables = new DisposableStore();
      disposables.add(toDisposable(() => target.close()));
      disposables.add(createSingleCallFunction(token.onCancellationRequested)(() => {
        disposables.dispose();
        reject(canceled());
      }));
      listenStream(sourceStream, {
        onData: /* @__PURE__ */ __name((data) => {
          target.write(data.buffer);
          this.reportProgress(contents.name, contents.size, data.byteLength, operation);
        }, "onData"),
        onError: /* @__PURE__ */ __name((error) => {
          disposables.dispose();
          reject(error);
        }, "onError"),
        onEnd: /* @__PURE__ */ __name(() => {
          disposables.dispose();
          resolve();
        }, "onEnd")
      }, token);
    });
  }
  async downloadFileUnbufferedBrowser(resource, target, operation, token) {
    const contents = await this.fileService.readFile(resource, void 0, token);
    if (!token.isCancellationRequested) {
      target.write(contents.value.buffer);
      this.reportProgress(contents.name, contents.size, contents.value.byteLength, operation);
    }
    target.close();
  }
  async downloadFileBrowser(targetFolder, file, operation, token) {
    operation.filesDownloaded++;
    operation.fileBytesDownloaded = 0;
    this.reportProgress(file.name, 0, 0, operation);
    const targetFile = await targetFolder.getFileHandle(file.name, { create: true });
    const targetFileWriter = await targetFile.createWritable();
    if (file.size > ByteSize.MB) {
      return this.downloadFileBufferedBrowser(file.resource, targetFileWriter, operation, token);
    }
    return this.downloadFileUnbufferedBrowser(file.resource, targetFileWriter, operation, token);
  }
  async downloadFolderBrowser(folder, targetFolder, operation, token) {
    if (folder.children) {
      operation.filesTotal += folder.children.map((child) => child.isFile).length;
      for (const child of folder.children) {
        if (token.isCancellationRequested) {
          return;
        }
        if (child.isFile) {
          await this.downloadFileBrowser(targetFolder, child, operation, token);
        } else {
          const childFolder = await targetFolder.getDirectoryHandle(child.name, { create: true });
          const resolvedChildFolder = await this.fileService.resolve(child.resource, { resolveMetadata: true });
          await this.downloadFolderBrowser(resolvedChildFolder, childFolder, operation, token);
        }
      }
    }
  }
  reportProgress(name, fileSize, bytesDownloaded, operation) {
    operation.fileBytesDownloaded += bytesDownloaded;
    operation.totalBytesDownloaded += bytesDownloaded;
    const bytesDownloadedPerSecond = operation.totalBytesDownloaded / ((Date.now() - operation.startTime) / 1e3);
    let message;
    if (fileSize < ByteSize.MB) {
      if (operation.filesTotal === 1) {
        message = name;
      } else {
        message = localize("downloadProgressSmallMany", "{0} of {1} files ({2}/s)", operation.filesDownloaded, operation.filesTotal, ByteSize.formatSize(bytesDownloadedPerSecond));
      }
    } else {
      message = localize("downloadProgressLarge", "{0} ({1} of {2}, {3}/s)", name, ByteSize.formatSize(operation.fileBytesDownloaded), ByteSize.formatSize(fileSize), ByteSize.formatSize(bytesDownloadedPerSecond));
    }
    operation.progressScheduler.work({ message });
  }
  async doDownloadNative(explorerItem, progress, cts) {
    progress.report({ message: explorerItem.name });
    let defaultUri;
    const lastUsedDownloadPath = this.storageService.get(FileDownload.LAST_USED_DOWNLOAD_PATH_STORAGE_KEY, StorageScope.APPLICATION);
    if (lastUsedDownloadPath) {
      defaultUri = joinPath(URI.file(lastUsedDownloadPath), explorerItem.name);
    } else {
      defaultUri = joinPath(
        explorerItem.isDirectory ? await this.fileDialogService.defaultFolderPath(Schemas.file) : await this.fileDialogService.defaultFilePath(Schemas.file),
        explorerItem.name
      );
    }
    const destination = await this.fileDialogService.showSaveDialog({
      availableFileSystems: [Schemas.file],
      saveLabel: mnemonicButtonLabel(localize("downloadButton", "Download")),
      title: localize("chooseWhereToDownload", "Choose Where to Download"),
      defaultUri
    });
    if (destination) {
      this.storageService.store(FileDownload.LAST_USED_DOWNLOAD_PATH_STORAGE_KEY, dirname(destination).fsPath, StorageScope.APPLICATION, StorageTarget.MACHINE);
      await this.explorerService.applyBulkEdit([new ResourceFileEdit(explorerItem.resource, destination, { overwrite: true, copy: true })], {
        undoLabel: localize("downloadBulkEdit", "Download {0}", explorerItem.name),
        progressLabel: localize("downloadingBulkEdit", "Downloading {0}", explorerItem.name),
        progressLocation: ProgressLocation.Window
      });
    } else {
      cts.cancel();
    }
  }
};
FileDownload = __decorateClass([
  __decorateParam(0, IFileService),
  __decorateParam(1, IExplorerService),
  __decorateParam(2, IProgressService),
  __decorateParam(3, ILogService),
  __decorateParam(4, IFileDialogService),
  __decorateParam(5, IStorageService)
], FileDownload);
function getFileOverwriteConfirm(name) {
  return {
    message: localize("confirmOverwrite", "A file or folder with the name '{0}' already exists in the destination folder. Do you want to replace it?", name),
    detail: localize("irreversible", "This action is irreversible!"),
    primaryButton: localize({ key: "replaceButtonLabel", comment: ["&& denotes a mnemonic"] }, "&&Replace"),
    type: "warning"
  };
}
__name(getFileOverwriteConfirm, "getFileOverwriteConfirm");
function getMultipleFilesOverwriteConfirm(files) {
  if (files.length > 1) {
    return {
      message: localize("confirmManyOverwrites", "The following {0} files and/or folders already exist in the destination folder. Do you want to replace them?", files.length),
      detail: getFileNamesMessage(files) + "\n" + localize("irreversible", "This action is irreversible!"),
      primaryButton: localize({ key: "replaceButtonLabel", comment: ["&& denotes a mnemonic"] }, "&&Replace"),
      type: "warning"
    };
  }
  return getFileOverwriteConfirm(basename(files[0]));
}
__name(getMultipleFilesOverwriteConfirm, "getMultipleFilesOverwriteConfirm");
export {
  BrowserFileUpload,
  ExternalFileImport,
  FileDownload,
  getFileOverwriteConfirm,
  getMultipleFilesOverwriteConfirm
};
//# sourceMappingURL=fileImportExport.js.map
