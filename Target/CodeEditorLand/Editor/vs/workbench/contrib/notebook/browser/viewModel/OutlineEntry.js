var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../../base/common/codicons.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { IMarkerService, MarkerSeverity } from "../../../../../platform/markers/common/markers.js";
import { ICellViewModel } from "../notebookBrowser.js";
import { executingStateIcon } from "../notebookIcons.js";
import { CellKind } from "../../common/notebookCommon.js";
import { IRange } from "../../../../../editor/common/core/range.js";
import { SymbolKind, SymbolKinds } from "../../../../../editor/common/languages.js";
class OutlineEntry {
  constructor(index, level, cell, label, isExecuting, isPaused, range, symbolKind) {
    this.index = index;
    this.level = level;
    this.cell = cell;
    this.label = label;
    this.isExecuting = isExecuting;
    this.isPaused = isPaused;
    this.range = range;
    this.symbolKind = symbolKind;
  }
  static {
    __name(this, "OutlineEntry");
  }
  _children = [];
  _parent;
  _markerInfo;
  get icon() {
    if (this.symbolKind) {
      return SymbolKinds.toIcon(this.symbolKind);
    }
    return this.isExecuting && this.isPaused ? executingStateIcon : this.isExecuting ? ThemeIcon.modify(executingStateIcon, "spin") : this.cell.cellKind === CellKind.Markup ? Codicon.markdown : Codicon.code;
  }
  addChild(entry) {
    this._children.push(entry);
    entry._parent = this;
  }
  get parent() {
    return this._parent;
  }
  get children() {
    return this._children;
  }
  get markerInfo() {
    return this._markerInfo;
  }
  get position() {
    if (this.range) {
      return { startLineNumber: this.range.startLineNumber, startColumn: this.range.startColumn };
    }
    return void 0;
  }
  updateMarkers(markerService) {
    if (this.cell.cellKind === CellKind.Code) {
      const marker = markerService.read({ resource: this.cell.uri, severities: MarkerSeverity.Error | MarkerSeverity.Warning });
      if (marker.length === 0) {
        this._markerInfo = void 0;
      } else {
        const topSev = marker.find((a) => a.severity === MarkerSeverity.Error)?.severity ?? MarkerSeverity.Warning;
        this._markerInfo = { topSev, count: marker.length };
      }
    } else {
      let topChild;
      for (const child of this.children) {
        child.updateMarkers(markerService);
        if (child.markerInfo) {
          topChild = !topChild ? child.markerInfo.topSev : Math.max(child.markerInfo.topSev, topChild);
        }
      }
      this._markerInfo = topChild && { topSev: topChild, count: 0 };
    }
  }
  clearMarkers() {
    this._markerInfo = void 0;
    for (const child of this.children) {
      child.clearMarkers();
    }
  }
  find(cell, parents) {
    if (cell.id === this.cell.id) {
      return this;
    }
    parents.push(this);
    for (const child of this.children) {
      const result = child.find(cell, parents);
      if (result) {
        return result;
      }
    }
    parents.pop();
    return void 0;
  }
  asFlatList(bucket) {
    bucket.push(this);
    for (const child of this.children) {
      child.asFlatList(bucket);
    }
  }
}
export {
  OutlineEntry
};
//# sourceMappingURL=OutlineEntry.js.map
