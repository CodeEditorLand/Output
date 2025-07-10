function r(i){const t=[];return f(i.node,t),t.join("")}function f(i,t){if(i.type===2)i.lineBreakBefore&&t.push(`
`),typeof i.text=="string"&&t.push(i.text);else if(i.ctor===3)t.push("<image>");else if(i.ctor===1||i.ctor===2)for(const e of i.children)f(e,t)}export{r as $iQ};
