import * as viewEvents from "../../../common/viewEvents.js";
import { ViewContext } from "../../../common/viewModel/viewContext.js";
import type { ViewGpuContext } from "../../gpu/viewGpuContext.js";
import {
	RenderingContext,
	RestrictedRenderingContext,
} from "../../view/renderingContext.js";
import { ViewPart } from "../../view/viewPart.js";

/**
 * Rulers are vertical lines that appear at certain columns in the editor. There can be >= 0 rulers
 * at a time.
 */
export declare class RulersGpu extends ViewPart {
	private readonly _viewGpuContext;
	private readonly _gpuShapes;
	constructor(context: ViewContext, _viewGpuContext: ViewGpuContext);
	onConfigurationChanged(
		e: viewEvents.ViewConfigurationChangedEvent,
	): boolean;
	prepareRender(ctx: RenderingContext): void;
	render(ctx: RestrictedRenderingContext): void;
	private _updateEntries;
}
