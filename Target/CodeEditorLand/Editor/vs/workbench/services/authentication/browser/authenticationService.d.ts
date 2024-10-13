import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { ISecretStorageService } from "../../../../platform/secrets/common/secrets.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import {
	AuthenticationProviderInformation,
	AuthenticationSession,
	AuthenticationSessionAccount,
	AuthenticationSessionsChangeEvent,
	IAuthenticationCreateSessionOptions,
	IAuthenticationProvider,
	IAuthenticationService,
} from "../common/authentication.js";
import { IAuthenticationAccessService } from "./authenticationAccessService.js";

export declare function getAuthenticationProviderActivationEvent(
	id: string,
): string;
export type AuthenticationSessionInfo = {
	readonly id: string;
	readonly accessToken: string;
	readonly providerId: string;
	readonly canSignOut?: boolean;
};
export declare function getCurrentAuthenticationSessionInfo(
	secretStorageService: ISecretStorageService,
	productService: IProductService,
): Promise<AuthenticationSessionInfo | undefined>;
export declare class AuthenticationService
	extends Disposable
	implements IAuthenticationService
{
	private readonly _extensionService;
	private readonly _environmentService;
	readonly _serviceBrand: undefined;
	private _onDidRegisterAuthenticationProvider;
	readonly onDidRegisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
	private _onDidUnregisterAuthenticationProvider;
	readonly onDidUnregisterAuthenticationProvider: Event<AuthenticationProviderInformation>;
	private _onDidChangeSessions;
	readonly onDidChangeSessions: Event<{
		providerId: string;
		label: string;
		event: AuthenticationSessionsChangeEvent;
	}>;
	private _onDidChangeDeclaredProviders;
	readonly onDidChangeDeclaredProviders: Event<void>;
	private _authenticationProviders;
	private _authenticationProviderDisposables;
	constructor(
		_extensionService: IExtensionService,
		authenticationAccessService: IAuthenticationAccessService,
		_environmentService: IBrowserWorkbenchEnvironmentService,
	);
	private _declaredProviders;
	get declaredProviders(): AuthenticationProviderInformation[];
	private _registerEnvContributedAuthenticationProviders;
	registerDeclaredAuthenticationProvider(
		provider: AuthenticationProviderInformation,
	): void;
	unregisterDeclaredAuthenticationProvider(id: string): void;
	isAuthenticationProviderRegistered(id: string): boolean;
	registerAuthenticationProvider(
		id: string,
		authenticationProvider: IAuthenticationProvider,
	): void;
	unregisterAuthenticationProvider(id: string): void;
	getProviderIds(): string[];
	getProvider(id: string): IAuthenticationProvider;
	getAccounts(
		id: string,
	): Promise<ReadonlyArray<AuthenticationSessionAccount>>;
	getSessions(
		id: string,
		scopes?: string[],
		account?: AuthenticationSessionAccount,
		activateImmediate?: boolean,
	): Promise<ReadonlyArray<AuthenticationSession>>;
	createSession(
		id: string,
		scopes: string[],
		options?: IAuthenticationCreateSessionOptions,
	): Promise<AuthenticationSession>;
	removeSession(id: string, sessionId: string): Promise<void>;
	private tryActivateProvider;
}
