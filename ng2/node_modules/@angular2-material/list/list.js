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
var MdList = (function () {
    function MdList() {
    }
    MdList = __decorate([
        core_1.Component({
            selector: 'md-list, md-nav-list',
            host: { 'role': 'list' },
            template: '<ng-content></ng-content>',
            styles: ["\n              /*  Normal list variables */\n              /* Dense list variables */\n              /*  \n              This mixin provides all list-item styles, changing font size and height\n              based on whether the list is in dense mode.\n              */\n              /*\n              This mixin provides all md-line styles, changing secondary font size \n              based on whether the list is in dense mode.\n              */\n              /*\n              This mixin provides all subheader styles, adjusting heights and padding\n              based on whether the list is in dense mode.\n              */\n              md-list, md-nav-list {\n                padding-top: 8px;\n                display: block; }\n                md-list [md-subheader], md-nav-list [md-subheader] {\n                  display: block;\n                  box-sizing: border-box;\n                  height: 48px;\n                  padding: 16px;\n                  margin: 0;\n                  font-size: 14px;\n                  font-weight: 500;\n                  color: rgba(0, 0, 0, 0.54); }\n                  md-list [md-subheader]:first-child, md-nav-list [md-subheader]:first-child {\n                    margin-top: -8px; }\n                md-list md-list-item .md-list-item, md-list a[md-list-item] .md-list-item, md-nav-list md-list-item .md-list-item, md-nav-list a[md-list-item] .md-list-item {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: horizontal;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: row;\n                      -ms-flex-direction: row;\n                          flex-direction: row;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n                  box-sizing: border-box;\n                  font-size: 16px;\n                  height: 48px;\n                  padding: 0 16px; }\n                md-list md-list-item.md-list-avatar .md-list-item, md-list a[md-list-item].md-list-avatar .md-list-item, md-nav-list md-list-item.md-list-avatar .md-list-item, md-nav-list a[md-list-item].md-list-avatar .md-list-item {\n                  height: 56px; }\n                md-list md-list-item.md-2-line .md-list-item, md-list a[md-list-item].md-2-line .md-list-item, md-nav-list md-list-item.md-2-line .md-list-item, md-nav-list a[md-list-item].md-2-line .md-list-item {\n                  height: 72px; }\n                md-list md-list-item.md-3-line .md-list-item, md-list a[md-list-item].md-3-line .md-list-item, md-nav-list md-list-item.md-3-line .md-list-item, md-nav-list a[md-list-item].md-3-line .md-list-item {\n                  height: 88px; }\n                md-list md-list-item .md-list-text, md-list a[md-list-item] .md-list-text, md-nav-list md-list-item .md-list-text, md-nav-list a[md-list-item] .md-list-text {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: vertical;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: column;\n                      -ms-flex-direction: column;\n                          flex-direction: column;\n                  width: 100%;\n                  padding: 0 16px;\n                  box-sizing: border-box;\n                  overflow: hidden; }\n                  md-list md-list-item .md-list-text:first-child, md-list a[md-list-item] .md-list-text:first-child, md-nav-list md-list-item .md-list-text:first-child, md-nav-list a[md-list-item] .md-list-text:first-child {\n                    padding: 0; }\n                  md-list md-list-item .md-list-text:empty, md-list a[md-list-item] .md-list-text:empty, md-nav-list md-list-item .md-list-text:empty, md-nav-list a[md-list-item] .md-list-text:empty {\n                    display: none; }\n                  md-list md-list-item .md-list-text > *, md-list a[md-list-item] .md-list-text > *, md-nav-list md-list-item .md-list-text > *, md-nav-list a[md-list-item] .md-list-text > * {\n                    margin: 0;\n                    padding: 0;\n                    font-weight: normal;\n                    font-size: inherit; }\n                md-list md-list-item [md-list-avatar], md-list a[md-list-item] [md-list-avatar], md-nav-list md-list-item [md-list-avatar], md-nav-list a[md-list-item] [md-list-avatar] {\n                  width: 40px;\n                  height: 40px;\n                  border-radius: 50%; }\n                md-list md-list-item [md-list-icon], md-list a[md-list-item] [md-list-icon], md-nav-list md-list-item [md-list-icon], md-nav-list a[md-list-item] [md-list-icon] {\n                  width: 24px;\n                  height: 24px;\n                  border-radius: 50%;\n                  padding: 4px; }\n                md-list md-list-item [md-line], md-list a[md-list-item] [md-line], md-nav-list md-list-item [md-line], md-nav-list a[md-list-item] [md-line] {\n                  display: block;\n                  white-space: nowrap;\n                  overflow-x: hidden;\n                  text-overflow: ellipsis;\n                  box-sizing: border-box; }\n                  md-list md-list-item [md-line]:nth-child(n+2), md-list a[md-list-item] [md-line]:nth-child(n+2), md-nav-list md-list-item [md-line]:nth-child(n+2), md-nav-list a[md-list-item] [md-line]:nth-child(n+2) {\n                    font-size: 14px; }\n\n              md-list[dense], md-nav-list[dense] {\n                padding-top: 4px;\n                display: block; }\n                md-list[dense] [md-subheader], md-nav-list[dense] [md-subheader] {\n                  display: block;\n                  box-sizing: border-box;\n                  height: 40px;\n                  padding: 16px;\n                  margin: 0;\n                  font-size: 13px;\n                  font-weight: 500;\n                  color: rgba(0, 0, 0, 0.54); }\n                  md-list[dense] [md-subheader]:first-child, md-nav-list[dense] [md-subheader]:first-child {\n                    margin-top: -4px; }\n                md-list[dense] md-list-item .md-list-item, md-list[dense] a[md-list-item] .md-list-item, md-nav-list[dense] md-list-item .md-list-item, md-nav-list[dense] a[md-list-item] .md-list-item {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: horizontal;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: row;\n                      -ms-flex-direction: row;\n                          flex-direction: row;\n                  -webkit-box-align: center;\n                  -webkit-align-items: center;\n                      -ms-flex-align: center;\n                          align-items: center;\n                  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n                  box-sizing: border-box;\n                  font-size: 13px;\n                  height: 40px;\n                  padding: 0 16px; }\n                md-list[dense] md-list-item.md-list-avatar .md-list-item, md-list[dense] a[md-list-item].md-list-avatar .md-list-item, md-nav-list[dense] md-list-item.md-list-avatar .md-list-item, md-nav-list[dense] a[md-list-item].md-list-avatar .md-list-item {\n                  height: 48px; }\n                md-list[dense] md-list-item.md-2-line .md-list-item, md-list[dense] a[md-list-item].md-2-line .md-list-item, md-nav-list[dense] md-list-item.md-2-line .md-list-item, md-nav-list[dense] a[md-list-item].md-2-line .md-list-item {\n                  height: 60px; }\n                md-list[dense] md-list-item.md-3-line .md-list-item, md-list[dense] a[md-list-item].md-3-line .md-list-item, md-nav-list[dense] md-list-item.md-3-line .md-list-item, md-nav-list[dense] a[md-list-item].md-3-line .md-list-item {\n                  height: 76px; }\n                md-list[dense] md-list-item .md-list-text, md-list[dense] a[md-list-item] .md-list-text, md-nav-list[dense] md-list-item .md-list-text, md-nav-list[dense] a[md-list-item] .md-list-text {\n                  display: -webkit-box;\n                  display: -webkit-flex;\n                  display: -ms-flexbox;\n                  display: flex;\n                  -webkit-box-orient: vertical;\n                  -webkit-box-direction: normal;\n                  -webkit-flex-direction: column;\n                      -ms-flex-direction: column;\n                          flex-direction: column;\n                  width: 100%;\n                  padding: 0 16px;\n                  box-sizing: border-box;\n                  overflow: hidden; }\n                  md-list[dense] md-list-item .md-list-text:first-child, md-list[dense] a[md-list-item] .md-list-text:first-child, md-nav-list[dense] md-list-item .md-list-text:first-child, md-nav-list[dense] a[md-list-item] .md-list-text:first-child {\n                    padding: 0; }\n                  md-list[dense] md-list-item .md-list-text:empty, md-list[dense] a[md-list-item] .md-list-text:empty, md-nav-list[dense] md-list-item .md-list-text:empty, md-nav-list[dense] a[md-list-item] .md-list-text:empty {\n                    display: none; }\n                  md-list[dense] md-list-item .md-list-text > *, md-list[dense] a[md-list-item] .md-list-text > *, md-nav-list[dense] md-list-item .md-list-text > *, md-nav-list[dense] a[md-list-item] .md-list-text > * {\n                    margin: 0;\n                    padding: 0;\n                    font-weight: normal;\n                    font-size: inherit; }\n                md-list[dense] md-list-item [md-list-avatar], md-list[dense] a[md-list-item] [md-list-avatar], md-nav-list[dense] md-list-item [md-list-avatar], md-nav-list[dense] a[md-list-item] [md-list-avatar] {\n                  width: 40px;\n                  height: 40px;\n                  border-radius: 50%; }\n                md-list[dense] md-list-item [md-list-icon], md-list[dense] a[md-list-item] [md-list-icon], md-nav-list[dense] md-list-item [md-list-icon], md-nav-list[dense] a[md-list-item] [md-list-icon] {\n                  width: 24px;\n                  height: 24px;\n                  border-radius: 50%;\n                  padding: 4px; }\n                md-list[dense] md-list-item [md-line], md-list[dense] a[md-list-item] [md-line], md-nav-list[dense] md-list-item [md-line], md-nav-list[dense] a[md-list-item] [md-line] {\n                  display: block;\n                  white-space: nowrap;\n                  overflow-x: hidden;\n                  text-overflow: ellipsis;\n                  box-sizing: border-box; }\n                  md-list[dense] md-list-item [md-line]:nth-child(n+2), md-list[dense] a[md-list-item] [md-line]:nth-child(n+2), md-nav-list[dense] md-list-item [md-line]:nth-child(n+2), md-nav-list[dense] a[md-list-item] [md-line]:nth-child(n+2) {\n                    font-size: 13px; }\n\n              md-divider {\n                display: block;\n                border-top: 1px solid rgba(0, 0, 0, 0.12);\n                margin: 0; }\n\n              md-nav-list a {\n                text-decoration: none;\n                color: inherit; }\n\n              md-nav-list .md-list-item {\n                cursor: pointer; }\n                md-nav-list .md-list-item:hover {\n                  background: rgba(0, 0, 0, 0.04); }\n            "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], MdList);
    return MdList;
}());
exports.MdList = MdList;
/* Need directive for a ContentChildren query in list-item */
var MdLine = (function () {
    function MdLine() {
    }
    MdLine = __decorate([
        core_1.Directive({ selector: '[md-line]' }), 
        __metadata('design:paramtypes', [])
    ], MdLine);
    return MdLine;
}());
exports.MdLine = MdLine;
/* Need directive for a ContentChild query in list-item */
var MdListAvatar = (function () {
    function MdListAvatar() {
    }
    MdListAvatar = __decorate([
        core_1.Directive({ selector: '[md-list-avatar]' }), 
        __metadata('design:paramtypes', [])
    ], MdListAvatar);
    return MdListAvatar;
}());
exports.MdListAvatar = MdListAvatar;
var MdListItem = (function () {
    function MdListItem(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    MdListItem.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    };
    Object.defineProperty(MdListItem.prototype, "_hasAvatar", {
        set: function (avatar) {
            this._setClass('md-list-avatar', avatar != null);
        },
        enumerable: true,
        configurable: true
    });
    MdListItem.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("md-" + count + "-line", true);
        }
    };
    MdListItem.prototype._resetClasses = function () {
        this._setClass('md-2-line', false);
        this._setClass('md-3-line', false);
    };
    MdListItem.prototype._setClass = function (className, bool) {
        this._renderer.setElementClass(this._element.nativeElement, className, bool);
    };
    __decorate([
        core_1.ContentChildren(MdLine), 
        __metadata('design:type', core_1.QueryList)
    ], MdListItem.prototype, "_lines", void 0);
    __decorate([
        core_1.ContentChild(MdListAvatar), 
        __metadata('design:type', MdListAvatar), 
        __metadata('design:paramtypes', [MdListAvatar])
    ], MdListItem.prototype, "_hasAvatar", null);
    MdListItem = __decorate([
        core_1.Component({
            selector: 'md-list-item, a[md-list-item]',
            host: { 'role': 'listitem' },
            template: "\n              <div class=\"md-list-item\">\n                <ng-content select=\"[md-list-avatar],[md-list-icon]\"></ng-content>\n                <div class=\"md-list-text\"><ng-content select=\"[md-line]\"></ng-content></div>\n                <ng-content></ng-content>\n              </div>\n            ",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], MdListItem);
    return MdListItem;
}());
exports.MdListItem = MdListItem;
exports.MD_LIST_DIRECTIVES = [MdList, MdListItem, MdLine, MdListAvatar];
//# sourceMappingURL=list.js.map
