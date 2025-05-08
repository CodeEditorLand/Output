function c(n,l){let e=0,t=0;const o=n.length;for(;t<o;){const r=n.charCodeAt(t);if(r===32)e++;else if(r===9)e=e-e%l+l;else break;t++}return t===o?-1:e}export{c as computeIndentLevel};
