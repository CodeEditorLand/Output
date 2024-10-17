import"../../../../../editor/common/core/range.js";import"../../../../services/search/common/search.js";import"../../../../../base/common/cancellation.js";import{URI as c}from"../../../../../base/common/uri.js";import"../../../../../editor/common/model.js";import"../../../../../platform/files/common/files.js";import"../../../../../platform/progress/common/progress.js";import"../../../../services/search/common/replace.js";import"../../../notebook/browser/notebookEditorWidget.js";import"./rangeDecorations.js";import"../../../../../base/common/event.js";function K(e,a){do if(a.includes(e))return!0;while(!S(e.parent())&&(e=e.parent()));return!1}var i=(r=>(r[r.PANEL=0]="PANEL",r[r.QUICK_ACCESS=1]="QUICK_ACCESS",r))(i||{});const z="plainTextSearch",J="aiTextSearch";function V(e){const a=[];let r=e;for(;!o(r);)a.push(r),r=r.parent();return a}const l="SEARCH_MODEL_",h="SEARCH_RESULT_",s="TEXT_SEARCH_HEADING_",d="FOLDER_MATCH_",I="FILE_MATCH_",u="MATCH_";function Y(e){const a={elements:[],added:!1,removed:!1};return e.forEach(r=>{r.added&&(a.added=!0),r.removed&&(a.removed=!0),a.elements=a.elements.concat(r.elements)}),a}function Z(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(l)}function S(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(h)}function o(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(s)}function $(e){return o(e)&&typeof e.replace=="function"&&typeof e.replaceAll=="function"}function n(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(d)}function M(e){return n(e)&&e.resource instanceof c}function j(e){return M(e)&&typeof e.createAndConfigureFileMatch=="function"}function ee(e){return n(e)&&typeof e.createAndConfigureFileMatch=="function"}function p(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(I)}function re(e){return typeof e=="object"&&e!==null&&typeof e.id=="function"&&e.id().startsWith(u)}function ae(e){const a=[],r=[];return e.forEach(t=>{p(t)?r.push(t):a.push(t)}),r.concat(a.map(t=>t.allDownstreamFileMatches()).flat())}export{J as AI_TEXT_SEARCH_RESULT_ID,I as FILE_MATCH_PREFIX,d as FOLDER_MATCH_PREFIX,u as MATCH_PREFIX,z as PLAIN_TEXT_SEARCH__RESULT_ID,l as SEARCH_MODEL_PREFIX,h as SEARCH_RESULT_PREFIX,i as SearchModelLocation,s as TEXT_SEARCH_HEADING_PREFIX,K as arrayContainsElementOrParent,V as createParentList,ae as getFileMatches,$ as isPlainTextSearchHeading,Z as isSearchModel,S as isSearchResult,p as isSearchTreeFileMatch,n as isSearchTreeFolderMatch,ee as isSearchTreeFolderMatchNoRoot,M as isSearchTreeFolderMatchWithResource,j as isSearchTreeFolderMatchWorkspaceRoot,re as isSearchTreeMatch,o as isTextSearchHeading,Y as mergeSearchResultEvents};
