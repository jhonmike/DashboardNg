/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
export declare class MdComponentPortalAttachedToDomWithoutOriginError extends Error {
    constructor();
}
/** Exception thrown when attmepting to attach a null portal to a host. */
export declare class MdNullPortalError extends Error {
    constructor();
}
/** Exception thrown when attmepting to attach a portal to a host that is already attached. */
export declare class MdPortalAlreadyAttachedError extends Error {
    constructor();
}
/** Exception thrown when attmepting to attach a portal to an already-disposed host. */
export declare class MdPortalHostAlreadyDisposedError extends Error {
    constructor();
}
/** Exception thrown when attmepting to attach an unknown portal type. */
export declare class MdUnknownPortalTypeErron extends Error {
    constructor();
}
/** Exception thrown when attmepting to attach a portal to a null host. */
export declare class MdNullPortalHostError extends Error {
    constructor();
}
/** Exception thrown when attmepting to detach a portal that is not attached. */
export declare class MdNoPortalAttachedErron extends Error {
    constructor();
}
