import { AfterContentInit, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
import { MdRadioDispatcher } from './radio_dispatcher';
export { MdRadioDispatcher } from './radio_dispatcher';
/** A simple change event emitted by either MdRadioButton or MdRadioGroup. */
export declare class MdRadioChange {
    source: MdRadioButton;
    value: any;
}
export declare class MdRadioGroup implements AfterContentInit, ControlValueAccessor {
    /** The value for the radio group. Should match currently selected button. */
    private _value;
    /** The HTML name attribute applied to radio buttons in this group. */
    private _name;
    /** Disables all individual radio buttons assigned to this group. */
    private _disabled;
    /** The currently selected radio button. Should match value. */
    private _selected;
    /** Change event subscription set up by registerOnChange (ControlValueAccessor). */
    private _changeSubscription;
    onTouched: () => any;
    /** Event emitted when the group value changes. */
    change: EventEmitter<MdRadioChange>;
    /** Child radio buttons. */
    private _radios;
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterContentInit(): void;
    name: string;
    /** Propagate name attribute to radio buttons. */
    private _updateChildRadioNames();
    disabled: boolean;
    value: any;
    private _updateSelectedRadioFromValue();
    /** Dispatch change event with current selection and group value. */
    private _emitChangeEvent();
    selected: MdRadioButton;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any): void;
}
export declare class MdRadioButton implements OnInit {
    radioDispatcher: MdRadioDispatcher;
    private _isFocused;
    /** Whether this radio is checked. */
    private _checked;
    /** The unique ID for the radio button. */
    id: string;
    /** Analog to HTML 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Whether this radio is disabled. */
    private _disabled;
    /** Value assigned to this radio.*/
    private _value;
    /** The parent radio group. May or may not be present. */
    radioGroup: MdRadioGroup;
    /** Event emitted when the group value changes. */
    change: EventEmitter<MdRadioChange>;
    constructor(radioGroup: MdRadioGroup, radioDispatcher: MdRadioDispatcher);
    ngOnInit(): void;
    onInputFocus(): void;
    onInputBlur(): void;
    /** Input change handler, called only on keyboard selection. */
    onInputChange(): void;
    inputId: string;
    checked: boolean;
    /** MdRadioGroup reads this to assign its own value. */
    value: any;
    /** Dispatch change event with current value. */
    private _emitChangeEvent();
    disabled: boolean;
    onClick(event: Event): void;
}
