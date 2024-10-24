var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { createScanner, ScanError, SyntaxKind } from "./json.js";
function format(documentText, range, options) {
  let initialIndentLevel;
  let formatText;
  let formatTextStart;
  let rangeStart;
  let rangeEnd;
  if (range) {
    rangeStart = range.offset;
    rangeEnd = rangeStart + range.length;
    formatTextStart = rangeStart;
    while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
      formatTextStart--;
    }
    let endOffset = rangeEnd;
    while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
      endOffset++;
    }
    formatText = documentText.substring(formatTextStart, endOffset);
    initialIndentLevel = computeIndentLevel(formatText, options);
  } else {
    formatText = documentText;
    initialIndentLevel = 0;
    formatTextStart = 0;
    rangeStart = 0;
    rangeEnd = documentText.length;
  }
  const eol = getEOL(options, documentText);
  let lineBreak = false;
  let indentLevel = 0;
  let indentValue;
  if (options.insertSpaces) {
    indentValue = repeat(" ", options.tabSize || 4);
  } else {
    indentValue = "	";
  }
  const scanner = createScanner(formatText, false);
  let hasError = false;
  function newLineAndIndent() {
    return eol + repeat(indentValue, initialIndentLevel + indentLevel);
  }
  __name(newLineAndIndent, "newLineAndIndent");
  function scanNext() {
    let token = scanner.scan();
    lineBreak = false;
    while (token === SyntaxKind.Trivia || token === SyntaxKind.LineBreakTrivia) {
      lineBreak = lineBreak || token === SyntaxKind.LineBreakTrivia;
      token = scanner.scan();
    }
    hasError = token === SyntaxKind.Unknown || scanner.getTokenError() !== ScanError.None;
    return token;
  }
  __name(scanNext, "scanNext");
  const editOperations = [];
  function addEdit(text, startOffset, endOffset) {
    if (!hasError && startOffset < rangeEnd && endOffset > rangeStart && documentText.substring(startOffset, endOffset) !== text) {
      editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
    }
  }
  __name(addEdit, "addEdit");
  let firstToken = scanNext();
  if (firstToken !== SyntaxKind.EOF) {
    const firstTokenStart = scanner.getTokenOffset() + formatTextStart;
    const initialIndent = repeat(indentValue, initialIndentLevel);
    addEdit(initialIndent, formatTextStart, firstTokenStart);
  }
  while (firstToken !== SyntaxKind.EOF) {
    let firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
    let secondToken = scanNext();
    let replaceContent = "";
    while (!lineBreak && (secondToken === SyntaxKind.LineCommentTrivia || secondToken === SyntaxKind.BlockCommentTrivia)) {
      const commentTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(" ", firstTokenEnd, commentTokenStart);
      firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
      replaceContent = secondToken === SyntaxKind.LineCommentTrivia ? newLineAndIndent() : "";
      secondToken = scanNext();
    }
    if (secondToken === SyntaxKind.CloseBraceToken) {
      if (firstToken !== SyntaxKind.OpenBraceToken) {
        indentLevel--;
        replaceContent = newLineAndIndent();
      }
    } else if (secondToken === SyntaxKind.CloseBracketToken) {
      if (firstToken !== SyntaxKind.OpenBracketToken) {
        indentLevel--;
        replaceContent = newLineAndIndent();
      }
    } else {
      switch (firstToken) {
        case SyntaxKind.OpenBracketToken:
        case SyntaxKind.OpenBraceToken:
          indentLevel++;
          replaceContent = newLineAndIndent();
          break;
        case SyntaxKind.CommaToken:
        case SyntaxKind.LineCommentTrivia:
          replaceContent = newLineAndIndent();
          break;
        case SyntaxKind.BlockCommentTrivia:
          if (lineBreak) {
            replaceContent = newLineAndIndent();
          } else {
            replaceContent = " ";
          }
          break;
        case SyntaxKind.ColonToken:
          replaceContent = " ";
          break;
        case SyntaxKind.StringLiteral:
          if (secondToken === SyntaxKind.ColonToken) {
            replaceContent = "";
            break;
          }
        // fall through
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.CloseBraceToken:
        case SyntaxKind.CloseBracketToken:
          if (secondToken === SyntaxKind.LineCommentTrivia || secondToken === SyntaxKind.BlockCommentTrivia) {
            replaceContent = " ";
          } else if (secondToken !== SyntaxKind.CommaToken && secondToken !== SyntaxKind.EOF) {
            hasError = true;
          }
          break;
        case SyntaxKind.Unknown:
          hasError = true;
          break;
      }
      if (lineBreak && (secondToken === SyntaxKind.LineCommentTrivia || secondToken === SyntaxKind.BlockCommentTrivia)) {
        replaceContent = newLineAndIndent();
      }
    }
    const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
    addEdit(replaceContent, firstTokenEnd, secondTokenStart);
    firstToken = secondToken;
  }
  return editOperations;
}
__name(format, "format");
function toFormattedString(obj, options) {
  const content = JSON.stringify(obj, void 0, options.insertSpaces ? options.tabSize || 4 : "	");
  if (options.eol !== void 0) {
    return content.replace(/\r\n|\r|\n/g, options.eol);
  }
  return content;
}
__name(toFormattedString, "toFormattedString");
function repeat(s, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += s;
  }
  return result;
}
__name(repeat, "repeat");
function computeIndentLevel(content, options) {
  let i = 0;
  let nChars = 0;
  const tabSize = options.tabSize || 4;
  while (i < content.length) {
    const ch = content.charAt(i);
    if (ch === " ") {
      nChars++;
    } else if (ch === "	") {
      nChars += tabSize;
    } else {
      break;
    }
    i++;
  }
  return Math.floor(nChars / tabSize);
}
__name(computeIndentLevel, "computeIndentLevel");
function getEOL(options, text) {
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    if (ch === "\r") {
      if (i + 1 < text.length && text.charAt(i + 1) === "\n") {
        return "\r\n";
      }
      return "\r";
    } else if (ch === "\n") {
      return "\n";
    }
  }
  return options && options.eol || "\n";
}
__name(getEOL, "getEOL");
function isEOL(text, offset) {
  return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
__name(isEOL, "isEOL");
export {
  format,
  getEOL,
  isEOL,
  toFormattedString
};
//# sourceMappingURL=jsonFormatter.js.map
