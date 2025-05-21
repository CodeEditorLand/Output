import{localize as i}from"../../../../nls.js";import{$3b as c}from"../../../../base/common/arrays.js";import{$Mj as a}from"../../../../base/common/htmlContent.js";import d from"../../../../base/common/severity.js";import{$tc as h}from"../../../../base/common/path.js";function x(t,s){const e=parseInt(s.get("terminal.integrated.tabs.showDetailed",-1)??"0");let l="";const r=t.statusList.statuses,o=[];for(const n of r)e?(n.detailedTooltip??n.tooltip)&&(l+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.detailedTooltip??n.tooltip??"")):n.tooltip&&(l+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.tooltip??"")),n.hoverActions&&o.push(...n.hoverActions);o.push({commandId:"toggleDetailedInfo",label:e?i(11443,null):i(11444,null),run(){s.store("terminal.integrated.tabs.showDetailed",(e+1)%2,-1,0)}});const p=f(t,!!e);return{content:new a(t.title+p+l,{supportThemeIcons:!0}),actions:o}}function f(t,s){const e=[];if(t.processId&&t.processId>0&&e.push(i(11445,null,"PID",t.processId)+`
`),t.shellLaunchConfig.executable){let l="";if(!s&&t.shellLaunchConfig.executable.length>32){const o=h(t.shellLaunchConfig.executable),p=t.shellLaunchConfig.executable.length-o.length-1,u=t.shellLaunchConfig.executable.substring(p,p+1);l+=`\u2026${u}${o}`}else l+=t.shellLaunchConfig.executable;const r=c(t.injectedArgs||t.shellLaunchConfig.args||[]).map(o=>o.match(/\s/)?`'${o}'`:o).join(" ");r&&(l+=` ${r}`),e.push(i(11446,null,l))}return e.length?`

---

${e.join(`
`)}`:""}function L(t){if(!t.xterm)return;const s=t.capabilities.get(2)?.hasRichCommandDetection?i(11447,null):t.capabilities.has(2)?i(11448,null):t.usedShellIntegrationInjection?i(11449,null):i(11450,null),e=[],l=Array.from(t.xterm.shellIntegration.seenSequences);l.length>0&&e.push(`Seen sequences: ${l.map(u=>`\`${u}\``).join(", ")}`);const r=t.capabilities.get(2)?.promptType;r&&e.push(`Prompt type: \`${r}\``);const o=t.capabilities.get(2)?.promptInputModel.getCombinedString();o!==void 0&&e.push(`Prompt input: \`${o}\``);const p=e.length>0?`

`+e.map(u=>`- ${u}`).join(`
`):"";t.statusList.add({id:"shell-integration-info",severity:d.Info,tooltip:`${i(11451,null)}: ${s}`,detailedTooltip:`${i(11452,null)}: ${s}${p}`})}export{x as $2pc,f as $3pc,L as $4pc};
