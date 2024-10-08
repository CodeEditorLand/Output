var y=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var m=(s,i,n,a)=>{for(var r=a>1?void 0:a?b(i,n):i,t=s.length-1,e;t>=0;t--)(e=s[t])&&(r=(a?e(i,n,r):e(r))||r);return a&&r&&y(i,n,r),r},h=(s,i)=>(n,a)=>i(n,a,s);import"../../../../../base/common/jsonSchema.js";import{DisposableMap as w}from"../../../../../base/common/lifecycle.js";import{joinPath as c}from"../../../../../base/common/resources.js";import{ThemeIcon as I}from"../../../../../base/common/themables.js";import{localize as o}from"../../../../../nls.js";import{ContextKeyExpr as v}from"../../../../../platform/contextkey/common/contextkey.js";import"../../../../../platform/extensions/common/extensions.js";import{ILogService as k}from"../../../../../platform/log/common/log.js";import"../../../../common/contributions.js";import{ILanguageModelToolsService as x}from"../languageModelToolsService.js";import*as T from"../../../../services/extensions/common/extensionsRegistry.js";const D=T.ExtensionsRegistry.registerExtensionPoint({extensionPoint:"languageModelTools",activationEventsGenerator:(s,i)=>{for(const n of s)i.push(`onLanguageModelTool:${n.id}`)},jsonSchema:{description:o("vscode.extension.contributes.tools","Contributes a tool that can be invoked by a language model."),type:"array",items:{additionalProperties:!1,type:"object",defaultSnippets:[{body:{name:"",description:""}}],required:["id","modelDescription"],properties:{id:{description:o("toolId","A unique id for this tool."),type:"string",pattern:"^[\\w-]+$"},name:{markdownDescription:o("toolName","If {0} is enabled for this tool, the user may use '#' with this name to invoke the tool in a query. Otherwise, the name is not required. Name must not contain whitespace.","`canBeInvokedManually`"),type:"string",pattern:"^[\\w-]+$"},displayName:{description:o("toolDisplayName","A human-readable name for this tool that may be used to describe it in the UI."),type:"string"},userDescription:{description:o("toolUserDescription","A description of this tool that may be shown to the user."),type:"string"},modelDescription:{description:o("toolModelDescription","A description of this tool that may be passed to a language model."),type:"string"},parametersSchema:{description:o("parametersSchema","A JSON schema for the parameters this tool accepts."),type:"object",$ref:"http://json-schema.org/draft-07/schema#"},canBeInvokedManually:{description:o("canBeInvokedManually","Whether this tool can be invoked manually by the user through the chat UX."),type:"boolean"},icon:{markdownDescription:o("icon","An icon that represents this tool. Either a file path, an object with file paths for dark and light themes, or a theme icon reference, like `$(zap)`"),anyOf:[{type:"string"},{type:"object",properties:{light:{description:o("icon.light","Icon path when a light theme is used"),type:"string"},dark:{description:o("icon.dark","Icon path when a dark theme is used"),type:"string"}}}]},when:{markdownDescription:o("condition","Condition which must be true for this tool to be enabled. Note that a tool may still be invoked by another extension even when its `when` condition is false."),type:"string"},supportedContentTypes:{markdownDescription:o("contentTypes","The list of content types that this tool can return. It's required that tools support `text/plain`, and that is assumed even if not specified here. Another example could be the contentType exported by the `@vscode/prompt-tsx` library."),type:"array",items:{type:"string"}},requiresConfirmation:{description:o("requiresConfirmation","Whether this tool requires user confirmation before being executed.")},tags:{description:o("toolTags","A set of tags that roughly describe the tool's capabilities. A tool user may use these to filter the set of tools to just ones that are relevant for the task at hand."),type:"array",items:{type:"string"}}}}}});function u(s,i){return`${s.value}/${i}`}let d=class{static ID="workbench.contrib.toolsExtensionPointHandler";_registrationDisposables=new w;constructor(i,n){D.setHandler((a,r)=>{for(const t of r.added)for(const e of t.value){if(!e.id||!e.modelDescription){n.error(`Extension '${t.description.identifier.value}' CANNOT register tool without name and modelDescription: ${JSON.stringify(e)}`);continue}if(!e.id.match(/^[\w-]+$/)){n.error(`Extension '${t.description.identifier.value}' CANNOT register tool with invalid id: ${e.id}. The id must match /^[\\w-]+$/.`);continue}if(e.canBeInvokedManually&&!e.name){n.error(`Extension '${t.description.identifier.value}' CANNOT register tool with 'canBeInvokedManually' set without a name: ${JSON.stringify(e)}`);continue}const p=e.icon;let l;typeof p=="string"?l=I.fromString(p)??{dark:c(t.description.extensionLocation,p),light:c(t.description.extensionLocation,p)}:p&&(l={dark:c(t.description.extensionLocation,p.dark),light:c(t.description.extensionLocation,p.light)});const f={...e,icon:l,when:e.when?v.deserialize(e.when):void 0,supportedContentTypes:e.supportedContentTypes?e.supportedContentTypes:[]},g=i.registerToolData(f);this._registrationDisposables.set(u(t.description.identifier,e.id),g)}for(const t of r.removed)for(const e of t.value)this._registrationDisposables.deleteAndDispose(u(t.description.identifier,e.id))})}};d=m([h(0,x),h(1,k)],d);export{d as LanguageModelToolsExtensionPointHandler};
