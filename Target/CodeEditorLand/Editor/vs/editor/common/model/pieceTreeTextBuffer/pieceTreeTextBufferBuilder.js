var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CharCode } from "../../../../base/common/charCode.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import * as strings from "../../../../base/common/strings.js";
import { DefaultEndOfLine, ITextBuffer, ITextBufferBuilder, ITextBufferFactory } from "../../model.js";
import { StringBuffer, createLineStarts, createLineStartsFast } from "./pieceTreeBase.js";
import { PieceTreeTextBuffer } from "./pieceTreeTextBuffer.js";
class PieceTreeTextBufferFactory {
  constructor(_chunks, _bom, _cr, _lf, _crlf, _containsRTL, _containsUnusualLineTerminators, _isBasicASCII, _normalizeEOL) {
    this._chunks = _chunks;
    this._bom = _bom;
    this._cr = _cr;
    this._lf = _lf;
    this._crlf = _crlf;
    this._containsRTL = _containsRTL;
    this._containsUnusualLineTerminators = _containsUnusualLineTerminators;
    this._isBasicASCII = _isBasicASCII;
    this._normalizeEOL = _normalizeEOL;
  }
  static {
    __name(this, "PieceTreeTextBufferFactory");
  }
  _getEOL(defaultEOL) {
    const totalEOLCount = this._cr + this._lf + this._crlf;
    const totalCRCount = this._cr + this._crlf;
    if (totalEOLCount === 0) {
      return defaultEOL === DefaultEndOfLine.LF ? "\n" : "\r\n";
    }
    if (totalCRCount > totalEOLCount / 2) {
      return "\r\n";
    }
    return "\n";
  }
  create(defaultEOL) {
    const eol = this._getEOL(defaultEOL);
    const chunks = this._chunks;
    if (this._normalizeEOL && (eol === "\r\n" && (this._cr > 0 || this._lf > 0) || eol === "\n" && (this._cr > 0 || this._crlf > 0))) {
      for (let i = 0, len = chunks.length; i < len; i++) {
        const str = chunks[i].buffer.replace(/\r\n|\r|\n/g, eol);
        const newLineStart = createLineStartsFast(str);
        chunks[i] = new StringBuffer(str, newLineStart);
      }
    }
    const textBuffer = new PieceTreeTextBuffer(chunks, this._bom, eol, this._containsRTL, this._containsUnusualLineTerminators, this._isBasicASCII, this._normalizeEOL);
    return { textBuffer, disposable: textBuffer };
  }
  getFirstLineText(lengthLimit) {
    return this._chunks[0].buffer.substr(0, lengthLimit).split(/\r\n|\r|\n/)[0];
  }
}
class PieceTreeTextBufferBuilder {
  static {
    __name(this, "PieceTreeTextBufferBuilder");
  }
  chunks;
  BOM;
  _hasPreviousChar;
  _previousChar;
  _tmpLineStarts;
  cr;
  lf;
  crlf;
  containsRTL;
  containsUnusualLineTerminators;
  isBasicASCII;
  constructor() {
    this.chunks = [];
    this.BOM = "";
    this._hasPreviousChar = false;
    this._previousChar = 0;
    this._tmpLineStarts = [];
    this.cr = 0;
    this.lf = 0;
    this.crlf = 0;
    this.containsRTL = false;
    this.containsUnusualLineTerminators = false;
    this.isBasicASCII = true;
  }
  acceptChunk(chunk) {
    if (chunk.length === 0) {
      return;
    }
    if (this.chunks.length === 0) {
      if (strings.startsWithUTF8BOM(chunk)) {
        this.BOM = strings.UTF8_BOM_CHARACTER;
        chunk = chunk.substr(1);
      }
    }
    const lastChar = chunk.charCodeAt(chunk.length - 1);
    if (lastChar === CharCode.CarriageReturn || lastChar >= 55296 && lastChar <= 56319) {
      this._acceptChunk1(chunk.substr(0, chunk.length - 1), false);
      this._hasPreviousChar = true;
      this._previousChar = lastChar;
    } else {
      this._acceptChunk1(chunk, false);
      this._hasPreviousChar = false;
      this._previousChar = lastChar;
    }
  }
  _acceptChunk1(chunk, allowEmptyStrings) {
    if (!allowEmptyStrings && chunk.length === 0) {
      return;
    }
    if (this._hasPreviousChar) {
      this._acceptChunk2(String.fromCharCode(this._previousChar) + chunk);
    } else {
      this._acceptChunk2(chunk);
    }
  }
  _acceptChunk2(chunk) {
    const lineStarts = createLineStarts(this._tmpLineStarts, chunk);
    this.chunks.push(new StringBuffer(chunk, lineStarts.lineStarts));
    this.cr += lineStarts.cr;
    this.lf += lineStarts.lf;
    this.crlf += lineStarts.crlf;
    if (!lineStarts.isBasicASCII) {
      this.isBasicASCII = false;
      if (!this.containsRTL) {
        this.containsRTL = strings.containsRTL(chunk);
      }
      if (!this.containsUnusualLineTerminators) {
        this.containsUnusualLineTerminators = strings.containsUnusualLineTerminators(chunk);
      }
    }
  }
  finish(normalizeEOL = true) {
    this._finish();
    return new PieceTreeTextBufferFactory(
      this.chunks,
      this.BOM,
      this.cr,
      this.lf,
      this.crlf,
      this.containsRTL,
      this.containsUnusualLineTerminators,
      this.isBasicASCII,
      normalizeEOL
    );
  }
  _finish() {
    if (this.chunks.length === 0) {
      this._acceptChunk1("", true);
    }
    if (this._hasPreviousChar) {
      this._hasPreviousChar = false;
      const lastChunk = this.chunks[this.chunks.length - 1];
      lastChunk.buffer += String.fromCharCode(this._previousChar);
      const newLineStarts = createLineStartsFast(lastChunk.buffer);
      lastChunk.lineStarts = newLineStarts;
      if (this._previousChar === CharCode.CarriageReturn) {
        this.cr++;
      }
    }
  }
}
export {
  PieceTreeTextBufferBuilder
};
//# sourceMappingURL=pieceTreeTextBufferBuilder.js.map
