var ue=Object.defineProperty;var le=Object.getOwnPropertyDescriptor;var V=(y,w,e,i)=>{for(var n=i>1?void 0:i?le(w,e):w,t=y.length-1,o;t>=0;t--)(o=y[t])&&(n=(i?o(w,e,n):o(n))||n);return i&&n&&ue(w,e,n),n},c=(y,w)=>(e,i)=>w(e,i,y);import{Disposable as he,DisposableStore as $,MutableDisposable as Se}from"../../../../base/common/lifecycle.js";import{Extensions as ge}from"../../../common/contributions.js";import{Registry as W}from"../../../../platform/registry/common/platform.js";import{ILifecycleService as me,LifecyclePhase as pe,ShutdownReason as fe}from"../../../services/lifecycle/common/lifecycle.js";import{Action2 as p,MenuId as ve,MenuRegistry as q,registerAction2 as f}from"../../../../platform/actions/common/actions.js";import"../../../../editor/browser/editorExtensions.js";import{localize as s,localize2 as C}from"../../../../nls.js";import{IEditSessionsStorageService as z,ChangeType as I,FileType as B,EDIT_SESSION_SYNC_CATEGORY as O,EDIT_SESSIONS_CONTAINER_ID as K,EditSessionSchemaVersion as we,IEditSessionsLogService as j,EDIT_SESSIONS_VIEW_ICON as ye,EDIT_SESSIONS_TITLE as Ce,EDIT_SESSIONS_SHOW_VIEW as Ie,EDIT_SESSIONS_DATA_VIEW_ID as Ee,decodeEditSessionFileContent as ke,hashedEditSessionId as T,editSessionsLogId as Oe,EDIT_SESSIONS_PENDING as be}from"../common/editSessions.js";import{ISCMService as Ae}from"../../scm/common/scm.js";import{IFileService as De}from"../../../../platform/files/common/files.js";import{IWorkspaceContextService as Pe,WorkbenchState as Q}from"../../../../platform/workspace/common/workspace.js";import{URI as b}from"../../../../base/common/uri.js";import{basename as xe,joinPath as Re,relativePath as Le}from"../../../../base/common/resources.js";import{encodeBase64 as Y}from"../../../../base/common/buffer.js";import{IConfigurationService as Fe}from"../../../../platform/configuration/common/configuration.js";import{IProgressService as We,ProgressLocation as D}from"../../../../platform/progress/common/progress.js";import{EditSessionsWorkbenchService as Te}from"./editSessionsStorageService.js";import{InstantiationType as G,registerSingleton as H}from"../../../../platform/instantiation/common/extensions.js";import{UserDataSyncErrorCode as Ne,UserDataSyncStoreError as _e}from"../../../../platform/userDataSync/common/userDataSync.js";import{ITelemetryService as Ue}from"../../../../platform/telemetry/common/telemetry.js";import{INotificationService as Me,Severity as J}from"../../../../platform/notification/common/notification.js";import{getFileNamesMessage as Ve,IDialogService as $e,IFileDialogService as qe}from"../../../../platform/dialogs/common/dialogs.js";import{IProductService as ze}from"../../../../platform/product/common/productService.js";import{IOpenerService as Be}from"../../../../platform/opener/common/opener.js";import{IEnvironmentService as Ke}from"../../../../platform/environment/common/environment.js";import{workbenchConfigurationNodeBase as je}from"../../../common/configuration.js";import{Extensions as Qe}from"../../../../platform/configuration/common/configurationRegistry.js";import{IQuickInputService as Ye}from"../../../../platform/quickinput/common/quickInput.js";import{ExtensionsRegistry as Ge}from"../../../services/extensions/common/extensionsRegistry.js";import{ContextKeyExpr as Z,IContextKeyService as He}from"../../../../platform/contextkey/common/contextkey.js";import{ICommandService as X}from"../../../../platform/commands/common/commands.js";import{getVirtualWorkspaceLocation as ee}from"../../../../platform/workspace/common/virtualWorkspace.js";import{Schemas as ie}from"../../../../base/common/network.js";import{IsWebContext as Je}from"../../../../platform/contextkey/common/contextkeys.js";import{IExtensionService as Ze,isProposedApiEnabled as Xe}from"../../../services/extensions/common/extensions.js";import{EditSessionsLogService as ei}from"../common/editSessionsLogService.js";import{Extensions as ii,ViewContainerLocation as ti}from"../../../common/views.js";import{IViewsService as ni}from"../../../services/views/common/viewsService.js";import{SyncDescriptor as oi}from"../../../../platform/instantiation/common/descriptors.js";import{ViewPaneContainer as si}from"../../../browser/parts/views/viewPaneContainer.js";import{IInstantiationService as ri}from"../../../../platform/instantiation/common/instantiation.js";import{EditSessionsDataViews as ai}from"./editSessionsViews.js";import{EditSessionsFileSystemProvider as te}from"./editSessionsFileSystemProvider.js";import{isNative as ne,isWeb as ci}from"../../../../base/common/platform.js";import{VirtualWorkspaceContext as di,WorkspaceFolderCountContext as ui}from"../../../common/contextkeys.js";import{CancellationTokenSource as P}from"../../../../base/common/cancellation.js";import{equals as li}from"../../../../base/common/objects.js";import{EditSessionIdentityMatch as oe,IEditSessionIdentityService as hi}from"../../../../platform/workspace/common/editSessions.js";import{ThemeIcon as se}from"../../../../base/common/themables.js";import{IOutputService as Si}from"../../../services/output/common/output.js";import{IStorageService as gi,StorageScope as N,StorageTarget as mi}from"../../../../platform/storage/common/storage.js";import{IActivityService as pi,NumberBadge as fi}from"../../../services/activity/common/activity.js";import{IEditorService as vi}from"../../../services/editor/common/editorService.js";import"../../../../platform/action/common/action.js";import{Codicon as wi}from"../../../../base/common/codicons.js";import{CancellationError as re}from"../../../../base/common/errors.js";import{IRemoteAgentService as yi}from"../../../services/remote/common/remoteAgentService.js";import{IExtensionsWorkbenchService as Ci}from"../../extensions/common/extensions.js";import{WorkspaceStateSynchroniser as Ii}from"../common/workspaceStateSync.js";import{IUserDataProfilesService as Ei}from"../../../../platform/userDataProfile/common/userDataProfile.js";import{IRequestService as ki}from"../../../../platform/request/common/request.js";import{EditSessionsStoreClient as Oi}from"../common/editSessionsStorageClient.js";import{IUriIdentityService as bi}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{IWorkspaceIdentityService as Ai}from"../../../services/workspaces/common/workspaceIdentityService.js";import{hashAsync as ae}from"../../../../base/common/hash.js";H(j,ei,G.Delayed),H(z,Te,G.Delayed);const x={id:"_workbench.editSessions.actions.continueEditSession",title:C("continue working on","Continue Working On..."),precondition:ui.notEqualsTo("0"),f1:!0},R={id:"_workbench.editSessions.actions.continueEditSession.openLocalFolder",title:C("continue edit session in local folder","Open In Local Folder"),category:O,precondition:Z.and(Je.toNegated(),di)},ce={id:"workbench.editSessions.actions.showOutputChannel",title:C("show log","Show Log"),category:O},A={id:"workbench.action.continueOn.extensions",title:s("continueOn.installAdditional","Install additional development environment options")};f(class extends p{constructor(){super({...A,f1:!1})}async run(y){return y.get(Ci).openSearch("@tag:continueOn")}});const _=`[${s("resuming working changes window","Resuming working changes...")}](command:${ce.id})`,E={location:D.Window,type:"syncing"},de="editSessionId",Di="workbench.editSessions.continueOn";let v=class extends he{constructor(e,i,n,t,o,r,a,u,l,h,S,d,g,m,k,L,F,Li,Fi,Wi,Ti,Ni,_i,Ui,Mi,Vi,$i,qi,zi){super();this.editSessionsStorageService=e;this.fileService=i;this.progressService=n;this.openerService=t;this.telemetryService=o;this.scmService=r;this.notificationService=a;this.dialogService=u;this.logService=l;this.environmentService=h;this.instantiationService=S;this.productService=d;this.configurationService=g;this.contextService=m;this.editSessionIdentityService=k;this.quickInputService=L;this.commandService=F;this.contextKeyService=Li;this.fileDialogService=Fi;this.lifecycleService=Wi;this.storageService=Ti;this.activityService=Ni;this.editorService=_i;this.remoteAgentService=Ui;this.extensionService=Mi;this.requestService=Vi;this.userDataProfilesService=$i;this.uriIdentityService=qi;this.workspaceIdentityService=zi;this.shouldShowViewsContext=Ie.bindTo(this.contextKeyService),this.pendingEditSessionsContext=be.bindTo(this.contextKeyService),this.pendingEditSessionsContext.set(!1),this.productService["editSessions.store"]?.url&&(this.editSessionsStorageClient=new Oi(b.parse(this.productService["editSessions.store"].url),this.productService,this.requestService,this.logService,this.environmentService,this.fileService,this.storageService),this.editSessionsStorageService.storeClient=this.editSessionsStorageClient,this.workspaceStateSynchronizer=new Ii(this.userDataProfilesService.defaultProfile,void 0,this.editSessionsStorageClient,this.logService,this.fileService,this.environmentService,this.telemetryService,this.configurationService,this.storageService,this.uriIdentityService,this.workspaceIdentityService,this.editSessionsStorageService),this.autoResumeEditSession(),this.registerActions(),this.registerViews(),this.registerContributedEditSessionOptions(),this._register(this.fileService.registerProvider(te.SCHEMA,new te(this.editSessionsStorageService))),this.lifecycleService.onWillShutdown(M=>{M.reason!==fe.RELOAD&&this.editSessionsStorageService.isSignedIn&&this.configurationService.getValue("workbench.experimental.cloudChanges.autoStore")==="onShutdown"&&!ci&&M.join(this.autoStoreEditSession(),{id:"autoStoreWorkingChanges",label:s("autoStoreWorkingChanges","Storing current working changes...")})}),this._register(this.editSessionsStorageService.onDidSignIn(()=>this.updateAccountsMenuBadge())),this._register(this.editSessionsStorageService.onDidSignOut(()=>this.updateAccountsMenuBadge())))}continueEditSessionOptions=[];shouldShowViewsContext;pendingEditSessionsContext;static APPLICATION_LAUNCHED_VIA_CONTINUE_ON_STORAGE_KEY="applicationLaunchedViaContinueOn";accountsMenuBadgeDisposable=this._register(new Se);registeredCommands=new Set;workspaceStateSynchronizer;editSessionsStorageClient;async autoResumeEditSession(){const e=this.configurationService.getValue("workbench.cloudChanges.autoResume")==="onReload";if(this.environmentService.editSessionId!==void 0)this.logService.info(`Resuming cloud changes, reason: found editSessionId ${this.environmentService.editSessionId} in environment service...`),await this.progressService.withProgress(E,async i=>await this.resumeEditSession(this.environmentService.editSessionId,void 0,void 0,void 0,i).finally(()=>this.environmentService.editSessionId=void 0));else if(e&&this.editSessionsStorageService.isSignedIn)this.logService.info("Resuming cloud changes, reason: cloud changes enabled..."),await this.progressService.withProgress(E,async i=>await this.resumeEditSession(void 0,!0,void 0,void 0,i));else if(e){const i=this.storageService.getBoolean(v.APPLICATION_LAUNCHED_VIA_CONTINUE_ON_STORAGE_KEY,N.APPLICATION,!1);this.logService.info(`Prompting to enable cloud changes, has application previously launched from Continue On flow: ${i}`);const n=()=>{this.logService.info("Showing badge to enable cloud changes in accounts menu..."),this.updateAccountsMenuBadge(),this.pendingEditSessionsContext.set(!0);const t=this.editSessionsStorageService.onDidSignIn(async()=>{t.dispose(),this.logService.info("Showing badge to enable cloud changes in accounts menu succeeded, resuming cloud changes..."),await this.progressService.withProgress(E,async o=>await this.resumeEditSession(void 0,!0,void 0,void 0,o)),this.storageService.remove(v.APPLICATION_LAUNCHED_VIA_CONTINUE_ON_STORAGE_KEY,N.APPLICATION),this.environmentService.continueOn=void 0})};this.environmentService.continueOn!==void 0&&!this.editSessionsStorageService.isSignedIn&&i===!1?(this.storageService.store(v.APPLICATION_LAUNCHED_VIA_CONTINUE_ON_STORAGE_KEY,!0,N.APPLICATION,mi.MACHINE),this.logService.info("Prompting to enable cloud changes..."),await this.editSessionsStorageService.initialize("read"),this.editSessionsStorageService.isSignedIn?(this.logService.info("Prompting to enable cloud changes succeeded, resuming cloud changes..."),await this.progressService.withProgress(E,async t=>await this.resumeEditSession(void 0,!0,void 0,void 0,t))):n()):!this.editSessionsStorageService.isSignedIn&&i===!0&&n()}else this.logService.debug("Auto resuming cloud changes disabled.")}updateAccountsMenuBadge(){if(this.editSessionsStorageService.isSignedIn)return this.accountsMenuBadgeDisposable.clear();const e=new fi(1,()=>s("check for pending cloud changes","Check for pending cloud changes"));this.accountsMenuBadgeDisposable.value=this.activityService.showAccountsActivity({badge:e})}async autoStoreEditSession(){const e=new P;await this.progressService.withProgress({location:D.Window,type:"syncing",title:s("store working changes","Storing working changes...")},async()=>this.storeEditSession(!1,e.token),()=>{e.cancel(),e.dispose()})}registerViews(){const e=W.as(ii.ViewContainersRegistry).registerViewContainer({id:K,title:Ce,ctorDescriptor:new oi(si,[K,{mergeViewWithContainerWhenSingleView:!0}]),icon:ye,hideIfEmpty:!0},ti.Sidebar,{doNotRegisterOpenCommand:!0});this._register(this.instantiationService.createInstance(ai,e))}registerActions(){this.registerContinueEditSessionAction(),this.registerResumeLatestEditSessionAction(),this.registerStoreLatestEditSessionAction(),this.registerContinueInLocalFolderAction(),this.registerShowEditSessionViewAction(),this.registerShowEditSessionOutputChannelAction()}registerShowEditSessionOutputChannelAction(){this._register(f(class extends p{constructor(){super(ce)}run(i,...n){i.get(Si).showChannel(Oe)}}))}registerShowEditSessionViewAction(){const e=this;this._register(f(class extends p{constructor(){super({id:"workbench.editSessions.actions.showEditSessions",title:C("show cloud changes","Show Cloud Changes"),category:O,f1:!0})}async run(n){e.shouldShowViewsContext.set(!0),await n.get(ni).openView(Ee)}}))}registerContinueEditSessionAction(){const e=this;this._register(f(class extends p{constructor(){super(x)}async run(n,t,o){let r=t;if(!o&&!r&&(o=await e.pickContinueEditSessionDestination(),!o)){e.telemetryService.publicLog2("continueOn.editSessions.pick.outcome",{outcome:"noSelection"});return}const a=await e.shouldContinueOnWithEditSession();let u;if(a){e.telemetryService.publicLog2("continueOn.editSessions.store");const l=new P;try{u=await e.progressService.withProgress({location:D.Notification,cancellable:!0,type:"syncing",title:s("store your working changes","Storing your working changes...")},async()=>{const h=await e.storeEditSession(!1,l.token);return h!==void 0?e.telemetryService.publicLog2("continueOn.editSessions.store.outcome",{outcome:"storeSucceeded",hashedId:T(h)}):e.telemetryService.publicLog2("continueOn.editSessions.store.outcome",{outcome:"storeSkipped"}),h},()=>{l.cancel(),l.dispose(),e.telemetryService.publicLog2("continueOn.editSessions.store.outcome",{outcome:"storeCancelledByUser"})})}catch(h){throw e.telemetryService.publicLog2("continueOn.editSessions.store.outcome",{outcome:"storeFailed"}),h}}if(r=o?await e.resolveDestination(o):r,r!==void 0)if(u!==void 0&&r!=="noDestinationUri"){const l=encodeURIComponent(u);r=r.with({query:r.query.length>0?r.query+`&${de}=${l}&continueOn=1`:`${de}=${l}&continueOn=1`}),e.logService.info(`Opening ${r.toString()}`),await e.openerService.open(r,{openExternal:!0})}else!a&&r!=="noDestinationUri"?(e.logService.info(`Opening ${r.toString()}`),await e.openerService.open(r,{openExternal:!0})):u===void 0&&a&&e.logService.warn(`Failed to store working changes when invoking ${x.id}.`)}}))}registerResumeLatestEditSessionAction(){const e=this;this._register(f(class extends p{constructor(){super({id:"workbench.editSessions.actions.resumeLatest",title:C("resume latest cloud changes","Resume Latest Changes from Cloud"),category:O,f1:!0})}async run(n,t,o){await e.progressService.withProgress({...E,title:_},async()=>await e.resumeEditSession(t,void 0,o))}})),this._register(f(class extends p{constructor(){super({id:"workbench.editSessions.actions.resumeFromSerializedPayload",title:C("resume cloud changes","Resume Changes from Serialized Data"),category:"Developer",f1:!0})}async run(n,t){const o=await e.quickInputService.input({prompt:"Enter serialized data"});o&&e.editSessionsStorageService.lastReadResources.set("editSessions",{content:o,ref:""}),await e.progressService.withProgress({...E,title:_},async()=>await e.resumeEditSession(t,void 0,void 0,void 0,void 0,o))}}))}registerStoreLatestEditSessionAction(){const e=this;this._register(f(class extends p{constructor(){super({id:"workbench.editSessions.actions.storeCurrent",title:C("store working changes in cloud","Store Working Changes in Cloud"),category:O,f1:!0})}async run(n){const t=new P;await e.progressService.withProgress({location:D.Notification,title:s("storing working changes","Storing working changes...")},async()=>{e.telemetryService.publicLog2("editSessions.store"),await e.storeEditSession(!0,t.token)},()=>{t.cancel(),t.dispose()})}}))}async resumeEditSession(e,i,n,t,o,r){if(await this.remoteAgentService.getEnvironment(),this.contextService.getWorkbenchState()===Q.EMPTY||(this.logService.info(e!==void 0?`Resuming changes from cloud with ref ${e}...`:"Checking for pending cloud changes..."),i&&!await this.editSessionsStorageService.initialize("read",!0)))return;this.telemetryService.publicLog2("editSessions.resume"),performance.mark("code/willResumeEditSessionFromIdentifier"),o?.report({message:s("checkingForWorkingChanges","Checking for pending cloud changes...")});const a=r?{content:r,ref:""}:await this.editSessionsStorageService.read("editSessions",e);if(!a){e===void 0&&!i?this.notificationService.info(s("no cloud changes","There are no changes to resume from the cloud.")):e!==void 0&&this.notificationService.warn(s("no cloud changes for ref","Could not resume changes from the cloud for ID {0}.",e)),this.logService.info(e!==void 0?`Aborting resuming changes from cloud as no edit session content is available to be applied from ref ${e}.`:"Aborting resuming edit session as no edit session content is available to be applied");return}o?.report({message:_});const u=JSON.parse(a.content);if(e=a.ref,u.version>we){this.notificationService.error(s("client too old","Please upgrade to a newer version of {0} to resume your working changes from the cloud.",this.productService.nameLong)),this.telemetryService.publicLog2("editSessions.resume.outcome",{hashedId:T(e),outcome:"clientUpdateNeeded"});return}try{const{changes:l,conflictingChanges:h}=await this.generateChanges(u,e,n,t);if(l.length===0)return;if(h.length>0){const{confirmed:S}=await this.dialogService.confirm({type:J.Warning,message:h.length>1?s("resume edit session warning many","Resuming your working changes from the cloud will overwrite the following {0} files. Do you want to proceed?",h.length):s("resume edit session warning 1","Resuming your working changes from the cloud will overwrite {0}. Do you want to proceed?",xe(h[0].uri)),detail:h.length>1?Ve(h.map(d=>d.uri)):void 0});if(!S)return}for(const{uri:S,type:d,contents:g}of l)d===I.Addition?await this.fileService.writeFile(S,ke(u.version,g)):d===I.Deletion&&await this.fileService.exists(S)&&await this.fileService.del(S);await this.workspaceStateSynchronizer?.apply(!1,{}),this.logService.info(`Deleting edit session with ref ${e} after successfully applying it to current workspace...`),await this.editSessionsStorageService.delete("editSessions",e),this.logService.info(`Deleted edit session with ref ${e}.`),this.telemetryService.publicLog2("editSessions.resume.outcome",{hashedId:T(e),outcome:"resumeSucceeded"})}catch(l){this.logService.error("Failed to resume edit session, reason: ",l.toString()),this.notificationService.error(s("resume failed","Failed to resume your working changes from the cloud."))}performance.mark("code/didResumeEditSessionFromIdentifier")}async generateChanges(e,i,n=!1,t=!1){const o=[],r=[],a=this.contextService.getWorkspace().folders,u=new P;for(const l of e.folders){let h;if(l.canonicalIdentity)for(const d of a){const g=await this.editSessionIdentityService.getEditSessionIdentifier(d,u.token);if(this.logService.info(`Matching identity ${g} against edit session folder identity ${l.canonicalIdentity}...`),li(g,l.canonicalIdentity)||n){h=d;break}if(g!==void 0){const m=await this.editSessionIdentityService.provideEditSessionIdentityMatch(d,g,l.canonicalIdentity,u.token);if(m===oe.Complete){h=d;break}else if(m===oe.Partial&&this.configurationService.getValue("workbench.experimental.cloudChanges.partialMatches.enabled")===!0)if(!t)this.notificationService.prompt(J.Info,s("editSessionPartialMatch","You have pending working changes in the cloud for this workspace. Would you like to resume them?"),[{label:s("resume","Resume"),run:()=>this.resumeEditSession(i,!1,void 0,!0)}]);else{h=d;break}}}else h=a.find(d=>d.name===l.name);if(!h)return this.logService.info(`Skipping applying ${l.workingChanges.length} changes from edit session with ref ${i} as no matching workspace folder was found.`),{changes:[],conflictingChanges:[],contributedStateHandlers:[]};const S=new Set;for(const d of this.scmService.repositories)d.provider.rootUri!==void 0&&this.contextService.getWorkspaceFolder(d.provider.rootUri)?.name===l.name&&this.getChangedResources(d).forEach(m=>S.add(m.toString()));for(const d of l.workingChanges){const g=Re(h.uri,d.relativeFilePath);o.push({uri:g,type:d.type,contents:d.contents}),await this.willChangeLocalContents(S,g,d)&&r.push({uri:g,type:d.type,contents:d.contents})}}return{changes:o,conflictingChanges:r}}async willChangeLocalContents(e,i,n){if(!e.has(i.toString()))return!1;const{contents:t,type:o}=n;switch(o){case I.Addition:{const[r,a]=await Promise.all([ae(t),ae(Y((await this.fileService.readFile(i)).value))]);return r!==a}case I.Deletion:return await this.fileService.exists(i);default:throw new Error("Unhandled change type.")}}async storeEditSession(e,i){const n=[];let t=0,o=!1;await this.editorService.saveAll();for(const a of this.scmService.repositories){const u=this.getChangedResources(a),l=[],{rootUri:h}=a.provider,S=h?this.contextService.getWorkspaceFolder(h):void 0;let d=S?.name;for(const m of u){const k=this.contextService.getWorkspaceFolder(m);if(!k){this.logService.info(`Skipping working change ${m.toString()} as no associated workspace folder was found.`);continue}await this.editSessionIdentityService.onWillCreateEditSessionIdentity(k,i),d=d??k.name;const L=Le(k.uri,m)??m.path;try{if(!(await this.fileService.stat(m)).isFile)continue}catch{}if(o=!0,await this.fileService.exists(m)){const F=Y((await this.fileService.readFile(m)).value);if(t+=F.length,t>this.editSessionsStorageService.SIZE_LIMIT){this.notificationService.error(s("payload too large","Your working changes exceed the size limit and cannot be stored."));return}l.push({type:I.Addition,fileType:B.File,contents:F,relativeFilePath:L})}else l.push({type:I.Deletion,fileType:B.File,contents:void 0,relativeFilePath:L})}let g;S!=null&&(g=await this.editSessionIdentityService.getEditSessionIdentifier(S,i)),n.push({workingChanges:l,name:d??"",canonicalIdentity:g??void 0,absoluteUri:S?.uri.toString()})}if(await this.workspaceStateSynchronizer?.sync(null,{}),!o){this.logService.info("Skipped storing working changes in the cloud as there are no edits to store."),e&&this.notificationService.info(s("no working changes to store","Skipped storing working changes in the cloud as there are no edits to store."));return}const r={folders:n,version:2,workspaceStateId:this.editSessionsStorageService.lastWrittenResources.get("workspaceState")?.ref};try{this.logService.info("Storing edit session...");const a=await this.editSessionsStorageService.write("editSessions",r);return this.logService.info(`Stored edit session with ref ${a}.`),a}catch(a){if(this.logService.error("Failed to store edit session, reason: ",a.toString()),a instanceof _e)switch(a.code){case Ne.TooLarge:this.telemetryService.publicLog2("editSessions.upload.failed",{reason:"TooLarge"}),this.notificationService.error(s("payload too large","Your working changes exceed the size limit and cannot be stored."));break;default:this.telemetryService.publicLog2("editSessions.upload.failed",{reason:"unknown"}),this.notificationService.error(s("payload failed","Your working changes cannot be stored."));break}}}getChangedResources(e){return e.provider.groups.reduce((i,n)=>(n.resources.forEach(t=>i.add(t.sourceUri)),i),new Set)}hasEditSession(){for(const e of this.scmService.repositories)if(this.getChangedResources(e).size>0)return!0;return!1}async shouldContinueOnWithEditSession(){if(this.editSessionsStorageService.isSignedIn)return this.hasEditSession();if(this.configurationService.getValue(Di)==="off")return this.telemetryService.publicLog2("continueOn.editSessions.canStore.outcome",{outcome:"disabledEditSessionsViaSetting"}),!1;if(this.hasEditSession()){const e=new $,i=e.add(this.quickInputService.createQuickPick());i.placeholder=s("continue with cloud changes","Select whether to bring your working changes with you"),i.ok=!1,i.ignoreFocusOut=!0;const n={label:s("with cloud changes","Yes, continue with my working changes")},t={label:s("without cloud changes","No, continue without my working changes")};i.items=[n,t];const o=await new Promise((a,u)=>{e.add(i.onDidAccept(()=>{a(i.selectedItems[0]===n),e.dispose()})),e.add(i.onDidHide(()=>{u(new re),e.dispose()})),i.show()});if(!o)return this.telemetryService.publicLog2("continueOn.editSessions.canStore.outcome",{outcome:"didNotEnableEditSessionsWhenPrompted"}),o;const r=await this.editSessionsStorageService.initialize("write");return r||this.telemetryService.publicLog2("continueOn.editSessions.canStore.outcome",{outcome:"didNotEnableEditSessionsWhenPrompted"}),r}return!1}registerContributedEditSessionOptions(){xi.setHandler(e=>{const i=[];for(const n of e)if(Xe(n.description,"contribEditSessions")&&Array.isArray(n.value))for(const t of n.value){const o=q.getCommand(t.command);if(!o)return;const r=o.icon,a=typeof o.title=="string"?o.title:o.title.value,u=Z.deserialize(t.when);i.push(new U(se.isThemeIcon(r)?`$(${r.id}) ${a}`:a,o.id,o.source?.title,u,t.documentation)),t.qualifiedName&&this.generateStandaloneOptionCommand(o.id,t.qualifiedName,t.category??o.category,u,t.remoteGroup)}this.continueEditSessionOptions=i})}generateStandaloneOptionCommand(e,i,n,t,o){const r={id:`${x.id}.${e}`,title:{original:i,value:i},category:typeof n=="string"?{original:n,value:n}:n,precondition:t,f1:!0};this.registeredCommands.has(r.id)||(this.registeredCommands.add(r.id),this._register(f(class extends p{constructor(){super(r)}async run(u){return u.get(X).executeCommand(x.id,void 0,e)}})),o!==void 0&&q.appendMenuItem(ve.StatusBarRemoteIndicatorMenu,{group:o,command:r,when:r.precondition}))}registerContinueInLocalFolderAction(){const e=this;this._register(f(class extends p{constructor(){super(R)}async run(n){const t=await e.fileDialogService.showOpenDialog({title:s("continueEditSession.openLocalFolder.title.v2","Select a local folder to continue working in"),canSelectFolders:!0,canSelectMany:!1,canSelectFiles:!1,availableFileSystems:[ie.file]});return t?.length!==1?void 0:b.from({scheme:e.productService.urlProtocol,authority:ie.file,path:t[0].path})}})),ee(this.contextService.getWorkspace())!==void 0&&ne&&this.generateStandaloneOptionCommand(R.id,s("continueWorkingOn.existingLocalFolder","Continue Working in Existing Local Folder"),void 0,R.precondition,void 0)}async pickContinueEditSessionDestination(){const e=new $,i=e.add(this.quickInputService.createQuickPick({useSeparators:!0})),n=this.contextService.getWorkbenchState()===Q.FOLDER?this.contextService.getWorkspace().folders[0].name:this.contextService.getWorkspace().folders.map(o=>o.name).join(", ");i.placeholder=s("continueEditSessionPick.title.v2","Select a development environment to continue working on {0} in",`'${n}'`),i.items=this.createPickItems(),this.extensionService.onDidChangeExtensions(()=>{i.items=this.createPickItems()});const t=await new Promise((o,r)=>{e.add(i.onDidHide(()=>{e.dispose(),o(void 0)})),e.add(i.onDidAccept(a=>{const u=i.activeItems[0].command;u===A.id?this.commandService.executeCommand(A.id):(o(u),i.hide())})),i.show(),e.add(i.onDidTriggerItemButton(async a=>{if(a.item.documentation!==void 0){const u=b.isUri(a.item.documentation)?b.parse(a.item.documentation):await this.commandService.executeCommand(a.item.documentation);this.openerService.open(u,{openExternal:!0})}}))});return i.dispose(),t}async resolveDestination(e){try{const i=await this.commandService.executeCommand(e);if(i===void 0)return this.telemetryService.publicLog2("continueOn.openDestination.outcome",{selection:e,outcome:"noDestinationUri"}),"noDestinationUri";if(b.isUri(i))return this.telemetryService.publicLog2("continueOn.openDestination.outcome",{selection:e,outcome:"resolvedUri"}),i;this.telemetryService.publicLog2("continueOn.openDestination.outcome",{selection:e,outcome:"invalidDestination"});return}catch(i){i instanceof re?this.telemetryService.publicLog2("continueOn.openDestination.outcome",{selection:e,outcome:"cancelled"}):this.telemetryService.publicLog2("continueOn.openDestination.outcome",{selection:e,outcome:"unknownError"});return}}createPickItems(){const e=[...this.continueEditSessionOptions].filter(n=>n.when===void 0||this.contextKeyService.contextMatchesRules(n.when));return ee(this.contextService.getWorkspace())!==void 0&&ne&&e.push(new U("$(folder) "+s("continueEditSessionItem.openInLocalFolder.v2","Open in Local Folder"),R.id,s("continueEditSessionItem.builtin","Built-in"))),e.sort((n,t)=>n.label.localeCompare(t.label)).concat({type:"separator"},new U(A.title,A.id))}};v=V([c(0,z),c(1,De),c(2,We),c(3,Be),c(4,Ue),c(5,Ae),c(6,Me),c(7,$e),c(8,j),c(9,Ke),c(10,ri),c(11,ze),c(12,Fe),c(13,Pe),c(14,hi),c(15,Ye),c(16,X),c(17,He),c(18,qe),c(19,me),c(20,gi),c(21,pi),c(22,vi),c(23,yi),c(24,Ze),c(25,ki),c(26,Ei),c(27,bi),c(28,Ai)],v);const Pi=se.asClassName(wi.info);class U{constructor(w,e,i,n,t){this.label=w;this.command=e;this.description=i;this.when=n;this.documentation=t;t!==void 0&&(this.buttons=[{iconClass:Pi,tooltip:s("learnMoreTooltip","Learn More")}])}buttons}const xi=Ge.registerExtensionPoint({extensionPoint:"continueEditSession",jsonSchema:{description:s("continueEditSessionExtPoint","Contributes options for continuing the current edit session in a different environment"),type:"array",items:{type:"object",properties:{command:{description:s("continueEditSessionExtPoint.command","Identifier of the command to execute. The command must be declared in the 'commands'-section and return a URI representing a different environment where the current edit session can be continued."),type:"string"},group:{description:s("continueEditSessionExtPoint.group","Group into which this item belongs."),type:"string"},qualifiedName:{description:s("continueEditSessionExtPoint.qualifiedName","A fully qualified name for this item which is used for display in menus."),type:"string"},description:{description:s("continueEditSessionExtPoint.description","The url, or a command that returns the url, to the option's documentation page."),type:"string"},remoteGroup:{description:s("continueEditSessionExtPoint.remoteGroup","Group into which this item belongs in the remote indicator."),type:"string"},when:{description:s("continueEditSessionExtPoint.when","Condition which must be true to show this item."),type:"string"}},required:["command"]}}}),Ri=W.as(ge.Workbench);Ri.registerWorkbenchContribution(v,pe.Restored),W.as(Qe.Configuration).registerConfiguration({...je,properties:{"workbench.experimental.cloudChanges.autoStore":{enum:["onShutdown","off"],enumDescriptions:[s("autoStoreWorkingChanges.onShutdown","Automatically store current working changes in the cloud on window close."),s("autoStoreWorkingChanges.off","Never attempt to automatically store working changes in the cloud.")],type:"string",tags:["experimental","usesOnlineServices"],default:"off",markdownDescription:s("autoStoreWorkingChangesDescription","Controls whether to automatically store available working changes in the cloud for the current workspace. This setting has no effect in the web.")},"workbench.cloudChanges.autoResume":{enum:["onReload","off"],enumDescriptions:[s("autoResumeWorkingChanges.onReload","Automatically resume available working changes from the cloud on window reload."),s("autoResumeWorkingChanges.off","Never attempt to resume working changes from the cloud.")],type:"string",tags:["usesOnlineServices"],default:"onReload",markdownDescription:s("autoResumeWorkingChanges","Controls whether to automatically resume available working changes stored in the cloud for the current workspace.")},"workbench.cloudChanges.continueOn":{enum:["prompt","off"],enumDescriptions:[s("continueOnCloudChanges.promptForAuth","Prompt the user to sign in to store working changes in the cloud with Continue Working On."),s("continueOnCloudChanges.off","Do not store working changes in the cloud with Continue Working On unless the user has already turned on Cloud Changes.")],type:"string",tags:["usesOnlineServices"],default:"prompt",markdownDescription:s("continueOnCloudChanges","Controls whether to prompt the user to store working changes in the cloud when using Continue Working On.")},"workbench.experimental.cloudChanges.partialMatches.enabled":{type:"boolean",tags:["experimental","usesOnlineServices"],default:!1,markdownDescription:s("cloudChangesPartialMatchesEnabled","Controls whether to surface cloud changes which partially match the current session.")}}});export{v as EditSessionsContribution};
