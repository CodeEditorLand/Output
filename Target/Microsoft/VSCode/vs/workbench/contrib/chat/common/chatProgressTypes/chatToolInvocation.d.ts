export { m as $thc };
declare class m {
    constructor(s: any, e: any, i: any);
    get isComplete(): boolean;
    get isCompletePromise(): Promise<any>;
    get confirmed(): t;
    get isConfirmed(): boolean | undefined;
    get resultDetails(): any;
    toolCallId: any;
    kind: string;
    a: boolean;
    b: t;
    c: t;
    progress: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    invocationMessage: any;
    pastTenseMessage: any;
    originMessage: any;
    f: any;
    presentation: any;
    toolSpecificData: any;
    toolId: any;
    d: boolean | undefined;
    complete(s: any): void;
    e: any;
    get confirmationMessages(): any;
    acceptProgress(s: any): void;
    toJSON(): {
        kind: string;
        presentation: any;
        invocationMessage: any;
        pastTenseMessage: any;
        originMessage: any;
        isConfirmed: boolean | undefined;
        isComplete: boolean;
        resultDetails: any;
        toolSpecificData: any;
        toolCallId: any;
        toolId: any;
    };
}
import { $$h as t } from "../../../../../base/common/async.js";
//# sourceMappingURL=chatToolInvocation.d.ts.map