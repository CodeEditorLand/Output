function r(n,m={}){let e="";return m.excludeLeadingNewLine||(e+=`\r
`),e+="\x1B[0m\x1B[7m * ",m.loudFormatting?e+="\x1B[0;104m":e+="\x1B[0m",e+=` ${n} \x1B[0m
\r`,e}export{r as $ymc};
