/**
 * Class for radio buttons to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 */
export declare class MdRadioDispatcher {
    private _listeners;
    constructor();
    /** Notify other radio buttons that selection for the given name has been set. */
    notify(name: string): void;
    /** Listen for future changes to radio button selection. */
    listen(listener: (name: string) => void): void;
}
