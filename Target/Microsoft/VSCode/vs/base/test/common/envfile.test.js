import{parseEnvFile as E}from"../../common/envfile.js";import{ensureNoDisposablesAreLeakedInTestSuite as n}from"./utils.js";import*as t from"assert";const l=`
BASIC=basic

# previous line intentionally left blank
AFTER_LINE=after_line
EMPTY=
EMPTY_SINGLE_QUOTES=''
EMPTY_DOUBLE_QUOTES=""
EMPTY_BACKTICKS=\`\`
SINGLE_QUOTES='single_quotes'
SINGLE_QUOTES_SPACED='    single quotes    '
DOUBLE_QUOTES="double_quotes"
DOUBLE_QUOTES_SPACED="    double quotes    "
DOUBLE_QUOTES_INSIDE_SINGLE='double "quotes" work inside single quotes'
DOUBLE_QUOTES_WITH_NO_SPACE_BRACKET="{ port: $MONGOLAB_PORT}"
SINGLE_QUOTES_INSIDE_DOUBLE="single 'quotes' work inside double quotes"
BACKTICKS_INSIDE_SINGLE='\`backticks\` work inside single quotes'
BACKTICKS_INSIDE_DOUBLE="\`backticks\` work inside double quotes"
BACKTICKS=\`backticks\`
BACKTICKS_SPACED=\`    backticks    \`
DOUBLE_QUOTES_INSIDE_BACKTICKS=\`double "quotes" work inside backticks\`
SINGLE_QUOTES_INSIDE_BACKTICKS=\`single 'quotes' work inside backticks\`
DOUBLE_AND_SINGLE_QUOTES_INSIDE_BACKTICKS=\`double "quotes" and single 'quotes' work inside backticks\`
EXPAND_NEWLINES="expand\\nnew\\nlines"
DONT_EXPAND_UNQUOTED=dontexpand\\nnewlines
DONT_EXPAND_SQUOTED='dontexpand\\nnewlines'
# COMMENTS=work
INLINE_COMMENTS=inline comments # work #very #well
INLINE_COMMENTS_SINGLE_QUOTES='inline comments outside of #singlequotes' # work
INLINE_COMMENTS_DOUBLE_QUOTES="inline comments outside of #doublequotes" # work
INLINE_COMMENTS_BACKTICKS=\`inline comments outside of #backticks\` # work
INLINE_COMMENTS_SPACE=inline comments start with a#number sign. no space required.
EQUAL_SIGNS=equals==
RETAIN_INNER_QUOTES={"foo": "bar"}
RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'
RETAIN_INNER_QUOTES_AS_BACKTICKS=\`{"foo": "bar's"}\`
TRIM_SPACE_FROM_UNQUOTED=    some spaced out string
USERNAME=therealnerdybeast@example.tld
		SPACED_KEY = parsed
`;suite("parseEnvFile",()=>{n(),test("parses",()=>{const e=E(l);t.strictEqual(e.get("BASIC"),"basic"),t.strictEqual(e.get("AFTER_LINE"),"after_line"),t.strictEqual(e.get("EMPTY"),""),t.strictEqual(e.get("EMPTY_SINGLE_QUOTES"),""),t.strictEqual(e.get("EMPTY_DOUBLE_QUOTES"),""),t.strictEqual(e.get("EMPTY_BACKTICKS"),""),t.strictEqual(e.get("SINGLE_QUOTES"),"single_quotes"),t.strictEqual(e.get("SINGLE_QUOTES_SPACED"),"    single quotes    "),t.strictEqual(e.get("DOUBLE_QUOTES"),"double_quotes"),t.strictEqual(e.get("DOUBLE_QUOTES_SPACED"),"    double quotes    "),t.strictEqual(e.get("DOUBLE_QUOTES_INSIDE_SINGLE"),'double "quotes" work inside single quotes'),t.strictEqual(e.get("DOUBLE_QUOTES_WITH_NO_SPACE_BRACKET"),"{ port: $MONGOLAB_PORT}"),t.strictEqual(e.get("SINGLE_QUOTES_INSIDE_DOUBLE"),"single 'quotes' work inside double quotes"),t.strictEqual(e.get("BACKTICKS_INSIDE_SINGLE"),"`backticks` work inside single quotes"),t.strictEqual(e.get("BACKTICKS_INSIDE_DOUBLE"),"`backticks` work inside double quotes"),t.strictEqual(e.get("BACKTICKS"),"backticks"),t.strictEqual(e.get("BACKTICKS_SPACED"),"    backticks    "),t.strictEqual(e.get("DOUBLE_QUOTES_INSIDE_BACKTICKS"),'double "quotes" work inside backticks'),t.strictEqual(e.get("SINGLE_QUOTES_INSIDE_BACKTICKS"),"single 'quotes' work inside backticks"),t.strictEqual(e.get("DOUBLE_AND_SINGLE_QUOTES_INSIDE_BACKTICKS"),`double "quotes" and single 'quotes' work inside backticks`),t.strictEqual(e.get("EXPAND_NEWLINES"),`expand
new
lines`),t.strictEqual(e.get("DONT_EXPAND_UNQUOTED"),"dontexpand\\nnewlines"),t.strictEqual(e.get("DONT_EXPAND_SQUOTED"),"dontexpand\\nnewlines"),t.strictEqual(e.get("COMMENTS"),void 0),t.strictEqual(e.get("INLINE_COMMENTS"),"inline comments"),t.strictEqual(e.get("INLINE_COMMENTS_SINGLE_QUOTES"),"inline comments outside of #singlequotes"),t.strictEqual(e.get("INLINE_COMMENTS_DOUBLE_QUOTES"),"inline comments outside of #doublequotes"),t.strictEqual(e.get("INLINE_COMMENTS_BACKTICKS"),"inline comments outside of #backticks"),t.strictEqual(e.get("INLINE_COMMENTS_SPACE"),"inline comments start with a"),t.strictEqual(e.get("EQUAL_SIGNS"),"equals=="),t.strictEqual(e.get("RETAIN_INNER_QUOTES"),'{"foo": "bar"}'),t.strictEqual(e.get("RETAIN_INNER_QUOTES_AS_STRING"),'{"foo": "bar"}'),t.strictEqual(e.get("RETAIN_INNER_QUOTES_AS_BACKTICKS"),`{"foo": "bar's"}`),t.strictEqual(e.get("TRIM_SPACE_FROM_UNQUOTED"),"some spaced out string"),t.strictEqual(e.get("USERNAME"),"therealnerdybeast@example.tld"),t.strictEqual(e.get("SPACED_KEY"),"parsed");const i=E("BUFFER=true");t.strictEqual(i.get("BUFFER"),"true");const s=Object.entries({SERVER:"localhost",PASSWORD:"password",DB:"tests"}),_=E("SERVER=localhost\rPASSWORD=password\rDB=tests\r");t.deepStrictEqual([..._],s);const o=E(`SERVER=localhost
PASSWORD=password
DB=tests
`);t.deepStrictEqual([...o],s);const S=E(`SERVER=localhost\r
PASSWORD=password\r
DB=tests\r
`);t.deepStrictEqual([...S],s)})});
