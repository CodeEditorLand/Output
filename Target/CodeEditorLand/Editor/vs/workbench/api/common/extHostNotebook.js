import{localize as M}from"../../../nls.js";import{VSBuffer as x}from"../../../base/common/buffer.js";import"../../../base/common/cancellation.js";import{Emitter as C}from"../../../base/common/event.js";import"../../../base/common/glob.js";import{DisposableStore as W,toDisposable as L}from"../../../base/common/lifecycle.js";import{ResourceMap as A,ResourceSet as V}from"../../../base/common/map.js";import{MarshalledId as T}from"../../../base/common/marshallingIds.js";import{isFalsyOrWhitespace as j}from"../../../base/common/strings.js";import{assertIsDefined as q}from"../../../base/common/types.js";import{URI as _}from"../../../base/common/uri.js";import"../../../platform/extensions/common/extensions.js";import*as f from"../../../platform/files/common/files.js";import{Cache as Q}from"./cache.js";import{MainContext as P}from"./extHost.protocol.js";import{ApiCommand as R,ApiCommandArgument as F,ApiCommandResult as B}from"./extHostCommands.js";import"./extHostDocuments.js";import"./extHostDocumentsAndEditors.js";import*as m from"./extHostTypeConverters.js";import*as H from"./extHostTypes.js";import"../../contrib/notebook/common/notebookCommon.js";import{SerializableObjectWithBuffers as z}from"../../services/extensions/common/proxyIdentifier.js";import{ExtHostCell as G,ExtHostNotebookDocument as X}from"./extHostNotebookDocument.js";import{ExtHostNotebookEditor as Y}from"./extHostNotebookEditor.js";import"./extHostFileSystemConsumer.js";import{filter as O}from"../../../base/common/objects.js";import{Schemas as J}from"../../../base/common/network.js";import{QueryType as K}from"../../services/search/common/search.js";import"./extHostSearch.js";import{CellSearchModel as Z}from"../../contrib/search/common/cellSearchModel.js";import{genericCellMatchesToTextSearchMatches as $}from"../../contrib/search/common/searchNotebookHelpers.js";import"../../contrib/search/common/search.js";import{globMatchesResource as ee,RegisteredEditorPriority as oe}from"../../services/editor/common/editorResolverService.js";import"../../../platform/log/common/log.js";class S{constructor(e,o,t,i,r,s,l){this._textDocumentsAndEditors=t;this._textDocuments=i;this._extHostFileSystem=r;this._extHostSearch=s;this._logService=l;this._notebookProxy=e.getProxy(P.MainThreadNotebook),this._notebookDocumentsProxy=e.getProxy(P.MainThreadNotebookDocuments),this._notebookEditorsProxy=e.getProxy(P.MainThreadNotebookEditors),this._commandsConverter=o.converter,o.registerArgumentProcessor({processArgument:d=>{if(d&&d.$mid===T.NotebookCellActionContext){const c=d.notebookEditor?.notebookUri,b=d.cell.handle,a=this._documents.get(c)?.getCell(b);if(a)return a.apiCell}if(d&&d.$mid===T.NotebookActionContext){const c=d.uri,b=this._documents.get(c);if(b)return b.apiNotebook}return d}}),S._registerApiCommands(o)}static _notebookStatusBarItemProviderHandlePool=0;_notebookProxy;_notebookDocumentsProxy;_notebookEditorsProxy;_notebookStatusBarItemProviders=new Map;_documents=new A;_editors=new Map;_commandsConverter;_onDidChangeActiveNotebookEditor=new C;onDidChangeActiveNotebookEditor=this._onDidChangeActiveNotebookEditor.event;_activeNotebookEditor;get activeNotebookEditor(){return this._activeNotebookEditor?.apiEditor}_visibleNotebookEditors=[];get visibleNotebookEditors(){return this._visibleNotebookEditors.map(e=>e.apiEditor)}_onDidOpenNotebookDocument=new C;onDidOpenNotebookDocument=this._onDidOpenNotebookDocument.event;_onDidCloseNotebookDocument=new C;onDidCloseNotebookDocument=this._onDidCloseNotebookDocument.event;_onDidChangeVisibleNotebookEditors=new C;onDidChangeVisibleNotebookEditors=this._onDidChangeVisibleNotebookEditors.event;_statusBarCache=new Q("NotebookCellStatusBarCache");getEditorById(e){const o=this._editors.get(e);if(!o)throw new Error(`unknown text editor: ${e}. known editors: ${[...this._editors.keys()]} `);return o}getIdByEditor(e){for(const[o,t]of this._editors)if(t.apiEditor===e)return o}get notebookDocuments(){return[...this._documents.values()]}getNotebookDocument(e,o){const t=this._documents.get(e);if(!t&&!o)throw new Error(`NO notebook document for '${e}'`);return t}static _convertNotebookRegistrationData(e,o){if(!o)return;const t=o.filenamePattern.map(i=>m.NotebookExclusiveDocumentPattern.from(i)).filter(i=>i!==void 0);if(!(o.filenamePattern&&!t))return{extension:e.identifier,providerDisplayName:e.displayName||e.name,displayName:o.displayName,filenamePattern:t,priority:o.exclusive?oe.exclusive:void 0}}registerNotebookCellStatusBarItemProvider(e,o,t){const i=S._notebookStatusBarItemProviderHandlePool++,r=typeof t.onDidChangeCellStatusBarItems=="function"?S._notebookStatusBarItemProviderHandlePool++:void 0;this._notebookStatusBarItemProviders.set(i,t),this._notebookProxy.$registerNotebookCellStatusBarItemProvider(i,r,o);let s;return r!==void 0&&(s=t.onDidChangeCellStatusBarItems(l=>this._notebookProxy.$emitCellStatusBarEvent(r))),new H.Disposable(()=>{this._notebookStatusBarItemProviders.delete(i),this._notebookProxy.$unregisterNotebookCellStatusBarItemProvider(i,r),s?.dispose()})}async createNotebookDocument(e){const o=await this._notebookDocumentsProxy.$tryCreateNotebook({viewType:e.viewType,content:e.content&&m.NotebookData.from(e.content)});return _.revive(o)}async openNotebookDocument(e){const o=this._documents.get(e);if(o)return o.apiNotebook;const t=await this._notebookDocumentsProxy.$tryOpenNotebook(e),i=this._documents.get(_.revive(t));return q(i?.apiNotebook)}async showNotebookDocument(e,o){let t;typeof o=="object"?t={position:m.ViewColumn.from(o.viewColumn),preserveFocus:o.preserveFocus,selections:o.selections&&o.selections.map(m.NotebookRange.from),pinned:typeof o.preview=="boolean"?!o.preview:void 0,label:typeof o.asRepl=="string"?o.asRepl:typeof o.asRepl=="object"?o.asRepl.label:void 0}:t={preserveFocus:!1,pinned:!0};const i=o?.asRepl?"repl":e.notebookType,r=await this._notebookEditorsProxy.$tryShowNotebookDocument(e.uri,i,t),s=r&&this._editors.get(r)?.apiEditor;if(s)return s;throw r?new Error(`Could NOT open editor for "${e.uri.toString()}" because another editor opened in the meantime.`):new Error(`Could NOT open editor for "${e.uri.toString()}".`)}async $provideNotebookCellStatusBarItems(e,o,t,i){const r=this._notebookStatusBarItemProviders.get(e),s=_.revive(o),l=this._documents.get(s);if(!l||!r)return;const d=l.getCellFromIndex(t);if(!d)return;const c=await r.provideCellStatusBarItems(d.apiCell,i);if(!c)return;const b=new W,y=this._statusBarCache.add([b]),k=(Array.isArray(c)?c:[c]).map(n=>m.NotebookStatusBarItem.from(n,this._commandsConverter,b));return{cacheId:y,items:k}}$releaseNotebookCellStatusBarItems(e){this._statusBarCache.delete(e)}_handlePool=0;_notebookSerializer=new Map;registerNotebookSerializer(e,o,t,i,r){if(j(o))throw new Error("viewType cannot be empty or just whitespace");const s=this._handlePool++;return this._notebookSerializer.set(s,{viewType:o,serializer:t,options:i}),this._notebookProxy.$registerNotebookSerializer(s,{id:e.identifier,location:e.extensionLocation},o,m.NotebookDocumentContentOptions.from(i),S._convertNotebookRegistrationData(e,r)),L(()=>{this._notebookProxy.$unregisterNotebookSerializer(s)})}async $dataToNotebook(e,o,t){const i=this._notebookSerializer.get(e);if(!i)throw new Error("NO serializer found");const r=await i.serializer.deserializeNotebook(o.buffer,t);return new z(m.NotebookData.from(r))}async $notebookToData(e,o,t){const i=this._notebookSerializer.get(e);if(!i)throw new Error("NO serializer found");const r=await i.serializer.serializeNotebook(m.NotebookData.to(o.value),t);return x.wrap(r)}async $saveNotebook(e,o,t,i,r){const s=_.revive(o),l=this._notebookSerializer.get(e);if(this.trace(`enter saveNotebook(versionId: ${t}, ${s.toString()})`),!l)throw new Error("NO serializer found");const d=this._documents.get(s);if(!d)throw new Error("Document NOT found");if(d.versionId!==t)throw new Error("Document version mismatch");if(!this._extHostFileSystem.value.isWritableFileSystem(s.scheme))throw new f.FileOperationError(M("err.readonly","Unable to modify read-only file '{0}'",this._resourceForError(s)),f.FileOperationResult.FILE_PERMISSION_DENIED);const c={metadata:O(d.apiNotebook.metadata,n=>!(l.options?.transientDocumentMetadata??{})[n]),cells:[]};for(const n of d.apiNotebook.getCells()){const v=new H.NotebookCellData(n.kind,n.document.getText(),n.document.languageId,n.mime,l.options?.transientOutputs?[]:[...n.outputs],n.metadata,n.executionSummary);v.metadata=O(n.metadata,w=>!(l.options?.transientCellMetadata??{})[w]),c.cells.push(v)}if(await this._validateWriteFile(s,i),r.isCancellationRequested)throw new Error("canceled");const b=await l.serializer.serializeNotebook(c,r);if(r.isCancellationRequested)throw new Error("canceled");this.trace(`serialized versionId: ${t} ${s.toString()}`),await this._extHostFileSystem.value.writeFile(s,b),this.trace(`Finished write versionId: ${t} ${s.toString()}`);const y=this._extHostFileSystem.getFileSystemProviderExtUri(s.scheme),a=await this._extHostFileSystem.value.stat(s),k={name:y.basename(s),isFile:(a.type&f.FileType.File)!==0,isDirectory:(a.type&f.FileType.Directory)!==0,isSymbolicLink:(a.type&f.FileType.SymbolicLink)!==0,mtime:a.mtime,ctime:a.ctime,size:a.size,readonly:!!((a.permissions??0)&f.FilePermission.Readonly)||!this._extHostFileSystem.value.isWritableFileSystem(s.scheme),locked:!!((a.permissions??0)&f.FilePermission.Locked),etag:f.etag({mtime:a.mtime,size:a.size}),children:void 0};return this.trace(`exit saveNotebook(versionId: ${t}, ${s.toString()})`),k}async $searchInNotebooks(e,o,t,i,r){const s=this._notebookSerializer.get(e)?.serializer;if(!s)return{limitHit:!1,results:[]};const l=new V;await(async(a,k,n)=>{await Promise.all(a.map(async v=>await Promise.all(v.filenamePatterns.map(w=>{const h={_reason:n._reason,folderQueries:n.folderQueries,includePattern:n.includePattern,excludePattern:n.excludePattern,maxResults:n.maxResults,type:K.File,filePattern:w};return this._extHostSearch.doInternalFileSearchWithCustomCallback(h,k,u=>{u.forEach(p=>{l.has(p)||i.some(N=>v.isFromSettings&&!N.isFromSettings?!1:N.filenamePatterns.some(g=>ee(g,p)))||l.add(p)})}).catch(u=>{if(u.code==="ENOENT")return{limitHit:!1,messages:[]};throw u})}))))})(t,r,o);const c=new A;let b=!1;const y=Array.from(l).map(async a=>{const k=[];try{if(r.isCancellationRequested)return;if(o.maxResults&&[...c.values()].reduce((h,u)=>h+u.cellResults.length,0)>o.maxResults){b=!0;return}const n=[],v=this._documents.get(a);if(v)v.apiNotebook.getCells().forEach(u=>n.push({input:u.document.getText(),outputs:u.outputs.flatMap(p=>p.items.map(D=>D.data.toString()))}));else{const h=await this._extHostFileSystem.value.readFile(a),u=x.fromString(h.toString()),p=await s.deserializeNotebook(u.buffer,r);if(r.isCancellationRequested)return;m.NotebookData.from(p).cells.forEach(N=>n.push({input:N.source,outputs:N.outputs.flatMap(g=>g.items.map(I=>I.valueBytes.toString()))}))}if(r.isCancellationRequested)return;n.forEach((h,u)=>{const p=o.contentPattern.pattern,D=new Z(h.input,void 0,h.outputs),N=D.findInInputs(p),g=D.findInOutputs(p),I=g.flatMap(E=>$(E.matches,E.textBuffer)).map((E,U)=>(E.webviewIndex=U,E));if(N.length>0||g.length>0){const E={index:u,contentResults:$(N,D.inputTextBuffer),webviewResults:I};k.push(E)}});const w={resource:a,cellResults:k};c.set(a,w);return}catch{return}});return await Promise.all(y),{limitHit:b,results:[...c.values()]}}async _validateWriteFile(e,o){const t=await this._extHostFileSystem.value.stat(e);if(typeof o?.mtime=="number"&&typeof o.etag=="string"&&o.etag!==f.ETAG_DISABLED&&typeof t.mtime=="number"&&typeof t.size=="number"&&o.mtime<t.mtime&&o.etag!==f.etag({mtime:o.mtime,size:t.size}))throw new f.FileOperationError(M("fileModifiedError","File Modified Since"),f.FileOperationResult.FILE_MODIFIED_SINCE,o)}_resourceForError(e){return e.scheme===J.file?e.fsPath:e.toString()}_createExtHostEditor(e,o,t){if(this._editors.has(o))throw new Error(`editor with id ALREADY EXSIST: ${o}`);const i=new Y(o,this._notebookEditorsProxy,e,t.visibleRanges.map(m.NotebookRange.to),t.selections.map(m.NotebookRange.to),typeof t.viewColumn=="number"?m.ViewColumn.to(t.viewColumn):void 0,t.viewType);this._editors.set(o,i)}$acceptDocumentAndEditorsDelta(e){if(e.value.removedDocuments)for(const t of e.value.removedDocuments){const i=_.revive(t),r=this._documents.get(i);r&&(r.dispose(),this._documents.delete(i),this._textDocumentsAndEditors.$acceptDocumentsAndEditorsDelta({removedDocuments:r.apiNotebook.getCells().map(s=>s.document.uri)}),this._onDidCloseNotebookDocument.fire(r.apiNotebook));for(const s of this._editors.values())s.notebookData.uri.toString()===i.toString()&&this._editors.delete(s.id)}if(e.value.addedDocuments){const t=[];for(const i of e.value.addedDocuments){const r=_.revive(i.uri);if(this._documents.has(r))throw new Error(`adding EXISTING notebook ${r} `);const s=new X(this._notebookDocumentsProxy,this._textDocumentsAndEditors,this._textDocuments,r,i);t.push(...i.cells.map(l=>G.asModelAddData(l))),this._documents.get(r)?.dispose(),this._documents.set(r,s),this._textDocumentsAndEditors.$acceptDocumentsAndEditorsDelta({addedDocuments:t}),this._onDidOpenNotebookDocument.fire(s.apiNotebook)}}if(e.value.addedEditors)for(const t of e.value.addedEditors){if(this._editors.has(t.id))return;const i=_.revive(t.documentUri),r=this._documents.get(i);r&&this._createExtHostEditor(r,t.id,t)}const o=[];if(e.value.removedEditors)for(const t of e.value.removedEditors){const i=this._editors.get(t);i&&(this._editors.delete(t),this._activeNotebookEditor?.id===i.id&&(this._activeNotebookEditor=void 0),o.push(i))}if(e.value.visibleEditors){this._visibleNotebookEditors=e.value.visibleEditors.map(i=>this._editors.get(i)).filter(i=>!!i);const t=new Set;this._visibleNotebookEditors.forEach(i=>t.add(i.id));for(const i of this._editors.values()){const r=t.has(i.id);i._acceptVisibility(r)}this._visibleNotebookEditors=[...this._editors.values()].map(i=>i).filter(i=>i.visible),this._onDidChangeVisibleNotebookEditors.fire(this.visibleNotebookEditors)}if(e.value.newActiveEditor===null)this._activeNotebookEditor=void 0;else if(e.value.newActiveEditor){const t=this._editors.get(e.value.newActiveEditor);this._activeNotebookEditor=this._editors.get(e.value.newActiveEditor)}e.value.newActiveEditor!==void 0&&this._onDidChangeActiveNotebookEditor.fire(this._activeNotebookEditor?.apiEditor)}static _registerApiCommands(e){const o=F.String.with("notebookType","A notebook type"),t=new R("vscode.executeDataToNotebook","_executeDataToNotebook","Invoke notebook serializer",[o,new F("data","Bytes to convert to data",r=>r instanceof Uint8Array,r=>x.wrap(r))],new B("Notebook Data",r=>m.NotebookData.to(r.value))),i=new R("vscode.executeNotebookToData","_executeNotebookToData","Invoke notebook serializer",[o,new F("NotebookData","Notebook data to convert to bytes",r=>!0,r=>new z(m.NotebookData.from(r)))],new B("Bytes",r=>r.buffer));e.registerApiCommand(t),e.registerApiCommand(i)}trace(e){this._logService.trace(`[Extension Host Notebook] ${e}`)}}export{S as ExtHostNotebookController};
