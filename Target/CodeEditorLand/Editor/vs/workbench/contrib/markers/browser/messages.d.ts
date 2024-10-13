import * as nls from "../../../../nls.js";
import { ILocalizedString } from "../../../../platform/action/common/action.js";
import { IRelatedInformation } from "../../../../platform/markers/common/markers.js";
import { Marker } from "./markersModel.js";

export default class Messages {
	static MARKERS_PANEL_TOGGLE_LABEL: string;
	static MARKERS_PANEL_SHOW_LABEL: nls.ILocalizedString;
	static PROBLEMS_PANEL_CONFIGURATION_TITLE: string;
	static PROBLEMS_PANEL_CONFIGURATION_AUTO_REVEAL: string;
	static PROBLEMS_PANEL_CONFIGURATION_VIEW_MODE: string;
	static PROBLEMS_PANEL_CONFIGURATION_SHOW_CURRENT_STATUS: string;
	static PROBLEMS_PANEL_CONFIGURATION_COMPARE_ORDER: string;
	static PROBLEMS_PANEL_CONFIGURATION_COMPARE_ORDER_SEVERITY: string;
	static PROBLEMS_PANEL_CONFIGURATION_COMPARE_ORDER_POSITION: string;
	static MARKERS_PANEL_TITLE_PROBLEMS: ILocalizedString;
	static MARKERS_PANEL_NO_PROBLEMS_BUILT: string;
	static MARKERS_PANEL_NO_PROBLEMS_ACTIVE_FILE_BUILT: string;
	static MARKERS_PANEL_NO_PROBLEMS_FILTERS: string;
	static MARKERS_PANEL_ACTION_TOOLTIP_MORE_FILTERS: string;
	static MARKERS_PANEL_FILTER_LABEL_SHOW_ERRORS: string;
	static MARKERS_PANEL_FILTER_LABEL_SHOW_WARNINGS: string;
	static MARKERS_PANEL_FILTER_LABEL_SHOW_INFOS: string;
	static MARKERS_PANEL_FILTER_LABEL_EXCLUDED_FILES: string;
	static MARKERS_PANEL_FILTER_LABEL_ACTIVE_FILE: string;
	static MARKERS_PANEL_ACTION_TOOLTIP_FILTER: string;
	static MARKERS_PANEL_ACTION_TOOLTIP_QUICKFIX: string;
	static MARKERS_PANEL_FILTER_ARIA_LABEL: string;
	static MARKERS_PANEL_FILTER_PLACEHOLDER: string;
	static MARKERS_PANEL_FILTER_ERRORS: string;
	static MARKERS_PANEL_FILTER_WARNINGS: string;
	static MARKERS_PANEL_FILTER_INFOS: string;
	static MARKERS_PANEL_SINGLE_ERROR_LABEL: string;
	static readonly MARKERS_PANEL_MULTIPLE_ERRORS_LABEL: (
		noOfErrors: number,
	) => string;
	static MARKERS_PANEL_SINGLE_WARNING_LABEL: string;
	static readonly MARKERS_PANEL_MULTIPLE_WARNINGS_LABEL: (
		noOfWarnings: number,
	) => string;
	static MARKERS_PANEL_SINGLE_INFO_LABEL: string;
	static readonly MARKERS_PANEL_MULTIPLE_INFOS_LABEL: (
		noOfInfos: number,
	) => string;
	static MARKERS_PANEL_SINGLE_UNKNOWN_LABEL: string;
	static readonly MARKERS_PANEL_MULTIPLE_UNKNOWNS_LABEL: (
		noOfUnknowns: number,
	) => string;
	static readonly MARKERS_PANEL_AT_LINE_COL_NUMBER: (
		ln: number,
		col: number,
	) => string;
	static readonly MARKERS_TREE_ARIA_LABEL_RESOURCE: (
		noOfProblems: number,
		fileName: string,
		folder: string,
	) => string;
	static readonly MARKERS_TREE_ARIA_LABEL_MARKER: (marker: Marker) => string;
	static readonly MARKERS_TREE_ARIA_LABEL_RELATED_INFORMATION: (
		relatedInformation: IRelatedInformation,
	) => string;
	static SHOW_ERRORS_WARNINGS_ACTION_LABEL: string;
}
