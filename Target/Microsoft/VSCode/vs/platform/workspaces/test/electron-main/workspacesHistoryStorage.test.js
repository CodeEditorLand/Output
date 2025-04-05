import i from"assert";import{tmpdir as u}from"os";import{join as k}from"../../../../base/common/path.js";import{URI as s}from"../../../../base/common/uri.js";import{ensureNoDisposablesAreLeakedInTestSuite as S}from"../../../../base/test/common/utils.js";import{NullLogService as U}from"../../../log/common/log.js";import"../../../workspace/common/workspace.js";import{isRecentFolder as q,restoreRecentlyOpened as I,toStoreData as R}from"../../common/workspaces.js";suite("History Storage",()=>{function f(e){return{id:"1234",configPath:e}}function a(e,t,r){i.strictEqual(e&&e.toString(),t&&t.toString(),r)}function g(e,t,r){if(!e||!t){i.strictEqual(e,t,r);return}i.strictEqual(e.id,t.id,r),a(e.configPath,t.configPath,r)}function m(e,t,r){i.strictEqual(e.files.length,t.files.length,r);for(let o=0;o<e.files.length;o++)a(e.files[o].fileUri,t.files[o].fileUri,r),i.strictEqual(e.files[o].label,t.files[o].label),i.strictEqual(e.files[o].remoteAuthority,t.files[o].remoteAuthority);i.strictEqual(e.workspaces.length,t.workspaces.length,r);for(let o=0;o<e.workspaces.length;o++){const p=t.workspaces[o],n=e.workspaces[o];q(n)?a(n.folderUri,p.folderUri,r):g(n.workspace,p.workspace,r),i.strictEqual(n.label,p.label),i.strictEqual(n.remoteAuthority,n.remoteAuthority)}}function l(e,t){const r=R(e),o=I(r,new U);m(e,o,t)}const c=s.file(k(u(),"windowStateTest","test.code-workspace")),w=s.file(k(u(),"windowStateTest","testFile.txt")),b=s.file(k(u(),"windowStateTest","testFolder")),d=s.parse("foo://bar/c/e"),h=s.parse("foo://bar/c/d.txt"),y=s.parse("foo://bar/c/test.code-workspace");test("storing and restoring",()=>{let e;e={files:[],workspaces:[]},l(e,"empty"),e={files:[{fileUri:w}],workspaces:[]},l(e,"file"),e={files:[],workspaces:[{folderUri:b}]},l(e,"folder"),e={files:[],workspaces:[{workspace:f(c)},{folderUri:b}]},l(e,"workspaces and folders"),e={files:[{fileUri:h}],workspaces:[{workspace:f(y)},{folderUri:d}]},l(e,"remote workspaces and folders"),e={files:[{label:"abc",fileUri:w}],workspaces:[{label:"def",workspace:f(c)},{folderUri:d}]},l(e,"labels"),e={files:[{label:"abc",remoteAuthority:"test",fileUri:h}],workspaces:[{label:"def",remoteAuthority:"test",workspace:f(c)},{folderUri:d,remoteAuthority:"test"}]},l(e,"authority")}),test("open 1_55",()=>{const t=I(JSON.parse(`{
			"entries": [
				{
					"folderUri": "foo://bar/23/43",
					"remoteAuthority": "test+test"
				},
				{
					"workspace": {
						"id": "53b714b46ef1a2d4346568b4f591028c",
						"configPath": "file:///home/user/workspaces/testing/custom.code-workspace"
					}
				},
				{
					"folderUri": "file:///home/user/workspaces/testing/folding",
					"label": "abc"
				},
				{
					"fileUri": "file:///home/user/.config/code-oss-dev/storage.json",
					"label": "def"
				}
			]
		}`),new U),r={files:[{label:"def",fileUri:s.parse("file:///home/user/.config/code-oss-dev/storage.json")}],workspaces:[{folderUri:s.parse("foo://bar/23/43"),remoteAuthority:"test+test"},{workspace:{id:"53b714b46ef1a2d4346568b4f591028c",configPath:s.parse("file:///home/user/workspaces/testing/custom.code-workspace")}},{label:"abc",folderUri:s.parse("file:///home/user/workspaces/testing/folding")}]};m(t,r,"v1_33")}),test("toStoreData drops label if it matches path",()=>{const e=R({workspaces:[],files:[{fileUri:s.parse("file:///foo/bar/test.txt"),label:"/foo/bar/test.txt",remoteAuthority:void 0}]});i.deepStrictEqual(e,{entries:[{fileUri:"file:///foo/bar/test.txt",label:void 0,remoteAuthority:void 0}]})}),S()});
