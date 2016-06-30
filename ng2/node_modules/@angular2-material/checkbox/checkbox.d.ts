import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
export declare class MdCheckbox implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
    id: string;
    /** Whether or not the checkbox should come before or after the label. */
    align: 'start' | 'end';
    /**
     * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
     * The correct ARIA attributes are applied to denote this to assistive technology.
     */
    disabled: boolean;
    /**
     * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
     * on the host element will be removed. It will be placed back when the checkbox is re-enabled.
     */
    tabindex: number;
    /** Event emitted when the checkbox's `checked` value changes. */
    change: EventEmitter<boolean>;
    /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
    onTouched: () => any;
    /** Whether the `checked` state has been set to its initial value. */
    private _isInitialized;
    private _currentAnimationClass;
    private _currentCheckState;
    private _checked;
    private _indeterminate;
    private _changeSubscription;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * Whether the checkbox is checked. Note that setting `checked` will immediately set
     * `indeterminate` to false.
     */
    checked: boolean;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
     * false. This differs from the web platform in that indeterminate state on native
     * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
     * `checked` property programmatically). However, we feel that this behavior is more accommodating
     * to the way consumers would envision using this component.
     */
    indeterminate: boolean;
    /** The id that is attached to the checkbox's label. */
    labelId: string;
    /** Returns the proper aria-checked attribute value based on the checkbox's state. */
    getAriaChecked(): string;
    /** Toggles the checked state of the checkbox. If the checkbox is disabled, this does nothing. */
    toggle(): void;
    /**
     * Event handler used for both (click) and (keyup.space) events. Delegates to toggle().
     */
    onInteractionEvent(event: Event): void;
    /**
     * Event handler used for (keydown.space) events. Used to prevent spacebar events from bubbling
     * when the component is focused, which prevents side effects like page scrolling from happening.
     */
    onSpaceDown(evt: Event): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any): void;
    private _transitionCheckState(newState);
    private _getAnimationClassForCheckStateTransition(oldState, newState);
}
