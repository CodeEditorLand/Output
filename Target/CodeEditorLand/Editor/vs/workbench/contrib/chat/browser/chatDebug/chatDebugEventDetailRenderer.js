import{localize as l}from"../../../../../nls.js";function i(n){switch(n.kind){case"toolCall":{const u=[l(6558,null,n.toolName)];return n.toolCallId&&u.push(l(6559,null,n.toolCallId)),n.result&&u.push(l(6560,null,n.result)),n.durationInMillis!==void 0&&u.push(l(6561,null,n.durationInMillis)),n.input&&u.push(`
${l(6562,null)}
${n.input}`),n.output&&u.push(`
${l(6563,null)}
${n.output}`),u.join(`
`)}case"modelTurn":{const u=[n.model??l(6564,null)];return n.inputTokens!==void 0&&u.push(l(6565,null,n.inputTokens)),n.outputTokens!==void 0&&u.push(l(6566,null,n.outputTokens)),n.totalTokens!==void 0&&u.push(l(6567,null,n.totalTokens)),n.durationInMillis!==void 0&&u.push(l(6568,null,n.durationInMillis)),u.join(`
`)}case"generic":return`${n.name}
${n.details??""}`;case"subagentInvocation":{const u=[l(6569,null,n.agentName)];return n.description&&u.push(l(6570,null,n.description)),n.status&&u.push(l(6571,null,n.status)),n.durationInMillis!==void 0&&u.push(l(6572,null,n.durationInMillis)),n.toolCallCount!==void 0&&u.push(l(6573,null,n.toolCallCount)),n.modelTurnCount!==void 0&&u.push(l(6574,null,n.modelTurnCount)),u.join(`
`)}case"userMessage":{const u=[l(6575,null,n.message)];for(const s of n.sections)u.push(`
--- ${s.name} ---
${s.content}`);return u.join(`
`)}case"agentResponse":{const u=[l(6576,null,n.message)];for(const s of n.sections)u.push(`
--- ${s.name} ---
${s.content}`);return u.join(`
`)}}}export{i as $Itc};
