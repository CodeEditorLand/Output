import { CancellationToken } from '../../../../../base/common/cancellation.js';
import { URI } from '../../../../../base/common/uri.js';
import { ICustomChatMode, IPromptsService } from '../../common/promptSyntax/service/promptsService.js';
export declare class MockPromptsService implements IPromptsService {
    _serviceBrand: undefined;
    private readonly _onDidChangeCustomChatModes;
    readonly onDidChangeCustomChatModes: import("../../../../workbench.web.main.internal.js").Event<void>;
    private _customModes;
    setCustomModes(modes: ICustomChatMode[]): void;
    getCustomChatModes(token: CancellationToken): Promise<readonly ICustomChatMode[]>;
    getSyntaxParserFor(_model: any): any;
    listPromptFiles(_type: any): Promise<readonly any[]>;
    getSourceFolders(_type: any): readonly any[];
    asPromptSlashCommand(_command: string): any;
    resolvePromptSlashCommand(_data: any, _token: CancellationToken): Promise<any>;
    findPromptSlashCommands(): Promise<any[]>;
    parse(_uri: URI, _type: any, _token: CancellationToken): Promise<any>;
    getPromptFileType(_resource: URI): any;
    dispose(): void;
}
//# sourceMappingURL=mockPromptsService.d.ts.map