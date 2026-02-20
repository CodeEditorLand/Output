import{$gFc as a}from"./runInTerminalHelpers.js";const c=16e3;function m(r,u){if(!r.xterm||!r.xterm.raw)return"";const o=r.xterm.raw.buffer.active,n=Math.max(u?.line??0,0),i=o.length,f=new Array(i-n);for(let e=n;e<i;e++){const l=o.getLine(e);f[e-n]=l?l.translateToString(!0):""}let t=f.join(`
`);return t.length>c&&(t=a(t,c)),t}export{m as $lFc};
