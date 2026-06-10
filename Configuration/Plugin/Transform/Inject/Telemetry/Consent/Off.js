import r from"../../../../Polyfill/Telemetry/Consent/Off.js";const e="__LAND_TELEMETRY_CONSENT_OFF__",o=`
/* ${e} */
(${r.toString()})();
`,t={Kind:"Transform",Name:"InjectTelemetryConsentOff",Match:({Path:n})=>n.endsWith("vs/code/electron-browser/workbench/workbench.js"),Transform({Source:n}){return n.includes(e)?{Kind:"Unchanged"}:{Kind:"Rewrite",Source:o+n}}};var i=t;export{i as default};
