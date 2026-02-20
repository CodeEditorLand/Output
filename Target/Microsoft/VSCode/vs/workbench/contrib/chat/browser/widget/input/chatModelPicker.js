var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import * as dom from "../../../../../../base/browser/dom.js";
import { StandardKeyboardEvent } from "../../../../../../base/browser/keyboardEvent.js";
import { renderIcon, renderLabelWithIcons } from "../../../../../../base/browser/ui/iconLabel/iconLabels.js";
import { Codicon } from "../../../../../../base/common/codicons.js";
import { Emitter } from "../../../../../../base/common/event.js";
import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { localize } from "../../../../../../nls.js";
import { ActionListDropdown } from "../../../../../../platform/actionWidget/browser/actionListDropdown.js";
import { ICommandService } from "../../../../../../platform/commands/common/commands.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IOpenerService } from "../../../../../../platform/opener/common/opener.js";
import { IProductService } from "../../../../../../platform/product/common/productService.js";
import { ITelemetryService } from "../../../../../../platform/telemetry/common/telemetry.js";
import { TelemetryTrustedValue } from "../../../../../../platform/telemetry/common/telemetryUtils.js";
import { MANAGE_CHAT_COMMAND_ID } from "../../../common/constants.js";
import { ILanguageModelsService } from "../../../common/languageModels.js";
import { IChatEntitlementService, isProUser } from "../../../../../services/chat/common/chatEntitlementService.js";
import { URI } from "../../../../../../base/common/uri.js";
import * as semver from "../../../../../../base/common/semver/semver.js";
function isVersionAtLeast(current, required) {
  const currentSemver = semver.coerce(current);
  if (!currentSemver) {
    return false;
  }
  return semver.gte(currentSemver, required);
}
__name(isVersionAtLeast, "isVersionAtLeast");
const ModelPickerSection = {
  Other: "other"
};
function createModelItem(action) {
  return {
    item: action,
    kind: "action"
  };
}
__name(createModelItem, "createModelItem");
function createModelAction(model, selectedModelId, onSelect, section) {
  return {
    id: model.identifier,
    icon: model.metadata.statusIcon,
    checked: model.identifier === selectedModelId,
    description: model.metadata.multiplier ?? model.metadata.detail,
    tooltip: model.metadata.name,
    label: model.metadata.name,
    section,
    run: /* @__PURE__ */ __name(() => onSelect(model), "run")
  };
}
__name(createModelAction, "createModelAction");
function buildModelPickerItems(models, selectedModelId, recentModelIds, curatedModels, isProUser2, currentVSCodeVersion, onSelect, commandService, openerService, upgradePlanUrl) {
  const items = [];
  const allModelsMap = /* @__PURE__ */ new Map();
  for (const model of models) {
    allModelsMap.set(model.identifier, model);
  }
  const modelsByMetadataId = /* @__PURE__ */ new Map();
  for (const model of models) {
    modelsByMetadataId.set(model.metadata.id, model);
  }
  const placed = /* @__PURE__ */ new Set();
  const isAutoSelected = !selectedModelId || !allModelsMap.has(selectedModelId);
  const defaultModel = models.find((m) => Object.values(m.metadata.isDefaultForLocation).some((v) => v));
  const autoDescription = defaultModel?.metadata.multiplier ?? defaultModel?.metadata.detail;
  items.push(createModelItem({
    id: "auto",
    checked: isAutoSelected,
    tooltip: localize("chat.modelPicker.auto", "Auto"),
    label: localize("chat.modelPicker.auto", "Auto"),
    description: autoDescription,
    run: /* @__PURE__ */ __name(() => {
      if (defaultModel) {
        onSelect(defaultModel);
      }
    }, "run")
  }));
  const promotedModels = [];
  const unavailableCurated = [];
  for (const id of recentModelIds) {
    const model = allModelsMap.get(id);
    if (model && !placed.has(model.identifier) && model !== defaultModel) {
      promotedModels.push(model);
      placed.add(model.identifier);
      placed.add(model.metadata.id);
    }
  }
  for (const curated of curatedModels) {
    const model = allModelsMap.get(curated.id) ?? modelsByMetadataId.get(curated.id);
    if (model && !placed.has(model.identifier) && !placed.has(model.metadata.id)) {
      promotedModels.push(model);
      placed.add(model.identifier);
      placed.add(model.metadata.id);
    } else if (!model) {
      if (!isProUser2) {
        unavailableCurated.push({ curated, reason: "upgrade" });
      } else if (curated.minVSCodeVersion && !isVersionAtLeast(currentVSCodeVersion, curated.minVSCodeVersion)) {
        unavailableCurated.push({ curated, reason: "update" });
      } else {
        unavailableCurated.push({ curated, reason: "admin" });
      }
    }
  }
  promotedModels.sort((a, b) => a.metadata.name.localeCompare(b.metadata.name));
  if (promotedModels.length > 0 || unavailableCurated.length > 0) {
    items.push({
      kind: "separator"
    });
    for (const model of promotedModels) {
      const action = createModelAction(model, selectedModelId, onSelect);
      items.push(createModelItem(action));
    }
    for (const { curated, reason } of unavailableCurated) {
      const label = reason === "upgrade" ? localize("chat.modelPicker.upgrade", "Upgrade") : reason === "update" ? localize("chat.modelPicker.update", "Update VS Code") : localize("chat.modelPicker.adminEnable", "Contact Admin");
      const onButtonClick = reason === "upgrade" && upgradePlanUrl ? () => openerService.open(URI.parse(upgradePlanUrl)) : reason === "update" ? () => commandService.executeCommand("update.checkForUpdate") : () => {
      };
      items.push({
        item: {
          id: curated.id,
          tooltip: label,
          label: curated.id,
          disabled: true,
          descriptionButton: { label, onDidClick: onButtonClick },
          className: "unavailable-model",
          run: /* @__PURE__ */ __name(() => {
          }, "run")
        },
        kind: "action"
      });
    }
  }
  const otherModels = [];
  for (const model of models) {
    if (!placed.has(model.identifier) && !placed.has(model.metadata.id)) {
      const isDefault = Object.values(model.metadata.isDefaultForLocation).some((v) => v);
      if (isDefault) {
        continue;
      }
      otherModels.push(model);
    }
  }
  if (otherModels.length > 0) {
    items.push({
      kind: "separator"
    });
    items.push({
      item: {
        id: "otherModels",
        label: localize("chat.modelPicker.otherModels", "Other Models"),
        tooltip: localize("chat.modelPicker.otherModels", "Other Models"),
        section: ModelPickerSection.Other,
        isSectionToggle: true,
        run: /* @__PURE__ */ __name(() => {
        }, "run")
      },
      kind: "action"
    });
    for (const model of otherModels) {
      const action = createModelAction(model, selectedModelId, onSelect, ModelPickerSection.Other);
      items.push(createModelItem(action));
    }
    items.push({
      item: {
        id: "manageModels",
        label: localize("chat.manageModels", "Manage Models..."),
        tooltip: localize("chat.manageModels.tooltip", "Manage Language Models"),
        icon: Codicon.settingsGear,
        section: ModelPickerSection.Other,
        className: "manage-models-link",
        run: /* @__PURE__ */ __name(() => {
          commandService.executeCommand(MANAGE_CHAT_COMMAND_ID);
        }, "run")
      },
      kind: "action"
    });
  }
  return items;
}
__name(buildModelPickerItems, "buildModelPickerItems");
function getActionListDropdownOptions() {
  return {
    collapsedByDefault: /* @__PURE__ */ new Set([ModelPickerSection.Other]),
    minWidth: 300
  };
}
__name(getActionListDropdownOptions, "getActionListDropdownOptions");
let ModelPickerWidget = class ModelPickerWidget2 extends Disposable {
  static {
    __name(this, "ModelPickerWidget");
  }
  get selectedModel() {
    return this._selectedModel;
  }
  get domNode() {
    return this._domNode;
  }
  constructor(_instantiationService, _commandService, _openerService, _telemetryService, _languageModelsService, _productService, _entitlementService) {
    super();
    this._instantiationService = _instantiationService;
    this._commandService = _commandService;
    this._openerService = _openerService;
    this._telemetryService = _telemetryService;
    this._languageModelsService = _languageModelsService;
    this._productService = _productService;
    this._entitlementService = _entitlementService;
    this._onDidChangeSelection = this._register(new Emitter());
    this.onDidChangeSelection = this._onDidChangeSelection.event;
    this._models = [];
    this._dropdown = this._register(this._instantiationService.createInstance(ActionListDropdown));
  }
  setModels(models) {
    this._models = models;
    this._renderLabel();
  }
  setSelectedModel(model) {
    this._selectedModel = model;
    this._renderLabel();
  }
  setBadge(badge) {
    this._badge = badge;
    this._updateBadge();
  }
  render(container) {
    this._domNode = dom.append(container, dom.$("a.action-label"));
    this._domNode.tabIndex = 0;
    this._domNode.setAttribute("role", "button");
    this._domNode.setAttribute("aria-haspopup", "true");
    this._domNode.setAttribute("aria-expanded", "false");
    this._badgeIcon = dom.append(this._domNode, dom.$("span.model-picker-badge"));
    this._updateBadge();
    this._renderLabel();
    this._register(dom.addDisposableListener(this._domNode, dom.EventType.MOUSE_DOWN, (e) => {
      if (e.button !== 0) {
        return;
      }
      dom.EventHelper.stop(e, true);
      this.show();
    }));
    this._register(dom.addDisposableListener(this._domNode, dom.EventType.KEY_DOWN, (e) => {
      const event = new StandardKeyboardEvent(e);
      if (event.equals(
        3
        /* KeyCode.Enter */
      ) || event.equals(
        10
        /* KeyCode.Space */
      )) {
        dom.EventHelper.stop(e, true);
        this.show();
      }
    }));
  }
  show(anchor) {
    const anchorElement = anchor ?? this._domNode;
    if (!anchorElement) {
      return;
    }
    const previousModel = this._selectedModel;
    const onSelect = /* @__PURE__ */ __name((model) => {
      this._telemetryService.publicLog2("chat.modelChange", {
        fromModel: previousModel?.metadata.vendor === "copilot" ? new TelemetryTrustedValue(previousModel.identifier) : "unknown",
        toModel: model.metadata.vendor === "copilot" ? new TelemetryTrustedValue(model.identifier) : "unknown"
      });
      this._selectedModel = model;
      this._renderLabel();
      this._onDidChangeSelection.fire(model);
    }, "onSelect");
    const isPro = isProUser(this._entitlementService.entitlement);
    const curatedModels = this._languageModelsService.getCuratedModels();
    const curatedForTier = isPro ? curatedModels.paid : curatedModels.free;
    const items = buildModelPickerItems(this._models, this._selectedModel?.identifier, this._languageModelsService.getRecentlyUsedModelIds(), curatedForTier, isPro, this._productService.version, onSelect, this._commandService, this._openerService, this._productService.defaultChatAgent?.upgradePlanUrl);
    const dropdownOptions = getActionListDropdownOptions();
    const delegate = {
      onSelect: /* @__PURE__ */ __name((item) => {
        this._dropdown.hide();
        item.run();
      }, "onSelect"),
      onHide: /* @__PURE__ */ __name(() => {
        this._domNode?.setAttribute("aria-expanded", "false");
      }, "onHide")
    };
    this._domNode?.setAttribute("aria-expanded", "true");
    this._dropdown.show(items, delegate, anchorElement, dropdownOptions);
  }
  _updateBadge() {
    if (this._badgeIcon) {
      if (this._badge) {
        const icon = this._badge === "info" ? Codicon.info : Codicon.warning;
        dom.reset(this._badgeIcon, renderIcon(icon));
        this._badgeIcon.style.display = "";
        this._badgeIcon.classList.toggle("info", this._badge === "info");
        this._badgeIcon.classList.toggle("warning", this._badge === "warning");
      } else {
        this._badgeIcon.style.display = "none";
      }
    }
  }
  _renderLabel() {
    if (!this._domNode) {
      return;
    }
    const { name, statusIcon } = this._selectedModel?.metadata || {};
    const domChildren = [];
    if (statusIcon) {
      const iconElement = renderIcon(statusIcon);
      domChildren.push(iconElement);
    }
    domChildren.push(dom.$("span.chat-input-picker-label", void 0, name ?? localize("chat.modelPicker.auto", "Auto")));
    if (this._badgeIcon) {
      domChildren.push(this._badgeIcon);
    }
    domChildren.push(...renderLabelWithIcons(`$(chevron-down)`));
    dom.reset(this._domNode, ...domChildren);
    const modelName = this._selectedModel?.metadata.name ?? localize("chat.modelPicker.auto", "Auto");
    this._domNode.ariaLabel = localize("chat.modelPicker.ariaLabel", "Pick Model, {0}", modelName);
  }
};
ModelPickerWidget = __decorate([
  __param(0, IInstantiationService),
  __param(1, ICommandService),
  __param(2, IOpenerService),
  __param(3, ITelemetryService),
  __param(4, ILanguageModelsService),
  __param(5, IProductService),
  __param(6, IChatEntitlementService)
], ModelPickerWidget);
export {
  ModelPickerWidget
};
//# sourceMappingURL=chatModelPicker.js.map
