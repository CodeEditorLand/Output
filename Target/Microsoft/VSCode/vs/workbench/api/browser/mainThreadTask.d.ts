declare let V: {
    new (o: any, r: any, e: any, n: any): {
        f: any;
        g: any;
        h: any;
        b: any;
        c: Map<any, any>;
        dispose(): void;
        $createTaskId(o: any): Promise<any>;
        $registerTaskProvider(o: any, r: any): Promise<undefined>;
        $unregisterTaskProvider(o: any): Promise<undefined>;
        $fetchTasks(o: any): any;
        j(o: any): any;
        $getTaskExecution(o: any): Promise<{
            id: any;
            task: any;
        }>;
        $executeTask(o: any): Promise<any>;
        $customExecutionComplete(o: any, r: any): Promise<any>;
        $terminateTask(o: any): Promise<any>;
        $registerTaskSystem(o: any, r: any): void;
        $registerSupportedExecutions(o: any, r: any, e: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var P: any;
declare var L: any;
export { V as $a3b, P as TaskProblemMatcherEndedDto, L as TaskProblemMatcherStartedDto };
//# sourceMappingURL=mainThreadTask.d.ts.map