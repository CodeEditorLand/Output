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
import { Codicon } from "../../../../base/common/codicons.js";
import { Emitter } from "../../../../base/common/event.js";
import { autorun, constObservable, derived, observableFromEvent, observableValue } from "../../../../base/common/observable.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { LineRange } from "../../../../editor/common/core/ranges/lineRange.js";
import { CodeActionController } from "../../../../editor/contrib/codeAction/browser/codeActionController.js";
import { InlineEditsGutterIndicator, InlineEditsGutterIndicatorData, InlineSuggestionGutterMenuData, SimpleInlineSuggestModel } from "../../../../editor/contrib/inlineCompletions/browser/view/inlineEdits/components/gutterIndicatorView.js";
import { InlineEditTabAction } from "../../../../editor/contrib/inlineCompletions/browser/view/inlineEdits/inlineEditsViewInterface.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IMenuService, MenuId, MenuItemAction } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUserInteractionService } from "../../../../platform/userInteraction/browser/userInteractionService.js";
let InlineChatGutterAffordance = class InlineChatGutterAffordance2 extends InlineEditsGutterIndicator {
  static {
    __name(this, "InlineChatGutterAffordance");
  }
  constructor(_myEditorObs, selection, _hover, _keybindingService, hoverService, instantiationService, accessibilityService, themeService, userInteractionService, menuService, contextKeyService) {
    const menu = menuService.createMenu(MenuId.InlineChatEditorAffordance, contextKeyService);
    const menuObs = observableFromEvent(menu.onDidChange, () => menu.getActions({ renderShortTitle: false }));
    const codeActionController = CodeActionController.get(_myEditorObs.editor);
    const lightBulbObs = codeActionController?.lightBulbState;
    const data = derived((r) => {
      const value = selection.read(r);
      if (!value) {
        return void 0;
      }
      const commandGroups = [];
      for (const [, groupActions] of menuObs.read(r)) {
        const group = [];
        for (const action of groupActions) {
          if (action instanceof MenuItemAction) {
            group.push({
              command: { id: action.item.id, title: action.label },
              icon: ThemeIcon.isThemeIcon(action.item.icon) ? action.item.icon : void 0
            });
          }
        }
        if (group.length > 0) {
          commandGroups.push(group);
        }
      }
      const cursorPosition = value.getPosition();
      const lineRange = new LineRange(cursorPosition.lineNumber, cursorPosition.lineNumber + 1);
      const gutterMenuData = new InlineSuggestionGutterMenuData(
        void 0,
        // action
        "",
        // displayName
        commandGroups,
        // extensionCommands
        void 0,
        // alternativeAction
        void 0,
        // modelInfo
        void 0,
        // setModelId
        true
      );
      const lightBulbInfo = lightBulbObs?.read(r);
      const icon = lightBulbInfo ? lightBulbInfo.icon : Codicon.sparkle;
      return new InlineEditsGutterIndicatorData(
        gutterMenuData,
        lineRange,
        new SimpleInlineSuggestModel(() => {
        }, () => this._doShowHover()),
        void 0,
        // altAction
        { icon }
      );
    });
    const focusIsInMenu = observableValue({}, false);
    super(_myEditorObs, data, constObservable(InlineEditTabAction.Inactive), constObservable(0), constObservable(false), focusIsInMenu, hoverService, instantiationService, accessibilityService, themeService, userInteractionService);
    this._myEditorObs = _myEditorObs;
    this._hover = _hover;
    this._onDidRunAction = this._store.add(new Emitter());
    this.onDidRunAction = this._onDidRunAction.event;
    this._store.add(menu);
    this._store.add(autorun((r) => {
      const element = _hover.read(r);
      this._hoverVisible.set(!!element, void 0);
    }));
    this._store.add(this.onDidCloseWithCommand((commandId) => this._onDidRunAction.fire(commandId)));
  }
  _doShowHover() {
    if (this._hoverVisible.get()) {
      return;
    }
    const iconElement = this._iconRef.element;
    if (!iconElement) {
      this._hover.set(void 0, void 0);
      return;
    }
    const selection = this._myEditorObs.cursorSelection.get();
    const direction = selection?.getDirection() ?? 0;
    const lineNumber = selection?.getPosition().lineNumber ?? 1;
    this._hover.set({ rect: iconElement.getBoundingClientRect(), above: direction === 1, lineNumber }, void 0);
  }
};
InlineChatGutterAffordance = __decorate([
  __param(3, IKeybindingService),
  __param(4, IHoverService),
  __param(5, IInstantiationService),
  __param(6, IAccessibilityService),
  __param(7, IThemeService),
  __param(8, IUserInteractionService),
  __param(9, IMenuService),
  __param(10, IContextKeyService)
], InlineChatGutterAffordance);
export {
  InlineChatGutterAffordance
};
//# sourceMappingURL=inlineChatGutterAffordance.js.map
