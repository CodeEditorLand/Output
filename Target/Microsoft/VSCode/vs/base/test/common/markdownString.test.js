import n from"assert";import{MarkdownString as t}from"../../common/htmlContent.js";import{ensureNoDisposablesAreLeakedInTestSuite as r}from"./utils.js";import{URI as s}from"../../common/uri.js";suite("MarkdownString",()=>{r(),test("Escape leading whitespace",function(){const e=new t;e.appendText(`Hello
    Not a code block`),n.strictEqual(e.value,`Hello

&nbsp;&nbsp;&nbsp;&nbsp;Not&nbsp;a&nbsp;code&nbsp;block`)}),test("MarkdownString.appendText doesn't escape quote #109040",function(){const e=new t;e.appendText(`> Text
>More`),n.strictEqual(e.value,`\\>&nbsp;Text

\\>More`)}),test("appendText",()=>{const e=new t;e.appendText(`# foo
*bar*`),n.strictEqual(e.value,`\\#&nbsp;foo

\\*bar\\*`)}),test("appendLink",function(){function e(o,p,d,a){const i=new t;i.appendLink(o,p,d),n.strictEqual(i.value,a)}e("https://example.com\\()![](file:///Users/jrieken/Code/_samples/devfest/foo/img.png)","hello",void 0,"[hello](https://example.com\\(\\)![](file:///Users/jrieken/Code/_samples/devfest/foo/img.png\\))"),e("https://example.com","hello","title",'[hello](https://example.com "title")'),e("foo)","hello]",void 0,"[hello\\]](foo\\))"),e("foo\\)","hello]",void 0,"[hello\\]](foo\\))"),e("fo)o","hell]o",void 0,"[hell\\]o](fo\\)o)"),e("foo)","hello]",'title"','[hello\\]](foo\\) "title\\"")')}),test("lift",()=>{const e={value:"hello",baseUri:s.file("/foo/bar"),supportThemeIcons:!0,isTrusted:!0,supportHtml:!0,uris:{[s.file("/foo/bar2").toString()]:s.file("/foo/bar2"),[s.file("/foo/bar3").toString()]:s.file("/foo/bar3")}},o=t.lift(e);n.strictEqual(o.value,e.value),n.strictEqual(o.baseUri?.toString(),e.baseUri?.toString()),n.strictEqual(o.supportThemeIcons,e.supportThemeIcons),n.strictEqual(o.isTrusted,e.isTrusted),n.strictEqual(o.supportHtml,e.supportHtml),n.deepStrictEqual(o.uris,e.uris)}),test("lift returns new instance",()=>{const e=new t("hello"),o=t.lift(e).appendText("world");n.strictEqual(o.value,"helloworld"),n.strictEqual(e.value,"hello")}),suite("appendCodeBlock",()=>{function e(o,p,d){const a=new t;a.appendCodeblock(o,p),n.strictEqual(a.value,d)}test("common cases",()=>{e("ts","const a = 1;",`
${["```ts","const a = 1;","```"].join(`
`)}
`),e("ts","const a = `1`;",`
${["```ts","const a = `1`;","```"].join(`
`)}
`)}),test("escape fence",()=>{e("md","```\n```",`
${["````md","```\n```","````"].join(`
`)}
`),e("md","\n\n```\n```",`
${["````md","\n\n```\n```","````"].join(`
`)}
`),e("md","```\n```\n````\n````",`
${["`````md","```\n```\n````\n````","`````"].join(`
`)}
`)})}),suite("ThemeIcons",()=>{suite("Support On",()=>{test("appendText",()=>{const e=new t(void 0,{supportThemeIcons:!0});e.appendText("$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"\\\\$\\(zap\\)&nbsp;$\\(not&nbsp;a&nbsp;theme&nbsp;icon\\)&nbsp;\\\\$\\(add\\)")}),test("appendMarkdown",()=>{const e=new t(void 0,{supportThemeIcons:!0});e.appendMarkdown("$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"$(zap) $(not a theme icon) $(add)")}),test("appendMarkdown with escaped icon",()=>{const e=new t(void 0,{supportThemeIcons:!0});e.appendMarkdown("\\$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"\\$(zap) $(not a theme icon) $(add)")})}),suite("Support Off",()=>{test("appendText",()=>{const e=new t(void 0,{supportThemeIcons:!1});e.appendText("$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"$\\(zap\\)&nbsp;$\\(not&nbsp;a&nbsp;theme&nbsp;icon\\)&nbsp;$\\(add\\)")}),test("appendMarkdown",()=>{const e=new t(void 0,{supportThemeIcons:!1});e.appendMarkdown("$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"$(zap) $(not a theme icon) $(add)")}),test("appendMarkdown with escaped icon",()=>{const e=new t(void 0,{supportThemeIcons:!0});e.appendMarkdown("\\$(zap) $(not a theme icon) $(add)"),n.strictEqual(e.value,"\\$(zap) $(not a theme icon) $(add)")})})})});
