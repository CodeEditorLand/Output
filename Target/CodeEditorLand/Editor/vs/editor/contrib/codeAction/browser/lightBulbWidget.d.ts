import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";

import "./lightBulbWidget.css";

import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import {
	ICodeEditor,
	IContentWidget,
	IContentWidgetPosition,
} from "../../../browser/editorBrowser.js";
import { IPosition } from "../../../common/core/position.js";
import { CodeActionSet, CodeActionTrigger } from "../common/types.js";

export declare class LightBulbWidget
	extends Disposable
	implements IContentWidget
{
	private readonly _editor;
	private readonly _keybindingService;
	private _gutterDecorationID;
	private static readonly GUTTER_DECORATION;
	static readonly ID = "editor.contrib.lightbulbWidget";
	private static readonly _posPref;
	private readonly _domNode;
	private readonly _onClick;
	readonly onClick: Event<{
		readonly x: number;
		readonly y: number;
		readonly actions: CodeActionSet;
		readonly trigger: CodeActionTrigger;
	}>;
	private _state;
	private _gutterState;
	private _iconClasses;
	private readonly lightbulbClasses;
	private _preferredKbLabel?;
	private _quickFixKbLabel?;
	private gutterDecoration;
	constructor(_editor: ICodeEditor, _keybindingService: IKeybindingService);
	dispose(): void;
	getId(): string;
	getDomNode(): HTMLElement;
	getPosition(): IContentWidgetPosition | null;
	update(
		actions: CodeActionSet,
		trigger: CodeActionTrigger,
		atPosition: IPosition,
	): void;
	hide(): void;
	gutterHide(): void;
	private get state();
	private set state(value);
	private get gutterState();
	private set gutterState(value);
	private _updateLightBulbTitleAndIcon;
	private _updateGutterLightBulbTitleAndIcon;
	private renderGutterLightbub;
	private _addGutterDecoration;
	private _removeGutterDecoration;
	private _updateGutterDecoration;
	private _updateLightbulbTitle;
	private set title(value);
}
