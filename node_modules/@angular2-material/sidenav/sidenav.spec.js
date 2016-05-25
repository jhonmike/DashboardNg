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
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var sidenav_1 = require('./sidenav');
function fakeAsyncAdaptor(fn) {
    return testing_1.inject([], testing_1.fakeAsync(fn));
}
/**
 * Create a ComponentFixture from the builder. This takes a template and a style for sidenav.
 */
function createFixture(appType, builder, template, style) {
    var fixture = null;
    // Remove the styles (which remove the animations/transitions).
    builder
        .overrideView(sidenav_1.MdSidenavLayout, new core_1.ViewMetadata({
        template: template,
        styles: [style],
        directives: [sidenav_1.MdSidenav],
    }))
        .createAsync(appType).then(function (f) { fixture = f; });
    testing_1.tick();
    return fixture;
}
function endSidenavTransition(fixture) {
    var sidenav = fixture.debugElement.query(platform_browser_1.By.directive(sidenav_1.MdSidenav)).componentInstance;
    sidenav.onTransitionEnd({
        target: sidenav._elementRef.nativeElement,
        propertyName: 'transform'
    });
    fixture.detectChanges();
}
function main() {
    testing_1.describe('MdSidenav', function () {
        var template;
        var style;
        var builder;
        /**
         * We need to get the template and styles for the sidenav in an Async test.
         * FakeAsync would block indefinitely on the XHR if we were to create the component async-ly.
         * See https://github.com/angular/angular/issues/5601.
         * We do some style verification so styles have to match.
         * But we remove the transitions so we only set the regular `sidenav.css` styling.
         */
        testing_1.beforeEach(testing_1.injectAsync([testing_2.TestComponentBuilder, compiler_1.XHR], function (tcb, xhr) {
            builder = tcb;
            return Promise.all([
                xhr.get('./components/sidenav/sidenav.html').then(function (t) { template = t; }),
                xhr.get('./components/sidenav/sidenav.css').then(function (css) { style = css; })
            ]).catch(function (err) {
                console.error(err);
            });
        }));
        testing_1.describe('methods', function () {
            testing_1.it('should be able to open and close', fakeAsyncAdaptor(function () {
                var fixture = createFixture(BasicTestApp, builder, template, style);
                var testComponent = fixture.debugElement.componentInstance;
                var openButtonElement = fixture.debugElement.query(platform_browser_1.By.css('.open'));
                openButtonElement.nativeElement.click();
                fixture.detectChanges();
                testing_1.tick();
                testing_1.expect(testComponent.openStartCount).toBe(1);
                testing_1.expect(testComponent.openCount).toBe(0);
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(testComponent.openStartCount).toBe(1);
                testing_1.expect(testComponent.openCount).toBe(1);
                testing_1.expect(testComponent.closeStartCount).toBe(0);
                testing_1.expect(testComponent.closeCount).toBe(0);
                var sidenavElement = fixture.debugElement.query(platform_browser_1.By.css('md-sidenav'));
                var sidenavBackdropElement = fixture.debugElement.query(platform_browser_1.By.css('.md-sidenav-backdrop'));
                testing_1.expect(getComputedStyle(sidenavElement.nativeElement).visibility).toEqual('visible');
                testing_1.expect(getComputedStyle(sidenavBackdropElement.nativeElement).visibility)
                    .toEqual('visible');
                // Close it.
                var closeButtonElement = fixture.debugElement.query(platform_browser_1.By.css('.close'));
                closeButtonElement.nativeElement.click();
                fixture.detectChanges();
                testing_1.tick();
                testing_1.expect(testComponent.openStartCount).toBe(1);
                testing_1.expect(testComponent.openCount).toBe(1);
                testing_1.expect(testComponent.closeStartCount).toBe(1);
                testing_1.expect(testComponent.closeCount).toBe(0);
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(testComponent.openStartCount).toBe(1);
                testing_1.expect(testComponent.openCount).toBe(1);
                testing_1.expect(testComponent.closeStartCount).toBe(1);
                testing_1.expect(testComponent.closeCount).toBe(1);
                testing_1.expect(getComputedStyle(sidenavElement.nativeElement).visibility).toEqual('hidden');
                testing_1.expect(getComputedStyle(sidenavBackdropElement.nativeElement).visibility).toEqual('hidden');
            }));
            testing_1.it('open/close() return a promise that resolves after animation end', fakeAsyncAdaptor(function () {
                var fixture = createFixture(BasicTestApp, builder, template, style);
                var sidenav = fixture.debugElement
                    .query(platform_browser_1.By.directive(sidenav_1.MdSidenav)).componentInstance;
                var called = false;
                sidenav.open().then(function () {
                    called = true;
                });
                testing_1.expect(called).toBe(false);
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(called).toBe(true);
                called = false;
                sidenav.close().then(function () {
                    called = true;
                });
                testing_1.expect(called).toBe(false);
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(called).toBe(true);
            }));
            testing_1.it('open/close() twice returns the same promise', fakeAsyncAdaptor(function () {
                var fixture = createFixture(BasicTestApp, builder, template, style);
                var sidenav = fixture.debugElement
                    .query(platform_browser_1.By.directive(sidenav_1.MdSidenav)).componentInstance;
                var promise = sidenav.open();
                testing_1.expect(sidenav.open()).toBe(promise);
                fixture.detectChanges();
                testing_1.tick();
                promise = sidenav.close();
                testing_1.expect(sidenav.close()).toBe(promise);
                testing_1.tick();
            }));
            testing_1.it('open() then close() cancel animations when called too fast', fakeAsyncAdaptor(function () {
                var fixture = createFixture(BasicTestApp, builder, template, style);
                var sidenav = fixture.debugElement
                    .query(platform_browser_1.By.directive(sidenav_1.MdSidenav)).componentInstance;
                var openCalled = false;
                var openCancelled = false;
                var closeCalled = false;
                sidenav.open().then(function () { openCalled = true; }, function () { openCancelled = true; });
                // We do not call transition end, close directly.
                sidenav.close().then(function () { closeCalled = true; });
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(openCalled).toBe(false);
                testing_1.expect(openCancelled).toBe(true);
                testing_1.expect(closeCalled).toBe(true);
                testing_1.tick();
            }));
            testing_1.it('close() then open() cancel animations when called too fast', fakeAsyncAdaptor(function () {
                var fixture = createFixture(BasicTestApp, builder, template, style);
                var sidenav = fixture.debugElement
                    .query(platform_browser_1.By.directive(sidenav_1.MdSidenav)).componentInstance;
                var closeCalled = false;
                var closeCancelled = false;
                var openCalled = false;
                // First, open the sidenav completely.
                sidenav.open();
                endSidenavTransition(fixture);
                testing_1.tick();
                // Then close and check behavior.
                sidenav.close().then(function () { closeCalled = true; }, function () { closeCancelled = true; });
                // We do not call transition end, open directly.
                sidenav.open().then(function () { openCalled = true; });
                endSidenavTransition(fixture);
                testing_1.tick();
                testing_1.expect(closeCalled).toBe(false);
                testing_1.expect(closeCancelled).toBe(true);
                testing_1.expect(openCalled).toBe(true);
                testing_1.tick();
            }));
            testing_1.it('does not throw when created without a sidenav', fakeAsyncAdaptor(function () {
                testing_1.expect(function () {
                    var fixture = createFixture(SidenavLayoutNoSidenavTestApp, builder, template, style);
                    fixture.detectChanges();
                    testing_1.tick();
                }).not.toThrow();
            }));
            testing_1.it('does throw when created with two sidenav on the same side', fakeAsyncAdaptor(function () {
                testing_1.expect(function () {
                    var fixture = createFixture(SidenavLayoutTwoSidenavTestApp, builder, template, style);
                    fixture.detectChanges();
                    testing_1.tick();
                }).toThrow();
            }));
        });
    });
}
exports.main = main;
/** Test component that contains an MdSidenavLayout but no MdSidenav. */
var SidenavLayoutNoSidenavTestApp = (function () {
    function SidenavLayoutNoSidenavTestApp() {
    }
    SidenavLayoutNoSidenavTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            directives: [sidenav_1.MD_SIDENAV_DIRECTIVES],
            template: "\n    <md-sidenav-layout>\n    </md-sidenav-layout>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], SidenavLayoutNoSidenavTestApp);
    return SidenavLayoutNoSidenavTestApp;
}());
/** Test component that contains an MdSidenavLayout and 2 MdSidenav on the same side. */
var SidenavLayoutTwoSidenavTestApp = (function () {
    function SidenavLayoutTwoSidenavTestApp() {
    }
    SidenavLayoutTwoSidenavTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            directives: [sidenav_1.MD_SIDENAV_DIRECTIVES],
            template: "\n    <md-sidenav-layout>\n      <md-sidenav> </md-sidenav>\n      <md-sidenav> </md-sidenav>\n    </md-sidenav-layout>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], SidenavLayoutTwoSidenavTestApp);
    return SidenavLayoutTwoSidenavTestApp;
}());
/** Test component that contains an MdSidenavLayout and one MdSidenav. */
var BasicTestApp = (function () {
    function BasicTestApp() {
        this.openStartCount = 0;
        this.openCount = 0;
        this.closeStartCount = 0;
        this.closeCount = 0;
    }
    BasicTestApp.prototype.openStart = function () {
        this.openStartCount++;
    };
    BasicTestApp.prototype.open = function () {
        this.openCount++;
    };
    BasicTestApp.prototype.closeStart = function () {
        this.closeStartCount++;
    };
    BasicTestApp.prototype.close = function () {
        this.closeCount++;
    };
    BasicTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            directives: [sidenav_1.MD_SIDENAV_DIRECTIVES],
            template: "\n    <md-sidenav-layout>\n      <md-sidenav #sidenav align=\"start\"\n                  (open-start)=\"openStart()\"\n                  (open)=\"open()\"\n                  (close-start)=\"closeStart()\"\n                  (close)=\"close()\">\n        Content.\n      </md-sidenav>\n      <button (click)=\"sidenav.open()\" class=\"open\"></button>\n      <button (click)=\"sidenav.close()\" class=\"close\"></button>\n    </md-sidenav-layout>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], BasicTestApp);
    return BasicTestApp;
}());
//# sourceMappingURL=sidenav.spec.js.map
