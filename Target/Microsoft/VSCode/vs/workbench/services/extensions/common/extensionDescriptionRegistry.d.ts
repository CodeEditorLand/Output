export class DeltaExtensionsResult {
    constructor(versionId: any, removedDueToLooping: any);
    versionId: any;
    removedDueToLooping: any;
}
export class ExtensionDescriptionRegistry extends Disposable {
    static isHostExtension(extensionId: any, myRegistry: any, globalRegistry: any): boolean;
    static _findLoopingExtensions(extensionDescriptions: any): any[];
    constructor(_activationEventsReader: any, extensionDescriptions: any);
    _activationEventsReader: any;
    _onDidChange: any;
    onDidChange: any;
    _versionId: number;
    _extensionDescriptions: any;
    _initialize(): void;
    _extensionsMap: ExtensionIdentifierMap | undefined;
    _extensionsArr: any[] | undefined;
    _activationMap: Map<any, any> | undefined;
    set(extensionDescriptions: any): {
        versionId: number;
    };
    deltaExtensions(toAdd: any, toRemove: any): DeltaExtensionsResult;
    containsActivationEvent(activationEvent: any): boolean;
    containsExtension(extensionId: any): boolean;
    getExtensionDescriptionsForActivationEvent(activationEvent: any): any;
    getAllExtensionDescriptions(): any[];
    getSnapshot(): ExtensionDescriptionRegistrySnapshot;
    getExtensionDescription(extensionId: any): any;
    getExtensionDescriptionByUUID(uuid: any): any;
    getExtensionDescriptionByIdOrUUID(extensionId: any, uuid: any): any;
}
export class ExtensionDescriptionRegistryLock extends Disposable {
    constructor(_registry: any, lock: any);
    _registry: any;
    _isDisposed: boolean;
    isAcquiredFor(registry: any): boolean;
}
export class ExtensionDescriptionRegistrySnapshot {
    constructor(versionId: any, extensions: any);
    versionId: any;
    extensions: any;
}
export class LockableExtensionDescriptionRegistry {
    constructor(activationEventsReader: any);
    _lock: Lock;
    _actual: ExtensionDescriptionRegistry;
    acquireLock(customerName: any): Promise<ExtensionDescriptionRegistryLock>;
    deltaExtensions(acquiredLock: any, toAdd: any, toRemove: any): DeltaExtensionsResult;
    containsActivationEvent(activationEvent: any): boolean;
    containsExtension(extensionId: any): boolean;
    getExtensionDescriptionsForActivationEvent(activationEvent: any): any;
    getAllExtensionDescriptions(): any[];
    getSnapshot(): ExtensionDescriptionRegistrySnapshot;
    getExtensionDescription(extensionId: any): any;
    getExtensionDescriptionByUUID(uuid: any): any;
    getExtensionDescriptionByIdOrUUID(extensionId: any, uuid: any): any;
}
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ExtensionIdentifierMap } from "../../../../platform/extensions/common/extensions.js";
declare class Lock {
    _pendingCustomers: any[];
    _isLocked: boolean;
    acquire(customerName: any): Promise<any>;
    _advance(): void;
}
export {};
//# sourceMappingURL=extensionDescriptionRegistry.d.ts.map