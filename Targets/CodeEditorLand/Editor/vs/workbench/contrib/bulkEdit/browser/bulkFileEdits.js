var U=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var p=(d,e,n,t)=>{for(var o=t>1?void 0:t?R(e,n):e,r=d.length-1,i;r>=0;r--)(i=d[r])&&(o=(t?i(e,n,o):i(o))||o);return t&&o&&U(e,n,o),o},a=(d,e)=>(n,t)=>e(n,t,d);import"../../../../editor/common/languages.js";import{IFileService as h,FileSystemProviderCapabilities as F}from"../../../../platform/files/common/files.js";import"../../../../platform/progress/common/progress.js";import{IConfigurationService as C}from"../../../../platform/configuration/common/configuration.js";import{IWorkingCopyFileService as I}from"../../../services/workingCopy/common/workingCopyFileService.js";import{UndoRedoElementType as k,IUndoRedoService as E}from"../../../../platform/undoRedo/common/undoRedo.js";import"../../../../base/common/uri.js";import{IInstantiationService as m}from"../../../../platform/instantiation/common/instantiation.js";import{ILogService as O}from"../../../../platform/log/common/log.js";import"../../../../base/common/buffer.js";import"../../../../editor/browser/services/bulkEditService.js";import{CancellationToken as b}from"../../../../base/common/cancellation.js";import{tail as x}from"../../../../base/common/arrays.js";import{ITextFileService as W}from"../../../services/textfile/common/textfiles.js";import{Schemas as T}from"../../../../base/common/network.js";class v{uris=[];async perform(){return this}toString(){return"(noop)"}}class w{constructor(e,n,t){this.newUri=e;this.oldUri=n;this.options=t}type="rename"}let c=class{constructor(e,n,t,o){this._edits=e;this._undoRedoInfo=n;this._workingCopyFileService=t;this._fileService=o}get uris(){return this._edits.flatMap(e=>[e.newUri,e.oldUri])}async perform(e){const n=[],t=[];for(const o of this._edits)o.options.overwrite===void 0&&o.options.ignoreIfExists&&await this._fileService.exists(o.newUri)||(n.push({file:{source:o.oldUri,target:o.newUri},overwrite:o.options.overwrite}),t.push(new w(o.oldUri,o.newUri,o.options)));return n.length===0?new v:(await this._workingCopyFileService.move(n,e,this._undoRedoInfo),new c(t,{isUndoing:!0},this._workingCopyFileService,this._fileService))}toString(){return`(rename ${this._edits.map(e=>`${e.oldUri} to ${e.newUri}`).join(", ")})`}};c=p([a(2,I),a(3,h)],c);class ${constructor(e,n,t){this.newUri=e;this.oldUri=n;this.options=t}type="copy"}let y=class{constructor(e,n,t,o,r){this._edits=e;this._undoRedoInfo=n;this._workingCopyFileService=t;this._fileService=o;this._instaService=r}get uris(){return this._edits.flatMap(e=>[e.newUri,e.oldUri])}async perform(e){const n=[];for(const r of this._edits)r.options.overwrite===void 0&&r.options.ignoreIfExists&&await this._fileService.exists(r.newUri)||n.push({file:{source:r.oldUri,target:r.newUri},overwrite:r.options.overwrite});if(n.length===0)return new v;const t=await this._workingCopyFileService.copy(n,e,this._undoRedoInfo),o=[];for(let r=0;r<t.length;r++){const i=t[r],s=this._edits[r];o.push(new S(i.resource,{recursive:!0,folder:this._edits[r].options.folder||i.isDirectory,...s.options},!1))}return this._instaService.createInstance(l,o,{isUndoing:!0})}toString(){return`(copy ${this._edits.map(e=>`${e.oldUri} to ${e.newUri}`).join(", ")})`}};y=p([a(2,I),a(3,h),a(4,m)],y);class g{constructor(e,n,t){this.newUri=e;this.options=n;this.contents=t}type="create"}let u=class{constructor(e,n,t,o,r,i){this._edits=e;this._undoRedoInfo=n;this._fileService=t;this._workingCopyFileService=o;this._instaService=r;this._textFileService=i}get uris(){return this._edits.map(e=>e.newUri)}async perform(e){const n=[],t=[],o=[];for(const r of this._edits)if(r.newUri.scheme!==T.untitled&&!(r.options.overwrite===void 0&&r.options.ignoreIfExists&&await this._fileService.exists(r.newUri))){if(r.options.folder)n.push({resource:r.newUri});else{const i=typeof r.contents<"u"?r.contents:await this._textFileService.getEncodedReadable(r.newUri);t.push({resource:r.newUri,contents:i,overwrite:r.options.overwrite})}o.push(new S(r.newUri,r.options,!r.options.folder&&!r.contents))}return n.length===0&&t.length===0?new v:(await this._workingCopyFileService.createFolder(n,e,this._undoRedoInfo),await this._workingCopyFileService.create(t,e,this._undoRedoInfo),this._instaService.createInstance(l,o,{isUndoing:!0}))}toString(){return`(create ${this._edits.map(e=>e.options.folder?`folder ${e.newUri}`:`file ${e.newUri} with ${e.contents?.byteLength||0} bytes`).join(", ")})`}};u=p([a(2,h),a(3,I),a(4,m),a(5,W)],u);class S{constructor(e,n,t){this.oldUri=e;this.options=n;this.undoesCreate=t}type="delete"}let l=class{constructor(e,n,t,o,r,i,s){this._edits=e;this._undoRedoInfo=n;this._workingCopyFileService=t;this._fileService=o;this._configurationService=r;this._instaService=i;this._logService=s}get uris(){return this._edits.map(e=>e.oldUri)}async perform(e){const n=[],t=[];for(const o of this._edits){let r;try{r=await this._fileService.resolve(o.oldUri,{resolveMetadata:!0})}catch{if(!o.options.ignoreIfNotExists)throw new Error(`${o.oldUri} does not exist and can not be deleted`);continue}n.push({resource:o.oldUri,recursive:o.options.recursive,useTrash:!o.options.skipTrashBin&&this._fileService.hasCapability(o.oldUri,F.Trash)&&this._configurationService.getValue("files.enableTrash")});let i;if(!o.undoesCreate&&!o.options.folder&&!(typeof o.options.maxSize=="number"&&r.size>o.options.maxSize))try{i=await this._fileService.readFile(o.oldUri)}catch(s){this._logService.error(s)}i!==void 0&&t.push(new g(o.oldUri,o.options,i.value))}return n.length===0?new v:(await this._workingCopyFileService.delete(n,e,this._undoRedoInfo),t.length===0?new v:this._instaService.createInstance(u,t,{isUndoing:!0}))}toString(){return`(delete ${this._edits.map(e=>e.oldUri).join(", ")})`}};l=p([a(2,I),a(3,h),a(4,C),a(5,m),a(6,O)],l);class P{constructor(e,n,t,o){this.label=e;this.code=n;this.operations=t;this.confirmBeforeUndo=o;this.resources=t.flatMap(r=>r.uris)}type=k.Workspace;resources;async undo(){await this._reverse()}async redo(){await this._reverse()}async _reverse(){for(let e=0;e<this.operations.length;e++){const t=await this.operations[e].perform(b.None);this.operations[e]=t}}toString(){return this.operations.map(e=>String(e)).join(", ")}}let _=class{constructor(e,n,t,o,r,i,s,f,M,D){this._label=e;this._code=n;this._undoRedoGroup=t;this._undoRedoSource=o;this._confirmBeforeUndo=r;this._progress=i;this._token=s;this._edits=f;this._instaService=M;this._undoRedoService=D}async apply(){const e=[],n={undoRedoGroupId:this._undoRedoGroup.id},t=[];for(const i of this._edits)i.newResource&&i.oldResource&&!i.options?.copy?t.push(new w(i.newResource,i.oldResource,i.options??{})):i.newResource&&i.oldResource&&i.options?.copy?t.push(new $(i.newResource,i.oldResource,i.options??{})):!i.newResource&&i.oldResource?t.push(new S(i.oldResource,i.options??{},!1)):i.newResource&&!i.oldResource&&t.push(new g(i.newResource,i.options??{},await i.options.contents));if(t.length===0)return[];const o=[];o[0]=[t[0]];for(let i=1;i<t.length;i++){const s=t[i],f=x(o);f?.[0].type===s.type?f.push(s):o.push([s])}for(const i of o){if(this._token.isCancellationRequested)break;let s;switch(i[0].type){case"rename":s=this._instaService.createInstance(c,i,n);break;case"copy":s=this._instaService.createInstance(y,i,n);break;case"delete":s=this._instaService.createInstance(l,i,n);break;case"create":s=this._instaService.createInstance(u,i,n);break}if(s){const f=await s.perform(this._token);e.push(f)}this._progress.report(void 0)}const r=new P(this._label,this._code,e,this._confirmBeforeUndo);return this._undoRedoService.pushElement(r,this._undoRedoGroup,this._undoRedoSource),r.resources}};_=p([a(8,m),a(9,E)],_);export{_ as BulkFileEdits};
