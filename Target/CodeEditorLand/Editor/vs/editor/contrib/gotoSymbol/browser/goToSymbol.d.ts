import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Position } from "../../../common/core/position.js";
import { LanguageFeatureRegistry } from "../../../common/languageFeatureRegistry.js";
import {
	DeclarationProvider,
	DefinitionProvider,
	ImplementationProvider,
	LocationLink,
	ReferenceProvider,
	TypeDefinitionProvider,
} from "../../../common/languages.js";
import { ITextModel } from "../../../common/model.js";

export declare function getDefinitionsAtPosition(
	registry: LanguageFeatureRegistry<DefinitionProvider>,
	model: ITextModel,
	position: Position,
	recursive: boolean,
	token: CancellationToken,
): Promise<LocationLink[]>;
export declare function getDeclarationsAtPosition(
	registry: LanguageFeatureRegistry<DeclarationProvider>,
	model: ITextModel,
	position: Position,
	recursive: boolean,
	token: CancellationToken,
): Promise<LocationLink[]>;
export declare function getImplementationsAtPosition(
	registry: LanguageFeatureRegistry<ImplementationProvider>,
	model: ITextModel,
	position: Position,
	recursive: boolean,
	token: CancellationToken,
): Promise<LocationLink[]>;
export declare function getTypeDefinitionsAtPosition(
	registry: LanguageFeatureRegistry<TypeDefinitionProvider>,
	model: ITextModel,
	position: Position,
	recursive: boolean,
	token: CancellationToken,
): Promise<LocationLink[]>;
export declare function getReferencesAtPosition(
	registry: LanguageFeatureRegistry<ReferenceProvider>,
	model: ITextModel,
	position: Position,
	compact: boolean,
	recursive: boolean,
	token: CancellationToken,
): Promise<LocationLink[]>;
