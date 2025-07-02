import { HeaderBase, IHeaderMetadata, type TDehydrated } from './headerBase.js';
import { PromptsType } from '../../promptTypes.js';
import { FrontMatterRecord } from '../../codecs/base/frontMatterCodec/tokens/index.js';
import { PromptModelMetadata } from './metadata/model.js';
import { PromptToolsMetadata } from './metadata/tools.js';
/**
 * Metadata utility object for mode files.
 */
interface IModeMetadata extends IHeaderMetadata {
    /**
     * Tools metadata in the mode header.
     */
    tools: PromptToolsMetadata;
    /**
     * Chat model metadata in the mode header.
     */
    model: PromptModelMetadata;
}
/**
 * Metadata for mode files.
 */
export type TModeMetadata = Partial<TDehydrated<IModeMetadata>> & {
    promptType: PromptsType.mode;
};
/**
 * Header object for mode files.
 */
export declare class ModeHeader extends HeaderBase<IModeMetadata> {
    protected handleToken(token: FrontMatterRecord): boolean;
}
export {};
