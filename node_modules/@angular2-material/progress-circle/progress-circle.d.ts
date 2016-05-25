/**
 * <md-progress-circle> component.
 */
export declare class MdProgressCircle {
    /**
     * Value of the progress circle.
     *
     * Input:number, defaults to 0.
     * _value is bound to the host as the attribute aria-valuenow.
     */
    _value: number;
    /**
     * Mode of the progress circle
     *
     * Input must be one of the values from ProgressMode, defaults to 'determinate'.
     * mode is bound to the host as the attribute host.
     */
    mode: 'determinate' | 'indeterminate';
    /**
     * Gets the current stroke dash offset to represent the progress circle.
     *
     * The stroke dash offset specifies the distance between dashes in the circle's stroke.
     * Setting the offset to a percentage of the total circumference of the circle, fills this
     * percentage of the overall circumference of the circle.
     */
    strokeDashOffset(): number;
    /** Gets the progress value, returning the clamped value. */
    /** Sets the progress value, clamping before setting the internal value. */
    value: number;
    /** Clamps a value to be between 0 and 100. */
    static clamp(v: number): number;
}
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-circle> instance.
 */
export declare class MdSpinner extends MdProgressCircle {
    constructor();
}
