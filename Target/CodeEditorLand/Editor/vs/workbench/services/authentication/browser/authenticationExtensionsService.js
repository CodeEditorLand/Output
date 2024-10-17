var k=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var y=(p,S,e,s)=>{for(var t=s>1?void 0:s?O(S,e):S,i=p.length-1,o;i>=0;i--)(o=p[i])&&(t=(s?o(S,e,t):o(t))||t);return s&&t&&k(S,e,t),t},A=(p,S)=>(e,s)=>S(e,s,p);import{Disposable as D,DisposableStore as T,dispose as $,MutableDisposable as M}from"../../../../base/common/lifecycle.js";import*as m from"../../../../nls.js";import{MenuId as R,MenuRegistry as q}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as I}from"../../../../platform/commands/common/commands.js";import{IDialogService as j}from"../../../../platform/dialogs/common/dialogs.js";import{InstantiationType as B,registerSingleton as L}from"../../../../platform/instantiation/common/extensions.js";import{Severity as K}from"../../../../platform/notification/common/notification.js";import{IQuickInputService as z}from"../../../../platform/quickinput/common/quickInput.js";import{IStorageService as H,StorageScope as l,StorageTarget as P}from"../../../../platform/storage/common/storage.js";import{IActivityService as N,NumberBadge as U}from"../../activity/common/activity.js";import{IAuthenticationAccessService as W}from"./authenticationAccessService.js";import{IAuthenticationUsageService as x}from"./authenticationUsageService.js";import{IAuthenticationService as w,IAuthenticationExtensionsService as G}from"../common/authentication.js";import{Emitter as Q}from"../../../../base/common/event.js";import{IProductService as F}from"../../../../platform/product/common/productService.js";const v=" ";let f=class extends D{constructor(e,s,t,i,o,n,r,c){super();this.activityService=e;this.storageService=s;this.dialogService=t;this.quickInputService=i;this._productService=o;this._authenticationService=n;this._authenticationUsageService=r;this._authenticationAccessService=c;this.registerListeners()}_signInRequestItems=new Map;_sessionAccessRequestItems=new Map;_accountBadgeDisposable=this._register(new M);_onDidAccountPreferenceChange=this._register(new Q);onDidChangeAccountPreference=this._onDidAccountPreferenceChange.event;_inheritAuthAccountPreferenceParentToChildren=this._productService.inheritAuthAccountPreference||{};_inheritAuthAccountPreferenceChildToParent=Object.entries(this._inheritAuthAccountPreferenceParentToChildren).reduce((e,[s,t])=>(t.forEach(i=>{e[i]=s}),e),{});registerListeners(){this._register(this._authenticationService.onDidChangeSessions(async e=>{e.event.added?.length&&await this.updateNewSessionRequests(e.providerId,e.event.added),e.event.removed?.length&&await this.updateAccessRequests(e.providerId,e.event.removed),this.updateBadgeCount()})),this._register(this._authenticationService.onDidUnregisterAuthenticationProvider(e=>{const s=this._sessionAccessRequestItems.get(e.id)||{};Object.keys(s).forEach(t=>{this.removeAccessRequest(e.id,t)})}))}async updateNewSessionRequests(e,s){const t=this._signInRequestItems.get(e);t&&Object.keys(t).forEach(i=>{s.some(o=>o.scopes.slice().join(v)===i)&&(t[i]?.disposables.forEach(n=>n.dispose()),delete t[i],Object.keys(t).length===0?this._signInRequestItems.delete(e):this._signInRequestItems.set(e,t))})}async updateAccessRequests(e,s){const t=this._sessionAccessRequestItems.get(e);t&&Object.keys(t).forEach(i=>{s.forEach(o=>{const n=t[i].possibleSessions.findIndex(r=>r.id===o.id);n&&t[i].possibleSessions.splice(n,1)}),t[i].possibleSessions.length||this.removeAccessRequest(e,i)})}updateBadgeCount(){this._accountBadgeDisposable.clear();let e=0;if(this._signInRequestItems.forEach(s=>{Object.keys(s).forEach(t=>{e+=s[t].requestingExtensionIds.length})}),this._sessionAccessRequestItems.forEach(s=>{e+=Object.keys(s).length}),e>0){const s=new U(e,()=>m.localize("sign in","Sign in requested"));this._accountBadgeDisposable.value=this.activityService.showAccountsActivity({badge:s})}}removeAccessRequest(e,s){const t=this._sessionAccessRequestItems.get(e)||{};t[s]&&($(t[s].disposables),delete t[s],this.updateBadgeCount())}updateAccountPreference(e,s,t){const i=this._inheritAuthAccountPreferenceChildToParent[e]??e,o=this._getKey(i,s);this.storageService.store(o,t.label,l.WORKSPACE,P.MACHINE),this.storageService.store(o,t.label,l.APPLICATION,P.MACHINE);const n=this._inheritAuthAccountPreferenceParentToChildren[i],r=n?[i,...n]:[i];this._onDidAccountPreferenceChange.fire({extensionIds:r,providerId:s})}getAccountPreference(e,s){const t=this._getKey(this._inheritAuthAccountPreferenceChildToParent[e]??e,s);return this.storageService.get(t,l.WORKSPACE)??this.storageService.get(t,l.APPLICATION)}removeAccountPreference(e,s){const t=this._getKey(this._inheritAuthAccountPreferenceChildToParent[e]??e,s);this.storageService.remove(t,l.WORKSPACE),this.storageService.remove(t,l.APPLICATION)}_getKey(e,s){return`${e}-${s}`}updateSessionPreference(e,s,t){const i=`${s}-${e}-${t.scopes.join(v)}`;this.storageService.store(i,t.id,l.WORKSPACE,P.MACHINE),this.storageService.store(i,t.id,l.APPLICATION,P.MACHINE)}getSessionPreference(e,s,t){const i=`${s}-${e}-${t.join(v)}`;return this.storageService.get(i,l.WORKSPACE)??this.storageService.get(i,l.APPLICATION)}removeSessionPreference(e,s,t){const i=`${s}-${e}-${t.join(v)}`;this.storageService.remove(i,l.WORKSPACE),this.storageService.remove(i,l.APPLICATION)}_updateAccountAndSessionPreferences(e,s,t){this.updateAccountPreference(s,e,t.account),this.updateSessionPreference(e,s,t)}async showGetSessionPrompt(e,s,t,i){let o;(a=>(a[a.Allow=0]="Allow",a[a.Deny=1]="Deny",a[a.Cancel=2]="Cancel"))(o||={});const{result:n}=await this.dialogService.prompt({type:K.Info,message:m.localize("confirmAuthenticationAccess","The extension '{0}' wants to access the {1} account '{2}'.",i,e.label,s),buttons:[{label:m.localize({key:"allow",comment:["&& denotes a mnemonic"]},"&&Allow"),run:()=>0},{label:m.localize({key:"deny",comment:["&& denotes a mnemonic"]},"&&Deny"),run:()=>1}],cancelButton:{run:()=>2}});return n!==2&&(this._authenticationAccessService.updateAllowedExtensions(e.id,s,[{id:t,name:i,allowed:n===0}]),this.removeAccessRequest(e.id,t)),n===0}async selectSession(e,s,t,i,o){const n=await this._authenticationService.getAccounts(e);if(!n.length)throw new Error("No accounts available");const r=new T,c=r.add(this.quickInputService.createQuickPick());c.ignoreFocusOut=!0;const h=new Set,a=o.filter(u=>!h.has(u.account.label)&&h.add(u.account.label)).map(u=>({label:u.account.label,session:u}));return n.forEach(u=>{h.has(u.label)||a.push({label:u.label,account:u})}),a.push({label:m.localize("useOtherAccount","Sign in to another account")}),c.items=a,c.title=m.localize({key:"selectAccount",comment:["The placeholder {0} is the name of an extension. {1} is the name of the type of account, such as Microsoft or GitHub."]},"The extension '{0}' wants to access a {1} account",t,this._authenticationService.getProvider(e).label),c.placeholder=m.localize("getSessionPlateholder","Select an account for '{0}' to use or Esc to cancel",t),await new Promise((u,g)=>{r.add(c.onDidAccept(async b=>{c.dispose();let d=c.selectedItems[0].session;if(!d){const C=c.selectedItems[0].account;try{d=await this._authenticationService.createSession(e,i,{account:C})}catch(E){g(E);return}}const _=d.account.label;this._authenticationAccessService.updateAllowedExtensions(e,_,[{id:s,name:t,allowed:!0}]),this._updateAccountAndSessionPreferences(e,s,d),this.removeAccessRequest(e,s),u(d)})),r.add(c.onDidHide(b=>{c.selectedItems[0]||g("User did not consent to account access"),r.dispose()})),c.show()})}async completeSessionAccessRequest(e,s,t,i){const n=(this._sessionAccessRequestItems.get(e.id)||{})[s];if(!n||!e)return;const r=n.possibleSessions;let c;if(e.supportsMultipleAccounts)try{c=await this.selectSession(e.id,s,t,i,r)}catch{}else await this.showGetSessionPrompt(e,r[0].account.label,s,t)&&(c=r[0]);c&&this._authenticationUsageService.addAccountUsage(e.id,c.account.label,c.scopes,s,t)}requestSessionAccess(e,s,t,i,o){const n=this._sessionAccessRequestItems.get(e)||{};if(n[s])return;const c=this._authenticationService.getProvider(e),h=q.appendMenuItem(R.AccountsContext,{group:"3_accessRequests",command:{id:`${e}${s}Access`,title:m.localize({key:"accessRequest",comment:["The placeholder {0} will be replaced with an authentication provider''s label. {1} will be replaced with an extension name. (1) is to indicate that this menu item contributes to a badge count"]},"Grant access to {0} for {1}... (1)",c.label,t)}}),a=I.registerCommand({id:`${e}${s}Access`,handler:async u=>{this.completeSessionAccessRequest(c,s,t,i)}});n[s]={possibleSessions:o,disposables:[h,a]},this._sessionAccessRequestItems.set(e,n),this.updateBadgeCount()}async requestNewSession(e,s,t,i){this._authenticationService.isAuthenticationProviderRegistered(e)||await new Promise((g,b)=>{const d=this._authenticationService.onDidRegisterAuthenticationProvider(_=>{_.id===e&&(d.dispose(),g())})});let o;try{o=this._authenticationService.getProvider(e)}catch{return}const n=this._signInRequestItems.get(e),r=s.join(v);if(n&&n[r]&&n[r].requestingExtensionIds.includes(t))return;const h=`${e}:${t}:signIn${Object.keys(n||[]).length}`,a=q.appendMenuItem(R.AccountsContext,{group:"2_signInRequests",command:{id:h,title:m.localize({key:"signInRequest",comment:["The placeholder {0} will be replaced with an authentication provider's label. {1} will be replaced with an extension name. (1) is to indicate that this menu item contributes to a badge count."]},"Sign in with {0} to use {1} (1)",o.label,i)}}),u=I.registerCommand({id:h,handler:async g=>{const d=await g.get(w).createSession(e,s);this._authenticationAccessService.updateAllowedExtensions(e,d.account.label,[{id:t,name:i,allowed:!0}]),this._updateAccountAndSessionPreferences(e,t,d)}});if(n){const g=n[r]||{disposables:[],requestingExtensionIds:[]};n[r]={disposables:[...g.disposables,a,u],requestingExtensionIds:[...g.requestingExtensionIds,t]},this._signInRequestItems.set(e,n)}else this._signInRequestItems.set(e,{[r]:{disposables:[a,u],requestingExtensionIds:[t]}});this.updateBadgeCount()}};f=y([A(0,N),A(1,H),A(2,j),A(3,z),A(4,F),A(5,w),A(6,x),A(7,W)],f),L(G,f,B.Delayed);export{f as AuthenticationExtensionsService};
