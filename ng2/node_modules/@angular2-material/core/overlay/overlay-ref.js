"use strict";
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = (function () {
    function OverlayRef(_portalHost) {
        this._portalHost = _portalHost;
    }
    OverlayRef.prototype.attach = function (portal) {
        return this._portalHost.attach(portal);
    };
    OverlayRef.prototype.detach = function () {
        return this._portalHost.detach();
    };
    OverlayRef.prototype.dispose = function () {
        this._portalHost.dispose();
    };
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    return OverlayRef;
}());
exports.OverlayRef = OverlayRef;
//# sourceMappingURL=overlay-ref.js.map