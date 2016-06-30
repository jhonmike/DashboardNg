"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
var nextId = 0;
/**
 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor. This allows it
 * to support [(ngModel)] and ngControl.
 */
var MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return MdCheckbox; }),
    multi: true
});
/**
 * Represents the different states that require custom transitions between them.
 */
var TransitionCheckState;
(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
var MdCheckbox = (function () {
    function MdCheckbox(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
        this.id = "md-checkbox-" + ++nextId;
        /** Whether or not the checkbox should come before or after the label. */
        this.align = 'start';
        /**
         * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
         * The correct ARIA attributes are applied to denote this to assistive technology.
         */
        this.disabled = false;
        /**
         * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
         * on the host element will be removed. It will be placed back when the checkbox is re-enabled.
         */
        this.tabindex = 0;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new core_1.EventEmitter();
        /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
        this.onTouched = function () { };
        /** Whether the `checked` state has been set to its initial value. */
        this._isInitialized = false;
        this._currentAnimationClass = '';
        this._currentCheckState = TransitionCheckState.Init;
        this._checked = false;
        this._indeterminate = false;
        this._changeSubscription = null;
    }
    Object.defineProperty(MdCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked. Note that setting `checked` will immediately set
         * `indeterminate` to false.
         */
        get: function () {
            return this._checked;
        },
        set: function (checked) {
            if (checked != this.checked) {
                this._indeterminate = false;
                this._checked = checked;
                this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
                // Only fire a change event if this isn't the first time the checked property is ever set.
                if (this._isInitialized) {
                    this.change.emit(this._checked);
                }
            }
            this._isInitialized = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
         * false. This differs from the web platform in that indeterminate state on native
         * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
         * `checked` property programmatically). However, we feel that this behavior is more accommodating
         * to the way consumers would envision using this component.
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (indeterminate) {
            this._indeterminate = indeterminate;
            if (this._indeterminate) {
                this._transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdCheckbox.prototype, "labelId", {
        /** The id that is attached to the checkbox's label. */
        get: function () {
            return this.id + "-label";
        },
        enumerable: true,
        configurable: true
    });
    /** Returns the proper aria-checked attribute value based on the checkbox's state. */
    MdCheckbox.prototype.getAriaChecked = function () {
        if (this.indeterminate) {
            return 'mixed';
        }
        return this.checked ? 'true' : 'false';
    };
    /** Toggles the checked state of the checkbox. If the checkbox is disabled, this does nothing. */
    MdCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler used for both (click) and (keyup.space) events. Delegates to toggle().
     */
    MdCheckbox.prototype.onInteractionEvent = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.toggle();
    };
    /**
     * Event handler used for (keydown.space) events. Used to prevent spacebar events from bubbling
     * when the component is focused, which prevents side effects like page scrolling from happening.
     */
    MdCheckbox.prototype.onSpaceDown = function (evt) {
        evt.preventDefault();
    };
    /** Implemented as part of ControlValueAccessor. */
    MdCheckbox.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdCheckbox.prototype.registerOnChange = function (fn) {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        this._changeSubscription = this.change.subscribe(fn);
    };
    /** Implemented as part of ControlValueAccessor. */
    MdCheckbox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdCheckbox.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var renderer = this._renderer;
        var elementRef = this._elementRef;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, false);
        }
        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, true);
        }
    };
    MdCheckbox.prototype._getAnimationClassForCheckStateTransition = function (oldState, newState) {
        var animSuffix;
        switch (oldState) {
            case TransitionCheckState.Init:
                // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
                // [checked] bound to it.
                if (newState === TransitionCheckState.Checked) {
                    animSuffix = 'unchecked-checked';
                }
                else {
                    return '';
                }
                break;
            case TransitionCheckState.Unchecked:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case TransitionCheckState.Checked:
                animSuffix = newState === TransitionCheckState.Unchecked ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case TransitionCheckState.Indeterminate:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
        }
        return "md-checkbox-anim-" + animSuffix;
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdCheckbox.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MdCheckbox.prototype, "tabindex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdCheckbox.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdCheckbox.prototype, "indeterminate", null);
    MdCheckbox = __decorate([
        core_1.Component({
            selector: 'md-checkbox',
            template: "\n              <div class=\"md-checkbox-layout\">\n                <div class=\"md-checkbox-inner-container\">\n                  <div class=\"md-checkbox-frame\"></div>\n                  <div class=\"md-checkbox-background\">\n                    <svg version=\"1.1\"\n                         class=\"md-checkbox-checkmark\"\n                         xmlns=\"http://www.w3.org/2000/svg\"\n                         viewBox=\"0 0 24 24\"\n                         xml:space=\"preserve\">\n                      <path class=\"md-checkbox-checkmark-path\"\n                            fill=\"none\"\n                            stroke=\"white\"\n                            d=\"M4.1,12.7 9,17.6 20.3,6.3\"/>\n                    </svg>\n                    <!-- Element for rendering the indeterminate state checkbox. -->\n                    <div class=\"md-checkbox-mixedmark\"></div>\n                  </div>\n                </div>\n                <label [id]=\"labelId\">\n                  <ng-content></ng-content>\n                </label>\n              </div>\n            ",
            styles: ["\n              /** The width/height of the checkbox element. */\n              /** The width of the line used to draw the checkmark / mixedmark. */\n              /** The width of the checkbox border shown when the checkbox is unchecked. */\n              /** The color of the checkbox border. */\n              /** The color of the checkbox's checkmark / mixedmark. */\n              /** The color that is used as the checkbox background when it is checked. */\n              /** The base duration used for the majority of transitions for the checkbox. */\n              /** The amount of spacing between the checkbox and its label. */\n              /**\n               * Fades in the background of the checkbox when it goes from unchecked -> {checked,indeterminate}.\n               */\n              @-webkit-keyframes md-checkbox-fade-in-background {\n                0% {\n                  opacity: 0; }\n                50% {\n                  opacity: 1; } }\n              @keyframes md-checkbox-fade-in-background {\n                0% {\n                  opacity: 0; }\n                50% {\n                  opacity: 1; } }\n\n              /**\n               * Fades out the background of the checkbox when it goes from {checked,indeterminate} -> unchecked.\n               */\n              @-webkit-keyframes md-checkbox-fade-out-background {\n                0%, 50% {\n                  opacity: 1; }\n                100% {\n                  opacity: 0; } }\n              @keyframes md-checkbox-fade-out-background {\n                0%, 50% {\n                  opacity: 1; }\n                100% {\n                  opacity: 0; } }\n\n              /**\n               * \"Draws\" in the checkmark when the checkbox goes from unchecked -> checked.\n               */\n              @-webkit-keyframes md-checkbox-unchecked-checked-checkmark-path {\n                0%, 50% {\n                  stroke-dashoffset: 22.91026; }\n                50% {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); }\n                100% {\n                  stroke-dashoffset: 0; } }\n              @keyframes md-checkbox-unchecked-checked-checkmark-path {\n                0%, 50% {\n                  stroke-dashoffset: 22.91026; }\n                50% {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); }\n                100% {\n                  stroke-dashoffset: 0; } }\n\n              /**\n               * Horizontally expands the mixedmark when the checkbox goes from unchecked -> indeterminate.\n               */\n              @-webkit-keyframes md-checkbox-unchecked-indeterminate-mixedmark {\n                0%, 68.2% {\n                  -webkit-transform: scaleX(0);\n                          transform: scaleX(0); }\n                68.2% {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0, 0, 0, 1); }\n                100% {\n                  -webkit-transform: scaleX(1);\n                          transform: scaleX(1); } }\n              @keyframes md-checkbox-unchecked-indeterminate-mixedmark {\n                0%, 68.2% {\n                  -webkit-transform: scaleX(0);\n                          transform: scaleX(0); }\n                68.2% {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0, 0, 0, 1); }\n                100% {\n                  -webkit-transform: scaleX(1);\n                          transform: scaleX(1); } }\n\n              /**\n               * \"Erases\" the checkmark when the checkbox goes from checked -> unchecked.\n               */\n              @-webkit-keyframes md-checkbox-checked-unchecked-checkmark-path {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n                          animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n                  stroke-dashoffset: 0; }\n                to {\n                  stroke-dashoffset: -22.91026; } }\n              @keyframes md-checkbox-checked-unchecked-checkmark-path {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n                          animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n                  stroke-dashoffset: 0; }\n                to {\n                  stroke-dashoffset: -22.91026; } }\n\n              /**\n               * Rotates and fades out the checkmark when the checkbox goes from checked -> indeterminate. This\n               * animation helps provide the illusion of the checkmark \"morphing\" into the mixedmark.\n               */\n              @-webkit-keyframes md-checkbox-checked-indeterminate-checkmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                to {\n                  opacity: 0;\n                  -webkit-transform: rotate(45deg);\n                          transform: rotate(45deg); } }\n              @keyframes md-checkbox-checked-indeterminate-checkmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                to {\n                  opacity: 0;\n                  -webkit-transform: rotate(45deg);\n                          transform: rotate(45deg); } }\n\n              /**\n               * Rotates and fades the checkmark back into position when the checkbox goes from indeterminate ->\n               * checked. This animation helps provide the illusion that the mixedmark is \"morphing\" into the\n               * checkmark.\n               */\n              @-webkit-keyframes md-checkbox-indeterminate-checked-checkmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                  opacity: 0;\n                  -webkit-transform: rotate(45deg);\n                          transform: rotate(45deg); }\n                to {\n                  opacity: 1;\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n              @keyframes md-checkbox-indeterminate-checked-checkmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                  opacity: 0;\n                  -webkit-transform: rotate(45deg);\n                          transform: rotate(45deg); }\n                to {\n                  opacity: 1;\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n\n              /**\n               * Rotates and fades in the mixedmark when the checkbox goes from checked -> indeterminate. This\n               * animation, similar to md-checkbox-checked-indeterminate-checkmark, helps provide an illusion\n               * of \"morphing\" from checkmark -> mixedmark.\n               */\n              @-webkit-keyframes md-checkbox-checked-indeterminate-mixedmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                  opacity: 0;\n                  -webkit-transform: rotate(-45deg);\n                          transform: rotate(-45deg); }\n                to {\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); } }\n              @keyframes md-checkbox-checked-indeterminate-mixedmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                          animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1);\n                  opacity: 0;\n                  -webkit-transform: rotate(-45deg);\n                          transform: rotate(-45deg); }\n                to {\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); } }\n\n              /**\n               * Rotates and fades out the mixedmark when the checkbox goes from indeterminate -> checked. This\n               * animation, similar to md-checkbox-indeterminate-checked-checkmark, helps provide an illusion\n               * of \"morphing\" from mixedmark -> checkmark.\n               */\n              @-webkit-keyframes md-checkbox-indeterminate-checked-mixedmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                to {\n                  opacity: 0;\n                  -webkit-transform: rotate(315deg);\n                          transform: rotate(315deg); } }\n              @keyframes md-checkbox-indeterminate-checked-mixedmark {\n                from {\n                  -webkit-animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                          animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n                  opacity: 1;\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                to {\n                  opacity: 0;\n                  -webkit-transform: rotate(315deg);\n                          transform: rotate(315deg); } }\n\n              /**\n               * Horizontally collapses and fades out the mixedmark when the checkbox goes from indeterminate ->\n               * unchecked.\n               */\n              @-webkit-keyframes md-checkbox-indeterminate-unchecked-mixedmark {\n                0% {\n                  -webkit-animation-timing-function: linear;\n                          animation-timing-function: linear;\n                  opacity: 1;\n                  -webkit-transform: scaleX(1);\n                          transform: scaleX(1); }\n                32.8%, 100% {\n                  opacity: 0;\n                  -webkit-transform: scaleX(0);\n                          transform: scaleX(0); } }\n              @keyframes md-checkbox-indeterminate-unchecked-mixedmark {\n                0% {\n                  -webkit-animation-timing-function: linear;\n                          animation-timing-function: linear;\n                  opacity: 1;\n                  -webkit-transform: scaleX(1);\n                          transform: scaleX(1); }\n                32.8%, 100% {\n                  opacity: 0;\n                  -webkit-transform: scaleX(0);\n                          transform: scaleX(0); } }\n\n              /**\n               * Applied to elements that cover the checkbox's entire inner container.\n               */\n              .md-checkbox-frame, .md-checkbox-background, .md-checkbox-checkmark {\n                bottom: 0;\n                left: 0;\n                position: absolute;\n                right: 0;\n                top: 0; }\n\n              /**\n               * Applied to elements that are considered \"marks\" within the checkbox, e.g. the checkmark and\n               * the mixedmark.\n               */\n              .md-checkbox-checkmark, .md-checkbox-mixedmark {\n                width: calc(100% - 4px); }\n\n              /**\n               * Applied to elements that appear to make up the outer box of the checkmark, such as the frame\n               * that contains the border and the actual background element that contains the marks.\n               */\n              .md-checkbox-frame, .md-checkbox-background {\n                border-radius: 2px;\n                box-sizing: border-box;\n                pointer-events: none; }\n\n              md-checkbox {\n                cursor: pointer; }\n                md-checkbox:focus {\n                  outline: none; }\n\n              .md-checkbox-layout {\n                -webkit-box-align: baseline;\n                -webkit-align-items: baseline;\n                    -ms-flex-align: baseline;\n                        align-items: baseline;\n                display: -webkit-inline-box;\n                display: -webkit-inline-flex;\n                display: -ms-inline-flexbox;\n                display: inline-flex; }\n\n              .md-checkbox-inner-container {\n                display: inline-block;\n                height: 20px;\n                line-height: 0;\n                margin: auto;\n                margin-right: 8px;\n                -webkit-box-ordinal-group: 1;\n                -webkit-order: 0;\n                    -ms-flex-order: 0;\n                        order: 0;\n                position: relative;\n                vertical-align: middle;\n                white-space: nowrap;\n                width: 20px; }\n                [dir=\"rtl\"] .md-checkbox-inner-container {\n                  margin-left: 8px;\n                  margin-right: auto; }\n\n              .md-checkbox-layout label {\n                line-height: 24px; }\n\n              .md-checkbox-frame {\n                background-color: transparent;\n                border: 2px solid rgba(0, 0, 0, 0.54);\n                -webkit-transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);\n                transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);\n                will-change: border-color; }\n\n              .md-checkbox-background {\n                -webkit-box-align: center;\n                -webkit-align-items: center;\n                    -ms-flex-align: center;\n                        align-items: center;\n                background-color: #9c27b0;\n                opacity: 0;\n                display: -webkit-inline-box;\n                display: -webkit-inline-flex;\n                display: -ms-inline-flexbox;\n                display: inline-flex;\n                -webkit-box-pack: center;\n                -webkit-justify-content: center;\n                    -ms-flex-pack: center;\n                        justify-content: center;\n                -webkit-transition: background-color 90ms cubic-bezier(0, 0, 0.2, 0.1), opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);\n                transition: background-color 90ms cubic-bezier(0, 0, 0.2, 0.1), opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);\n                will-change: background-color, opacity; }\n\n              .md-checkbox-checkmark {\n                fill: #fafafa;\n                width: 100%; }\n\n              .md-checkbox-checkmark-path {\n                stroke: #fafafa !important;\n                stroke-dashoffset: 22.91026;\n                stroke-dasharray: 22.91026;\n                stroke-width: 2.66667px; }\n\n              .md-checkbox-mixedmark {\n                background-color: #fafafa;\n                height: 2px;\n                opacity: 0;\n                -webkit-transform: scaleX(0) rotate(0deg);\n                        transform: scaleX(0) rotate(0deg); }\n\n              .md-checkbox-align-end .md-checkbox-inner-container {\n                -webkit-box-ordinal-group: 2;\n                -webkit-order: 1;\n                    -ms-flex-order: 1;\n                        order: 1;\n                margin-left: 8px;\n                margin-right: auto; }\n                [dir=\"rtl\"] .md-checkbox-align-end .md-checkbox-inner-container {\n                  margin-left: auto;\n                  margin-right: 8px; }\n\n              .md-checkbox-checked .md-checkbox-checkmark {\n                opacity: 1; }\n\n              .md-checkbox-checked .md-checkbox-checkmark-path {\n                stroke-dashoffset: 0; }\n\n              .md-checkbox-checked .md-checkbox-mixedmark {\n                -webkit-transform: scaleX(1) rotate(-45deg);\n                        transform: scaleX(1) rotate(-45deg); }\n\n              .md-checkbox-checked .md-checkbox-background {\n                opacity: 1; }\n\n              .md-checkbox-indeterminate .md-checkbox-background {\n                opacity: 1; }\n\n              .md-checkbox-indeterminate .md-checkbox-checkmark {\n                opacity: 0;\n                -webkit-transform: rotate(45deg);\n                        transform: rotate(45deg); }\n\n              .md-checkbox-indeterminate .md-checkbox-checkmark-path {\n                stroke-dashoffset: 0; }\n\n              .md-checkbox-indeterminate .md-checkbox-mixedmark {\n                opacity: 1;\n                -webkit-transform: scaleX(1) rotate(0deg);\n                        transform: scaleX(1) rotate(0deg); }\n\n              .md-checkbox-disabled {\n                cursor: default; }\n                .md-checkbox-disabled.md-checkbox-checked .md-checkbox-background, .md-checkbox-disabled.md-checkbox-indeterminate .md-checkbox-background {\n                  background-color: #b0b0b0; }\n                .md-checkbox-disabled:not(.md-checkbox-checked) .md-checkbox-frame {\n                  border-color: #b0b0b0; }\n\n              .md-checkbox-anim-unchecked-checked .md-checkbox-background {\n                -webkit-animation: 180ms linear 0s md-checkbox-fade-in-background;\n                        animation: 180ms linear 0s md-checkbox-fade-in-background; }\n\n              .md-checkbox-anim-unchecked-checked .md-checkbox-checkmark-path {\n                -webkit-animation: 180ms linear 0s md-checkbox-unchecked-checked-checkmark-path;\n                        animation: 180ms linear 0s md-checkbox-unchecked-checked-checkmark-path; }\n\n              .md-checkbox-anim-unchecked-indeterminate .md-checkbox-background {\n                -webkit-animation: 180ms linear 0s md-checkbox-fade-in-background;\n                        animation: 180ms linear 0s md-checkbox-fade-in-background; }\n\n              .md-checkbox-anim-unchecked-indeterminate .md-checkbox-mixedmark {\n                -webkit-animation: 90ms linear 0s md-checkbox-unchecked-indeterminate-mixedmark;\n                        animation: 90ms linear 0s md-checkbox-unchecked-indeterminate-mixedmark; }\n\n              .md-checkbox-anim-checked-unchecked .md-checkbox-background {\n                -webkit-animation: 180ms linear 0s md-checkbox-fade-out-background;\n                        animation: 180ms linear 0s md-checkbox-fade-out-background; }\n\n              .md-checkbox-anim-checked-unchecked .md-checkbox-checkmark-path {\n                -webkit-animation: 90ms linear 0s md-checkbox-checked-unchecked-checkmark-path;\n                        animation: 90ms linear 0s md-checkbox-checked-unchecked-checkmark-path; }\n\n              .md-checkbox-anim-checked-indeterminate .md-checkbox-checkmark {\n                -webkit-animation: 90ms linear 0s md-checkbox-checked-indeterminate-checkmark;\n                        animation: 90ms linear 0s md-checkbox-checked-indeterminate-checkmark; }\n\n              .md-checkbox-anim-checked-indeterminate .md-checkbox-mixedmark {\n                -webkit-animation: 90ms linear 0s md-checkbox-checked-indeterminate-mixedmark;\n                        animation: 90ms linear 0s md-checkbox-checked-indeterminate-mixedmark; }\n\n              .md-checkbox-anim-indeterminate-checked .md-checkbox-checkmark {\n                -webkit-animation: 500ms linear 0s md-checkbox-indeterminate-checked-checkmark;\n                        animation: 500ms linear 0s md-checkbox-indeterminate-checked-checkmark; }\n\n              .md-checkbox-anim-indeterminate-checked .md-checkbox-mixedmark {\n                -webkit-animation: 500ms linear 0s md-checkbox-indeterminate-checked-mixedmark;\n                        animation: 500ms linear 0s md-checkbox-indeterminate-checked-mixedmark; }\n\n              .md-checkbox-anim-indeterminate-unchecked .md-checkbox-background {\n                -webkit-animation: 180ms linear 0s md-checkbox-fade-out-background;\n                        animation: 180ms linear 0s md-checkbox-fade-out-background; }\n\n              .md-checkbox-anim-indeterminate-unchecked .md-checkbox-mixedmark {\n                -webkit-animation: 300ms linear 0s md-checkbox-indeterminate-unchecked-mixedmark;\n                        animation: 300ms linear 0s md-checkbox-indeterminate-unchecked-mixedmark; }\n            "],
            host: {
                'role': 'checkbox',
                '[id]': 'id',
                '[class.md-checkbox-indeterminate]': 'indeterminate',
                '[class.md-checkbox-checked]': 'checked',
                '[class.md-checkbox-disabled]': 'disabled',
                '[class.md-checkbox-align-end]': 'align == "end"',
                '[attr.tabindex]': 'disabled ? null : tabindex',
                '[attr.aria-label]': 'ariaLabel',
                '[attr.aria-labelledby]': 'labelId',
                '[attr.aria-checked]': 'getAriaChecked()',
                '[attr.aria-disabled]': 'disabled',
                '(click)': 'onInteractionEvent($event)',
                '(keydown.space)': 'onSpaceDown($event)',
                '(keyup.space)': 'onInteractionEvent($event)',
                '(blur)': 'onTouched()'
            },
            providers: [MD_CHECKBOX_CONTROL_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], MdCheckbox);
    return MdCheckbox;
}());
exports.MdCheckbox = MdCheckbox;
//# sourceMappingURL=checkbox.js.map
