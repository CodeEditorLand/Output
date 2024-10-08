var z=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var B=(o,e,t,i)=>{for(var r=i>1?void 0:i?Y(e,t):e,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&z(e,t,r),r},O=(o,e)=>(t,i)=>e(t,i,o);import{toAction as j}from"../../../../../base/common/actions.js";import{coalesce as J}from"../../../../../base/common/arrays.js";import{Codicon as f}from"../../../../../base/common/codicons.js";import{fromNowByDay as Z}from"../../../../../base/common/date.js";import{KeyCode as w,KeyMod as h}from"../../../../../base/common/keyCodes.js";import{DisposableStore as L}from"../../../../../base/common/lifecycle.js";import{ThemeIcon as D}from"../../../../../base/common/themables.js";import"../../../../../editor/browser/editorBrowser.js";import{EditorAction2 as ee}from"../../../../../editor/browser/editorExtensions.js";import{Position as te}from"../../../../../editor/common/core/position.js";import{SuggestController as ie}from"../../../../../editor/contrib/suggest/browser/suggestController.js";import{localize as C,localize2 as l}from"../../../../../nls.js";import{IActionViewItemService as re}from"../../../../../platform/actions/browser/actionViewItemService.js";import{DropdownWithPrimaryActionViewItem as oe}from"../../../../../platform/actions/browser/dropdownWithPrimaryActionViewItem.js";import{Action2 as y,MenuId as v,MenuItemAction as ne,MenuRegistry as se,registerAction2 as I,SubmenuItemAction as ce}from"../../../../../platform/actions/common/actions.js";import{ContextKeyExpr as u}from"../../../../../platform/contextkey/common/contextkey.js";import{IsLinuxContext as ae,IsWindowsContext as de}from"../../../../../platform/contextkey/common/contextkeys.js";import{IInstantiationService as ue}from"../../../../../platform/instantiation/common/instantiation.js";import{KeybindingWeight as S}from"../../../../../platform/keybinding/common/keybindingsRegistry.js";import{IQuickInputService as pe}from"../../../../../platform/quickinput/common/quickInput.js";import"../../../../common/contributions.js";import{IEditorGroupsService as me}from"../../../../services/editor/common/editorGroupsService.js";import{ACTIVE_GROUP as he,IEditorService as K}from"../../../../services/editor/common/editorService.js";import{IViewsService as W}from"../../../../services/views/common/viewsService.js";import{ChatAgentLocation as F,IChatAgentService as le}from"../../common/chatAgents.js";import{CONTEXT_CHAT_ENABLED as b,CONTEXT_CHAT_INPUT_CURSOR_AT_TOP as Ce,CONTEXT_CHAT_LOCATION as Ie,CONTEXT_IN_CHAT_INPUT as x,CONTEXT_IN_CHAT_SESSION as H,CONTEXT_IN_QUICK_CHAT as P}from"../../common/chatContextKeys.js";import{extractAgentAndCommand as ge}from"../../common/chatParserTypes.js";import{IChatService as N}from"../../common/chatService.js";import{isRequestVM as fe}from"../../common/chatViewModel.js";import{IChatWidgetHistoryService as we}from"../../common/chatWidgetHistoryService.js";import{CHAT_VIEW_ID as q,IChatWidgetService as M,showChatView as ye}from"../chat.js";import"../chatEditor.js";import{ChatEditorInput as R}from"../chatEditorInput.js";import"../chatViewPane.js";import{clearChatEditor as ve}from"./chatClear.js";const A=l("chat.category","Chat"),X="workbench.action.chat.open";class V extends y{static TITLE=l("openChat","Open Chat");constructor(){super({id:X,title:V.TITLE,icon:f.commentDiscussion,f1:!0,category:A,keybinding:{weight:S.WorkbenchContrib,primary:h.CtrlCmd|h.Alt|w.KeyI,mac:{primary:h.CtrlCmd|h.WinCtrl|w.KeyI}},menu:{id:v.ChatCommandCenter,group:"a_chat",order:1}})}async run(e,t){t=typeof t=="string"?{query:t}:t;const i=e.get(N),r=await ye(e.get(W));if(r){if(t?.previousRequests?.length&&r.viewModel)for(const{request:s,response:n}of t.previousRequests)i.addCompleteRequest(r.viewModel.sessionId,s,void 0,0,{message:n});t?.query&&(t.isPartialQuery?r.setInput(t.query):r.acceptInput(t.query)),r.focusInput()}}}class Ae extends y{constructor(){super({id:"workbench.action.chat.history",title:l("chat.history.label","Show Chats..."),menu:{id:v.ViewTitle,when:u.equals("view",q),group:"navigation",order:2},category:A,icon:f.history,f1:!0,precondition:b})}async run(e){const t=e.get(N),i=e.get(pe),r=e.get(W),s=e.get(K),n=()=>{const p={iconClass:D.asClassName(f.file),tooltip:C("interactiveSession.history.editor","Open in Editor")},c={iconClass:D.asClassName(f.x),tooltip:C("interactiveSession.history.delete","Delete")},E={iconClass:D.asClassName(f.pencil),tooltip:C("chat.history.rename","Rename")},Q=()=>{const a=t.getHistory();a.sort((g,T)=>(T.lastMessageDate??0)-(g.lastMessageDate??0));let m;const U=a.flatMap(g=>{const T=Z(g.lastMessageDate,!0,!0),$=T!==m?{type:"separator",label:T}:void 0;return m=T,[$,{label:g.title,description:g.isActive?`(${C("currentChatLabel","current")})`:"",chat:g,buttons:g.isActive?[E]:[E,p,c]}]});return J(U)},k=new L,d=k.add(i.createQuickPick({useSeparators:!0}));d.placeholder=C("interactiveSession.history.pick","Switch to chat");const G=Q();d.items=G,k.add(d.onDidTriggerItemButton(async a=>{if(a.button===p){const m={target:{sessionId:a.item.chat.sessionId},pinned:!0};s.openEditor({resource:R.getNewEditorUri(),options:m},he),d.hide()}else if(a.button===c)t.removeHistoryEntry(a.item.chat.sessionId),d.items=Q();else if(a.button===E){const m=await i.input({title:C("newChatTitle","New chat title"),value:a.item.chat.title});m&&t.setChatSessionTitle(a.item.chat.sessionId,m),n()}})),k.add(d.onDidAccept(async()=>{try{const m=d.selectedItems[0].chat.sessionId;(await r.openView(q)).loadSession(m)}finally{d.hide()}})),k.add(d.onDidHide(()=>k.dispose())),d.show()};n()}}class Se extends y{constructor(){super({id:"workbench.action.openChat",title:l("interactiveSession.open","Open Editor"),f1:!0,category:A,precondition:b})}async run(e){await e.get(K).openEditor({resource:R.getNewEditorUri(),options:{pinned:!0}})}}class Ee extends y{constructor(){super({id:"workbench.action.chat.addParticipant",title:l("chatWith","Chat with Extension"),icon:f.mention,f1:!1,category:A,menu:{id:v.ChatInput,when:Ie.isEqualTo(F.Panel),group:"navigation",order:1}})}async run(e,...t){const i=e.get(M),s=t[0]?.widget??i.lastFocusedWidget;if(!s)return;const n=ge(s.parsedInput);if(n?.agentPart||n?.commandPart)return;const p=ie.get(s.inputEditor);if(p){const c=s.inputEditor.getValue(),E=c?`@ ${c}`:"@";c.startsWith("@")||s.inputEditor.setValue(E),s.inputEditor.setPosition(new te(1,2)),p.triggerSuggest(void 0,!0)}}}function St(){I(V),I(Ae),I(Se),I(Ee),I(class extends y{constructor(){super({id:"workbench.action.chat.clearInputHistory",title:l("interactiveSession.clearHistory.label","Clear Input History"),precondition:b,category:A,f1:!0})}async run(e,...t){e.get(we).clearHistory()}}),I(class extends y{constructor(){super({id:"workbench.action.chat.clearHistory",title:l("chat.clear.label","Clear All Workspace Chats"),precondition:b,category:A,f1:!0})}async run(e,...t){const i=e.get(me),r=e.get(W);e.get(N).clearAllHistoryEntries();const n=r.getViewWithId(q);n&&n.widget.clear(),i.groups.forEach(p=>{p.editors.forEach(c=>{c instanceof R&&ve(e,c)})})}}),I(class extends ee{constructor(){super({id:"chat.action.focus",title:l("actions.interactiveSession.focus","Focus Chat List"),precondition:u.and(x),category:A,keybinding:[{when:u.and(Ce,P.negate()),primary:h.CtrlCmd|w.UpArrow,weight:S.EditorContrib},{when:u.and(u.or(de,ae),P.negate()),primary:h.CtrlCmd|w.UpArrow,weight:S.EditorContrib},{when:u.and(H,P),primary:h.CtrlCmd|w.DownArrow,weight:S.WorkbenchContrib}]})}runEditorCommand(e,t){const i=t.getModel()?.uri;i&&e.get(M).getWidgetByInputUri(i)?.focusLastMessage()}}),I(class extends y{constructor(){super({id:"workbench.action.chat.focusInput",title:l("interactiveSession.focusInput.label","Focus Chat Input"),f1:!1,keybinding:[{primary:h.CtrlCmd|w.DownArrow,weight:S.WorkbenchContrib,when:u.and(H,x.negate(),P.negate())},{when:u.and(H,x.negate(),P),primary:h.CtrlCmd|w.UpArrow,weight:S.WorkbenchContrib}]})}run(e,...t){e.get(M).lastFocusedWidget?.focusInput()}})}function Et(o,e=!0){return fe(o)?(e?`${o.username}: `:"")+o.messageText:(e?`${o.username}: `:"")+o.response.toString()}se.appendMenuItem(v.CommandCenter,{submenu:v.ChatCommandCenter,title:C("title4","Chat"),icon:f.commentDiscussion,when:u.and(b,u.has("config.chat.commandCenter.enabled")),order:10001});let _=class{static ID="chat.commandCenterRendering";_store=new L;constructor(e,t,i){this._store.add(e.register(v.CommandCenter,v.ChatCommandCenter,(r,s)=>{const n=t.getDefaultAgent(F.Panel);if(!n?.metadata.themeIcon||!(r instanceof ce))return;const p=j({id:n.id,label:C("more","More..."),run(){}}),c=i.createInstance(ne,{id:X,title:V.TITLE,icon:n.metadata.themeIcon},void 0,void 0,void 0,void 0);return i.createInstance(oe,c,p,r.actions,"",s)},t.onDidChangeAgents))}dispose(){this._store.dispose()}};_=B([O(0,re),O(1,le),O(2,ue)],_);export{A as CHAT_CATEGORY,X as CHAT_OPEN_ACTION_ID,_ as ChatCommandCenterRendering,St as registerChatActions,Et as stringifyItem};
