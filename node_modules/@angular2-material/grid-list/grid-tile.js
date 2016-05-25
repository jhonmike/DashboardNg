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
var grid_list_1 = require('./grid-list');
var MdGridTile = (function () {
    function MdGridTile(_renderer, element) {
        this._renderer = _renderer;
        this._rowspan = 1;
        this._colspan = 1;
        this._element = element.nativeElement;
    }
    Object.defineProperty(MdGridTile.prototype, "rowspan", {
        get: function () {
            return this._rowspan;
        },
        set: function (value) {
            this._rowspan = grid_list_1.coerceToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridTile.prototype, "colspan", {
        get: function () {
            return this._colspan;
        },
        set: function (value) {
            this._colspan = grid_list_1.coerceToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     * @internal
     */
    MdGridTile.prototype.setStyle = function (property, value) {
        this._renderer.setElementStyle(this._element, property, value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "rowspan", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "colspan", null);
    MdGridTile = __decorate([
        core_1.Component({
            selector: 'md-grid-tile',
            host: { 'role': 'listitem' },
            template: "\n              <!-- TODO(kara): Revisit why this is a figure.-->\n              <figure>\n                <ng-content></ng-content>\n              </figure>\n            ",
            styles: ["\n              md-grid-list {\n                display: block;\n                position: relative; }\n\n              md-grid-tile {\n                display: block;\n                position: absolute; }\n                md-grid-tile figure {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  position: absolute;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  -webkit-box-pack: center;\n                  -webkit-justify-content: center;\n                      -ms-flex-pack: center;\n                          justify-content: center;\n                  height: 100%;\n                  top: 0;\n                  right: 0;\n                  bottom: 0;\n                  left: 0;\n                  padding: 0;\n                  margin: 0; }\n                md-grid-tile md-grid-tile-header,\n                md-grid-tile md-grid-tile-footer {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: horizontal;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: row;\n                      -ms-flex-direction: row;\n                          flex-direction: row;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  height: 48px;\n                  color: #fff;\n                  background: rgba(0, 0, 0, 0.18);\n                  overflow: hidden;\n                  position: absolute;\n                  left: 0;\n                  right: 0; }\n                  md-grid-tile md-grid-tile-header h3,\n                  md-grid-tile md-grid-tile-header h4,\n                  md-grid-tile md-grid-tile-footer h3,\n                  md-grid-tile md-grid-tile-footer h4 {\n                    font-weight: 400;\n                    margin: 0 0 0 16px; }\n                  md-grid-tile md-grid-tile-header h3,\n                  md-grid-tile md-grid-tile-footer h3 {\n                    font-size: 14px; }\n                  md-grid-tile md-grid-tile-header h4,\n                  md-grid-tile md-grid-tile-footer h4 {\n                    font-size: 12px; }\n                md-grid-tile md-grid-tile-header {\n                  top: 0; }\n                md-grid-tile md-grid-tile-footer {\n                  bottom: 0; }\n            "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], MdGridTile);
    return MdGridTile;
}());
exports.MdGridTile = MdGridTile;
//# sourceMappingURL=grid-tile.js.map
