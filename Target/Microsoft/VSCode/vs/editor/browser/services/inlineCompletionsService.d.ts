import { Event } from '../../../base/common/event.js';
import { Disposable } from '../../../base/common/lifecycle.js';
import { Action2 } from '../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../platform/contextkey/common/contextkey.js';
import { ServicesAccessor } from '../../../platform/instantiation/common/instantiation.js';
export declare const IInlineCompletionsService: import("../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IInlineCompletionsService>;
export interface IInlineCompletionsService {
    readonly _serviceBrand: undefined;
    onDidChangeIsSnoozing: Event<boolean>;
    /**
     * Get the remaining time (in ms) for which inline completions should be snoozed,
     * or 0 if not snoozed.
     */
    readonly snoozeTimeLeft: number;
    /**
     * Snooze inline completions for the specified duration. If already snoozed, extend the snooze time.
     */
    snooze(durationMs?: number): void;
    /**
     * Snooze inline completions for the specified duration. If already snoozed, overwrite the existing snooze time.
     */
    setSnoozeDuration(durationMs: number): void;
    /**
     * Check if inline completions are currently snoozed.
     */
    isSnoozing(): boolean;
    /**
     * Cancel the current snooze.
     */
    cancelSnooze(): void;
}
export declare class InlineCompletionsService extends Disposable implements IInlineCompletionsService {
    private _contextKeyService;
    readonly _serviceBrand: undefined;
    private _onDidChangeIsSnoozing;
    readonly onDidChangeIsSnoozing: Event<boolean>;
    private static readonly SNOOZE_DURATION;
    private _snoozeTimeEnd;
    get snoozeTimeLeft(): number;
    private _timer;
    constructor(_contextKeyService: IContextKeyService);
    snooze(durationMs?: number): void;
    setSnoozeDuration(durationMs: number): void;
    isSnoozing(): boolean;
    cancelSnooze(): void;
}
export declare class SnoozeInlineCompletion extends Action2 {
    static ID: string;
    constructor();
    run(accessor: ServicesAccessor): Promise<void>;
}
export declare class CancelSnoozeInlineCompletion extends Action2 {
    static ID: string;
    constructor();
    run(accessor: ServicesAccessor): Promise<void>;
}
