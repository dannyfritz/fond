import { IVector2d } from "./Vector";
export declare class Graphics {
    private canvas;
    private context;
    private aspectRatio;
    constructor(aspectRatio?: number);
    addToDom(targetDomElement?: HTMLElement): void;
    removeFromDom(): void;
    fitWindow(): void;
    resizeCanvas(): void;
    getLongestEdge(): number;
    getShortestEdge(): number;
    worldVToScreen(v: IVector2d): IVector2d;
    worldXToScreen(x: number): number;
    worldYToScreen(y: number): number;
    worldScalerToScreen(l: number): number;
    letterBox(): void;
    clear(): void;
    circle(worldV: IVector2d, worldRadius: number): void;
    polygon(vertices: IVector2d[]): void;
    line(v1: IVector2d, v2: IVector2d): void;
    text(v: IVector2d, text: string): void;
    textBoundingBox(text: string): TextMetrics;
    push(): void;
    pop(): void;
}
