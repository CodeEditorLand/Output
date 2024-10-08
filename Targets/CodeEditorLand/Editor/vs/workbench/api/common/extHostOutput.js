var x=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var c=(p,i,e,t)=>{for(var o=t>1?void 0:t?y(i,e):i,r=p.length-1,n;r>=0;r--)(n=p[r])&&(o=(t?n(i,e,o):n(o))||o);return t&&o&&x(i,e,o),o},g=(p,i)=>(e,t)=>i(e,t,p);import{MainContext as m}from"./extHost.protocol.js";import"../../../base/common/uri.js";import{createDecorator as S}from"../../../platform/instantiation/common/instantiation.js";import{IExtHostRpcService as C}from"./extHostRpcService.js";import{ExtensionIdentifier as I}from"../../../platform/extensions/common/extensions.js";import{AbstractMessageLogger as E,ILoggerService as H,ILogService as O,log as D,parseLogLevel as b}from"../../../platform/log/common/log.js";import{OutputChannelUpdateMode as v}from"../../services/output/common/output.js";import{IExtHostConsumerFileSystem as w}from"./extHostFileSystemConsumer.js";import{IExtHostInitDataService as F}from"./extHostInitDataService.js";import{IExtHostFileSystemInfo as $}from"./extHostFileSystemInfo.js";import{toLocalISOString as U}from"../../../base/common/date.js";import{VSBuffer as P}from"../../../base/common/buffer.js";import{isString as f}from"../../../base/common/types.js";import{FileSystemProviderErrorCode as M,toFileSystemProviderErrorCode as R}from"../../../platform/files/common/files.js";import{Emitter as T}from"../../../base/common/event.js";import{DisposableStore as j,toDisposable as u}from"../../../base/common/lifecycle.js";class L extends E{constructor(e,t,o,r,n){super();this.id=e;this.name=t;this.logger=o;this.proxy=r;this.extension=n;this.setLevel(o.getLevel()),this._register(o.onDidChangeLogLevel(d=>this.setLevel(d))),this._register(u(()=>this.proxy.$dispose(this.id)))}offset=0;visible=!1;get logLevel(){return this.getLevel()}appendLine(e){this.append(e+`
`)}append(e){this.info(e)}clear(){const e=this.offset;this.logger.flush(),this.proxy.$update(this.id,v.Clear,e)}replace(e){const t=this.offset;this.info(e),this.proxy.$update(this.id,v.Replace,t),this.visible&&this.logger.flush()}show(e,t){this.logger.flush(),this.proxy.$reveal(this.id,!!(typeof e=="boolean"?e:t))}hide(){this.proxy.$close(this.id)}log(e,t){this.offset+=P.fromString(t).byteLength,D(this.logger,e,t),this.visible&&(this.logger.flush(),this.proxy.$update(this.id,v.Append))}}class V extends L{appendLine(i){this.append(i)}}let h=class{constructor(i,e,t,o,r,n){this.initData=e;this.extHostFileSystem=t;this.extHostFileSystemInfo=o;this.loggerService=r;this.logService=n;this.proxy=i.getProxy(m.MainThreadOutputService),this.outputsLocation=this.extHostFileSystemInfo.extUri.joinPath(e.logsLocation,`output_logging_${U(new Date).replace(/-|:|\.\d+Z$/g,"")}`)}_serviceBrand;proxy;outputsLocation;outputDirectoryPromise;extensionLogDirectoryPromise=new Map;namePool=1;channels=new Map;visibleChannelId=null;$setVisibleChannel(i){this.visibleChannelId=i;for(const[e,t]of this.channels)t.visible=e===this.visibleChannelId}createOutputChannel(i,e,t){if(i=i.trim(),!i)throw new Error("illegal argument `name`. must not be falsy");const o=typeof e=="object"&&e.log,r=f(e)?e:void 0;if(f(r)&&!r.trim())throw new Error("illegal argument `languageId`. must not be empty");let n;const d=this.initData.environment.extensionLogLevel?.find(([l])=>I.equals(t.identifier,l))?.[1];d&&(n=b(d));const s=new j,a=o?this.doCreateLogOutputChannel(i,n,t,s):this.doCreateOutputChannel(i,r,t,s);return a.then(l=>{this.channels.set(l.id,l),l.visible=l.id===this.visibleChannelId,s.add(u(()=>this.channels.delete(l.id)))}),o?this.createExtHostLogOutputChannel(i,n??this.logService.getLevel(),a,s):this.createExtHostOutputChannel(i,a,s)}async doCreateOutputChannel(i,e,t,o){this.outputDirectoryPromise||(this.outputDirectoryPromise=this.extHostFileSystem.value.createDirectory(this.outputsLocation).then(()=>this.outputsLocation));const r=await this.outputDirectoryPromise,n=this.extHostFileSystemInfo.extUri.joinPath(r,`${this.namePool++}-${i.replace(/[\\/:\*\?"<>\|]/g,"")}.log`),d=o.add(this.loggerService.createLogger(n,{logLevel:"always",donotRotate:!0,donotUseFormatters:!0,hidden:!0})),s=await this.proxy.$register(i,n,e,t.identifier.value);return o.add(u(()=>this.loggerService.deregisterLogger(n))),new L(s,i,d,this.proxy,t)}async doCreateLogOutputChannel(i,e,t,o){const r=await this.createExtensionLogDirectory(t),n=i.replace(/[\\/:\*\?"<>\|]/g,""),d=this.extHostFileSystemInfo.extUri.joinPath(r,`${n}.log`),s=`${t.identifier.value}.${n}`,a=o.add(this.loggerService.createLogger(d,{id:s,name:i,logLevel:e,extensionId:t.identifier.value}));return o.add(u(()=>this.loggerService.deregisterLogger(d))),new V(s,i,a,this.proxy,t)}createExtensionLogDirectory(i){let e=this.extensionLogDirectoryPromise.get(i.identifier.value);if(!e){const t=this.extHostFileSystemInfo.extUri.joinPath(this.initData.logsLocation,i.identifier.value);this.extensionLogDirectoryPromise.set(i.identifier.value,e=(async()=>{try{await this.extHostFileSystem.value.createDirectory(t)}catch(o){if(R(o)!==M.FileExists)throw o}return t})())}return e}createExtHostOutputChannel(i,e,t){const o=()=>{if(t.isDisposed)throw new Error("Channel has been closed")};return e.then(r=>t.add(r)),{get name(){return i},append(r){o(),e.then(n=>n.append(r))},appendLine(r){o(),e.then(n=>n.appendLine(r))},clear(){o(),e.then(r=>r.clear())},replace(r){o(),e.then(n=>n.replace(r))},show(r,n){o(),e.then(d=>d.show(r,n))},hide(){o(),e.then(r=>r.hide())},dispose(){t.dispose()}}}createExtHostLogOutputChannel(i,e,t,o){const r=()=>{if(o.isDisposed)throw new Error("Channel has been closed")},n=o.add(new T);function d(s){e=s,n.fire(s)}return t.then(s=>{s.logLevel!==e&&d(s.logLevel),o.add(s.onDidChangeLogLevel(a=>d(a)))}),{...this.createExtHostOutputChannel(i,t,o),get logLevel(){return e},onDidChangeLogLevel:n.event,trace(s,...a){r(),t.then(l=>l.trace(s,...a))},debug(s,...a){r(),t.then(l=>l.debug(s,...a))},info(s,...a){r(),t.then(l=>l.info(s,...a))},warn(s,...a){r(),t.then(l=>l.warn(s,...a))},error(s,...a){r(),t.then(l=>l.error(s,...a))}}}};h=c([g(0,C),g(1,F),g(2,w),g(3,$),g(4,H),g(5,O)],h);const le=S("IExtHostOutputService");export{h as ExtHostOutputService,le as IExtHostOutputService};
