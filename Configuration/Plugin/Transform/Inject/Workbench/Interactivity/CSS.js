import e from"../../../../Polyfill/Workbench/Interactivity/CSS.js";const r="__LAND_WORKBENCH_INTERACTIVITY_CSS_V2__",t=`
/* ${r} */
(${e.toString()})();
`,o={Kind:"Transform",Name:"InjectWorkbenchInteractivityCSS",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:t+n}}};var c=o;export{c as default};
