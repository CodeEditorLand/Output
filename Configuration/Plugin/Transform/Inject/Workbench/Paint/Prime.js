import e from"../../../../Polyfill/Workbench/Paint/Prime.js";const r="__LAND_WORKBENCH_PAINT_PRIME_V2__",o=`
/* ${r} */
(${e.toString()})();
`,t={Kind:"Transform",Name:"InjectWorkbenchPaintPrime",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+n}}};var c=t;export{c as default};
