import{ToolDataSource as o,ToolInvocationPresentation as n}from"../languageModelToolsService.js";const r="task_complete",m=`You have not yet marked the task as complete using the task_complete tool. You MUST call task_complete when done \u2014 whether the task involved code changes, answering a question, or any other interaction.

Do NOT repeat or restate your previous response. Pick up where you left off.

If you were planning, stop planning and start implementing. You are not done until you have fully completed the task.

IMPORTANT: Do NOT call task_complete if:
- You have open questions or ambiguities \u2014 make good decisions and keep working
- You encountered an error \u2014 try to resolve it or find an alternative approach
- There are remaining steps \u2014 complete them first

Keep working autonomously until the task is truly finished, then call task_complete.`,p={id:r,displayName:"Task Complete",modelDescription:`Signal that the user's task is fully done. You MUST call this tool when your work is complete \u2014 whether you made code changes, answered a question, or completed any other kind of task. Provide a brief summary of what was accomplished. If the summary is trivial (e.g. answering a question), omit it. Do not restate the summary in your message text \u2014 it is shown to the user directly.

When to call:
- After answering the user's question or completing a conversational request
- After you have completed ALL requested changes
- After verifying results: tests pass, terminal commands succeeded, tool calls returned expected output

When NOT to call:
- If a terminal command failed or produced unexpected output
- If an MCP or external tool call returned an error
- If you encountered errors you have not resolved
- If there are remaining steps to complete
- If you have not verified your changes work`,source:o.Internal,inputSchema:{type:"object",properties:{summary:{type:"string",description:"Brief summary of what was accomplished. Omit for trivial interactions."}}}};class d{async prepareToolInvocation(e,t){return{presentation:n.Hidden}}async invoke(e,t,s,i){return{content:[{kind:"text",value:e.parameters?.summary??"All done!"}]}}}export{m as $Arc,p as $Brc,d as $Crc,r as $zrc};
