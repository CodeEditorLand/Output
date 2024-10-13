import type * as vscode from "vscode";

import { CancellationToken } from "../../../base/common/cancellation.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../platform/log/common/log.js";
import { ITreeItem } from "../../common/views.js";
import {
	CheckboxUpdate,
	DataTransferDTO,
	ExtHostTreeViewsShape,
	MainThreadTreeViewsShape,
} from "./extHost.protocol.js";
import { ExtHostCommands } from "./extHostCommands.js";

export declare class ExtHostTreeViews
	extends Disposable
	implements ExtHostTreeViewsShape
{
	private _proxy;
	private commands;
	private logService;
	private treeViews;
	private treeDragAndDropService;
	constructor(
		_proxy: MainThreadTreeViewsShape,
		commands: ExtHostCommands,
		logService: ILogService,
	);
	registerTreeDataProvider<T>(
		id: string,
		treeDataProvider: vscode.TreeDataProvider<T>,
		extension: IExtensionDescription,
	): vscode.Disposable;
	createTreeView<T>(
		viewId: string,
		options: vscode.TreeViewOptions<T>,
		extension: IExtensionDescription,
	): vscode.TreeView<T>;
	$getChildren(
		treeViewId: string,
		treeItemHandle?: string,
	): Promise<ITreeItem[] | undefined>;
	$handleDrop(
		destinationViewId: string,
		requestId: number,
		treeDataTransferDTO: DataTransferDTO,
		targetItemHandle: string | undefined,
		token: CancellationToken,
		operationUuid?: string,
		sourceViewId?: string,
		sourceTreeItemHandles?: string[],
	): Promise<void>;
	private addAdditionalTransferItems;
	$handleDrag(
		sourceViewId: string,
		sourceTreeItemHandles: string[],
		operationUuid: string,
		token: CancellationToken,
	): Promise<DataTransferDTO | undefined>;
	$hasResolve(treeViewId: string): Promise<boolean>;
	$resolve(
		treeViewId: string,
		treeItemHandle: string,
		token: vscode.CancellationToken,
	): Promise<ITreeItem | undefined>;
	$setExpanded(
		treeViewId: string,
		treeItemHandle: string,
		expanded: boolean,
	): void;
	$setSelectionAndFocus(
		treeViewId: string,
		selectedHandles: string[],
		focusedHandle: string,
	): void;
	$setVisible(treeViewId: string, isVisible: boolean): void;
	$changeCheckboxState(
		treeViewId: string,
		checkboxUpdate: CheckboxUpdate[],
	): void;
	private createExtHostTreeView;
	private convertArgument;
}
