import{URI as v}from"../../../base/common/uri.js";function f(t){if(t.length===0)return null;const n=new Map;for(const o of t)n.set(o.nodeId,o);function e(o){const s=n.get(o);if(!s||!s.childIds)return[];const i=[];for(const l of s.childIds){const c=n.get(l);c&&(c.ignored?i.push(...e(l)):i.push(l))}return i}const r=new Map;for(const o of t)o.ignored||r.set(o.nodeId,{node:o,children:[],parent:null});for(const o of t){if(o.ignored)continue;const s=r.get(o.nodeId);if(o.childIds)for(const i of o.childIds){const l=n.get(i);if(l)if(l.ignored){const c=e(i);for(const X of c){const p=r.get(X);p&&(p.parent=s,s.children.push(p))}}else{const c=r.get(i);c&&(c.parent=s,s.children.push(c))}}}for(const o of r.values())if(!o.parent)return o;return null}const h=80;function S(t,n){const e=f(n);if(!e)return"";const r=T(t,e),o=C(e);return r+(o.length>0?`

## Additional Links
`+o.join(`
`):"")}function T(t,n){const e=[];return d(t,n,e,0,!0),e.join("")}function d(t,n,e,r,o){switch(u(n.node)){case"navigation":return;case"heading":x(t,n,e,r);return;case"paragraph":k(t,n,e,r,o);return;case"list":e.push(`
`);for(const i of n.children)d(t,i,e,r+1,!0);e.push(`
`);return;case"ListMarker":e.push(a(n.node,o));return;case"listitem":{const i=[];for(const c of n.children)d(t,c,i,r+1,!0);const l=g(n.node)>1?" ".repeat(g(n.node)):"";e.push(`${l}${i.join("").trim()}
`);return}case"link":if(!N(n)){const i=a(n.node,o),l=m(n.node);I(t,n.node)?e.push(i):e.push(`[${i}](${l})`)}return;case"StaticText":{const i=a(n.node,o);i&&e.push(i);break}case"image":{const i=a(n.node,o)||"Image",l=y(n.node);l?e.push(`![${i}](${l})

`):e.push(`[Image: ${i}]

`);break}case"DescriptionList":V(t,n,e,r);return;case"blockquote":e.push("> "+a(n.node,o).replace(/\n/g,`
> `)+`

`);break;case"generic":e.push(" ");break;case"code":{R(t,n,e,r);return}case"pre":e.push("```\n"+a(n.node,!1)+"\n```\n\n");break;case"table":L(n,e);return}for(const i of n.children)d(t,i,e,r+1,o)}function u(t){return t.role?.value||""}function a(t,n){const e=t.name?.value||t.value?.value||"";if(!n||e.length<=h)return e;const r=e.split("");let o=-1;for(let s=1;s<r.length;s++)r[s]===" "&&(o=s),s%h===0&&o!==-1&&(r[o]=`
`,o=s);return r.join("")}function g(t){const n=t.properties?.find(e=>e.name==="level");return n?Math.min(Number(n.value.value)||1,6):1}function m(t){return t.properties?.find(e=>e.name==="url")?.value.value||"#"}function y(t){return t.properties?.find(e=>e.name==="url")?.value.value||null}function N(t){let n=t;for(;n;){const e=u(n.node);if(["navigation","menu","menubar"].includes(e))return!0;n=n.parent}return!1}function I(t,n){const e=m(n);try{const r=v.parse(e);return r.scheme===t.scheme&&r.authority===t.authority&&r.path===t.path}catch{return!1}}function k(t,n,e,r,o){e.push(`
`);for(const s of n.children)d(t,s,e,r+1,o);e.push(`

`)}function x(t,n,e,r){e.push(`
`);const o=g(n.node);e.push(`${"#".repeat(o)} `);for(const s of n.children)u(s.node)==="StaticText"?e.push(a(s.node,!1)):d(t,s,e,r+1,!1);e.push(`

`)}function V(t,n,e,r){e.push(`
`);for(const o of n.children)if(u(o.node)==="term"){e.push("- **");for(const s of o.children)d(t,s,e,r+1,!0);e.push("** ")}else if(u(o.node)==="definition"){for(const s of o.children)d(t,s,e,r+1,!0);e.push(`
`)}e.push(`
`)}function L(t,n){n.push(`
`);const e=t.children.filter(r=>u(r.node).includes("row"));if(e.length>0){const r=e[0].children.filter(s=>u(s.node).includes("cell")),o=r.map(s=>a(s.node,!1)||" ");n.push("| "+o.join(" | ")+` |
`),n.push("| "+r.map(()=>"---").join(" | ")+` |
`);for(let s=1;s<e.length;s++){const l=e[s].children.filter(c=>u(c.node).includes("cell")).map(c=>a(c.node,!1)||" ");n.push("| "+l.join(" | ")+` |
`)}}n.push(`
`)}function R(t,n,e,r){const o=[];for(const i of n.children)d(t,i,o,r+1,!1);if(o.some(i=>i.includes(`
`)))e.push("\n```\n"),e.push(o.join("")),e.push("\n```\n");else{e.push("`");let i=0;for(const l of o)i+=l.length,i>h&&(e.push(`
`),i=0),e.push(l),e.push("`")}}function C(t){const n=[];return A(t,n),n}function A(t,n){if(u(t.node)==="link"&&N(t)){const r=a(t.node,!0),o=m(t.node),s=t.node.description?.value||"";n.push(`- [${r}](${o})${s?" - "+s:""}`)}for(const r of t.children)A(r,n)}export{S as convertAXTreeToMarkdown};
