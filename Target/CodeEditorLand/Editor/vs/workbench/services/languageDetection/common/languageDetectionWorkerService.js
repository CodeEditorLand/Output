import { URI } from "../../../../base/common/uri.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
const ILanguageDetectionService = createDecorator("ILanguageDetectionService");
const LanguageDetectionLanguageEventSource = "languageDetection";
const AutomaticLanguageDetectionLikelyWrongId = "automaticlanguagedetection.likelywrong";
const LanguageDetectionStatsId = "automaticlanguagedetection.stats";
export {
  AutomaticLanguageDetectionLikelyWrongId,
  ILanguageDetectionService,
  LanguageDetectionLanguageEventSource,
  LanguageDetectionStatsId
};
//# sourceMappingURL=languageDetectionWorkerService.js.map
