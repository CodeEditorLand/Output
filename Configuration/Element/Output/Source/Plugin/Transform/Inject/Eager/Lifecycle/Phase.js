import n from"../../../../Polyfill/Eager/Lifecycle/Phase.js";const r="__LAND_EAGER_LIFECYCLE_PHASE__",o=`
/* ${r} */
(${n.toString()})();
`,t={Kind:"Transform",Name:"InjectEagerLifecyclePhase",Match:({Path:e})=>e.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:e}){return e.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+e}}};var c=t;export{c as default};
