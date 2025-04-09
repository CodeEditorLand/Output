var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import {
  ViewContainerLocation
} from "../../../common/views.js";
import {
  Parts
} from "../../../services/layout/browser/layoutService.js";
import { CHAT_PROVIDER_ID } from "../common/chatParticipantContribTypes.js";
const IChatWidgetService = createDecorator("chatWidgetService");
async function showChatView(viewsService) {
  return (await viewsService.openView(ChatViewId))?.widget;
}
__name(showChatView, "showChatView");
function showCopilotView(viewsService, layoutService) {
  if (layoutService.activeContainer !== layoutService.mainContainer) {
    layoutService.mainContainer.focus();
  }
  return showChatView(viewsService);
}
__name(showCopilotView, "showCopilotView");
function ensureSideBarChatViewSize(viewDescriptorService, layoutService, viewsService) {
  const location = viewDescriptorService.getViewLocationById(ChatViewId);
  if (location === ViewContainerLocation.Panel) {
    return;
  }
  const viewPart = location === ViewContainerLocation.Sidebar ? Parts.SIDEBAR_PART : Parts.AUXILIARYBAR_PART;
  const partSize = layoutService.getSize(viewPart);
  let adjustedChatWidth;
  if (partSize.width < 400 && layoutService.mainContainerDimension.width > 1200) {
    adjustedChatWidth = 400;
  } else if (partSize.width < 300) {
    adjustedChatWidth = 300;
  }
  if (typeof adjustedChatWidth === "number") {
    layoutService.setSize(viewPart, {
      width: adjustedChatWidth,
      height: partSize.height
    });
  }
}
__name(ensureSideBarChatViewSize, "ensureSideBarChatViewSize");
const IQuickChatService = createDecorator("quickChatService");
const IChatAccessibilityService = createDecorator("chatAccessibilityService");
const IChatCodeBlockContextProviderService = createDecorator(
  "chatCodeBlockContextProviderService"
);
const ChatViewId = `workbench.panel.chat.view.${CHAT_PROVIDER_ID}`;
export {
  ChatViewId,
  IChatAccessibilityService,
  IChatCodeBlockContextProviderService,
  IChatWidgetService,
  IQuickChatService,
  ensureSideBarChatViewSize,
  showChatView,
  showCopilotView
};
//# sourceMappingURL=chat.js.map
