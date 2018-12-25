export type Constructor<T = any> = { new (...args: any[]): T; }

export const isConstructor = <T> (constructorFn: any): constructorFn is Constructor<T> => {

    return constructorFn instanceof Function && constructorFn.prototype && constructorFn.prototype.constructor === constructorFn;
};

export const isSymbol = (symbol: any): symbol is Symbol => {

    return typeof symbol === 'symbol';
};

export * from './inject';
export * from './injectable';
export * from './optional';
