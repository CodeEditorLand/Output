var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Dimension } from "../../dom.js";
import { Orientation, OrthogonalEdge, Sash, SashState } from "../sash/sash.js";
import { Emitter, Event } from "../../../common/event.js";
import { DisposableStore } from "../../../common/lifecycle.js";
class ResizableHTMLElement {
  static {
    __name(this, "ResizableHTMLElement");
  }
  domNode;
  _onDidWillResize = new Emitter();
  onDidWillResize = this._onDidWillResize.event;
  _onDidResize = new Emitter();
  onDidResize = this._onDidResize.event;
  _northSash;
  _eastSash;
  _southSash;
  _westSash;
  _sashListener = new DisposableStore();
  _size = new Dimension(0, 0);
  _minSize = new Dimension(0, 0);
  _maxSize = new Dimension(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  _preferredSize;
  constructor() {
    this.domNode = document.createElement("div");
    this._eastSash = new Sash(this.domNode, { getVerticalSashLeft: /* @__PURE__ */ __name(() => this._size.width, "getVerticalSashLeft") }, { orientation: Orientation.VERTICAL });
    this._westSash = new Sash(this.domNode, { getVerticalSashLeft: /* @__PURE__ */ __name(() => 0, "getVerticalSashLeft") }, { orientation: Orientation.VERTICAL });
    this._northSash = new Sash(this.domNode, { getHorizontalSashTop: /* @__PURE__ */ __name(() => 0, "getHorizontalSashTop") }, { orientation: Orientation.HORIZONTAL, orthogonalEdge: OrthogonalEdge.North });
    this._southSash = new Sash(this.domNode, { getHorizontalSashTop: /* @__PURE__ */ __name(() => this._size.height, "getHorizontalSashTop") }, { orientation: Orientation.HORIZONTAL, orthogonalEdge: OrthogonalEdge.South });
    this._northSash.orthogonalStartSash = this._westSash;
    this._northSash.orthogonalEndSash = this._eastSash;
    this._southSash.orthogonalStartSash = this._westSash;
    this._southSash.orthogonalEndSash = this._eastSash;
    let currentSize;
    let deltaY = 0;
    let deltaX = 0;
    this._sashListener.add(Event.any(this._northSash.onDidStart, this._eastSash.onDidStart, this._southSash.onDidStart, this._westSash.onDidStart)(() => {
      if (currentSize === void 0) {
        this._onDidWillResize.fire();
        currentSize = this._size;
        deltaY = 0;
        deltaX = 0;
      }
    }));
    this._sashListener.add(Event.any(this._northSash.onDidEnd, this._eastSash.onDidEnd, this._southSash.onDidEnd, this._westSash.onDidEnd)(() => {
      if (currentSize !== void 0) {
        currentSize = void 0;
        deltaY = 0;
        deltaX = 0;
        this._onDidResize.fire({ dimension: this._size, done: true });
      }
    }));
    this._sashListener.add(this._eastSash.onDidChange((e) => {
      if (currentSize) {
        deltaX = e.currentX - e.startX;
        this.layout(currentSize.height + deltaY, currentSize.width + deltaX);
        this._onDidResize.fire({ dimension: this._size, done: false, east: true });
      }
    }));
    this._sashListener.add(this._westSash.onDidChange((e) => {
      if (currentSize) {
        deltaX = -(e.currentX - e.startX);
        this.layout(currentSize.height + deltaY, currentSize.width + deltaX);
        this._onDidResize.fire({ dimension: this._size, done: false, west: true });
      }
    }));
    this._sashListener.add(this._northSash.onDidChange((e) => {
      if (currentSize) {
        deltaY = -(e.currentY - e.startY);
        this.layout(currentSize.height + deltaY, currentSize.width + deltaX);
        this._onDidResize.fire({ dimension: this._size, done: false, north: true });
      }
    }));
    this._sashListener.add(this._southSash.onDidChange((e) => {
      if (currentSize) {
        deltaY = e.currentY - e.startY;
        this.layout(currentSize.height + deltaY, currentSize.width + deltaX);
        this._onDidResize.fire({ dimension: this._size, done: false, south: true });
      }
    }));
    this._sashListener.add(Event.any(this._eastSash.onDidReset, this._westSash.onDidReset)((e) => {
      if (this._preferredSize) {
        this.layout(this._size.height, this._preferredSize.width);
        this._onDidResize.fire({ dimension: this._size, done: true });
      }
    }));
    this._sashListener.add(Event.any(this._northSash.onDidReset, this._southSash.onDidReset)((e) => {
      if (this._preferredSize) {
        this.layout(this._preferredSize.height, this._size.width);
        this._onDidResize.fire({ dimension: this._size, done: true });
      }
    }));
  }
  dispose() {
    this._northSash.dispose();
    this._southSash.dispose();
    this._eastSash.dispose();
    this._westSash.dispose();
    this._sashListener.dispose();
    this._onDidResize.dispose();
    this._onDidWillResize.dispose();
    this.domNode.remove();
  }
  enableSashes(north, east, south, west) {
    this._northSash.state = north ? SashState.Enabled : SashState.Disabled;
    this._eastSash.state = east ? SashState.Enabled : SashState.Disabled;
    this._southSash.state = south ? SashState.Enabled : SashState.Disabled;
    this._westSash.state = west ? SashState.Enabled : SashState.Disabled;
  }
  layout(height = this.size.height, width = this.size.width) {
    const { height: minHeight, width: minWidth } = this._minSize;
    const { height: maxHeight, width: maxWidth } = this._maxSize;
    height = Math.max(minHeight, Math.min(maxHeight, height));
    width = Math.max(minWidth, Math.min(maxWidth, width));
    const newSize = new Dimension(width, height);
    if (!Dimension.equals(newSize, this._size)) {
      this.domNode.style.height = height + "px";
      this.domNode.style.width = width + "px";
      this._size = newSize;
      this._northSash.layout();
      this._eastSash.layout();
      this._southSash.layout();
      this._westSash.layout();
    }
  }
  clearSashHoverState() {
    this._eastSash.clearSashHoverState();
    this._westSash.clearSashHoverState();
    this._northSash.clearSashHoverState();
    this._southSash.clearSashHoverState();
  }
  get size() {
    return this._size;
  }
  set maxSize(value) {
    this._maxSize = value;
  }
  get maxSize() {
    return this._maxSize;
  }
  set minSize(value) {
    this._minSize = value;
  }
  get minSize() {
    return this._minSize;
  }
  set preferredSize(value) {
    this._preferredSize = value;
  }
  get preferredSize() {
    return this._preferredSize;
  }
}
export {
  ResizableHTMLElement
};
//# sourceMappingURL=resizable.js.map
