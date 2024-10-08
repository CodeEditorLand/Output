import"./iconlabel.css";import*as n from"../../dom.js";import*as b from"../../cssValue.js";import{HighlightedLabel as c}from"../highlightedlabel/highlightedLabel.js";import"../hover/hoverDelegate.js";import"../../../common/filters.js";import{Disposable as u}from"../../../common/lifecycle.js";import{equals as p}from"../../../common/objects.js";import{Range as f}from"../../../common/range.js";import{getDefaultHoverDelegate as v}from"../hover/hoverDelegateFactory.js";import{getBaseLayerHoverDelegate as L}from"../hover/hoverDelegate2.js";import{isString as I}from"../../../common/types.js";import{stripIcons as N}from"../../../common/iconLabels.js";import"../../../common/uri.js";class h{constructor(t){this._element=t}disposed;_textContent;_classNames;_empty;get element(){return this._element}set textContent(t){this.disposed||t===this._textContent||(this._textContent=t,this._element.textContent=t)}set classNames(t){this.disposed||p(t,this._classNames)||(this._classNames=t,this._element.classList.value="",this._element.classList.add(...t))}set empty(t){this.disposed||t===this._empty||(this._empty=t,this._element.style.marginLeft=t?"0":"")}dispose(){this.disposed=!0}}class q extends u{creationOptions;domNode;nameContainer;nameNode;descriptionNode;suffixNode;labelContainer;hoverDelegate;customHovers=new Map;constructor(t,i){super(),this.creationOptions=i,this.domNode=this._register(new h(n.append(t,n.$(".monaco-icon-label")))),this.labelContainer=n.append(this.domNode.element,n.$(".monaco-icon-label-container")),this.nameContainer=n.append(this.labelContainer,n.$("span.monaco-icon-name-container")),i?.supportHighlights||i?.supportIcons?this.nameNode=this._register(new x(this.nameContainer,!!i.supportIcons)):this.nameNode=new H(this.nameContainer),this.hoverDelegate=i?.hoverDelegate??v("mouse")}get element(){return this.domNode.element}setLabel(t,i,e){const o=["monaco-icon-label"],l=["monaco-icon-label-container"];let a="";e&&(e.extraClasses&&o.push(...e.extraClasses),e.italic&&o.push("italic"),e.strikethrough&&o.push("strikethrough"),e.disabledCommand&&l.push("disabled"),e.title&&(typeof e.title=="string"?a+=e.title:a+=t));const r=this.domNode.element.querySelector(".monaco-icon-label-iconpath");if(e?.iconPath){let s;!r||!n.isHTMLElement(r)?(s=n.$(".monaco-icon-label-iconpath"),this.domNode.element.prepend(s)):s=r,s.style.backgroundImage=b.asCSSUrl(e?.iconPath)}else r&&r.remove();if(this.domNode.classNames=o,this.domNode.element.setAttribute("aria-label",a),this.labelContainer.classList.value="",this.labelContainer.classList.add(...l),this.setupHover(e?.descriptionTitle?this.labelContainer:this.element,e?.title),this.nameNode.setLabel(t,e),i||this.descriptionNode){const s=this.getOrCreateDescriptionNode();s instanceof c?(s.set(i||"",e?e.descriptionMatches:void 0,void 0,e?.labelEscapeNewLines),this.setupHover(s.element,e?.descriptionTitle)):(s.textContent=i&&e?.labelEscapeNewLines?c.escapeNewLines(i,[]):i||"",this.setupHover(s.element,e?.descriptionTitle||""),s.empty=!i)}if(e?.suffix||this.suffixNode){const s=this.getOrCreateSuffixNode();s.textContent=e?.suffix??""}}setupHover(t,i){const e=this.customHovers.get(t);if(e&&(e.dispose(),this.customHovers.delete(t)),!i){t.removeAttribute("title");return}let o=t;if(this.creationOptions?.hoverTargetOverrride){if(!n.isAncestor(t,this.creationOptions.hoverTargetOverrride))throw new Error("hoverTargetOverrride must be an ancestor of the htmlElement");o=this.creationOptions.hoverTargetOverrride}if(this.hoverDelegate.showNativeHover){let a=function(r,s){I(s)?r.title=N(s):s?.markdownNotSupportedFallback?r.title=s.markdownNotSupportedFallback:r.removeAttribute("title")};var l=a;a(o,i)}else{const a=L().setupManagedHover(this.hoverDelegate,o,i);a&&this.customHovers.set(t,a)}}dispose(){super.dispose();for(const t of this.customHovers.values())t.dispose();this.customHovers.clear()}getOrCreateSuffixNode(){if(!this.suffixNode){const t=this._register(new h(n.after(this.nameContainer,n.$("span.monaco-icon-suffix-container"))));this.suffixNode=this._register(new h(n.append(t.element,n.$("span.label-suffix"))))}return this.suffixNode}getOrCreateDescriptionNode(){if(!this.descriptionNode){const t=this._register(new h(n.append(this.labelContainer,n.$("span.monaco-icon-description-container"))));this.creationOptions?.supportDescriptionHighlights?this.descriptionNode=this._register(new c(n.append(t.element,n.$("span.label-description")),{supportIcons:!!this.creationOptions.supportIcons})):this.descriptionNode=this._register(new h(n.append(t.element,n.$("span.label-description"))))}return this.descriptionNode}}class H{constructor(t){this.container=t}label=void 0;singleLabel=void 0;options;setLabel(t,i){if(!(this.label===t&&p(this.options,i)))if(this.label=t,this.options=i,typeof t=="string")this.singleLabel||(this.container.innerText="",this.container.classList.remove("multiple"),this.singleLabel=n.append(this.container,n.$("a.label-name",{id:i?.domId}))),this.singleLabel.textContent=t;else{this.container.innerText="",this.container.classList.add("multiple"),this.singleLabel=void 0;for(let e=0;e<t.length;e++){const o=t[e],l=i?.domId&&`${i?.domId}_${e}`;n.append(this.container,n.$("a.label-name",{id:l,"data-icon-label-count":t.length,"data-icon-label-index":e,role:"treeitem"},o)),e<t.length-1&&n.append(this.container,n.$("span.label-separator",void 0,i?.separator||"/"))}}}}function C(d,t,i){if(!i)return;let e=0;return d.map(o=>{const l={start:e,end:e+o.length},a=i.map(r=>f.intersect(l,r)).filter(r=>!f.isEmpty(r)).map(({start:r,end:s})=>({start:r-e,end:s-e}));return e=l.end+t.length,a})}class x extends u{constructor(i,e){super();this.container=i;this.supportIcons=e}label=void 0;singleLabel=void 0;options;setLabel(i,e){if(!(this.label===i&&p(this.options,e)))if(this.label=i,this.options=e,typeof i=="string")this.singleLabel||(this.container.innerText="",this.container.classList.remove("multiple"),this.singleLabel=this._register(new c(n.append(this.container,n.$("a.label-name",{id:e?.domId})),{supportIcons:this.supportIcons}))),this.singleLabel.set(i,e?.matches,void 0,e?.labelEscapeNewLines);else{this.container.innerText="",this.container.classList.add("multiple"),this.singleLabel=void 0;const o=e?.separator||"/",l=C(i,o,e?.matches);for(let a=0;a<i.length;a++){const r=i[a],s=l?l[a]:void 0,g=e?.domId&&`${e?.domId}_${a}`,m=n.$("a.label-name",{id:g,"data-icon-label-count":i.length,"data-icon-label-index":a,role:"treeitem"});this._register(new c(n.append(this.container,m),{supportIcons:this.supportIcons})).set(r,s,void 0,e?.labelEscapeNewLines),a<i.length-1&&n.append(m,n.$("span.label-separator",void 0,o))}}}}export{q as IconLabel};
