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
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var http_1 = require('@angular/http');
var testing_3 = require('@angular/http/testing');
var core_1 = require('@angular/core');
var icon_1 = require('./icon');
var icon_registry_1 = require('./icon-registry');
var fake_svgs_1 = require('./fake-svgs');
/** Returns the CSS classes assigned to an element as a sorted array. */
var sortedClassNames = function (elem) { return elem.className.split(' ').sort(); };
/**
 * Verifies that an element contains a single <svg> child element, and returns that child.
 */
var verifyAndGetSingleSvgChild = function (element) {
    testing_1.expect(element.childNodes.length).toBe(1);
    var svgChild = element.childNodes[0];
    testing_1.expect(svgChild.tagName.toLowerCase()).toBe('svg');
    return svgChild;
};
/**
 * Verifies that an element contains a single <path> child element whose "id" attribute has
 * the specified value.
 */
var verifyPathChildElement = function (element, attributeValue) {
    testing_1.expect(element.childNodes.length).toBe(1);
    var pathElement = element.childNodes[0];
    testing_1.expect(pathElement.tagName.toLowerCase()).toBe('path');
    testing_1.expect(pathElement.getAttribute('id')).toBe(attributeValue);
};
function main() {
    testing_1.describe('MdIcon', function () {
        testing_1.beforeEachProviders(function () { return [
            icon_registry_1.MdIconRegistry,
            http_1.HTTP_PROVIDERS,
            testing_3.MockBackend,
            core_1.provide(http_1.XHRBackend, { useExisting: testing_3.MockBackend }),
        ]; });
        var builder;
        var mdIconRegistry;
        var httpRequestUrls;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder, icon_registry_1.MdIconRegistry, testing_3.MockBackend], function (tcb, mir, mockBackend) {
            builder = tcb;
            mdIconRegistry = mir;
            // Keep track of requests so we can verify caching behavior.
            // Return responses for the SVGs defined in fake-svgs.ts.
            httpRequestUrls = [];
            mockBackend.connections.subscribe(function (connection) {
                var url = connection.request.url;
                httpRequestUrls.push(url);
                connection.mockRespond(fake_svgs_1.getFakeSvgHttpResponse(url));
            });
        }));
        testing_1.describe('Ligature icons', function () {
            testing_1.it('should add material-icons class by default', function (done) {
                return builder.createAsync(MdIconLigatureTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.iconName = 'home';
                    fixture.detectChanges();
                    testing_1.expect(sortedClassNames(mdIconElement)).toEqual(['material-icons']);
                    done();
                });
            });
            testing_1.it('should use alternate icon font if set', function (done) {
                mdIconRegistry.setDefaultFontSetClass('myfont');
                return builder.createAsync(MdIconLigatureTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.iconName = 'home';
                    fixture.detectChanges();
                    testing_1.expect(sortedClassNames(mdIconElement)).toEqual(['myfont']);
                    done();
                });
            });
        });
        testing_1.describe('Icons from URLs', function () {
            testing_1.it('should fetch SVG icon from URL and inline the content', function (done) {
                return builder.createAsync(MdIconFromSvgUrlTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    testComponent.iconUrl = 'cat.svg';
                    fixture.detectChanges();
                    // An <svg> element should have been added as a child of <md-icon>.
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    // Default attributes should be set.
                    testing_1.expect(svgElement.getAttribute('height')).toBe('100%');
                    testing_1.expect(svgElement.getAttribute('height')).toBe('100%');
                    // Make sure SVG content is taken from response.
                    verifyPathChildElement(svgElement, 'meow');
                    // Change the icon, and the SVG element should be replaced.
                    testComponent.iconUrl = 'dog.svg';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'woof');
                    testing_1.expect(httpRequestUrls).toEqual(['cat.svg', 'dog.svg']);
                    // Using an icon from a previously loaded URL should not cause another HTTP request.
                    testComponent.iconUrl = 'cat.svg';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'meow');
                    testing_1.expect(httpRequestUrls).toEqual(['cat.svg', 'dog.svg']);
                    done();
                });
            });
            testing_1.it('should register icon URLs by name', function (done) {
                mdIconRegistry.addSvgIcon('fluffy', 'cat.svg');
                mdIconRegistry.addSvgIcon('fido', 'dog.svg');
                return builder.createAsync(MdIconFromSvgNameTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    testComponent.iconName = 'fido';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'woof');
                    // The aria label should be taken from the icon name.
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('fido');
                    // Change the icon, and the SVG element should be replaced.
                    testComponent.iconName = 'fluffy';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'meow');
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('fluffy');
                    testing_1.expect(httpRequestUrls).toEqual(['dog.svg', 'cat.svg']);
                    // Using an icon from a previously loaded URL should not cause another HTTP request.
                    testComponent.iconName = 'fido';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'woof');
                    testing_1.expect(httpRequestUrls).toEqual(['dog.svg', 'cat.svg']);
                    done();
                });
            });
            testing_1.it('should extract icon from SVG icon set', function (done) {
                mdIconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-1.svg');
                return builder.createAsync(MdIconFromSvgNameTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    var svgChild;
                    testComponent.iconName = 'farm:pig';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.childNodes.length).toBe(1);
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    testing_1.expect(svgElement.childNodes.length).toBe(1);
                    svgChild = svgElement.childNodes[0];
                    // The first <svg> child should be the <g id="pig"> element.
                    testing_1.expect(svgChild.tagName.toLowerCase()).toBe('g');
                    testing_1.expect(svgChild.getAttribute('id')).toBe('pig');
                    verifyPathChildElement(svgChild, 'oink');
                    // The aria label should be taken from the icon name (without the icon set portion).
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('pig');
                    // Change the icon, and the SVG element should be replaced.
                    testComponent.iconName = 'farm:cow';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    svgChild = svgElement.childNodes[0];
                    // The first <svg> child should be the <g id="cow"> element.
                    testing_1.expect(svgChild.tagName.toLowerCase()).toBe('g');
                    testing_1.expect(svgChild.getAttribute('id')).toBe('cow');
                    verifyPathChildElement(svgChild, 'moo');
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('cow');
                    done();
                });
            });
            testing_1.it('should allow multiple icon sets in a namespace', function (done) {
                mdIconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-1.svg');
                mdIconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-2.svg');
                mdIconRegistry.addSvgIconSetInNamespace('arrows', 'arrow-set.svg');
                return builder.createAsync(MdIconFromSvgNameTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    var svgChild;
                    testComponent.iconName = 'farm:pig';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    testing_1.expect(svgElement.childNodes.length).toBe(1);
                    svgChild = svgElement.childNodes[0];
                    // The <svg> child should be the <g id="pig"> element.
                    testing_1.expect(svgChild.tagName.toLowerCase()).toBe('g');
                    testing_1.expect(svgChild.getAttribute('id')).toBe('pig');
                    testing_1.expect(svgChild.childNodes.length).toBe(1);
                    verifyPathChildElement(svgChild, 'oink');
                    // The aria label should be taken from the icon name (without the namespace).
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('pig');
                    // Both icon sets registered in the 'farm' namespace should have been fetched.
                    testing_1.expect(httpRequestUrls.sort()).toEqual(['farm-set-1.svg', 'farm-set-2.svg']);
                    // Change the icon name to one that appears in both icon sets. The icon from the set that
                    // was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
                    // and no additional HTTP request should be made.
                    testComponent.iconName = 'farm:cow';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    svgChild = svgElement.childNodes[0];
                    // The first <svg> child should be the <g id="cow"> element.
                    testing_1.expect(svgChild.tagName.toLowerCase()).toBe('g');
                    testing_1.expect(svgChild.getAttribute('id')).toBe('cow');
                    testing_1.expect(svgChild.childNodes.length).toBe(1);
                    verifyPathChildElement(svgChild, 'moo moo');
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('cow');
                    testing_1.expect(httpRequestUrls.sort()).toEqual(['farm-set-1.svg', 'farm-set-2.svg']);
                    done();
                });
            });
            testing_1.it('should not wrap <svg> elements in icon sets in another svg tag', function (done) {
                mdIconRegistry.addSvgIconSet('arrow-set.svg');
                return builder.createAsync(MdIconFromSvgNameTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    testComponent.iconName = 'left-arrow';
                    fixture.detectChanges();
                    // arrow-set.svg stores its icons as nested <svg> elements, so they should be used
                    // directly and not wrapped in an outer <svg> tag like the <g> elements in other sets.
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'left');
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('left-arrow');
                    done();
                });
            });
            testing_1.it('should return unmodified copies of icons from URLs', function (done) {
                return builder.createAsync(MdIconFromSvgUrlTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    testComponent.iconUrl = 'cat.svg';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'meow');
                    // Modify the SVG element by setting a viewBox attribute.
                    svgElement.setAttribute('viewBox', '0 0 100 100');
                    // Switch to a different icon.
                    testComponent.iconUrl = 'dog.svg';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'woof');
                    // Switch back to the first icon. The viewBox attribute should not be present.
                    testComponent.iconUrl = 'cat.svg';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'meow');
                    testing_1.expect(svgElement.getAttribute('viewBox')).toBeFalsy();
                    done();
                });
            });
            testing_1.it('should return unmodified copies of icons from icon sets', function (done) {
                mdIconRegistry.addSvgIconSet('arrow-set.svg');
                return builder.createAsync(MdIconFromSvgNameTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    var svgElement;
                    testComponent.iconName = 'left-arrow';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'left');
                    // Modify the SVG element by setting a viewBox attribute.
                    svgElement.setAttribute('viewBox', '0 0 100 100');
                    // Switch to a different icon.
                    testComponent.iconName = 'right-arrow';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'right');
                    // Switch back to the first icon. The viewBox attribute should not be present.
                    testComponent.iconName = 'left-arrow';
                    fixture.detectChanges();
                    svgElement = verifyAndGetSingleSvgChild(mdIconElement);
                    verifyPathChildElement(svgElement, 'left');
                    testing_1.expect(svgElement.getAttribute('viewBox')).toBeFalsy();
                    done();
                });
            });
        });
        testing_1.describe('custom fonts', function () {
            testing_1.it('should apply CSS classes for custom font and icon', function (done) {
                mdIconRegistry.registerFontClassAlias('f1', 'font1');
                mdIconRegistry.registerFontClassAlias('f2');
                return builder.createAsync(MdIconCustomFontCssTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.fontSet = 'f1';
                    testComponent.fontIcon = 'house';
                    fixture.detectChanges();
                    testing_1.expect(sortedClassNames(mdIconElement)).toEqual(['font1', 'house']);
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('house');
                    testComponent.fontSet = 'f2';
                    testComponent.fontIcon = 'igloo';
                    fixture.detectChanges();
                    testing_1.expect(sortedClassNames(mdIconElement)).toEqual(['f2', 'igloo']);
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('igloo');
                    testComponent.fontSet = 'f3';
                    testComponent.fontIcon = 'tent';
                    fixture.detectChanges();
                    testing_1.expect(sortedClassNames(mdIconElement)).toEqual(['f3', 'tent']);
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('tent');
                    done();
                });
            });
        });
        testing_1.describe('aria label', function () {
            testing_1.it('should set aria label from text content if not specified', function (done) {
                return builder.createAsync(MdIconLigatureTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.iconName = 'home';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('home');
                    testComponent.iconName = 'hand';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('hand');
                    done();
                });
            });
            testing_1.it('should use alt tag if aria label is not specified', function (done) {
                return builder.createAsync(MdIconLigatureWithAriaBindingTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.iconName = 'home';
                    testComponent.altText = 'castle';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('castle');
                    testComponent.ariaLabel = 'house';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('house');
                    done();
                });
            });
            testing_1.it('should use provided aria label rather than icon name', function (done) {
                return builder.createAsync(MdIconLigatureWithAriaBindingTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.iconName = 'home';
                    testComponent.ariaLabel = 'house';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('house');
                    done();
                });
            });
            testing_1.it('should use provided aria label rather than font icon', function (done) {
                return builder.createAsync(MdIconCustomFontCssTestApp).then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var mdIconElement = fixture.debugElement.nativeElement.querySelector('md-icon');
                    testComponent.fontSet = 'f1';
                    testComponent.fontIcon = 'house';
                    testComponent.ariaLabel = 'home';
                    fixture.detectChanges();
                    testing_1.expect(mdIconElement.getAttribute('aria-label')).toBe('home');
                    done();
                });
            });
        });
    });
}
exports.main = main;
/** Test components that contain an MdIcon. */
var MdIconLigatureTestApp = (function () {
    function MdIconLigatureTestApp() {
        this.ariaLabel = null;
        this.iconName = '';
    }
    MdIconLigatureTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "<md-icon>{{iconName}}</md-icon>",
            directives: [icon_1.MdIcon],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconLigatureTestApp);
    return MdIconLigatureTestApp;
}());
var MdIconLigatureWithAriaBindingTestApp = (function () {
    function MdIconLigatureWithAriaBindingTestApp() {
        this.ariaLabel = null;
        this.iconName = '';
    }
    MdIconLigatureWithAriaBindingTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "<md-icon [aria-label]=\"ariaLabel\" [alt]=\"altText\">{{iconName}}</md-icon>",
            directives: [icon_1.MdIcon],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconLigatureWithAriaBindingTestApp);
    return MdIconLigatureWithAriaBindingTestApp;
}());
var MdIconCustomFontCssTestApp = (function () {
    function MdIconCustomFontCssTestApp() {
        this.ariaLabel = null;
        this.fontSet = '';
        this.fontIcon = '';
    }
    MdIconCustomFontCssTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "\n      <md-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\" [aria-label]=\"ariaLabel\"></md-icon>\n  ",
            directives: [icon_1.MdIcon],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconCustomFontCssTestApp);
    return MdIconCustomFontCssTestApp;
}());
var MdIconFromSvgUrlTestApp = (function () {
    function MdIconFromSvgUrlTestApp() {
        this.ariaLabel = null;
        this.iconUrl = '';
    }
    MdIconFromSvgUrlTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "<md-icon [svgSrc]=\"iconUrl\" [aria-label]=\"ariaLabel\"></md-icon>",
            directives: [icon_1.MdIcon],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconFromSvgUrlTestApp);
    return MdIconFromSvgUrlTestApp;
}());
var MdIconFromSvgNameTestApp = (function () {
    function MdIconFromSvgNameTestApp() {
        this.ariaLabel = null;
        this.iconName = '';
    }
    MdIconFromSvgNameTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "<md-icon [svgIcon]=\"iconName\" [aria-label]=\"ariaLabel\"></md-icon>",
            directives: [icon_1.MdIcon],
        }), 
        __metadata('design:paramtypes', [])
    ], MdIconFromSvgNameTestApp);
    return MdIconFromSvgNameTestApp;
}());
//# sourceMappingURL=icon.spec.js.map
