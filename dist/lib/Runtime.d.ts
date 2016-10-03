export declare class Runtime {
    private timer;
    private moody;
    constructor();
    run(): void;
    push(newState: Object, ...args: any[]): any;
    pop(): any;
    swap(newState: Object, ...args: any[]): any;
}
