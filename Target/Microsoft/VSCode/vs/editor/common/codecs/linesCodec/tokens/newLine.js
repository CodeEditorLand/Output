import{VSBuffer as t}from"../../../../../base/common/buffer.js";import{SimpleToken as e}from"../../simpleCodec/tokens/simpleToken.js";class r extends e{static symbol=`
`;static byte=t.fromString(r.symbol);get text(){return r.symbol}get byte(){return r.byte}toString(){return`newline${this.range}`}}export{r as NewLine};
