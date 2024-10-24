var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { BugIndicatingError } from "../../../../../base/common/errors.js";
import { CursorColumns } from "../../../core/cursorColumns.js";
import { BracketKind } from "../../../languages/supports/languageBracketsConfiguration.js";
import { ITextModel } from "../../../model.js";
import { Length, lengthAdd, lengthGetLineCount, lengthToObj, lengthZero } from "./length.js";
import { SmallImmutableSet } from "./smallImmutableSet.js";
import { OpeningBracketId } from "./tokenizer.js";
var AstNodeKind = /* @__PURE__ */ ((AstNodeKind2) => {
  AstNodeKind2[AstNodeKind2["Text"] = 0] = "Text";
  AstNodeKind2[AstNodeKind2["Bracket"] = 1] = "Bracket";
  AstNodeKind2[AstNodeKind2["Pair"] = 2] = "Pair";
  AstNodeKind2[AstNodeKind2["UnexpectedClosingBracket"] = 3] = "UnexpectedClosingBracket";
  AstNodeKind2[AstNodeKind2["List"] = 4] = "List";
  return AstNodeKind2;
})(AstNodeKind || {});
class BaseAstNode {
  static {
    __name(this, "BaseAstNode");
  }
  _length;
  /**
   * The length of the entire node, which should equal the sum of lengths of all children.
  */
  get length() {
    return this._length;
  }
  constructor(length) {
    this._length = length;
  }
}
class PairAstNode extends BaseAstNode {
  constructor(length, openingBracket, child, closingBracket, missingOpeningBracketIds) {
    super(length);
    this.openingBracket = openingBracket;
    this.child = child;
    this.closingBracket = closingBracket;
    this.missingOpeningBracketIds = missingOpeningBracketIds;
  }
  static {
    __name(this, "PairAstNode");
  }
  static create(openingBracket, child, closingBracket) {
    let length = openingBracket.length;
    if (child) {
      length = lengthAdd(length, child.length);
    }
    if (closingBracket) {
      length = lengthAdd(length, closingBracket.length);
    }
    return new PairAstNode(length, openingBracket, child, closingBracket, child ? child.missingOpeningBracketIds : SmallImmutableSet.getEmpty());
  }
  get kind() {
    return 2 /* Pair */;
  }
  get listHeight() {
    return 0;
  }
  get childrenLength() {
    return 3;
  }
  getChild(idx) {
    switch (idx) {
      case 0:
        return this.openingBracket;
      case 1:
        return this.child;
      case 2:
        return this.closingBracket;
    }
    throw new Error("Invalid child index");
  }
  /**
   * Avoid using this property, it allocates an array!
  */
  get children() {
    const result = [];
    result.push(this.openingBracket);
    if (this.child) {
      result.push(this.child);
    }
    if (this.closingBracket) {
      result.push(this.closingBracket);
    }
    return result;
  }
  canBeReused(openBracketIds) {
    if (this.closingBracket === null) {
      return false;
    }
    if (openBracketIds.intersects(this.missingOpeningBracketIds)) {
      return false;
    }
    return true;
  }
  flattenLists() {
    return PairAstNode.create(
      this.openingBracket.flattenLists(),
      this.child && this.child.flattenLists(),
      this.closingBracket && this.closingBracket.flattenLists()
    );
  }
  deepClone() {
    return new PairAstNode(
      this.length,
      this.openingBracket.deepClone(),
      this.child && this.child.deepClone(),
      this.closingBracket && this.closingBracket.deepClone(),
      this.missingOpeningBracketIds
    );
  }
  computeMinIndentation(offset, textModel) {
    return this.child ? this.child.computeMinIndentation(lengthAdd(offset, this.openingBracket.length), textModel) : Number.MAX_SAFE_INTEGER;
  }
}
class ListAstNode extends BaseAstNode {
  /**
   * Use ListAstNode.create.
  */
  constructor(length, listHeight, _missingOpeningBracketIds) {
    super(length);
    this.listHeight = listHeight;
    this._missingOpeningBracketIds = _missingOpeningBracketIds;
  }
  static {
    __name(this, "ListAstNode");
  }
  /**
   * This method uses more memory-efficient list nodes that can only store 2 or 3 children.
  */
  static create23(item1, item2, item3, immutable = false) {
    let length = item1.length;
    let missingBracketIds = item1.missingOpeningBracketIds;
    if (item1.listHeight !== item2.listHeight) {
      throw new Error("Invalid list heights");
    }
    length = lengthAdd(length, item2.length);
    missingBracketIds = missingBracketIds.merge(item2.missingOpeningBracketIds);
    if (item3) {
      if (item1.listHeight !== item3.listHeight) {
        throw new Error("Invalid list heights");
      }
      length = lengthAdd(length, item3.length);
      missingBracketIds = missingBracketIds.merge(item3.missingOpeningBracketIds);
    }
    return immutable ? new Immutable23ListAstNode(length, item1.listHeight + 1, item1, item2, item3, missingBracketIds) : new TwoThreeListAstNode(length, item1.listHeight + 1, item1, item2, item3, missingBracketIds);
  }
  static create(items, immutable = false) {
    if (items.length === 0) {
      return this.getEmpty();
    } else {
      let length = items[0].length;
      let unopenedBrackets = items[0].missingOpeningBracketIds;
      for (let i = 1; i < items.length; i++) {
        length = lengthAdd(length, items[i].length);
        unopenedBrackets = unopenedBrackets.merge(items[i].missingOpeningBracketIds);
      }
      return immutable ? new ImmutableArrayListAstNode(length, items[0].listHeight + 1, items, unopenedBrackets) : new ArrayListAstNode(length, items[0].listHeight + 1, items, unopenedBrackets);
    }
  }
  static getEmpty() {
    return new ImmutableArrayListAstNode(lengthZero, 0, [], SmallImmutableSet.getEmpty());
  }
  get kind() {
    return 4 /* List */;
  }
  get missingOpeningBracketIds() {
    return this._missingOpeningBracketIds;
  }
  cachedMinIndentation = -1;
  throwIfImmutable() {
  }
  makeLastElementMutable() {
    this.throwIfImmutable();
    const childCount = this.childrenLength;
    if (childCount === 0) {
      return void 0;
    }
    const lastChild = this.getChild(childCount - 1);
    const mutable = lastChild.kind === 4 /* List */ ? lastChild.toMutable() : lastChild;
    if (lastChild !== mutable) {
      this.setChild(childCount - 1, mutable);
    }
    return mutable;
  }
  makeFirstElementMutable() {
    this.throwIfImmutable();
    const childCount = this.childrenLength;
    if (childCount === 0) {
      return void 0;
    }
    const firstChild = this.getChild(0);
    const mutable = firstChild.kind === 4 /* List */ ? firstChild.toMutable() : firstChild;
    if (firstChild !== mutable) {
      this.setChild(0, mutable);
    }
    return mutable;
  }
  canBeReused(openBracketIds) {
    if (openBracketIds.intersects(this.missingOpeningBracketIds)) {
      return false;
    }
    if (this.childrenLength === 0) {
      return false;
    }
    let lastChild = this;
    while (lastChild.kind === 4 /* List */) {
      const lastLength = lastChild.childrenLength;
      if (lastLength === 0) {
        throw new BugIndicatingError();
      }
      lastChild = lastChild.getChild(lastLength - 1);
    }
    return lastChild.canBeReused(openBracketIds);
  }
  handleChildrenChanged() {
    this.throwIfImmutable();
    const count = this.childrenLength;
    let length = this.getChild(0).length;
    let unopenedBrackets = this.getChild(0).missingOpeningBracketIds;
    for (let i = 1; i < count; i++) {
      const child = this.getChild(i);
      length = lengthAdd(length, child.length);
      unopenedBrackets = unopenedBrackets.merge(child.missingOpeningBracketIds);
    }
    this._length = length;
    this._missingOpeningBracketIds = unopenedBrackets;
    this.cachedMinIndentation = -1;
  }
  flattenLists() {
    const items = [];
    for (const c of this.children) {
      const normalized = c.flattenLists();
      if (normalized.kind === 4 /* List */) {
        items.push(...normalized.children);
      } else {
        items.push(normalized);
      }
    }
    return ListAstNode.create(items);
  }
  computeMinIndentation(offset, textModel) {
    if (this.cachedMinIndentation !== -1) {
      return this.cachedMinIndentation;
    }
    let minIndentation = Number.MAX_SAFE_INTEGER;
    let childOffset = offset;
    for (let i = 0; i < this.childrenLength; i++) {
      const child = this.getChild(i);
      if (child) {
        minIndentation = Math.min(minIndentation, child.computeMinIndentation(childOffset, textModel));
        childOffset = lengthAdd(childOffset, child.length);
      }
    }
    this.cachedMinIndentation = minIndentation;
    return minIndentation;
  }
}
class TwoThreeListAstNode extends ListAstNode {
  constructor(length, listHeight, _item1, _item2, _item3, missingOpeningBracketIds) {
    super(length, listHeight, missingOpeningBracketIds);
    this._item1 = _item1;
    this._item2 = _item2;
    this._item3 = _item3;
  }
  static {
    __name(this, "TwoThreeListAstNode");
  }
  get childrenLength() {
    return this._item3 !== null ? 3 : 2;
  }
  getChild(idx) {
    switch (idx) {
      case 0:
        return this._item1;
      case 1:
        return this._item2;
      case 2:
        return this._item3;
    }
    throw new Error("Invalid child index");
  }
  setChild(idx, node) {
    switch (idx) {
      case 0:
        this._item1 = node;
        return;
      case 1:
        this._item2 = node;
        return;
      case 2:
        this._item3 = node;
        return;
    }
    throw new Error("Invalid child index");
  }
  get children() {
    return this._item3 ? [this._item1, this._item2, this._item3] : [this._item1, this._item2];
  }
  get item1() {
    return this._item1;
  }
  get item2() {
    return this._item2;
  }
  get item3() {
    return this._item3;
  }
  deepClone() {
    return new TwoThreeListAstNode(
      this.length,
      this.listHeight,
      this._item1.deepClone(),
      this._item2.deepClone(),
      this._item3 ? this._item3.deepClone() : null,
      this.missingOpeningBracketIds
    );
  }
  appendChildOfSameHeight(node) {
    if (this._item3) {
      throw new Error("Cannot append to a full (2,3) tree node");
    }
    this.throwIfImmutable();
    this._item3 = node;
    this.handleChildrenChanged();
  }
  unappendChild() {
    if (!this._item3) {
      throw new Error("Cannot remove from a non-full (2,3) tree node");
    }
    this.throwIfImmutable();
    const result = this._item3;
    this._item3 = null;
    this.handleChildrenChanged();
    return result;
  }
  prependChildOfSameHeight(node) {
    if (this._item3) {
      throw new Error("Cannot prepend to a full (2,3) tree node");
    }
    this.throwIfImmutable();
    this._item3 = this._item2;
    this._item2 = this._item1;
    this._item1 = node;
    this.handleChildrenChanged();
  }
  unprependChild() {
    if (!this._item3) {
      throw new Error("Cannot remove from a non-full (2,3) tree node");
    }
    this.throwIfImmutable();
    const result = this._item1;
    this._item1 = this._item2;
    this._item2 = this._item3;
    this._item3 = null;
    this.handleChildrenChanged();
    return result;
  }
  toMutable() {
    return this;
  }
}
class Immutable23ListAstNode extends TwoThreeListAstNode {
  static {
    __name(this, "Immutable23ListAstNode");
  }
  toMutable() {
    return new TwoThreeListAstNode(this.length, this.listHeight, this.item1, this.item2, this.item3, this.missingOpeningBracketIds);
  }
  throwIfImmutable() {
    throw new Error("this instance is immutable");
  }
}
class ArrayListAstNode extends ListAstNode {
  constructor(length, listHeight, _children, missingOpeningBracketIds) {
    super(length, listHeight, missingOpeningBracketIds);
    this._children = _children;
  }
  static {
    __name(this, "ArrayListAstNode");
  }
  get childrenLength() {
    return this._children.length;
  }
  getChild(idx) {
    return this._children[idx];
  }
  setChild(idx, child) {
    this._children[idx] = child;
  }
  get children() {
    return this._children;
  }
  deepClone() {
    const children = new Array(this._children.length);
    for (let i = 0; i < this._children.length; i++) {
      children[i] = this._children[i].deepClone();
    }
    return new ArrayListAstNode(this.length, this.listHeight, children, this.missingOpeningBracketIds);
  }
  appendChildOfSameHeight(node) {
    this.throwIfImmutable();
    this._children.push(node);
    this.handleChildrenChanged();
  }
  unappendChild() {
    this.throwIfImmutable();
    const item = this._children.pop();
    this.handleChildrenChanged();
    return item;
  }
  prependChildOfSameHeight(node) {
    this.throwIfImmutable();
    this._children.unshift(node);
    this.handleChildrenChanged();
  }
  unprependChild() {
    this.throwIfImmutable();
    const item = this._children.shift();
    this.handleChildrenChanged();
    return item;
  }
  toMutable() {
    return this;
  }
}
class ImmutableArrayListAstNode extends ArrayListAstNode {
  static {
    __name(this, "ImmutableArrayListAstNode");
  }
  toMutable() {
    return new ArrayListAstNode(this.length, this.listHeight, [...this.children], this.missingOpeningBracketIds);
  }
  throwIfImmutable() {
    throw new Error("this instance is immutable");
  }
}
const emptyArray = [];
class ImmutableLeafAstNode extends BaseAstNode {
  static {
    __name(this, "ImmutableLeafAstNode");
  }
  get listHeight() {
    return 0;
  }
  get childrenLength() {
    return 0;
  }
  getChild(idx) {
    return null;
  }
  get children() {
    return emptyArray;
  }
  flattenLists() {
    return this;
  }
  deepClone() {
    return this;
  }
}
class TextAstNode extends ImmutableLeafAstNode {
  static {
    __name(this, "TextAstNode");
  }
  get kind() {
    return 0 /* Text */;
  }
  get missingOpeningBracketIds() {
    return SmallImmutableSet.getEmpty();
  }
  canBeReused(_openedBracketIds) {
    return true;
  }
  computeMinIndentation(offset, textModel) {
    const start = lengthToObj(offset);
    const startLineNumber = (start.columnCount === 0 ? start.lineCount : start.lineCount + 1) + 1;
    const endLineNumber = lengthGetLineCount(lengthAdd(offset, this.length)) + 1;
    let result = Number.MAX_SAFE_INTEGER;
    for (let lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
      const firstNonWsColumn = textModel.getLineFirstNonWhitespaceColumn(lineNumber);
      const lineContent = textModel.getLineContent(lineNumber);
      if (firstNonWsColumn === 0) {
        continue;
      }
      const visibleColumn = CursorColumns.visibleColumnFromColumn(lineContent, firstNonWsColumn, textModel.getOptions().tabSize);
      result = Math.min(result, visibleColumn);
    }
    return result;
  }
}
class BracketAstNode extends ImmutableLeafAstNode {
  constructor(length, bracketInfo, bracketIds) {
    super(length);
    this.bracketInfo = bracketInfo;
    this.bracketIds = bracketIds;
  }
  static {
    __name(this, "BracketAstNode");
  }
  static create(length, bracketInfo, bracketIds) {
    const node = new BracketAstNode(length, bracketInfo, bracketIds);
    return node;
  }
  get kind() {
    return 1 /* Bracket */;
  }
  get missingOpeningBracketIds() {
    return SmallImmutableSet.getEmpty();
  }
  get text() {
    return this.bracketInfo.bracketText;
  }
  get languageId() {
    return this.bracketInfo.languageId;
  }
  canBeReused(_openedBracketIds) {
    return false;
  }
  computeMinIndentation(offset, textModel) {
    return Number.MAX_SAFE_INTEGER;
  }
}
class InvalidBracketAstNode extends ImmutableLeafAstNode {
  static {
    __name(this, "InvalidBracketAstNode");
  }
  get kind() {
    return 3 /* UnexpectedClosingBracket */;
  }
  missingOpeningBracketIds;
  constructor(closingBrackets, length) {
    super(length);
    this.missingOpeningBracketIds = closingBrackets;
  }
  canBeReused(openedBracketIds) {
    return !openedBracketIds.intersects(this.missingOpeningBracketIds);
  }
  computeMinIndentation(offset, textModel) {
    return Number.MAX_SAFE_INTEGER;
  }
}
export {
  AstNodeKind,
  BracketAstNode,
  InvalidBracketAstNode,
  ListAstNode,
  PairAstNode,
  TextAstNode
};
//# sourceMappingURL=ast.js.map
