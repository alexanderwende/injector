export type Constructor<T = any> = { new (...args: any[]): T; }

export const isConstructor = (constructorFn: any): constructorFn is Constructor => {

    return constructorFn instanceof Function && constructorFn.prototype && constructorFn.prototype.constructor === constructorFn;
};

export const isSymbol = (symbol: any): symbol is Symbol => {

    return typeof symbol === 'symbol';
};
