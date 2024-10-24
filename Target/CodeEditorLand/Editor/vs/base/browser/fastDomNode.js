var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class FastDomNode {
  constructor(domNode) {
    this.domNode = domNode;
  }
  static {
    __name(this, "FastDomNode");
  }
  _maxWidth = "";
  _width = "";
  _height = "";
  _top = "";
  _left = "";
  _bottom = "";
  _right = "";
  _paddingTop = "";
  _paddingLeft = "";
  _paddingBottom = "";
  _paddingRight = "";
  _fontFamily = "";
  _fontWeight = "";
  _fontSize = "";
  _fontStyle = "";
  _fontFeatureSettings = "";
  _fontVariationSettings = "";
  _textDecoration = "";
  _lineHeight = "";
  _letterSpacing = "";
  _className = "";
  _display = "";
  _position = "";
  _visibility = "";
  _color = "";
  _backgroundColor = "";
  _layerHint = false;
  _contain = "none";
  _boxShadow = "";
  setMaxWidth(_maxWidth) {
    const maxWidth = numberAsPixels(_maxWidth);
    if (this._maxWidth === maxWidth) {
      return;
    }
    this._maxWidth = maxWidth;
    this.domNode.style.maxWidth = this._maxWidth;
  }
  setWidth(_width) {
    const width = numberAsPixels(_width);
    if (this._width === width) {
      return;
    }
    this._width = width;
    this.domNode.style.width = this._width;
  }
  setHeight(_height) {
    const height = numberAsPixels(_height);
    if (this._height === height) {
      return;
    }
    this._height = height;
    this.domNode.style.height = this._height;
  }
  setTop(_top) {
    const top = numberAsPixels(_top);
    if (this._top === top) {
      return;
    }
    this._top = top;
    this.domNode.style.top = this._top;
  }
  setLeft(_left) {
    const left = numberAsPixels(_left);
    if (this._left === left) {
      return;
    }
    this._left = left;
    this.domNode.style.left = this._left;
  }
  setBottom(_bottom) {
    const bottom = numberAsPixels(_bottom);
    if (this._bottom === bottom) {
      return;
    }
    this._bottom = bottom;
    this.domNode.style.bottom = this._bottom;
  }
  setRight(_right) {
    const right = numberAsPixels(_right);
    if (this._right === right) {
      return;
    }
    this._right = right;
    this.domNode.style.right = this._right;
  }
  setPaddingTop(_paddingTop) {
    const paddingTop = numberAsPixels(_paddingTop);
    if (this._paddingTop === paddingTop) {
      return;
    }
    this._paddingTop = paddingTop;
    this.domNode.style.paddingTop = this._paddingTop;
  }
  setPaddingLeft(_paddingLeft) {
    const paddingLeft = numberAsPixels(_paddingLeft);
    if (this._paddingLeft === paddingLeft) {
      return;
    }
    this._paddingLeft = paddingLeft;
    this.domNode.style.paddingLeft = this._paddingLeft;
  }
  setPaddingBottom(_paddingBottom) {
    const paddingBottom = numberAsPixels(_paddingBottom);
    if (this._paddingBottom === paddingBottom) {
      return;
    }
    this._paddingBottom = paddingBottom;
    this.domNode.style.paddingBottom = this._paddingBottom;
  }
  setPaddingRight(_paddingRight) {
    const paddingRight = numberAsPixels(_paddingRight);
    if (this._paddingRight === paddingRight) {
      return;
    }
    this._paddingRight = paddingRight;
    this.domNode.style.paddingRight = this._paddingRight;
  }
  setFontFamily(fontFamily) {
    if (this._fontFamily === fontFamily) {
      return;
    }
    this._fontFamily = fontFamily;
    this.domNode.style.fontFamily = this._fontFamily;
  }
  setFontWeight(fontWeight) {
    if (this._fontWeight === fontWeight) {
      return;
    }
    this._fontWeight = fontWeight;
    this.domNode.style.fontWeight = this._fontWeight;
  }
  setFontSize(_fontSize) {
    const fontSize = numberAsPixels(_fontSize);
    if (this._fontSize === fontSize) {
      return;
    }
    this._fontSize = fontSize;
    this.domNode.style.fontSize = this._fontSize;
  }
  setFontStyle(fontStyle) {
    if (this._fontStyle === fontStyle) {
      return;
    }
    this._fontStyle = fontStyle;
    this.domNode.style.fontStyle = this._fontStyle;
  }
  setFontFeatureSettings(fontFeatureSettings) {
    if (this._fontFeatureSettings === fontFeatureSettings) {
      return;
    }
    this._fontFeatureSettings = fontFeatureSettings;
    this.domNode.style.fontFeatureSettings = this._fontFeatureSettings;
  }
  setFontVariationSettings(fontVariationSettings) {
    if (this._fontVariationSettings === fontVariationSettings) {
      return;
    }
    this._fontVariationSettings = fontVariationSettings;
    this.domNode.style.fontVariationSettings = this._fontVariationSettings;
  }
  setTextDecoration(textDecoration) {
    if (this._textDecoration === textDecoration) {
      return;
    }
    this._textDecoration = textDecoration;
    this.domNode.style.textDecoration = this._textDecoration;
  }
  setLineHeight(_lineHeight) {
    const lineHeight = numberAsPixels(_lineHeight);
    if (this._lineHeight === lineHeight) {
      return;
    }
    this._lineHeight = lineHeight;
    this.domNode.style.lineHeight = this._lineHeight;
  }
  setLetterSpacing(_letterSpacing) {
    const letterSpacing = numberAsPixels(_letterSpacing);
    if (this._letterSpacing === letterSpacing) {
      return;
    }
    this._letterSpacing = letterSpacing;
    this.domNode.style.letterSpacing = this._letterSpacing;
  }
  setClassName(className) {
    if (this._className === className) {
      return;
    }
    this._className = className;
    this.domNode.className = this._className;
  }
  toggleClassName(className, shouldHaveIt) {
    this.domNode.classList.toggle(className, shouldHaveIt);
    this._className = this.domNode.className;
  }
  setDisplay(display) {
    if (this._display === display) {
      return;
    }
    this._display = display;
    this.domNode.style.display = this._display;
  }
  setPosition(position) {
    if (this._position === position) {
      return;
    }
    this._position = position;
    this.domNode.style.position = this._position;
  }
  setVisibility(visibility) {
    if (this._visibility === visibility) {
      return;
    }
    this._visibility = visibility;
    this.domNode.style.visibility = this._visibility;
  }
  setColor(color) {
    if (this._color === color) {
      return;
    }
    this._color = color;
    this.domNode.style.color = this._color;
  }
  setBackgroundColor(backgroundColor) {
    if (this._backgroundColor === backgroundColor) {
      return;
    }
    this._backgroundColor = backgroundColor;
    this.domNode.style.backgroundColor = this._backgroundColor;
  }
  setLayerHinting(layerHint) {
    if (this._layerHint === layerHint) {
      return;
    }
    this._layerHint = layerHint;
    this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "";
  }
  setBoxShadow(boxShadow) {
    if (this._boxShadow === boxShadow) {
      return;
    }
    this._boxShadow = boxShadow;
    this.domNode.style.boxShadow = boxShadow;
  }
  setContain(contain) {
    if (this._contain === contain) {
      return;
    }
    this._contain = contain;
    this.domNode.style.contain = this._contain;
  }
  setAttribute(name, value) {
    this.domNode.setAttribute(name, value);
  }
  removeAttribute(name) {
    this.domNode.removeAttribute(name);
  }
  appendChild(child) {
    this.domNode.appendChild(child.domNode);
  }
  removeChild(child) {
    this.domNode.removeChild(child.domNode);
  }
}
function numberAsPixels(value) {
  return typeof value === "number" ? `${value}px` : value;
}
__name(numberAsPixels, "numberAsPixels");
function createFastDomNode(domNode) {
  return new FastDomNode(domNode);
}
__name(createFastDomNode, "createFastDomNode");
export {
  FastDomNode,
  createFastDomNode
};
//# sourceMappingURL=fastDomNode.js.map
