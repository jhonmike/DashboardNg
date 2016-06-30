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
// TODO(josephperrott): Benchpress tests.
/**
 * <md-progress-circle> component.
 */
var MdProgressCircle = (function () {
    function MdProgressCircle() {
        /**
         * Value of the progress circle.
         *
         * Input:number, defaults to 0.
         * _value is bound to the host as the attribute aria-valuenow.
         */
        this._value = 0;
        /**
         * Mode of the progress circle
         *
         * Input must be one of the values from ProgressMode, defaults to 'determinate'.
         * mode is bound to the host as the attribute host.
         */
        this.mode = 'determinate';
    }
    /**
     * Gets the current stroke dash offset to represent the progress circle.
     *
     * The stroke dash offset specifies the distance between dashes in the circle's stroke.
     * Setting the offset to a percentage of the total circumference of the circle, fills this
     * percentage of the overall circumference of the circle.
     */
    MdProgressCircle.prototype.strokeDashOffset = function () {
        // To determine how far the offset should be, we multiple the current percentage by the
        // total circumference.
        // The total circumference is calculated based on the radius we use, 45.
        // PI * 2 * 45
        return 251.3274 * (100 - this._value) / 100;
    };
    Object.defineProperty(MdProgressCircle.prototype, "value", {
        /** Gets the progress value, returning the clamped value. */
        get: function () {
            return this._value;
        },
        /** Sets the progress value, clamping before setting the internal value. */
        set: function (v) {
            if (v != null) {
                this._value = MdProgressCircle.clamp(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Clamps a value to be between 0 and 100. */
    MdProgressCircle.clamp = function (v) {
        return Math.max(0, Math.min(100, v));
    };
    __decorate([
        core_1.HostBinding('attr.aria-valuenow'),
        core_1.Input('value'), 
        __metadata('design:type', Number)
    ], MdProgressCircle.prototype, "_value", void 0);
    __decorate([
        core_1.HostBinding('attr.mode'),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdProgressCircle.prototype, "mode", void 0);
    MdProgressCircle = __decorate([
        core_1.Component({
            selector: 'md-progress-circle',
            host: {
                'role': 'progressbar',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
            },
            template: "\n              <!--\n                preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n                center.  The center of the circle with remain at the center of the md-progress-circle\n                element containing the SVG.\n              -->\n              <svg viewBox=\"0 0 100 100\"\n                   preserveAspectRatio=\"xMidYMid meet\">\n                <circle [style.strokeDashoffset]=\"strokeDashOffset()\"\n                        cx=\"50px\" cy=\"50px\" r=\"40px\"></circle>\n              </svg>\n            ",
            styles: ["\n              /* Animation Durations */\n              /** Component sizing */\n              :host {\n                display: block;\n                /** Height and width are provided for md-progress-circle to act as a default.\n                    The height and width are expected to be overwritten by application css. */\n                height: 100px;\n                width: 100px;\n                /** SVG's viewBox is defined as 0 0 100 100, this means that all SVG children will placed\n                    based on a 100px by 100px box.\n\n                    The SVG and Circle dimensions/location:\n                      SVG\n                        Height: 100px\n                        Width: 100px\n                      Circle\n                        Radius: 40px\n                        Circumference: 251.3274px\n                        Center x: 50px\n                        Center y: 50px\n                */ }\n                :host svg {\n                  height: 100%;\n                  width: 100%;\n                  -webkit-transform: rotate(-90deg);\n                          transform: rotate(-90deg);\n                  -webkit-transform-origin: center;\n                          transform-origin: center; }\n                :host circle {\n                  fill: transparent;\n                  stroke: #00897b;\n                  /** Stroke width of 10px defines stroke as 10% of the viewBox */\n                  stroke-width: 10px;\n                  /** SVG circle rotations begin rotated 90deg clockwise from the circle's center top */\n                  -webkit-transition: stroke-dashoffset 0.225s linear;\n                  transition: stroke-dashoffset 0.225s linear;\n                  /** The dash array of the circle is defined as the circumference of the circle. */\n                  stroke-dasharray: 251.32741px;\n                  /** The stroke dashoffset is used to \"fill\" the circle, 0px represents an full circle,\n                      while the circles full circumference represents an empty circle. */\n                  stroke-dashoffset: 0px; }\n                :host[color=\"accent\"] circle {\n                  stroke: #8e24aa; }\n                :host[color=\"warn\"] circle {\n                  stroke: #e53935; }\n                :host[mode=\"indeterminate\"] {\n                  -webkit-animation-duration: 5.25s, 2.8875s;\n                          animation-duration: 5.25s, 2.8875s;\n                  -webkit-animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate;\n                          animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate;\n                  -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear;\n                          animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear;\n                  -webkit-animation-iteration-count: infinite;\n                          animation-iteration-count: infinite;\n                  -webkit-transition: none;\n                  transition: none; }\n                  :host[mode=\"indeterminate\"] circle {\n                    -webkit-animation-duration: 1.3125s;\n                            animation-duration: 1.3125s;\n                    -webkit-animation-name: md-progress-circle-value-change;\n                            animation-name: md-progress-circle-value-change;\n                    -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n                            animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n                    -webkit-animation-iteration-count: infinite;\n                            animation-iteration-count: infinite;\n                    -webkit-transition: none;\n                    transition: none; }\n\n              /** Animations for indeterminate mode */\n              @-webkit-keyframes md-progress-circle-linear-rotate {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n              @keyframes md-progress-circle-linear-rotate {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n\n              @-webkit-keyframes md-progress-circle-sporadic-rotate {\n                12.5% {\n                  -webkit-transform: rotate(135deg);\n                          transform: rotate(135deg); }\n                25% {\n                  -webkit-transform: rotate(270deg);\n                          transform: rotate(270deg); }\n                37.5% {\n                  -webkit-transform: rotate(405deg);\n                          transform: rotate(405deg); }\n                50% {\n                  -webkit-transform: rotate(540deg);\n                          transform: rotate(540deg); }\n                62.5% {\n                  -webkit-transform: rotate(675deg);\n                          transform: rotate(675deg); }\n                75% {\n                  -webkit-transform: rotate(810deg);\n                          transform: rotate(810deg); }\n                87.5% {\n                  -webkit-transform: rotate(945deg);\n                          transform: rotate(945deg); }\n                100% {\n                  -webkit-transform: rotate(1080deg);\n                          transform: rotate(1080deg); } }\n\n              @keyframes md-progress-circle-sporadic-rotate {\n                12.5% {\n                  -webkit-transform: rotate(135deg);\n                          transform: rotate(135deg); }\n                25% {\n                  -webkit-transform: rotate(270deg);\n                          transform: rotate(270deg); }\n                37.5% {\n                  -webkit-transform: rotate(405deg);\n                          transform: rotate(405deg); }\n                50% {\n                  -webkit-transform: rotate(540deg);\n                          transform: rotate(540deg); }\n                62.5% {\n                  -webkit-transform: rotate(675deg);\n                          transform: rotate(675deg); }\n                75% {\n                  -webkit-transform: rotate(810deg);\n                          transform: rotate(810deg); }\n                87.5% {\n                  -webkit-transform: rotate(945deg);\n                          transform: rotate(945deg); }\n                100% {\n                  -webkit-transform: rotate(1080deg);\n                          transform: rotate(1080deg); } }\n\n              @-webkit-keyframes md-progress-circle-value-change {\n                0% {\n                  stroke-dashoffset: 261.3274px; }\n                100% {\n                  stroke-dashoffset: -241.3274px; } }\n\n              @keyframes md-progress-circle-value-change {\n                0% {\n                  stroke-dashoffset: 261.3274px; }\n                100% {\n                  stroke-dashoffset: -241.3274px; } }\n            "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressCircle);
    return MdProgressCircle;
}());
exports.MdProgressCircle = MdProgressCircle;
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-circle> instance.
 */
var MdSpinner = (function (_super) {
    __extends(MdSpinner, _super);
    function MdSpinner() {
        _super.call(this);
        this.mode = 'indeterminate';
    }
    MdSpinner = __decorate([
        core_1.Component({
            selector: 'md-spinner',
            host: {
                'role': 'progressbar',
            },
            template: "\n              <!--\n                preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n                center.  The center of the circle with remain at the center of the md-progress-circle\n                element containing the SVG.\n              -->\n              <svg viewBox=\"0 0 100 100\"\n                   preserveAspectRatio=\"xMidYMid meet\">\n                <circle [style.strokeDashoffset]=\"strokeDashOffset()\"\n                        cx=\"50px\" cy=\"50px\" r=\"40px\"></circle>\n              </svg>\n            ",
            styles: ["\n              /* Animation Durations */\n              /** Component sizing */\n              :host {\n                display: block;\n                /** Height and width are provided for md-progress-circle to act as a default.\n                    The height and width are expected to be overwritten by application css. */\n                height: 100px;\n                width: 100px;\n                /** SVG's viewBox is defined as 0 0 100 100, this means that all SVG children will placed\n                    based on a 100px by 100px box.\n\n                    The SVG and Circle dimensions/location:\n                      SVG\n                        Height: 100px\n                        Width: 100px\n                      Circle\n                        Radius: 40px\n                        Circumference: 251.3274px\n                        Center x: 50px\n                        Center y: 50px\n                */ }\n                :host svg {\n                  height: 100%;\n                  width: 100%;\n                  -webkit-transform: rotate(-90deg);\n                          transform: rotate(-90deg);\n                  -webkit-transform-origin: center;\n                          transform-origin: center; }\n                :host circle {\n                  fill: transparent;\n                  stroke: #00897b;\n                  /** Stroke width of 10px defines stroke as 10% of the viewBox */\n                  stroke-width: 10px;\n                  /** SVG circle rotations begin rotated 90deg clockwise from the circle's center top */\n                  -webkit-transition: stroke-dashoffset 0.225s linear;\n                  transition: stroke-dashoffset 0.225s linear;\n                  /** The dash array of the circle is defined as the circumference of the circle. */\n                  stroke-dasharray: 251.32741px;\n                  /** The stroke dashoffset is used to \"fill\" the circle, 0px represents an full circle,\n                      while the circles full circumference represents an empty circle. */\n                  stroke-dashoffset: 0px; }\n                :host[color=\"accent\"] circle {\n                  stroke: #8e24aa; }\n                :host[color=\"warn\"] circle {\n                  stroke: #e53935; }\n                :host[mode=\"indeterminate\"] {\n                  -webkit-animation-duration: 5.25s, 2.8875s;\n                          animation-duration: 5.25s, 2.8875s;\n                  -webkit-animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate;\n                          animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate;\n                  -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear;\n                          animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear;\n                  -webkit-animation-iteration-count: infinite;\n                          animation-iteration-count: infinite;\n                  -webkit-transition: none;\n                  transition: none; }\n                  :host[mode=\"indeterminate\"] circle {\n                    -webkit-animation-duration: 1.3125s;\n                            animation-duration: 1.3125s;\n                    -webkit-animation-name: md-progress-circle-value-change;\n                            animation-name: md-progress-circle-value-change;\n                    -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n                            animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n                    -webkit-animation-iteration-count: infinite;\n                            animation-iteration-count: infinite;\n                    -webkit-transition: none;\n                    transition: none; }\n\n              /** Animations for indeterminate mode */\n              @-webkit-keyframes md-progress-circle-linear-rotate {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n              @keyframes md-progress-circle-linear-rotate {\n                0% {\n                  -webkit-transform: rotate(0deg);\n                          transform: rotate(0deg); }\n                100% {\n                  -webkit-transform: rotate(360deg);\n                          transform: rotate(360deg); } }\n\n              @-webkit-keyframes md-progress-circle-sporadic-rotate {\n                12.5% {\n                  -webkit-transform: rotate(135deg);\n                          transform: rotate(135deg); }\n                25% {\n                  -webkit-transform: rotate(270deg);\n                          transform: rotate(270deg); }\n                37.5% {\n                  -webkit-transform: rotate(405deg);\n                          transform: rotate(405deg); }\n                50% {\n                  -webkit-transform: rotate(540deg);\n                          transform: rotate(540deg); }\n                62.5% {\n                  -webkit-transform: rotate(675deg);\n                          transform: rotate(675deg); }\n                75% {\n                  -webkit-transform: rotate(810deg);\n                          transform: rotate(810deg); }\n                87.5% {\n                  -webkit-transform: rotate(945deg);\n                          transform: rotate(945deg); }\n                100% {\n                  -webkit-transform: rotate(1080deg);\n                          transform: rotate(1080deg); } }\n\n              @keyframes md-progress-circle-sporadic-rotate {\n                12.5% {\n                  -webkit-transform: rotate(135deg);\n                          transform: rotate(135deg); }\n                25% {\n                  -webkit-transform: rotate(270deg);\n                          transform: rotate(270deg); }\n                37.5% {\n                  -webkit-transform: rotate(405deg);\n                          transform: rotate(405deg); }\n                50% {\n                  -webkit-transform: rotate(540deg);\n                          transform: rotate(540deg); }\n                62.5% {\n                  -webkit-transform: rotate(675deg);\n                          transform: rotate(675deg); }\n                75% {\n                  -webkit-transform: rotate(810deg);\n                          transform: rotate(810deg); }\n                87.5% {\n                  -webkit-transform: rotate(945deg);\n                          transform: rotate(945deg); }\n                100% {\n                  -webkit-transform: rotate(1080deg);\n                          transform: rotate(1080deg); } }\n\n              @-webkit-keyframes md-progress-circle-value-change {\n                0% {\n                  stroke-dashoffset: 261.3274px; }\n                100% {\n                  stroke-dashoffset: -241.3274px; } }\n\n              @keyframes md-progress-circle-value-change {\n                0% {\n                  stroke-dashoffset: 261.3274px; }\n                100% {\n                  stroke-dashoffset: -241.3274px; } }\n            "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdSpinner);
    return MdSpinner;
}(MdProgressCircle));
exports.MdSpinner = MdSpinner;
//# sourceMappingURL=progress-circle.js.map
