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
var overlay_state_1 = require('./overlay-state');
var dom_portal_host_1 = require('../portal/dom-portal-host');
var overlay_ref_1 = require('./overlay-ref');
var global_position_strategy_1 = require('./position/global-position-strategy');
var relative_position_strategy_1 = require('./position/relative-position-strategy');
// Re-export overlay-related modules so they can be imported directly from here.
var overlay_state_2 = require('./overlay-state');
exports.OverlayState = overlay_state_2.OverlayState;
var overlay_ref_2 = require('./overlay-ref');
exports.OverlayRef = overlay_ref_2.OverlayRef;
var overlay_container_1 = require('./overlay-container');
exports.createOverlayContainer = overlay_container_1.createOverlayContainer;
/** Token used to inject the DOM element that serves as the overlay container. */
exports.OVERLAY_CONTAINER_TOKEN = new core_1.OpaqueToken('overlayContainer');
/** Next overlay unique ID. */
var nextUniqueId = 0;
/** The default state for newly created overlays. */
var defaultState = new overlay_state_1.OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = (function () {
    function Overlay(_overlayContainerElement, _dynamicComponentLoader) {
        this._overlayContainerElement = _overlayContainerElement;
        this._dynamicComponentLoader = _dynamicComponentLoader;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns A reference to the created overlay.
     */
    Overlay.prototype.create = function (state) {
        var _this = this;
        if (state === void 0) { state = defaultState; }
        return this._createPaneElement(state).then(function (pane) { return _this._createOverlayRef(pane); });
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    Overlay.prototype.position = function () {
        return POSITION_BUILDER;
    };
    /**
     * Creates the DOM element for an overlay.
     * @param state State to apply to the created element.
     * @returns Promise resolving to the created element.
     */
    Overlay.prototype._createPaneElement = function (state) {
        var pane = document.createElement('div');
        pane.id = "md-overlay-" + nextUniqueId++;
        pane.classList.add('md-overlay-pane');
        this.applyState(pane, state);
        this._overlayContainerElement.appendChild(pane);
        return Promise.resolve(pane);
    };
    /**
     * Applies a given state to the given pane element.
     * @param pane The pane to modify.
     * @param state The state to apply.
     */
    Overlay.prototype.applyState = function (pane, state) {
        if (state.positionStrategy != null) {
            state.positionStrategy.apply(pane);
        }
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new dom_portal_host_1.DomPortalHost(pane, this._dynamicComponentLoader);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @returns {OverlayRef}
     */
    Overlay.prototype._createOverlayRef = function (pane) {
        return new overlay_ref_1.OverlayRef(this._createPortalHost(pane));
    };
    Overlay = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.OVERLAY_CONTAINER_TOKEN)), 
        __metadata('design:paramtypes', [HTMLElement, core_1.DynamicComponentLoader])
    ], Overlay);
    return Overlay;
}());
exports.Overlay = Overlay;
/** Builder for overlay position strategy. */
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder() {
    }
    /** Creates a global position strategy. */
    OverlayPositionBuilder.prototype.global = function () {
        return new global_position_strategy_1.GlobalPositionStrategy();
    };
    /** Creates a relative position strategy. */
    OverlayPositionBuilder.prototype.relativeTo = function (elementRef) {
        return new relative_position_strategy_1.RelativePositionStrategy(elementRef);
    };
    return OverlayPositionBuilder;
}());
exports.OverlayPositionBuilder = OverlayPositionBuilder;
// We only ever need one position builder.
var POSITION_BUILDER = new OverlayPositionBuilder();
//# sourceMappingURL=overlay.js.map