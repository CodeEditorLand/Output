export namespace EXTENSION_DEVELOPMENT_EMPTY_WINDOW_WORKSPACE {
    let id: string;
}
export const IWorkspaceContextService: any;
export const STANDALONE_EDITOR_WORKSPACE_ID: "4064f6ec-cb38-4ad0-af64-ee6467e63c82";
export namespace UNKNOWN_EMPTY_WINDOW_WORKSPACE {
    let id_1: string;
    export { id_1 as id };
}
export const UNTITLED_WORKSPACE_NAME: "workspace.json";
export const WORKSPACE_EXTENSION: "code-workspace";
export const WORKSPACE_FILTER: {
    name: any;
    extensions: string[];
}[];
export const WORKSPACE_SUFFIX: ".code-workspace";
export var WorkbenchState: any;
export class Workspace {
    constructor(_id: any, folders: any, _transient: any, _configuration: any, ignorePathCasing: any);
    set folders(folders: any);
    get folders(): any;
    _folders: any;
    _id: any;
    _transient: any;
    _configuration: any;
    ignorePathCasing: any;
    foldersMap: TernarySearchTree;
    update(workspace: any): void;
    get id(): any;
    get transient(): any;
    set configuration(configuration: any);
    get configuration(): any;
    getFolder(resource: any): any;
    updateFoldersMap(): void;
    toJSON(): {
        id: any;
        folders: any;
        transient: any;
        configuration: any;
    };
}
export class WorkspaceFolder {
    constructor(data: any, raw: any);
    raw: any;
    uri: any;
    index: any;
    name: any;
    toResource(relativePath: any): any;
    toJSON(): {
        uri: any;
        name: any;
        index: any;
    };
}
export function hasWorkspaceFileExtension(path: any): boolean;
export function isEmptyWorkspaceIdentifier(obj: any): boolean;
export function isSavedWorkspace(path: any, environmentService: any): boolean;
export function isSingleFolderWorkspaceIdentifier(obj: any): boolean;
export function isStandaloneEditorWorkspace(workspace: any): boolean;
export function isTemporaryWorkspace(arg1: any): boolean;
export function isUntitledWorkspace(path: any, environmentService: any): boolean;
export function isWorkspace(thing: any): boolean;
export function isWorkspaceFolder(thing: any): boolean;
export function isWorkspaceIdentifier(obj: any): boolean;
export function reviveIdentifier(identifier: any): {
    id: any;
    uri: any;
    configPath?: never;
} | {
    id: any;
    configPath: any;
    uri?: never;
} | {
    id: any;
    uri?: never;
    configPath?: never;
} | undefined;
export function toWorkspaceFolder(resource: any): WorkspaceFolder;
export function toWorkspaceIdentifier(arg0: any, isExtensionDevelopment: any): {
    id: any;
    configPath?: never;
    uri?: never;
} | {
    id: any;
    configPath: any;
    uri?: never;
} | {
    id: any;
    uri: any;
    configPath?: never;
};
import { TernarySearchTree } from "../../../base/common/ternarySearchTree.js";
//# sourceMappingURL=workspace.d.ts.map