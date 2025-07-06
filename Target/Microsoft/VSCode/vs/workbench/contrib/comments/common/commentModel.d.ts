declare class l {
    constructor(t: any, i: any, s: any, n: any, e: any);
    uniqueOwner: any;
    owner: any;
    resource: any;
    comment: any;
    thread: any;
    isRoot: boolean;
    replies: any[];
    threadId: any;
    range: any;
    threadState: any;
    threadRelevance: any;
    contextValue: any;
    controllerHandle: any;
    threadHandle: any;
    hasReply(): boolean;
    get lastUpdatedAt(): any;
    a: any;
}
declare class h {
    static createCommentNode(t: any, i: any, s: any, n: any): any;
    constructor(t: any, i: any, s: any, n: any);
    uniqueOwner: any;
    owner: any;
    id: any;
    resource: any;
    commentThreads: any;
    get lastUpdatedAt(): string;
    a: string | undefined;
}
export { l as $UTb, h as $VTb };
//# sourceMappingURL=commentModel.d.ts.map