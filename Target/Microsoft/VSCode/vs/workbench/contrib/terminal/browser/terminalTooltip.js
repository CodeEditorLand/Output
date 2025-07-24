import{localize as i}from"../../../../nls.js";import{$mc as c}from"../../../../base/common/arrays.js";import{$Zj as h}from"../../../../base/common/htmlContent.js";import d from"../../../../base/common/severity.js";import{$$ as a}from"../../../../base/common/path.js";function y(e,s){const t=parseInt(s.get("terminal.integrated.tabs.showDetailed",-1)??"0");let n="";const r=e.statusList.statuses,l=[];for(const o of r)t?(o.detailedTooltip??o.tooltip)&&(n+=`

---

${o.icon?`$(${o.icon?.id}) `:""}`+(o.detailedTooltip??o.tooltip??"")):o.tooltip&&(n+=`

---

${o.icon?`$(${o.icon?.id}) `:""}`+(o.tooltip??"")),o.hoverActions&&l.push(...o.hoverActions);l.push({commandId:"toggleDetailedInfo",label:t?i(11981,null):i(11982,null),run(){s.store("terminal.integrated.tabs.showDetailed",(t+1)%2,-1,0)}});const p=f(e,!!t);return{content:new h(e.title+p+n,{supportThemeIcons:!0}),actions:l}}function f(e,s){const t=[];if(e.processId&&e.processId>0&&t.push(i(11983,null,"PID",e.processId)+`
`),e.shellLaunchConfig.executable){let n="";if(!s&&e.shellLaunchConfig.executable.length>32){const l=a(e.shellLaunchConfig.executable),p=e.shellLaunchConfig.executable.length-l.length-1,u=e.shellLaunchConfig.executable.substring(p,p+1);n+=`\u2026${u}${l}`}else n+=e.shellLaunchConfig.executable;const r=c(e.injectedArgs||e.shellLaunchConfig.args||[]).map(l=>l.match(/\s/)?`'${l}'`:l).join(" ");r&&(n+=` ${r}`),t.push(i(11984,null,n))}return t.length?`

---

${t.join(`
`)}`:""}function x(e){if(!e.xterm)return;const s=e.capabilities.get(2)?.hasRichCommandDetection?i(11985,null):e.capabilities.has(2)?i(11986,null):e.usedShellIntegrationInjection?i(11987,null):i(11988,null),t=[];e.shellType&&t.push(`Shell type: \`${e.shellType}\``);const n=e.cwd;n&&t.push(`Current working directory: \`${n}\``);const r=Array.from(e.xterm.shellIntegration.seenSequences);r.length>0&&t.push(`Seen sequences: ${r.map(o=>`\`${o}\``).join(", ")}`);const l=e.capabilities.get(2)?.promptType;l&&t.push(`Prompt type: \`${l}\``);const p=e.capabilities.get(2)?.promptInputModel.getCombinedString();p!==void 0&&t.push(`Prompt input: \`${p}\``);const u=t.length>0?`

`+t.map(o=>`- ${o}`).join(`
`):"";e.statusList.add({id:"shell-integration-info",severity:d.Info,tooltip:`${i(11989,null)}: ${s}`,detailedTooltip:`${i(11990,null)}: ${s}${u}`})}export{y as $jtc,f as $ktc,x as $ltc};
