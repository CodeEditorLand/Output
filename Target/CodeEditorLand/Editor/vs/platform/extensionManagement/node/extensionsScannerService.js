var S=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var s=(m,e,I,t)=>{for(var i=t>1?void 0:t?p(e,I):e,o=m.length-1,n;o>=0;o--)(n=m[o])&&(i=(t?n(e,I,i):n(i))||i);return t&&i&&S(e,I,i),i},r=(m,e)=>(I,t)=>e(I,t,m);import{URI as f}from"../../../base/common/uri.js";import{INativeEnvironmentService as l}from"../../environment/common/environment.js";import{IExtensionsProfileScannerService as P}from"../common/extensionsProfileScannerService.js";import{NativeExtensionsScannerService as d}from"../common/extensionsScannerService.js";import{IFileService as u}from"../../files/common/files.js";import{IInstantiationService as x}from"../../instantiation/common/instantiation.js";import{ILogService as E}from"../../log/common/log.js";import{IProductService as U}from"../../product/common/productService.js";import{IUriIdentityService as N}from"../../uriIdentity/common/uriIdentity.js";import{IUserDataProfilesService as g}from"../../userDataProfile/common/userDataProfile.js";let c=class extends d{constructor(e,I,t,i,o,n,a,v){super(f.file(o.builtinExtensionsPath),f.file(o.extensionsPath),o.userHome,e.defaultProfile,e,I,t,i,o,n,a,v)}};c=s([r(0,g),r(1,P),r(2,u),r(3,E),r(4,l),r(5,U),r(6,N),r(7,x)],c);export{c as ExtensionsScannerService};
