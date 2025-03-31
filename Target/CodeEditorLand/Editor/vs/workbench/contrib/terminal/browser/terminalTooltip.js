import{asArray as d}from"../../../../base/common/arrays.js";import{MarkdownString as g}from"../../../../base/common/htmlContent.js";import{basename as u}from"../../../../base/common/path.js";import I from"../../../../base/common/severity.js";import{localize as s}from"../../../../nls.js";import{StorageScope as h,StorageTarget as f}from"../../../../platform/storage/common/storage.js";import{TerminalCapability as c}from"../../../../platform/terminal/common/capabilities/capabilities.js";import{TerminalStorageKeys as p}from"../common/terminalStorageKeys.js";import"./terminal.js";import{TerminalStatus as S}from"./terminalStatusList.js";function x(e,l){const t=parseInt(l.get(p.TabsShowDetailed,h.APPLICATION)??"0");let i="";const a=e.statusList.statuses,o=[];for(const n of a)t?(n.detailedTooltip??n.tooltip)&&(i+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.detailedTooltip??n.tooltip??"")):n.tooltip&&(i+=`

---

${n.icon?`$(${n.icon?.id}) `:""}`+(n.tooltip??"")),n.hoverActions&&o.push(...n.hoverActions);o.push({commandId:"toggleDetailedInfo",label:t?s("hideDetails","Hide Details"):s("showDetails","Show Details"),run(){l.store(p.TabsShowDetailed,(t+1)%2,h.APPLICATION,f.USER)}});const r=b(e,!!t);return{content:new g(e.title+r+i,{supportThemeIcons:!0}),actions:o}}function b(e,l){const t=[];if(e.processId&&e.processId>0&&t.push(s({key:"shellProcessTooltip.processId",comment:[`The first arg is "PID" which shouldn't be translated`]},"Process ID ({0}): {1}","PID",e.processId)+`
`),e.shellLaunchConfig.executable){let i="";if(!l&&e.shellLaunchConfig.executable.length>32){const o=u(e.shellLaunchConfig.executable),r=e.shellLaunchConfig.executable.length-o.length-1,m=e.shellLaunchConfig.executable.substring(r,r+1);i+=`\u2026${m}${o}`}else i+=e.shellLaunchConfig.executable;const a=d(e.injectedArgs||e.shellLaunchConfig.args||[]).map(o=>o.match(/\s/)?`'${o}'`:o).join(" ");a&&(i+=` ${a}`),t.push(s("shellProcessTooltip.commandLine","Command line: {0}",i))}return t.length?`

---

${t.join(`
`)}`:""}function H(e){if(!e.xterm)return;const l=e.capabilities.get(c.CommandDetection)?.hasRichCommandDetection?s("shellIntegration.rich","Rich"):e.capabilities.has(c.CommandDetection)?s("shellIntegration.basic","Basic"):e.usedShellIntegrationInjection?s("shellIntegration.injectionFailed","Injection failed to activate"):s("shellIntegration.no","No"),t=[],i=Array.from(e.xterm.shellIntegration.seenSequences);i.length>0&&t.push(`Seen sequences: ${i.map(r=>`\`${r}\``).join(", ")}`);const a=e.capabilities.get(c.CommandDetection)?.promptInputModel.getCombinedString();a!==void 0&&t.push(`Prompt input: \`${a}\``);const o=t.length>0?`

`+t.map(r=>`- ${r}`).join(`
`):"";e.statusList.add({id:S.ShellIntegrationInfo,severity:I.Info,tooltip:`${s("shellIntegration","Shell integration")}: ${l}`,detailedTooltip:`${s("shellIntegration","Shell integration")}: ${l}${o}`})}export{x as getInstanceHoverInfo,b as getShellProcessTooltip,H as refreshShellIntegrationInfoStatus};
