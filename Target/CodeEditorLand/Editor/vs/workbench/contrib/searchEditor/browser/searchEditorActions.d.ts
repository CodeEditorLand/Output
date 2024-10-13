import "./media/searchEditor.css";

import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { SearchResult } from "../../search/browser/searchModel.js";
import { OpenSearchEditorArgs } from "./searchEditor.contribution.js";

export declare const toggleSearchEditorCaseSensitiveCommand: (
	accessor: ServicesAccessor,
) => void;
export declare const toggleSearchEditorWholeWordCommand: (
	accessor: ServicesAccessor,
) => void;
export declare const toggleSearchEditorRegexCommand: (
	accessor: ServicesAccessor,
) => void;
export declare const toggleSearchEditorContextLinesCommand: (
	accessor: ServicesAccessor,
) => void;
export declare const modifySearchEditorContextLinesCommand: (
	accessor: ServicesAccessor,
	increase: boolean,
) => void;
export declare const selectAllSearchEditorMatchesCommand: (
	accessor: ServicesAccessor,
) => void;
export declare function openSearchEditor(
	accessor: ServicesAccessor,
): Promise<void>;
export declare const openNewSearchEditor: (
	accessor: ServicesAccessor,
	_args?: OpenSearchEditorArgs,
	toSide?: boolean,
) => Promise<void>;
export declare const createEditorFromSearchResult: (
	accessor: ServicesAccessor,
	searchResult: SearchResult,
	rawIncludePattern: string,
	rawExcludePattern: string,
	onlySearchInOpenEditors: boolean,
) => Promise<void>;
