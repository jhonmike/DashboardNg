import { ComponentRef, TemplateRef, DynamicComponentLoader, ViewContainerRef } from '@angular/core';
import { Portal, TemplatePortal, ComponentPortal, BasePortalHost } from './portal';
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
export declare class TemplatePortalDirective extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [portalHost]="greeting"></template>
 */
export declare class PortalHostDirective extends BasePortalHost {
    private _dynamicComponentLoader;
    private _viewContainerRef;
    /** The attached portal. */
    private _portal;
    constructor(_dynamicComponentLoader: DynamicComponentLoader, _viewContainerRef: ViewContainerRef);
    portal: Portal<any>;
    /** Attach the given ComponentPortal to this PortlHost using the DynamicComponentLoader. */
    attachComponentPortal(portal: ComponentPortal): Promise<ComponentRef<any>>;
    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
    attachTemplatePortal(portal: TemplatePortal): Promise<Map<string, any>>;
    /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
    private _replaceAttachedPortal(p);
}
