import { AfterContentInit, SimpleChange, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare class MdInputPlaceholderConflictError extends Error {
    constructor();
}
export declare class MdInputUnsupportedTypeError extends Error {
    constructor(type: string);
}
export declare class MdInputDuplicatedHintError extends Error {
    constructor(align: string);
}
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
export declare class MdPlaceholder {
}
/**
 * The hint directive, used to tag content as hint labels (going under the input).
 */
export declare class MdHint {
    align: 'start' | 'end';
}
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
export declare class MdInput implements ControlValueAccessor, AfterContentInit, OnChanges {
    private _focused;
    private _value;
    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback;
    /**
     * Aria related inputs.
     */
    ariaLabel: string;
    ariaLabelledBy: string;
    ariaDisabled: boolean;
    ariaRequired: boolean;
    ariaInvalid: boolean;
    /**
     * Content directives.
     */
    private _placeholderChild;
    private _hintChildren;
    /** Readonly properties. */
    focused: boolean;
    empty: boolean;
    characterCount: number;
    /**
     * Bindings.
     */
    align: 'start' | 'end';
    dividerColor: 'primary' | 'accent' | 'warn';
    disabled: boolean;
    floatingPlaceholder: boolean;
    hintLabel: string;
    id: string;
    maxLength: number;
    placeholder: string;
    required: boolean;
    spellcheck: boolean;
    type: string;
    value: any;
    private _align;
    /** @internal */
    onFocus(): void;
    /** @internal */
    onBlur(): void;
    /** @internal */
    onChange(ev: Event): void;
    /** @internal */
    hasPlaceholder(): boolean;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /**
     * Convert the value passed in to a value that is expected from the type of the md-input.
     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
     * on our internal input it won't work locally.
     * @private
     */
    private _convertValueForInputType(v);
    /**
     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
     * Constraints for now:
     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
     *   - type attribute is not one of the forbidden types (see constant at the top).
     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
     *     considered as align="start".
     * @private
     */
    private _validateConstraints();
}
export declare const MD_INPUT_DIRECTIVES: any[];
