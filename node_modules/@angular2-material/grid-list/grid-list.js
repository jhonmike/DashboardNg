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
var grid_tile_1 = require('./grid-tile');
var tile_coordinator_1 = require('./tile-coordinator');
var tile_styler_1 = require('./tile-styler');
var grid_list_errors_1 = require('./grid-list-errors');
var dir_1 = require('@angular2-material/core/rtl/dir');
// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
var MD_FIT_MODE = 'fit';
var MdGridList = (function () {
    function MdGridList(_renderer, _element, _dir) {
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        /** The amount of space between tiles. This will be something like '5px' or '2em'. */
        this._gutter = '1px';
    }
    Object.defineProperty(MdGridList.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        set: function (value) {
            this._cols = coerceToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridList.prototype, "gutterSize", {
        get: function () {
            return this._gutter;
        },
        set: function (value) {
            this._gutter = coerceToString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridList.prototype, "rowHeight", {
        /** Set internal representation of row height from the user-provided value. */
        set: function (value) {
            this._rowHeight = coerceToString(value);
            this._setTileStyler();
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    MdGridList.prototype.ngOnInit = function () {
        this._checkCols();
        this._checkRowHeight();
    };
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     * @internal
     */
    MdGridList.prototype.ngAfterContentChecked = function () {
        this._layoutTiles();
    };
    /** Throw a friendly error if cols property is missing */
    MdGridList.prototype._checkCols = function () {
        if (!this.cols) {
            throw new grid_list_errors_1.MdGridListColsError();
        }
    };
    /** Default to equal width:height if rowHeight property is missing */
    MdGridList.prototype._checkRowHeight = function () {
        if (!this._rowHeight) {
            this._tileStyler = new tile_styler_1.RatioTileStyler('1:1');
        }
    };
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    MdGridList.prototype._setTileStyler = function () {
        if (this._rowHeight === MD_FIT_MODE) {
            this._tileStyler = new tile_styler_1.FitTileStyler();
        }
        else if (this._rowHeight && this._rowHeight.match(/:/g)) {
            this._tileStyler = new tile_styler_1.RatioTileStyler(this._rowHeight);
        }
        else {
            this._tileStyler = new tile_styler_1.FixedTileStyler(this._rowHeight);
        }
    };
    /** Computes and applies the size and position for all children grid tiles. */
    MdGridList.prototype._layoutTiles = function () {
        var tiles = this._tiles.toArray();
        var tracker = new tile_coordinator_1.TileCoordinator(this.cols, tiles);
        this._tileStyler.init(this.gutterSize, tracker, this.cols, this._dir);
        for (var i = 0; i < tiles.length; i++) {
            var pos = tracker.positions[i];
            var tile = tiles[i];
            this._tileStyler.setStyle(tile, pos.row, pos.col);
        }
        this.setListStyle(this._tileStyler.getComputedHeight());
    };
    /**
     * Sets style on the main grid-list element, given the style name and value.
     * @internal
     */
    MdGridList.prototype.setListStyle = function (style) {
        if (style) {
            this._renderer.setElementStyle(this._element.nativeElement, style[0], style[1]);
        }
    };
    __decorate([
        core_1.ContentChildren(grid_tile_1.MdGridTile), 
        __metadata('design:type', core_1.QueryList)
    ], MdGridList.prototype, "_tiles", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdGridList.prototype, "cols", null);
    __decorate([
        core_1.Input('gutterSize'), 
        __metadata('design:type', Object)
    ], MdGridList.prototype, "gutterSize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MdGridList.prototype, "rowHeight", null);
    MdGridList = __decorate([
        core_1.Component({
            selector: 'md-grid-list',
            host: { 'role': 'list' },
            template: "\n              <div class=\"md-grid-list\">\n                <ng-content></ng-content>\n              </div>\n            ",
            styles: ["\n              md-grid-list {\n                display: block;\n                position: relative; }\n\n              md-grid-tile {\n                display: block;\n                position: absolute; }\n                md-grid-tile figure {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  position: absolute;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  -webkit-box-pack: center;\n                  -webkit-justify-content: center;\n                      -ms-flex-pack: center;\n                          justify-content: center;\n                  height: 100%;\n                  top: 0;\n                  right: 0;\n                  bottom: 0;\n                  left: 0;\n                  padding: 0;\n                  margin: 0; }\n                md-grid-tile md-grid-tile-header,\n                md-grid-tile md-grid-tile-footer {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: horizontal;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: row;\n                      -ms-flex-direction: row;\n                          flex-direction: row;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  height: 48px;\n                  color: #fff;\n                  background: rgba(0, 0, 0, 0.18);\n                  overflow: hidden;\n                  position: absolute;\n                  left: 0;\n                  right: 0; }\n                  md-grid-tile md-grid-tile-header h3,\n                  md-grid-tile md-grid-tile-header h4,\n                  md-grid-tile md-grid-tile-footer h3,\n                  md-grid-tile md-grid-tile-footer h4 {\n                    font-weight: 400;\n                    margin: 0 0 0 16px; }\n                  md-grid-tile md-grid-tile-header h3,\n                  md-grid-tile md-grid-tile-footer h3 {\n                    font-size: 14px; }\n                  md-grid-tile md-grid-tile-header h4,\n                  md-grid-tile md-grid-tile-footer h4 {\n                    font-size: 12px; }\n                md-grid-tile md-grid-tile-header {\n                  top: 0; }\n                md-grid-tile md-grid-tile-footer {\n                  bottom: 0; }\n            "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, dir_1.Dir])
    ], MdGridList);
    return MdGridList;
}());
exports.MdGridList = MdGridList;
/**
 * Converts values into strings. Falsy values become empty strings.
 * @internal
 */
function coerceToString(value) {
    return "" + (value || '');
}
exports.coerceToString = coerceToString;
/**
 * Converts a value that might be a string into a number.
 * @internal
 */
function coerceToNumber(value) {
    return typeof value === 'string' ? parseInt(value, 10) : value;
}
exports.coerceToNumber = coerceToNumber;
exports.MD_GRID_LIST_DIRECTIVES = [MdGridList, grid_tile_1.MdGridTile];
//# sourceMappingURL=grid-list.js.map
