import { IDisposable } from "../../../../base/common/lifecycle.js";
import {
	IChatCodeBlockContextProviderService,
	ICodeBlockActionContextProvider,
} from "./chat.js";

export declare class ChatCodeBlockContextProviderService
	implements IChatCodeBlockContextProviderService
{
	_serviceBrand: undefined;
	private readonly _providers;
	get providers(): ICodeBlockActionContextProvider[];
	registerProvider(
		provider: ICodeBlockActionContextProvider,
		id: string,
	): IDisposable;
}
