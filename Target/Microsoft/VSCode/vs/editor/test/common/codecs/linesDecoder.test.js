import d from"assert";import{Range as e}from"../../../common/core/range.js";import"../../../../base/common/buffer.js";import"../../../../base/common/lifecycle.js";import{Line as n}from"../../../common/codecs/linesCodec/tokens/line.js";import{TestDecoder as u}from"../utils/testDecoder.js";import{NewLine as t}from"../../../common/codecs/linesCodec/tokens/newLine.js";import{newWriteableStream as l}from"../../../../base/common/stream.js";import{CarriageReturn as w}from"../../../common/codecs/linesCodec/tokens/carriageReturn.js";import{LinesDecoder as h}from"../../../common/codecs/linesCodec/linesDecoder.js";import{ensureNoDisposablesAreLeakedInTestSuite as f}from"../../../../base/test/common/utils.js";suite("LinesDecoder",()=>{const r=f();suite("core logic",()=>{c("async-generator",r),c("consume-all-method",r),c("on-data-event",r)}),suite("settled promise",()=>{test("throws if accessed on not-yet-started decoder instance",()=>{const s=r.add(new a);d.throws(()=>{s.decoder.settled},["Cannot get `settled` promise of a stream that has not been started.","Please call `start()` first."].join(" "))})}),suite("start",()=>{test("throws if the decoder object is already `disposed`",()=>{const s=r.add(new a),{decoder:o}=s;o.dispose(),d.throws(o.start.bind(o),"Cannot start stream that has already disposed.")}),test("throws if the decoder object is already `ended`",async()=>{const s=l(null),o=r.add(new a(s)),{decoder:i}=o;setTimeout(()=>{o.sendData(["hello","world :wave:"])},5);const m=await i.start().consumeAll();d.strictEqual(m.length,3,"Must produce the correct number of tokens."),d.throws(i.start.bind(i),"Cannot start stream that has already ended.")})})});class a extends u{constructor(s){const o=s||l(null),i=new h(o);super(o,i)}}function c(r,s){suite(r,()=>{suite("produces expected tokens",()=>{test("input starts with line data",async()=>{await s.add(new a).run(` hello world
how are you doing?

 \u{1F60A} \r `,[new n(1," hello world"),new t(new e(1,13,1,14)),new n(2,"how are you doing?"),new t(new e(2,19,2,20)),new n(3,""),new t(new e(3,1,3,2)),new n(4," \u{1F60A} "),new w(new e(4,5,4,6)),new n(5," ")])}),test("input starts with a new line",async()=>{await s.add(new a).run(`
some text on this line


another \u{1F4AC} on this line\r
\u{1F92B}
`,[new n(1,""),new t(new e(1,1,1,2)),new n(2,"some text on this line"),new t(new e(2,23,2,24)),new n(3,""),new t(new e(3,1,3,2)),new n(4,""),new t(new e(4,1,4,2)),new n(5,"another \u{1F4AC} on this line"),new w(new e(5,24,5,25)),new t(new e(5,25,5,26)),new n(6,"\u{1F92B}"),new t(new e(6,3,6,4))])}),test("input starts and ends with multiple new lines",async()=>{await s.add(new a).run(`

\r
ciao! \u{1F5EF}\uFE0F	\u{1F4AD} \u{1F4A5} come	va?




`,[new n(1,""),new t(new e(1,1,1,2)),new n(2,""),new t(new e(2,1,2,2)),new n(3,""),new w(new e(3,1,3,2)),new t(new e(3,2,3,3)),new n(4,"ciao! \u{1F5EF}\uFE0F	\u{1F4AD} \u{1F4A5} come	va?"),new t(new e(4,25,4,26)),new n(5,""),new t(new e(5,1,5,2)),new n(6,""),new t(new e(6,1,6,2)),new n(7,""),new t(new e(7,1,7,2)),new n(8,""),new t(new e(8,1,8,2))])}),test("single carriage return is treated as new line",async()=>{await s.add(new a).run(`\r\rhaalo! \u{1F4A5}\u{1F4A5} how're you?\r ?!\r
\r
 `,[new n(1,""),new w(new e(1,1,1,2)),new n(2,""),new w(new e(2,1,2,2)),new n(3,"haalo! \u{1F4A5}\u{1F4A5} how're you?"),new w(new e(3,24,3,25)),new n(4," ?!"),new w(new e(4,4,4,5)),new t(new e(4,5,4,6)),new n(5,""),new w(new e(5,1,5,2)),new t(new e(5,2,5,3)),new n(6," ")])})})})}export{a as TestLinesDecoder};
