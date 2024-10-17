import*as m from"../../../../nls.js";import{IClipboardService as f}from"../../../../platform/clipboard/common/clipboardService.js";import"../../../../platform/instantiation/common/instantiation.js";import{ILabelService as g}from"../../../../platform/label/common/label.js";import{IViewsService as T}from"../../../services/views/common/viewsService.js";import*as i from"../common/constants.js";import{Action2 as p,MenuId as C,registerAction2 as M}from"../../../../platform/actions/common/actions.js";import{KeybindingWeight as v}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{KeyCode as y,KeyMod as u}from"../../../../base/common/keyCodes.js";import{category as x,getSearchView as w}from"./searchActionsBase.js";import{isWindows as P}from"../../../../base/common/platform.js";import{searchMatchComparer as b}from"./searchCompare.js";import{isSearchTreeMatch as W,isSearchTreeFileMatch as F,isSearchTreeFolderMatch as K,isSearchTreeFolderMatchWithResource as $}from"./searchTreeModel/searchTreeCommon.js";M(class extends p{constructor(){super({id:i.SearchCommandIds.CopyMatchCommandId,title:m.localize2("copyMatchLabel","Copy"),category:x,keybinding:{weight:v.WorkbenchContrib,when:i.SearchContext.FileMatchOrMatchFocusKey,primary:u.CtrlCmd|y.KeyC},menu:[{id:C.SearchContext,when:i.SearchContext.FileMatchOrMatchFocusKey,group:"search_2",order:1}]})}async run(r,t){await O(r,t)}}),M(class extends p{constructor(){super({id:i.SearchCommandIds.CopyPathCommandId,title:m.localize2("copyPathLabel","Copy Path"),category:x,keybinding:{weight:v.WorkbenchContrib,when:i.SearchContext.FileMatchOrFolderMatchWithResourceFocusKey,primary:u.CtrlCmd|u.Alt|y.KeyC,win:{primary:u.Shift|u.Alt|y.KeyC}},menu:[{id:C.SearchContext,when:i.SearchContext.FileMatchOrFolderMatchWithResourceFocusKey,group:"search_2",order:2}]})}async run(r,t){await z(r,t)}}),M(class extends p{constructor(){super({id:i.SearchCommandIds.CopyAllCommandId,title:m.localize2("copyAllLabel","Copy All"),category:x,menu:[{id:C.SearchContext,when:i.SearchContext.HasSearchResults,group:"search_2",order:3}]})}async run(r){await V(r)}});const a=P?`\r
`:`
`;async function z(e,r){if(!r){const c=L(e);if(!F(c)||$(c))return;r=c}const t=e.get(f),o=e.get(g).getUriLabel(r.resource,{noPrefix:!0});await t.writeText(o)}async function O(e,r){if(!r){const c=L(e);if(!c)return;r=c}const t=e.get(f),n=e.get(g);let o;W(r)?o=A(r):F(r)?o=R(r,n).text:K(r)&&(o=I(r,n).text),o&&await t.writeText(o)}async function V(e){const r=e.get(T),t=e.get(f),n=e.get(g),o=w(r);if(o){const c=o.searchResult,s=k(c.folderMatches(),n);await t.writeText(s)}}function A(e,r=0){const t=()=>`${e.range().startLineNumber},${e.range().startColumn}`,n=h=>e.range().startLineNumber+h+"",o=e.fullPreviewLines(),c=o.reduce((h,d,l)=>{const S=l===0?t().length:n(l).length;return Math.max(S,h)},0);return o.map((h,d)=>{const l=d===0?t():n(d),S=" ".repeat(c-l.length);return`${" ".repeat(r)}${l}: ${S}${h}`}).join(`
`)}function j(e,r){return F(e)?R(e,r):I(e,r)}function R(e,r){const t=e.matches().sort(b).map(o=>A(o,2));return{text:`${r.getUriLabel(e.resource,{noPrefix:!0})}${a}${t.join(a)}`,count:t.length}}function I(e,r){const t=[];let n=0;return e.matches().sort(b).forEach(c=>{const s=j(c,r);n+=s.count,t.push(s.text)}),{text:t.join(a+a),count:n}}function k(e,r){const t=[];e=e.sort(b);for(let n=0;n<e.length;n++){const o=I(e[n],r);o.count&&t.push(o.text)}return t.join(a+a)}function L(e){const r=e.get(T);return w(r)?.getControl().getSelection()[0]}export{a as lineDelimiter};
