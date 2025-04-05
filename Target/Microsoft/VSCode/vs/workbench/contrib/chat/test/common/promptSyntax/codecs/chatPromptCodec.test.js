import"../../../../../../../base/common/buffer.js";import{Range as e}from"../../../../../../../editor/common/core/range.js";import{newWriteableStream as n}from"../../../../../../../base/common/stream.js";import{TestDecoder as m}from"../../../../../../../editor/test/common/utils/testDecoder.js";import{ChatPromptCodec as i}from"../../../../common/promptSyntax/codecs/chatPromptCodec.js";import{FileReference as t}from"../../../../common/promptSyntax/codecs/tokens/fileReference.js";import{ensureNoDisposablesAreLeakedInTestSuite as p}from"../../../../../../../base/test/common/utils.js";import"../../../../common/promptSyntax/codecs/chatPromptDecoder.js";class c extends m{constructor(){const o=n(null),s=i.decode(o);super(o,s)}}suite("ChatPromptCodec",()=>{const r=p();test("\u2022 produces expected tokens",async()=>{await r.add(new c).run(`#file:/etc/hosts some text	
  for #file:./README.md	 testing
 \u2714 purposes
#file:LICENSE.md \u270C 	#file:.gitignore


	   #file:/Users/legomushroom/repos/vscode   

something #file:	somewhere
`,[new t(new e(1,1,1,17),"/etc/hosts"),new t(new e(2,7,2,24),"./README.md"),new t(new e(4,1,4,17),"LICENSE.md"),new t(new e(4,21,4,37),".gitignore"),new t(new e(7,5,7,43),"/Users/legomushroom/repos/vscode"),new t(new e(9,11,9,17),"")])})});export{c as TestChatPromptCodec};
