import a from"assert";import{VSBuffer as I}from"../../../../base/common/buffer.js";import"../../../../base/common/collections.js";import{dirname as U,joinPath as u}from"../../../../base/common/resources.js";import"../../../../base/common/uri.js";import{ensureNoDisposablesAreLeakedInTestSuite as $}from"../../../../base/test/common/utils.js";import{IEnvironmentService as v}from"../../../environment/common/environment.js";import{IFileService as D}from"../../../files/common/files.js";import{IUserDataProfilesService as q}from"../../../userDataProfile/common/userDataProfile.js";import"../../common/snippetsSync.js";import{IUserDataSyncStoreService as C,PREVIEW_DIR_NAME as d,SyncResource as k,SyncStatus as w}from"../../common/userDataSync.js";import{UserDataSyncClient as H,UserDataSyncTestServer as T}from"./userDataSyncClient.js";const l=`{

	// Place your snippets for TypeScript here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, Placeholders with the
	// same ids are connected.
	"Print to console": {
	// Example:
	"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
			"description": "Log output to console",
	}

}`,g=`{

	// Place your snippets for TypeScript here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, Placeholders with the
	// same ids are connected.
	"Print to console": {
	// Example:
	"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
			"description": "Log output to console always",
	}

}`,r=`{
/*
	// Place your snippets for HTML here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted.
	// Example:
	"Print to console": {
	"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
			"description": "Log output to console"
	}
*/
"Div": {
	"prefix": "div",
		"body": [
			"<div>",
			"",
			"</div>"
		],
			"description": "New div"
	}
}`,p=`{
/*
	// Place your snippets for HTML here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted.
	// Example:
	"Print to console": {
	"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
			"description": "Log output to console"
	}
*/
"Div": {
	"prefix": "div",
		"body": [
			"<div>",
			"",
			"</div>"
		],
			"description": "New div changed"
	}
}`,M=`{
/*
	// Place your snippets for HTML here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted.
	// Example:
	"Print to console": {
	"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
			"description": "Log output to console"
	}
*/
"Div": {
	"prefix": "div",
		"body": [
			"<div>",
			"",
			"</div>"
		],
			"description": "New div changed again"
	}
}`,R=`{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and {1: label}, { 2: another } for placeholders.
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
}`;suite("SnippetsSync",()=>{const S=new T;let e,c,t;teardown(async()=>{await e.instantiationService.get(C).clear()});const b=$();setup(async()=>{e=b.add(new H(S)),await e.setUp(!0),t=e.getSynchronizer(k.Snippets),c=b.add(new H(S)),await c.setUp(!0)}),test("when snippets does not exist",async()=>{const s=e.instantiationService.get(D),i=e.instantiationService.get(q).defaultProfile.snippetsHome;a.deepStrictEqual(await t.getLastSyncUserData(),null);let o=await e.getResourceManifest();S.reset(),await t.sync(o),a.deepStrictEqual(S.requests,[{type:"GET",url:`${S.url}/v1/resource/${t.resource}/latest`,headers:{}}]),a.ok(!await s.exists(i));const y=await t.getLastSyncUserData(),h=await t.getRemoteUserData(null);a.deepStrictEqual(y.ref,h.ref),a.deepStrictEqual(y.syncData,h.syncData),a.strictEqual(y.syncData,null),o=await e.getResourceManifest(),S.reset(),await t.sync(o),a.deepStrictEqual(S.requests,[]),o=await e.getResourceManifest(),S.reset(),await t.sync(o),a.deepStrictEqual(S.requests,[])}),test("when snippet is created after first sync",async()=>{await t.sync(await e.getResourceManifest()),await n("html.json",r,e);let s=await t.getLastSyncUserData();const i=await e.getResourceManifest();S.reset(),await t.sync(i),a.deepStrictEqual(S.requests,[{type:"POST",url:`${S.url}/v1/resource/${t.resource}`,headers:{"If-Match":s?.ref}}]),s=await t.getLastSyncUserData();const o=await t.getRemoteUserData(null);a.deepStrictEqual(s.ref,o.ref),a.deepStrictEqual(s.syncData,o.syncData),a.deepStrictEqual(s.syncData.content,JSON.stringify({"html.json":r}))}),test("first time sync - outgoing to server (no snippets)",async()=>{await n("html.json",r,e),await n("typescript.json",l,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const{content:s}=await e.read(t.resource);a.ok(s!==null);const i=j(s);a.deepStrictEqual(i,{"html.json":r,"typescript.json":l})}),test("first time sync - incoming from server (no snippets)",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,r);const i=await f("typescript.json",e);a.strictEqual(i,l)}),test("first time sync when snippets exists",async()=>{await n("html.json",r,c),await c.sync(),await n("typescript.json",l,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,r);const i=await f("typescript.json",e);a.strictEqual(i,l);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"html.json":r,"typescript.json":l})}),test("first time sync when snippets exists - has conflicts",async()=>{await n("html.json",r,c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.HasConflicts);const s=e.instantiationService.get(v),i=u(s.userDataSyncHome,t.resource,d,"html.json");m(t.conflicts.conflicts,[i])}),test("first time sync when snippets exists - has conflicts and accept conflicts",async()=>{await n("html.json",r,c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest());const s=t.conflicts.conflicts;await t.accept(s[0].previewResource,r),await t.apply(!1),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const i=await f("html.json",e);a.strictEqual(i,r);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"html.json":r})}),test("first time sync when snippets exists - has multiple conflicts",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.HasConflicts);const s=e.instantiationService.get(v),i=u(s.userDataSyncHome,t.resource,d,"html.json"),o=u(s.userDataSyncHome,t.resource,d,"typescript.json");m(t.conflicts.conflicts,[i,o])}),test("first time sync when snippets exists - has multiple conflicts and accept one conflict",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e),await t.sync(await e.getResourceManifest());let s=t.conflicts.conflicts;await t.accept(s[0].previewResource,p),s=t.conflicts.conflicts,a.strictEqual(t.status,w.HasConflicts);const i=e.instantiationService.get(v),o=u(i.userDataSyncHome,t.resource,d,"typescript.json");m(t.conflicts.conflicts,[o])}),test("first time sync when snippets exists - has multiple conflicts and accept all conflicts",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e),await t.sync(await e.getResourceManifest());const s=t.conflicts.conflicts;await t.accept(s[0].previewResource,p),await t.accept(s[1].previewResource,l),await t.apply(!1),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const i=await f("html.json",e);a.strictEqual(i,p);const o=await f("typescript.json",e);a.strictEqual(o,l);const{content:y}=await e.read(t.resource);a.ok(y!==null);const h=j(y);a.deepStrictEqual(h,{"html.json":p,"typescript.json":l})}),test("sync adding a snippet",async()=>{await n("html.json",r,e),await t.sync(await e.getResourceManifest()),await n("typescript.json",l,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,r);const i=await f("typescript.json",e);a.strictEqual(i,l);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"html.json":r,"typescript.json":l})}),test("sync adding a snippet - accept",async()=>{await n("html.json",r,c),await c.sync(),await t.sync(await e.getResourceManifest()),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,r);const i=await f("typescript.json",e);a.strictEqual(i,l)}),test("sync updating a snippet",async()=>{await n("html.json",r,e),await t.sync(await e.getResourceManifest()),await n("html.json",p,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,p);const{content:i}=await e.read(t.resource);a.ok(i!==null);const o=j(i);a.deepStrictEqual(o,{"html.json":p})}),test("sync updating a snippet - accept",async()=>{await n("html.json",r,c),await c.sync(),await t.sync(await e.getResourceManifest()),await n("html.json",p,c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,p)}),test("sync updating a snippet - conflict",async()=>{await n("html.json",r,c),await c.sync(),await t.sync(await e.getResourceManifest()),await n("html.json",p,c),await c.sync(),await n("html.json",M,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.HasConflicts);const s=e.instantiationService.get(v),i=u(s.userDataSyncHome,t.resource,d,"html.json");m(t.conflicts.conflicts,[i])}),test("sync updating a snippet - resolve conflict",async()=>{await n("html.json",r,c),await c.sync(),await t.sync(await e.getResourceManifest()),await n("html.json",p,c),await c.sync(),await n("html.json",M,e),await t.sync(await e.getResourceManifest()),await t.accept(t.conflicts.conflicts[0].previewResource,p),await t.apply(!1),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,p);const{content:i}=await e.read(t.resource);a.ok(i!==null);const o=j(i);a.deepStrictEqual(o,{"html.json":p})}),test("sync removing a snippet",async()=>{await n("html.json",r,e),await n("typescript.json",l,e),await t.sync(await e.getResourceManifest()),await E("html.json",e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("html.json",e);a.strictEqual(i,null);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"typescript.json":l})}),test("sync removing a snippet - accept",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),await E("html.json",c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("html.json",e);a.strictEqual(i,null)}),test("sync removing a snippet locally and updating it remotely",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),await n("html.json",p,c),await c.sync(),await E("html.json",e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("html.json",e);a.strictEqual(i,p)}),test("sync removing a snippet - conflict",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),await E("html.json",c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.HasConflicts);const s=e.instantiationService.get(v),i=u(s.userDataSyncHome,t.resource,d,"html.json");m(t.conflicts.conflicts,[i])}),test("sync removing a snippet - resolve conflict",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),await E("html.json",c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest()),await t.accept(t.conflicts.conflicts[0].previewResource,M),await t.apply(!1),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("html.json",e);a.strictEqual(i,M);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"typescript.json":l,"html.json":M})}),test("sync removing a snippet - resolve conflict by removing",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),await E("html.json",c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest()),await t.accept(t.conflicts.conflicts[0].previewResource,null),await t.apply(!1),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("html.json",e);a.strictEqual(i,null);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"typescript.json":l})}),test("sync global and language snippet",async()=>{await n("global.code-snippets",R,c),await n("html.json",r,c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("html.json",e);a.strictEqual(s,r);const i=await f("global.code-snippets",e);a.strictEqual(i,R);const{content:o}=await e.read(t.resource);a.ok(o!==null);const y=j(o);a.deepStrictEqual(y,{"html.json":r,"global.code-snippets":R})}),test("sync should ignore non snippets",async()=>{await n("global.code-snippets",R,c),await n("html.html",r,c),await n("typescript.json",l,c),await c.sync(),await t.sync(await e.getResourceManifest()),a.strictEqual(t.status,w.Idle),a.deepStrictEqual(t.conflicts.conflicts,[]);const s=await f("typescript.json",e);a.strictEqual(s,l);const i=await f("global.code-snippets",e);a.strictEqual(i,R);const o=await f("html.html",e);a.strictEqual(o,null);const{content:y}=await e.read(t.resource);a.ok(y!==null);const h=j(y);a.deepStrictEqual(h,{"typescript.json":l,"global.code-snippets":R})}),test("previews are reset after all conflicts resolved",async()=>{await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await t.sync(await e.getResourceManifest());const s=t.conflicts.conflicts;await t.accept(s[0].previewResource,p),await t.apply(!1);const i=e.instantiationService.get(D);a.ok(!await i.exists(U(s[0].previewResource)))}),test("merge when there are multiple snippets and all snippets are merged",async()=>{const s=e.instantiationService.get(v);await n("html.json",p,e),await n("typescript.json",g,e);const i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.Syncing),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("merge when there are multiple snippets and all snippets are merged and applied",async()=>{await n("html.json",p,e),await n("typescript.json",g,e);let s=await t.sync(await e.getResourceManifest(),!0);s=await t.apply(!1),a.strictEqual(t.status,w.Idle),a.strictEqual(s,null),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("merge when there are multiple snippets and one snippet has no changes and one snippet is merged",async()=>{const s=e.instantiationService.get(v);await n("html.json",r,c),await c.sync(),await n("html.json",r,e),await n("typescript.json",g,e);const i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.Syncing),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"typescript.json"),u(s.userDataSyncHome,t.resource,d,"html.json")]),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("merge when there are multiple snippets and one snippet has no changes and snippets is merged and applied",async()=>{await n("html.json",r,c),await c.sync(),await n("html.json",r,e),await n("typescript.json",g,e);let s=await t.sync(await e.getResourceManifest(),!0);s=await t.apply(!1),a.strictEqual(t.status,w.Idle),a.strictEqual(s,null),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("merge when there are multiple snippets with conflicts and all snippets are merged",async()=>{const s=e.instantiationService.get(v);await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e);const i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.HasConflicts),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),m(t.conflicts.conflicts,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")])}),test("accept when there are multiple snippets with conflicts and only one snippet is accepted",async()=>{const s=e.instantiationService.get(v);await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e);let i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.HasConflicts),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),m(t.conflicts.conflicts,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),i=await t.accept(i.resourcePreviews[0].previewResource,p),a.strictEqual(t.status,w.HasConflicts),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),m(t.conflicts.conflicts,[u(s.userDataSyncHome,t.resource,d,"typescript.json")])}),test("accept when there are multiple snippets with conflicts and all snippets are accepted",async()=>{const s=e.instantiationService.get(v);await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e);let i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.HasConflicts),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),m(t.conflicts.conflicts,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),i=await t.accept(i.resourcePreviews[0].previewResource,p),i=await t.accept(i.resourcePreviews[1].previewResource,g),a.strictEqual(t.status,w.Syncing),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("accept when there are multiple snippets with conflicts and all snippets are accepted and applied",async()=>{const s=e.instantiationService.get(v);await n("html.json",r,c),await n("typescript.json",l,c),await c.sync(),await n("html.json",p,e),await n("typescript.json",g,e);let i=await t.sync(await e.getResourceManifest(),!0);a.strictEqual(t.status,w.HasConflicts),m(i.resourcePreviews,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),m(t.conflicts.conflicts,[u(s.userDataSyncHome,t.resource,d,"html.json"),u(s.userDataSyncHome,t.resource,d,"typescript.json")]),i=await t.accept(i.resourcePreviews[0].previewResource,p),i=await t.accept(i.resourcePreviews[1].previewResource,g),i=await t.apply(!1),a.strictEqual(t.status,w.Idle),a.strictEqual(i,null),a.deepStrictEqual(t.conflicts.conflicts,[])}),test("sync profile snippets",async()=>{const s=b.add(new H(S));await s.setUp(!0);const i=await s.instantiationService.get(q).createNamedProfile("profile1");await n("html.json",r,s,i),await s.sync(),await e.sync();const o=e.instantiationService.get(q).profiles.find(h=>h.id===i.id),y=await f("html.json",e,o);a.strictEqual(y,r)});function j(s){const i=JSON.parse(s);return JSON.parse(i.content)}async function n(s,i,o,y){const h=o.instantiationService.get(D),P=o.instantiationService.get(q),x=u((y??P.defaultProfile).snippetsHome,s);await h.writeFile(x,I.fromString(i))}async function E(s,i){const o=i.instantiationService.get(D),y=i.instantiationService.get(q),h=u(y.defaultProfile.snippetsHome,s);await o.del(h)}async function f(s,i,o){const y=i.instantiationService.get(D),h=i.instantiationService.get(q),P=u((o??h.defaultProfile).snippetsHome,s);return await y.exists(P)?(await y.readFile(P)).value.toString():null}function m(s,i){a.deepStrictEqual(s.map(({previewResource:o})=>o.toString()),i.map(o=>o.toString()))}});
