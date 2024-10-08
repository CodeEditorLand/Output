import{Disposable as d}from"../../../../base/common/lifecycle.js";import"../../../../base/common/uri.js";import{TMScopeRegistry as l}from"./TMScopeRegistry.js";const c="No TM Grammar registered for this language.";class I extends d{_host;_initialState;_scopeRegistry;_injections;_injectedEmbeddedLanguages;_languageToScope;_grammarRegistry;constructor(s,o,i,n){super(),this._host=s,this._initialState=i.INITIAL,this._scopeRegistry=new l,this._injections={},this._injectedEmbeddedLanguages={},this._languageToScope=new Map,this._grammarRegistry=this._register(new i.Registry({onigLib:n,loadGrammar:async e=>{const r=this._scopeRegistry.getGrammarDefinition(e);if(!r)return this._host.logTrace(`No grammar found for scope ${e}`),null;const t=r.location;try{const a=await this._host.readFile(t);return i.parseRawGrammar(a,t.path)}catch(a){return this._host.logError(`Unable to load and parse grammar for scope ${e} from ${t}`,a),null}},getInjections:e=>{const r=e.split(".");let t=[];for(let a=1;a<=r.length;a++){const g=r.slice(0,a).join(".");t=[...t,...this._injections[g]||[]]}return t}}));for(const e of o){if(this._scopeRegistry.register(e),e.injectTo){for(const r of e.injectTo){let t=this._injections[r];t||(this._injections[r]=t=[]),t.push(e.scopeName)}if(e.embeddedLanguages)for(const r of e.injectTo){let t=this._injectedEmbeddedLanguages[r];t||(this._injectedEmbeddedLanguages[r]=t=[]),t.push(e.embeddedLanguages)}}e.language&&this._languageToScope.set(e.language,e.scopeName)}}has(s){return this._languageToScope.has(s)}setTheme(s,o){this._grammarRegistry.setTheme(s,o)}getColorMap(){return this._grammarRegistry.getColorMap()}async createGrammar(s,o){const i=this._languageToScope.get(s);if(typeof i!="string")throw new Error(c);const n=this._scopeRegistry.getGrammarDefinition(i);if(!n)throw new Error(c);const e=n.embeddedLanguages;if(this._injectedEmbeddedLanguages[i]){const a=this._injectedEmbeddedLanguages[i];for(const g of a)for(const m of Object.keys(g))e[m]=g[m]}const r=Object.keys(e).length>0;let t;try{t=await this._grammarRegistry.loadGrammarWithConfiguration(i,o,{embeddedLanguages:e,tokenTypes:n.tokenTypes,balancedBracketSelectors:n.balancedBracketSelectors,unbalancedBracketSelectors:n.unbalancedBracketSelectors})}catch(a){throw a.message&&a.message.startsWith("No grammar provided for")?new Error(c):a}return{languageId:s,grammar:t,initialState:this._initialState,containsEmbeddedLanguages:r,sourceExtensionId:n.sourceExtensionId}}}export{I as TMGrammarFactory,c as missingTMGrammarErrorMessage};
