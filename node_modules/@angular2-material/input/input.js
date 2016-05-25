"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var noop = function () { };
var MD_INPUT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return MdInput; }),
    multi: true
});
// Invalid input type. Using one of these will throw an MdInputUnsupportedTypeError.
var MD_INPUT_INVALID_INPUT_TYPE = [
    'file',
    'radio',
    'checkbox',
];
var nextUniqueId = 0;
var MdInputPlaceholderConflictError = (function (_super) {
    __extends(MdInputPlaceholderConflictError, _super);
    function MdInputPlaceholderConflictError() {
        _super.call(this, 'Placeholder attribute and child element were both specified.');
    }
    return MdInputPlaceholderConflictError;
}(Error));
exports.MdInputPlaceholderConflictError = MdInputPlaceholderConflictError;
var MdInputUnsupportedTypeError = (function (_super) {
    __extends(MdInputUnsupportedTypeError, _super);
    function MdInputUnsupportedTypeError(type) {
        _super.call(this, "Input type \"" + type + "\" isn't supported by md-input.");
    }
    return MdInputUnsupportedTypeError;
}(Error));
exports.MdInputUnsupportedTypeError = MdInputUnsupportedTypeError;
var MdInputDuplicatedHintError = (function (_super) {
    __extends(MdInputDuplicatedHintError, _super);
    function MdInputDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return MdInputDuplicatedHintError;
}(Error));
exports.MdInputDuplicatedHintError = MdInputDuplicatedHintError;
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
var MdPlaceholder = (function () {
    function MdPlaceholder() {
    }
    MdPlaceholder = __decorate([
        core_1.Directive({
            selector: 'md-placeholder'
        }), 
        __metadata('design:paramtypes', [])
    ], MdPlaceholder);
    return MdPlaceholder;
}());
exports.MdPlaceholder = MdPlaceholder;
/**
 * The hint directive, used to tag content as hint labels (going under the input).
 */
var MdHint = (function () {
    function MdHint() {
        // Whether to align the hint label at the start or end of the line.
        this.align = 'start';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdHint.prototype, "align", void 0);
    MdHint = __decorate([
        core_1.Directive({
            selector: 'md-hint',
            host: {
                '[class.md-right]': 'align == "end"',
                '[class.md-hint]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdHint);
    return MdHint;
}());
exports.MdHint = MdHint;
/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
var MdInput = (function () {
    function MdInput() {
        this._focused = false;
        this._value = '';
        /** Callback registered via registerOnTouched (ControlValueAccessor) */
        this._onTouchedCallback = noop;
        /** Callback registered via registerOnChange (ControlValueAccessor) */
        this._onChangeCallback = noop;
        /**
         * Bindings.
         */
        this.align = 'start';
        this.dividerColor = 'primary';
        this.disabled = false;
        this.floatingPlaceholder = true;
        this.hintLabel = '';
        this.id = "md-input-" + nextUniqueId++;
        this.maxLength = -1;
        this.required = false;
        this.spellcheck = false;
        this.type = 'text';
    }
    Object.defineProperty(MdInput.prototype, "focused", {
        /** Readonly properties. */
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInput.prototype, "empty", {
        get: function () { return this._value == null || this._value === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInput.prototype, "characterCount", {
        get: function () {
            return this.empty ? 0 : ('' + this._value).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInput.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            v = this._convertValueForInputType(v);
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdInput.prototype, "_align", {
        // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
        // might place it as RTL when we don't want to. We still want to use `align` as an
        // Input though, so we use HostBinding.
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    MdInput.prototype.onFocus = function () {
        this._focused = true;
    };
    /** @internal */
    MdInput.prototype.onBlur = function () {
        this._focused = false;
        this._onTouchedCallback();
    };
    /** @internal */
    MdInput.prototype.onChange = function (ev) {
        this.value = ev.target.value;
        this._onTouchedCallback();
    };
    /** @internal */
    MdInput.prototype.hasPlaceholder = function () {
        return !!this.placeholder || this._placeholderChild != null;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdInput.prototype.writeValue = function (value) {
        this._value = value;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdInput.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    MdInput.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    MdInput.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateConstraints();
        // Trigger validation when the hint children change.
        this._hintChildren.changes.subscribe(function () {
            _this._validateConstraints();
        });
    };
    MdInput.prototype.ngOnChanges = function (changes) {
        this._validateConstraints();
    };
    /**
     * Convert the value passed in to a value that is expected from the type of the md-input.
     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
     * on our internal input it won't work locally.
     * @private
     */
    MdInput.prototype._convertValueForInputType = function (v) {
        switch (this.type) {
            case 'number': return parseFloat(v);
            default: return v;
        }
    };
    /**
     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
     * Constraints for now:
     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
     *   - type attribute is not one of the forbidden types (see constant at the top).
     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
     *     considered as align="start".
     * @private
     */
    MdInput.prototype._validateConstraints = function () {
        var _this = this;
        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
            throw new MdInputPlaceholderConflictError();
        }
        if (MD_INPUT_INVALID_INPUT_TYPE.indexOf(this.type) != -1) {
            throw new MdInputUnsupportedTypeError(this.type);
        }
        if (this._hintChildren) {
            // Validate the hint labels.
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new MdInputDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new MdInputDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], MdInput.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], MdInput.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.ContentChild(MdPlaceholder), 
        __metadata('design:type', MdPlaceholder)
    ], MdInput.prototype, "_placeholderChild", void 0);
    __decorate([
        core_1.ContentChildren(MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], MdInput.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdInput.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdInput.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "floatingPlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdInput.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdInput.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MdInput.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdInput.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdInput.prototype, "spellcheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdInput.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdInput.prototype, "value", null);
    __decorate([
        core_1.HostBinding('attr.align'), 
        __metadata('design:type', Object)
    ], MdInput.prototype, "_align", null);
    MdInput = __decorate([
        core_1.Component({
            selector: 'md-input',
            template: "\n              <div class=\"md-input-wrapper\" (click)=\"input.focus()\">\n                <div class=\"md-input-table\">\n                  <div class=\"md-input-prefix\"><ng-content select=\"[md-prefix]\"></ng-content></div>\n\n                  <div class=\"md-input-infix\">\n                    <input #input\n                           aria-target\n                           class=\"md-input-element\"\n                           [class.md-end]=\"align == 'end'\"\n                           [attr.aria-label]=\"ariaLabel\"\n                           [attr.aria-labelledby]=\"ariaLabelledBy\"\n                           [attr.aria-disabled]=\"ariaDisabled\"\n                           [attr.aria-required]=\"ariaRequired\"\n                           [attr.aria-invalid]=\"ariaInvalid\"\n                           [id]=\"id\"\n                           [disabled]=\"disabled\"\n                           [required]=\"required\"\n                           [spellcheck]=\"spellcheck\"\n                           [attr.maxlength]=\"maxLength\"\n                           [type]=\"type\"\n                           (focus)=\"onFocus()\"\n                           (blur)=\"onBlur()\"\n                           [(ngModel)]=\"value\"\n                           (change)=\"onChange($event)\">\n\n                    <label class=\"md-input-placeholder\"\n                           [attr.for]=\"id\"\n                           [class.md-empty]=\"empty\"\n                           [class.md-focused]=\"focused\"\n                           [class.md-float]=\"floatingPlaceholder\"\n                           [class.md-accent]=\"dividerColor == 'accent'\"\n                           [class.md-warn]=\"dividerColor == 'warn'\"\n                           *ngIf=\"hasPlaceholder()\">\n                      <ng-content select=\"md-placeholder\"></ng-content>\n                      {{placeholder}}\n                      <span class=\"md-placeholder-required\" *ngIf=\"required\">*</span>\n                    </label>\n                  </div>\n\n                  <div class=\"md-input-suffix\"><ng-content select=\"[md-suffix]\"></ng-content></div>\n                </div>\n\n                <div class=\"md-input-underline\"\n                     [class.md-disabled]=\"disabled\">\n                  <span class=\"md-input-ripple\"\n                        [class.md-focused]=\"focused\"\n                        [class.md-accent]=\"dividerColor == 'accent'\"\n                        [class.md-warn]=\"dividerColor == 'warn'\"></span>\n                </div>\n\n                <div *ngIf=\"hintLabel != ''\" class=\"md-hint\">{{hintLabel}}</div>\n                <ng-content select=\"md-hint\"></ng-content>\n              </div>\n            ",
            styles: ["\n              /**\n               * Mixin that creates a new stacking context.\n               * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n               */\n              /**\n               * This mixin hides an element visually.\n               * That means it's still accessible for screen-readers but not visible in view.\n               */\n              /**\n               * Applies a floating placeholder above the input itself.\n               */\n              :host .md-input-placeholder.md-float:not(.md-empty), :host .md-input-placeholder.md-float.md-focused, :host input:-webkit-autofill + .md-input-placeholder {\n                visibility: visible;\n                padding-bottom: 5px;\n                -webkit-transform: translateY(-100%) scale(0.75);\n                        transform: translateY(-100%) scale(0.75); }\n                :host .md-input-placeholder.md-float:not(.md-empty) .md-placeholder-required, :host .md-input-placeholder.md-float.md-focused .md-placeholder-required, :host input:-webkit-autofill + .md-input-placeholder .md-placeholder-required {\n                  color: #9c27b0; }\n\n              :host {\n                display: inline-block;\n                position: relative;\n                font-family: Roboto, \"Helvetica Neue\", sans-serif;\n                text-align: left; }\n                :host .md-input-wrapper {\n                  margin: 16px 0; }\n                :host .md-input-table {\n                  display: inline-table;\n                  -webkit-flex-flow: column;\n                      -ms-flex-flow: column;\n                          flex-flow: column;\n                  vertical-align: bottom;\n                  width: 100%; }\n                  :host .md-input-table > * {\n                    display: table-cell; }\n                :host .md-input-element {\n                  font: inherit;\n                  border: none;\n                  outline: none;\n                  padding: 0;\n                  width: 100%; }\n                  :host .md-input-element.md-end {\n                    text-align: right; }\n                :host .md-input-infix {\n                  position: relative; }\n                :host .md-input-placeholder {\n                  position: absolute;\n                  left: 0;\n                  top: 0;\n                  visibility: hidden;\n                  font-size: 100%;\n                  pointer-events: none;\n                  color: rgba(0, 0, 0, 0.38);\n                  z-index: 1;\n                  width: 100%;\n                  display: block;\n                  white-space: nowrap;\n                  text-overflow: ellipsis;\n                  overflow-x: hidden;\n                  -webkit-transform: translateY(0);\n                          transform: translateY(0);\n                  -webkit-transform-origin: bottom left;\n                          transform-origin: bottom left;\n                  -webkit-transition: scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                  transition: scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n                  :host .md-input-placeholder.md-empty {\n                    visibility: visible;\n                    cursor: text; }\n                  :host .md-input-placeholder.md-focused {\n                    color: #009688; }\n                    :host .md-input-placeholder.md-focused.md-accent {\n                      color: #9c27b0; }\n                    :host .md-input-placeholder.md-focused.md-warn {\n                      color: #f44336; }\n                :host .md-input-underline {\n                  position: absolute;\n                  height: 1px;\n                  width: 100%;\n                  margin-top: 4px;\n                  border-top: 1px solid rgba(0, 0, 0, 0.38); }\n                  :host .md-input-underline.md-disabled {\n                    border-top: 0;\n                    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%);\n                    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%);\n                    background-position: 0;\n                    background-size: 4px 1px;\n                    background-repeat: repeat-x; }\n                  :host .md-input-underline .md-input-ripple {\n                    position: absolute;\n                    height: 2px;\n                    z-index: 1;\n                    background-color: #009688;\n                    top: -1px;\n                    width: 100%;\n                    -webkit-transform-origin: top;\n                            transform-origin: top;\n                    opacity: 0;\n                    -webkit-transform: scaleY(0);\n                            transform: scaleY(0);\n                    -webkit-transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                    transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n                    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n                    :host .md-input-underline .md-input-ripple.md-accent {\n                      background-color: #9c27b0; }\n                    :host .md-input-underline .md-input-ripple.md-warn {\n                      background-color: #f44336; }\n                    :host .md-input-underline .md-input-ripple.md-focused {\n                      opacity: 1;\n                      -webkit-transform: scaleY(1);\n                              transform: scaleY(1); }\n                :host .md-hint {\n                  position: absolute;\n                  font-size: 75%;\n                  bottom: -0.5em; }\n                  :host .md-hint.md-right {\n                    right: 0; }\n\n              :host-context([dir=\"rtl\"]) {\n                text-align: right; }\n                :host-context([dir=\"rtl\"]) .md-input-placeholder {\n                  -webkit-transform-origin: bottom right;\n                          transform-origin: bottom right; }\n                :host-context([dir=\"rtl\"]) .md-input-element.md-end {\n                  text-align: left; }\n                :host-context([dir=\"rtl\"]) .md-hint {\n                  right: 0;\n                  left: auto; }\n                  :host-context([dir=\"rtl\"]) .md-hint.md-right {\n                    right: auto;\n                    left: 0; }\n            "],
            providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
        }), 
        __metadata('design:paramtypes', [])
    ], MdInput);
    return MdInput;
}());
exports.MdInput = MdInput;
exports.MD_INPUT_DIRECTIVES = [
    MdPlaceholder,
    MdInput,
    MdHint,
];
//# sourceMappingURL=input.js.map
