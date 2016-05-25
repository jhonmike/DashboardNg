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
/**
 * Class for radio buttons to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 */
var MdRadioDispatcher = (function () {
    function MdRadioDispatcher() {
        this._listeners = [];
    }
    /** Notify other radio buttons that selection for the given name has been set. */
    MdRadioDispatcher.prototype.notify = function (name) {
        this._listeners.forEach(function (listener) { return listener(name); });
    };
    /** Listen for future changes to radio button selection. */
    MdRadioDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    MdRadioDispatcher = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MdRadioDispatcher);
    return MdRadioDispatcher;
}());
exports.MdRadioDispatcher = MdRadioDispatcher;
//# sourceMappingURL=radio_dispatcher.js.map
