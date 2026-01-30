import{$8Ac as u}from"./runInTerminalHelpers.js";const c=16e3;function m(r,l){if(!r.xterm||!r.xterm.raw)return"";const o=r.xterm.raw.buffer.active,n=Math.max(l?.line??0,0),i=o.length,f=new Array(i-n);for(let e=n;e<i;e++){const a=o.getLine(e);f[e-n]=a?a.translateToString(!0):""}let t=f.join(`
`);return t.length>c&&(t=u(t,c)),t}export{m as $aBc};
