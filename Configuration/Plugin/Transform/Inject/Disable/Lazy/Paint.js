import e,{Marker as r}from"../../../../Polyfill/Disable/Lazy/Paint.js";const i=`
/* ${r} */
(${e.toString()})();
`,o={Kind:"Transform",Name:"InjectDisableLazyPaint",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:i+n}}};var a=o;export{a as default};
