import"../../../../base/common/cancellation.js";import"../../../../base/common/event.js";import"../../../../base/common/observable.js";import"../../../../base/common/uri.js";import"../../../../editor/common/languages.js";import"../../../../editor/common/model.js";import{localize as o}from"../../../../nls.js";import{RawContextKey as i}from"../../../../platform/contextkey/common/contextkey.js";import{createDecorator as n}from"../../../../platform/instantiation/common/instantiation.js";import"./chatModel.js";const b=n("chatEditingService");var t=(e=>(e[e.Modified=0]="Modified",e[e.Accepted=1]="Accepted",e[e.Rejected=2]="Rejected",e[e.Attached=3]="Attached",e))(t||{}),d=(e=>(e[e.Initial=0]="Initial",e[e.StreamingEdits=1]="StreamingEdits",e[e.Idle=2]="Idle",e[e.Disposed=3]="Disposed",e))(d||{});const T="chat-editing-multi-diff-source",U=new i("chatEditingWidgetFileState",void 0,o("chatEditingWidgetFileState","The current state of the file in the chat editing widget")),M=new i("decidedChatEditingResource",[]),w=new i("chatEditingResource",void 0),D=new i("inChatEditingSession",void 0),O=new i("isApplyingChatEdits",void 0);export{T as CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME,d as ChatEditingSessionState,b as IChatEditingService,t as WorkingSetEntryState,O as applyingChatEditsContextKey,w as chatEditingResourceContextKey,U as chatEditingWidgetFileStateContextKey,M as decidedChatEditingResourceContextKey,D as inChatEditingSessionContextKey};
