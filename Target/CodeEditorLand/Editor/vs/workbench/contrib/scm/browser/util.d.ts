import {
	ActionBar,
	IActionViewItemProvider,
} from "../../../../base/browser/ui/actionbar/actionbar.js";
import { Action, IAction } from "../../../../base/common/actions.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { IResourceNode } from "../../../../base/common/resourceTree.js";
import { Command } from "../../../../editor/common/languages.js";
import { IMenu } from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import {
	ISCMHistoryItem,
	ISCMHistoryItemRef,
	SCMHistoryItemLoadMoreTreeElement,
	SCMHistoryItemViewModelTreeElement,
} from "../common/history.js";
import {
	ISCMActionButton,
	ISCMInput,
	ISCMProvider,
	ISCMRepository,
	ISCMResource,
	ISCMResourceGroup,
	ISCMViewService,
} from "../common/scm.js";

export declare function isSCMViewService(
	element: any,
): element is ISCMViewService;
export declare function isSCMRepository(
	element: any,
): element is ISCMRepository;
export declare function isSCMInput(element: any): element is ISCMInput;
export declare function isSCMActionButton(
	element: any,
): element is ISCMActionButton;
export declare function isSCMResourceGroup(
	element: any,
): element is ISCMResourceGroup;
export declare function isSCMResource(element: any): element is ISCMResource;
export declare function isSCMResourceNode(
	element: any,
): element is IResourceNode<ISCMResource, ISCMResourceGroup>;
export declare function isSCMHistoryItemViewModelTreeElement(
	element: any,
): element is SCMHistoryItemViewModelTreeElement;
export declare function isSCMHistoryItemLoadMoreTreeElement(
	element: any,
): element is SCMHistoryItemLoadMoreTreeElement;
export declare function connectPrimaryMenu(
	menu: IMenu,
	callback: (primary: IAction[], secondary: IAction[]) => void,
	primaryGroup?: string,
): IDisposable;
export declare function connectPrimaryMenuToInlineActionBar(
	menu: IMenu,
	actionBar: ActionBar,
): IDisposable;
export declare function collectContextMenuActions(menu: IMenu): IAction[];
export declare class StatusBarAction extends Action {
	private command;
	private commandService;
	constructor(command: Command, commandService: ICommandService);
	run(): Promise<void>;
}
export declare function getActionViewItemProvider(
	instaService: IInstantiationService,
): IActionViewItemProvider;
export declare function getProviderKey(provider: ISCMProvider): string;
export declare function getRepositoryResourceCount(
	provider: ISCMProvider,
): number;
export declare function getHistoryItemEditorTitle(
	historyItem: ISCMHistoryItem,
	maxLength?: number,
): string;
export declare function compareHistoryItemRefs(
	ref1: ISCMHistoryItemRef,
	ref2: ISCMHistoryItemRef,
	currentHistoryItemRef?: ISCMHistoryItemRef,
	currentHistoryItemRemoteRef?: ISCMHistoryItemRef,
	currentHistoryItemBaseRef?: ISCMHistoryItemRef,
): number;
