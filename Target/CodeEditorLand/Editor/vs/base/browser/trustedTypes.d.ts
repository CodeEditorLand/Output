export declare function createTrustedTypesPolicy<
	Options extends TrustedTypePolicyOptions,
>(
	policyName: string,
	policyOptions?: Options,
):
	| undefined
	| Pick<
			TrustedTypePolicy<Options>,
			"name" | Extract<keyof Options, keyof TrustedTypePolicyOptions>
	  >;
