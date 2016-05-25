import { PortalHost, Portal } from '../portal/portal';
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export declare class OverlayRef implements PortalHost {
    private _portalHost;
    constructor(_portalHost: PortalHost);
    attach(portal: Portal<any>): Promise<any>;
    detach(): Promise<any>;
    dispose(): void;
    hasAttached(): boolean;
}
