import {
	ITreeFilter,
	TreeFilterResult,
	TreeVisibility,
} from "../../../../base/browser/ui/tree/tree.js";
import { matchesFuzzy } from "../../../../base/common/filters.js";
import { IReplElement } from "../common/debug.js";

export declare class ReplFilter implements ITreeFilter<IReplElement> {
	static matchQuery: typeof matchesFuzzy;
	private _parsedQueries;
	set filterQuery(query: string);
	filter(
		element: IReplElement,
		parentVisibility: TreeVisibility,
	): TreeFilterResult<void>;
}
