var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { binarySearch, isFalsyOrEmpty } from "../../../../base/common/arrays.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { EditorOption } from "../../../common/config/editorOptions.js";
import { IPosition } from "../../../common/core/position.js";
import { Range } from "../../../common/core/range.js";
import { CompletionItem, CompletionItemKind } from "../../../common/languages.js";
import { IEditorWorkerService } from "../../../common/services/editorWorker.js";
import { BracketSelectionRangeProvider } from "../../smartSelect/browser/bracketSelections.js";
class WordDistance {
  static {
    __name(this, "WordDistance");
  }
  static None = new class extends WordDistance {
    distance() {
      return 0;
    }
  }();
  static async create(service, editor) {
    if (!editor.getOption(EditorOption.suggest).localityBonus) {
      return WordDistance.None;
    }
    if (!editor.hasModel()) {
      return WordDistance.None;
    }
    const model = editor.getModel();
    const position = editor.getPosition();
    if (!service.canComputeWordRanges(model.uri)) {
      return WordDistance.None;
    }
    const [ranges] = await new BracketSelectionRangeProvider().provideSelectionRanges(model, [position]);
    if (ranges.length === 0) {
      return WordDistance.None;
    }
    const wordRanges = await service.computeWordRanges(model.uri, ranges[0].range);
    if (!wordRanges) {
      return WordDistance.None;
    }
    const wordUntilPos = model.getWordUntilPosition(position);
    delete wordRanges[wordUntilPos.word];
    return new class extends WordDistance {
      distance(anchor, item) {
        if (!position.equals(editor.getPosition())) {
          return 0;
        }
        if (item.kind === CompletionItemKind.Keyword) {
          return 2 << 20;
        }
        const word = typeof item.label === "string" ? item.label : item.label.label;
        const wordLines = wordRanges[word];
        if (isFalsyOrEmpty(wordLines)) {
          return 2 << 20;
        }
        const idx = binarySearch(wordLines, Range.fromPositions(anchor), Range.compareRangesUsingStarts);
        const bestWordRange = idx >= 0 ? wordLines[idx] : wordLines[Math.max(0, ~idx - 1)];
        let blockDistance = ranges.length;
        for (const range of ranges) {
          if (!Range.containsRange(range.range, bestWordRange)) {
            break;
          }
          blockDistance -= 1;
        }
        return blockDistance;
      }
    }();
  }
}
export {
  WordDistance
};
//# sourceMappingURL=wordDistance.js.map
