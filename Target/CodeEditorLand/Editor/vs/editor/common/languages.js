import"../../base/common/buffer.js";import"../../base/common/cancellation.js";import{Codicon as n}from"../../base/common/codicons.js";import"../../base/common/color.js";import"../../base/common/dataTransfer.js";import"../../base/common/event.js";import"../../base/common/hierarchicalKind.js";import"../../base/common/htmlContent.js";import"../../base/common/lifecycle.js";import"../../base/common/themables.js";import{URI as g}from"../../base/common/uri.js";import{EditOperation as y}from"./core/editOperation.js";import"./core/position.js";import{Range as m}from"./core/range.js";import"./core/selection.js";import"./encodedTokenAttributes.js";import"./languageSelector.js";import"./model.js";import{TokenizationRegistry as I}from"./tokenizationRegistry.js";import"./tokens/contiguousMultilineTokens.js";import{localize as s}from"../../nls.js";import"../../platform/extensions/common/extensions.js";import"../../platform/markers/common/markers.js";import"./textModelEvents.js";class Ne{constructor(a,e,i){this.offset=a;this.type=e;this.language=i}_tokenBrand=void 0;toString(){return"("+this.offset+", "+this.type+")"}}class Ae{constructor(a,e){this.tokens=a;this.endState=e}_tokenizationResultBrand=void 0}class Ve{constructor(a,e){this.tokens=a;this.endState=e}_encodedTokenizationResultBrand=void 0}var x=(e=>(e[e.Increase=0]="Increase",e[e.Decrease=1]="Decrease",e))(x||{}),f=(t=>(t[t.Method=0]="Method",t[t.Function=1]="Function",t[t.Constructor=2]="Constructor",t[t.Field=3]="Field",t[t.Variable=4]="Variable",t[t.Class=5]="Class",t[t.Struct=6]="Struct",t[t.Interface=7]="Interface",t[t.Module=8]="Module",t[t.Property=9]="Property",t[t.Event=10]="Event",t[t.Operator=11]="Operator",t[t.Unit=12]="Unit",t[t.Value=13]="Value",t[t.Constant=14]="Constant",t[t.Enum=15]="Enum",t[t.EnumMember=16]="EnumMember",t[t.Keyword=17]="Keyword",t[t.Text=18]="Text",t[t.Color=19]="Color",t[t.File=20]="File",t[t.Reference=21]="Reference",t[t.Customcolor=22]="Customcolor",t[t.Folder=23]="Folder",t[t.TypeParameter=24]="TypeParameter",t[t.User=25]="User",t[t.Issue=26]="Issue",t[t.Snippet=27]="Snippet",t))(f||{}),C;(l=>{const o=new Map;o.set(0,n.symbolMethod),o.set(1,n.symbolFunction),o.set(2,n.symbolConstructor),o.set(3,n.symbolField),o.set(4,n.symbolVariable),o.set(5,n.symbolClass),o.set(6,n.symbolStruct),o.set(7,n.symbolInterface),o.set(8,n.symbolModule),o.set(9,n.symbolProperty),o.set(10,n.symbolEvent),o.set(11,n.symbolOperator),o.set(12,n.symbolUnit),o.set(13,n.symbolValue),o.set(15,n.symbolEnum),o.set(14,n.symbolConstant),o.set(15,n.symbolEnum),o.set(16,n.symbolEnumMember),o.set(17,n.symbolKeyword),o.set(27,n.symbolSnippet),o.set(18,n.symbolText),o.set(19,n.symbolColor),o.set(20,n.symbolFile),o.set(21,n.symbolReference),o.set(22,n.symbolCustomColor),o.set(23,n.symbolFolder),o.set(24,n.symbolTypeParameter),o.set(25,n.account),o.set(26,n.issues);function a(c){let p=o.get(c);return p||(p=n.symbolProperty),p}l.toIcon=a;const e=new Map;e.set("method",0),e.set("function",1),e.set("constructor",2),e.set("field",3),e.set("variable",4),e.set("class",5),e.set("struct",6),e.set("interface",7),e.set("module",8),e.set("property",9),e.set("event",10),e.set("operator",11),e.set("unit",12),e.set("value",13),e.set("constant",14),e.set("enum",15),e.set("enum-member",16),e.set("enumMember",16),e.set("keyword",17),e.set("snippet",27),e.set("text",18),e.set("color",19),e.set("file",20),e.set("reference",21),e.set("customcolor",22),e.set("folder",23),e.set("type-parameter",24),e.set("typeParameter",24),e.set("account",25),e.set("issue",26);function i(c,p){let u=e.get(c);return typeof u>"u"&&!p&&(u=9),u}l.fromString=i})(C||={});var b=(a=>(a[a.Deprecated=1]="Deprecated",a))(b||{}),k=(i=>(i[i.None=0]="None",i[i.KeepWhitespace=1]="KeepWhitespace",i[i.InsertAsSnippet=4]="InsertAsSnippet",i))(k||{}),T=(i=>(i[i.Word=0]="Word",i[i.Line=1]="Line",i[i.Suggest=2]="Suggest",i))(T||{}),v=(i=>(i[i.Invoke=0]="Invoke",i[i.TriggerCharacter=1]="TriggerCharacter",i[i.TriggerForIncompleteCompletions=2]="TriggerForIncompleteCompletions",i))(v||{}),R=(e=>(e[e.Automatic=0]="Automatic",e[e.Explicit=1]="Explicit",e))(R||{});class we{constructor(a,e,i,l){this.range=a;this.text=e;this.completionKind=i;this.isSnippetText=l}equals(a){return m.lift(this.range).equalsRange(a.range)&&this.text===a.text&&this.completionKind===a.completionKind&&this.isSnippetText===a.isSnippetText}}var P=(e=>(e[e.Invoke=1]="Invoke",e[e.Auto=2]="Auto",e))(P||{}),S=(e=>(e[e.Automatic=0]="Automatic",e[e.PasteAs=1]="PasteAs",e))(S||{}),E=(i=>(i[i.Invoke=1]="Invoke",i[i.TriggerCharacter=2]="TriggerCharacter",i[i.ContentChange=3]="ContentChange",i))(E||{}),h=(i=>(i[i.Text=0]="Text",i[i.Read=1]="Read",i[i.Write=2]="Write",i))(h||{});function Oe(o){return o&&g.isUri(o.uri)&&m.isIRange(o.range)&&(m.isIRange(o.originSelectionRange)||m.isIRange(o.targetSelectionRange))}function Ue(o){return o&&g.isUri(o.uri)&&m.isIRange(o.range)}var M=(r=>(r[r.File=0]="File",r[r.Module=1]="Module",r[r.Namespace=2]="Namespace",r[r.Package=3]="Package",r[r.Class=4]="Class",r[r.Method=5]="Method",r[r.Property=6]="Property",r[r.Field=7]="Field",r[r.Constructor=8]="Constructor",r[r.Enum=9]="Enum",r[r.Interface=10]="Interface",r[r.Function=11]="Function",r[r.Variable=12]="Variable",r[r.Constant=13]="Constant",r[r.String=14]="String",r[r.Number=15]="Number",r[r.Boolean=16]="Boolean",r[r.Array=17]="Array",r[r.Object=18]="Object",r[r.Key=19]="Key",r[r.Null=20]="Null",r[r.EnumMember=21]="EnumMember",r[r.Struct=22]="Struct",r[r.Event=23]="Event",r[r.Operator=24]="Operator",r[r.TypeParameter=25]="TypeParameter",r))(M||{});const D={17:s("Array","array"),16:s("Boolean","boolean"),4:s("Class","class"),13:s("Constant","constant"),8:s("Constructor","constructor"),9:s("Enum","enumeration"),21:s("EnumMember","enumeration member"),23:s("Event","event"),7:s("Field","field"),0:s("File","file"),11:s("Function","function"),10:s("Interface","interface"),19:s("Key","key"),5:s("Method","method"),1:s("Module","module"),2:s("Namespace","namespace"),20:s("Null","null"),15:s("Number","number"),18:s("Object","object"),24:s("Operator","operator"),3:s("Package","package"),6:s("Property","property"),14:s("String","string"),22:s("Struct","struct"),25:s("TypeParameter","type parameter"),12:s("Variable","variable")};function Be(o,a){return s("symbolAriaLabel","{0} ({1})",o,D[a])}var L=(a=>(a[a.Deprecated=1]="Deprecated",a))(L||{}),F;(e=>{const o=new Map;o.set(0,n.symbolFile),o.set(1,n.symbolModule),o.set(2,n.symbolNamespace),o.set(3,n.symbolPackage),o.set(4,n.symbolClass),o.set(5,n.symbolMethod),o.set(6,n.symbolProperty),o.set(7,n.symbolField),o.set(8,n.symbolConstructor),o.set(9,n.symbolEnum),o.set(10,n.symbolInterface),o.set(11,n.symbolFunction),o.set(12,n.symbolVariable),o.set(13,n.symbolConstant),o.set(14,n.symbolString),o.set(15,n.symbolNumber),o.set(16,n.symbolBoolean),o.set(17,n.symbolArray),o.set(18,n.symbolObject),o.set(19,n.symbolKey),o.set(20,n.symbolNull),o.set(21,n.symbolEnumMember),o.set(22,n.symbolStruct),o.set(23,n.symbolEvent),o.set(24,n.symbolOperator),o.set(25,n.symbolTypeParameter);function a(i){let l=o.get(i);return l||(l=n.symbolProperty),l}e.toIcon=a})(F||={});class We{static asEditOperation(a){return y.replace(m.lift(a.range),a.text)}}class d{constructor(a){this.value=a}static Comment=new d("comment");static Imports=new d("imports");static Region=new d("region");static fromValue(a){switch(a){case"comment":return d.Comment;case"imports":return d.Imports;case"region":return d.Region}return new d(a)}}var z=(a=>(a[a.AIGenerated=1]="AIGenerated",a))(z||{}),H=(e=>(e[e.Invoke=0]="Invoke",e[e.Automatic=1]="Automatic",e))(H||{}),N;(a=>{function o(e){return!e||typeof e!="object"?!1:typeof e.id=="string"&&typeof e.title=="string"}a.is=o})(N||={});var A=(e=>(e[e.Collapsed=0]="Collapsed",e[e.Expanded=1]="Expanded",e))(A||{}),V=(e=>(e[e.Unresolved=0]="Unresolved",e[e.Resolved=1]="Resolved",e))(V||{}),w=(e=>(e[e.Current=0]="Current",e[e.Outdated=1]="Outdated",e))(w||{}),O=(e=>(e[e.Editing=0]="Editing",e[e.Preview=1]="Preview",e))(O||{}),U=(e=>(e[e.Published=0]="Published",e[e.Draft=1]="Draft",e))(U||{}),B=(e=>(e[e.Type=1]="Type",e[e.Parameter=2]="Parameter",e))(B||{});class qe{constructor(a){this.createSupport=a}_tokenizationSupport=null;dispose(){this._tokenizationSupport&&this._tokenizationSupport.then(a=>{a&&a.dispose()})}get tokenizationSupport(){return this._tokenizationSupport||(this._tokenizationSupport=this.createSupport()),this._tokenizationSupport}}const je=new I,Ke=new I;var W=(l=>(l[l.None=0]="None",l[l.Option=1]="Option",l[l.Default=2]="Default",l[l.Preferred=3]="Preferred",l))(W||{}),q=(e=>(e[e.Invoke=0]="Invoke",e[e.Automatic=1]="Automatic",e))(q||{});export{P as CodeActionTriggerType,N as Command,O as CommentMode,U as CommentState,w as CommentThreadApplicability,A as CommentThreadCollapsibleState,V as CommentThreadState,k as CompletionItemInsertTextRule,f as CompletionItemKind,C as CompletionItemKinds,b as CompletionItemTag,v as CompletionTriggerKind,h as DocumentHighlightKind,S as DocumentPasteTriggerKind,Ve as EncodedTokenizationResult,W as ExternalUriOpenerPriority,d as FoldingRangeKind,x as HoverVerbosityAction,B as InlayHintKind,R as InlineCompletionTriggerKind,q as InlineEditTriggerKind,qe as LazyTokenizationSupport,z as NewSymbolNameTag,H as NewSymbolNameTriggerKind,T as PartialAcceptTriggerKind,we as SelectedSuggestionInfo,E as SignatureHelpTriggerKind,M as SymbolKind,F as SymbolKinds,L as SymbolTag,We as TextEdit,Ne as Token,je as TokenizationRegistry,Ae as TokenizationResult,Ke as TreeSitterTokenizationRegistry,Be as getAriaLabelForSymbol,Ue as isLocation,Oe as isLocationLink,D as symbolKindNames};
