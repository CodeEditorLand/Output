declare class c {
    constructor(t: any, i: any);
    metadata: any;
    toString(): string;
    getType(): any;
    toKey(t: any): string;
}
declare namespace l {
    function unknown(e: any): c;
    function rename(): c;
    function chatApplyEdits(e: any): c;
    function inlineCompletionAccept(e: any): c;
    function inlineCompletionPartialAccept(e: any): c;
    function inlineChatApplyEdit(e: any): c;
    function reloadFromDisk(): c;
    function cursor(e: any): c;
    function setValue(): c;
    function eolChange(): c;
    function applyEdits(): c;
    function snippet(): c;
    function suggest(e: any): c;
    function codeAction(e: any): c;
}
export { c as $ME, l as $NE };
//# sourceMappingURL=textModelEditReason.d.ts.map