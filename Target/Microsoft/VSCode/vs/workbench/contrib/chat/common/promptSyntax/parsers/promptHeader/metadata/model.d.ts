import { FrontMatterRecord, FrontMatterToken } from '../../../codecs/base/frontMatterCodec/tokens/index.js';
import { PromptStringMetadata } from './base/string.js';
export declare class PromptModelMetadata extends PromptStringMetadata {
    get recordName(): string;
    constructor(recordToken: FrontMatterRecord, languageId: string);
    /**
     * Check if a provided front matter token is a metadata record
     * with name equal to `description`.
     */
    static isModelRecord(token: FrontMatterToken): boolean;
}
