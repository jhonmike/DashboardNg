"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
    __extends(MdComponentPortalAttachedToDomWithoutOriginError, _super);
    function MdComponentPortalAttachedToDomWithoutOriginError() {
        _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
            'because the DOM element is not part of the Angular application context.');
    }
    return MdComponentPortalAttachedToDomWithoutOriginError;
}(Error));
exports.MdComponentPortalAttachedToDomWithoutOriginError = MdComponentPortalAttachedToDomWithoutOriginError;
/** Exception thrown when attmepting to attach a null portal to a host. */
var MdNullPortalError = (function (_super) {
    __extends(MdNullPortalError, _super);
    function MdNullPortalError() {
        _super.call(this, 'Must provide a portal to attach');
    }
    return MdNullPortalError;
}(Error));
exports.MdNullPortalError = MdNullPortalError;
/** Exception thrown when attmepting to attach a portal to a host that is already attached. */
var MdPortalAlreadyAttachedError = (function (_super) {
    __extends(MdPortalAlreadyAttachedError, _super);
    function MdPortalAlreadyAttachedError() {
        _super.call(this, 'Host already has a portal attached');
    }
    return MdPortalAlreadyAttachedError;
}(Error));
exports.MdPortalAlreadyAttachedError = MdPortalAlreadyAttachedError;
/** Exception thrown when attmepting to attach a portal to an already-disposed host. */
var MdPortalHostAlreadyDisposedError = (function (_super) {
    __extends(MdPortalHostAlreadyDisposedError, _super);
    function MdPortalHostAlreadyDisposedError() {
        _super.call(this, 'This PortalHost has already been disposed');
    }
    return MdPortalHostAlreadyDisposedError;
}(Error));
exports.MdPortalHostAlreadyDisposedError = MdPortalHostAlreadyDisposedError;
/** Exception thrown when attmepting to attach an unknown portal type. */
var MdUnknownPortalTypeErron = (function (_super) {
    __extends(MdUnknownPortalTypeErron, _super);
    function MdUnknownPortalTypeErron() {
        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
    return MdUnknownPortalTypeErron;
}(Error));
exports.MdUnknownPortalTypeErron = MdUnknownPortalTypeErron;
/** Exception thrown when attmepting to attach a portal to a null host. */
var MdNullPortalHostError = (function (_super) {
    __extends(MdNullPortalHostError, _super);
    function MdNullPortalHostError() {
        _super.call(this, 'Attmepting to attach a portal to a null PortalHost');
    }
    return MdNullPortalHostError;
}(Error));
exports.MdNullPortalHostError = MdNullPortalHostError;
/** Exception thrown when attmepting to detach a portal that is not attached. */
var MdNoPortalAttachedErron = (function (_super) {
    __extends(MdNoPortalAttachedErron, _super);
    function MdNoPortalAttachedErron() {
        _super.call(this, 'Attmepting to detach a portal that is not attached to a host');
    }
    return MdNoPortalAttachedErron;
}(Error));
exports.MdNoPortalAttachedErron = MdNoPortalAttachedErron;
//# sourceMappingURL=portal-errors.js.map