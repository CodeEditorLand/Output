const n=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function r(t){return n.test(t)}const o=crypto.randomUUID.bind(crypto);export{o as generateUuid,r as isUUID};
