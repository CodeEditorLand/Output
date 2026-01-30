export class ContextKeyAndExpr {
    static create(_expr: any, negated: any, extraRedundantCheck: any): any;
    static _normalizeArr(arr: any, negated: any, extraRedundantCheck: any): any;
    constructor(expr: any, negated: any);
    expr: any;
    negated: any;
    type: number;
    cmp(other: any): any;
    equals(other: any): boolean;
    substituteConstants(): any;
    evaluate(context: any): boolean;
    serialize(): any;
    keys(): any[];
    map(mapFnc: any): ContextKeyAndExpr;
    negate(): any;
}
export class ContextKeyDefinedExpr {
    static create(key: any, negated?: null): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyDefinedExpr | undefined;
    constructor(key: any, negated: any);
    key: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): ContextKeyFalseExpr | ContextKeyTrueExpr | this | undefined;
    evaluate(context: any): boolean;
    serialize(): any;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyEqualsExpr {
    static create(key: any, value: any, negated?: null): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyEqualsExpr | ContextKeyDefinedExpr | undefined;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): ContextKeyFalseExpr | ContextKeyTrueExpr | this | undefined;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyExpr {
    static false(): ContextKeyFalseExpr | undefined;
    static true(): ContextKeyTrueExpr | undefined;
    static has(key: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyDefinedExpr | undefined;
    static equals(key: any, value: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyEqualsExpr | ContextKeyDefinedExpr | undefined;
    static notEquals(key: any, value: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyDefinedExpr | ContextKeyNotEqualsExpr | undefined;
    static regex(key: any, value: any): ContextKeyRegexExpr;
    static in(key: any, value: any): ContextKeyInExpr;
    static notIn(key: any, value: any): ContextKeyNotInExpr;
    static not(key: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | undefined;
    static and(...expr: any[]): any;
    static or(...expr: any[]): any;
    static greater(key: any, value: any): any;
    static greaterEquals(key: any, value: any): any;
    static smaller(key: any, value: any): any;
    static smallerEquals(key: any, value: any): any;
    static deserialize(serialized: any): any;
}
export var ContextKeyExprType: any;
export class ContextKeyFalseExpr {
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): never[];
    map(mapFnc: any): this;
    negate(): ContextKeyTrueExpr | undefined;
}
export class ContextKeyGreaterEqualsExpr {
    static create(key: any, _value: any, negated?: null): any;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyGreaterExpr {
    static create(key: any, _value: any, negated?: null): any;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyInExpr {
    static create(key: any, valueKey: any): ContextKeyInExpr;
    constructor(key: any, valueKey: any);
    key: any;
    valueKey: any;
    type: number;
    negated: ContextKeyNotInExpr | null;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): ContextKeyNotInExpr;
}
export class ContextKeyNotEqualsExpr {
    static create(key: any, value: any, negated?: null): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyDefinedExpr | ContextKeyNotEqualsExpr | undefined;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): ContextKeyFalseExpr | ContextKeyTrueExpr | this | undefined;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyNotExpr {
    static create(key: any, negated?: null): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | undefined;
    constructor(key: any, negated: any);
    key: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): ContextKeyFalseExpr | ContextKeyTrueExpr | this | undefined;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyNotInExpr {
    static create(key: any, valueKey: any): ContextKeyNotInExpr;
    constructor(key: any, valueKey: any);
    key: any;
    valueKey: any;
    type: number;
    _negated: ContextKeyInExpr;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): ContextKeyInExpr;
}
export class ContextKeyNotRegexExpr {
    static create(actual: any): ContextKeyNotRegexExpr;
    constructor(_actual: any);
    _actual: any;
    type: number;
    cmp(other: any): any;
    equals(other: any): any;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any;
    map(mapFnc: any): ContextKeyNotRegexExpr;
    negate(): any;
}
export class ContextKeyOrExpr {
    static create(_expr: any, negated: any, extraRedundantCheck: any): any;
    static _normalizeArr(arr: any, negated: any, extraRedundantCheck: any): any;
    constructor(expr: any, negated: any);
    expr: any;
    negated: any;
    type: number;
    cmp(other: any): any;
    equals(other: any): boolean;
    substituteConstants(): any;
    evaluate(context: any): boolean;
    serialize(): any;
    keys(): any[];
    map(mapFnc: any): ContextKeyOrExpr;
    negate(): any;
}
export class ContextKeyRegexExpr {
    static create(key: any, regexp: any): ContextKeyRegexExpr;
    constructor(key: any, regexp: any);
    key: any;
    regexp: any;
    type: number;
    negated: ContextKeyNotRegexExpr | null;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): any;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): ContextKeyNotRegexExpr;
}
export class ContextKeySmallerEqualsExpr {
    static create(key: any, _value: any, negated?: null): any;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeySmallerExpr {
    static create(key: any, _value: any, negated?: null): any;
    constructor(key: any, value: any, negated: any);
    key: any;
    value: any;
    negated: any;
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): any[];
    map(mapFnc: any): any;
    negate(): any;
}
export class ContextKeyTrueExpr {
    type: number;
    cmp(other: any): number;
    equals(other: any): boolean;
    substituteConstants(): this;
    evaluate(context: any): boolean;
    serialize(): string;
    keys(): never[];
    map(mapFnc: any): this;
    negate(): ContextKeyFalseExpr | undefined;
}
export const IContextKeyService: any;
export class Parser {
    constructor(_config?: {
        regexParsingWithErrorRecovery: boolean;
    });
    get lexingErrors(): any[];
    get parsingErrors(): any[];
    _config: {
        regexParsingWithErrorRecovery: boolean;
    };
    _scanner: Scanner;
    _tokens: any[];
    _current: number;
    _parsingErrors: any[];
    _flagsGYRe: RegExp;
    /**
     * Parse a context key expression.
     *
     * @param input the expression to parse
     * @returns the parsed expression or `undefined` if there's an error - call `lexingErrors` and `parsingErrors` to see the errors
     */
    parse(input: any): any;
    _expr(): any;
    _or(): any;
    _and(): any;
    _term(): any;
    _primary(): any;
    _value(): any;
    _removeFlagsGY(flags: any): any;
    _previous(): any;
    _matchOne(token: any): boolean;
    _advance(): any;
    _consume(type: any, message: any): any;
    _errExpectedButGot(expected: any, got: any, additionalInfo: any): Error | undefined;
    _check(type: any): boolean;
    _peek(): any;
    _isAtEnd(): boolean;
}
export class RawContextKey extends ContextKeyDefinedExpr {
    static all(): ArrayIterator<any>;
    constructor(key: any, defaultValue: any, metaOrHide: any);
    _defaultValue: any;
    bindTo(target: any): any;
    getValue(target: any): any;
    toNegated(): any;
    isEqualTo(value: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyEqualsExpr | ContextKeyDefinedExpr | undefined;
    notEqualsTo(value: any): ContextKeyFalseExpr | ContextKeyTrueExpr | ContextKeyNotExpr | ContextKeyDefinedExpr | ContextKeyNotEqualsExpr | undefined;
    greater(value: any): any;
}
export function expressionsAreEqualWithConstantSubstitution(a: any, b: any): any;
export function implies(p: any, q: any): any;
export function setConstant(key: any, value: any): void;
export function validateWhenClauses(whenClauses: any): any;
import { Scanner } from "./scanner.js";
//# sourceMappingURL=contextkey.d.ts.map