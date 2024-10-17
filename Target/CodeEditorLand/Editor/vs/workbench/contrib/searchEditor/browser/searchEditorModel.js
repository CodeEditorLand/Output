import"../../../../base/common/uri.js";import"../../../../editor/common/model.js";import{IModelService as f}from"../../../../editor/common/services/model.js";import{ILanguageService as u}from"../../../../editor/common/languages/language.js";import{IInstantiationService as m}from"../../../../platform/instantiation/common/instantiation.js";import{parseSavedSearchEditor as v,parseSerializedSearchEditor as M}from"./searchEditorSerialization.js";import{IWorkingCopyBackupService as p}from"../../../services/workingCopy/common/workingCopyBackup.js";import{SearchEditorWorkingCopyTypeId as y}from"./constants.js";import{assertIsDefined as I}from"../../../../base/common/types.js";import{createTextBufferFactoryFromStream as E}from"../../../../editor/common/model/textModel.js";import{Emitter as k}from"../../../../base/common/event.js";import{ResourceMap as w}from"../../../../base/common/map.js";import{SEARCH_RESULT_LANGUAGE_ID as l}from"../../../services/search/common/search.js";class g{constructor(e){this.config=e}_onConfigDidUpdate=new k;onConfigDidUpdate=this._onConfigDidUpdate.event;updateConfig(e){this.config=e,this._onConfigDidUpdate.fire(e)}}class j{constructor(e){this.resource=e}async resolve(){return I(F.models.get(this.resource)).resolve()}}class C{models=new w;constructor(){}initializeModelFromExistingModel(e,t,i){if(this.models.has(t))throw Error("Unable to contruct model for resource that already exists");const s=e.get(u),n=e.get(f),a=e.get(m),c=e.get(p);let o;this.models.set(t,{resolve:()=>(o||(o=(async()=>{const r=await this.tryFetchModelFromBackupService(t,s,n,c,a);return r||Promise.resolve({resultsModel:n.getModel(t)??n.createModel("",s.createById(l),t),configurationModel:new g(i)})})()),o)})}initializeModelFromRawData(e,t,i,s){if(this.models.has(t))throw Error("Unable to contruct model for resource that already exists");const n=e.get(u),a=e.get(f),c=e.get(m),o=e.get(p);let r;this.models.set(t,{resolve:()=>(r||(r=(async()=>{const d=await this.tryFetchModelFromBackupService(t,n,a,o,c);return d||Promise.resolve({resultsModel:a.createModel(s??"",n.createById(l),t),configurationModel:new g(i)})})()),r)})}initializeModelFromExistingFile(e,t,i){if(this.models.has(t))throw Error("Unable to contruct model for resource that already exists");const s=e.get(u),n=e.get(f),a=e.get(m),c=e.get(p);let o;this.models.set(t,{resolve:async()=>(o||(o=(async()=>{const r=await this.tryFetchModelFromBackupService(t,s,n,c,a);if(r)return r;const{text:d,config:h}=await a.invokeFunction(v,i);return{resultsModel:n.createModel(d??"",s.createById(l),t),configurationModel:new g(h)}})()),o)})}async tryFetchModelFromBackupService(e,t,i,s,n){const a=await s.resolve({resource:e,typeId:y});let c=i.getModel(e);if(!c&&a){const o=await E(a.value);c=i.createModel(o,t.createById(l),e)}if(c){const o=c.getValue(),{text:r,config:d}=M(o);return i.destroyModel(e),{resultsModel:i.createModel(r??"",t.createById(l),e),configurationModel:new g(d)}}else return}}const F=new C;export{g as SearchConfigurationModel,j as SearchEditorModel,F as searchEditorModelFactory};
