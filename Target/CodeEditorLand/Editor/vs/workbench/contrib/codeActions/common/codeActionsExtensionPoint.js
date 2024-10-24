var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as nls from "../../../../nls.js";
import { IConfigurationPropertySchema } from "../../../../platform/configuration/common/configurationRegistry.js";
import { languagesExtPoint } from "../../../services/language/common/languageService.js";
import { Extensions as ExtensionFeaturesExtensions, IExtensionFeatureTableRenderer, IExtensionFeaturesRegistry, IRenderedData, IRowData, ITableData } from "../../../services/extensionManagement/common/extensionFeatures.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { IExtensionManifest } from "../../../../platform/extensions/common/extensions.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { MarkdownString } from "../../../../base/common/htmlContent.js";
var CodeActionExtensionPointFields = /* @__PURE__ */ ((CodeActionExtensionPointFields2) => {
  CodeActionExtensionPointFields2["languages"] = "languages";
  CodeActionExtensionPointFields2["actions"] = "actions";
  CodeActionExtensionPointFields2["kind"] = "kind";
  CodeActionExtensionPointFields2["title"] = "title";
  CodeActionExtensionPointFields2["description"] = "description";
  return CodeActionExtensionPointFields2;
})(CodeActionExtensionPointFields || {});
const codeActionsExtensionPointSchema = Object.freeze({
  type: "array",
  markdownDescription: nls.localize("contributes.codeActions", "Configure which editor to use for a resource."),
  items: {
    type: "object",
    required: ["languages" /* languages */, "actions" /* actions */],
    properties: {
      ["languages" /* languages */]: {
        type: "array",
        description: nls.localize("contributes.codeActions.languages", "Language modes that the code actions are enabled for."),
        items: { type: "string" }
      },
      ["actions" /* actions */]: {
        type: "object",
        required: ["kind" /* kind */, "title" /* title */],
        properties: {
          ["kind" /* kind */]: {
            type: "string",
            markdownDescription: nls.localize("contributes.codeActions.kind", "`CodeActionKind` of the contributed code action.")
          },
          ["title" /* title */]: {
            type: "string",
            description: nls.localize("contributes.codeActions.title", "Label for the code action used in the UI.")
          },
          ["description" /* description */]: {
            type: "string",
            description: nls.localize("contributes.codeActions.description", "Description of what the code action does.")
          }
        }
      }
    }
  }
});
const codeActionsExtensionPointDescriptor = {
  extensionPoint: "codeActions",
  deps: [languagesExtPoint],
  jsonSchema: codeActionsExtensionPointSchema
};
class CodeActionsTableRenderer extends Disposable {
  static {
    __name(this, "CodeActionsTableRenderer");
  }
  type = "table";
  shouldRender(manifest) {
    return !!manifest.contributes?.codeActions;
  }
  render(manifest) {
    const codeActions = manifest.contributes?.codeActions || [];
    if (!codeActions.length) {
      return { data: { headers: [], rows: [] }, dispose: /* @__PURE__ */ __name(() => {
      }, "dispose") };
    }
    const flatActions = codeActions.map((contribution) => contribution.actions.map((action) => ({ ...action, languages: contribution.languages }))).flat();
    const headers = [
      nls.localize("codeActions.title", "Title"),
      nls.localize("codeActions.kind", "Kind"),
      nls.localize("codeActions.description", "Description"),
      nls.localize("codeActions.languages", "Languages")
    ];
    const rows = flatActions.sort((a, b) => a.title.localeCompare(b.title)).map((action) => {
      return [
        action.title,
        new MarkdownString().appendMarkdown(`\`${action.kind}\``),
        action.description ?? "",
        new MarkdownString().appendMarkdown(`${action.languages.map((lang) => `\`${lang}\``).join("&nbsp;")}`)
      ];
    });
    return {
      data: {
        headers,
        rows
      },
      dispose: /* @__PURE__ */ __name(() => {
      }, "dispose")
    };
  }
}
Registry.as(ExtensionFeaturesExtensions.ExtensionFeaturesRegistry).registerExtensionFeature({
  id: "codeActions",
  label: nls.localize("codeactions", "Code Actions"),
  access: {
    canToggle: false
  },
  renderer: new SyncDescriptor(CodeActionsTableRenderer)
});
export {
  codeActionsExtensionPointDescriptor
};
//# sourceMappingURL=codeActionsExtensionPoint.js.map
