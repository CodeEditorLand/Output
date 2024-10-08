var E=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var S=(d,a,t,e)=>{for(var n=e>1?void 0:e?h(a,t):a,i=d.length-1,o;i>=0;i--)(o=d[i])&&(n=(e?o(a,t,n):o(n))||n);return e&&n&&E(a,t,n),n},I=(d,a)=>(t,e)=>a(t,e,d);import{createDecorator as x}from"../../instantiation/common/instantiation.js";import{Emitter as f}from"../../../base/common/event.js";import{Disposable as u,DisposableStore as v}from"../../../base/common/lifecycle.js";import{IStorageService as m,StorageScope as r,StorageTarget as y}from"../../storage/common/storage.js";import{adoptToGalleryExtensionId as p,areSameExtensions as L,getExtensionId as K}from"./extensionManagementUtil.js";import{IProductService as C}from"../../product/common/productService.js";import{distinct as F}from"../../../base/common/arrays.js";import{ILogService as O}from"../../log/common/log.js";import"../../extensions/common/extensions.js";import{isString as T}from"../../../base/common/types.js";import"../../../base/common/collections.js";import"./extensionManagement.js";const Y=x("IExtensionStorageService"),W=/^extensionKeys\/([^.]+\..+)@(\d+\.\d+\.\d+(-.*)?)$/;let s=class extends u{constructor(t,e,n){super();this.storageService=t;this.productService=e;this.logService=n;this.extensionsWithKeysForSync=s.readAllExtensionsWithKeysForSync(t),this._register(this.storageService.onDidChangeValue(r.PROFILE,void 0,this._register(new v))(i=>this.onDidChangeStorageValue(i)))}_serviceBrand;static LARGE_STATE_WARNING_THRESHOLD=512*1024;static toKey(t){return`extensionKeys/${p(t.id)}@${t.version}`}static fromKey(t){const e=W.exec(t);if(e&&e[1])return{id:e[1],version:e[2]}}static async removeOutdatedExtensionVersions(t,e){const n=await t.getInstalled(),i=[];for(const[o,g]of s.readAllExtensionsWithKeysForSync(e)){const l=n.find(c=>L(c.identifier,{id:o}))?.manifest.version;for(const c of g)l!==c&&i.push(s.toKey({id:o,version:c}))}for(const o of i)e.remove(o,r.PROFILE)}static readAllExtensionsWithKeysForSync(t){const e=new Map,n=t.keys(r.PROFILE,y.MACHINE);for(const i of n){const o=s.fromKey(i);if(o){let g=e.get(o.id.toLowerCase());g||e.set(o.id.toLowerCase(),g=[]),g.push(o.version)}}return e}_onDidChangeExtensionStorageToSync=this._register(new f);onDidChangeExtensionStorageToSync=this._onDidChangeExtensionStorageToSync.event;extensionsWithKeysForSync;onDidChangeStorageValue(t){if(this.extensionsWithKeysForSync.has(t.key.toLowerCase())){this._onDidChangeExtensionStorageToSync.fire();return}const e=s.fromKey(t.key);if(e){if(this.storageService.get(t.key,r.PROFILE)===void 0)this.extensionsWithKeysForSync.delete(e.id.toLowerCase());else{let n=this.extensionsWithKeysForSync.get(e.id.toLowerCase());n||this.extensionsWithKeysForSync.set(e.id.toLowerCase(),n=[]),n.push(e.version),this._onDidChangeExtensionStorageToSync.fire()}return}}getExtensionId(t){if(T(t))return t;const e=t.manifest?t.manifest.publisher:t.publisher,n=t.manifest?t.manifest.name:t.name;return K(e,n)}getExtensionState(t,e){const n=this.getExtensionId(t),i=this.getExtensionStateRaw(t,e);if(i)try{return JSON.parse(i)}catch(o){this.logService.error(`[mainThreadStorage] unexpected error parsing storage contents (extensionId: ${n}, global: ${e}): ${o}`)}}getExtensionStateRaw(t,e){const n=this.getExtensionId(t),i=this.storageService.get(n,e?r.PROFILE:r.WORKSPACE);return i&&i?.length>s.LARGE_STATE_WARNING_THRESHOLD&&this.logService.warn(`[mainThreadStorage] large extension state detected (extensionId: ${n}, global: ${e}): ${i.length/1024}kb. Consider to use 'storageUri' or 'globalStorageUri' to store this data on disk instead.`),i}setExtensionState(t,e,n){const i=this.getExtensionId(t);e===void 0?this.storageService.remove(i,n?r.PROFILE:r.WORKSPACE):this.storageService.store(i,JSON.stringify(e),n?r.PROFILE:r.WORKSPACE,y.MACHINE)}setKeysForSync(t,e){this.storageService.store(s.toKey(t),JSON.stringify(e),r.PROFILE,y.MACHINE)}getKeysForSync(t){const e=this.productService.extensionSyncedKeys?.[t.id.toLowerCase()],n=this.storageService.get(s.toKey(t),r.PROFILE),i=n?JSON.parse(n):void 0;return i&&e?F([...i,...e]):i||e}addToMigrationList(t,e){if(t!==e){const n=this.migrationList.filter(i=>!i.includes(t)&&!i.includes(e));n.push([t,e]),this.migrationList=n}}getSourceExtensionToMigrate(t){const e=this.migrationList.find(([,n])=>t===n);return e?e[0]:void 0}get migrationList(){const t=this.storageService.get("extensionStorage.migrationList",r.APPLICATION,"[]");try{const e=JSON.parse(t);if(Array.isArray(e))return e}catch{}return[]}set migrationList(t){t.length?this.storageService.store("extensionStorage.migrationList",JSON.stringify(t),r.APPLICATION,y.MACHINE):this.storageService.remove("extensionStorage.migrationList",r.APPLICATION)}};s=S([I(0,m),I(1,C),I(2,O)],s);export{s as ExtensionStorageService,Y as IExtensionStorageService};
