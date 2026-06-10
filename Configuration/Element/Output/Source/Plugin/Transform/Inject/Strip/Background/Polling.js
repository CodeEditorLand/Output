import o from"../../../../Polyfill/Strip/Background/Polling.js";const r="__LAND_STRIP_BACKGROUND_POLLING__",e=`
/* ${r} */
(${o.toString()})();
`,t={Kind:"Transform",Name:"InjectStripBackgroundPolling",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:e+n}}};var c=t;export{c as default};
