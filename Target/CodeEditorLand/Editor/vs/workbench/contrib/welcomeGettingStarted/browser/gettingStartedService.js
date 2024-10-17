var $=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var A=(n,a,e,t)=>{for(var i=t>1?void 0:t?z(a,e):a,r=n.length-1,g;r>=0;r--)(g=n[r])&&(i=(t?g(a,e,i):g(i))||i);return t&&i&&$(a,e,i),i},l=(n,a)=>(e,t)=>a(e,t,n);import{createDecorator as V,IInstantiationService as H}from"../../../../platform/instantiation/common/instantiation.js";import{Emitter as C}from"../../../../base/common/event.js";import{IStorageService as R,StorageScope as v,StorageTarget as k}from"../../../../platform/storage/common/storage.js";import{Memento as N}from"../../../common/memento.js";import{Action2 as J,registerAction2 as X}from"../../../../platform/actions/common/actions.js";import{ICommandService as q}from"../../../../platform/commands/common/commands.js";import{ContextKeyExpr as p,IContextKeyService as Q,RawContextKey as j}from"../../../../platform/contextkey/common/contextkey.js";import{Disposable as Y}from"../../../../base/common/lifecycle.js";import{IUserDataSyncEnablementService as Z}from"../../../../platform/userDataSync/common/userDataSync.js";import"../../../../platform/extensions/common/extensions.js";import{URI as b}from"../../../../base/common/uri.js";import{joinPath as L}from"../../../../base/common/resources.js";import{FileAccess as u}from"../../../../base/common/network.js";import{EXTENSION_INSTALL_DEP_PACK_CONTEXT as ee,EXTENSION_INSTALL_SKIP_WALKTHROUGH_CONTEXT as te,IExtensionManagementService as ie}from"../../../../platform/extensionManagement/common/extensionManagement.js";import"../../../../base/common/themables.js";import{walkthroughs as K}from"../common/gettingStartedContent.js";import{IWorkbenchAssignmentService as re}from"../../../services/assignment/common/assignmentService.js";import{IHostService as oe}from"../../../services/host/browser/host.js";import{IConfigurationService as ne}from"../../../../platform/configuration/common/configuration.js";import{parseLinkedText as se}from"../../../../base/common/linkedText.js";import{walkthroughsExtensionPoint as ae}from"./gettingStartedExtensionPoint.js";import{InstantiationType as he,registerSingleton as ge}from"../../../../platform/instantiation/common/extensions.js";import{dirname as le}from"../../../../base/common/path.js";import{coalesce as de}from"../../../../base/common/arrays.js";import{IViewsService as ce}from"../../../services/views/common/viewsService.js";import{localize as pe,localize2 as P}from"../../../../nls.js";import{ITelemetryService as me}from"../../../../platform/telemetry/common/telemetry.js";import{checkGlobFileExists as ue}from"../../../services/extensions/common/workspaceContains.js";import{IWorkspaceContextService as ve}from"../../../../platform/workspace/common/workspace.js";import{CancellationTokenSource as Se}from"../../../../base/common/cancellation.js";import{DefaultIconPath as fe}from"../../../services/extensionManagement/common/extensionManagement.js";const ke=new j("hasMultipleNewFileEntries",!1),B=V("walkthroughsService"),Ie="workbench.welcomePage.hiddenCategories",D="workbench.welcomePage.walkthroughMetadata",ye=pe("builtin","Built-In"),we=24*60*60*1e3,T=7*we;let y=class extends Y{constructor(e,t,i,r,g,c,o,d,h,S,m,f){super();this.storageService=e;this.commandService=t;this.instantiationService=i;this.workspaceContextService=r;this.contextService=g;this.userDataSyncEnablementService=c;this.configurationService=o;this.extensionManagementService=d;this.hostService=h;this.viewsService=S;this.telemetryService=m;this.tasExperimentService=f;this.metadata=new Map(JSON.parse(this.storageService.get(D,v.PROFILE,"[]"))),this.memento=new N("gettingStartedService",this.storageService),this.stepProgress=this.memento.getMemento(v.PROFILE,k.USER),this.initCompletionEventListeners(),ke.bindTo(this.contextService).set(!1),this.registerWalkthroughs()}_onDidAddWalkthrough=new C;onDidAddWalkthrough=this._onDidAddWalkthrough.event;_onDidRemoveWalkthrough=new C;onDidRemoveWalkthrough=this._onDidRemoveWalkthrough.event;_onDidChangeWalkthrough=new C;onDidChangeWalkthrough=this._onDidChangeWalkthrough.event;_onDidProgressStep=new C;onDidProgressStep=this._onDidProgressStep.event;memento;stepProgress;sessionEvents=new Set;completionListeners=new Map;gettingStartedContributions=new Map;steps=new Map;sessionInstalledExtensions=new Set;categoryVisibilityContextKeys=new Set;stepCompletionContextKeyExpressions=new Set;stepCompletionContextKeys=new Set;metadata;registerWalkthroughs(){K.forEach(async(e,t)=>{this._registerWalkthrough({...e,icon:{type:"icon",icon:e.icon},order:K.length-t,source:ye,when:p.deserialize(e.when)??p.true(),steps:e.content.steps.map((i,r)=>({...i,completionEvents:i.completionEvents??[],description:U(i.description),category:e.id,order:r,when:p.deserialize(i.when)??p.true(),media:i.media.type==="image"?{type:"image",altText:i.media.altText,path:Ee(i.media.path)}:i.media.type==="svg"?{type:"svg",altText:i.media.altText,path:G(i.media.path).with({query:JSON.stringify({moduleId:"vs/workbench/contrib/welcomeGettingStarted/common/media/"+i.media.path})})}:{type:"markdown",path:G(i.media.path).with({query:JSON.stringify({moduleId:"vs/workbench/contrib/welcomeGettingStarted/common/media/"+i.media.path})}),base:u.asFileUri("vs/workbench/contrib/welcomeGettingStarted/common/media/"),root:u.asFileUri("vs/workbench/contrib/welcomeGettingStarted/common/media/")}}))})}),ae.setHandler((e,{added:t,removed:i})=>{t.map(r=>this.registerExtensionWalkthroughContributions(r.description)),i.map(r=>this.unregisterExtensionWalkthroughContributions(r.description))})}initCompletionEventListeners(){this._register(this.commandService.onDidExecuteCommand(e=>this.progressByEvent(`onCommand:${e.commandId}`))),this.extensionManagementService.getInstalled().then(e=>{e.forEach(t=>this.progressByEvent(`extensionInstalled:${t.identifier.id.toLowerCase()}`))}),this._register(this.extensionManagementService.onDidInstallExtensions(e=>{for(const t of e)t?.context?.[te]||t?.context?.[ee]||this.sessionInstalledExtensions.add(t.identifier.id.toLowerCase()),this.progressByEvent(`extensionInstalled:${t.identifier.id.toLowerCase()}`)})),this._register(this.contextService.onDidChangeContext(e=>{e.affectsSome(this.stepCompletionContextKeys)&&this.stepCompletionContextKeyExpressions.forEach(t=>{e.affectsSome(new Set(t.keys()))&&this.contextService.contextMatchesRules(t)&&this.progressByEvent("onContext:"+t.serialize())})})),this._register(this.viewsService.onDidChangeViewVisibility(e=>{e.visible&&this.progressByEvent("onView:"+e.id)})),this._register(this.configurationService.onDidChangeConfiguration(e=>{e.affectedKeys.forEach(t=>{this.progressByEvent("onSettingChanged:"+t)})})),this.userDataSyncEnablementService.isEnabled()&&this.progressByEvent("onEvent:sync-enabled"),this._register(this.userDataSyncEnablementService.onDidChangeEnablement(()=>{this.userDataSyncEnablementService.isEnabled()&&this.progressByEvent("onEvent:sync-enabled")}))}markWalkthroughOpened(e){const t=this.gettingStartedContributions.get(e),i=this.metadata.get(e);i&&t&&this.metadata.set(e,{...i,manaullyOpened:!0,stepIDs:t.steps.map(r=>r.id)}),this.storageService.store(D,JSON.stringify([...this.metadata.entries()]),v.PROFILE,k.USER)}async registerExtensionWalkthroughContributions(e){const t=o=>o.startsWith("https://")?b.parse(o,!0):u.uriToFileUri(L(e.extensionLocation,o)),i=o=>{const d=h=>h.startsWith("https://")?b.parse(h,!0):u.uriToBrowserUri(L(e.extensionLocation,h));if(typeof o=="string"){const h=d(o);return{hcDark:h,hcLight:h,dark:h,light:h}}else return{hcDark:d(o.hc),hcLight:d(o.hcLight??o.light),light:d(o.light),dark:d(o.dark)}};if(!e.contributes?.walkthroughs?.length)return;let r,g=Math.min();await Promise.all(e.contributes?.walkthroughs?.map(async(o,d)=>{const h=e.identifier.value+"#"+o.id,S=!this.metadata.get(h);S&&this.metadata.set(h,{firstSeen:+new Date,stepIDs:o.steps?.map(s=>s.id)??[],manaullyOpened:!1});const m=await Promise.race([this.tasExperimentService?.getTreatment(`gettingStarted.overrideCategory.${e.identifier.value+"."+o.id}.when`),new Promise(s=>setTimeout(()=>s(o.when),5e3))]);this.sessionInstalledExtensions.has(e.identifier.value.toLowerCase())&&this.contextService.contextMatchesRules(p.deserialize(m??o.when)??p.true())&&(this.sessionInstalledExtensions.delete(e.identifier.value.toLowerCase()),d<g&&S&&(r=h,g=d));const f=(o.steps??[]).map((s,E)=>{const I=U(s.description||""),F=e.identifier.value+"#"+o.id+"#"+s.id;let W;if(!s.media)throw Error("missing media in walkthrough step: "+o.id+"@"+s.id);if(s.media.image){const x=s.media.altText;W={type:"image",altText:x,path:i(s.media.image)}}else if(s.media.markdown)W={type:"markdown",path:t(s.media.markdown),base:t(le(s.media.markdown)),root:u.uriToFileUri(e.extensionLocation)};else if(s.media.svg)W={type:"svg",path:t(s.media.svg),altText:s.media.svg};else throw new Error("Unknown walkthrough format detected for "+F);return{description:I,media:W,completionEvents:s.completionEvents?.filter(x=>typeof x=="string")??[],id:F,title:s.title,when:p.deserialize(s.when)??p.true(),category:h,order:E}});let O=!1;if(o.featuredFor){const s=this.workspaceContextService.getWorkspace().folders.map(I=>I.uri),E=new Se;setTimeout(()=>E.cancel(),2e3),O=await this.instantiationService.invokeFunction(I=>ue(I,s,o.featuredFor,E.token))}const _=o.icon??e.icon,M={description:o.description,title:o.title,id:h,isFeatured:O,source:e.displayName??e.name,order:0,walkthroughPageTitle:e.displayName??e.name,steps:f,icon:{type:"image",path:_?u.uriToBrowserUri(L(e.extensionLocation,_)).toString(!0):fe},when:p.deserialize(m??o.when)??p.true()};this._registerWalkthrough(M),this._onDidAddWalkthrough.fire(this.resolveWalkthrough(M))})),this.storageService.store(D,JSON.stringify([...this.metadata.entries()]),v.PROFILE,k.USER),await this.hostService.hadLastFocus()&&r&&this.configurationService.getValue("workbench.welcomePage.walkthroughs.openOnInstall")&&(this.telemetryService.publicLog2("gettingStarted.didAutoOpenWalkthrough",{id:r}),this.commandService.executeCommand("workbench.action.openWalkthrough",r,!0))}unregisterExtensionWalkthroughContributions(e){e.contributes?.walkthroughs?.length&&e.contributes?.walkthroughs?.forEach(t=>{const i=e.identifier.value+"#"+t.id;t.steps.forEach(r=>{const g=e.identifier.value+"#"+t.id+"#"+r.id;this.steps.delete(g)}),this.gettingStartedContributions.delete(i),this._onDidRemoveWalkthrough.fire(i)})}getWalkthrough(e){const t=this.gettingStartedContributions.get(e);if(!t)throw Error("Trying to get unknown walkthrough: "+e);return this.resolveWalkthrough(t)}getWalkthroughs(){return[...this.gettingStartedContributions.values()].map(i=>({...i,content:{type:"steps",steps:i.steps}})).filter(i=>i.content.type!=="steps"||i.content.steps.length).map(i=>this.resolveWalkthrough(i))}resolveWalkthrough(e){const t=e.steps.map(m=>this.getStepProgress(m)),i=this.metadata.get(e.id)?.manaullyOpened,r=this.metadata.get(e.id)?.firstSeen,g=r&&r>+new Date-T,c=this.metadata.get(e.id)?.stepIDs,o=this.gettingStartedContributions.get(e.id);if(!o)throw Error("Could not find walkthrough with id "+e.id);const d=o.steps.map(m=>m.id),h=c&&(d.length!==c.length||d.some((m,f)=>m!==c[f]));let S=0;if(r){const f=+new Date-r;S=Math.max(0,(T-f)/T)}return{...e,recencyBonus:S,steps:t,newItems:!!h,newEntry:!!(g&&!i)}}getStepProgress(e){return{...e,done:!1,...this.stepProgress[e.id]}}progressStep(e){const t=this.stepProgress[e];if(!t||t.done!==!0){this.stepProgress[e]={done:!0},this.memento.saveMemento();const i=this.getStep(e);if(!i)throw Error("Tried to progress unknown step");this._onDidProgressStep.fire(this.getStepProgress(i))}}deprogressStep(e){delete this.stepProgress[e],this.memento.saveMemento();const t=this.getStep(e);this._onDidProgressStep.fire(this.getStepProgress(t))}progressByEvent(e){this.sessionEvents.has(e)||(this.sessionEvents.add(e),this.completionListeners.get(e)?.forEach(t=>this.progressStep(t)))}registerWalkthrough(e){this._registerWalkthrough({...e,steps:e.steps.map(t=>({...t,description:U(t.description)}))})}_registerWalkthrough(e){this.gettingStartedContributions.get(e.id)||(this.gettingStartedContributions.set(e.id,e),e.steps.forEach(i=>{if(this.steps.has(i.id))throw Error("Attempting to register step with id "+i.id+" twice. Second is dropped.");this.steps.set(i.id,i),i.when.keys().forEach(r=>this.categoryVisibilityContextKeys.add(r)),this.registerDoneListeners(i)}),e.when.keys().forEach(i=>this.categoryVisibilityContextKeys.add(i)))}registerDoneListeners(e){if(!e.doneOn){e.completionEvents.length||(e.completionEvents=de(e.description.filter(t=>t.nodes.length===1).flatMap(t=>t.nodes.filter(i=>typeof i!="string").map(({href:i})=>{if(i.startsWith("command:"))return"onCommand:"+i.slice(8,i.includes("?")?i.indexOf("?"):void 0);if(i.startsWith("https://")||i.startsWith("http://"))return"onLink:"+i})))),e.completionEvents.length||e.completionEvents.push("stepSelected");for(let t of e.completionEvents){const[i,r,g]=/^([^:]*):?(.*)$/.exec(t)??[];if(r){switch(r){case"onLink":case"onEvent":case"onView":case"onSettingChanged":break;case"onContext":{const c=p.deserialize(g);c&&(this.stepCompletionContextKeyExpressions.add(c),c.keys().forEach(o=>this.stepCompletionContextKeys.add(o)),t=r+":"+c.serialize(),this.contextService.contextMatchesRules(c)&&this.sessionEvents.add(t));break}case"onStepSelected":case"stepSelected":t="stepSelected:"+e.id;break;case"onCommand":t=r+":"+g.replace(/^toSide:/,"");break;case"onExtensionInstalled":case"extensionInstalled":t="extensionInstalled:"+g.toLowerCase();break;default:continue}this.registerCompletionListener(t,e)}}}}registerCompletionListener(e,t){this.completionListeners.has(e)||this.completionListeners.set(e,new Set),this.completionListeners.get(e)?.add(t.id)}getStep(e){const t=this.steps.get(e);if(!t)throw Error("Attempting to access step which does not exist in registry "+e);return t}};y=A([l(0,R),l(1,q),l(2,H),l(3,ve),l(4,Q),l(5,Z),l(6,ne),l(7,ie),l(8,oe),l(9,ce),l(10,me),l(11,re)],y);const U=n=>n.split(`
`).filter(a=>a).map(a=>se(a)),G=n=>n.startsWith("https://")?b.parse(n,!0):u.asFileUri(`vs/workbench/contrib/welcomeGettingStarted/common/media/${n}`),w=n=>n.startsWith("https://")?b.parse(n,!0):u.asBrowserUri(`vs/workbench/contrib/welcomeGettingStarted/common/media/${n}`),Ee=n=>{if(typeof n=="string"){const a=w(n);return{hcDark:a,hcLight:a,dark:a,light:a}}else return{hcDark:w(n.hc),hcLight:w(n.hcLight??n.light),light:w(n.light),dark:w(n.dark)}};X(class extends J{constructor(){super({id:"resetGettingStartedProgress",category:P("developer","Developer"),title:P("resetWelcomePageWalkthroughProgress","Reset Welcome Page Walkthrough Progress"),f1:!0,metadata:{description:P("resetGettingStartedProgressDescription","Reset the progress of all Walkthrough steps on the Welcome Page to make them appear as if they are being viewed for the first time, providing a fresh start to the getting started experience.")}})}run(n){const a=n.get(B),e=n.get(R);e.store(Ie,JSON.stringify([]),v.PROFILE,k.USER),e.store(D,JSON.stringify([]),v.PROFILE,k.USER);const t=new N("gettingStartedService",n.get(R)),i=t.getMemento(v.PROFILE,k.USER);for(const r in i)if(Object.prototype.hasOwnProperty.call(i,r))try{a.deprogressStep(r)}catch{}t.saveMemento()}}),ge(B,y,he.Delayed);export{ke as HasMultipleNewFileEntries,B as IWalkthroughsService,y as WalkthroughsService,G as convertInternalMediaPathToFileURI,Ie as hiddenEntriesConfigurationKey,U as parseDescription,D as walkthroughMetadataConfigurationKey};
