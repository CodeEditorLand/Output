import{Emitter as p,Event as d}from"../../../base/common/event.js";import{Disposable as P}from"../../../base/common/lifecycle.js";import"../../../base/parts/ipc/common/ipc.js";import"../../../base/common/uri.js";import{reviveProfile as o}from"./userDataProfile.js";import"../../workspace/common/workspace.js";import{transformIncomingURIs as f,transformOutgoingURIs as a}from"../../../base/common/uriIpc.js";class A{constructor(n,i){this.service=n;this.getUriTransformer=i}listen(n,i){const r=this.getUriTransformer(n);switch(i){case"onDidChangeProfiles":return d.map(this.service.onDidChangeProfiles,s=>({all:s.all.map(e=>a({...e},r)),added:s.added.map(e=>a({...e},r)),removed:s.removed.map(e=>a({...e},r)),updated:s.updated.map(e=>a({...e},r))}))}throw new Error(`Invalid listen ${i}`)}async call(n,i,r){const s=this.getUriTransformer(n);switch(i){case"createProfile":{const e=await this.service.createProfile(r[0],r[1],r[2]);return a({...e},s)}case"updateProfile":{let e=o(f(r[0],s),this.service.profilesHome.scheme);return e=await this.service.updateProfile(e,r[1]),a({...e},s)}case"removeProfile":{const e=o(f(r[0],s),this.service.profilesHome.scheme);return this.service.removeProfile(e)}}throw new Error(`Invalid call ${i}`)}}class x extends P{constructor(i,r,s){super();this.profilesHome=r;this.channel=s;this._profiles=i.map(e=>o(e,this.profilesHome.scheme)),this._register(this.channel.listen("onDidChangeProfiles")(e=>{const l=e.added.map(t=>o(t,this.profilesHome.scheme)),h=e.removed.map(t=>o(t,this.profilesHome.scheme)),m=e.updated.map(t=>o(t,this.profilesHome.scheme));this._profiles=e.all.map(t=>o(t,this.profilesHome.scheme)),this._onDidChangeProfiles.fire({added:l,removed:h,updated:m,all:this.profiles})})),this.onDidResetWorkspaces=this.channel.listen("onDidResetWorkspaces")}_serviceBrand;get defaultProfile(){return this.profiles[0]}_profiles=[];get profiles(){return this._profiles}_onDidChangeProfiles=this._register(new p);onDidChangeProfiles=this._onDidChangeProfiles.event;onDidResetWorkspaces;async createNamedProfile(i,r,s){const e=await this.channel.call("createNamedProfile",[i,r,s]);return o(e,this.profilesHome.scheme)}async createProfile(i,r,s,e){const l=await this.channel.call("createProfile",[i,r,s,e]);return o(l,this.profilesHome.scheme)}async createTransientProfile(i){const r=await this.channel.call("createTransientProfile",[i]);return o(r,this.profilesHome.scheme)}async setProfileForWorkspace(i,r){await this.channel.call("setProfileForWorkspace",[i,r])}removeProfile(i){return this.channel.call("removeProfile",[i])}async updateProfile(i,r){const s=await this.channel.call("updateProfile",[i,r]);return o(s,this.profilesHome.scheme)}resetWorkspaces(){return this.channel.call("resetWorkspaces")}cleanUp(){return this.channel.call("cleanUp")}cleanUpTransientProfiles(){return this.channel.call("cleanUpTransientProfiles")}}export{A as RemoteUserDataProfilesServiceChannel,x as UserDataProfilesService};
