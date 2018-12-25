export declare type Constructor<T = any> = {
    new (...args: any[]): T;
};
export declare const isConstructor: <T>(constructorFn: any) => constructorFn is Constructor<T>;
export declare const isSymbol: (symbol: any) => symbol is Symbol;
export * from './inject';
export * from './injectable';
export * from './optional';
