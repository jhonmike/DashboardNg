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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var radio_1 = require('./radio');
var radio_dispatcher_1 = require('./radio_dispatcher');
function main() {
    testing_1.describe('MdRadioButton', function () {
        var builder;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.it('should have same name as radio group', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group name=\"my_group\">\n              <md-radio-button></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                fixture.detectChanges();
                testing_1.expect(button.componentInstance.name).toBe('my_group');
            }).then(done);
        });
        testing_1.it('should not allow click selection if disabled', function (done) {
            builder
                .overrideTemplate(TestApp, '<md-radio-button disabled></md-radio-button>')
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                fixture.detectChanges();
                testing_1.expect(button.componentInstance.checked).toBe(false);
                button.nativeElement.click();
                testing_1.expect(button.componentInstance.checked).toBe(false);
            }).then(done);
        });
        testing_1.it('should be disabled if radio group disabled', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group disabled>\n              <md-radio-button></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                fixture.detectChanges();
                testing_1.expect(button.componentInstance.disabled).toBe(true);
            }).then(done);
        });
        testing_1.it('updates parent group value when selected and value changed', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group>\n              <md-radio-button value=\"1\"></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                radioGroupInstance.selected = button.componentInstance;
                fixture.detectChanges();
                testing_1.expect(radioGroupInstance.value).toBe('1');
                button.componentInstance.value = '2';
                fixture.detectChanges();
                testing_1.expect(radioGroupInstance.value).toBe('2');
            }).then(done);
        });
        testing_1.it('should be checked after input change event', function (done) {
            builder
                .overrideTemplate(TestApp, '<md-radio-button></md-radio-button>')
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                var input = button.query(platform_browser_1.By.css('input'));
                fixture.detectChanges();
                testing_1.expect(button.componentInstance.checked).toBe(false);
                var event = createEvent('change');
                input.nativeElement.dispatchEvent(event);
                testing_1.expect(button.componentInstance.checked).toBe(true);
            }).then(done);
        });
        testing_1.it('should emit event when checked', function (done) {
            builder
                .overrideTemplate(TestApp, '<md-radio-button></md-radio-button>')
                .createAsync(TestApp)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                    var changeEvent = null;
                    button.componentInstance.change.subscribe(function (evt) {
                        changeEvent = evt;
                    });
                    button.componentInstance.checked = true;
                    fixture.detectChanges();
                    testing_1.tick();
                    testing_1.expect(changeEvent).not.toBe(null);
                    testing_1.expect(changeEvent.source).toBe(button.componentInstance);
                });
            }).then(done);
        });
        testing_1.it('should be focusable', function (done) {
            builder
                .overrideTemplate(TestApp, '<md-radio-button></md-radio-button>')
                .createAsync(TestApp)
                .then(function (fixture) {
                var button = fixture.debugElement.query(platform_browser_1.By.css('md-radio-button'));
                var input = button.query(platform_browser_1.By.css('input'));
                fixture.detectChanges();
                testing_1.expect(button.nativeElement.classList.contains('md-radio-focused')).toBe(false);
                var event = createEvent('focus');
                input.nativeElement.dispatchEvent(event);
                fixture.detectChanges();
                testing_1.expect(button.nativeElement.classList.contains('md-radio-focused')).toBe(true);
                event = createEvent('blur');
                input.nativeElement.dispatchEvent(event);
                fixture.detectChanges();
                testing_1.expect(button.nativeElement.classList.contains('md-radio-focused')).toBe(false);
            }).then(done);
        });
    });
    testing_1.describe('MdRadioDispatcher', function () {
        var builder;
        var dispatcher;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
            dispatcher = new radio_dispatcher_1.MdRadioDispatcher();
        }));
        testing_1.it('notifies listeners', function () {
            var notificationCount = 0;
            var numListeners = 2;
            for (var i = 0; i < numListeners; i++) {
                dispatcher.listen(function () {
                    notificationCount++;
                });
            }
            dispatcher.notify('hello');
            testing_1.expect(notificationCount).toBe(numListeners);
        });
    });
    testing_1.describe('MdRadioGroup', function () {
        var builder;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.it('can select by value', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group>\n              <md-radio-button value=\"1\"></md-radio-button>\n              <md-radio-button value=\"2\"></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-radio-button'));
                var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                fixture.detectChanges();
                testing_1.expect(radioGroupInstance.selected).toBe(null);
                radioGroupInstance.value = '2';
                fixture.detectChanges();
                testing_1.expect(radioGroupInstance.selected).toBe(buttons[1].componentInstance);
            }).then(done);
        });
        testing_1.it('should select uniquely', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group>\n              <md-radio-button></md-radio-button>\n              <md-radio-button></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-radio-button'));
                var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                fixture.detectChanges();
                testing_1.expect(radioGroupInstance.selected).toBe(null);
                radioGroupInstance.selected = buttons[0].componentInstance;
                fixture.detectChanges();
                testing_1.expect(isSinglySelected(buttons[0], buttons)).toBe(true);
                radioGroupInstance.selected = buttons[1].componentInstance;
                fixture.detectChanges();
                testing_1.expect(isSinglySelected(buttons[1], buttons)).toBe(true);
            }).then(done);
        });
        testing_1.it('should emit event when value changes', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group>\n              <md-radio-button></md-radio-button>\n              <md-radio-button></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-radio-button'));
                    var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                    var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                    var changeEvent = null;
                    radioGroupInstance.change.subscribe(function (evt) {
                        changeEvent = evt;
                    });
                    radioGroupInstance.selected = buttons[1].componentInstance;
                    fixture.detectChanges();
                    testing_1.tick();
                    testing_1.expect(changeEvent).not.toBe(null);
                    testing_1.expect(changeEvent.source).toBe(buttons[1].componentInstance);
                });
            }).then(done);
        });
        testing_1.it('should bind value to model without initial value', function (done) {
            builder
                .overrideTemplate(TestApp, "\n            <md-radio-group  [(ngModel)]=\"choice\">\n              <md-radio-button [value]=\"0\"></md-radio-button>\n              <md-radio-button [value]=\"1\"></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestApp)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-radio-button'));
                    var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                    var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                    fixture.detectChanges();
                    testing_1.expect(buttons[0].componentInstance.checked).toBe(false);
                    testing_1.expect(buttons[1].componentInstance.checked).toBe(false);
                    testing_1.expect(fixture.componentInstance.choice).toBe(undefined);
                    radioGroupInstance.selected = buttons[0].componentInstance;
                    fixture.detectChanges();
                    testing_1.expect(isSinglySelected(buttons[0], buttons)).toBe(true);
                    testing_1.expect(fixture.componentInstance.choice).toBe(0);
                    radioGroupInstance.selected = buttons[1].componentInstance;
                    fixture.detectChanges();
                    testing_1.expect(isSinglySelected(buttons[1], buttons)).toBe(true);
                    testing_1.expect(fixture.componentInstance.choice).toBe(1);
                });
            }).then(done);
        });
        testing_1.it('should bind value to model with initial value', function (done) {
            builder
                .overrideTemplate(TestAppWithInitialValue, "\n            <md-radio-group  [(ngModel)]=\"choice\">\n              <md-radio-button [value]=\"0\"></md-radio-button>\n              <md-radio-button [value]=\"1\"></md-radio-button>\n            </md-radio-group>")
                .createAsync(TestAppWithInitialValue)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-radio-button'));
                    var group = fixture.debugElement.query(platform_browser_1.By.css('md-radio-group'));
                    var radioGroupInstance = group.injector.get(radio_1.MdRadioGroup);
                    fixture.detectChanges();
                    testing_1.expect(isSinglySelected(buttons[1], buttons)).toBe(true);
                    testing_1.expect(fixture.componentInstance.choice).toBe(1);
                    radioGroupInstance.selected = buttons[0].componentInstance;
                    fixture.detectChanges();
                    testing_1.expect(isSinglySelected(buttons[0], buttons)).toBe(true);
                    testing_1.expect(fixture.componentInstance.choice).toBe(0);
                    radioGroupInstance.selected = buttons[1].componentInstance;
                    fixture.detectChanges();
                    testing_1.expect(isSinglySelected(buttons[1], buttons)).toBe(true);
                    testing_1.expect(fixture.componentInstance.choice).toBe(1);
                });
            }).then(done);
        });
    });
}
exports.main = main;
/** Checks whether a given button is uniquely selected from a group of buttons. */
function isSinglySelected(button, buttons) {
    var component = button.componentInstance;
    var otherSelectedButtons = buttons.filter(function (e) {
        return e.componentInstance != component && e.componentInstance.checked;
    });
    return component.checked && otherSelectedButtons.length == 0;
}
/** Browser-agnostic function for creating an event. */
function createEvent(name) {
    var ev;
    try {
        ev = createEvent(name);
    }
    catch (e) {
        ev = document.createEvent('Event');
        ev.initEvent(name, true, true);
    }
    return ev;
}
/** Test component. */
var TestApp = (function () {
    function TestApp() {
    }
    TestApp = __decorate([
        core_1.Component({
            directives: [radio_1.MdRadioButton, radio_1.MdRadioGroup],
            providers: [radio_dispatcher_1.MdRadioDispatcher],
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], TestApp);
    return TestApp;
}());
/** Test component. */
var TestAppWithInitialValue = (function () {
    function TestAppWithInitialValue() {
        this.choice = 1;
    }
    TestAppWithInitialValue = __decorate([
        core_1.Component({
            directives: [radio_1.MdRadioButton, radio_1.MdRadioGroup],
            providers: [radio_dispatcher_1.MdRadioDispatcher],
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], TestAppWithInitialValue);
    return TestAppWithInitialValue;
}());
//# sourceMappingURL=radio.spec.js.map
