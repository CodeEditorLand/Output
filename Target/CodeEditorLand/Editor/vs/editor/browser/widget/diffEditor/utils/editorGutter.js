var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { h, reset } from "../../../../../base/browser/dom.js";
import { Disposable, IDisposable, toDisposable } from "../../../../../base/common/lifecycle.js";
import { autorun, IObservable, IReader, ISettableObservable, observableFromEvent, observableSignal, observableSignalFromEvent, observableValue, transaction } from "../../../../../base/common/observable.js";
import { CodeEditorWidget } from "../../codeEditor/codeEditorWidget.js";
import { LineRange } from "../../../../common/core/lineRange.js";
import { OffsetRange } from "../../../../common/core/offsetRange.js";
class EditorGutter extends Disposable {
  constructor(_editor, _domNode, itemProvider) {
    super();
    this._editor = _editor;
    this._domNode = _domNode;
    this.itemProvider = itemProvider;
    this._domNode.className = "gutter monaco-editor";
    const scrollDecoration = this._domNode.appendChild(
      h("div.scroll-decoration", { role: "presentation", ariaHidden: "true", style: { width: "100%" } }).root
    );
    const o = new ResizeObserver(() => {
      transaction((tx) => {
        this.domNodeSizeChanged.trigger(tx);
      });
    });
    o.observe(this._domNode);
    this._register(toDisposable(() => o.disconnect()));
    this._register(autorun((reader) => {
      scrollDecoration.className = this.isScrollTopZero.read(reader) ? "" : "scroll-decoration";
    }));
    this._register(autorun((reader) => (
      /** @description EditorGutter.Render */
      this.render(reader)
    )));
  }
  static {
    __name(this, "EditorGutter");
  }
  scrollTop = observableFromEvent(
    this,
    this._editor.onDidScrollChange,
    (e) => (
      /** @description editor.onDidScrollChange */
      this._editor.getScrollTop()
    )
  );
  isScrollTopZero = this.scrollTop.map((scrollTop) => (
    /** @description isScrollTopZero */
    scrollTop === 0
  ));
  modelAttached = observableFromEvent(
    this,
    this._editor.onDidChangeModel,
    (e) => (
      /** @description editor.onDidChangeModel */
      this._editor.hasModel()
    )
  );
  editorOnDidChangeViewZones = observableSignalFromEvent("onDidChangeViewZones", this._editor.onDidChangeViewZones);
  editorOnDidContentSizeChange = observableSignalFromEvent("onDidContentSizeChange", this._editor.onDidContentSizeChange);
  domNodeSizeChanged = observableSignal("domNodeSizeChanged");
  dispose() {
    super.dispose();
    reset(this._domNode);
  }
  views = /* @__PURE__ */ new Map();
  render(reader) {
    if (!this.modelAttached.read(reader)) {
      return;
    }
    this.domNodeSizeChanged.read(reader);
    this.editorOnDidChangeViewZones.read(reader);
    this.editorOnDidContentSizeChange.read(reader);
    const scrollTop = this.scrollTop.read(reader);
    const visibleRanges = this._editor.getVisibleRanges();
    const unusedIds = new Set(this.views.keys());
    const viewRange = OffsetRange.ofStartAndLength(0, this._domNode.clientHeight);
    if (!viewRange.isEmpty) {
      for (const visibleRange of visibleRanges) {
        const visibleRange2 = new LineRange(
          visibleRange.startLineNumber,
          visibleRange.endLineNumber + 1
        );
        const gutterItems = this.itemProvider.getIntersectingGutterItems(
          visibleRange2,
          reader
        );
        transaction((tx) => {
          for (const gutterItem of gutterItems) {
            if (!gutterItem.range.intersect(visibleRange2)) {
              continue;
            }
            unusedIds.delete(gutterItem.id);
            let view = this.views.get(gutterItem.id);
            if (!view) {
              const viewDomNode = document.createElement("div");
              this._domNode.appendChild(viewDomNode);
              const gutterItemObs = observableValue("item", gutterItem);
              const itemView = this.itemProvider.createView(
                gutterItemObs,
                viewDomNode
              );
              view = new ManagedGutterItemView(gutterItemObs, itemView, viewDomNode);
              this.views.set(gutterItem.id, view);
            } else {
              view.item.set(gutterItem, tx);
            }
            const top = gutterItem.range.startLineNumber <= this._editor.getModel().getLineCount() ? this._editor.getTopForLineNumber(gutterItem.range.startLineNumber, true) - scrollTop : this._editor.getBottomForLineNumber(gutterItem.range.startLineNumber - 1, false) - scrollTop;
            const bottom = gutterItem.range.endLineNumberExclusive === 1 ? Math.max(top, this._editor.getTopForLineNumber(gutterItem.range.startLineNumber, false) - scrollTop) : Math.max(top, this._editor.getBottomForLineNumber(gutterItem.range.endLineNumberExclusive - 1, true) - scrollTop);
            const height = bottom - top;
            view.domNode.style.top = `${top}px`;
            view.domNode.style.height = `${height}px`;
            view.gutterItemView.layout(OffsetRange.ofStartAndLength(top, height), viewRange);
          }
        });
      }
    }
    for (const id of unusedIds) {
      const view = this.views.get(id);
      view.gutterItemView.dispose();
      view.domNode.remove();
      this.views.delete(id);
    }
  }
}
class ManagedGutterItemView {
  constructor(item, gutterItemView, domNode) {
    this.item = item;
    this.gutterItemView = gutterItemView;
    this.domNode = domNode;
  }
  static {
    __name(this, "ManagedGutterItemView");
  }
}
export {
  EditorGutter
};
//# sourceMappingURL=editorGutter.js.map
