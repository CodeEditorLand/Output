async function n(e,o){for(const t of e.folders){const r=await o.resolve(t.uri);if(r.children&&r.children.length>0)return!1}return!0}export{n as areWorkspaceFoldersEmpty};
