import e from"../../../../Polyfill/Eager/Idle/Value.js";const n="__LAND_EAGER_IDLE_VALUE__",o=`
/* ${n} */
(${e.toString()})();
`,t={Kind:"Transform",Name:"InjectEagerIdleValue",Match:({Path:r})=>r.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:r}){return r.includes(n)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+r}}};var a=t;export{a as default};
