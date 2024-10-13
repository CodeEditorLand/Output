import "./overlayWidgets.css";

import { FastDomNode } from "../../../../base/browser/fastDomNode.js";
import * as viewEvents from "../../../common/viewEvents.js";
import { ViewContext } from "../../../common/viewModel/viewContext.js";
import { IOverlayWidget, IOverlayWidgetPosition } from "../../editorBrowser.js";
import {
	RenderingContext,
	RestrictedRenderingContext,
} from "../../view/renderingContext.js";
import { ViewPart } from "../../view/viewPart.js";

export declare class ViewOverlayWidgets extends ViewPart {
	private readonly _viewDomNode;
	private _widgets;
	private _viewDomNodeRect;
	private readonly _domNode;
	readonly overflowingOverlayWidgetsDomNode: FastDomNode<HTMLElement>;
	private _verticalScrollbarWidth;
	private _minimapWidth;
	private _horizontalScrollbarHeight;
	private _editorHeight;
	private _editorWidth;
	constructor(context: ViewContext, viewDomNode: FastDomNode<HTMLElement>);
	dispose(): void;
	getDomNode(): FastDomNode<HTMLElement>;
	onConfigurationChanged(
		e: viewEvents.ViewConfigurationChangedEvent,
	): boolean;
	addWidget(widget: IOverlayWidget): void;
	setWidgetPosition(
		widget: IOverlayWidget,
		position: IOverlayWidgetPosition | null,
	): boolean;
	removeWidget(widget: IOverlayWidget): void;
	private _updateMaxMinWidth;
	private _renderWidget;
	prepareRender(ctx: RenderingContext): void;
	render(ctx: RestrictedRenderingContext): void;
}
