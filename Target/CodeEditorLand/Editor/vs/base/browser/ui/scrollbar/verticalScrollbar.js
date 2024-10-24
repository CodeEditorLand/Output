var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { StandardWheelEvent } from "../../mouseEvent.js";
import { AbstractScrollbar, ISimplifiedPointerEvent, ScrollbarHost } from "./abstractScrollbar.js";
import { ScrollableElementResolvedOptions } from "./scrollableElementOptions.js";
import { ARROW_IMG_SIZE } from "./scrollbarArrow.js";
import { ScrollbarState } from "./scrollbarState.js";
import { Codicon } from "../../../common/codicons.js";
import { INewScrollPosition, Scrollable, ScrollbarVisibility, ScrollEvent } from "../../../common/scrollable.js";
class VerticalScrollbar extends AbstractScrollbar {
  static {
    __name(this, "VerticalScrollbar");
  }
  constructor(scrollable, options, host) {
    const scrollDimensions = scrollable.getScrollDimensions();
    const scrollPosition = scrollable.getCurrentScrollPosition();
    super({
      lazyRender: options.lazyRender,
      host,
      scrollbarState: new ScrollbarState(
        options.verticalHasArrows ? options.arrowSize : 0,
        options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize,
        // give priority to vertical scroll bar over horizontal and let it scroll all the way to the bottom
        0,
        scrollDimensions.height,
        scrollDimensions.scrollHeight,
        scrollPosition.scrollTop
      ),
      visibility: options.vertical,
      extraScrollbarClassName: "vertical",
      scrollable,
      scrollByPage: options.scrollByPage
    });
    if (options.verticalHasArrows) {
      const arrowDelta = (options.arrowSize - ARROW_IMG_SIZE) / 2;
      const scrollbarDelta = (options.verticalScrollbarSize - ARROW_IMG_SIZE) / 2;
      this._createArrow({
        className: "scra",
        icon: Codicon.scrollbarButtonUp,
        top: arrowDelta,
        left: scrollbarDelta,
        bottom: void 0,
        right: void 0,
        bgWidth: options.verticalScrollbarSize,
        bgHeight: options.arrowSize,
        onActivate: /* @__PURE__ */ __name(() => this._host.onMouseWheel(new StandardWheelEvent(null, 0, 1)), "onActivate")
      });
      this._createArrow({
        className: "scra",
        icon: Codicon.scrollbarButtonDown,
        top: void 0,
        left: scrollbarDelta,
        bottom: arrowDelta,
        right: void 0,
        bgWidth: options.verticalScrollbarSize,
        bgHeight: options.arrowSize,
        onActivate: /* @__PURE__ */ __name(() => this._host.onMouseWheel(new StandardWheelEvent(null, 0, -1)), "onActivate")
      });
    }
    this._createSlider(0, Math.floor((options.verticalScrollbarSize - options.verticalSliderSize) / 2), options.verticalSliderSize, void 0);
  }
  _updateSlider(sliderSize, sliderPosition) {
    this.slider.setHeight(sliderSize);
    this.slider.setTop(sliderPosition);
  }
  _renderDomNode(largeSize, smallSize) {
    this.domNode.setWidth(smallSize);
    this.domNode.setHeight(largeSize);
    this.domNode.setRight(0);
    this.domNode.setTop(0);
  }
  onDidScroll(e) {
    this._shouldRender = this._onElementScrollSize(e.scrollHeight) || this._shouldRender;
    this._shouldRender = this._onElementScrollPosition(e.scrollTop) || this._shouldRender;
    this._shouldRender = this._onElementSize(e.height) || this._shouldRender;
    return this._shouldRender;
  }
  _pointerDownRelativePosition(offsetX, offsetY) {
    return offsetY;
  }
  _sliderPointerPosition(e) {
    return e.pageY;
  }
  _sliderOrthogonalPointerPosition(e) {
    return e.pageX;
  }
  _updateScrollbarSize(size) {
    this.slider.setWidth(size);
  }
  writeScrollPosition(target, scrollPosition) {
    target.scrollTop = scrollPosition;
  }
  updateOptions(options) {
    this.updateScrollbarSize(options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize);
    this._scrollbarState.setOppositeScrollbarSize(0);
    this._visibilityController.setVisibility(options.vertical);
    this._scrollByPage = options.scrollByPage;
  }
}
export {
  VerticalScrollbar
};
//# sourceMappingURL=verticalScrollbar.js.map
