import{localize as e}from"../../../../nls.js";import{SyncDescriptor as u}from"../../../../platform/instantiation/common/descriptors.js";import{InstantiationType as g,registerSingleton as y}from"../../../../platform/instantiation/common/extensions.js";import{Registry as l}from"../../../../platform/registry/common/platform.js";import{Extensions as I}from"../../../common/views.js";import{VIEW_CONTAINER as w}from"../../files/browser/explorerViewlet.js";import{ITimelineService as m,TimelinePaneId as h}from"../common/timeline.js";import{TimelineHasProviderContext as a,TimelineService as T}from"../common/timelineService.js";import{TimelinePane as s}from"./timelinePane.js";import{Extensions as C}from"../../../../platform/configuration/common/configurationRegistry.js";import{ContextKeyExpr as x}from"../../../../platform/contextkey/common/contextkey.js";import{MenuId as t,MenuRegistry as p}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as S}from"../../../../platform/commands/common/commands.js";import{ExplorerFolderContext as v}from"../../files/common/files.js";import{ResourceContextKey as E}from"../../../common/contextkeys.js";import{Codicon as o}from"../../../../base/common/codicons.js";import{registerIcon as n}from"../../../../platform/theme/common/iconRegistry.js";import"../../../../platform/action/common/action.js";const V=n("timeline-view-icon",o.history,e("timelineViewIcon","View icon of the timeline view.")),b=n("timeline-open",o.history,e("timelineOpenIcon","Icon for the open timeline action."));class R{id=h;name=s.TITLE;containerIcon=V;ctorDescriptor=new u(s);order=2;weight=30;collapsed=!0;canToggleVisibility=!0;hideByDefault=!1;canMoveView=!0;when=a;focusCommand={id:"timeline.focus"}}const D=l.as(C.Configuration);D.registerConfiguration({id:"timeline",order:1001,title:e("timelineConfigurationTitle","Timeline"),type:"object",properties:{"timeline.pageSize":{type:["number","null"],default:null,markdownDescription:e("timeline.pageSize","The number of items to show in the Timeline view by default and when loading more items. Setting to `null` (the default) will automatically choose a page size based on the visible area of the Timeline view.")},"timeline.pageOnScroll":{type:"boolean",default:!1,description:e("timeline.pageOnScroll","Experimental. Controls whether the Timeline view will load the next page of items when you scroll to the end of the list.")}}}),l.as(I.ViewsRegistry).registerViews([new R],w);var i;(r=>{r.ID="files.openTimeline",r.LABEL=e("files.openTimeline","Open Timeline");function M(){return(d,f)=>d.get(m).setUri(f)}r.handler=M})(i||={}),S.registerCommand(i.ID,i.handler()),p.appendMenuItem(t.ExplorerContext,{group:"4_timeline",order:1,command:{id:i.ID,title:i.LABEL,icon:b},when:x.and(v.toNegated(),E.HasResource,a)});const L=n("timeline-filter",o.filter,e("timelineFilter","Icon for the filter timeline action."));p.appendMenuItem(t.TimelineTitle,{submenu:t.TimelineFilterSubMenu,title:e("filterTimeline","Filter Timeline"),group:"navigation",order:100,icon:L}),y(m,T,g.Delayed);export{R as TimelinePaneDescriptor};
