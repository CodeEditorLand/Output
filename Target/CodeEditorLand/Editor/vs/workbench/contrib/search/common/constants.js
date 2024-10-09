/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
export const SearchContext = {
    SearchViewVisibleKey: new RawContextKey('searchViewletVisible', true),
    SearchViewFocusedKey: new RawContextKey('searchViewletFocus', false),
    InputBoxFocusedKey: new RawContextKey('inputBoxFocus', false),
    SearchInputBoxFocusedKey: new RawContextKey('searchInputBoxFocus', false),
    ReplaceInputBoxFocusedKey: new RawContextKey('replaceInputBoxFocus', false),
    PatternIncludesFocusedKey: new RawContextKey('patternIncludesInputBoxFocus', false),
    PatternExcludesFocusedKey: new RawContextKey('patternExcludesInputBoxFocus', false),
    ReplaceActiveKey: new RawContextKey('replaceActive', false),
    HasSearchResults: new RawContextKey('hasSearchResult', false),
    FirstMatchFocusKey: new RawContextKey('firstMatchFocus', false),
    FileMatchOrMatchFocusKey: new RawContextKey('fileMatchOrMatchFocus', false), // This is actually, Match or File or Folder
    FileMatchOrFolderMatchFocusKey: new RawContextKey('fileMatchOrFolderMatchFocus', false),
    FileMatchOrFolderMatchWithResourceFocusKey: new RawContextKey('fileMatchOrFolderMatchWithResourceFocus', false), // Excludes "Other files"
    FileFocusKey: new RawContextKey('fileMatchFocus', false),
    FolderFocusKey: new RawContextKey('folderMatchFocus', false),
    ResourceFolderFocusKey: new RawContextKey('folderMatchWithResourceFocus', false),
    IsEditableItemKey: new RawContextKey('isEditableItem', true),
    MatchFocusKey: new RawContextKey('matchFocus', false),
    ViewHasSearchPatternKey: new RawContextKey('viewHasSearchPattern', false),
    ViewHasReplacePatternKey: new RawContextKey('viewHasReplacePattern', false),
    ViewHasFilePatternKey: new RawContextKey('viewHasFilePattern', false),
    ViewHasSomeCollapsibleKey: new RawContextKey('viewHasSomeCollapsibleResult', false),
    InTreeViewKey: new RawContextKey('inTreeView', false),
    hasAIResultProvider: new RawContextKey('hasAIResultProviderKey', false),
};
