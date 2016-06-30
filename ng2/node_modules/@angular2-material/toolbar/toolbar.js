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
var core_2 = require('@angular/core');
var core_3 = require('@angular/core');
var MdToolbar = (function () {
    function MdToolbar(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(MdToolbar.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    MdToolbar.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdToolbar.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this.renderer.setElementClass(this.elementRef.nativeElement, "md-" + color, isAdd);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdToolbar.prototype, "color", null);
    MdToolbar = __decorate([
        core_1.Component({
            selector: 'md-toolbar',
            template: "\n              <div class=\"md-toolbar-layout\">\n                <md-toolbar-row>\n                  <ng-content></ng-content>\n                </md-toolbar-row>\n                <ng-content select=\"md-toolbar-row\"></ng-content>\n              </div>\n            ",
            styles: ["\n              /**\n               * Mixin that creates a new stacking context.\n               * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n               */\n              /**\n               * This mixin hides an element visually.\n               * That means it's still accessible for screen-readers but not visible in view.\n               */\n              :host {\n                display: -webkit-box;\n                display: -webkit-flex;\n                display: -ms-flexbox;\n                display: flex;\n                box-sizing: border-box;\n                width: 100%;\n                min-height: 64px;\n                font-size: 20px;\n                font-weight: 400;\n                font-family: Roboto, \"Helvetica Neue\", sans-serif;\n                padding: 0 16px;\n                -webkit-box-orient: vertical;\n                -webkit-box-direction: normal;\n                -webkit-flex-direction: column;\n                    -ms-flex-direction: column;\n                        flex-direction: column;\n                background: whitesmoke;\n                color: rgba(0, 0, 0, 0.87); }\n                :host.md-primary {\n                  background: #009688;\n                  color: white; }\n                :host.md-accent {\n                  background: #9c27b0;\n                  color: rgba(255, 255, 255, 0.870588); }\n                :host.md-warn {\n                  background: #f44336;\n                  color: white; }\n                :host md-toolbar-row {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  box-sizing: border-box;\n                  width: 100%;\n                  height: 64px;\n                  -webkit-box-orient: horizontal;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: row;\n                      -ms-flex-direction: row;\n                          flex-direction: row;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center; }\n            "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [core_3.ElementRef, core_2.Renderer])
    ], MdToolbar);
    return MdToolbar;
}());
exports.MdToolbar = MdToolbar;
//# sourceMappingURL=toolbar.js.map
