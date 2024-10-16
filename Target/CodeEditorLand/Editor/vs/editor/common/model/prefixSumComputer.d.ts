export declare class PrefixSumComputer {
	/**
	 * values[i] is the value at index i
	 */
	private values;
	/**
	 * prefixSum[i] = SUM(heights[j]), 0 <= j <= i
	 */
	private prefixSum;
	/**
	 * prefixSum[i], 0 <= i <= prefixSumValidIndex can be trusted
	 */
	private readonly prefixSumValidIndex;
	constructor(values: Uint32Array);
	getCount(): number;
	insertValues(insertIndex: number, insertValues: Uint32Array): boolean;
	setValue(index: number, value: number): boolean;
	removeValues(startIndex: number, count: number): boolean;
	getTotalSum(): number;
	/**
	 * Returns the sum of the first `index + 1` many items.
	 * @returns `SUM(0 <= j <= index, values[j])`.
	 */
	getPrefixSum(index: number): number;
	private _getPrefixSum;
	getIndexOf(sum: number): PrefixSumIndexOfResult;
}
/**
 * {@link getIndexOf} has an amortized runtime complexity of O(1).
 *
 * ({@link PrefixSumComputer.getIndexOf} is just  O(log n))
 */
export declare class ConstantTimePrefixSumComputer {
	private _values;
	private _isValid;
	private _validEndIndex;
	/**
	 * _prefixSum[i] = SUM(values[j]), 0 <= j <= i
	 */
	private _prefixSum;
	/**
	 * _indexBySum[sum] = idx => _prefixSum[idx - 1] <= sum < _prefixSum[idx]
	 */
	private _indexBySum;
	constructor(values: number[]);
	/**
	 * @returns SUM(0 <= j < values.length, values[j])
	 */
	getTotalSum(): number;
	/**
	 * Returns the sum of the first `count` many items.
	 * @returns `SUM(0 <= j < count, values[j])`.
	 */
	getPrefixSum(count: number): number;
	/**
	 * @returns `result`, such that `getPrefixSum(result.index) + result.remainder = sum`
	 */
	getIndexOf(sum: number): PrefixSumIndexOfResult;
	removeValues(start: number, deleteCount: number): void;
	insertValues(insertIndex: number, insertArr: number[]): void;
	private _invalidate;
	private _ensureValid;
	setValue(index: number, value: number): void;
}
export declare class PrefixSumIndexOfResult {
	readonly index: number;
	readonly remainder: number;
	_prefixSumIndexOfResultBrand: void;
	constructor(index: number, remainder: number);
}
