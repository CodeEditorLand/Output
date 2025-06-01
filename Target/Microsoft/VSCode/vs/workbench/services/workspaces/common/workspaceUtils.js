async function n(e,t){for(const f of e.folders){const r=await t.resolve(f.uri);if(r.children&&r.children.length>0)return!1}return!0}export{n as $ffc};
