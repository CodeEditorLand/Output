import*as O from"./vs/base/common/performance.js";import{removeGlobalNodeJsModuleLookupPaths as h,devInjectNodeModuleLookupPath as S}from"./bootstrap-node.js";import{bootstrapESM as m}from"./bootstrap-esm.js";O.mark("code/fork/start");function P(){function d(e){const s=[],i=[];if(e.length)for(let n=0;n<e.length;n++){let r=e[n];if(typeof r>"u")r="undefined";else if(r instanceof Error){const o=r;o.stack?r=o.stack:r=o.toString()}i.push(r)}try{const n=JSON.stringify(i,function(r,o){if(E(o)||Array.isArray(o)){if(s.indexOf(o)!==-1)return"[Circular]";s.push(o)}return o});return n.length>1e5?"Output omitted for a large object that exceeds the limits":n}catch(n){return`Output omitted for an object that cannot be inspected ('${n.toString()}')`}}function l(e){try{process.send&&process.send(e)}catch{}}function E(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)&&!(e instanceof RegExp)&&!(e instanceof Date)}function g(e,s){l({type:"__$console",severity:e,arguments:s})}function c(e,s){Object.defineProperty(console,e,{set:()=>{},get:()=>function(){g(s,d(arguments))}})}function f(e,s){const i=process[e],n=i.write;let r="";Object.defineProperty(i,"write",{set:()=>{},get:()=>(o,u,_)=>{r+=o.toString(u);const p=r.length>1048576?r.length:r.lastIndexOf(`
`);p!==-1&&(r=r.slice(p+1)),n.call(i,o,u,_)}})}process.env.VSCODE_VERBOSE_LOGGING==="true"?(c("info","log"),c("log","log"),c("warn","warn"),c("error","error")):(console.log=function(){},console.warn=function(){},console.info=function(){},c("error","error")),f("stderr","error"),f("stdout","log")}function y(){process.on("uncaughtException",function(t){}),process.on("unhandledRejection",function(t){})}function R(){const t=Number(process.env.VSCODE_PARENT_PID);typeof t=="number"&&!isNaN(t)&&setInterval(function(){try{process.kill(t,0)}catch{process.exit()}},5e3)}function N(){const t=process.env.VSCODE_CRASH_REPORTER_PROCESS_TYPE;if(t)try{process.crashReporter&&typeof process.crashReporter.addExtraParameter=="function"&&process.crashReporter.addExtraParameter("processType",t)}catch{}}N(),h(),process.env.VSCODE_DEV_INJECT_NODE_MODULE_LOOKUP_PATH&&S(process.env.VSCODE_DEV_INJECT_NODE_MODULE_LOOKUP_PATH),process.send&&process.env.VSCODE_PIPE_LOGGING==="true"&&P(),process.env.VSCODE_HANDLES_UNCAUGHT_ERRORS||y(),process.env.VSCODE_PARENT_PID&&R(),await m(),await import([`./${process.env.VSCODE_ESM_ENTRYPOINT}.js`].join("/"));
