var j=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var L=(x,a,e,t)=>{for(var n=t>1?void 0:t?z(a,e):a,i=x.length-1,s;i>=0;i--)(s=x[i])&&(n=(t?s(a,e,n):s(n))||n);return t&&n&&j(a,e,n),n},E=(x,a)=>(e,t)=>a(e,t,x);import{Barrier as q}from"../../../../base/common/async.js";import{toErrorMessage as V}from"../../../../base/common/errorMessage.js";import{Emitter as b}from"../../../../base/common/event.js";import{MarkdownString as Q}from"../../../../base/common/htmlContent.js";import{Disposable as D,DisposableStore as X}from"../../../../base/common/lifecycle.js";import{Schemas as w}from"../../../../base/common/network.js";import*as _ from"../../../../base/common/performance.js";import{isCI as f}from"../../../../base/common/platform.js";import{isEqualOrParent as G}from"../../../../base/common/resources.js";import{StopWatch as J}from"../../../../base/common/stopwatch.js";import{isDefined as Y}from"../../../../base/common/types.js";import"../../../../base/common/uri.js";import*as u from"../../../../nls.js";import{IConfigurationService as Z}from"../../../../platform/configuration/common/configuration.js";import{IDialogService as ee}from"../../../../platform/dialogs/common/dialogs.js";import{InstallOperation as te}from"../../../../platform/extensionManagement/common/extensionManagement.js";import{ImplicitActivationEvents as C}from"../../../../platform/extensionManagement/common/implicitActivationEvents.js";import{ExtensionIdentifier as T,ExtensionIdentifierMap as ne}from"../../../../platform/extensions/common/extensions.js";import{IFileService as ie}from"../../../../platform/files/common/files.js";import{SyncDescriptor as oe}from"../../../../platform/instantiation/common/descriptors.js";import{IInstantiationService as se}from"../../../../platform/instantiation/common/instantiation.js";import{handleVetos as re}from"../../../../platform/lifecycle/common/lifecycle.js";import{ILogService as ae}from"../../../../platform/log/common/log.js";import{INotificationService as ce,Severity as I}from"../../../../platform/notification/common/notification.js";import{IProductService as le}from"../../../../platform/product/common/productService.js";import{Registry as de}from"../../../../platform/registry/common/platform.js";import{IRemoteAuthorityResolverService as xe,RemoteAuthorityResolverError as M,RemoteAuthorityResolverErrorCode as W,getRemoteAuthorityPrefix as he}from"../../../../platform/remote/common/remoteAuthorityResolver.js";import{IRemoteExtensionsScannerService as Ee}from"../../../../platform/remote/common/remoteExtensionsScanner.js";import{ITelemetryService as ve}from"../../../../platform/telemetry/common/telemetry.js";import{IWorkspaceContextService as ue}from"../../../../platform/workspace/common/workspace.js";import{IWorkbenchEnvironmentService as pe}from"../../environment/common/environmentService.js";import{Extensions as me}from"../../extensionManagement/common/extensionFeatures.js";import{IWorkbenchExtensionEnablementService as fe,IWorkbenchExtensionManagementService as ge}from"../../extensionManagement/common/extensionManagement.js";import{LockableExtensionDescriptionRegistry as _e}from"./extensionDescriptionRegistry.js";import{parseExtensionDevOptions as ye}from"./extensionDevOptions.js";import{ExtensionHostKind as S,ExtensionRunningPreference as Ie}from"./extensionHostKind.js";import{ExtensionHostManager as Se}from"./extensionHostManager.js";import"./extensionHostManagers.js";import"./extensionHostProxy.js";import{IExtensionManifestPropertiesService as be}from"./extensionManifestPropertiesService.js";import{LocalProcessRunningLocation as $,LocalWebWorkerRunningLocation as Re,RemoteRunningLocation as O}from"./extensionRunningLocation.js";import{ExtensionRunningLocationTracker as He,filterExtensionIdentifiers as Ae}from"./extensionRunningLocationTracker.js";import{ActivationKind as B,ActivationTimes as De,ExtensionHostStartup as N,ExtensionPointContribution as we,toExtension as Me,toExtensionDescription as Pe}from"./extensions.js";import"./extensionsProposedApi.js";import{ExtensionMessageCollector as ke,ExtensionsRegistry as Le}from"./extensionsRegistry.js";import{LazyCreateExtensionHostManager as Ce}from"./lazyCreateExtensionHostManager.js";import{ResponsiveState as K}from"./rpcProtocol.js";import{checkActivateWorkspaceContainsExtension as Te,checkGlobFileExists as We}from"./workspaceContains.js";import{ILifecycleService as $e,WillShutdownJoinerOrder as Oe}from"../../lifecycle/common/lifecycle.js";import{IRemoteAgentService as Be}from"../../remote/common/remoteAgentService.js";const P=Object.hasOwnProperty,Ne=Promise.resolve(void 0);let H=class extends D{constructor(e,t,n,i,s,o,r,c,l,h,p,v,k,Ve,Qe,Xe,Ge,Je,Ye,Ze){super();this._extensionsProposedApi=e;this._extensionHostFactory=t;this._extensionHostKindPicker=n;this._instantiationService=i;this._notificationService=s;this._environmentService=o;this._telemetryService=r;this._extensionEnablementService=c;this._fileService=l;this._productService=h;this._extensionManagementService=p;this._contextService=v;this._configurationService=k;this._extensionManifestPropertiesService=Ve;this._logService=Qe;this._remoteAgentService=Xe;this._remoteExtensionsScannerService=Ge;this._lifecycleService=Je;this._remoteAuthorityResolverService=Ye;this._dialogService=Ze;this._register(this._fileService.onWillActivateFileSystemProvider(d=>{d.scheme!==w.vscodeRemote&&d.join(this.activateByEvent(`onFileSystem:${d.scheme}`))})),this._runningLocations=new He(this._registry,this._extensionHostKindPicker,this._environmentService,this._configurationService,this._logService,this._extensionManifestPropertiesService),this._register(this._extensionEnablementService.onEnablementChanged(d=>{const m=[],g=[];for(const y of d)this._safeInvokeIsEnabled(y)?m.push(y):g.push(y);f&&this._logService.info(`AbstractExtensionService.onEnablementChanged fired for ${d.map(y=>y.identifier.id).join(", ")}`),this._handleDeltaExtensions(new R(m,g))})),this._register(this._extensionManagementService.onDidChangeProfile(({added:d,removed:m})=>{(d.length||m.length)&&(f&&this._logService.info("AbstractExtensionService.onDidChangeProfile fired"),this._handleDeltaExtensions(new R(d,m)))})),this._register(this._extensionManagementService.onDidEnableExtensions(d=>{d.length&&(f&&this._logService.info("AbstractExtensionService.onDidEnableExtensions fired"),this._handleDeltaExtensions(new R(d,[])))})),this._register(this._extensionManagementService.onDidInstallExtensions(d=>{const m=[];for(const{local:g,operation:y}of d)g&&g.isValid&&y!==te.Migrate&&this._safeInvokeIsEnabled(g)&&m.push(g);m.length&&(f&&this._logService.info(`AbstractExtensionService.onDidInstallExtensions fired for ${m.map(g=>g.identifier.id).join(", ")}`),this._handleDeltaExtensions(new R(m,[])))})),this._register(this._extensionManagementService.onDidUninstallExtension(d=>{d.error||(f&&this._logService.info(`AbstractExtensionService.onDidUninstallExtension fired for ${d.identifier.id}`),this._handleDeltaExtensions(new R([],[d.identifier.id])))})),this._register(this._lifecycleService.onWillShutdown(d=>{this._remoteAgentService.getConnection()?d.join(async()=>{try{await this._remoteAgentService.endConnection(),await this._doStopExtensionHosts(),this._remoteAgentService.getConnection()?.dispose()}catch{this._logService.warn("Error while disconnecting remote agent")}},{id:"join.disconnectRemote",label:u.localize("disconnectRemote","Disconnect Remote Agent"),order:Oe.Last}):d.join(this._doStopExtensionHosts(),{id:"join.stopExtensionHosts",label:u.localize("stopExtensionHosts","Stopping Extension Hosts")})}))}_serviceBrand;_onDidRegisterExtensions=this._register(new b);onDidRegisterExtensions=this._onDidRegisterExtensions.event;_onDidChangeExtensionsStatus=this._register(new b);onDidChangeExtensionsStatus=this._onDidChangeExtensionsStatus.event;_onDidChangeExtensions=this._register(new b({leakWarningThreshold:400}));onDidChangeExtensions=this._onDidChangeExtensions.event;_onWillActivateByEvent=this._register(new b);onWillActivateByEvent=this._onWillActivateByEvent.event;_onDidChangeResponsiveChange=this._register(new b);onDidChangeResponsiveChange=this._onDidChangeResponsiveChange.event;_onWillStop=this._register(new b);onWillStop=this._onWillStop.event;_activationEventReader=new ze;_registry=new _e(this._activationEventReader);_installedExtensionsReady=new q;_extensionStatus=new ne;_allRequestedActivateEvents=new Set;_runningLocations;_remoteCrashTracker=new A;_deltaExtensionsQueue=[];_inHandleDeltaExtensions=!1;_extensionHostManagers=this._register(new Ke);_resolveAuthorityAttempt=0;_getExtensionHostManagers(e){return this._extensionHostManagers.getByKind(e)}async _handleDeltaExtensions(e){if(this._deltaExtensionsQueue.push(e),this._inHandleDeltaExtensions)return;let t=null;try{for(this._inHandleDeltaExtensions=!0,await this._installedExtensionsReady.wait(),t=await this._registry.acquireLock("handleDeltaExtensions");this._deltaExtensionsQueue.length>0;){const n=this._deltaExtensionsQueue.shift();await this._deltaExtensions(t,n.toAdd,n.toRemove)}}finally{this._inHandleDeltaExtensions=!1,t?.dispose()}}async _deltaExtensions(e,t,n){f&&this._logService.info(`AbstractExtensionService._deltaExtensions: toAdd: [${t.map(r=>r.identifier.id).join(",")}] toRemove: [${n.map(r=>typeof r=="string"?r:r.identifier.id).join(",")}]`);let i=[];for(let r=0,c=n.length;r<c;r++){const l=n[r],h=typeof l=="string"?l:l.identifier.id,p=typeof l=="string"?null:l,v=this._registry.getExtensionDescription(h);v&&(p&&v.extensionLocation.scheme!==p.location.scheme||this.canRemoveExtension(v)&&i.push(v))}const s=[];for(let r=0,c=t.length;r<c;r++){const l=t[r],h=Pe(l,!1);h&&this._canAddExtension(h,i)&&s.push(h)}if(s.length===0&&i.length===0)return;const o=this._registry.deltaExtensions(e,s,i.map(r=>r.identifier));this._onDidChangeExtensions.fire({added:s,removed:i}),i=i.concat(o.removedDueToLooping),o.removedDueToLooping.length>0&&this._notificationService.notify({severity:I.Error,message:u.localize("looping","The following extensions contain dependency loops and have been disabled: {0}",o.removedDueToLooping.map(r=>`'${r.identifier.value}'`).join(", "))}),this._extensionsProposedApi.updateEnabledApiProposals(s),this._doHandleExtensionPoints([].concat(s).concat(i)),await this._updateExtensionsOnExtHosts(o.versionId,s,i.map(r=>r.identifier));for(let r=0;r<s.length;r++)this._activateAddedExtensionIfNeeded(s[r])}async _updateExtensionsOnExtHosts(e,t,n){const i=this._runningLocations.deltaExtensions(t,n),s=this._extensionHostManagers.map(o=>this._updateExtensionsOnExtHost(o,e,t,n,i));await Promise.all(s)}async _updateExtensionsOnExtHost(e,t,n,i,s){const o=this._runningLocations.filterByExtensionHostManager(n,e),r=Ae(i,s,l=>e.representsRunningLocation(l)),c=C.createActivationEventsMap(n);if(f){const l=p=>p.map(v=>v.identifier.value).join(","),h=p=>p.map(v=>v.value).join(",");this._logService.info(`AbstractExtensionService: Calling deltaExtensions: toRemove: [${h(i)}], toAdd: [${l(n)}], myToRemove: [${h(r)}], myToAdd: [${l(o)}],`)}await e.deltaExtensions({versionId:t,toRemove:i,toAdd:n,addActivationEvents:c,myToRemove:r,myToAdd:o.map(l=>l.identifier)})}canAddExtension(e){return this._canAddExtension(e,[])}_canAddExtension(e,t){if(this._registry.getExtensionDescriptionByIdOrUUID(e.identifier,e.id)&&!t.some(c=>T.equals(e.identifier,c.identifier)))return!1;const i=this._runningLocations.readExtensionKinds(e),s=e.extensionLocation.scheme===w.vscodeRemote;return this._extensionHostKindPicker.pickExtensionHostKind(e.identifier,i,!s,s,Ie.None)!==null}canRemoveExtension(e){const t=this._registry.getExtensionDescription(e.identifier);return!(!t||this._extensionStatus.get(t.identifier)?.activationStarted)}async _activateAddedExtensionIfNeeded(e){let t=!1,n=null,i=!1;const s=this._activationEventReader.readActivationEvents(e);for(const o of s){if(this._allRequestedActivateEvents.has(o)){t=!0,n=o;break}if(o==="*"){t=!0,n=o;break}if(/^workspaceContains/.test(o)&&(i=!0),o==="onStartupFinished"){t=!0,n=o;break}}if(t)await Promise.all(this._extensionHostManagers.map(o=>o.activate(e.identifier,{startup:!1,extensionId:e.identifier,activationEvent:n}))).then(()=>{});else if(i){const o=await this._contextService.getCompleteWorkspace(),r=!!this._environmentService.remoteAuthority,c={logService:this._logService,folders:o.folders.map(h=>h.uri),forceUsingSearch:r,exists:h=>this._fileService.exists(h),checkExists:(h,p,v)=>this._instantiationService.invokeFunction(k=>We(k,h,p,v))},l=await Te(c,e);if(!l)return;await Promise.all(this._extensionHostManagers.map(h=>h.activate(e.identifier,{startup:!1,extensionId:e.identifier,activationEvent:l.activationEvent}))).then(()=>{})}}async _initialize(){_.mark("code/willLoadExtensions"),this._startExtensionHostsIfNecessary(!0,[]);const e=await this._registry.acquireLock("_initialize");try{const t=await this._resolveExtensions();this._processExtensions(e,t);const n=this._registry.getSnapshot();for(const i of this._extensionHostManagers)if(i.startup!==N.EagerAutoStart){const s=this._runningLocations.filterByExtensionHostManager(n.extensions,i);i.start(n.versionId,n.extensions,s.map(o=>o.identifier))}}finally{e.dispose()}this._releaseBarrier(),_.mark("code/didLoadExtensions"),await this._handleExtensionTests()}_processExtensions(e,t){const{allowRemoteExtensionsInLocalWebWorker:n,hasLocalProcess:i}=t,s=U(this._logService,this._extensionEnablementService,this._extensionsProposedApi,t.local,!1);let o=U(this._logService,this._extensionEnablementService,this._extensionsProposedApi,t.remote,!1);this._runningLocations.initializeRunningLocation(s,o),this._startExtensionHostsIfNecessary(!0,[]);const r=n?this._runningLocations.filterByExtensionHostKind(o,S.LocalWebWorker):[],c=i?this._runningLocations.filterByExtensionHostKind(s,S.LocalProcess):[],l=this._runningLocations.filterByExtensionHostKind(s,S.LocalWebWorker);o=this._runningLocations.filterByExtensionHostKind(o,S.Remote);for(const v of r)Fe(l,v.identifier)||l.push(v);const h=o.concat(c).concat(l),p=this._registry.deltaExtensions(e,h,[]);p.removedDueToLooping.length>0&&this._notificationService.notify({severity:I.Error,message:u.localize("looping","The following extensions contain dependency loops and have been disabled: {0}",p.removedDueToLooping.map(v=>`'${v.identifier.value}'`).join(", "))}),this._doHandleExtensionPoints(this._registry.getAllExtensionDescriptions())}async _handleExtensionTests(){if(!this._environmentService.isExtensionDevelopment||!this._environmentService.extensionTestsLocationURI)return;const e=this.findTestExtensionHost(this._environmentService.extensionTestsLocationURI);if(!e){const n=u.localize("extensionTestError","No extension host found that can launch the test runner at {0}.",this._environmentService.extensionTestsLocationURI.toString());this._notificationService.error(n);return}let t;try{t=await e.extensionTestsExecute(),f&&this._logService.info(`Extension host test runner exit code: ${t}`)}catch(n){f&&this._logService.error("Extension host test runner error",n),t=1}this._onExtensionHostExit(t)}findTestExtensionHost(e){let t=null;for(const n of this._registry.getAllExtensionDescriptions())if(G(e,n.extensionLocation)){t=this._runningLocations.getRunningLocation(n.identifier);break}return t===null&&(e.scheme===w.vscodeRemote?t=new O:t=new $(0)),t!==null?this._extensionHostManagers.getByRunningLocation(t):null}_releaseBarrier(){this._installedExtensionsReady.open(),this._onDidRegisterExtensions.fire(void 0),this._onDidChangeExtensionsStatus.fire(this._registry.getAllExtensionDescriptions().map(e=>e.identifier))}async _resolveAuthorityInitial(e){for(let n=1;;n++)try{return this._resolveAuthorityWithLogging(e)}catch(i){if(M.isNoResolverFound(i)||M.isNotAvailable(i)||n>=5)throw i}}async _resolveAuthorityAgain(){const e=this._environmentService.remoteAuthority;if(e){this._remoteAuthorityResolverService._clearResolvedAuthority(e);try{const t=await this._resolveAuthorityWithLogging(e);this._remoteAuthorityResolverService._setResolvedAuthority(t.authority,t.options)}catch(t){this._remoteAuthorityResolverService._setResolvedAuthorityError(e,t)}}}async _resolveAuthorityWithLogging(e){const t=he(e),n=J.create(!1);this._logService.info(`Invoking resolveAuthority(${t})...`);try{_.mark(`code/willResolveAuthority/${t}`);const i=await this._resolveAuthority(e);return _.mark(`code/didResolveAuthorityOK/${t}`),this._logService.info(`resolveAuthority(${t}) returned '${i.authority.connectTo}' after ${n.elapsed()} ms`),i}catch(i){throw _.mark(`code/didResolveAuthorityError/${t}`),this._logService.error(`resolveAuthority(${t}) returned an error after ${n.elapsed()} ms`,i),i}}async _resolveAuthorityOnExtensionHosts(e,t){const n=this._getExtensionHostManagers(e);if(n.length===0)throw new Error("Cannot resolve authority");this._resolveAuthorityAttempt++;const i=await Promise.all(n.map(o=>o.resolveAuthority(t,this._resolveAuthorityAttempt)));let s=null;for(const o of i){if(o.type==="ok")return o.value;if(!s){s=o;continue}const r=s.error.code===W.Unknown,c=o.error.code===W.Unknown;r&&!c&&(s=o)}throw new M(s.error.message,s.error.code,s.error.detail)}stopExtensionHosts(e,t){return this._doStopExtensionHostsWithVeto(e,t)}async _doStopExtensionHosts(){const e=[];for(const t of this._extensionStatus.values())t.activationStarted&&e.push(t.id);await this._extensionHostManagers.stopAllInReverse();for(const t of this._extensionStatus.values())t.clearRuntimeStatus();e.length>0&&this._onDidChangeExtensionsStatus.fire(e)}async _doStopExtensionHostsWithVeto(e,t=!1){if(t&&this._environmentService.isExtensionDevelopment)return!1;const n=[],i=new Set;this._onWillStop.fire({reason:e,auto:t,veto(o,r){n.push(o),typeof o=="boolean"?o===!0&&i.add(r):o.then(c=>{c&&i.add(r)}).catch(c=>{i.add(u.localize("extensionStopVetoError","{0} (Error: {1})",r,V(c)))})}});const s=await re(n,o=>this._logService.error(o));if(!s)await this._doStopExtensionHosts();else if(!t){const o=Array.from(i);this._logService.warn(`Extension host was not stopped because of veto (stop reason: ${e}, veto reason: ${o.join(", ")})`),await this._dialogService.warn(u.localize("extensionStopVetoMessage","The following operation was blocked: {0}",e),o.length===1?u.localize("extensionStopVetoDetailsOne","The reason for blocking the operation: {0}",o[0]):u.localize("extensionStopVetoDetailsMany",`The reasons for blocking the operation:
- {0}`,o.join(`
 -`)))}return!s}_startExtensionHostsIfNecessary(e,t){const n=[];for(let i=0;i<=this._runningLocations.maxLocalProcessAffinity;i++)n.push(new $(i));for(let i=0;i<=this._runningLocations.maxLocalWebWorkerAffinity;i++)n.push(new Re(i));n.push(new O);for(const i of n){if(this._extensionHostManagers.getByRunningLocation(i))continue;const s=this._createExtensionHostManager(i,e,t);if(s){const[o,r]=s;this._extensionHostManagers.add(o,r)}}}_createExtensionHostManager(e,t,n){const i=this._extensionHostFactory.createExtensionHost(this._runningLocations,e,t);if(!i)return null;const s=this._doCreateExtensionHostManager(i,n),o=new X;return o.add(s.onDidExit(([r,c])=>this._onExtensionHostCrashOrExit(s,r,c))),o.add(s.onDidChangeResponsiveState(r=>{this._logService.info(`Extension host (${s.friendyName}) is ${r===K.Responsive?"responsive":"unresponsive"}.`),this._onDidChangeResponsiveChange.fire({extensionHostKind:s.kind,isResponsive:r===K.Responsive,getInspectListener:c=>s.getInspectPort(c)})})),[s,o]}_doCreateExtensionHostManager(e,t){const n=this._acquireInternalAPI(e);return e.startup===N.Lazy&&t.length===0?this._instantiationService.createInstance(Ce,e,n):this._instantiationService.createInstance(Se,e,t,n)}_onExtensionHostCrashOrExit(e,t,n){if(!ye(this._environmentService).isExtensionDevHost){this._onExtensionHostCrashed(e,t,n);return}this._onExtensionHostExit(t)}_onExtensionHostCrashed(e,t,n){e.kind===S.LocalProcess?this._doStopExtensionHosts():e.kind===S.Remote&&(n&&this._onRemoteExtensionHostCrashed(e,n),this._extensionHostManagers.stopOne(e))}_getExtensionHostExitInfoWithTimeout(e){return new Promise((t,n)=>{const i=setTimeout(()=>{n(new Error("getExtensionHostExitInfo timed out"))},2e3);this._remoteAgentService.getExtensionHostExitInfo(e).then(s=>{clearTimeout(i),t(s)},n)})}async _onRemoteExtensionHostCrashed(e,t){try{const n=await this._getExtensionHostExitInfoWithTimeout(t);n&&this._logService.error(`Extension host (${e.friendyName}) terminated unexpectedly with code ${n.code}.`),this._logExtensionHostCrash(e),this._remoteCrashTracker.registerCrash(),this._remoteCrashTracker.shouldAutomaticallyRestart()?(this._logService.info("Automatically restarting the remote extension host."),this._notificationService.status(u.localize("extensionService.autoRestart","The remote extension host terminated unexpectedly. Restarting..."),{hideAfter:5e3}),this._startExtensionHostsIfNecessary(!1,Array.from(this._allRequestedActivateEvents.keys()))):this._notificationService.prompt(I.Error,u.localize("extensionService.crash","Remote Extension host terminated unexpectedly 3 times within the last 5 minutes."),[{label:u.localize("restart","Restart Remote Extension Host"),run:()=>{this._startExtensionHostsIfNecessary(!1,Array.from(this._allRequestedActivateEvents.keys()))}}])}catch{}}_logExtensionHostCrash(e){const t=[];for(const n of this._extensionStatus.values())n.activationStarted&&e.containsExtension(n.id)&&t.push(n.id);t.length>0?this._logService.error(`Extension host (${e.friendyName}) terminated unexpectedly. The following extensions were running: ${t.map(n=>n.value).join(", ")}`):this._logService.error(`Extension host (${e.friendyName}) terminated unexpectedly. No extensions were activated.`)}async startExtensionHosts(e){await this._doStopExtensionHosts(),e&&await this._handleDeltaExtensions(new R(e.toAdd,e.toRemove));const t=await this._registry.acquireLock("startExtensionHosts");try{this._startExtensionHostsIfNecessary(!1,Array.from(this._allRequestedActivateEvents.keys()));const n=this._getExtensionHostManagers(S.LocalProcess);await Promise.all(n.map(i=>i.ready()))}finally{t.dispose()}}activateByEvent(e,t=B.Normal){return this._installedExtensionsReady.isOpen()?(this._allRequestedActivateEvents.add(e),this._registry.containsActivationEvent(e)?this._activateByEvent(e,t):Ne):(this._allRequestedActivateEvents.add(e),t===B.Immediate?this._activateByEvent(e,t):this._installedExtensionsReady.wait().then(()=>this._activateByEvent(e,t)))}_activateByEvent(e,t){const n=Promise.all(this._extensionHostManagers.map(i=>i.activateByEvent(e,t))).then(()=>{});return this._onWillActivateByEvent.fire({event:e,activation:n}),n}activateById(e,t){return this._activateById(e,t)}activationEventIsDone(e){return this._installedExtensionsReady.isOpen()?this._registry.containsActivationEvent(e)?this._extensionHostManagers.every(t=>t.activationEventIsDone(e)):!0:!1}whenInstalledExtensionsRegistered(){return this._installedExtensionsReady.wait()}get extensions(){return this._registry.getAllExtensionDescriptions()}_getExtensionRegistrySnapshotWhenReady(){return this._installedExtensionsReady.wait().then(()=>this._registry.getSnapshot())}getExtension(e){return this._installedExtensionsReady.wait().then(()=>this._registry.getExtensionDescription(e))}readExtensionPointContributions(e){return this._installedExtensionsReady.wait().then(()=>{const t=this._registry.getAllExtensionDescriptions(),n=[];for(const i of t)i.contributes&&P.call(i.contributes,e.name)&&n.push(new we(i,i.contributes[e.name]));return n})}getExtensionsStatus(){const e=Object.create(null);if(this._registry){const t=this._registry.getAllExtensionDescriptions();for(const n of t){const i=this._extensionStatus.get(n.identifier);e[n.identifier.value]={id:n.identifier,messages:i?.messages??[],activationStarted:i?.activationStarted??!1,activationTimes:i?.activationTimes??void 0,runtimeErrors:i?.runtimeErrors??[],runningLocation:this._runningLocations.getRunningLocation(n.identifier)}}}return e}async getInspectPorts(e,t){return(await Promise.all(this._getExtensionHostManagers(e).map(i=>i.getInspectPort(t)))).filter(Y)}async setRemoteEnvironment(e){await this._extensionHostManagers.map(t=>t.setRemoteEnvironment(e))}_safeInvokeIsEnabled(e){try{return this._extensionEnablementService.isEnabled(e)}catch{return!1}}_doHandleExtensionPoints(e){const t=Object.create(null);for(const o of e)if(o.contributes)for(const r in o.contributes)P.call(o.contributes,r)&&(t[r]=!0);const n=o=>this._handleExtensionPointMessage(o),i=this._registry.getAllExtensionDescriptions(),s=Le.getExtensionPoints();_.mark("code/willHandleExtensionPoints");for(const o of s)t[o.name]&&(_.mark(`code/willHandleExtensionPoint/${o.name}`),H._handleExtensionPoint(o,i,n),_.mark(`code/didHandleExtensionPoint/${o.name}`));_.mark("code/didHandleExtensionPoints")}_getOrCreateExtensionStatus(e){return this._extensionStatus.has(e)||this._extensionStatus.set(e,new je(e)),this._extensionStatus.get(e)}_handleExtensionPointMessage(e){this._getOrCreateExtensionStatus(e.extensionId).addMessage(e);const n=this._registry.getExtensionDescription(e.extensionId),i=`[${e.extensionId.value}]: ${e.message}`;if(e.type===I.Error?(n&&n.isUnderDevelopment&&this._notificationService.notify({severity:I.Error,message:i}),this._logService.error(i)):e.type===I.Warning?(n&&n.isUnderDevelopment&&this._notificationService.notify({severity:I.Warning,message:i}),this._logService.warn(i)):this._logService.info(i),e.extensionId&&this._environmentService.isBuilt&&!this._environmentService.isExtensionDevelopment){const{type:s,extensionId:o,extensionPointId:r,message:c}=e;this._telemetryService.publicLog2("extensionsMessage",{type:s,extensionId:o.value,extensionPointId:r,message:c})}}static _handleExtensionPoint(e,t,n){const i=[];for(const s of t)s.contributes&&P.call(s.contributes,e.name)&&i.push({description:s,value:s.contributes[e.name],collector:new ke(n,s,e.name)});e.acceptUsers(i)}_acquireInternalAPI(e){return{_activateById:(t,n)=>this._activateById(t,n),_onWillActivateExtension:t=>this._onWillActivateExtension(t,e.runningLocation),_onDidActivateExtension:(t,n,i,s,o)=>this._onDidActivateExtension(t,n,i,s,o),_onDidActivateExtensionError:(t,n)=>this._onDidActivateExtensionError(t,n),_onExtensionRuntimeError:(t,n)=>this._onExtensionRuntimeError(t,n)}}async _activateById(e,t){if(!(await Promise.all(this._extensionHostManagers.map(s=>s.activate(e,t)))).some(s=>s))throw new Error(`Unknown extension ${e.value}`)}_onWillActivateExtension(e,t){this._runningLocations.set(e,t),this._getOrCreateExtensionStatus(e).onWillActivate()}_onDidActivateExtension(e,t,n,i,s){this._getOrCreateExtensionStatus(e).setActivationTimes(new De(t,n,i,s)),this._onDidChangeExtensionsStatus.fire([e])}_onDidActivateExtensionError(e,t){this._telemetryService.publicLog2("extensionActivationError",{extensionId:e.value,error:t.message})}_onExtensionRuntimeError(e,t){this._getOrCreateExtensionStatus(e).addRuntimeError(t),this._onDidChangeExtensionsStatus.fire([e])}};H=L([E(3,se),E(4,ce),E(5,pe),E(6,ve),E(7,fe),E(8,ie),E(9,le),E(10,ge),E(11,ue),E(12,Z),E(13,be),E(14,ae),E(15,Be),E(16,Ee),E(17,$e),E(18,xe),E(19,ee)],H);class Ke extends D{_extensionHostManagers=[];dispose(){for(let a=this._extensionHostManagers.length-1;a>=0;a--){const e=this._extensionHostManagers[a];e.extensionHost.disconnect(),e.dispose()}this._extensionHostManagers=[],super.dispose()}add(a,e){this._extensionHostManagers.push(new Ue(a,e))}async stopAllInReverse(){for(let a=this._extensionHostManagers.length-1;a>=0;a--){const e=this._extensionHostManagers[a];await e.extensionHost.disconnect(),e.dispose()}this._extensionHostManagers=[]}async stopOne(a){const e=this._extensionHostManagers.findIndex(t=>t.extensionHost===a);e>=0&&(this._extensionHostManagers.splice(e,1),await a.disconnect(),a.dispose())}getByKind(a){return this.filter(e=>e.kind===a)}getByRunningLocation(a){for(const e of this._extensionHostManagers)if(e.extensionHost.representsRunningLocation(a))return e.extensionHost;return null}*[Symbol.iterator](){for(const a of this._extensionHostManagers)yield a.extensionHost}map(a){return this._extensionHostManagers.map(e=>a(e.extensionHost))}every(a){return this._extensionHostManagers.every(e=>a(e.extensionHost))}filter(a){return this._extensionHostManagers.filter(e=>a(e.extensionHost)).map(e=>e.extensionHost)}}class Ue{constructor(a,e){this.extensionHost=a;this.disposableStore=e}dispose(){this.disposableStore.dispose(),this.extensionHost.dispose()}}class Dn{constructor(a,e,t,n){this.local=a;this.remote=e;this.hasLocalProcess=t;this.allowRemoteExtensionsInLocalWebWorker=n}}class R{constructor(a,e){this.toAdd=a;this.toRemove=e}}function U(x,a,e,t,n){return e.updateEnabledApiProposals(t),F(x,a,t,n)}function F(x,a,e,t){const n=[],i=[],s=[];for(const r of e)r.isUnderDevelopment?n.push(r):(i.push(r),s.push(Me(r)));const o=a.getEnablementStates(s,t?{trusted:!0}:void 0);for(let r=0;r<o.length;r++)a.isEnabledEnablementState(o[r])?n.push(i[r]):f&&x.info(`filterEnabledExtensions: extension '${i[r].identifier.value}' is disabled`);return n}function wn(x,a,e,t){return F(x,a,[e],t).includes(e)}function Fe(x,a){for(const e of x)if(T.equals(e.identifier,a))return!0;return!1}class je{constructor(a){this.id=a}_messages=[];get messages(){return this._messages}_activationTimes=null;get activationTimes(){return this._activationTimes}_runtimeErrors=[];get runtimeErrors(){return this._runtimeErrors}_activationStarted=!1;get activationStarted(){return this._activationStarted}clearRuntimeStatus(){this._activationStarted=!1,this._activationTimes=null,this._runtimeErrors=[]}addMessage(a){this._messages.push(a)}setActivationTimes(a){this._activationTimes=a}addRuntimeError(a){this._runtimeErrors.push(a)}onWillActivate(){this._activationStarted=!0}}class A{static _TIME_LIMIT=5*60*1e3;static _CRASH_LIMIT=3;_recentCrashes=[];_removeOldCrashes(){const a=Date.now()-A._TIME_LIMIT;for(;this._recentCrashes.length>0&&this._recentCrashes[0].timestamp<a;)this._recentCrashes.shift()}registerCrash(){this._removeOldCrashes(),this._recentCrashes.push({timestamp:Date.now()})}shouldAutomaticallyRestart(){return this._removeOldCrashes(),this._recentCrashes.length<A._CRASH_LIMIT}}class ze{readActivationEvents(a){return C.readActivationEvents(a)}}class qe extends D{type="markdown";shouldRender(a){return!!a.activationEvents}render(a){const e=a.activationEvents||[],t=new Q;if(e.length)for(const n of e)t.appendMarkdown(`- \`${n}\`
`);return{data:t,dispose:()=>{}}}}de.as(me.ExtensionFeaturesRegistry).registerExtensionFeature({id:"activationEvents",label:u.localize("activation","Activation Events"),access:{canToggle:!1},renderer:new oe(qe)});export{H as AbstractExtensionService,A as ExtensionHostCrashTracker,je as ExtensionStatus,ze as ImplicitActivationAwareReader,Dn as ResolvedExtensions,U as checkEnabledAndProposedAPI,wn as extensionIsEnabled,F as filterEnabledExtensions};
