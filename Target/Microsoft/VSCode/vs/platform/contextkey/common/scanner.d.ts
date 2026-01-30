export class Scanner {
    static getLexeme(token: any): any;
    _input: string;
    _start: number;
    _current: number;
    _tokens: any[];
    _errors: any[];
    stringRe: RegExp;
    get errors(): any[];
    reset(value: any): this;
    scan(): any[];
    _match(expected: any): boolean;
    _advance(): number;
    _peek(): number;
    _addToken(type: any): void;
    _error(additional: any): void;
    _string(): void;
    _quotedString(): void;
    _regex(): void;
    _isAtEnd(): boolean;
}
export var TokenType: any;
//# sourceMappingURL=scanner.d.ts.map