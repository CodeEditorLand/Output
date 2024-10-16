/**
 * Map of minimap scales to prebaked sample data at those scales. We don't
 * sample much larger data, because then font family becomes visible, which
 * is use-configurable.
 */
export declare const prebakedMiniMaps: {
	[scale: number]: () => Uint8ClampedArray;
};
