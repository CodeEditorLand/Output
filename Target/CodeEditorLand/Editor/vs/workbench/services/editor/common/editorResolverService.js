import*as n from"../../../../base/common/glob.js";import"../../../../base/common/event.js";import"../../../../base/common/lifecycle.js";import{Schemas as i}from"../../../../base/common/network.js";import{posix as s}from"../../../../base/common/path.js";import{basename as d}from"../../../../base/common/resources.js";import"../../../../base/common/uri.js";import{localize as p}from"../../../../nls.js";import{workbenchConfigurationNodeBase as u}from"../../../common/configuration.js";import{Extensions as a}from"../../../../platform/configuration/common/configurationRegistry.js";import"../../../../platform/editor/common/editor.js";import{createDecorator as c}from"../../../../platform/instantiation/common/instantiation.js";import{Registry as I}from"../../../../platform/registry/common/platform.js";import"../../../common/editor.js";import"./editorGroupsService.js";import"./editorService.js";import"../../../../base/common/types.js";const X=c("editorResolverService"),Y="workbench.editorAssociations",E=I.as(a.Configuration),f={...u,properties:{"workbench.editorAssociations":{type:"object",markdownDescription:p("editor.editorAssociations",'Configure [glob patterns](https://aka.ms/vscode-glob-patterns) to editors (for example `"*.hex": "hexEditor.hexedit"`). These have precedence over the default behavior.'),additionalProperties:{type:"string"}}}};E.registerConfiguration(f);var l=(o=>(o.builtin="builtin",o.option="option",o.exclusive="exclusive",o.default="default",o))(l||{}),g=(e=>(e[e.ABORT=1]="ABORT",e[e.NONE=2]="NONE",e))(g||{});function Z(t){switch(t){case"exclusive":return 5;case"default":return 4;case"builtin":return 3;case"option":default:return 1}}function tt(t,r){if(new Set([i.extension,i.webviewPanel,i.vscodeWorkspaceTrust,i.vscodeSettings]).has(r.scheme))return!1;const o=typeof t=="string"&&t.indexOf(s.sep)>=0?`${r.scheme}:${r.path}`:d(r);return n.match(typeof t=="string"?t.toLowerCase():t,o.toLowerCase())}export{X as IEditorResolverService,l as RegisteredEditorPriority,g as ResolvedStatus,Y as editorsAssociationsSettingId,tt as globMatchesResource,Z as priorityToRank};
