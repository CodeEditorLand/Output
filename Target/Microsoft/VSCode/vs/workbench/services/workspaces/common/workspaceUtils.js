async function o(r,t){for(const n of r.folders){const e=await t.resolve(n.uri);if(e.children&&e.children.length>0)return!1}return!0}export{o as $vec};
