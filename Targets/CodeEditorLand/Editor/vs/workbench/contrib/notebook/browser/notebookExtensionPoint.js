import"../../../../base/common/jsonSchema.js";import*as e from"../../../../nls.js";import{ExtensionsRegistry as b}from"../../../services/extensions/common/extensionsRegistry.js";import{NotebookEditorPriority as c}from"../common/notebookCommon.js";import{Disposable as u}from"../../../../base/common/lifecycle.js";import"../../../../platform/extensions/common/extensions.js";import{SyncDescriptor as y}from"../../../../platform/instantiation/common/descriptors.js";import{Extensions as m}from"../../../services/extensionManagement/common/extensionFeatures.js";import{Registry as k}from"../../../../platform/registry/common/platform.js";const i=Object.freeze({type:"type",displayName:"displayName",selector:"selector",priority:"priority"}),o=Object.freeze({id:"id",displayName:"displayName",mimeTypes:"mimeTypes",entrypoint:"entrypoint",hardDependencies:"dependencies",optionalDependencies:"optionalDependencies",requiresMessaging:"requiresMessaging"}),a=Object.freeze({type:"type",entrypoint:"entrypoint",localResourceRoots:"localResourceRoots"}),g={description:e.localize("contributes.notebook.provider","Contributes notebook document provider."),type:"array",defaultSnippets:[{body:[{type:"",displayName:"",selector:[{filenamePattern:""}]}]}],items:{type:"object",required:[i.type,i.displayName,i.selector],properties:{[i.type]:{type:"string",description:e.localize("contributes.notebook.provider.viewType","Type of the notebook.")},[i.displayName]:{type:"string",description:e.localize("contributes.notebook.provider.displayName","Human readable name of the notebook.")},[i.selector]:{type:"array",description:e.localize("contributes.notebook.provider.selector","Set of globs that the notebook is for."),items:{type:"object",properties:{filenamePattern:{type:"string",description:e.localize("contributes.notebook.provider.selector.filenamePattern","Glob that the notebook is enabled for.")},excludeFileNamePattern:{type:"string",description:e.localize("contributes.notebook.selector.provider.excludeFileNamePattern","Glob that the notebook is disabled for.")}}}},[i.priority]:{type:"string",markdownDeprecationMessage:e.localize("contributes.priority","Controls if the custom editor is enabled automatically when the user opens a file. This may be overridden by users using the `workbench.editorAssociations` setting."),enum:[c.default,c.option],markdownEnumDescriptions:[e.localize("contributes.priority.default","The editor is automatically used when the user opens a resource, provided that no other default custom editors are registered for that resource."),e.localize("contributes.priority.option","The editor is not automatically used when the user opens a resource, but a user can switch to the editor using the `Reopen With` command.")],default:"default"}}}},h=Object.freeze({id:"",displayName:"",mimeTypes:[""],entrypoint:""}),f={description:e.localize("contributes.notebook.renderer","Contributes notebook output renderer provider."),type:"array",defaultSnippets:[{body:[h]}],items:{defaultSnippets:[{body:h}],allOf:[{type:"object",required:[o.id,o.displayName],properties:{[o.id]:{type:"string",description:e.localize("contributes.notebook.renderer.viewType","Unique identifier of the notebook output renderer.")},[o.displayName]:{type:"string",description:e.localize("contributes.notebook.renderer.displayName","Human readable name of the notebook output renderer.")},[o.hardDependencies]:{type:"array",uniqueItems:!0,items:{type:"string"},markdownDescription:e.localize("contributes.notebook.renderer.hardDependencies","List of kernel dependencies the renderer requires. If any of the dependencies are present in the `NotebookKernel.preloads`, the renderer can be used.")},[o.optionalDependencies]:{type:"array",uniqueItems:!0,items:{type:"string"},markdownDescription:e.localize("contributes.notebook.renderer.optionalDependencies","List of soft kernel dependencies the renderer can make use of. If any of the dependencies are present in the `NotebookKernel.preloads`, the renderer will be preferred over renderers that don't interact with the kernel.")},[o.requiresMessaging]:{default:"never",enum:["always","optional","never"],enumDescriptions:[e.localize("contributes.notebook.renderer.requiresMessaging.always","Messaging is required. The renderer will only be used when it's part of an extension that can be run in an extension host."),e.localize("contributes.notebook.renderer.requiresMessaging.optional","The renderer is better with messaging available, but it's not requried."),e.localize("contributes.notebook.renderer.requiresMessaging.never","The renderer does not require messaging.")],description:e.localize("contributes.notebook.renderer.requiresMessaging","Defines how and if the renderer needs to communicate with an extension host, via `createRendererMessaging`. Renderers with stronger messaging requirements may not work in all environments.")}}},{oneOf:[{required:[o.entrypoint,o.mimeTypes],properties:{[o.mimeTypes]:{type:"array",description:e.localize("contributes.notebook.selector","Set of globs that the notebook is for."),items:{type:"string"}},[o.entrypoint]:{description:e.localize("contributes.notebook.renderer.entrypoint","File to load in the webview to render the extension."),type:"string"}}},{required:[o.entrypoint],properties:{[o.entrypoint]:{description:e.localize("contributes.notebook.renderer.entrypoint","File to load in the webview to render the extension."),type:"object",required:["extends","path"],properties:{extends:{type:"string",description:e.localize("contributes.notebook.renderer.entrypoint.extends","Existing renderer that this one extends.")},path:{type:"string",description:e.localize("contributes.notebook.renderer.entrypoint","File to load in the webview to render the extension.")}}}}}]}]}},N={description:e.localize("contributes.preload.provider","Contributes notebook preloads."),type:"array",defaultSnippets:[{body:[{type:"",entrypoint:""}]}],items:{type:"object",required:[a.type,a.entrypoint],properties:{[a.type]:{type:"string",description:e.localize("contributes.preload.provider.viewType","Type of the notebook.")},[a.entrypoint]:{type:"string",description:e.localize("contributes.preload.entrypoint","Path to file loaded in the webview.")},[a.localResourceRoots]:{type:"array",items:{type:"string"},description:e.localize("contributes.preload.localResourceRoots","Paths to additional resources that should be allowed in the webview.")}}}},H=b.registerExtensionPoint({extensionPoint:"notebooks",jsonSchema:g,activationEventsGenerator:(s,t)=>{for(const r of s)r.type&&t.push(`onNotebookSerializer:${r.type}`)}}),K=b.registerExtensionPoint({extensionPoint:"notebookRenderer",jsonSchema:f,activationEventsGenerator:(s,t)=>{for(const r of s)r.id&&t.push(`onRenderer:${r.id}`)}}),L=b.registerExtensionPoint({extensionPoint:"notebookPreload",jsonSchema:N});class R extends u{type="table";shouldRender(t){return!!t.contributes?.notebooks}render(t){const r=t.contributes?.notebooks||[];if(!r.length)return{data:{headers:[],rows:[]},dispose:()=>{}};const d=[e.localize("Notebook id","ID"),e.localize("Notebook name","Name")],l=r.sort((n,p)=>n.type.localeCompare(p.type)).map(n=>[n.type,n.displayName]);return{data:{headers:d,rows:l},dispose:()=>{}}}}class x extends u{type="table";shouldRender(t){return!!t.contributes?.notebookRenderer}render(t){const r=t.contributes?.notebookRenderer||[];if(!r.length)return{data:{headers:[],rows:[]},dispose:()=>{}};const d=[e.localize("Notebook renderer name","Name"),e.localize("Notebook mimetypes","Mimetypes")],l=r.sort((n,p)=>n.displayName.localeCompare(p.displayName)).map(n=>[n.displayName,n.mimeTypes.join(",")]);return{data:{headers:d,rows:l},dispose:()=>{}}}}k.as(m.ExtensionFeaturesRegistry).registerExtensionFeature({id:"notebooks",label:e.localize("notebooks","Notebooks"),access:{canToggle:!1},renderer:new y(R)}),k.as(m.ExtensionFeaturesRegistry).registerExtensionFeature({id:"notebookRenderer",label:e.localize("notebookRenderer","Notebook Renderers"),access:{canToggle:!1},renderer:new y(x)});export{L as notebookPreloadExtensionPoint,K as notebookRendererExtensionPoint,H as notebooksExtensionPoint};
