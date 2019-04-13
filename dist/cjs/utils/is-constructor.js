"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
exports.isConstructor = (constructorFn) => {
    return constructorFn instanceof Function
        && !!constructorFn.prototype
        && constructorFn.prototype.constructor === constructorFn;
};
//# sourceMappingURL=is-constructor.js.map