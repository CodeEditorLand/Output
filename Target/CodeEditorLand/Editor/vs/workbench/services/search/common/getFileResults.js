var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ITextSearchMatch, ITextSearchPreviewOptions, ITextSearchResult } from "./search.js";
import { Range } from "../../../../editor/common/core/range.js";
const getFileResults = /* @__PURE__ */ __name((bytes, pattern, options) => {
  let text;
  if (bytes[0] === 255 && bytes[1] === 254) {
    text = new TextDecoder("utf-16le").decode(bytes);
  } else if (bytes[0] === 254 && bytes[1] === 255) {
    text = new TextDecoder("utf-16be").decode(bytes);
  } else {
    text = new TextDecoder("utf8").decode(bytes);
    if (text.slice(0, 1e3).includes("\uFFFD") && bytes.includes(0)) {
      return [];
    }
  }
  const results = [];
  const patternIndecies = [];
  let patternMatch = null;
  let remainingResultQuota = options.remainingResultQuota;
  while (remainingResultQuota >= 0 && (patternMatch = pattern.exec(text))) {
    patternIndecies.push({ matchStartIndex: patternMatch.index, matchedText: patternMatch[0] });
    remainingResultQuota--;
  }
  if (patternIndecies.length) {
    const contextLinesNeeded = /* @__PURE__ */ new Set();
    const resultLines = /* @__PURE__ */ new Set();
    const lineRanges = [];
    const readLine = /* @__PURE__ */ __name((lineNumber) => text.slice(lineRanges[lineNumber].start, lineRanges[lineNumber].end), "readLine");
    let prevLineEnd = 0;
    let lineEndingMatch = null;
    const lineEndRegex = /\r?\n/g;
    while (lineEndingMatch = lineEndRegex.exec(text)) {
      lineRanges.push({ start: prevLineEnd, end: lineEndingMatch.index });
      prevLineEnd = lineEndingMatch.index + lineEndingMatch[0].length;
    }
    if (prevLineEnd < text.length) {
      lineRanges.push({ start: prevLineEnd, end: text.length });
    }
    let startLine = 0;
    for (const { matchStartIndex, matchedText } of patternIndecies) {
      if (remainingResultQuota < 0) {
        break;
      }
      while (Boolean(lineRanges[startLine + 1]) && matchStartIndex > lineRanges[startLine].end) {
        startLine++;
      }
      let endLine = startLine;
      while (Boolean(lineRanges[endLine + 1]) && matchStartIndex + matchedText.length > lineRanges[endLine].end) {
        endLine++;
      }
      if (options.surroundingContext) {
        for (let contextLine = Math.max(0, startLine - options.surroundingContext); contextLine < startLine; contextLine++) {
          contextLinesNeeded.add(contextLine);
        }
      }
      let previewText = "";
      let offset = 0;
      for (let matchLine = startLine; matchLine <= endLine; matchLine++) {
        let previewLine = readLine(matchLine);
        if (options.previewOptions?.charsPerLine && previewLine.length > options.previewOptions.charsPerLine) {
          offset = Math.max(matchStartIndex - lineRanges[startLine].start - 20, 0);
          previewLine = previewLine.substr(offset, options.previewOptions.charsPerLine);
        }
        previewText += `${previewLine}
`;
        resultLines.add(matchLine);
      }
      const fileRange = new Range(
        startLine,
        matchStartIndex - lineRanges[startLine].start,
        endLine,
        matchStartIndex + matchedText.length - lineRanges[endLine].start
      );
      const previewRange = new Range(
        0,
        matchStartIndex - lineRanges[startLine].start - offset,
        endLine - startLine,
        matchStartIndex + matchedText.length - lineRanges[endLine].start - (endLine === startLine ? offset : 0)
      );
      const match = {
        rangeLocations: [{
          source: fileRange,
          preview: previewRange
        }],
        previewText
      };
      results.push(match);
      if (options.surroundingContext) {
        for (let contextLine = endLine + 1; contextLine <= Math.min(endLine + options.surroundingContext, lineRanges.length - 1); contextLine++) {
          contextLinesNeeded.add(contextLine);
        }
      }
    }
    for (const contextLine of contextLinesNeeded) {
      if (!resultLines.has(contextLine)) {
        results.push({
          text: readLine(contextLine),
          lineNumber: contextLine + 1
        });
      }
    }
  }
  return results;
}, "getFileResults");
export {
  getFileResults
};
//# sourceMappingURL=getFileResults.js.map
