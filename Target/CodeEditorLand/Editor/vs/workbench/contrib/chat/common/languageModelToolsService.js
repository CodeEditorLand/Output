var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { IMarkdownString } from "../../../../base/common/htmlContent.js";
import { IJSONSchema } from "../../../../base/common/jsonSchema.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { ContextKeyExpression } from "../../../../platform/contextkey/common/contextkey.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
function isToolInvocationContext(obj) {
  return typeof obj === "object" && typeof obj.sessionId === "string";
}
__name(isToolInvocationContext, "isToolInvocationContext");
const ILanguageModelToolsService = createDecorator("ILanguageModelToolsService");
export {
  ILanguageModelToolsService,
  isToolInvocationContext
};
//# sourceMappingURL=languageModelToolsService.js.map
