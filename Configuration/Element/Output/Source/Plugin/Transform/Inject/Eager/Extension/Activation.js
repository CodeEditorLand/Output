import e from"../../../../Polyfill/Eager/Extension/Activation.js";const r="__LAND_EAGER_EXTENSION_ACTIVATION__",o=`
/* ${r} */
(${e.toString()})();
`,t={Kind:"Transform",Name:"InjectEagerExtensionActivation",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(r)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+n}}};var s=t;export{s as default};
