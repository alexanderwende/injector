export declare type Constructor<T = any> = {
    new (...args: any[]): T;
};
export declare const isConstructor: (constructorFn: any) => constructorFn is Constructor<any>;
export declare const isSymbol: (symbol: any) => symbol is Symbol;
//# sourceMappingURL=index.d.ts.map