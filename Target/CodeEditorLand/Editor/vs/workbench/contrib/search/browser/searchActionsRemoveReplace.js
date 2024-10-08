import"../../../../base/browser/ui/tree/tree.js";import*as y from"../../../../nls.js";import{IConfigurationService as V}from"../../../../platform/configuration/common/configuration.js";import"../../../../platform/instantiation/common/instantiation.js";import{getSelectionKeyboardEvent as b}from"../../../../platform/list/browser/listService.js";import{IViewsService as P}from"../../../services/views/common/viewsService.js";import{searchRemoveIcon as O,searchReplaceIcon as F}from"./searchIcons.js";import"./searchView.js";import*as e from"../common/constants.js";import{IReplaceService as N}from"./replace.js";import{arrayContainsElementOrParent as C,FileMatch as g,FolderMatch as x,Match as S,MatchInNotebook as q,SearchResult as K,TextSearchResult as k}from"./searchModel.js";import{IEditorService as L}from"../../../services/editor/common/editorService.js";import"../../../services/search/common/search.js";import{IUriIdentityService as U}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{ContextKeyExpr as u}from"../../../../platform/contextkey/common/contextkey.js";import{Action2 as R,MenuId as f,registerAction2 as I}from"../../../../platform/actions/common/actions.js";import{KeybindingWeight as v}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{KeyCode as p,KeyMod as d}from"../../../../base/common/keyCodes.js";import{category as A,getElementsToOperateOn as T,getSearchView as W,shouldRefocus as j}from"./searchActionsBase.js";import{equals as B}from"../../../../base/common/arrays.js";I(class extends R{constructor(){super({id:e.SearchCommandIds.RemoveActionId,title:y.localize2("RemoveAction.label","Dismiss"),category:A,icon:O,keybinding:{weight:v.WorkbenchContrib,when:u.and(e.SearchContext.SearchViewVisibleKey,e.SearchContext.FileMatchOrMatchFocusKey),primary:p.Delete,mac:{primary:d.CtrlCmd|p.Backspace}},menu:[{id:f.SearchContext,group:"search",order:2},{id:f.SearchActionMenu,group:"inline",order:2}]})}async run(t,r){const o=t.get(P),l=t.get(V),a=W(o);if(!a)return;let m=r?.element,c=r?.viewer;c||(c=a.getControl()),m||(m=c.getFocus()[0]??void 0);const s=T(c,m,l.getValue("search"));let i=c.getFocus()[0]??void 0;if(s.length===0)return;(!i||i instanceof K)&&(i=m);let h;const w=j(s,i);i&&w&&(h=await D(c,i,s));const M=a.searchResult;M&&M.batchRemove(s),await a.refreshTreePromiseSerializer,i&&w?(h||(h=await z(c,i)),h&&!C(h,s)&&(c.reveal(h),c.setFocus([h],b()),c.setSelection([h],b()))):B(c.getFocus(),c.getSelection())||c.setSelection(c.getFocus()),c.domFocus()}}),I(class extends R{constructor(){super({id:e.SearchCommandIds.ReplaceActionId,title:y.localize2("match.replace.label","Replace"),category:A,keybinding:{weight:v.WorkbenchContrib,when:u.and(e.SearchContext.SearchViewVisibleKey,e.SearchContext.ReplaceActiveKey,e.SearchContext.MatchFocusKey,e.SearchContext.IsEditableItemKey),primary:d.Shift|d.CtrlCmd|p.Digit1},icon:F,menu:[{id:f.SearchContext,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.MatchFocusKey,e.SearchContext.IsEditableItemKey),group:"search",order:1},{id:f.SearchActionMenu,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.MatchFocusKey,e.SearchContext.IsEditableItemKey),group:"inline",order:1}]})}async run(t,r){return E(t,r)}}),I(class extends R{constructor(){super({id:e.SearchCommandIds.ReplaceAllInFileActionId,title:y.localize2("file.replaceAll.label","Replace All"),category:A,keybinding:{weight:v.WorkbenchContrib,when:u.and(e.SearchContext.SearchViewVisibleKey,e.SearchContext.ReplaceActiveKey,e.SearchContext.FileFocusKey,e.SearchContext.IsEditableItemKey),primary:d.Shift|d.CtrlCmd|p.Digit1,secondary:[d.CtrlCmd|d.Shift|p.Enter]},icon:F,menu:[{id:f.SearchContext,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.FileFocusKey,e.SearchContext.IsEditableItemKey),group:"search",order:1},{id:f.SearchActionMenu,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.FileFocusKey,e.SearchContext.IsEditableItemKey),group:"inline",order:1}]})}async run(t,r){return E(t,r)}}),I(class extends R{constructor(){super({id:e.SearchCommandIds.ReplaceAllInFolderActionId,title:y.localize2("file.replaceAll.label","Replace All"),category:A,keybinding:{weight:v.WorkbenchContrib,when:u.and(e.SearchContext.SearchViewVisibleKey,e.SearchContext.ReplaceActiveKey,e.SearchContext.FolderFocusKey,e.SearchContext.IsEditableItemKey),primary:d.Shift|d.CtrlCmd|p.Digit1,secondary:[d.CtrlCmd|d.Shift|p.Enter]},icon:F,menu:[{id:f.SearchContext,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.FolderFocusKey,e.SearchContext.IsEditableItemKey),group:"search",order:1},{id:f.SearchActionMenu,when:u.and(e.SearchContext.ReplaceActiveKey,e.SearchContext.FolderFocusKey,e.SearchContext.IsEditableItemKey),group:"inline",order:1}]})}async run(t,r){return E(t,r)}});async function E(n,t){const r=n.get(V),o=n.get(P),l=W(o),a=t?.viewer??l?.getControl();if(!a)return;const m=t?.element??a.getFocus()[0],c=T(a,m??void 0,r.getValue("search"));let s=a.getFocus()[0];if((!s||s&&!C(s,c)||s instanceof K)&&(s=m),c.length===0)return;let i;s&&(i=await D(a,s,c));const h=l?.searchResult;h&&await h.batchReplace(c),await l?.refreshTreePromiseSerializer,s&&(i||(i=await z(a,s)),i&&(a.reveal(i),a.setFocus([i],b()),a.setSelection([i],b()),i instanceof S?!r.getValue().search.useReplacePreview||G(n,i)||i instanceof q?l?.open(i,!0):n.get(N).openReplacePreview(i,!0):i instanceof g&&l?.open(i,!0))),a.domFocus()}function G(n,t){if(!(t instanceof S))return!1;const o=n.get(L).activeEditor?.resource;return o?n.get(U).extUri.isEqual(o,t.parent().resource):!1}function H(n,t){return n instanceof S?t instanceof S?0:-1:n instanceof g?t instanceof S?1:t instanceof g?0:-1:t instanceof x?t instanceof k?-1:t instanceof x?0:1:t instanceof k?0:1}async function D(n,t,r){const o=n.navigate(t);if(t instanceof x)for(;o.next()&&(!(o.current()instanceof x)||C(o.current(),r)););else if(t instanceof g)for(;o.next()&&(!(o.current()instanceof g)||C(o.current(),r));)await n.expand(o.current());else for(;o.next()&&(!(o.current()instanceof S)||C(o.current(),r));)await n.expand(o.current());return o.current()}async function z(n,t){let r=n.lastVisibleElement??null;for(;r;){const o=H(t,r);if(o===-1){if(!await n.expand(r))return r;r=n.lastVisibleElement}else if(o===1){const l=n.getParentElement(r);if(l instanceof K)break;r=l}else return r}}export{D as getElementToFocusAfterRemoved,z as getLastNodeFromSameType};
