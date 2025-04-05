import"vscode";import{ensureNoDisposablesAreLeakedInTestSuite as g}from"../../../../base/test/common/utils.js";import{InternalTerminalShellIntegration as I}from"../../common/extHostTerminalShellIntegration.js";import{Emitter as q}from"../../../../base/common/event.js";import{TerminalShellExecutionCommandLineConfidence as $}from"../../common/extHostTypes.js";import{deepStrictEqual as S,notStrictEqual as O,strictEqual as l}from"assert";import{DeferredPromise as k}from"../../../../base/common/async.js";function i(d){return Object.freeze({confidence:$.High,value:d,isTrusted:!0})}function L(d){return typeof d=="string"?i(d):d}function o(d){return`\x1B]633;${d}\x07`}const m="echo hello world",x="echo goodbye world";suite("InternalTerminalShellIntegration",()=>{const d=g();let t,w,h,E,y;async function s(e,n){return await new Promise(a=>{d.add(h.event(c=>{a(c.execution)})),t.startShellExecution(L(e),n)})}async function r(e){return await new Promise(n=>{d.add(t.onDidRequestEndExecution(a=>n(a.execution))),t.endShellExecution(L(e),0)})}async function C(e){await new Promise(n=>queueMicrotask(n)),t.emitData(e)}function p(e){S(E,e)}function D(e){S(E.filter(n=>n.type!=="data"),e)}function v(e){S(E.filter(n=>n.type==="data"),e)}setup(()=>{w=Symbol("testTerminal"),h=d.add(new q),t=d.add(new I(w,h)),E=[],y=[],d.add(h.event(async e=>{E.push({type:"start",commandLine:e.execution.commandLine.value});const n=e.execution.read(),a=new k;y.push(a.p);for await(const c of n)E.push({type:"data",commandLine:e.execution.commandLine.value,data:c});a.complete()})),d.add(t.onDidRequestEndExecution(e=>E.push({type:"end",commandLine:e.execution.commandLine.value})))}),test("simple execution",async()=>{const e=await s(m);S(e.commandLine.value,m);const n=await r(m);l(n,e),p([{commandLine:m,type:"start"},{commandLine:m,type:"end"}])}),test("different execution unexpectedly ended",async()=>{const e=await s(m),n=await r(x);l(e,n,"when a different execution is ended, the one that started first should end"),p([{commandLine:m,type:"start"},{commandLine:x,type:"end"}])}),test("no end event",async()=>{const e=await s(m),n=await new Promise(a=>{d.add(t.onDidRequestEndExecution(c=>a(c.execution))),s(x)});l(e,n,"when no end event is fired, the current execution should end"),await r(x),await Promise.all(y),p([{commandLine:m,type:"start"},{commandLine:m,type:"end"},{commandLine:x,type:"start"},{commandLine:x,type:"end"}])}),suite("executeCommand",()=>{test("^C to clear previous command",async()=>{const e="foo",n=t.requestNewShellExecution(i(e),void 0),a=await s("^C");O(a,n.value),t.emitData("SIGINT"),t.endShellExecution(i("^C"),0),t.startShellExecution(i(e),void 0),await C("1"),await r(e),await Promise.all(y),D([{commandLine:"^C",type:"start"},{commandLine:"^C",type:"end"},{commandLine:e,type:"start"},{commandLine:e,type:"end"}]),v([{commandLine:"^C",type:"data",data:"SIGINT"},{commandLine:e,type:"data",data:"1"}])}),test("multi-line command line",async()=>{const e=`foo
bar`,n=t.requestNewShellExecution(i(e),void 0),a=await s("foo");l(a,n.value),t.emitData("1"),t.emitData("2"),t.endShellExecution(i("foo"),0),t.startShellExecution(i("bar"),void 0),t.emitData("3"),t.emitData("4");const c=await r("bar");l(a,c),p([{commandLine:e,type:"start"},{commandLine:e,type:"data",data:"1"},{commandLine:e,type:"data",data:"2"},{commandLine:e,type:"data",data:"3"},{commandLine:e,type:"data",data:"4"},{commandLine:e,type:"end"}])}),test("multi-line command with long second command",async()=>{const e=`echo foo
cat << EOT
line1
line2
line3
EOT`,n="echo foo",a=`cat << EOT
line1
line2
line3
EOT`,c=t.requestNewShellExecution(i(e),void 0),u=await s(n);l(u,c.value),t.emitData(`${o("C")}foo`),t.endShellExecution(i(n),0),t.startShellExecution(i(a),void 0),t.emitData(`${o("C")}line1`),t.emitData("line2"),t.emitData("line3");const f=await r(a);l(u,f),p([{commandLine:e,type:"start"},{commandLine:e,type:"data",data:`${o("C")}foo`},{commandLine:e,type:"data",data:`${o("C")}line1`},{commandLine:e,type:"data",data:"line2"},{commandLine:e,type:"data",data:"line3"},{commandLine:e,type:"end"}])}),test("multi-line command comment followed by long second command",async()=>{const e=`# comment: foo
cat << EOT
line1
line2
line3
EOT`,n="# comment: foo",a=`cat << EOT
line1
line2
line3
EOT`,c=t.requestNewShellExecution(i(e),void 0),u=await s(n);l(u,c.value),t.emitData(`${o("C")}`),t.endShellExecution(i(n),0),t.startShellExecution(i(a),void 0),t.emitData(`${o("C")}line1`),t.emitData("line2"),t.emitData("line3");const f=await r(a);l(u,f),p([{commandLine:e,type:"start"},{commandLine:e,type:"data",data:`${o("C")}`},{commandLine:e,type:"data",data:`${o("C")}line1`},{commandLine:e,type:"data",data:"line2"},{commandLine:e,type:"data",data:"line3"},{commandLine:e,type:"end"}])}),test("4 multi-line commands with output",async()=>{const e=`echo "
foo"
git commit -m "hello

world"
cat << EOT
line1
line2
line3
EOT
{
echo "foo"
}`,n=`echo "
foo"`,a=`git commit -m "hello

world"`,c=`cat << EOT
line1
line2
line3
EOT`,u=`{
echo "foo"
}`,f=t.requestNewShellExecution(i(e),void 0),T=await s(n);l(T,f.value),t.emitData(`${o("C")}foo`),t.endShellExecution(i(n),0),t.startShellExecution(i(a),void 0),t.emitData(`${o("C")} 2 files changed, 61 insertions(+), 2 deletions(-)`),t.endShellExecution(i(a),0),t.startShellExecution(i(c),void 0),t.emitData(`${o("C")}line1`),t.emitData("line2"),t.emitData("line3"),t.endShellExecution(i(c),0),t.emitData(`${o("C")}foo`),t.startShellExecution(i(u),void 0);const b=await r(u);l(T,b),p([{commandLine:e,type:"start"},{commandLine:e,type:"data",data:`${o("C")}foo`},{commandLine:e,type:"data",data:`${o("C")} 2 files changed, 61 insertions(+), 2 deletions(-)`},{commandLine:e,type:"data",data:`${o("C")}line1`},{commandLine:e,type:"data",data:"line2"},{commandLine:e,type:"data",data:"line3"},{commandLine:e,type:"data",data:`${o("C")}foo`},{commandLine:e,type:"end"}])})})});
