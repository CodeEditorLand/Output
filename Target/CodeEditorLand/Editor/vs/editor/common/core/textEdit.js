import{assert as x,assertFn as R,checkAdjacentItems as E}from"../../../base/common/assert.js";import{BugIndicatingError as P}from"../../../base/common/errors.js";import"./editOperation.js";import{Position as g}from"./position.js";import{PositionOffsetTransformer as L}from"./positionToOffset.js";import{Range as d}from"./range.js";import{TextLength as f}from"./textLength.js";class l{constructor(t){this.edits=t;R(()=>E(t,(e,n)=>e.range.getEndPosition().isBeforeOrEqual(n.range.getStartPosition())))}static single(t,e){return new l([new m(t,e)])}static insert(t,e){return new l([new m(d.fromPositions(t,t),e)])}normalize(){const t=[];for(const e of this.edits)if(t.length>0&&t[t.length-1].range.getEndPosition().equals(e.range.getStartPosition())){const n=t[t.length-1];t[t.length-1]=new m(n.range.plusRange(e.range),n.text+e.text)}else e.isEmpty||t.push(e);return new l(t)}mapPosition(t){let e=0,n=0,i=0;for(const s of this.edits){const r=s.range.getStartPosition();if(t.isBeforeOrEqual(r))break;const u=s.range.getEndPosition(),o=f.ofText(s.text);if(t.isBefore(u)){const c=new g(r.lineNumber+e,r.column+(r.lineNumber+e===n?i:0)),p=o.addToPosition(c);return b(c,p)}r.lineNumber+e!==n&&(i=0),e+=o.lineCount-(s.range.endLineNumber-s.range.startLineNumber),o.lineCount===0?u.lineNumber!==r.lineNumber?i+=o.columnCount-(u.column-1):i+=o.columnCount-(u.column-r.column):i=o.columnCount,n=u.lineNumber+e}return new g(t.lineNumber+e,t.column+(t.lineNumber+e===n?i:0))}mapRange(t){function e(r){return r instanceof g?r:r.getStartPosition()}function n(r){return r instanceof g?r:r.getEndPosition()}const i=e(this.mapPosition(t.getStartPosition())),s=n(this.mapPosition(t.getEndPosition()));return b(i,s)}inverseMapPosition(t,e){return this.inverse(e).mapPosition(t)}inverseMapRange(t,e){return this.inverse(e).mapRange(t)}apply(t){let e="",n=new g(1,1);for(const s of this.edits){const r=s.range,u=r.getStartPosition(),o=r.getEndPosition(),c=b(n,u);c.isEmpty()||(e+=t.getValueOfRange(c)),e+=s.text,n=o}const i=b(n,t.endPositionExclusive);return i.isEmpty()||(e+=t.getValueOfRange(i)),e}applyToString(t){const e=new T(t);return this.apply(e)}inverse(t){const e=this.getNewRanges();return new l(this.edits.map((n,i)=>new m(e[i],t.getValueOfRange(n.range))))}getNewRanges(){const t=[];let e=0,n=0,i=0;for(const s of this.edits){const r=f.ofText(s.text),u=g.lift({lineNumber:s.range.startLineNumber+n,column:s.range.startColumn+(s.range.startLineNumber===e?i:0)}),o=r.createRange(u);t.push(o),n=o.endLineNumber-s.range.endLineNumber,i=o.endColumn-s.range.endColumn,e=s.range.endLineNumber}return t}}class m{constructor(t,e){this.range=t;this.text=e}get isEmpty(){return this.range.isEmpty()&&this.text.length===0}static equals(t,e){return t.range.equalsRange(e.range)&&t.text===e.text}toSingleEditOperation(){return{range:this.range,text:this.text}}toEdit(){return new l([this])}equals(t){return m.equals(this,t)}}function b(a,t){if(a.lineNumber===t.lineNumber&&a.column===Number.MAX_SAFE_INTEGER)return d.fromPositions(t,t);if(!a.isBeforeOrEqual(t))throw new P("start must be before end");return new d(a.lineNumber,a.column,t.lineNumber,t.column)}class h{get endPositionExclusive(){return this.length.addToPosition(new g(1,1))}getValue(){return this.getValueOfRange(this.length.toRange())}getLineLength(t){return this.getValueOfRange(new d(t,1,t,Number.MAX_SAFE_INTEGER)).length}}class N extends h{constructor(e,n){x(n>=1);super();this._getLineContent=e;this._lineCount=n}getValueOfRange(e){if(e.startLineNumber===e.endLineNumber)return this._getLineContent(e.startLineNumber).substring(e.startColumn-1,e.endColumn-1);let n=this._getLineContent(e.startLineNumber).substring(e.startColumn-1);for(let i=e.startLineNumber+1;i<e.endLineNumber;i++)n+=`
`+this._getLineContent(i);return n+=`
`+this._getLineContent(e.endLineNumber).substring(0,e.endColumn-1),n}getLineLength(e){return this._getLineContent(e).length}get length(){const e=this._getLineContent(this._lineCount);return new f(this._lineCount-1,e.length)}}class V extends N{constructor(t){super(e=>t[e-1],t.length)}}class T extends h{constructor(e){super();this.value=e}_t=new L(this.value);getValueOfRange(e){return this._t.getOffsetRange(e).substring(this.value)}get length(){return this._t.textLength}}export{h as AbstractText,V as ArrayText,N as LineBasedText,m as SingleTextEdit,T as StringText,l as TextEdit};
