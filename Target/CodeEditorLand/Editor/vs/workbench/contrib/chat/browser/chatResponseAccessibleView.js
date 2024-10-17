import{renderMarkdownAsPlaintext as d}from"../../../../base/browser/markdownRenderer.js";import{MarkdownString as a}from"../../../../base/common/htmlContent.js";import{Disposable as p}from"../../../../base/common/lifecycle.js";import{AccessibleViewProviderId as u,AccessibleViewType as n}from"../../../../platform/accessibility/browser/accessibleView.js";import"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import"../../../../platform/instantiation/common/instantiation.js";import{AccessibilityVerbositySettingId as l}from"../../accessibility/browser/accessibilityConfiguration.js";import{CONTEXT_IN_CHAT_SESSION as m}from"../common/chatContextKeys.js";import{isResponseVM as g}from"../common/chatViewModel.js";import{IChatWidgetService as h}from"./chat.js";class D{priority=100;name="panelChat";type=n.View;when=m;getProvider(s){const t=s.get(h).lastFocusedWidget;if(!t)return;const i=t.hasInputFocus();i&&t.focusLastMessage();const r=t,o=r.getFocus();if(o)return new f(r,o,i)}}class f extends p{constructor(e,t,i){super();this._widget=e;this._chatInputFocused=i;this._focusedItem=t}_focusedItem;id=u.PanelChat;verbositySettingKey=l.Chat;options={type:n.View};provideContent(){return this._getContent(this._focusedItem)}_getContent(e){let t=g(e)?e.response.toString():"";return!t&&"errorDetails"in e&&e.errorDetails&&(t=e.errorDetails.message),d(new a(t),!0)}onClose(){this._widget.reveal(this._focusedItem),this._chatInputFocused?this._widget.focusInput():this._widget.focus(this._focusedItem)}provideNextContent(){const e=this._widget.getSibling(this._focusedItem,"next");if(e)return this._focusedItem=e,this._getContent(e)}providePreviousContent(){const e=this._widget.getSibling(this._focusedItem,"previous");if(e)return this._focusedItem=e,this._getContent(e)}}export{D as ChatResponseAccessibleView};
