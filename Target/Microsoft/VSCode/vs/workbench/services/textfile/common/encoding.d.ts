declare function E(r: any): any;
declare function Q(r: any): Promise<any>;
declare const g: "utf16be";
declare const f: "utf16le";
declare function q(r: any): boolean;
declare const h: number[];
declare const L: number[];
declare const S: number[];
declare class k extends Error {
    constructor(e: any, o: any);
    decodeStreamErrorKind: any;
}
declare function V(r: any, e: any): Promise<any>;
declare function X(r: any, e: any, o: any): Promise<{
    read(): b | null;
}>;
declare const m: "utf8";
declare const I: "utf8bom";
declare function v(r: any, e: any): "utf16le" | "utf16be" | "utf8bom" | null;
declare function ee(r: any): any;
declare function J({ buffer: r, bytesRead: e }: {
    buffer: any;
    bytesRead: any;
}, o: any, s: any): Promise<{
    seemsBinary: boolean;
    encoding: any;
}> | {
    seemsBinary: boolean;
    encoding: string | null;
};
declare namespace O {
    namespace utf8 {
        let labelLong: string;
        let labelShort: string;
        let order: number;
        let alias: string;
        let guessableName: string;
    }
    namespace utf8bom {
        let labelLong_1: string;
        export { labelLong_1 as labelLong };
        let labelShort_1: string;
        export { labelShort_1 as labelShort };
        export let encodeOnly: boolean;
        let order_1: number;
        export { order_1 as order };
        let alias_1: string;
        export { alias_1 as alias };
    }
    namespace utf16le {
        let labelLong_2: string;
        export { labelLong_2 as labelLong };
        let labelShort_2: string;
        export { labelShort_2 as labelShort };
        let order_2: number;
        export { order_2 as order };
        let guessableName_1: string;
        export { guessableName_1 as guessableName };
    }
    namespace utf16be {
        let labelLong_3: string;
        export { labelLong_3 as labelLong };
        let labelShort_3: string;
        export { labelShort_3 as labelShort };
        let order_3: number;
        export { order_3 as order };
        let guessableName_2: string;
        export { guessableName_2 as guessableName };
    }
    namespace windows1252 {
        let labelLong_4: string;
        export { labelLong_4 as labelLong };
        let labelShort_4: string;
        export { labelShort_4 as labelShort };
        let order_4: number;
        export { order_4 as order };
        let guessableName_3: string;
        export { guessableName_3 as guessableName };
    }
    namespace iso88591 {
        let labelLong_5: string;
        export { labelLong_5 as labelLong };
        let labelShort_5: string;
        export { labelShort_5 as labelShort };
        let order_5: number;
        export { order_5 as order };
    }
    namespace iso88593 {
        let labelLong_6: string;
        export { labelLong_6 as labelLong };
        let labelShort_6: string;
        export { labelShort_6 as labelShort };
        let order_6: number;
        export { order_6 as order };
    }
    namespace iso885915 {
        let labelLong_7: string;
        export { labelLong_7 as labelLong };
        let labelShort_7: string;
        export { labelShort_7 as labelShort };
        let order_7: number;
        export { order_7 as order };
    }
    namespace macroman {
        let labelLong_8: string;
        export { labelLong_8 as labelLong };
        let labelShort_8: string;
        export { labelShort_8 as labelShort };
        let order_8: number;
        export { order_8 as order };
    }
    namespace cp437 {
        let labelLong_9: string;
        export { labelLong_9 as labelLong };
        let labelShort_9: string;
        export { labelShort_9 as labelShort };
        let order_9: number;
        export { order_9 as order };
    }
    namespace windows1256 {
        let labelLong_10: string;
        export { labelLong_10 as labelLong };
        let labelShort_10: string;
        export { labelShort_10 as labelShort };
        let order_10: number;
        export { order_10 as order };
    }
    namespace iso88596 {
        let labelLong_11: string;
        export { labelLong_11 as labelLong };
        let labelShort_11: string;
        export { labelShort_11 as labelShort };
        let order_11: number;
        export { order_11 as order };
    }
    namespace windows1257 {
        let labelLong_12: string;
        export { labelLong_12 as labelLong };
        let labelShort_12: string;
        export { labelShort_12 as labelShort };
        let order_12: number;
        export { order_12 as order };
    }
    namespace iso88594 {
        let labelLong_13: string;
        export { labelLong_13 as labelLong };
        let labelShort_13: string;
        export { labelShort_13 as labelShort };
        let order_13: number;
        export { order_13 as order };
    }
    namespace iso885914 {
        let labelLong_14: string;
        export { labelLong_14 as labelLong };
        let labelShort_14: string;
        export { labelShort_14 as labelShort };
        let order_14: number;
        export { order_14 as order };
    }
    namespace windows1250 {
        let labelLong_15: string;
        export { labelLong_15 as labelLong };
        let labelShort_15: string;
        export { labelShort_15 as labelShort };
        let order_15: number;
        export { order_15 as order };
        let guessableName_4: string;
        export { guessableName_4 as guessableName };
    }
    namespace iso88592 {
        let labelLong_16: string;
        export { labelLong_16 as labelLong };
        let labelShort_16: string;
        export { labelShort_16 as labelShort };
        let order_16: number;
        export { order_16 as order };
        let guessableName_5: string;
        export { guessableName_5 as guessableName };
    }
    namespace cp852 {
        let labelLong_17: string;
        export { labelLong_17 as labelLong };
        let labelShort_17: string;
        export { labelShort_17 as labelShort };
        let order_17: number;
        export { order_17 as order };
    }
    namespace windows1251 {
        let labelLong_18: string;
        export { labelLong_18 as labelLong };
        let labelShort_18: string;
        export { labelShort_18 as labelShort };
        let order_18: number;
        export { order_18 as order };
        let guessableName_6: string;
        export { guessableName_6 as guessableName };
    }
    namespace cp866 {
        let labelLong_19: string;
        export { labelLong_19 as labelLong };
        let labelShort_19: string;
        export { labelShort_19 as labelShort };
        let order_19: number;
        export { order_19 as order };
        let guessableName_7: string;
        export { guessableName_7 as guessableName };
    }
    namespace cp1125 {
        let labelLong_20: string;
        export { labelLong_20 as labelLong };
        let labelShort_20: string;
        export { labelShort_20 as labelShort };
        let order_20: number;
        export { order_20 as order };
        let guessableName_8: string;
        export { guessableName_8 as guessableName };
    }
    namespace iso88595 {
        let labelLong_21: string;
        export { labelLong_21 as labelLong };
        let labelShort_21: string;
        export { labelShort_21 as labelShort };
        let order_21: number;
        export { order_21 as order };
        let guessableName_9: string;
        export { guessableName_9 as guessableName };
    }
    namespace koi8r {
        let labelLong_22: string;
        export { labelLong_22 as labelLong };
        let labelShort_22: string;
        export { labelShort_22 as labelShort };
        let order_22: number;
        export { order_22 as order };
        let guessableName_10: string;
        export { guessableName_10 as guessableName };
    }
    namespace koi8u {
        let labelLong_23: string;
        export { labelLong_23 as labelLong };
        let labelShort_23: string;
        export { labelShort_23 as labelShort };
        let order_23: number;
        export { order_23 as order };
    }
    namespace iso885913 {
        let labelLong_24: string;
        export { labelLong_24 as labelLong };
        let labelShort_24: string;
        export { labelShort_24 as labelShort };
        let order_24: number;
        export { order_24 as order };
    }
    namespace windows1253 {
        let labelLong_25: string;
        export { labelLong_25 as labelLong };
        let labelShort_25: string;
        export { labelShort_25 as labelShort };
        let order_25: number;
        export { order_25 as order };
        let guessableName_11: string;
        export { guessableName_11 as guessableName };
    }
    namespace iso88597 {
        let labelLong_26: string;
        export { labelLong_26 as labelLong };
        let labelShort_26: string;
        export { labelShort_26 as labelShort };
        let order_26: number;
        export { order_26 as order };
        let guessableName_12: string;
        export { guessableName_12 as guessableName };
    }
    namespace windows1255 {
        let labelLong_27: string;
        export { labelLong_27 as labelLong };
        let labelShort_27: string;
        export { labelShort_27 as labelShort };
        let order_27: number;
        export { order_27 as order };
        let guessableName_13: string;
        export { guessableName_13 as guessableName };
    }
    namespace iso88598 {
        let labelLong_28: string;
        export { labelLong_28 as labelLong };
        let labelShort_28: string;
        export { labelShort_28 as labelShort };
        let order_28: number;
        export { order_28 as order };
        let guessableName_14: string;
        export { guessableName_14 as guessableName };
    }
    namespace iso885910 {
        let labelLong_29: string;
        export { labelLong_29 as labelLong };
        let labelShort_29: string;
        export { labelShort_29 as labelShort };
        let order_29: number;
        export { order_29 as order };
    }
    namespace iso885916 {
        let labelLong_30: string;
        export { labelLong_30 as labelLong };
        let labelShort_30: string;
        export { labelShort_30 as labelShort };
        let order_30: number;
        export { order_30 as order };
    }
    namespace windows1254 {
        let labelLong_31: string;
        export { labelLong_31 as labelLong };
        let labelShort_31: string;
        export { labelShort_31 as labelShort };
        let order_31: number;
        export { order_31 as order };
    }
    namespace iso88599 {
        let labelLong_32: string;
        export { labelLong_32 as labelLong };
        let labelShort_32: string;
        export { labelShort_32 as labelShort };
        let order_32: number;
        export { order_32 as order };
    }
    namespace windows1258 {
        let labelLong_33: string;
        export { labelLong_33 as labelLong };
        let labelShort_33: string;
        export { labelShort_33 as labelShort };
        let order_33: number;
        export { order_33 as order };
    }
    namespace gbk {
        let labelLong_34: string;
        export { labelLong_34 as labelLong };
        let labelShort_34: string;
        export { labelShort_34 as labelShort };
        let order_34: number;
        export { order_34 as order };
    }
    namespace gb18030 {
        let labelLong_35: string;
        export { labelLong_35 as labelLong };
        let labelShort_35: string;
        export { labelShort_35 as labelShort };
        let order_35: number;
        export { order_35 as order };
    }
    namespace cp950 {
        let labelLong_36: string;
        export { labelLong_36 as labelLong };
        let labelShort_36: string;
        export { labelShort_36 as labelShort };
        let order_36: number;
        export { order_36 as order };
        let guessableName_15: string;
        export { guessableName_15 as guessableName };
    }
    namespace big5hkscs {
        let labelLong_37: string;
        export { labelLong_37 as labelLong };
        let labelShort_37: string;
        export { labelShort_37 as labelShort };
        let order_37: number;
        export { order_37 as order };
    }
    namespace shiftjis {
        let labelLong_38: string;
        export { labelLong_38 as labelLong };
        let labelShort_38: string;
        export { labelShort_38 as labelShort };
        let order_38: number;
        export { order_38 as order };
        let guessableName_16: string;
        export { guessableName_16 as guessableName };
    }
    namespace eucjp {
        let labelLong_39: string;
        export { labelLong_39 as labelLong };
        let labelShort_39: string;
        export { labelShort_39 as labelShort };
        let order_39: number;
        export { order_39 as order };
        let guessableName_17: string;
        export { guessableName_17 as guessableName };
    }
    namespace euckr {
        let labelLong_40: string;
        export { labelLong_40 as labelLong };
        let labelShort_40: string;
        export { labelShort_40 as labelShort };
        let order_40: number;
        export { order_40 as order };
        let guessableName_18: string;
        export { guessableName_18 as guessableName };
    }
    namespace windows874 {
        let labelLong_41: string;
        export { labelLong_41 as labelLong };
        let labelShort_41: string;
        export { labelShort_41 as labelShort };
        let order_41: number;
        export { order_41 as order };
    }
    namespace iso885911 {
        let labelLong_42: string;
        export { labelLong_42 as labelLong };
        let labelShort_42: string;
        export { labelShort_42 as labelShort };
        let order_42: number;
        export { order_42 as order };
    }
    namespace koi8ru {
        let labelLong_43: string;
        export { labelLong_43 as labelLong };
        let labelShort_43: string;
        export { labelShort_43 as labelShort };
        let order_43: number;
        export { order_43 as order };
    }
    namespace koi8t {
        let labelLong_44: string;
        export { labelLong_44 as labelLong };
        let labelShort_44: string;
        export { labelShort_44 as labelShort };
        let order_44: number;
        export { order_44 as order };
    }
    namespace gb2312 {
        let labelLong_45: string;
        export { labelLong_45 as labelLong };
        let labelShort_45: string;
        export { labelShort_45 as labelShort };
        let order_45: number;
        export { order_45 as order };
        let guessableName_19: string;
        export { guessableName_19 as guessableName };
    }
    namespace cp865 {
        let labelLong_46: string;
        export { labelLong_46 as labelLong };
        let labelShort_46: string;
        export { labelShort_46 as labelShort };
        let order_46: number;
        export { order_46 as order };
    }
    namespace cp850 {
        let labelLong_47: string;
        export { labelLong_47 as labelLong };
        let labelShort_47: string;
        export { labelShort_47 as labelShort };
        let order_47: number;
        export { order_47 as order };
    }
}
declare const G: {};
declare var C: any;
import { $Ki as b } from "../../../../base/common/buffer.js";
export { E as $$I, Q as $0I, g as $1I, f as $2I, q as $3I, h as $4I, L as $5I, S as $6I, k as $7I, V as $8I, X as $9I, m as $YI, I as $ZI, v as $_I, ee as $aJ, J as $bJ, O as $cJ, G as $dJ, C as DecodeStreamErrorKind };
//# sourceMappingURL=encoding.d.ts.map