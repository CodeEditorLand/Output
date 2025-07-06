declare class m {
    a: number;
    f: WeakMap<WeakKey, any>;
    addFilteredObj(e: any): void;
    b: Set<any> | undefined;
    c(e: any): boolean;
    d(e: any): any[];
    e(e: any): {
        text: any;
        style: string;
    }[];
    handleObservableCreated(e: any): void;
    handleOnListenerCountChanged(e: any, t: any): void;
    handleObservableUpdated(e: any, t: any): void;
    formatChanges(e: any): {
        text: any;
        style: string;
    } | undefined;
    handleDerivedDependencyChanged(e: any, t: any, r: any): void;
    _handleDerivedRecomputed(e: any, t: any): void;
    handleDerivedCleared(e: any): void;
    handleFromEventObservableTriggered(e: any, t: any): void;
    handleAutorunCreated(e: any): void;
    handleAutorunDisposed(e: any): void;
    handleAutorunDependencyChanged(e: any, t: any, r: any): void;
    handleAutorunStarted(e: any): void;
    handleAutorunFinished(e: any): void;
    handleBeginTransaction(e: any): void;
    handleEndTransaction(): void;
}
declare function c(n: any, e: any): any;
declare function x(n: any): void;
export { m as $1e, c as $2e, x as $Ze };
//# sourceMappingURL=consoleObservableLogger.d.ts.map