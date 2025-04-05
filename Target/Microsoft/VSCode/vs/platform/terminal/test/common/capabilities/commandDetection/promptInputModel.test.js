import{ensureNoDisposablesAreLeakedInTestSuite as g}from"../../../../../../base/test/common/utils.js";import{NullLogService as K}from"../../../../../log/common/log.js";import{PromptInputModel as y}from"../../../../common/capabilities/commandDetection/promptInputModel.js";import{Emitter as d}from"../../../../../../base/common/event.js";import{ok as C,notDeepStrictEqual as I,strictEqual as b}from"assert";import{timeout as f}from"../../../../../../base/common/async.js";import{importAMDNodeModule as D}from"../../../../../../amdX.js";import{GeneralShellType as $,PosixShellType as u}from"../../../../common/terminal.js";suite("PromptInputModel",()=>{const r=g();let o,n,c,p,h;async function t(e){await new Promise(w=>n.write(e,w))}function i(){c.fire({marker:n.registerMarker()})}function s(){h.fire(null)}function m(e){o.setContinuationPrompt(e)}async function a(e){if(await f(0),o.cursorIndex!==-1&&!e.includes("|"))throw new Error("assertPromptInput must contain | character");const w=o.getCombinedString();b(w,e.replaceAll(`
`,"\u23CE"));const l=e.replace(/[\|\[\]]/g,""),x=e.indexOf("|");b(o.value,l),b(o.cursorIndex,x,`value=${o.value}`),C(o.ghostTextIndex===-1||x<=o.ghostTextIndex,`cursorIndex (${x}) must be before ghostTextIndex (${o.ghostTextIndex})`)}setup(async()=>{const e=(await D("@xterm/xterm","lib/xterm.js")).Terminal;n=r.add(new e({allowProposedApi:!0})),c=r.add(new d),p=r.add(new d),h=r.add(new d),o=r.add(new y(n,c.event,p.event,h.event,new K))}),test("basic input and execute",async()=>{await t("$ "),i(),await a("|"),await t("foo bar"),await a("foo bar|"),await t(`\r
`),s(),await a("foo bar"),await t(`(command output)\r
$ `),i(),await a("|")}),test("should not fire onDidChangeInput events when nothing changes",async()=>{const e=[];r.add(o.onDidChangeInput(w=>e.push(w))),await t("$ "),i(),await a("|"),await t("foo"),await a("foo|"),await t(" bar"),await a("foo bar|"),await t(`\r
`),s(),await a("foo bar"),await t("$ "),i(),await a("|"),await t("foo bar"),await a("foo bar|");for(let w=0;w<e.length-1;w++)I(e[w],e[w+1],"not adjacent events should fire with the same value")}),test("should fire onDidInterrupt followed by onDidFinish when ctrl+c is pressed",async()=>{await t("$ "),i(),await a("|"),await t("foo"),await a("foo|"),await new Promise(e=>{r.add(o.onDidInterrupt(()=>{r.add(o.onDidFinishInput(()=>{e()}))})),n.input(""),t("^C").then(()=>s())})}),test("cursor navigation",async()=>{await t("$ "),i(),await a("|"),await t("foo bar"),await a("foo bar|"),await t("\x1B[3D"),await a("foo |bar"),await t("\x1B[4D"),await a("|foo bar"),await t("\x1B[3C"),await a("foo| bar"),await t("\x1B[4C"),await a("foo bar|"),await t("\x1B[D"),await a("foo ba|r"),await t("\x1B[C"),await a("foo bar|")}),suite("ghost text",()=>{test("basic ghost text",async()=>{await t("$ "),i(),await a("|"),await t("foo\x1B[2m bar\x1B[0m\x1B[4D"),await a("foo|[ bar]"),await t("\x1B[2D"),await a("f|oo[ bar]")}),test("trailing whitespace",async()=>{await t("$ "),i(),await a("|"),await t("foo    "),await t("\x1B[4D"),await a("foo|    ")}),test("basic ghost text one word",async()=>{await t("$ "),i(),await a("|"),await t("pw\x1B[2md\x1B[1D"),await a("pw|[d]")}),test("ghost text with cursor navigation",async()=>{await t("$ "),i(),await a("|"),await t("foo\x1B[2m bar\x1B[0m\x1B[4D"),await a("foo|[ bar]"),await t("\x1B[2D"),await a("f|oo[ bar]"),await t("\x1B[C"),await a("fo|o[ bar]"),await t("\x1B[C"),await a("foo|[ bar]")}),test("ghost text with different foreground colors only",async()=>{await t("$ "),i(),await a("|"),await t("foo\x1B[38;2;255;0;0m bar\x1B[0m\x1B[4D"),await a("foo|[ bar]"),await t("\x1B[2D"),await a("f|oo[ bar]")}),test("no ghost text when foreground color matches earlier text",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[38;2;255;0;0mred1\x1B[0m \x1B[38;2;0;255;0mgreen\x1B[0m \x1B[38;2;255;0;0mred2\x1B[0m"),await a("red1 green red2|")}),test("ghost text detected when foreground color is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[38;2;255;0;0mcmd\x1B[0m \x1B[38;2;0;255;0marg\x1B[0m \x1B[38;2;0;0;255mfinal\x1B[5D"),await a("cmd arg |[final]")}),test("no ghost text when background color matches earlier text",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[48;2;255;0;0mred_bg1\x1B[0m \x1B[48;2;0;255;0mgreen_bg\x1B[0m \x1B[48;2;255;0;0mred_bg2\x1B[0m"),await a("red_bg1 green_bg red_bg2|")}),test("ghost text detected when background color is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[48;2;255;0;0mred_bg\x1B[0m \x1B[48;2;0;255;0mgreen_bg\x1B[0m \x1B[48;2;0;0;255mblue_bg\x1B[7D"),await a("red_bg green_bg |[blue_bg]")}),test("ghost text detected when bold style is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("text \x1B[1mBOLD\x1B[4D"),await a("text |[BOLD]")}),test("no ghost text when earlier text has the same bold style",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[1mBOLD1\x1B[0m normal \x1B[1mBOLD2\x1B[0m"),await a("BOLD1 normal BOLD2|")}),test("ghost text detected when italic style is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("text \x1B[3mITALIC\x1B[6D"),await a("text |[ITALIC]")}),test("no ghost text when earlier text has the same italic style",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[3mITALIC1\x1B[0m normal \x1B[3mITALIC2\x1B[0m"),await a("ITALIC1 normal ITALIC2|")}),test("ghost text detected when underline style is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("text \x1B[4mUNDERLINE\x1B[9D"),await a("text |[UNDERLINE]")}),test("no ghost text when earlier text has the same underline style",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[4mUNDERLINE1\x1B[0m normal \x1B[4mUNDERLINE2\x1B[0m"),await a("UNDERLINE1 normal UNDERLINE2|")}),test("ghost text detected when strikethrough style is unique at the end",async()=>{await t("$ "),i(),await a("|"),await t("text \x1B[9mSTRIKE\x1B[6D"),await a("text |[STRIKE]")}),test("no ghost text when earlier text has the same strikethrough style",async()=>{await t("$ "),i(),await a("|"),await t("\x1B[9mSTRIKE1\x1B[0m normal \x1B[9mSTRIKE2\x1B[0m"),await a("STRIKE1 normal STRIKE2|")}),suite("With wrapping",()=>{test("Fish ghost text in long line with wrapped content",async()=>{o.setShellType(u.Fish),await t("$ "),i(),await a("|"),await t("find . -name"),await a("find . -name|"),await t("\x1B[2m test\x1B[0m\x1B[4D"),await a("find . -name |[test]"),await t("\x1B[C"),await a("find . -name t|[est]"),await t("\x1B[C\x1B[C\x1B[C\x1B[C\x1B[C"),await a("find . -name test|")}),test("Pwsh ghost text in long line with wrapped content",async()=>{o.setShellType($.PowerShell),await t("$ "),i(),await a("|"),await t("find . -name"),await a("find . -name|"),await t("\x1B[2m test\x1B[0m\x1B[4D"),await a("find . -name |[test]"),await t("\x1B[C"),await a("find . -name t|[est]"),await t("\x1B[C\x1B[C\x1B[C\x1B[C\x1B[C"),await a("find . -name test|")})})}),test("wide input (Korean)",async()=>{await t("$ "),i(),await a("|"),await t("\uC548\uC601"),await a("\uC548\uC601|"),await t(`\r
\uCEF4\uD4E8\uD130`),await a(`\uC548\uC601
\uCEF4\uD4E8\uD130|`),await t(`\r
\uC0AC\uB78C`),await a(`\uC548\uC601
\uCEF4\uD4E8\uD130
\uC0AC\uB78C|`),await t("\x1B[G"),await a(`\uC548\uC601
\uCEF4\uD4E8\uD130
|\uC0AC\uB78C`),await t("\x1B[A"),await a(`\uC548\uC601
|\uCEF4\uD4E8\uD130
\uC0AC\uB78C`),await t("\x1B[4C"),await a(`\uC548\uC601
\uCEF4\uD4E8|\uD130
\uC0AC\uB78C`),await t("\x1B[1;4H"),await a(`\uC548|\uC601
\uCEF4\uD4E8\uD130
\uC0AC\uB78C`),await t("\x1B[D"),await a(`|\uC548\uC601
\uCEF4\uD4E8\uD130
\uC0AC\uB78C`)}),test("emoji input",async()=>{await t("$ "),i(),await a("|"),await t("\u270C\uFE0F\u{1F44D}"),await a("\u270C\uFE0F\u{1F44D}|"),await t(`\r
\u{1F60E}\u{1F615}\u{1F605}`),await a(`\u270C\uFE0F\u{1F44D}
\u{1F60E}\u{1F615}\u{1F605}|`),await t(`\r
\u{1F914}\u{1F937}\u{1F629}`),await a(`\u270C\uFE0F\u{1F44D}
\u{1F60E}\u{1F615}\u{1F605}
\u{1F914}\u{1F937}\u{1F629}|`),await t("\x1B[G"),await a(`\u270C\uFE0F\u{1F44D}
\u{1F60E}\u{1F615}\u{1F605}
|\u{1F914}\u{1F937}\u{1F629}`),await t("\x1B[A"),await a(`\u270C\uFE0F\u{1F44D}
|\u{1F60E}\u{1F615}\u{1F605}
\u{1F914}\u{1F937}\u{1F629}`),await t("\x1B[2C"),await a(`\u270C\uFE0F\u{1F44D}
\u{1F60E}\u{1F615}|\u{1F605}
\u{1F914}\u{1F937}\u{1F629}`),await t("\x1B[1;4H"),await a(`\u270C\uFE0F|\u{1F44D}
\u{1F60E}\u{1F615}\u{1F605}
\u{1F914}\u{1F937}\u{1F629}`),await t("\x1B[D"),await a(`|\u270C\uFE0F\u{1F44D}
\u{1F60E}\u{1F615}\u{1F605}
\u{1F914}\u{1F937}\u{1F629}`)}),suite("trailing whitespace",()=>{test("delete whitespace with backspace",async()=>{await t("$ "),i(),await a("|"),await t(" "),await a(" |"),n.input("\x7F",!0),await t("\x1B[D"),await a("|"),n.input(" ".repeat(4),!0),await t(" ".repeat(4)),await a("    |"),n.input("\x1B[D".repeat(2),!0),await t("\x1B[2D"),await a("  |  "),n.input("\x7F",!0),await t("\x1B[D"),await a(" |  "),n.input("\x7F",!0),await t("\x1B[D"),await a("|  "),n.input(" ",!0),await t(" "),await a(" |  "),n.input(" ",!0),await t(" "),await a("  |  "),n.input("\x1B[C",!0),await t("\x1B[C"),await a("   | "),n.input("a",!0),await t("a"),await a("   a| "),n.input("\x7F",!0),await t("\x1B[D\x1B[K"),await a("   | "),n.input("\x1B[D".repeat(2),!0),await t("\x1B[2D"),await a(" |   "),n.input("\x1B[3~",!0),await t(""),await a(" |  ")}),test.skip("track whitespace when ConPTY deletes whitespace unexpectedly",async()=>{await t("$ "),i(),await a("|"),n.input("ls",!0),await t("ls"),await a("ls|"),n.input(" ".repeat(4),!0),await t(" ".repeat(4)),await a("ls    |"),n.input(" ",!0),await t("\x1B[4D\x1B[5X\x1B[5C"),await a("ls     |")}),test("track whitespace beyond cursor",async()=>{await t("$ "),i(),await a("|"),await t(" ".repeat(8)),await a(`${" ".repeat(8)}|`),await t("\x1B[4D"),await a(`${" ".repeat(4)}|${" ".repeat(4)}`)})}),suite("multi-line",()=>{test("basic 2 line",async()=>{await t("$ "),i(),await a("|"),await t('echo "a'),await a('echo "a|'),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "a
|`),await t("b"),await a(`echo "a
b|`)}),test("basic 3 line",async()=>{await t("$ "),i(),await a("|"),await t('echo "a'),await a('echo "a|'),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "a
|`),await t("b"),await a(`echo "a
b|`),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "a
b
|`),await t("c"),await a(`echo "a
b
c|`)}),test("navigate left in multi-line",async()=>{await t("$ "),i(),await a("|"),await t('echo "a'),await a('echo "a|'),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "a
|`),await t("b"),await a(`echo "a
b|`),await t("\x1B[D"),await a(`echo "a
|b`),await t("\x1B[@c"),await a(`echo "a
c|b`),await t(`\x1B[K
\r\u2219 `),await a(`echo "a
c
|`),await t("b"),await a(`echo "a
c
b|`),await t(" foo"),await a(`echo "a
c
b foo|`),await t("\x1B[3D"),await a(`echo "a
c
b |foo`)}),test("navigate up in multi-line",async()=>{await t("$ "),i(),await a("|"),await t('echo "foo'),await a('echo "foo|'),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "foo
|`),await t("bar"),await a(`echo "foo
bar|`),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "foo
bar
|`),await t("baz"),await a(`echo "foo
bar
baz|`),await t("\x1B[A"),await a(`echo "foo
bar|
baz`),await t("\x1B[D"),await a(`echo "foo
ba|r
baz`),await t("\x1B[D"),await a(`echo "foo
b|ar
baz`),await t("\x1B[D"),await a(`echo "foo
|bar
baz`),await t("\x1B[1;9H"),await a(`echo "|foo
bar
baz`),await t("\x1B[C"),await a(`echo "f|oo
bar
baz`),await t("\x1B[C"),await a(`echo "fo|o
bar
baz`),await t("\x1B[C"),await a(`echo "foo|
bar
baz`)}),test("navigating up when first line contains invalid/stale trailing whitespace",async()=>{await t("$ "),i(),await a("|"),await t('echo "foo      \x1B[6D'),await a('echo "foo|'),await t(`
\r\u2219 `),m("\u2219 "),await a(`echo "foo
|`),await t("bar"),await a(`echo "foo
bar|`),await t("\x1B[D"),await a(`echo "foo
ba|r`),await t("\x1B[D"),await a(`echo "foo
b|ar`),await t("\x1B[D"),await a(`echo "foo
|bar`)})}),suite("multi-line wrapped (no continuation prompt)",()=>{test("basic wrapped line",async()=>{n.resize(5,10),await t("$ "),i(),await a("|"),await t("ech"),await a("ech|"),await t("o "),await a("echo |"),await t('"a"'),await a('echo "a"| '),await t(`
\r b`),await a(`echo "a"
 b|`),await t(`
\r c`),await a(`echo "a"
 b
 c|`)})}),suite("multi-line wrapped (continuation prompt)",()=>{test("basic wrapped line",async()=>{n.resize(5,10),o.setContinuationPrompt("\u2219 "),await t("$ "),i(),await a("|"),await t("ech"),await a("ech|"),await t("o "),await a("echo |"),await t('"a"'),await a('echo "a"| '),await t(`
\r\u2219 `),await a(`echo "a"
|`),await t("b"),await a(`echo "a"
b|`),await t(`
\r\u2219 `),await a(`echo "a"
b
|`),await t("c"),await a(`echo "a"
b
c|`),await t(`
\r\u2219 `),await a(`echo "a"
b
c
|`)})}),suite("multi-line wrapped fish",()=>{test("forward slash continuation",async()=>{o.setShellType(u.Fish),await t("$ "),await a("|"),await t("[I] meganrogge@Megans-MacBook-Pro ~ (main|BISECTING)>"),i(),await t("ech\\"),await a("ech\\|"),await t(`
o bye`),await a("echo bye|")}),test("newline with no continuation",async()=>{o.setShellType(u.Fish),await t("$ "),await a("|"),await t("[I] meganrogge@Megans-MacBook-Pro ~ (main|BISECTING)>"),i(),await a("|"),await t('echo "hi'),await a('echo "hi|'),await t(`
and bye
why"`),await a(`echo "hi
and bye
why"|`)})}),suite("recorded sessions",()=>{async function e(w){for(const l of w)await t(l)}suite("Windows 11 (10.0.22621.3447), pwsh 7.4.2, starship prompt 1.10.2",()=>{test("input with ignored ghost text",async()=>{await e(["\x1B[?25l\x1B[2J\x1B[m\x1B[H\x1B]0;C:\\Program Files\\WindowsApps\\Microsoft.PowerShell_7.4.2.0_x64__8wekyb3d8bbwe\\pwsh.exe\x07\x1B[?25h",`\x1B[?25l\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\x1B[H\x1B[?25h`,"\x1B]633;P;IsWindows=True\x07","\x1B]633;P;ContinuationPrompt=\x1B[38;5;8m\u2219\x1B[0m \x07","\x1B]633;A\x07\x1B]633;P;Cwd=C:\\Github\\microsoft\\vscode\x07\x1B]633;B\x07",`\x1B[34m\r
\uE0B6\x1B[38;2;17;17;17m\x1B[44m03:13:47 \x1B[34m\x1B[41m\uE0B0 \x1B[38;2;17;17;17mvscode \x1B[31m\x1B[43m\uE0B0 \x1B[38;2;17;17;17m\uE0A0 tyriar/prompt_input_model \x1B[33m\x1B[46m\uE0B0 \x1B[38;2;17;17;17m$\u21E1 \x1B[36m\x1B[49m\uE0B0 \x1B[mvia \x1B[32m\x1B[1m\uE718 v18.18.2 \r
\u276F\x1B[m `]),i(),await a("|"),await e(["\x1B[?25l\x1B[93mf\x1B[97m\x1B[2m\x1B[3makecommand\x1B[3;4H\x1B[?25h","\x1B[m","\x1B[93m\bfo\x1B[9X","\x1B[m","\x1B[?25l\x1B[93m\x1B[3;3Hfoo\x1B[?25h","\x1B[m"]),await a("foo|")}),test("input with accepted and run ghost text",async()=>{await e(["\x1B[?25l\x1B[2J\x1B[m\x1B[H\x1B]0;C:\\Program Files\\WindowsApps\\Microsoft.PowerShell_7.4.2.0_x64__8wekyb3d8bbwe\\pwsh.exe\x07\x1B[?25h",`\x1B[?25l\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\x1B[H\x1B[?25h`,"\x1B]633;P;IsWindows=True\x07","\x1B]633;P;ContinuationPrompt=\x1B[38;5;8m\u2219\x1B[0m \x07","\x1B]633;A\x07\x1B]633;P;Cwd=C:\\Github\\microsoft\\vscode\x07\x1B]633;B\x07",`\x1B[34m\r
\uE0B6\x1B[38;2;17;17;17m\x1B[44m03:41:36 \x1B[34m\x1B[41m\uE0B0 \x1B[38;2;17;17;17mvscode \x1B[31m\x1B[43m\uE0B0 \x1B[38;2;17;17;17m\uE0A0 tyriar/prompt_input_model \x1B[33m\x1B[46m\uE0B0 \x1B[38;2;17;17;17m$ \x1B[36m\x1B[49m\uE0B0 \x1B[mvia \x1B[32m\x1B[1m\uE718 v18.18.2 \r
\u276F\x1B[m `]),o.setContinuationPrompt("\u2219 "),i(),await a("|"),await e(['\x1B[?25l\x1B[93me\x1B[97m\x1B[2m\x1B[3mcho "hello world"\x1B[3;4H\x1B[?25h',"\x1B[m"]),await a('e|[cho "hello world"]'),await e(['\x1B[?25l\x1B[93m\bec\x1B[97m\x1B[2m\x1B[3mho "hello world"\x1B[3;5H\x1B[?25h',"\x1B[m"]),await a('ec|[ho "hello world"]'),await e(['\x1B[?25l\x1B[93m\x1B[3;3Hech\x1B[97m\x1B[2m\x1B[3mo "hello world"\x1B[3;6H\x1B[?25h',"\x1B[m"]),await a('ech|[o "hello world"]'),await e(['\x1B[?25l\x1B[93m\x1B[3;3Hecho\x1B[97m\x1B[2m\x1B[3m "hello world"\x1B[3;7H\x1B[?25h',"\x1B[m"]),await a('echo|[ "hello world"]'),await e(['\x1B[?25l\x1B[93m\x1B[3;3Hecho \x1B[97m\x1B[2m\x1B[3m"hello world"\x1B[3;8H\x1B[?25h',"\x1B[m"]),await a('echo |["hello world"]'),await e(['\x1B[?25l\x1B[93m\x1B[3;3Hecho \x1B[36m"hello world"\x1B[?25h',"\x1B[m"]),await a('echo "hello world"|'),await e(['\x1B]633;E;echo "hello world";ff464d39-bc80-4bae-9ead-b1cafc4adf6f\x07\x1B]633;C\x07']),s(),await a('echo "hello world"'),await e([`\r
`,`hello world\r
`]),await a('echo "hello world"'),await e(["\x1B]633;D;0\x07\x1B]633;A\x07\x1B]633;P;Cwd=C:\\Github\\microsoft\\vscode\x07\x1B]633;B\x07",`\x1B[34m\r
\uE0B6\x1B[38;2;17;17;17m\x1B[44m03:41:42 \x1B[34m\x1B[41m\uE0B0 \x1B[38;2;17;17;17mvscode \x1B[31m\x1B[43m\uE0B0 \x1B[38;2;17;17;17m\uE0A0 tyriar/prompt_input_model \x1B[33m\x1B[46m\uE0B0 \x1B[38;2;17;17;17m$ \x1B[36m\x1B[49m\uE0B0 \x1B[mvia \x1B[32m\x1B[1m\uE718 v18.18.2 \r
\u276F\x1B[m `]),i(),await a("|")}),test("input, go to start (ctrl+home), delete word in front (ctrl+delete)",async()=>{await e(["\x1B[?25l\x1B[2J\x1B[m\x1B[H\x1B]0;C:Program FilesWindowsAppsMicrosoft.PowerShell_7.4.2.0_x64__8wekyb3d8bbwepwsh.exe\x07\x1B[?25h",`\x1B[?25l\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\r
\x1B[K\x1B[H\x1B[?25h`,"\x1B]633;P;IsWindows=True\x07","\x1B]633;P;ContinuationPrompt=\x1B[38;5;8m\u2219\x1B[0m \x07","\x1B]633;A\x07\x1B]633;P;Cwd=C:\\Github\\microsoft\\vscode\x07\x1B]633;B\x07",`\x1B[34m\r
\uE0B6\x1B[38;2;17;17;17m\x1B[44m16:07:06 \x1B[34m\x1B[41m\uE0B0 \x1B[38;2;17;17;17mvscode \x1B[31m\x1B[43m\uE0B0 \x1B[38;2;17;17;17m\uE0A0 tyriar/210662 \x1B[33m\x1B[46m\uE0B0 \x1B[38;2;17;17;17m$! \x1B[36m\x1B[49m\uE0B0 \x1B[mvia \x1B[32m\x1B[1m\uE718 v18.18.2 \r
\u276F\x1B[m `]),i(),await a("|"),await e(["\x1B[?25l\x1B[93mG\x1B[97m\x1B[2m\x1B[3mit push\x1B[3;4H\x1B[?25h","\x1B[m","\x1B[?25l\x1B[93m\bGe\x1B[97m\x1B[2m\x1B[3mt-ChildItem -Path a\x1B[3;5H\x1B[?25h","\x1B[m","\x1B[?25l\x1B[93m\x1B[3;3HGet\x1B[97m\x1B[2m\x1B[3m-ChildItem -Path a\x1B[3;6H\x1B[?25h"]),await a("Get|[-ChildItem -Path a]"),await e(["\x1B[m","\x1B[?25l\x1B[3;3H\x1B[?25h","\x1B[21X"]),await f(0);const w=o.getCombinedString();b(w,"|".replaceAll(`
`,"\u23CE"))})})})});
