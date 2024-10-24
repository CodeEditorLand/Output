var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ISequence, LcsDiff } from "../../../../../base/common/diff/diff.js";
import { doHash, numberHash } from "../../../../../base/common/hash.js";
import { IDisposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { IRequestHandler, IWorkerServer } from "../../../../../base/common/worker/simpleWorker.js";
import { PieceTreeTextBufferBuilder } from "../../../../../editor/common/model/pieceTreeTextBuffer/pieceTreeTextBufferBuilder.js";
import { CellKind, IMainCellDto, INotebookDiffResult, IOutputDto, NotebookCellInternalMetadata, NotebookCellMetadata, NotebookCellsChangedEventDto, NotebookCellsChangeType, NotebookCellTextModelSplice, NotebookDocumentMetadata, TransientDocumentMetadata } from "../notebookCommon.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { SearchParams } from "../../../../../editor/common/model/textModelSearch.js";
import { MirrorModel } from "../../../../../editor/common/services/textModelSync/textModelSync.impl.js";
import { DefaultEndOfLine } from "../../../../../editor/common/model.js";
import { IModelChangedEvent } from "../../../../../editor/common/model/mirrorTextModel.js";
import { filter } from "../../../../../base/common/objects.js";
class MirrorCell {
  constructor(handle, uri, source, _eol, versionId, language, cellKind, outputs, metadata, internalMetadata) {
    this.handle = handle;
    this._eol = _eol;
    this.language = language;
    this.cellKind = cellKind;
    this.outputs = outputs;
    this.metadata = metadata;
    this.internalMetadata = internalMetadata;
    this.textModel = new MirrorModel(uri, source, _eol, versionId);
  }
  static {
    __name(this, "MirrorCell");
  }
  textModel;
  _hash;
  get eol() {
    return this._eol === "\r\n" ? DefaultEndOfLine.CRLF : DefaultEndOfLine.LF;
  }
  onEvents(e) {
    this.textModel.onEvents(e);
    this._hash = void 0;
  }
  getValue() {
    return this.textModel.getValue();
  }
  async getComparisonValue() {
    return this._hash ??= this._getHash();
  }
  async _getHash() {
    let hashValue = numberHash(104579, 0);
    hashValue = doHash(this.language, hashValue);
    hashValue = doHash(this.getValue(), hashValue);
    hashValue = doHash(this.metadata, hashValue);
    hashValue = doHash(this.internalMetadata, hashValue);
    for (const op of this.outputs) {
      hashValue = doHash(op.metadata, hashValue);
      for (const output of op.outputs) {
        hashValue = doHash(output.mime, hashValue);
      }
    }
    const digests = await Promise.all(this.outputs.flatMap(
      (op) => op.outputs.map((o) => crypto.subtle.digest("sha-1", o.data.buffer))
    ));
    for (const digest of digests) {
      hashValue = numberHash(new Int32Array(digest)[0], hashValue);
    }
    return hashValue;
  }
}
class MirrorNotebookDocument {
  constructor(uri, cells, metadata, transientDocumentMetadata) {
    this.uri = uri;
    this.cells = cells;
    this.metadata = metadata;
    this.transientDocumentMetadata = transientDocumentMetadata;
  }
  static {
    __name(this, "MirrorNotebookDocument");
  }
  acceptModelChanged(event) {
    event.rawEvents.forEach((e) => {
      if (e.kind === NotebookCellsChangeType.ModelChange) {
        this._spliceNotebookCells(e.changes);
      } else if (e.kind === NotebookCellsChangeType.Move) {
        const cells = this.cells.splice(e.index, 1);
        this.cells.splice(e.newIdx, 0, ...cells);
      } else if (e.kind === NotebookCellsChangeType.Output) {
        const cell = this.cells[e.index];
        cell.outputs = e.outputs;
      } else if (e.kind === NotebookCellsChangeType.ChangeCellLanguage) {
        this._assertIndex(e.index);
        const cell = this.cells[e.index];
        cell.language = e.language;
      } else if (e.kind === NotebookCellsChangeType.ChangeCellMetadata) {
        this._assertIndex(e.index);
        const cell = this.cells[e.index];
        cell.metadata = e.metadata;
      } else if (e.kind === NotebookCellsChangeType.ChangeCellInternalMetadata) {
        this._assertIndex(e.index);
        const cell = this.cells[e.index];
        cell.internalMetadata = e.internalMetadata;
      } else if (e.kind === NotebookCellsChangeType.ChangeDocumentMetadata) {
        this.metadata = e.metadata;
      }
    });
  }
  _assertIndex(index) {
    if (index < 0 || index >= this.cells.length) {
      throw new Error(`Illegal index ${index}. Cells length: ${this.cells.length}`);
    }
  }
  _spliceNotebookCells(splices) {
    splices.reverse().forEach((splice) => {
      const cellDtos = splice[2];
      const newCells = cellDtos.map((cell) => {
        return new MirrorCell(
          cell.handle,
          URI.parse(cell.url),
          cell.source,
          cell.eol,
          cell.versionId,
          cell.language,
          cell.cellKind,
          cell.outputs,
          cell.metadata
        );
      });
      this.cells.splice(splice[0], splice[1], ...newCells);
    });
  }
}
class CellSequence {
  constructor(hashValue) {
    this.hashValue = hashValue;
  }
  static {
    __name(this, "CellSequence");
  }
  static async create(textModel) {
    const hashValue = new Int32Array(textModel.cells.length);
    await Promise.all(textModel.cells.map(async (c, i) => {
      hashValue[i] = await c.getComparisonValue();
    }));
    return new CellSequence(hashValue);
  }
  getElements() {
    return this.hashValue;
  }
}
class NotebookEditorSimpleWorker {
  static {
    __name(this, "NotebookEditorSimpleWorker");
  }
  _requestHandlerBrand;
  _models;
  constructor() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  dispose() {
  }
  $acceptNewModel(uri, metadata, transientDocumentMetadata, cells) {
    this._models[uri] = new MirrorNotebookDocument(URI.parse(uri), cells.map((dto) => new MirrorCell(
      dto.handle,
      URI.parse(dto.url),
      dto.source,
      dto.eol,
      dto.versionId,
      dto.language,
      dto.cellKind,
      dto.outputs,
      dto.metadata
    )), metadata, transientDocumentMetadata);
  }
  $acceptModelChanged(strURL, event) {
    const model = this._models[strURL];
    model?.acceptModelChanged(event);
  }
  $acceptCellModelChanged(strURL, handle, event) {
    const model = this._models[strURL];
    model.cells.find((cell) => cell.handle === handle)?.onEvents(event);
  }
  $acceptRemovedModel(strURL) {
    if (!this._models[strURL]) {
      return;
    }
    delete this._models[strURL];
  }
  async $computeDiff(originalUrl, modifiedUrl) {
    const original = this._getModel(originalUrl);
    const modified = this._getModel(modifiedUrl);
    const [originalSeq, modifiedSeq] = await Promise.all([
      CellSequence.create(original),
      CellSequence.create(modified)
    ]);
    const diff = new LcsDiff(originalSeq, modifiedSeq);
    const diffResult = diff.ComputeDiff(false);
    const originalMetadata = filter(original.metadata, (key) => !original.transientDocumentMetadata[key]);
    const modifiedMetadata = filter(modified.metadata, (key) => !modified.transientDocumentMetadata[key]);
    return {
      metadataChanged: JSON.stringify(originalMetadata) !== JSON.stringify(modifiedMetadata),
      cellsDiff: diffResult
      // linesDiff: cellLineChanges
    };
  }
  $canPromptRecommendation(modelUrl) {
    const model = this._getModel(modelUrl);
    const cells = model.cells;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.cellKind === CellKind.Markup) {
        continue;
      }
      if (cell.language !== "python") {
        continue;
      }
      const searchParams = new SearchParams("import\\s*pandas|from\\s*pandas", true, false, null);
      const searchData = searchParams.parseSearchRequest();
      if (!searchData) {
        continue;
      }
      const builder = new PieceTreeTextBufferBuilder();
      builder.acceptChunk(cell.getValue());
      const bufferFactory = builder.finish(true);
      const textBuffer = bufferFactory.create(cell.eol).textBuffer;
      const lineCount = textBuffer.getLineCount();
      const maxLineCount = Math.min(lineCount, 20);
      const range = new Range(1, 1, maxLineCount, textBuffer.getLineLength(maxLineCount) + 1);
      const cellMatches = textBuffer.findMatchesLineByLine(range, searchData, true, 1);
      if (cellMatches.length > 0) {
        return true;
      }
    }
    return false;
  }
  _getModel(uri) {
    return this._models[uri];
  }
}
function create(workerServer) {
  return new NotebookEditorSimpleWorker();
}
__name(create, "create");
export {
  NotebookEditorSimpleWorker,
  create
};
//# sourceMappingURL=notebookSimpleWorker.js.map
