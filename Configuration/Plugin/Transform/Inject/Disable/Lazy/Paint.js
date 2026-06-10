import e from"../../../../Polyfill/Disable/Lazy/Paint.js";const r="__LAND_DISABLE_LAZY_PAINT__",o=`
/* ${r} */
(${e.toString()})();
`,t={Kind:"Transform",Name:"InjectDisableLazyPaint",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+n}}};var a=t;export{a as default};
