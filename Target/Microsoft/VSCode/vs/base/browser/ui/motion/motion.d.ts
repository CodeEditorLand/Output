import './motion.css';
/**
 * A pre-parsed cubic bezier easing curve that can be evaluated directly
 * without reparsing a CSS string on every frame.
 *
 * Given control points `(x1, y1)` and `(x2, y2)` (the CSS `cubic-bezier`
 * parameters), {@link solve} finds the bezier parameter `u` such that
 * `Bx(u) = t` using Newton's method, then returns `By(u)`.
 */
export declare class CubicBezierCurve {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number);
    /**
     * Evaluate the curve at time `t` (0-1), returning the eased value.
     */
    solve(t: number): number;
    /**
     * Returns the CSS `cubic-bezier(…)` string representation, for use in
     * CSS `transition` or `animation` properties.
     */
    toCssString(): string;
}
/**
 * Fluent 2 ease-out curve - default for entrances and expansions.
 * Starts fast and decelerates to a stop.
 */
export declare const EASE_OUT: CubicBezierCurve;
/**
 * Fluent 2 ease-in curve - for exits and collapses.
 * Starts slow and accelerates out.
 */
export declare const EASE_IN: CubicBezierCurve;
/**
 * Parses a CSS `cubic-bezier(x1, y1, x2, y2)` string into a
 * {@link CubicBezierCurve}. Returns a linear curve on parse failure.
 */
export declare function parseCubicBezier(css: string): CubicBezierCurve;
/**
 * Scales a base animation duration proportionally to the pixel distance
 * being animated, so that perceived velocity stays constant regardless of
 * panel width.
 *
 * @param baseDuration The duration (ms) that applies at {@link REFERENCE_DISTANCE} pixels.
 * @param pixelDistance The actual number of pixels the view will resize.
 * @returns The scaled duration, clamped to [{@link MIN_DURATION}, {@link MAX_DURATION}].
 */
export declare function scaleDuration(baseDuration: number, pixelDistance: number): number;
/**
 * Checks whether motion is reduced by looking for the `monaco-reduce-motion`
 * class on an ancestor element. This integrates with VS Code's existing
 * accessibility infrastructure in {@link AccessibilityService}.
 */
export declare function isMotionReduced(element: HTMLElement): boolean;
