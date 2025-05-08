function n(m,r={}){let e="";return r.excludeLeadingNewLine||(e+=`\r
`),e+="\x1B[0m\x1B[7m * ",r.loudFormatting?e+="\x1B[0;104m":e+="\x1B[0m",e+=` ${m} \x1B[0m
\r`,e}export{n as formatMessageForTerminal};
