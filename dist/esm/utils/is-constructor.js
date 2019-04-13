/**
 * @internal
 */
export const isConstructor = (constructorFn) => {
    return constructorFn instanceof Function
        && !!constructorFn.prototype
        && constructorFn.prototype.constructor === constructorFn;
};
//# sourceMappingURL=is-constructor.js.map