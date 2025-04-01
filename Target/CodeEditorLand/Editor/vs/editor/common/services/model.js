import { Event } from "../../../base/common/event.js";
import { URI } from "../../../base/common/uri.js";
import { createDecorator } from "../../../platform/instantiation/common/instantiation.js";
import {
  DocumentRangeSemanticTokensProvider,
  DocumentSemanticTokensProvider
} from "../languages.js";
import { ILanguageSelection } from "../languages/language.js";
import {
  ITextBufferFactory,
  ITextModel,
  ITextModelCreationOptions
} from "../model.js";
const IModelService = createDecorator("modelService");
export {
  IModelService
};
//# sourceMappingURL=model.js.map
