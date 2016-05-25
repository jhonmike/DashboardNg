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
/*

<md-card> is a basic content container component that adds the styles of a material design card.

While you can use this component alone,
it also provides a number of preset styles for common card sections, including:
 - md-card-title
 - md-card-subtitle
 - md-card-content
 - md-card-actions
 - md-card-footer

 You can see some examples of cards here:
 http://embed.plnkr.co/s5O4YcyvbLhIApSrIhtj/

 TODO(kara): update link to demo site when it exists

*/
var MdCard = (function () {
    function MdCard() {
    }
    MdCard = __decorate([
        core_1.Component({
            selector: 'md-card',
            template: "\n              <div class=\"md-card\">\n                <ng-content></ng-content>\n              </div>\n            ",
            styles: ["\n              /**\n               * A collection of mixins and CSS classes that can be used to apply elevation to a material\n               * element.\n               * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html\n               * Examples:\n               *\n               *\n               * .md-foo {\n               *   @include $md-elevation(2);\n               *\n               *   &:active {\n               *     @include $md-elevation(8);\n               *   }\n               * }\n               *\n               * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div>\n               *\n               * For an explanation of the design behind how elevation is implemented, see the design doc at\n               * https://goo.gl/Kq0k9Z.\n               */\n              /**\n               * The css property used for elevation. In most cases this should not be changed. It is exposed\n               * as a variable for abstraction / easy use when needing to reference the property directly, for\n               * example in a will-change rule.\n               */\n              /** The default duration value for elevation transitions. */\n              /** The default easing value for elevation transitions. */\n              /**\n               * Applies the correct css rules to an element to give it the elevation specified by $zValue.\n               * The $zValue must be between 0 and 24.\n               */\n              /**\n               * Returns a string that can be used as the value for a transition property for elevation.\n               * Calling this function directly is useful in situations where a component needs to transition\n               * more than one property.\n               *\n               * .foo {\n               *   transition: md-elevation-transition-property-value(), opacity 100ms ease;\n               *   will-change: $md-elevation-property, opacity;\n               * }\n               */\n              /**\n               * Applies the correct css rules needed to have an element transition between elevations.\n               * This mixin should be applied to elements whose elevation values will change depending on their\n               * context (e.g. when active or disabled).\n               */\n              md-card {\n                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n                -webkit-transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n                transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n                will-change: box-shadow;\n                display: block;\n                position: relative;\n                padding: 24px;\n                border-radius: 2px;\n                font-family: Roboto, \"Helvetica Neue\", sans-serif;\n                background: white; }\n\n              md-card:hover {\n                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n\n              .md-card-flat {\n                box-shadow: none; }\n\n              md-card-title, md-card-subtitle, md-card-content, md-card-actions {\n                display: block;\n                margin-bottom: 16px; }\n\n              md-card-title {\n                font-size: 24px;\n                font-weight: 400; }\n\n              md-card-subtitle {\n                font-size: 14px;\n                color: rgba(0, 0, 0, 0.54); }\n\n              md-card-content {\n                font-size: 14px; }\n\n              md-card-actions {\n                margin-left: -16px;\n                margin-right: -16px;\n                padding: 8px 0; }\n                md-card-actions[align='end'] {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-pack: end;\n                  -webkit-justify-content: flex-end;\n                      -ms-flex-pack: end;\n                          justify-content: flex-end; }\n\n              [md-card-image] {\n                width: calc(100% + 48px);\n                margin: 0 -24px 16px -24px; }\n\n              [md-card-xl-image] {\n                width: 240px;\n                height: 240px;\n                margin: -8px; }\n\n              md-card-footer {\n                position: absolute;\n                bottom: 0; }\n\n              md-card-actions [md-button], md-card-actions [md-raised-button] {\n                margin: 0 4px; }\n\n              /* HEADER STYLES */\n              md-card-header {\n                display: -webkit-box;\n                display: -webkit-flex;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-orient: horizontal;\n                -webkit-box-direction: normal;\n                -webkit-flex-direction: row;\n                    -ms-flex-direction: row;\n                        flex-direction: row;\n                height: 40px;\n                margin: -8px 0 16px 0; }\n\n              .md-card-header-text {\n                height: 40px;\n                margin: 0 8px; }\n\n              [md-card-avatar] {\n                height: 40px;\n                width: 40px;\n                border-radius: 50%; }\n\n              md-card-header md-card-title {\n                font-size: 14px; }\n\n              /* TITLE-GROUP STYLES */\n              [md-card-sm-image], [md-card-md-image], [md-card-lg-image] {\n                margin: -8px 0; }\n\n              md-card-title-group {\n                display: -webkit-box;\n                display: -webkit-flex;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-pack: justify;\n                -webkit-justify-content: space-between;\n                    -ms-flex-pack: justify;\n                        justify-content: space-between;\n                margin: 0 -8px; }\n\n              [md-card-sm-image] {\n                width: 80px;\n                height: 80px; }\n\n              [md-card-md-image] {\n                width: 112px;\n                height: 112px; }\n\n              [md-card-lg-image] {\n                width: 152px;\n                height: 152px; }\n\n              /* MEDIA QUERIES */\n              @media (max-width: 600px) {\n                md-card {\n                  padding: 24px 16px; }\n                [md-card-image] {\n                  width: calc(100% + 32px);\n                  margin: 16px -16px; }\n                md-card-title-group {\n                  margin: 0; }\n                [md-card-xl-image] {\n                  margin-left: 0;\n                  margin-right: 0; }\n                md-card-header {\n                  margin: -8px 0 0 0; } }\n\n              /* FIRST/LAST CHILD ADJUSTMENTS */\n              .md-card > :first-child, md-card-content > :first-child {\n                margin-top: 0; }\n\n              .md-card > :last-child, md-card-content > :last-child {\n                margin-bottom: 0; }\n\n              [md-card-image]:first-child {\n                margin-top: -24px; }\n\n              .md-card > md-card-actions:last-child {\n                margin-bottom: -16px;\n                padding-bottom: 0; }\n\n              md-card-actions [md-button]:first-child,\n              md-card-actions [md-raised-button]:first-child {\n                margin-left: 0;\n                margin-right: 0; }\n\n              md-card-title:not(:first-child), md-card-subtitle:not(:first-child) {\n                margin-top: -4px; }\n\n              md-card-header md-card-subtitle:not(:first-child) {\n                margin-top: -8px; }\n\n              .md-card > [md-card-xl-image]:first-child {\n                margin-top: -8px; }\n\n              .md-card > [md-card-xl-image]:last-child {\n                margin-bottom: -8px; }\n            "],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdCard);
    return MdCard;
}());
exports.MdCard = MdCard;
/*  The following components don't have any behavior.
 They simply use content projection to wrap user content
 for flex layout purposes in <md-card> (and thus allow a cleaner, boilerplate-free API).


<md-card-header> is a component intended to be used within the <md-card> component.
It adds styles for a preset header section (i.e. a title, subtitle, and avatar layout).

You can see an example of a card with a header here:
http://embed.plnkr.co/tvJl19z3gZTQd6WmwkIa/

TODO(kara): update link to demo site when it exists
*/
var MdCardHeader = (function () {
    function MdCardHeader() {
    }
    MdCardHeader = __decorate([
        core_1.Component({
            selector: 'md-card-header',
            template: "\n              <ng-content select=\"[md-card-avatar]\"></ng-content>\n              <div class=\"md-card-header-text\">\n                <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content>\n              </div>\n              <ng-content></ng-content>\n            ",
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardHeader);
    return MdCardHeader;
}());
exports.MdCardHeader = MdCardHeader;
/*

<md-card-title-group> is a component intended to be used within the <md-card> component.
It adds styles for a preset layout that groups an image with a title section.

You can see an example of a card with a title-group section here:
http://embed.plnkr.co/EDfgCF9eKcXjini1WODm/

TODO(kara): update link to demo site when it exists
*/
var MdCardTitleGroup = (function () {
    function MdCardTitleGroup() {
    }
    MdCardTitleGroup = __decorate([
        core_1.Component({
            selector: 'md-card-title-group',
            template: "\n              <div>\n                <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content>\n              </div>\n              <ng-content select=\"img\"></ng-content>\n              <ng-content></ng-content>\n            ",
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdCardTitleGroup);
    return MdCardTitleGroup;
}());
exports.MdCardTitleGroup = MdCardTitleGroup;
exports.MD_CARD_DIRECTIVES = [MdCard, MdCardHeader, MdCardTitleGroup];
//# sourceMappingURL=card.js.map
