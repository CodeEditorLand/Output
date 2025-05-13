import{localize as i}from"../../../../nls.js";import{$3b as c}from"../../../../base/common/arrays.js";import{$Lj as a}from"../../../../base/common/htmlContent.js";import d from"../../../../base/common/severity.js";import{$tc as h}from"../../../../base/common/path.js";function L(t,s){const e=parseInt(s.get("terminal.integrated.tabs.showDetailed",-1)??"0");let l="";const r=t.statusList.statuses,o=[];for(const n of r)e?(n.detailedTooltip??n.tooltip)&&(l+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.detailedTooltip??n.tooltip??"")):n.tooltip&&(l+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.tooltip??"")),n.hoverActions&&o.push(...n.hoverActions);o.push({commandId:"toggleDetailedInfo",label:e?i(11319,null):i(11320,null),run(){s.store("terminal.integrated.tabs.showDetailed",(e+1)%2,-1,0)}});const u=f(t,!!e);return{content:new a(t.title+u+l,{supportThemeIcons:!0}),actions:o}}function f(t,s){const e=[];if(t.processId&&t.processId>0&&e.push(i(11321,null,"PID",t.processId)+`
`),t.shellLaunchConfig.executable){let l="";if(!s&&t.shellLaunchConfig.executable.length>32){const o=h(t.shellLaunchConfig.executable),u=t.shellLaunchConfig.executable.length-o.length-1,p=t.shellLaunchConfig.executable.substring(u,u+1);l+=`\u2026${p}${o}`}else l+=t.shellLaunchConfig.executable;const r=c(t.injectedArgs||t.shellLaunchConfig.args||[]).map(o=>o.match(/\s/)?`'${o}'`:o).join(" ");r&&(l+=` ${r}`),e.push(i(11322,null,l))}return e.length?`

---

${e.join(`
`)}`:""}function x(t){if(!t.xterm)return;const s=t.capabilities.get(2)?.hasRichCommandDetection?i(11323,null):t.capabilities.has(2)?i(11324,null):t.usedShellIntegrationInjection?i(11325,null):i(11326,null),e=[],l=Array.from(t.xterm.shellIntegration.seenSequences);l.length>0&&e.push(`Seen sequences: ${l.map(p=>`\`${p}\``).join(", ")}`);const r=t.capabilities.get(2)?.promptType;r&&e.push(`Prompt type: \`${r}\``);const o=t.capabilities.get(2)?.promptInputModel.getCombinedString();o!==void 0&&e.push(`Prompt input: \`${o}\``);const u=e.length>0?`

`+e.map(p=>`- ${p}`).join(`
`):"";t.statusList.add({id:"shell-integration-info",severity:d.Info,tooltip:`${i(11327,null)}: ${s}`,detailedTooltip:`${i(11328,null)}: ${s}${u}`})}export{L as $Woc,f as $Xoc,x as $Yoc};
