import { Disposable } from "../../../../base/common/lifecycle.js";

import "./parameterHints.css";

import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import {
	ICodeEditor,
	IContentWidget,
	IContentWidgetPosition,
} from "../../../browser/editorBrowser.js";
import * as languages from "../../../common/languages.js";
import { ILanguageService } from "../../../common/languages/language.js";
import { ParameterHintsModel } from "./parameterHintsModel.js";

export declare class ParameterHintsWidget
	extends Disposable
	implements IContentWidget
{
	private readonly editor;
	private readonly model;
	private readonly telemetryService;
	private static readonly ID;
	private readonly markdownRenderer;
	private readonly renderDisposeables;
	private readonly keyVisible;
	private readonly keyMultipleSignatures;
	private domNodes?;
	private visible;
	private announcedLabel;
	allowEditorOverflow: boolean;
	constructor(
		editor: ICodeEditor,
		model: ParameterHintsModel,
		contextKeyService: IContextKeyService,
		openerService: IOpenerService,
		languageService: ILanguageService,
		telemetryService: ITelemetryService,
	);
	private createParameterHintDOMNodes;
	show(): void;
	hide(): void;
	getPosition(): IContentWidgetPosition | null;
	render(hints: languages.SignatureHelp): void;
	private renderMarkdownDocs;
	private hasDocs;
	private renderParameters;
	private getParameterLabelOffsets;
	next(): void;
	previous(): void;
	getDomNode(): HTMLElement;
	getId(): string;
	private updateMaxHeight;
}
