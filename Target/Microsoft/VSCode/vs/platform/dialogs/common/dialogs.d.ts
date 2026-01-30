export class AbstractDialogHandler {
    getConfirmationButtons(dialog: any): any[];
    getPromptButtons(dialog: any): any[];
    getInputButtons(dialog: any): any[];
    getButtons(dialog: any, kind: any): any[];
    getDialogType(type: any): string | undefined;
    getPromptResult(prompt: any, buttonIndex: any, checkboxChecked: any): {
        result: any;
        checkboxChecked: any;
    };
}
export var ConfirmResult: any;
export const IDialogService: any;
export const IFileDialogService: any;
export function getFileNamesMessage(fileNamesOrResources: any): string;
export function massageMessageBoxOptions(options: any, productService: any): {
    options: any;
    buttonIndeces: any;
};
//# sourceMappingURL=dialogs.d.ts.map