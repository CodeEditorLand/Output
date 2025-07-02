import { ChatModeKind } from './constants.js';
export declare function checkModeOption(mode: ChatModeKind, option: boolean | ((mode: ChatModeKind) => boolean) | undefined): boolean | undefined;
