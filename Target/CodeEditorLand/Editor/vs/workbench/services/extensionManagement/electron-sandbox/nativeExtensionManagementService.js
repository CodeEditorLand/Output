var v=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=(l,t,e,i)=>{for(var r=i>1?void 0:i?d(t,e):t,o=l.length-1,n;o>=0;o--)(n=l[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&v(t,e,r),r},a=(l,t)=>(e,i)=>t(e,i,l);import"../../../../base/parts/ipc/common/ipc.js";import"../common/extensionManagement.js";import"../../../../base/common/uri.js";import"../../../../platform/extensionManagement/common/extensionManagement.js";import{IUriIdentityService as f}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{IUserDataProfileService as I}from"../../userDataProfile/common/userDataProfile.js";import{joinPath as p}from"../../../../base/common/resources.js";import{Schemas as h}from"../../../../base/common/network.js";import{ILogService as S}from"../../../../platform/log/common/log.js";import{IDownloadService as u}from"../../../../platform/download/common/download.js";import{IFileService as w}from"../../../../platform/files/common/files.js";import{generateUuid as y}from"../../../../base/common/uuid.js";import{ProfileAwareExtensionManagementChannelClient as E}from"../common/extensionManagementChannelClient.js";import{ExtensionIdentifier as P,ExtensionType as x,isResolverExtension as U}from"../../../../platform/extensions/common/extensions.js";import{INativeWorkbenchEnvironmentService as g}from"../../environment/electron-sandbox/environmentService.js";let s=class extends E{constructor(e,i,r,o,n,c,D){super(e,i,r);this.fileService=o;this.downloadService=n;this.nativeEnvironmentService=c;this.logService=D}filterEvent(e,i){return i||this.uriIdentityService.extUri.isEqual(this.userDataProfileService.currentProfile.extensionsResource,e)}async install(e,i){const{location:r,cleanup:o}=await this.downloadVsix(e);try{return await super.install(r,i)}finally{await o()}}async downloadVsix(e){if(e.scheme===h.file)return{location:e,async cleanup(){}};this.logService.trace("Downloading extension from",e.toString());const i=p(this.nativeEnvironmentService.extensionsDownloadLocation,y());return await this.downloadService.download(e,i),this.logService.info("Downloaded extension to",i.toString()),{location:i,cleanup:async()=>{try{await this.fileService.del(i)}catch(o){this.logService.error(o)}}}}async switchExtensionsProfile(e,i,r){if(this.nativeEnvironmentService.remoteAuthority){const n=(await this.getInstalled(x.User,e)).find(c=>U(c.manifest,this.nativeEnvironmentService.remoteAuthority));n&&(r||(r=[]),r.push(new P(n.identifier.id)))}return super.switchExtensionsProfile(e,i,r)}};s=m([a(1,I),a(2,f),a(3,w),a(4,u),a(5,g),a(6,S)],s);export{s as NativeExtensionManagementService};
