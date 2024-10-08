import{parse as x}from"../../../base/common/glob.js";import{Mimes as g}from"../../../base/common/mime.js";import{Schemas as m}from"../../../base/common/network.js";import{basename as w,posix as h}from"../../../base/common/path.js";import{DataUri as c}from"../../../base/common/resources.js";import{startsWithUTF8BOM as y}from"../../../base/common/strings.js";import"../../../base/common/uri.js";import{PLAINTEXT_LANGUAGE_ID as l}from"../languages/modesRegistry.js";let s=[],u=[],d=[];function _(e,i=!1){p(e,!1,i)}function B(e){p(e,!0,!1)}function p(e,i,t){const n=C(e,i);s.push(n),n.userConfigured?d.push(n):u.push(n),t&&!n.userConfigured&&s.forEach(o=>{o.mime===n.mime||o.userConfigured||(n.extension&&(o.extension,n.extension),n.filename&&(o.filename,n.filename),n.filepattern&&(o.filepattern,n.filepattern),n.firstline&&(o.firstline,n.firstline))})}function C(e,i){return{id:e.id,mime:e.mime,filename:e.filename,extension:e.extension,filepattern:e.filepattern,firstline:e.firstline,userConfigured:i,filenameLowercase:e.filename?e.filename.toLowerCase():void 0,extensionLowercase:e.extension?e.extension.toLowerCase():void 0,filepatternLowercase:e.filepattern?x(e.filepattern.toLowerCase()):void 0,filepatternOnPath:e.filepattern?e.filepattern.indexOf(h.sep)>=0:!1}}function D(){s=s.filter(e=>e.userConfigured),u=[]}function N(){s=s.filter(e=>!e.userConfigured),d=[]}function F(e,i){return I(e,i).map(t=>t.mime)}function G(e,i){return I(e,i).map(t=>t.id)}function I(e,i){let t;if(e)switch(e.scheme){case m.file:t=e.fsPath;break;case m.data:{t=c.parseMetaData(e).get(c.META_DATA_LABEL);break}case m.vscodeNotebookCell:t=void 0;break;default:t=e.path}if(!t)return[{id:"unknown",mime:g.unknown}];t=t.toLowerCase();const n=w(t),o=L(t,n,d);if(o)return[o,{id:l,mime:g.text}];const r=L(t,n,u);if(r)return[r,{id:l,mime:g.text}];if(i){const f=b(i);if(f)return[f,{id:l,mime:g.text}]}return[{id:"unknown",mime:g.unknown}]}function L(e,i,t){let n,o,r;for(let f=t.length-1;f>=0;f--){const a=t[f];if(i===a.filenameLowercase){n=a;break}if(a.filepattern&&(!o||a.filepattern.length>o.filepattern.length)){const A=a.filepatternOnPath?e:i;a.filepatternLowercase?.(A)&&(o=a)}a.extension&&(!r||a.extension.length>r.extension.length)&&i.endsWith(a.extensionLowercase)&&(r=a)}if(n)return n;if(o)return o;if(r)return r}function b(e){if(y(e)&&(e=e.substr(1)),e.length>0)for(let i=s.length-1;i>=0;i--){const t=s[i];if(!t.firstline)continue;const n=e.match(t.firstline);if(n&&n.length>0)return t}}export{N as clearConfiguredLanguageAssociations,D as clearPlatformLanguageAssociations,G as getLanguageIds,F as getMimeTypes,B as registerConfiguredLanguageAssociation,_ as registerPlatformLanguageAssociation};
