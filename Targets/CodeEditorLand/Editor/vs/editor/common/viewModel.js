import*as u from"../../base/common/arrays.js";import"../../base/common/scrollable.js";import*as d from"../../base/common/strings.js";import"./core/position.js";import{Range as g}from"./core/range.js";import"./cursorCommon.js";import"./cursorEvents.js";import"./editorCommon.js";import"./editorTheme.js";import"./model.js";import"./modelLineProjectionData.js";import"./textModelGuides.js";import"./tokens/lineTokens.js";import"./viewEventHandler.js";import"./viewEvents.js";class re{_viewportBrand=void 0;top;left;width;height;constructor(e,n,o,i){this.top=e|0,this.left=n|0,this.width=o|0,this.height=i|0}}class te{tabSize;data;constructor(e,n){this.tabSize=e,this.data=n}}class ae{_viewLineDataBrand=void 0;content;continuesWithWrappedLine;minColumn;maxColumn;startVisibleColumn;tokens;inlineDecorations;constructor(e,n,o,i,t,a,l){this.content=e,this.continuesWithWrappedLine=n,this.minColumn=o,this.maxColumn=i,this.startVisibleColumn=t,this.tokens=a,this.inlineDecorations=l}}class s{minColumn;maxColumn;content;continuesWithWrappedLine;containsRTL;isBasicASCII;tokens;inlineDecorations;tabSize;startVisibleColumn;constructor(e,n,o,i,t,a,l,c,b,p){this.minColumn=e,this.maxColumn=n,this.content=o,this.continuesWithWrappedLine=i,this.isBasicASCII=s.isBasicASCII(o,a),this.containsRTL=s.containsRTL(o,this.isBasicASCII,t),this.tokens=l,this.inlineDecorations=c,this.tabSize=b,this.startVisibleColumn=p}static isBasicASCII(e,n){return n?d.isBasicASCII(e):!0}static containsRTL(e,n,o){return!n&&o?d.containsRTL(e):!1}}var f=(i=>(i[i.Regular=0]="Regular",i[i.Before=1]="Before",i[i.After=2]="After",i[i.RegularAffectingLetterSpacing=3]="RegularAffectingLetterSpacing",i))(f||{});class v{constructor(e,n,o){this.range=e;this.inlineClassName=n;this.type=o}}class le{constructor(e,n,o,i){this.startOffset=e;this.endOffset=n;this.inlineClassName=o;this.inlineClassNameAffectsLetterSpacing=i}toInlineDecoration(e){return new v(new g(e,this.startOffset+1,e,this.endOffset+1),this.inlineClassName,this.inlineClassNameAffectsLetterSpacing?3:0)}}class se{_viewModelDecorationBrand=void 0;range;options;constructor(e,n){this.range=e,this.options=n}}class m{constructor(e,n,o){this.color=e;this.zIndex=n;this.data=o}static compareByRenderingProps(e,n){return e.zIndex===n.zIndex?e.color<n.color?-1:e.color>n.color?1:0:e.zIndex-n.zIndex}static equals(e,n){return e.color===n.color&&e.zIndex===n.zIndex&&u.equals(e.data,n.data)}static equalsArr(e,n){return u.equals(e,n,m.equals)}}export{v as InlineDecoration,f as InlineDecorationType,te as MinimapLinesRenderingData,m as OverviewRulerDecorationsGroup,le as SingleLineInlineDecoration,ae as ViewLineData,s as ViewLineRenderingData,se as ViewModelDecoration,re as Viewport};
