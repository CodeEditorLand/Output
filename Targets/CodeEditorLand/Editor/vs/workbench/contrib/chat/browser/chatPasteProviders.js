var C=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var I=(i,e,r,t)=>{for(var a=t>1?void 0:t?S(e,r):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(a=(t?o(e,r,a):o(a))||a);return t&&a&&C(e,r,a),a},d=(i,e)=>(r,t)=>e(r,t,i);import"../../../../base/common/cancellation.js";import"../../../../base/common/dataTransfer.js";import{HierarchicalKind as v}from"../../../../base/common/hierarchicalKind.js";import"../../../../editor/common/core/range.js";import"../../../../editor/common/languages.js";import"../../../../editor/common/model.js";import{ILanguageFeaturesService as D}from"../../../../editor/common/services/languageFeatures.js";import{Disposable as A}from"../../../../base/common/lifecycle.js";import{ChatInputPart as b}from"./chatInputPart.js";import{IChatWidgetService as T}from"./chat.js";import{Codicon as P}from"../../../../base/common/codicons.js";import{localize as E}from"../../../../nls.js";import"../common/chatModel.js";import{IConfigurationService as M}from"../../../../platform/configuration/common/configuration.js";class R{constructor(e,r){this.chatWidgetService=e;this.configurationService=r}kind=new v("image");pasteMimeTypes=["image/*"];async provideDocumentPasteEdits(e,r,t,a,n){if(!this.configurationService.getValue("chat.experimental.imageAttachments"))return;const o=["image/png","image/jpeg","image/jpg","image/bmp","image/gif","image/tiff"];let g,m;for(const s of o)if(m=t.get(s),m){g=s;break}if(!m||!g)return;const p=await m.asFile()?.data();if(n.isCancellationRequested||!p)return;const c=this.chatWidgetService.getWidgetByInputUri(e.uri);if(!c)return;const h=c.attachmentModel.attachments,x=E("pastedImageName","Pasted Image");let l=x;for(let s=2;h.some(y=>y.name===l);s++)l=`${x} ${s}`;const f=await w(p,g,n,l);n.isCancellationRequested||!f||c.attachmentModel.getAttachmentIDs().has(f.id)||c.attachmentModel.addContext(f)}}async function w(i,e,r,t){const a=await V(i);if(!r.isCancellationRequested)return{value:i,id:a,name:t,isImage:!0,icon:P.fileMedia,isDynamic:!0,isFile:!1,mimeType:e}}async function V(i){const e=await crypto.subtle.digest("SHA-256",i);return Array.from(new Uint8Array(e)).map(t=>t.toString(16).padStart(2,"0")).join("")}function ae(i){return i.length<4?!1:Object.values({png:[137,80,78,71,13,10,26,10],jpeg:[255,216,255],bmp:[66,77],gif:[71,73,70,56],tiff:[73,73,42,0]}).some(r=>r.every((t,a)=>i[a]===t))}let u=class extends A{constructor(e,r,t){super(),this._register(e.documentPasteEditProvider.register({scheme:b.INPUT_SCHEME,pattern:"*",hasAccessToAllModels:!0},new R(r,t)))}};u=I([d(0,D),d(1,T),d(2,M)],u);export{u as ChatPasteProvidersFeature,R as PasteImageProvider,V as imageToHash,ae as isImage};
