import { QueryList, ElementRef, Renderer, AfterContentInit } from '@angular/core';
export declare class MdList {
}
export declare class MdLine {
}
export declare class MdListAvatar {
}
export declare class MdListItem implements AfterContentInit {
    private _renderer;
    private _element;
    _lines: QueryList<MdLine>;
    ngAfterContentInit(): void;
    _hasAvatar: MdListAvatar;
    constructor(_renderer: Renderer, _element: ElementRef);
    _setLineClass(count: number): void;
    _resetClasses(): void;
    _setClass(className: string, bool: boolean): void;
}
export declare const MD_LIST_DIRECTIVES: any[];
