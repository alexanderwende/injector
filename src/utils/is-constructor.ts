import { Constructor } from './constructor.js';

/**
 * @internal
 */
export const isConstructor = (constructorFn: any): constructorFn is Constructor => {

    return constructorFn instanceof Function
        && !!constructorFn.prototype
        && constructorFn.prototype.constructor === constructorFn;
};
