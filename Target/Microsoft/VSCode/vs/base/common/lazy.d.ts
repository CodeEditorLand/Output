export class Lazy {
    constructor(executor: any);
    executor: any;
    _state: any;
    /**
     * True if the lazy value has been resolved.
     */
    get hasValue(): boolean;
    /**
     * Get the wrapped value.
     *
     * This will force evaluation of the lazy value if it has not been resolved yet. Lazy values are only
     * resolved once. `getValue` will re-throw exceptions that are hit while resolving the value
     */
    get value(): any;
    _value: any;
    _error: unknown;
    /**
     * Get the wrapped value without forcing evaluation.
     */
    get rawValue(): any;
}
//# sourceMappingURL=lazy.d.ts.map