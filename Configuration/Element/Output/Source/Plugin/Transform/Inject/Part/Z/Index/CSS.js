import e from"../../../../../Polyfill/Part/Z/Index/CSS.js";const r="__LAND_PART_ZINDEX__",o=`
/* ${r} */
(${e.toString()})();
`,t={Kind:"Transform",Name:"InjectPartZIndexCSS",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+n}}};var s=t;export{s as default};
