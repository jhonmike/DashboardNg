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
var input_1 = require('./input');
function main() {
    testing_1.describe('MdInput', function () {
        var builder;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.it('creates a native <input> element', function () {
            return builder.createAsync(MdInputBaseTestController)
                .then(function (fixture) {
                fixture.detectChanges();
                testing_1.expect(fixture.debugElement.query(platform_browser_1.By.css('input'))).toBeTruthy();
            });
        });
        testing_1.it('support ngModel', function () {
            return builder.createAsync(MdInputBaseTestController)
                .then(function (fixture) {
                fixture.detectChanges();
                testing_1.fakeAsync(function () {
                    var instance = fixture.componentInstance;
                    var component = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
                    var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                    instance.model = 'hello';
                    fixture.detectChanges();
                    testing_1.tick();
                    testing_1.expect(el.value).toEqual('hello');
                    component.value = 'world';
                    fixture.detectChanges();
                    testing_1.tick();
                    testing_1.expect(el.value).toEqual('world');
                })();
            });
        });
        testing_1.it('counts characters', function () {
            return builder.createAsync(MdInputBaseTestController).then(function (fixture) {
                var instance = fixture.componentInstance;
                fixture.detectChanges();
                var inputInstance = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
                testing_1.expect(inputInstance.characterCount).toEqual(0);
                instance.model = 'hello';
                fixture.detectChanges();
                testing_1.expect(inputInstance.characterCount).toEqual(5);
            });
        });
        testing_1.it('copies aria attributes to the inner input', function () {
            return builder.createAsync(MdInputAriaTestController)
                .then(function (fixture) {
                var instance = fixture.componentInstance;
                fixture.detectChanges();
                var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                testing_1.expect(el.getAttribute('aria-label')).toEqual('label');
                instance.ariaLabel = 'label 2';
                fixture.detectChanges();
                testing_1.expect(el.getAttribute('aria-label')).toEqual('label 2');
                testing_1.expect(el.getAttribute('aria-disabled')).toBeTruthy();
            });
        });
        testing_1.it('validates there\'s only one hint label per side', function () {
            return builder.createAsync(MdInputInvalidHintTestController)
                .then(function (fixture) {
                testing_1.expect(function () { return fixture.detectChanges(); })
                    .toThrow();
                // TODO(jelbourn): .toThrow(new MdInputDuplicatedHintError('start'));
                // See https://github.com/angular/angular/issues/8348
            });
        });
        testing_1.it("validates there's only one hint label per side (attribute)", function () {
            return builder.createAsync(MdInputInvalidHint2TestController)
                .then(function (fixture) {
                testing_1.expect(function () { return fixture.detectChanges(); })
                    .toThrow();
                // TODO(jelbourn): .toThrow(new MdInputDuplicatedHintError('start'));
                // See https://github.com/angular/angular/issues/8348
            });
        });
        testing_1.it('validates there\'s only one placeholder', function () {
            return builder.createAsync(MdInputInvalidPlaceholderTestController)
                .then(function (fixture) {
                testing_1.expect(function () { return fixture.detectChanges(); })
                    .toThrow();
                // TODO(jelbourn): .toThrow(new MdInputPlaceholderConflictError());
                // See https://github.com/angular/angular/issues/8348
            });
        });
        testing_1.it('validates the type', function () {
            return builder.createAsync(MdInputInvalidTypeTestController)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    // Technically this throws during the OnChanges detection phase,
                    // so the error is really a ChangeDetectionError and it becomes
                    // hard to build a full exception to compare with.
                    // We just check for any exception in this case.
                    testing_1.expect(function () { return fixture.detectChanges(); })
                        .toThrow();
                })();
            });
        });
        testing_1.it('supports hint labels attribute', function () {
            return builder.createAsync(MdInputHintLabelTestController)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    fixture.detectChanges();
                    // If the hint label is empty, expect no label.
                    testing_1.expect(fixture.debugElement.query(platform_browser_1.By.css('.md-hint'))).toBeNull();
                    fixture.componentInstance.label = 'label';
                    fixture.detectChanges();
                    testing_1.expect(fixture.debugElement.query(platform_browser_1.By.css('.md-hint'))).not.toBeNull();
                })();
            });
        });
        testing_1.it('supports hint labels elements', function () {
            return builder.createAsync(MdInputHintLabel2TestController)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    fixture.detectChanges();
                    // In this case, we should have an empty <md-hint>.
                    var el = fixture.debugElement.query(platform_browser_1.By.css('md-hint')).nativeElement;
                    testing_1.expect(el.textContent).toBeFalsy();
                    fixture.componentInstance.label = 'label';
                    fixture.detectChanges();
                    el = fixture.debugElement.query(platform_browser_1.By.css('md-hint')).nativeElement;
                    testing_1.expect(el.textContent).toBe('label');
                })();
            });
        });
        testing_1.it('supports placeholder attribute', function () {
            return builder.createAsync(MdInputPlaceholderAttrTestComponent)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    fixture.detectChanges();
                    var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
                    testing_1.expect(el).toBeNull();
                    fixture.componentInstance.placeholder = 'Other placeholder';
                    fixture.detectChanges();
                    el = fixture.debugElement.query(platform_browser_1.By.css('label'));
                    testing_1.expect(el).not.toBeNull();
                    testing_1.expect(el.nativeElement.textContent).toMatch('Other placeholder');
                    testing_1.expect(el.nativeElement.textContent).not.toMatch(/\*/g);
                })();
            });
        });
        testing_1.it('supports placeholder element', function () {
            return builder.createAsync(MdInputPlaceholderElementTestComponent)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    fixture.detectChanges();
                    var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
                    testing_1.expect(el).not.toBeNull();
                    testing_1.expect(el.nativeElement.textContent).toMatch('Default Placeholder');
                    fixture.componentInstance.placeholder = 'Other placeholder';
                    fixture.detectChanges();
                    el = fixture.debugElement.query(platform_browser_1.By.css('label'));
                    testing_1.expect(el).not.toBeNull();
                    testing_1.expect(el.nativeElement.textContent).toMatch('Other placeholder');
                    testing_1.expect(el.nativeElement.textContent).not.toMatch(/\*/g);
                })();
            });
        });
        testing_1.it('supports placeholder required star', function () {
            return builder.createAsync(MdInputPlaceholderRequiredTestComponent)
                .then(function (fixture) {
                testing_1.fakeAsync(function () {
                    fixture.detectChanges();
                    var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
                    testing_1.expect(el).not.toBeNull();
                    testing_1.expect(el.nativeElement.textContent).toMatch(/hello\s+\*/g);
                })();
            });
        });
        testing_1.it('supports number types and conserved its value type from Angular', function () {
            return builder.createAsync(MdInputNumberTypeConservedTestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                inputEl.value = '3';
                // Manually trigger an onchange event.
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                inputEl.dispatchEvent(evt);
                fixture.detectChanges();
                // Something along the chain of events is asynchronous but does not use Zones, therefore
                // we need to wait for that something to propagate. Using fakeAsync fails, just returning
                // Promise.resolve(fixture) fails as well, but this passes.
                return new Promise(function (resolve) {
                    setTimeout(function () { return resolve(fixture); }, 0);
                });
            }).then(function (fixture) {
                testing_1.expect(fixture.componentInstance.value).toBe(3);
                testing_1.expect(typeof fixture.componentInstance.value).toBe('number');
            });
        });
    });
}
exports.main = main;
var MdInputNumberTypeConservedTestComponent = (function () {
    function MdInputNumberTypeConservedTestComponent() {
        this.value = 0;
    }
    MdInputNumberTypeConservedTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input type=\"number\" [(ngModel)]=\"value\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputNumberTypeConservedTestComponent);
    return MdInputNumberTypeConservedTestComponent;
}());
var MdInputPlaceholderRequiredTestComponent = (function () {
    function MdInputPlaceholderRequiredTestComponent() {
    }
    MdInputPlaceholderRequiredTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input required placeholder=\"hello\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderRequiredTestComponent);
    return MdInputPlaceholderRequiredTestComponent;
}());
var MdInputPlaceholderElementTestComponent = (function () {
    function MdInputPlaceholderElementTestComponent() {
        this.placeholder = 'Default Placeholder';
    }
    MdInputPlaceholderElementTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-placeholder>{{placeholder}}</md-placeholder>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderElementTestComponent);
    return MdInputPlaceholderElementTestComponent;
}());
var MdInputPlaceholderAttrTestComponent = (function () {
    function MdInputPlaceholderAttrTestComponent() {
        this.placeholder = '';
    }
    MdInputPlaceholderAttrTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [placeholder]=\"placeholder\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderAttrTestComponent);
    return MdInputPlaceholderAttrTestComponent;
}());
var MdInputHintLabel2TestController = (function () {
    function MdInputHintLabel2TestController() {
        this.label = '';
    }
    MdInputHintLabel2TestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-hint>{{label}}</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputHintLabel2TestController);
    return MdInputHintLabel2TestController;
}());
var MdInputHintLabelTestController = (function () {
    function MdInputHintLabelTestController() {
        this.label = '';
    }
    MdInputHintLabelTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [hintLabel]=\"label\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputHintLabelTestController);
    return MdInputHintLabelTestController;
}());
var MdInputInvalidTypeTestController = (function () {
    function MdInputInvalidTypeTestController() {
    }
    MdInputInvalidTypeTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input type=\"file\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidTypeTestController);
    return MdInputInvalidTypeTestController;
}());
var MdInputInvalidPlaceholderTestController = (function () {
    function MdInputInvalidPlaceholderTestController() {
    }
    MdInputInvalidPlaceholderTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input placeholder=\"Hello\">\n      <md-placeholder>World</md-placeholder>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidPlaceholderTestController);
    return MdInputInvalidPlaceholderTestController;
}());
var MdInputInvalidHint2TestController = (function () {
    function MdInputInvalidHint2TestController() {
    }
    MdInputInvalidHint2TestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input hintLabel=\"Hello\">\n      <md-hint>World</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidHint2TestController);
    return MdInputInvalidHint2TestController;
}());
var MdInputInvalidHintTestController = (function () {
    function MdInputInvalidHintTestController() {
    }
    MdInputInvalidHintTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-hint>Hello</md-hint>\n      <md-hint>World</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidHintTestController);
    return MdInputInvalidHintTestController;
}());
var MdInputBaseTestController = (function () {
    function MdInputBaseTestController() {
        this.model = '';
    }
    MdInputBaseTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [(ngModel)]=\"model\">\n    </md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputBaseTestController);
    return MdInputBaseTestController;
}());
var MdInputAriaTestController = (function () {
    function MdInputAriaTestController() {
        this.ariaLabel = 'label';
        this.ariaDisabled = true;
    }
    MdInputAriaTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [aria-label]=\"ariaLabel\" [aria-disabled]=\"ariaDisabled\">\n    </md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputAriaTestController);
    return MdInputAriaTestController;
}());
//# sourceMappingURL=input.spec.js.map
