import { CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { ResourceMap } from "../../../../base/common/map.js";
import { IObservable, ITransaction } from "../../../../base/common/observable.js";
import { URI } from "../../../../base/common/uri.js";
import { IDocumentDiff } from "../../../../editor/common/diff/documentDiffProvider.js";
import { TextEdit } from "../../../../editor/common/languages.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { localize } from "../../../../nls.js";
import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { IChatResponseModel } from "./chatModel.js";
const IChatEditingService = createDecorator("chatEditingService");
var WorkingSetEntryState = /* @__PURE__ */ ((WorkingSetEntryState2) => {
  WorkingSetEntryState2[WorkingSetEntryState2["Modified"] = 0] = "Modified";
  WorkingSetEntryState2[WorkingSetEntryState2["Accepted"] = 1] = "Accepted";
  WorkingSetEntryState2[WorkingSetEntryState2["Rejected"] = 2] = "Rejected";
  WorkingSetEntryState2[WorkingSetEntryState2["Transient"] = 3] = "Transient";
  WorkingSetEntryState2[WorkingSetEntryState2["Attached"] = 4] = "Attached";
  WorkingSetEntryState2[WorkingSetEntryState2["Sent"] = 5] = "Sent";
  return WorkingSetEntryState2;
})(WorkingSetEntryState || {});
var ChatEditingSessionState = /* @__PURE__ */ ((ChatEditingSessionState2) => {
  ChatEditingSessionState2[ChatEditingSessionState2["Initial"] = 0] = "Initial";
  ChatEditingSessionState2[ChatEditingSessionState2["StreamingEdits"] = 1] = "StreamingEdits";
  ChatEditingSessionState2[ChatEditingSessionState2["Idle"] = 2] = "Idle";
  ChatEditingSessionState2[ChatEditingSessionState2["Disposed"] = 3] = "Disposed";
  return ChatEditingSessionState2;
})(ChatEditingSessionState || {});
const CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME = "chat-editing-multi-diff-source";
const chatEditingWidgetFileStateContextKey = new RawContextKey("chatEditingWidgetFileState", void 0, localize("chatEditingWidgetFileState", "The current state of the file in the chat editing widget"));
const decidedChatEditingResourceContextKey = new RawContextKey("decidedChatEditingResource", []);
const chatEditingResourceContextKey = new RawContextKey("chatEditingResource", void 0);
const inChatEditingSessionContextKey = new RawContextKey("inChatEditingSession", void 0);
const applyingChatEditsContextKey = new RawContextKey("isApplyingChatEdits", void 0);
const isChatRequestCheckpointed = new RawContextKey("isChatRequestCheckpointed", false);
export {
  CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME,
  ChatEditingSessionState,
  IChatEditingService,
  WorkingSetEntryState,
  applyingChatEditsContextKey,
  chatEditingResourceContextKey,
  chatEditingWidgetFileStateContextKey,
  decidedChatEditingResourceContextKey,
  inChatEditingSessionContextKey,
  isChatRequestCheckpointed
};
//# sourceMappingURL=chatEditingService.js.map
