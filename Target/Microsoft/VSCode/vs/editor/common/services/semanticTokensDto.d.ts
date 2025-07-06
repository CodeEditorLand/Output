declare function U(n: any): g;
declare function $(n: any): {
    id: number | undefined;
    type: string;
    data: Uint32Array<any>;
    deltas?: never;
} | {
    id: number | undefined;
    type: string;
    deltas: {
        start: number | undefined;
        deleteCount: number | undefined;
        data: Uint32Array<any> | undefined;
    }[];
    data?: never;
};
import { $Ki as g } from "../../../base/common/buffer.js";
export { U as $atb, $ as $btb };
//# sourceMappingURL=semanticTokensDto.d.ts.map