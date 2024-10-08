import"./media/panelpart.css";import{localize as t,localize2 as i}from"../../../../nls.js";import{KeyMod as F,KeyCode as J}from"../../../../base/common/keyCodes.js";import{MenuId as l,MenuRegistry as h,registerAction2 as s,Action2 as f}from"../../../../platform/actions/common/actions.js";import{Categories as P}from"../../../../platform/action/common/actionCommonCategories.js";import{ActivityBarPosition as K,isHorizontal as G,IWorkbenchLayoutService as A,LayoutSettings as U,Parts as m,Position as T,positionToString as Y}from"../../../services/layout/browser/layoutService.js";import{AuxiliaryBarVisibleContext as W,PanelAlignmentContext as M,PanelMaximizedContext as X,PanelPositionContext as w,PanelVisibleContext as C}from"../../../common/contextkeys.js";import{ContextKeyExpr as p}from"../../../../platform/contextkey/common/contextkey.js";import{Codicon as v}from"../../../../base/common/codicons.js";import{registerIcon as S}from"../../../../platform/theme/common/iconRegistry.js";import"../../../../editor/browser/editorExtensions.js";import{ViewContainerLocationToString as j,ViewContainerLocation as c,IViewDescriptorService as $}from"../../../common/views.js";import{IViewsService as Q}from"../../../services/views/common/viewsService.js";import{IPaneCompositePartService as O}from"../../../services/panecomposite/browser/panecomposite.js";import{INotificationService as Z}from"../../../../platform/notification/common/notification.js";import"../../../../platform/action/common/action.js";import{KeybindingWeight as ee}from"../../../../platform/keybinding/common/keybindingsRegistry.js";const ne=S("panel-maximize",v.chevronUp,t("maximizeIcon","Icon to maximize a panel.")),oe=S("panel-restore",v.chevronDown,t("restoreIcon","Icon to restore a panel.")),D=S("panel-close",v.close,t("closeIcon","Icon to close a panel.")),te=S("panel-layout-icon",v.layoutPanel,t("togglePanelOffIcon","Icon to toggle the panel off when it is on.")),ie=S("panel-layout-icon-off",v.layoutPanelOff,t("togglePanelOnIcon","Icon to toggle the panel on when it is off."));class y extends f{static ID="workbench.action.togglePanel";static LABEL=i("togglePanelVisibility","Toggle Panel Visibility");constructor(){super({id:y.ID,title:y.LABEL,toggled:{condition:C,title:t("toggle panel","Panel"),mnemonicTitle:t({key:"toggle panel mnemonic",comment:["&& denotes a mnemonic"]},"&&Panel")},f1:!0,category:P.View,keybinding:{primary:F.CtrlCmd|J.KeyJ,weight:ee.WorkbenchContrib},menu:[{id:l.MenubarAppearanceMenu,group:"2_workbench_layout",order:5},{id:l.LayoutControlMenuSubmenu,group:"0_workbench_layout",order:4}]})}async run(e){const n=e.get(A);n.setPartHidden(n.isVisible(m.PANEL_PART),m.PANEL_PART)}}s(y),s(class extends f{static ID="workbench.action.focusPanel";static LABEL=t("focusPanel","Focus into Panel");constructor(){super({id:"workbench.action.focusPanel",title:i("focusPanel","Focus into Panel"),category:P.View,f1:!0})}async run(o){const e=o.get(A),n=o.get(O);e.isVisible(m.PANEL_PART)||e.setPartHidden(!1,m.PANEL_PART),n.getActivePaneComposite(c.Panel)?.focus()}});const I={LEFT:"workbench.action.positionPanelLeft",RIGHT:"workbench.action.positionPanelRight",BOTTOM:"workbench.action.positionPanelBottom",TOP:"workbench.action.positionPanelTop"},x={LEFT:"workbench.action.alignPanelLeft",RIGHT:"workbench.action.alignPanelRight",CENTER:"workbench.action.alignPanelCenter",JUSTIFY:"workbench.action.alignPanelJustify"};function H(o,e,n,a,r){return{id:o,title:e,shortLabel:n,value:a,when:r}}function b(o,e,n,a){return H(o,e,n,a,w.notEqualsTo(Y(a)))}function L(o,e,n,a){return H(o,e,n,a,M.notEqualsTo(a))}const ae=[b(I.TOP,i("positionPanelTop","Move Panel To Top"),t("positionPanelTopShort","Top"),T.TOP),b(I.LEFT,i("positionPanelLeft","Move Panel Left"),t("positionPanelLeftShort","Left"),T.LEFT),b(I.RIGHT,i("positionPanelRight","Move Panel Right"),t("positionPanelRightShort","Right"),T.RIGHT),b(I.BOTTOM,i("positionPanelBottom","Move Panel To Bottom"),t("positionPanelBottomShort","Bottom"),T.BOTTOM)],re=[L(x.LEFT,i("alignPanelLeft","Set Panel Alignment to Left"),t("alignPanelLeftShort","Left"),"left"),L(x.RIGHT,i("alignPanelRight","Set Panel Alignment to Right"),t("alignPanelRightShort","Right"),"right"),L(x.CENTER,i("alignPanelCenter","Set Panel Alignment to Center"),t("alignPanelCenterShort","Center"),"center"),L(x.JUSTIFY,i("alignPanelJustify","Set Panel Alignment to Justify"),t("alignPanelJustifyShort","Justify"),"justify")];h.appendMenuItem(l.MenubarAppearanceMenu,{submenu:l.PanelPositionMenu,title:t("positionPanel","Panel Position"),group:"3_workbench_layout_move",order:4}),ae.forEach((o,e)=>{const{id:n,title:a,shortLabel:r,value:d,when:g}=o;s(class extends f{constructor(){super({id:n,title:a,category:P.View,f1:!0})}run(u){u.get(A).setPanelPosition(d===void 0?T.BOTTOM:d)}}),h.appendMenuItem(l.PanelPositionMenu,{command:{id:n,title:r,toggled:g.negate()},order:5+e})}),h.appendMenuItem(l.MenubarAppearanceMenu,{submenu:l.PanelAlignmentMenu,title:t("alignPanel","Align Panel"),group:"3_workbench_layout_move",order:5}),re.forEach(o=>{const{id:e,title:n,shortLabel:a,value:r,when:d}=o;s(class extends f{constructor(){super({id:e,title:n,category:P.View,toggled:d.negate(),f1:!0})}run(g){g.get(A).setPanelAlignment(r===void 0?"center":r)}}),h.appendMenuItem(l.PanelAlignmentMenu,{command:{id:e,title:a,toggled:d.negate()},order:5})});class N extends f{constructor(e,n){super({id:e,title:n,category:P.View,f1:!0})}async run(e,n){const a=e.get(O),r=a.getVisiblePaneCompositeIds(c.Panel),d=a.getActivePaneComposite(c.Panel);if(!d)return;let g;for(let u=0;u<r.length;u++)if(r[u]===d.getId()){g=r[(u+r.length+n)%r.length];break}typeof g=="string"&&await a.openPaneComposite(g,c.Panel,!0)}}s(class extends N{constructor(){super("workbench.action.previousPanelView",i("previousPanelView","Previous Panel View"))}run(o){return super.run(o,-1)}}),s(class extends N{constructor(){super("workbench.action.nextPanelView",i("nextPanelView","Next Panel View"))}run(o){return super.run(o,1)}}),s(class extends f{constructor(){super({id:"workbench.action.toggleMaximizedPanel",title:i("toggleMaximizedPanel","Toggle Maximized Panel"),tooltip:t("maximizePanel","Maximize Panel Size"),category:P.View,f1:!0,icon:ne,precondition:p.or(M.isEqualTo("center"),p.and(w.notEqualsTo("bottom"),w.notEqualsTo("top"))),toggled:{condition:X,icon:oe,tooltip:t("minimizePanel","Restore Panel Size")},menu:[{id:l.PanelTitle,group:"navigation",order:1,when:p.or(M.isEqualTo("center"),p.and(w.notEqualsTo("bottom"),w.notEqualsTo("top")))}]})}run(o){const e=o.get(A),n=o.get(Z);if(e.getPanelAlignment()!=="center"&&G(e.getPanelPosition())){n.warn(t("panelMaxNotSupported","Maximizing the panel is only supported when it is center aligned."));return}e.isVisible(m.PANEL_PART)?e.toggleMaximizedPanel():(e.setPartHidden(!1,m.PANEL_PART),e.isPanelMaximized()||e.toggleMaximizedPanel())}}),s(class extends f{constructor(){super({id:"workbench.action.closePanel",title:i("closePanel","Hide Panel"),category:P.View,icon:D,menu:[{id:l.CommandPalette,when:C},{id:l.PanelTitle,group:"navigation",order:2}]})}run(o){o.get(A).setPartHidden(!0,m.PANEL_PART)}}),s(class extends f{constructor(){super({id:"workbench.action.closeAuxiliaryBar",title:i("closeSecondarySideBar","Hide Secondary Side Bar"),category:P.View,icon:D,menu:[{id:l.CommandPalette,when:W},{id:l.AuxiliaryBarTitle,group:"navigation",order:2,when:p.notEquals(`config.${U.ACTIVITY_BAR_LOCATION}`,K.TOP)}]})}run(o){o.get(A).setPartHidden(!0,m.AUXILIARYBAR_PART)}}),h.appendMenuItems([{id:l.LayoutControlMenu,item:{group:"0_workbench_toggles",command:{id:y.ID,title:t("togglePanel","Toggle Panel"),icon:ie,toggled:{condition:C,icon:te}},when:p.or(p.equals("config.workbench.layoutControl.type","toggles"),p.equals("config.workbench.layoutControl.type","both")),order:1}},{id:l.ViewTitleContext,item:{group:"3_workbench_layout_move",command:{id:y.ID,title:i("hidePanel","Hide Panel")},when:p.and(C,p.equals("viewLocation",j(c.Panel))),order:2}}]);class V extends f{constructor(n,a,r){super(r);this.source=n;this.destination=a}run(n,...a){const r=n.get($),d=n.get(A),g=n.get(Q),u=r.getViewContainersByLocation(this.source),_=r.getViewContainersByLocation(this.destination);if(u.length){const z=g.getVisibleViewContainer(this.source);u.forEach(q=>r.moveViewContainerToLocation(q,this.destination,void 0,this.desc.id)),d.setPartHidden(!1,this.destination===c.Panel?m.PANEL_PART:m.AUXILIARYBAR_PART),z&&_.length===0&&g.openViewContainer(z.id,!0)}}}class B extends V{static ID="workbench.action.movePanelToSidePanel";constructor(){super(c.Panel,c.AuxiliaryBar,{id:B.ID,title:i("movePanelToSecondarySideBar","Move Panel Views To Secondary Side Bar"),category:P.View,f1:!1})}}class E extends V{static ID="workbench.action.movePanelToSecondarySideBar";constructor(){super(c.Panel,c.AuxiliaryBar,{id:E.ID,title:i("movePanelToSecondarySideBar","Move Panel Views To Secondary Side Bar"),category:P.View,f1:!0})}}s(B),s(E);class R extends V{static ID="workbench.action.moveSidePanelToPanel";constructor(){super(c.AuxiliaryBar,c.Panel,{id:R.ID,title:i("moveSidePanelToPanel","Move Secondary Side Bar Views To Panel"),category:P.View,f1:!1})}}class k extends V{static ID="workbench.action.moveSecondarySideBarToPanel";constructor(){super(c.AuxiliaryBar,c.Panel,{id:k.ID,title:i("moveSidePanelToPanel","Move Secondary Side Bar Views To Panel"),category:P.View,f1:!0})}}s(R),s(k);export{E as MovePanelToSecondarySideBarAction,k as MoveSecondarySideBarToPanelAction,y as TogglePanelAction};
