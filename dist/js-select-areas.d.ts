interface JSSelectAreasOptions {
    multiple?: boolean;
    area?: {
        minWidth?: string;
        minHeight?: string;
        maxWidth?: string;
        maxHeight?: string;
        allowMove?: boolean;
        allowResize?: boolean;
    };
}
interface JSSelectAreasEventItem {
    name: string;
    callback: Function;
}
interface JSSelectAreasSelectionItem {
    x: number;
    y: number;
    width: number;
    height: number;
    originalX: number;
    originalY: number;
    originalWidth: number;
    originalHeight: number;
}
declare class JSSelectAreas {
    private element;
    private options;
    private isDrawing;
    private holder;
    private currentArea;
    private events;
    constructor(element: HTMLElement | HTMLImageElement, options?: JSSelectAreasOptions);
    generateArea(): HTMLElement;
    getAreas(): NodeListOf<HTMLElement>;
    getSelectedArea(): HTMLElement | null;
    getSelections(): JSSelectAreasSelectionItem[];
    addSelection(selection: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): HTMLElement;
    on(name: string, callback: Function): void;
    trigger(name: string, ...params: any[]): void;
    destroy(): void;
    private generateHolder;
    private wrap;
    private getMousePosition;
    private getElementOffset;
}
