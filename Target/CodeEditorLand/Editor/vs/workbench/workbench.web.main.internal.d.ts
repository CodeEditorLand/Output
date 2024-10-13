import "./workbench.common.main.js";
import "./browser/parts/dialogs/dialog.web.contribution.js";
import "./browser/web.main.js";
import "./services/integrity/browser/integrityService.js";
import "./services/search/browser/searchService.js";
import "./services/textfile/browser/browserTextFileService.js";
import "./services/keybinding/browser/keyboardLayoutService.js";
import "./services/extensions/browser/extensionService.js";
import "./services/extensionManagement/browser/extensionsProfileScannerService.js";
import "./services/extensions/browser/extensionsScannerService.js";
import "./services/extensionManagement/browser/webExtensionsScannerService.js";
import "./services/extensionManagement/common/extensionManagementServerService.js";
import "./services/telemetry/browser/telemetryService.js";
import "./services/url/browser/urlService.js";
import "./services/update/browser/updateService.js";
import "./services/workspaces/browser/workspacesService.js";
import "./services/workspaces/browser/workspaceEditingService.js";
import "./services/dialogs/browser/fileDialogService.js";
import "./services/host/browser/browserHostService.js";
import "./services/lifecycle/browser/lifecycleService.js";
import "./services/clipboard/browser/clipboardService.js";
import "./services/localization/browser/localeService.js";
import "./services/path/browser/pathService.js";
import "./services/themes/browser/browserHostColorSchemeService.js";
import "./services/encryption/browser/encryptionService.js";
import "./services/secrets/browser/secretStorageService.js";
import "./services/workingCopy/browser/workingCopyBackupService.js";
import "./services/tunnel/browser/tunnelService.js";
import "./services/files/browser/elevatedFileService.js";
import "./services/workingCopy/browser/workingCopyHistoryService.js";
import "./services/userDataSync/browser/webUserDataSyncEnablementService.js";
import "./services/userDataProfile/browser/userDataProfileStorageService.js";
import "./services/configurationResolver/browser/configurationResolverService.js";
import "../platform/extensionResourceLoader/browser/extensionResourceLoaderService.js";
import "./services/auxiliaryWindow/browser/auxiliaryWindowService.js";

import { LogLevel } from "../platform/log/common/log.js";

import "./contrib/logs/browser/logs.contribution.js";
import "./contrib/localization/browser/localization.contribution.js";
import "./contrib/performance/browser/performance.web.contribution.js";
import "./contrib/preferences/browser/keyboardLayoutPicker.js";
import "./contrib/debug/browser/extensionHostDebugService.js";
import "./contrib/welcomeBanner/browser/welcomeBanner.contribution.js";
import "./contrib/welcomeDialog/browser/welcomeDialog.contribution.js";
import "./contrib/webview/browser/webview.web.contribution.js";
import "./contrib/extensions/browser/extensions.web.contribution.js";
import "./contrib/terminal/browser/terminal.web.contribution.js";
import "./contrib/externalTerminal/browser/externalTerminal.contribution.js";
import "./contrib/terminal/browser/terminalInstanceService.js";
import "./contrib/tasks/browser/taskService.js";
import "./contrib/tags/browser/workspaceTagsService.js";
import "./contrib/issue/browser/issue.contribution.js";
import "./contrib/splash/browser/splash.contribution.js";
import "./contrib/remote/browser/remoteStartEntry.contribution.js";

import { Emitter, Event } from "../base/common/event.js";
import { Disposable } from "../base/common/lifecycle.js";
import { URI } from "../base/common/uri.js";
import {
	RemoteAuthorityResolverError,
	RemoteAuthorityResolverErrorCode,
} from "../platform/remote/common/remoteAuthorityResolver.js";
import { Menu } from "./browser/web.api.js";
import {
	commands,
	create,
	env,
	logger,
	window,
	workspace,
} from "./browser/web.factory.js";
import { GroupOrientation } from "./services/editor/common/editorGroupsService.js";

export {
	create,
	URI,
	Event,
	Emitter,
	Disposable,
	GroupOrientation,
	LogLevel,
	RemoteAuthorityResolverError,
	RemoteAuthorityResolverErrorCode,
	env,
	window,
	workspace,
	commands,
	logger,
	Menu,
};
