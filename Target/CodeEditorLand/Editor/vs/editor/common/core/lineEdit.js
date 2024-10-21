var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { compareBy, groupAdjacentBy, numberComparator } from "../../../base/common/arrays.js";
import { assert, checkAdjacentItems } from "../../../base/common/assert.js";
import { splitLines } from "../../../base/common/strings.js";
import { LineRange } from "./lineRange.js";
import { OffsetEdit, SingleOffsetEdit } from "./offsetEdit.js";
import { Position } from "./position.js";
import { Range } from "./range.js";
import { AbstractText, SingleTextEdit, TextEdit } from "./textEdit.js";
class LineEdit {
  constructor(edits) {
    this.edits = edits;
    assert(checkAdjacentItems(edits, (i1, i2) => i1.lineRange.endLineNumberExclusive <= i2.lineRange.startLineNumber));
  }
  static {
    __name(this, "LineEdit");
  }
  static empty = new LineEdit([]);
  static deserialize(data) {
    return new LineEdit(data.map((e) => SingleLineEdit.deserialize(e)));
  }
  static fromEdit(edit, initialValue) {
    const textEdit = TextEdit.fromOffsetEdit(edit, initialValue);
    return LineEdit.fromTextEdit(textEdit, initialValue);
  }
  static fromTextEdit(edit, initialValue) {
    const edits = edit.edits;
    const result = [];
    const currentEdits = [];
    for (let i = 0; i < edits.length; i++) {
      const edit2 = edits[i];
      const nextEditRange = i + 1 < edits.length ? edits[i + 1] : void 0;
      currentEdits.push(edit2);
      if (nextEditRange && nextEditRange.range.startLineNumber === edit2.range.endLineNumber) {
        continue;
      }
      const singleEdit = SingleTextEdit.joinEdits(currentEdits, initialValue);
      currentEdits.length = 0;
      const singleLineEdit = SingleLineEdit.fromSingleTextEdit(singleEdit, initialValue);
      result.push(singleLineEdit);
    }
    return new LineEdit(result);
  }
  static createFromUnsorted(edits) {
    const result = edits.slice();
    result.sort(compareBy((i) => i.lineRange.startLineNumber, numberComparator));
    return new LineEdit(result);
  }
  toEdit(initialValue) {
    const edits = [];
    for (const edit of this.edits) {
      const singleEdit = edit.toSingleEdit(initialValue);
      edits.push(singleEdit);
    }
    return new OffsetEdit(edits);
  }
  toString() {
    return this.edits.map((e) => e.toString()).join(",");
  }
  serialize() {
    return this.edits.map((e) => e.serialize());
  }
  getNewLineRanges() {
    const ranges = [];
    let offset = 0;
    for (const e of this.edits) {
      ranges.push(LineRange.ofLength(e.lineRange.startLineNumber + offset, e.newLines.length));
      offset += e.newLines.length - e.lineRange.length;
    }
    return ranges;
  }
  mapLineNumber(lineNumber) {
    let lineDelta = 0;
    for (const e of this.edits) {
      if (e.lineRange.endLineNumberExclusive > lineNumber) {
        break;
      }
      lineDelta += e.newLines.length - e.lineRange.length;
    }
    return lineNumber + lineDelta;
  }
  mapLineRange(lineRange) {
    return new LineRange(
      this.mapLineNumber(lineRange.startLineNumber),
      this.mapLineNumber(lineRange.endLineNumberExclusive)
    );
  }
  rebase(base) {
    return new LineEdit(
      this.edits.map((e) => new SingleLineEdit(base.mapLineRange(e.lineRange), e.newLines))
    );
  }
  humanReadablePatch(originalLines) {
    const result = [];
    function pushLine(originalLineNumber, modifiedLineNumber, kind, content) {
      const specialChar = kind === "unmodified" ? " " : kind === "deleted" ? "-" : "+";
      if (content === void 0) {
        content = "[[[[[ WARNING: LINE DOES NOT EXIST ]]]]]";
      }
      const origLn = originalLineNumber === -1 ? "   " : originalLineNumber.toString().padStart(3, " ");
      const modLn = modifiedLineNumber === -1 ? "   " : modifiedLineNumber.toString().padStart(3, " ");
      result.push(`${specialChar} ${origLn} ${modLn} ${content}`);
    }
    __name(pushLine, "pushLine");
    function pushSeperator() {
      result.push("---");
    }
    __name(pushSeperator, "pushSeperator");
    let lineDelta = 0;
    let first = true;
    for (const edits of groupAdjacentBy(this.edits, (e1, e2) => e1.lineRange.distanceToRange(e2.lineRange) <= 5)) {
      if (!first) {
        pushSeperator();
      } else {
        first = false;
      }
      let lastLineNumber = edits[0].lineRange.startLineNumber - 2;
      for (const edit of edits) {
        for (let i = Math.max(1, lastLineNumber); i < edit.lineRange.startLineNumber; i++) {
          pushLine(i, i + lineDelta, "unmodified", originalLines[i - 1]);
        }
        const range = edit.lineRange;
        const newLines = edit.newLines;
        for (const replaceLineNumber of range.mapToLineArray((n) => n)) {
          const line = originalLines[replaceLineNumber - 1];
          pushLine(replaceLineNumber, -1, "deleted", line);
        }
        for (let i = 0; i < newLines.length; i++) {
          const line = newLines[i];
          pushLine(-1, range.startLineNumber + lineDelta + i, "added", line);
        }
        lastLineNumber = range.endLineNumberExclusive;
        lineDelta += edit.newLines.length - edit.lineRange.length;
      }
      for (let i = lastLineNumber; i <= Math.min(lastLineNumber + 2, originalLines.length); i++) {
        pushLine(i, i + lineDelta, "unmodified", originalLines[i - 1]);
      }
    }
    return result.join("\n");
  }
  apply(lines) {
    const result = [];
    let currentLineIndex = 0;
    for (const edit of this.edits) {
      while (currentLineIndex < edit.lineRange.startLineNumber - 1) {
        result.push(lines[currentLineIndex]);
        currentLineIndex++;
      }
      for (const newLine of edit.newLines) {
        result.push(newLine);
      }
      currentLineIndex = edit.lineRange.endLineNumberExclusive - 1;
    }
    while (currentLineIndex < lines.length) {
      result.push(lines[currentLineIndex]);
      currentLineIndex++;
    }
    return result;
  }
  toSingleEdit() {
  }
}
class SingleLineEdit {
  constructor(lineRange, newLines) {
    this.lineRange = lineRange;
    this.newLines = newLines;
  }
  static {
    __name(this, "SingleLineEdit");
  }
  static deserialize(e) {
    return new SingleLineEdit(
      LineRange.ofLength(e[0], e[1] - e[0]),
      e[2]
    );
  }
  static fromSingleTextEdit(edit, initialValue) {
    const newLines = splitLines(edit.text);
    let startLineNumber = edit.range.startLineNumber;
    const survivingFirstLineText = initialValue.getValueOfRange(Range.fromPositions(
      new Position(edit.range.startLineNumber, 1),
      edit.range.getStartPosition()
    ));
    newLines[0] = survivingFirstLineText + newLines[0];
    let endLineNumberEx = edit.range.endLineNumber + 1;
    const editEndLineNumberMaxColumn = initialValue.getTransformer().getLineLength(edit.range.endLineNumber) + 1;
    const survivingEndLineText = initialValue.getValueOfRange(Range.fromPositions(
      edit.range.getEndPosition(),
      new Position(edit.range.endLineNumber, editEndLineNumberMaxColumn)
    ));
    newLines[newLines.length - 1] = newLines[newLines.length - 1] + survivingEndLineText;
    const startBeforeNewLine = edit.range.startColumn === initialValue.getTransformer().getLineLength(edit.range.startLineNumber) + 1;
    const endAfterNewLine = edit.range.endColumn === 1;
    if (startBeforeNewLine && newLines[0].length === survivingFirstLineText.length) {
      startLineNumber++;
      newLines.shift();
    }
    if (newLines.length > 0 && startLineNumber < endLineNumberEx && endAfterNewLine && newLines[newLines.length - 1].length === survivingEndLineText.length) {
      endLineNumberEx--;
      newLines.pop();
    }
    return new SingleLineEdit(new LineRange(startLineNumber, endLineNumberEx), newLines);
  }
  toSingleTextEdit(initialValue) {
    if (this.newLines.length === 0) {
      const textLen = initialValue.getTransformer().textLength;
      if (this.lineRange.endLineNumberExclusive === textLen.lineCount + 2) {
        let startPos;
        if (this.lineRange.startLineNumber > 1) {
          const startLineNumber = this.lineRange.startLineNumber - 1;
          const startColumn = initialValue.getTransformer().getLineLength(startLineNumber) + 1;
          startPos = new Position(startLineNumber, startColumn);
        } else {
          startPos = new Position(1, 1);
        }
        const lastPosition = textLen.addToPosition(new Position(1, 1));
        return new SingleTextEdit(Range.fromPositions(startPos, lastPosition), "");
      } else {
        return new SingleTextEdit(new Range(this.lineRange.startLineNumber, 1, this.lineRange.endLineNumberExclusive, 1), "");
      }
    } else if (this.lineRange.isEmpty) {
      let endLineNumber;
      let column;
      let text;
      const insertionLine = this.lineRange.startLineNumber;
      if (insertionLine === initialValue.getTransformer().textLength.lineCount + 2) {
        endLineNumber = insertionLine - 1;
        column = initialValue.getTransformer().getLineLength(endLineNumber) + 1;
        text = this.newLines.map((l) => "\n" + l).join("");
      } else {
        endLineNumber = insertionLine;
        column = 1;
        text = this.newLines.map((l) => l + "\n").join("");
      }
      return new SingleTextEdit(Range.fromPositions(new Position(endLineNumber, column)), text);
    } else {
      const endLineNumber = this.lineRange.endLineNumberExclusive - 1;
      const endLineNumberMaxColumn = initialValue.getTransformer().getLineLength(endLineNumber) + 1;
      const range = new Range(
        this.lineRange.startLineNumber,
        1,
        endLineNumber,
        endLineNumberMaxColumn
      );
      const text = this.newLines.join("\n");
      return new SingleTextEdit(range, text);
    }
  }
  toSingleEdit(initialValue) {
    const textEdit = this.toSingleTextEdit(initialValue);
    const range = initialValue.getTransformer().getOffsetRange(textEdit.range);
    return new SingleOffsetEdit(range, textEdit.text);
  }
  toString() {
    return `${this.lineRange}->${JSON.stringify(this.newLines)}`;
  }
  serialize() {
    return [
      this.lineRange.startLineNumber,
      this.lineRange.endLineNumberExclusive,
      this.newLines
    ];
  }
  removeCommonSuffixPrefixLines(initialValue) {
    let startLineNumber = this.lineRange.startLineNumber;
    let endLineNumberEx = this.lineRange.endLineNumberExclusive;
    let trimStartCount = 0;
    while (startLineNumber < endLineNumberEx && trimStartCount < this.newLines.length && this.newLines[trimStartCount] === initialValue.getLineAt(startLineNumber)) {
      startLineNumber++;
      trimStartCount++;
    }
    let trimEndCount = 0;
    while (startLineNumber < endLineNumberEx && trimEndCount + trimStartCount < this.newLines.length && this.newLines[this.newLines.length - 1 - trimEndCount] === initialValue.getLineAt(endLineNumberEx - 1)) {
      endLineNumberEx--;
      trimEndCount++;
    }
    if (trimStartCount === 0 && trimEndCount === 0) {
      return this;
    }
    return new SingleLineEdit(new LineRange(startLineNumber, endLineNumberEx), this.newLines.slice(trimStartCount, this.newLines.length - trimEndCount));
  }
  toLineEdit() {
    return new LineEdit([this]);
  }
}
export {
  LineEdit,
  SingleLineEdit
};
//# sourceMappingURL=lineEdit.js.map
