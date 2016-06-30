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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var radio_dispatcher_1 = require('./radio_dispatcher');
var radio_dispatcher_2 = require('./radio_dispatcher');
exports.MdRadioDispatcher = radio_dispatcher_2.MdRadioDispatcher;
/**
 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */
var MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return MdRadioGroup; }),
    multi: true
});
// TODO(mtlin):
// Ink ripple is currently placeholder.
// Determine motion spec for button transitions.
// Design review.
// RTL
// Support forms API.
// Use ChangeDetectionStrategy.OnPush
var _uniqueIdCounter = 0;
/** A simple change event emitted by either MdRadioButton or MdRadioGroup. */
var MdRadioChange = (function () {
    function MdRadioChange() {
    }
    return MdRadioChange;
}());
exports.MdRadioChange = MdRadioChange;
var MdRadioGroup = (function () {
    function MdRadioGroup() {
        /** The value for the radio group. Should match currently selected button. */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = null;
        /** Disables all individual radio buttons assigned to this group. */
        this._disabled = false;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Change event subscription set up by registerOnChange (ControlValueAccessor). */
        this._changeSubscription = null;
        this.onTouched = function () { };
        /** Event emitted when the group value changes. */
        this.change = new core_1.EventEmitter();
        /** Child radio buttons. */
        this._radios = null;
    }
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    MdRadioGroup.prototype.ngAfterContentInit = function () {
        if (this._name == null) {
            this.name = "md-radio-group-" + _uniqueIdCounter++;
        }
        else {
            this._updateChildRadioNames();
        }
    };
    Object.defineProperty(MdRadioGroup.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this._updateChildRadioNames();
        },
        enumerable: true,
        configurable: true
    });
    /** Propagate name attribute to radio buttons. */
    MdRadioGroup.prototype._updateChildRadioNames = function () {
        var _this = this;
        if (this._radios != null) {
            this._radios.forEach(function (radio) {
                radio.name = _this._name;
            });
        }
    };
    Object.defineProperty(MdRadioGroup.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            // The presence of *any* disabled value makes the component disabled, *except* for false.
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioGroup.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            if (this._value != newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this._updateSelectedRadioFromValue();
                this._emitChangeEvent();
            }
        },
        enumerable: true,
        configurable: true
    });
    MdRadioGroup.prototype._updateSelectedRadioFromValue = function () {
        var _this = this;
        // Update selected if different from current value.
        var isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._radios != null && !isAlreadySelected) {
            var matched = this._radios.filter(function (radio) {
                return radio.value == _this._value;
            });
            if (matched.length == 0) {
                // Didn't find a button that matches this value, return early without setting.
                return;
            }
            // Change the selection immediately.
            this.selected = matched[0];
        }
    };
    /** Dispatch change event with current selection and group value. */
    MdRadioGroup.prototype._emitChangeEvent = function () {
        var event = new MdRadioChange();
        event.source = this._selected;
        event.value = this._value;
        this.change.emit(event);
    };
    Object.defineProperty(MdRadioGroup.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.value = selected.value;
            selected.checked = true;
        },
        enumerable: true,
        configurable: true
    });
    /** Implemented as part of ControlValueAccessor. */
    MdRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdRadioGroup.prototype.registerOnChange = function (fn) {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        this._changeSubscription = this.change.subscribe(function (changeEvent) { fn(changeEvent.value); });
    };
    /** Implemented as part of ControlValueAccessor. */
    MdRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdRadioGroup.prototype, "change", void 0);
    __decorate([
        core_1.ContentChildren(core_1.forwardRef(function () { return MdRadioButton; })), 
        __metadata('design:type', core_1.QueryList)
    ], MdRadioGroup.prototype, "_radios", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdRadioGroup.prototype, "name", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdRadioGroup.prototype, "disabled", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdRadioGroup.prototype, "selected", null);
    MdRadioGroup = __decorate([
        core_1.Directive({
            selector: 'md-radio-group',
            providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'radiogroup',
            },
        }), 
        __metadata('design:paramtypes', [])
    ], MdRadioGroup);
    return MdRadioGroup;
}());
exports.MdRadioGroup = MdRadioGroup;
var MdRadioButton = (function () {
    function MdRadioButton(radioGroup, radioDispatcher) {
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        var _this = this;
        this.radioDispatcher = radioDispatcher;
        /** Whether this radio is checked. */
        this._checked = false;
        /** Value assigned to this radio.*/
        this._value = null;
        /** Event emitted when the group value changes. */
        this.change = new core_1.EventEmitter();
        this.radioGroup = radioGroup;
        radioDispatcher.listen(function (name) {
            if (name == _this.name) {
                _this.checked = false;
            }
        });
    }
    MdRadioButton.prototype.ngOnInit = function () {
        if (this.id == null) {
            this.id = "md-radio-" + _uniqueIdCounter++;
        }
        if (this.radioGroup && this._value == this.radioGroup.value) {
            this._checked = true;
        }
    };
    /*
     * We use a hidden native input field to handle changes to focus state via keyboard navigation,
     * with visual rendering done separately. The native element is kept in sync with the overall
     * state of the component.
     */
    MdRadioButton.prototype.onInputFocus = function () {
        this._isFocused = true;
    };
    MdRadioButton.prototype.onInputBlur = function () {
        this._isFocused = false;
    };
    /** Input change handler, called only on keyboard selection. */
    MdRadioButton.prototype.onInputChange = function () {
        this.checked = true;
    };
    Object.defineProperty(MdRadioButton.prototype, "inputId", {
        get: function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (value) {
                // Notify all radio buttons with the same name to un-check.
                this.radioDispatcher.notify(this.name);
                if (!this._checked) {
                    this._emitChangeEvent();
                }
            }
            this._checked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdRadioButton.prototype, "value", {
        /** MdRadioGroup reads this to assign its own value. */
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                if (this.radioGroup != null && this.checked) {
                    this.radioGroup.value = value;
                }
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Dispatch change event with current value. */
    MdRadioButton.prototype._emitChangeEvent = function () {
        var event = new MdRadioChange();
        event.source = this;
        event.value = this._value;
        this.change.emit(event);
    };
    Object.defineProperty(MdRadioButton.prototype, "disabled", {
        get: function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: function (value) {
            // The presence of *any* disabled value makes the component disabled, *except* for false.
            this._disabled = (value != null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    MdRadioButton.prototype.onClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (this.radioGroup != null) {
            // Propagate the change one-way via the group, which will in turn mark this
            // button as checked.
            this.radioGroup.selected = this;
        }
        else {
            this.checked = true;
        }
    };
    __decorate([
        core_1.HostBinding('class.md-radio-focused'), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "_isFocused", void 0);
    __decorate([
        core_1.HostBinding('id'),
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdRadioButton.prototype, "name", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdRadioButton.prototype, "change", void 0);
    __decorate([
        core_1.HostBinding('class.md-radio-checked'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdRadioButton.prototype, "value", null);
    __decorate([
        core_1.HostBinding('class.md-radio-disabled'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdRadioButton.prototype, "disabled", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], MdRadioButton.prototype, "onClick", null);
    MdRadioButton = __decorate([
        core_1.Component({
            selector: 'md-radio-button',
            template: "\n              <!-- TODO(jelbourn): render the radio on either side of the content -->\n              <!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. -->\n              <label [attr.for]=\"inputId\" class=\"md-radio-label\">\n                <!-- The actual 'radio' part of the control. -->\n                <div class=\"md-radio-container\">\n                  <div class=\"md-radio-outer-circle\"></div>\n                  <div class=\"md-radio-inner-circle\"></div>\n                  <div class=\"md-ink-ripple\"></div>\n                </div>\n\n                <input #input class=\"md-radio-input\" type=\"radio\"\n                        [id]=\"inputId\"\n                        [checked]=\"checked\"\n                        [disabled]=\"disabled\"\n                        [name]=\"name\"\n                        (change)=\"onInputChange()\"\n                        (focus)=\"onInputFocus()\"\n                        (blur)=\"onInputBlur()\" />\n\n                <!-- The label content for radio control. -->\n                <div class=\"md-radio-label-content\">\n                  <ng-content></ng-content>\n                </div>\n              </label>\n            ",
            styles: ["\n              md-radio-button {\n                display: inline-block; }\n\n              .md-radio-label {\n                cursor: pointer;\n                display: block;\n                white-space: nowrap; }\n\n              .md-radio-container {\n                box-sizing: border-box;\n                display: inline-block;\n                height: 20px;\n                position: relative;\n                top: 2px;\n                width: 20px; }\n\n              .md-ink-ripple {\n                background-color: #9c27b0;\n                border-radius: 50%;\n                height: 48px;\n                left: 10px;\n                opacity: 0;\n                pointer-events: none;\n                position: absolute;\n                top: 10px;\n                -webkit-transform: translate(-50%, -50%);\n                        transform: translate(-50%, -50%);\n                -webkit-transition: opacity ease 0.28s, background-color ease 0.28s;\n                transition: opacity ease 0.28s, background-color ease 0.28s;\n                width: 48px;\n                overflow: hidden; }\n                .md-radio-focused .md-ink-ripple {\n                  opacity: 0.1; }\n                .md-radio-disabled .md-ink-ripple {\n                  background: #000; }\n\n              .md-radio-outer-circle {\n                border-color: rgba(0, 0, 0, 0.54);\n                border: solid 2px;\n                border-radius: 50%;\n                box-sizing: border-box;\n                height: 20px;\n                left: 0;\n                position: absolute;\n                top: 0;\n                -webkit-transition: border-color ease 0.28s;\n                transition: border-color ease 0.28s;\n                width: 20px; }\n                .md-radio-checked .md-radio-outer-circle {\n                  border-color: #9c27b0; }\n                .md-radio-disabled .md-radio-outer-circle {\n                  border-color: rgba(0, 0, 0, 0.38); }\n\n              .md-radio-inner-circle {\n                background-color: #9c27b0;\n                border-radius: 50%;\n                box-sizing: border-box;\n                height: 20px;\n                left: 0;\n                position: absolute;\n                top: 0;\n                -webkit-transition: background-color ease 0.28s, -webkit-transform ease 0.28s;\n                transition: background-color ease 0.28s, -webkit-transform ease 0.28s;\n                transition: transform ease 0.28s, background-color ease 0.28s;\n                transition: transform ease 0.28s, background-color ease 0.28s, -webkit-transform ease 0.28s;\n                -webkit-transform: scale(0);\n                        transform: scale(0);\n                width: 20px; }\n                .md-radio-checked .md-radio-inner-circle {\n                  -webkit-transform: scale(0.5);\n                          transform: scale(0.5); }\n                .md-radio-disabled .md-radio-inner-circle {\n                  background-color: rgba(0, 0, 0, 0.38); }\n\n              .md-radio-label-content {\n                display: inline-block;\n                float: right;\n                line-height: 24px;\n                padding-left: 8px;\n                position: relative;\n                vertical-align: top; }\n                [dir='rtl'] .md-radio-label-content {\n                  float: left;\n                  padding-right: 8px;\n                  padding-left: 0; }\n\n              .md-radio-input {\n                position: absolute;\n                width: 0;\n                height: 0;\n                margin: 0;\n                padding: 0;\n                opacity: 0;\n                -webkit-appearance: none;\n                   -moz-appearance: none;\n                        appearance: none;\n                border: none; }\n\n              .md-radio-disabled, .md-radio-disabled .md-radio-label {\n                cursor: default; }\n            "],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [MdRadioGroup, radio_dispatcher_1.MdRadioDispatcher])
    ], MdRadioButton);
    return MdRadioButton;
}());
exports.MdRadioButton = MdRadioButton;
//# sourceMappingURL=radio.js.map
