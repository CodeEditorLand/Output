var T=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var q=(i,a,e,t)=>{for(var n=t>1?void 0:t?V(a,e):a,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(t?o(a,e,n):o(n))||n);return t&&n&&T(a,e,n),n},m=(i,a)=>(e,t)=>a(e,t,i);import{asArray as z}from"../../../../base/common/arrays.js";import{DeferredPromise as k}from"../../../../base/common/async.js";import{Emitter as I}from"../../../../base/common/event.js";import{MarkdownString as A,isMarkdownString as x}from"../../../../base/common/htmlContent.js";import{Disposable as R}from"../../../../base/common/lifecycle.js";import{revive as b}from"../../../../base/common/marshalling.js";import{equals as P}from"../../../../base/common/objects.js";import{basename as S,isEqual as F}from"../../../../base/common/resources.js";import"../../../../base/common/themables.js";import{URI as M,isUriComponents as L}from"../../../../base/common/uri.js";import{generateUuid as E}from"../../../../base/common/uuid.js";import{OffsetRange as O}from"../../../../editor/common/core/offsetRange.js";import"../../../../editor/common/core/range.js";import"../../../../editor/common/languages.js";import{localize as v}from"../../../../nls.js";import{ILogService as N}from"../../../../platform/log/common/log.js";import{ChatAgentLocation as W,IChatAgentService as G,reviveSerializedAgent as H}from"./chatAgents.js";import{ChatRequestTextPart as J,reviveParsedChatRequest as $}from"./chatParserTypes.js";import{isIUsedContext as j}from"./chatService.js";import"./chatVariables.js";function lt(i){return i.kind==="implicit"}function ht(i){const a=i;return typeof a=="object"&&a!==null&&typeof a.id=="string"&&typeof a.name=="string"}const B=new Set(["toolInvocation","toolInvocationSerialized"]);function Q(i){return!B.has(i.kind)}function ut(i){return i.filter(Q)}class f{constructor(a,e,t,n=0,s,o,r,d=!1){this._session=a;this.message=e;this._variableData=t;this._attempt=n;this._confirmation=s;this._locationData=o;this._attachedContext=r;this.isCompleteAddedRequest=d;this.id="request_"+f.nextId++}static nextId=0;response;isDisabled=!1;id;get session(){return this._session}get username(){return this.session.requesterUsername}get avatarIconUri(){return this.session.requesterAvatarIconUri}get attempt(){return this._attempt}get variableData(){return this._variableData}set variableData(a){this._variableData=a}get confirmation(){return this._confirmation}get locationData(){return this._locationData}get attachedContext(){return this._attachedContext}adoptTo(a){this._session=a}}class Y extends R{_onDidChangeValue=this._register(new I);get onDidChangeValue(){return this._onDidChangeValue.event}_responseParts;_responseRepr="";_markdownContent="";_citations=[];get value(){return this._responseParts}constructor(a){super(),this._responseParts=z(a).map(e=>x(e)?{content:e,kind:"markdownContent"}:"kind"in e?e:{kind:"treeData",treeData:e}),this._updateRepr(!0)}toString(){return this._responseRepr}getMarkdown(){return this._markdownContent}clear(){this._responseParts=[],this._updateRepr(!0)}updateContent(a,e){if(a.kind==="markdownContent"){const t=this._responseParts.filter(n=>n.kind!=="textEditGroup").at(-1);!t||t.kind!=="markdownContent"||!ee(t.content,a.content)?this._responseParts.push(a):t.content=te(t.content,a.content),this._updateRepr(e)}else if(a.kind==="textEdit"){if(a.edits.length>0){let t=!1;for(let n=0;!t&&n<this._responseParts.length;n++){const s=this._responseParts[n];s.kind==="textEditGroup"&&F(s.uri,a.uri)&&(s.edits.push(a.edits),t=!0)}t||this._responseParts.push({kind:"textEditGroup",uri:a.uri,edits:[a.edits]}),this._updateRepr(e)}}else if(a.kind==="progressTask"){const t=this._responseParts.push(a)-1;this._updateRepr(e);const n=a.onDidAddProgress(()=>{this._updateRepr(!1)});a.task?.().then(s=>{n.dispose(),typeof s=="string"&&(this._responseParts[t].content=new A(s)),this._updateRepr(!1)})}else this._responseParts.push(a),this._updateRepr(e)}addCitation(a){this._citations.push(a),this._updateRepr()}_updateRepr(a){const e=t=>"uri"in t.inlineReference?S(t.inlineReference.uri):"name"in t.inlineReference?t.inlineReference.name:S(t.inlineReference);this._responseRepr=this._responseParts.map(t=>t.kind==="treeData"?"":t.kind==="inlineReference"?e(t):t.kind==="command"?t.command.title:t.kind==="textEditGroup"?v("editsSummary","Made changes."):t.kind==="progressMessage"||t.kind==="codeblockUri"||t.kind==="toolInvocation"||t.kind==="toolInvocationSerialized"?"":t.kind==="confirmation"?`${t.title}
${t.message}`:t.content.value).filter(t=>t.length>0).join(`

`),this._responseRepr+=this._citations.length?`

`+ne(this._citations):"",this._markdownContent=this._responseParts.map(t=>t.kind==="inlineReference"?e(t):t.kind==="markdownContent"||t.kind==="markdownVuln"?t.content.value:"").filter(t=>t.length>0).join(""),a||this._onDidChangeValue.fire()}}class u extends R{constructor(e,t,n,s,o,r=!1,d=!1,c,l,h,D,ae=!1,ie=!1){super();this._session=t;this._agent=n;this._slashCommand=s;this.requestId=o;this._isComplete=r;this._isCanceled=d;this._vote=c;this._voteDownReason=l;this._result=h;this._isDisabled=ae;this.isCompleteAddedRequest=ie;this._isStale=Array.isArray(e)&&(e.length!==0||x(e)&&e.value.length!==0),this._followups=D?[...D]:void 0,this._response=this._register(new Y(e)),this._register(this._response.onDidChangeValue(()=>this._onDidChange.fire())),this._register(this._session.onDidChange(_=>{if(_.kind==="setCheckpoint"){const y=_.disabledResponseIds.has(this.id),U=this._isDisabled!==y;this._isDisabled=y,U&&this._onDidChange.fire()}})),this.id="response_"+u.nextId++}_onDidChange=this._register(new I);onDidChange=this._onDidChange.event;static nextId=0;id;get session(){return this._session}get isDisabled(){return this._isDisabled}get isComplete(){return this._isComplete}get isCanceled(){return this._isCanceled}get vote(){return this._vote}get voteDownReason(){return this._voteDownReason}get followups(){return this._followups}_response;get response(){return this._response}get result(){return this._result}get username(){return this.session.responderUsername}get avatarIcon(){return this.session.responderAvatarIcon}_followups;get agent(){return this._agent}get slashCommand(){return this._slashCommand}_agentOrSlashCommandDetected;get agentOrSlashCommandDetected(){return this._agentOrSlashCommandDetected??!1}_usedContext;get usedContext(){return this._usedContext}_contentReferences=[];get contentReferences(){return this._contentReferences}_codeCitations=[];get codeCitations(){return this._codeCitations}_progressMessages=[];get progressMessages(){return this._progressMessages}_isStale=!1;get isStale(){return this._isStale}updateContent(e,t){this._response.updateContent(e,t)}applyReference(e){e.kind==="usedContext"?this._usedContext=e:e.kind==="reference"&&(this._contentReferences.push(e),this._onDidChange.fire())}applyCodeCitation(e){this._codeCitations.push(e),this._response.addCitation(e),this._onDidChange.fire()}setAgent(e,t){this._agent=e,this._slashCommand=t,this._agentOrSlashCommandDetected=!0,this._onDidChange.fire()}setResult(e){this._result=e,this._onDidChange.fire()}complete(){this._result?.errorDetails?.responseIsRedacted&&this._response.clear(),this._isComplete=!0,this._onDidChange.fire()}cancel(){this._isComplete=!0,this._isCanceled=!0,this._onDidChange.fire()}setFollowups(e){this._followups=e,this._onDidChange.fire()}setVote(e){this._vote=e,this._onDidChange.fire()}setVoteDownReason(e){this._voteDownReason=e,this._onDidChange.fire()}setEditApplied(e,t){return!this.response.value.includes(e)||!e.state?!1:(e.state.applied=t,this._onDidChange.fire(),!0)}adoptTo(e){this._session=e,this._onDidChange.fire()}}function Ct(i){return K(i),"version"in i?i.version===2?{...i,version:3,customTitle:i.computedTitle}:i:{version:3,...i,lastMessageDate:i.creationDate,customTitle:void 0}}function K(i){i.sessionId||(i.sessionId=E()),i.creationDate||(i.creationDate=w()),"version"in i&&(i.version===2||i.version===3)&&(i.lastMessageDate||(i.lastMessageDate=w()))}function w(){const i=new Date;return i.setFullYear(i.getFullYear()-1),i.getTime()}function X(i){const a=i;return typeof a=="object"&&typeof a.requesterUsername=="string"}function p(i){const a=i;return X(i)&&typeof a.creationDate=="number"&&typeof a.sessionId=="string"&&i.requests.every(e=>!e.usedContext||j(e.usedContext))}var Z=(t=>(t[t.Removal=0]="Removal",t[t.Resend=1]="Resend",t[t.Adoption=2]="Adoption",t))(Z||{}),g=(t=>(t[t.Created=0]="Created",t[t.Initializing=1]="Initializing",t[t.Initialized=2]="Initialized",t))(g||{});let C=class extends R{constructor(e,t,n,s){super();this.initialData=e;this._initialLocation=t;this.logService=n;this.chatAgentService=s;this._isImported=!!e&&!p(e)||(e?.isImported??!1),this._sessionId=p(e)&&e.sessionId||E(),this._requests=e?this._deserialize(e):[],this._creationDate=p(e)&&e.creationDate||Date.now(),this._lastMessageDate=p(e)&&e.lastMessageDate||this._creationDate,this._customTitle=p(e)?e.customTitle:void 0,this._initialRequesterAvatarIconUri=e?.requesterAvatarIconUri&&M.revive(e.requesterAvatarIconUri),this._initialResponderAvatarIconUri=L(e?.responderAvatarIconUri)?M.revive(e.responderAvatarIconUri):e?.responderAvatarIconUri}static getDefaultTitle(e){const t=e.at(0)?.message??"";return(typeof t=="string"?t:t.text).split(`
`)[0].substring(0,50)}_onDidDispose=this._register(new I);onDidDispose=this._onDidDispose.event;_onDidChange=this._register(new I);onDidChange=this._onDidChange.event;_requests;_initState=0;_isInitializedDeferred=new k;_welcomeMessage;get welcomeMessage(){return this._welcomeMessage}_sampleQuestions;get sampleQuestions(){return this._sampleQuestions}_sessionId;get sessionId(){return this._sessionId}get requestInProgress(){const e=this.lastRequest;return!!e?.response&&!e.response.isComplete}get hasRequests(){return this._requests.length>0}get lastRequest(){return this._requests.at(-1)}_creationDate;get creationDate(){return this._creationDate}_lastMessageDate;get lastMessageDate(){return this._lastMessageDate}get _defaultAgent(){return this.chatAgentService.getDefaultAgent(W.Panel)}get requesterUsername(){return this._defaultAgent?.metadata.requester?.name??this.initialData?.requesterUsername??""}get responderUsername(){return this._defaultAgent?.fullName??this.initialData?.responderUsername??""}_initialRequesterAvatarIconUri;get requesterAvatarIconUri(){return this._defaultAgent?.metadata.requester?.icon??this._initialRequesterAvatarIconUri}_initialResponderAvatarIconUri;get responderAvatarIcon(){return this._defaultAgent?.metadata.themeIcon??this._initialResponderAvatarIconUri}get initState(){return this._initState}_isImported=!1;get isImported(){return this._isImported}_customTitle;get customTitle(){return this._customTitle}get title(){return this._customTitle||C.getDefaultTitle(this._requests)}get initialLocation(){return this._initialLocation}_deserialize(e){const t=e.requests;if(!Array.isArray(t))return this.logService.error(`Ignoring malformed session data: ${JSON.stringify(e)}`),[];try{return t.map(n=>{const s=typeof n.message=="string"?this.getParsedRequestFromString(n.message):$(n.message),o=this.reviveVariableData(n.variableData),r=new f(this,s,o);if(n.response||n.result||n.responseErrorDetails){const d=n.agent&&"metadata"in n.agent?H(n.agent):void 0,c="responseErrorDetails"in n?{errorDetails:n.responseErrorDetails}:n.result;r.response=new u(n.response??[new A(n.response)],this,d,n.slashCommand,r.id,!0,n.isCanceled,n.vote,n.voteDownReason,c,n.followups,r.isDisabled),n.usedContext&&r.response.applyReference(b(n.usedContext)),n.contentReferences?.forEach(l=>r.response.applyReference(b(l))),n.codeCitations?.forEach(l=>r.response.applyCodeCitation(b(l)))}return r})}catch(n){return this.logService.error("Failed to parse chat data",n),[]}}reviveVariableData(e){const t=e&&Array.isArray(e.variables)?e:{variables:[]};return t.variables=t.variables.map(n=>n&&"values"in n&&Array.isArray(n.values)?{id:n.id??"",name:n.name,value:n.values[0]?.value,range:n.range,modelDescription:n.modelDescription,references:n.references}:n),t}getParsedRequestFromString(e){const t=[new J(new O(0,e.length),{startColumn:1,startLineNumber:1,endColumn:1,endLineNumber:1},e)];return{text:e,parts:t}}startInitialize(){if(this.initState!==0)throw new Error(`ChatModel is in the wrong state for startInitialize: ${g[this.initState]}`);this._initState=1}deinitialize(){this._initState=0,this._isInitializedDeferred=new k}initialize(e,t){if(this.initState!==1)throw new Error(`ChatModel is in the wrong state for initialize: ${g[this.initState]}`);this._initState=2,this._welcomeMessage=e,this._sampleQuestions=t,this._isInitializedDeferred.complete(),this._onDidChange.fire({kind:"initialize"})}setInitializationError(e){if(this.initState!==1)throw new Error(`ChatModel is in the wrong state for setInitializationError: ${g[this.initState]}`);this._isInitializedDeferred.isSettled||this._isInitializedDeferred.error(e)}waitForInitialization(){return this._isInitializedDeferred.p}getRequests(e=!0){if(e)return this._requests;const t=[];for(const n of this._requests){if(n.isDisabled)break;t.push(n)}return t}_checkpoint=void 0;get checkpoint(){return this._checkpoint}setCheckpoint(e){let t,n=-1;if(e!==void 0&&(this._requests.forEach((r,d)=>{r.id===e&&(n=d,t=r)}),!t))return;const s=new Set,o=new Set;for(let r=this._requests.length-1;r>=0;r-=1){const d=this._requests[r];this._checkpoint&&!t?d.isDisabled=!1:t&&r>n?(d.isDisabled=!0,s.add(d.id),d.response&&o.add(d.response.id)):t&&r<=n&&(d.isDisabled=!1)}this._checkpoint=t,this._onDidChange.fire({kind:"setCheckpoint",disabledRequestIds:s,disabledResponseIds:o})}addRequest(e,t,n,s,o,r,d,c,l){const h=new f(this,e,t,n,r,d,c,l);return h.response=new u([],this,s,o,h.id,void 0,void 0,void 0,void 0,void 0,void 0,void 0,l),this._requests.push(h),this._lastMessageDate=Date.now(),this._onDidChange.fire({kind:"addRequest",request:h}),h}setCustomTitle(e){this._customTitle=e}updateRequest(e,t){e.variableData=t,this._onDidChange.fire({kind:"changedRequest",request:e})}adoptRequest(e){const t=e.session,n=t._requests.findIndex(s=>s.id===e.id);n!==-1&&(t._requests.splice(n,1),e.adoptTo(this),e.response?.adoptTo(this),this._requests.push(e),t._onDidChange.fire({kind:"removeRequest",requestId:e.id,responseId:e.response?.id,reason:2}),this._onDidChange.fire({kind:"addRequest",request:e}))}acceptResponseProgress(e,t,n){if(e.response||(e.response=new u([],this,void 0,void 0,e.id)),e.response.isComplete)throw new Error("acceptResponseProgress: Adding progress to a completed response");if(t.kind==="markdownContent"||t.kind==="treeData"||t.kind==="inlineReference"||t.kind==="codeblockUri"||t.kind==="markdownVuln"||t.kind==="progressMessage"||t.kind==="command"||t.kind==="textEdit"||t.kind==="warning"||t.kind==="progressTask"||t.kind==="confirmation"||t.kind==="toolInvocation")e.response.updateContent(t,n);else if(t.kind==="usedContext"||t.kind==="reference")e.response.applyReference(t);else if(t.kind==="agentDetection"){const s=this.chatAgentService.getAgent(t.agentId);s&&(e.response.setAgent(s,t.command),this._onDidChange.fire({kind:"setAgent",agent:s,command:t.command}))}else t.kind==="codeCitation"?e.response.applyCodeCitation(t):t.kind==="move"?this._onDidChange.fire({kind:"move",target:t.uri,range:t.range}):this.logService.error(`Couldn't handle progress: ${JSON.stringify(t)}`)}removeRequest(e,t=0){const n=this._requests.findIndex(o=>o.id===e),s=this._requests[n];n!==-1&&(this._onDidChange.fire({kind:"removeRequest",requestId:s.id,responseId:s.response?.id,reason:t}),this._requests.splice(n,1),s.response?.dispose())}cancelRequest(e){e.response&&e.response.cancel()}setResponse(e,t){e.response||(e.response=new u([],this,void 0,void 0,e.id)),e.response.setResult(t)}completeResponse(e){if(!e.response)throw new Error("Call setResponse before completeResponse");e.response.complete()}setFollowups(e,t){e.response&&e.response.setFollowups(t)}setResponseModel(e,t){e.response=t,this._onDidChange.fire({kind:"addResponse",response:t})}toExport(){return{requesterUsername:this.requesterUsername,requesterAvatarIconUri:this.requesterAvatarIconUri,responderUsername:this.responderUsername,responderAvatarIconUri:this.responderAvatarIcon,initialLocation:this.initialLocation,requests:this._requests.map(e=>{const t={...e.message,parts:e.message.parts.map(o=>o&&"toJSON"in o?o.toJSON():o)},n=e.response?.agent,s=n&&"toJSON"in n?n.toJSON():n?{...n}:void 0;return{message:t,variableData:e.variableData,response:e.response?e.response.response.value.map(o=>o.kind==="treeData"?o.treeData:o.kind==="markdownContent"?o.content:o):void 0,result:e.response?.result,followups:e.response?.followups,isCanceled:e.response?.isCanceled,vote:e.response?.vote,voteDownReason:e.response?.voteDownReason,agent:s,slashCommand:e.response?.slashCommand,usedContext:e.response?.usedContext,contentReferences:e.response?.contentReferences,codeCitations:e.response?.codeCitations}})}}toJSON(){return{version:3,...this.toExport(),sessionId:this.sessionId,creationDate:this._creationDate,isImported:this._isImported,lastMessageDate:this._lastMessageDate,customTitle:this._customTitle}}dispose(){this._requests.forEach(e=>e.response?.dispose()),this._onDidDispose.fire(),super.dispose()}};C=q([m(2,N),m(3,G)],C);function pt(i,a){return{variables:i.variables.map(e=>({...e,range:e.range&&{start:e.range.start-a,endExclusive:e.range.endExclusive-a}}))}}function ee(i,a){if(i.baseUri&&a.baseUri){if(!(i.baseUri.scheme===a.baseUri.scheme&&i.baseUri.authority===a.baseUri.authority&&i.baseUri.path===a.baseUri.path&&i.baseUri.query===a.baseUri.query&&i.baseUri.fragment===a.baseUri.fragment))return!1}else if(i.baseUri||a.baseUri)return!1;return P(i.isTrusted,a.isTrusted)&&i.supportHtml===a.supportHtml&&i.supportThemeIcons===a.supportThemeIcons}function te(i,a){const e=typeof a=="string"?a:a.value;return{value:i.value+e,isTrusted:i.isTrusted,supportThemeIcons:i.supportThemeIcons,supportHtml:i.supportHtml,baseUri:i.baseUri}}function ne(i){if(i.length===0)return"";const a=i.reduce((t,n)=>t.add(n.license),new Set);return a.size===1?v("codeCitation","Similar code found with 1 license type",a.size):v("codeCitations","Similar code found with {0} license types",a.size)}export{C as ChatModel,g as ChatModelInitState,f as ChatRequestModel,Z as ChatRequestRemovalReason,u as ChatResponseModel,Y as Response,te as appendMarkdownString,ee as canMergeMarkdownStrings,ne as getCodeCitationsMessage,ht as isChatRequestVariableEntry,X as isExportableSessionData,lt as isImplicitVariableEntry,p as isSerializableSessionData,Ct as normalizeSerializableChatData,ut as toChatHistoryContent,pt as updateRanges};
