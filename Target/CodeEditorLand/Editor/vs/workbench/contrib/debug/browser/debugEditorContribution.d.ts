import { IMouseEvent } from "../../../../base/browser/mouseEvent.js";
import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { Position } from "../../../../editor/common/core/position.js";
import { ILanguageFeatureDebounceService } from "../../../../editor/common/services/languageFeatureDebounce.js";
import { ILanguageFeaturesService } from "../../../../editor/common/services/languageFeatures.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IDebugEditorContribution, IDebugService } from "../common/debug.js";

export declare const debugInlineForeground: string;
export declare const debugInlineBackground: string;
export declare class DebugEditorContribution
	implements IDebugEditorContribution
{
	private editor;
	private readonly debugService;
	private readonly instantiationService;
	private readonly commandService;
	private readonly configurationService;
	private readonly hostService;
	private readonly uriIdentityService;
	private readonly languageFeaturesService;
	private toDispose;
	private hoverWidget;
	private hoverPosition?;
	private mouseDown;
	private exceptionWidgetVisible;
	private gutterIsHovered;
	private exceptionWidget;
	private configurationWidget;
	private readonly altListener;
	private altPressed;
	private oldDecorations;
	private readonly displayedStore;
	private editorHoverOptions;
	private readonly debounceInfo;
	private readonly defaultHoverLockout;
	constructor(
		editor: ICodeEditor,
		debugService: IDebugService,
		instantiationService: IInstantiationService,
		commandService: ICommandService,
		configurationService: IConfigurationService,
		hostService: IHostService,
		uriIdentityService: IUriIdentityService,
		contextKeyService: IContextKeyService,
		languageFeaturesService: ILanguageFeaturesService,
		featureDebounceService: ILanguageFeatureDebounceService,
	);
	private registerListeners;
	private _wordToLineNumbersMap;
	private updateHoverConfiguration;
	private addDocumentListeners;
	private applyDocumentListeners;
	showHover(
		position: Position,
		focus: boolean,
		mouseEvent?: IMouseEvent,
	): Promise<void>;
	private preventDefaultEditorHover;
	private showEditorHover;
	private onFocusStackFrame;
	private get hoverDelay();
	private get showHoverScheduler();
	private hideHoverWidget;
	private onEditorMouseDown;
	private onEditorMouseMove;
	private onKeyDown;
	private toggleExceptionWidget;
	private showExceptionWidget;
	closeExceptionWidget(): void;
	addLaunchConfiguration(): Promise<void>;
	private get removeInlineValuesScheduler();
	private get updateInlineValuesScheduler();
	private updateInlineValueDecorations;
	dispose(): void;
}
