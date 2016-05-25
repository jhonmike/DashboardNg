import { Renderer } from '@angular/core';
import { ElementRef } from '@angular/core';
export declare class MdToolbar {
    private elementRef;
    private renderer;
    private _color;
    constructor(elementRef: ElementRef, renderer: Renderer);
    color: string;
    _updateColor(newColor: string): void;
    _setElementColor(color: string, isAdd: boolean): void;
}
