var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { StandardWheelEvent } from "../../mouseEvent.js";
import { AbstractScrollbar, ISimplifiedPointerEvent, ScrollbarHost } from "./abstractScrollbar.js";
import { ScrollableElementResolvedOptions } from "./scrollableElementOptions.js";
import { ARROW_IMG_SIZE } from "./scrollbarArrow.js";
import { ScrollbarState } from "./scrollbarState.js";
import { Codicon } from "../../../common/codicons.js";
import { INewScrollPosition, Scrollable, ScrollbarVisibility, ScrollEvent } from "../../../common/scrollable.js";
class HorizontalScrollbar extends AbstractScrollbar {
  static {
    __name(this, "HorizontalScrollbar");
  }
  constructor(scrollable, options, host) {
    const scrollDimensions = scrollable.getScrollDimensions();
    const scrollPosition = scrollable.getCurrentScrollPosition();
    super({
      lazyRender: options.lazyRender,
      host,
      scrollbarState: new ScrollbarState(
        options.horizontalHasArrows ? options.arrowSize : 0,
        options.horizontal === ScrollbarVisibility.Hidden ? 0 : options.horizontalScrollbarSize,
        options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize,
        scrollDimensions.width,
        scrollDimensions.scrollWidth,
        scrollPosition.scrollLeft
      ),
      visibility: options.horizontal,
      extraScrollbarClassName: "horizontal",
      scrollable,
      scrollByPage: options.scrollByPage
    });
    if (options.horizontalHasArrows) {
      const arrowDelta = (options.arrowSize - ARROW_IMG_SIZE) / 2;
      const scrollbarDelta = (options.horizontalScrollbarSize - ARROW_IMG_SIZE) / 2;
      this._createArrow({
        className: "scra",
        icon: Codicon.scrollbarButtonLeft,
        top: scrollbarDelta,
        left: arrowDelta,
        bottom: void 0,
        right: void 0,
        bgWidth: options.arrowSize,
        bgHeight: options.horizontalScrollbarSize,
        onActivate: /* @__PURE__ */ __name(() => this._host.onMouseWheel(new StandardWheelEvent(null, 1, 0)), "onActivate")
      });
      this._createArrow({
        className: "scra",
        icon: Codicon.scrollbarButtonRight,
        top: scrollbarDelta,
        left: void 0,
        bottom: void 0,
        right: arrowDelta,
        bgWidth: options.arrowSize,
        bgHeight: options.horizontalScrollbarSize,
        onActivate: /* @__PURE__ */ __name(() => this._host.onMouseWheel(new StandardWheelEvent(null, -1, 0)), "onActivate")
      });
    }
    this._createSlider(Math.floor((options.horizontalScrollbarSize - options.horizontalSliderSize) / 2), 0, void 0, options.horizontalSliderSize);
  }
  _updateSlider(sliderSize, sliderPosition) {
    this.slider.setWidth(sliderSize);
    this.slider.setLeft(sliderPosition);
  }
  _renderDomNode(largeSize, smallSize) {
    this.domNode.setWidth(largeSize);
    this.domNode.setHeight(smallSize);
    this.domNode.setLeft(0);
    this.domNode.setBottom(0);
  }
  onDidScroll(e) {
    this._shouldRender = this._onElementScrollSize(e.scrollWidth) || this._shouldRender;
    this._shouldRender = this._onElementScrollPosition(e.scrollLeft) || this._shouldRender;
    this._shouldRender = this._onElementSize(e.width) || this._shouldRender;
    return this._shouldRender;
  }
  _pointerDownRelativePosition(offsetX, offsetY) {
    return offsetX;
  }
  _sliderPointerPosition(e) {
    return e.pageX;
  }
  _sliderOrthogonalPointerPosition(e) {
    return e.pageY;
  }
  _updateScrollbarSize(size) {
    this.slider.setHeight(size);
  }
  writeScrollPosition(target, scrollPosition) {
    target.scrollLeft = scrollPosition;
  }
  updateOptions(options) {
    this.updateScrollbarSize(options.horizontal === ScrollbarVisibility.Hidden ? 0 : options.horizontalScrollbarSize);
    this._scrollbarState.setOppositeScrollbarSize(options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize);
    this._visibilityController.setVisibility(options.horizontal);
    this._scrollByPage = options.scrollByPage;
  }
}
export {
  HorizontalScrollbar
};
//# sourceMappingURL=horizontalScrollbar.js.map
