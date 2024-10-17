import*as d from"../../../../base/browser/dom.js";import"../../../../base/common/keybindings.js";import*as h from"../../../../nls.js";import"../../../../platform/list/browser/listService.js";import"../../../services/views/common/viewsService.js";import"./searchView.js";import{VIEW_ID as a}from"../../../services/search/common/search.js";import{isSearchTreeMatch as o,isSearchTreeFileMatch as c,isSearchTreeFolderMatch as l}from"./searchTreeModel/searchTreeCommon.js";import{searchComparer as p}from"./searchCompare.js";const T=h.localize2("search","Search");function F(r){const e=u(r);return!!(e&&d.isAncestorOfActiveElement(e.getContainer()))}function K(r,e){return b(r,e)}function u(r){return r.getActiveViewWithId(a)}function O(r,e,i){let n=r.getSelection().filter(t=>t!==null).sort((t,s)=>p(t,s,i.sortOrder));return e&&!(n.length>1&&n.includes(e))&&(n=[e]),n}function W(r,e){return e?!e||r.includes(e)||f(r,e):!1}function f(r,e){for(const i of r)if(c(i)&&o(e)&&i.matches().includes(e)||l(i)&&(c(e)&&i.getDownstreamFileMatch(e.resource)||o(e)&&i.getDownstreamFileMatch(e.parent().resource)))return!0;return!1}function L(r,e){return r.openView(a,e).then(i=>i??void 0)}function b(r,e){return e?r+" ("+e.getLabel()+")":r}export{K as appendKeyBindingLabel,T as category,O as getElementsToOperateOn,u as getSearchView,F as isSearchViewFocused,L as openSearchView,W as shouldRefocus};
