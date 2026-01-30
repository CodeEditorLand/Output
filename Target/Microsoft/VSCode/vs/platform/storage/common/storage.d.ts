export class AbstractStorageService extends Disposable {
    constructor(options?: {
        flushInterval: number | undefined;
    });
    _onDidChangeValue: any;
    _onDidChangeTarget: any;
    onDidChangeTarget: any;
    _onWillSaveState: any;
    onWillSaveState: any;
    runFlushWhenIdle: any;
    flushWhenIdleScheduler: any;
    onDidChangeValue(scope: any, key: any, disposable: any): any;
    doFlushWhenIdle(): void;
    shouldFlushWhenIdle(): boolean;
    stopFlushWhenIdle(): void;
    initialize(): Promise<void>;
    initializationPromise: Promise<void> | undefined;
    emitDidChangeValue(scope: any, event: any): void;
    emitWillSaveState(reason: any): void;
    get(key: any, scope: any, fallbackValue: any): any;
    getBoolean(key: any, scope: any, fallbackValue: any): any;
    getNumber(key: any, scope: any, fallbackValue: any): any;
    getObject(key: any, scope: any, fallbackValue: any): any;
    storeAll(entries: any, external: any): void;
    store(key: any, value: any, scope: any, target: any, external?: boolean): void;
    remove(key: any, scope: any, external?: boolean): void;
    withPausedEmitters(fn: any): void;
    keys(scope: any, target: any): string[];
    updateKeyTarget(key: any, scope: any, target: any, external?: boolean): void;
    get workspaceKeyTargets(): any;
    _workspaceKeyTargets: any;
    get profileKeyTargets(): any;
    _profileKeyTargets: any;
    get applicationKeyTargets(): any;
    _applicationKeyTargets: any;
    getKeyTargets(scope: any): any;
    loadKeyTargets(scope: any): any;
    isNew(scope: any): boolean;
    flush(reason?: any): Promise<void>;
    log(): Promise<void>;
    optimize(scope: any): Promise<any>;
    switch(to: any, preserveData: any): Promise<any>;
    canSwitchProfile(from: any, to: any): boolean;
    switchData(oldStorage: any, newStorage: any, scope: any): void;
}
export const IS_NEW_KEY: "__$__isNewStorageMarker";
export const IStorageService: any;
export class InMemoryStorageService extends AbstractStorageService {
    constructor();
    applicationStorage: any;
    profileStorage: any;
    workspaceStorage: any;
    getStorage(scope: any): any;
    getLogDetails(scope: any): "inMemory (application)" | "inMemory (profile)" | "inMemory (workspace)";
    doInitialize(): Promise<void>;
    switchToProfile(): Promise<void>;
    switchToWorkspace(): Promise<void>;
    hasScope(scope: any): boolean;
}
export var StorageScope: any;
export var StorageTarget: any;
export const TARGET_KEY: "__$__targetStorageMarker";
export var WillSaveStateReason: any;
export function isProfileUsingDefaultStorage(profile: any): any;
export function loadKeyTargets(storage: any): any;
export function logStorage(application: any, profile: any, workspace: any, applicationPath: any, profilePath: any, workspacePath: any): Promise<void>;
import { Disposable } from "../../../base/common/lifecycle.js";
//# sourceMappingURL=storage.d.ts.map