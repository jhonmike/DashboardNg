import { DynamicComponentLoader, OpaqueToken, ElementRef } from '@angular/core';
import { OverlayState } from './overlay-state';
import { OverlayRef } from './overlay-ref';
import { GlobalPositionStrategy } from './position/global-position-strategy';
import { RelativePositionStrategy } from './position/relative-position-strategy';
export { OverlayState } from './overlay-state';
export { OverlayRef } from './overlay-ref';
export { createOverlayContainer } from './overlay-container';
/** Token used to inject the DOM element that serves as the overlay container. */
export declare const OVERLAY_CONTAINER_TOKEN: OpaqueToken;
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export declare class Overlay {
    private _overlayContainerElement;
    private _dynamicComponentLoader;
    constructor(_overlayContainerElement: HTMLElement, _dynamicComponentLoader: DynamicComponentLoader);
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns A reference to the created overlay.
     */
    create(state?: OverlayState): Promise<OverlayRef>;
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    position(): OverlayPositionBuilder;
    /**
     * Creates the DOM element for an overlay.
     * @param state State to apply to the created element.
     * @returns Promise resolving to the created element.
     */
    private _createPaneElement(state);
    /**
     * Applies a given state to the given pane element.
     * @param pane The pane to modify.
     * @param state The state to apply.
     */
    applyState(pane: HTMLElement, state: OverlayState): void;
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    private _createPortalHost(pane);
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @returns {OverlayRef}
     */
    private _createOverlayRef(pane);
}
/** Builder for overlay position strategy. */
export declare class OverlayPositionBuilder {
    /** Creates a global position strategy. */
    global(): GlobalPositionStrategy;
    /** Creates a relative position strategy. */
    relativeTo(elementRef: ElementRef): RelativePositionStrategy;
}
