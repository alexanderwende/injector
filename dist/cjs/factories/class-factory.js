"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassFactory = (constructorFn) => {
    return (...dependencies) => {
        return Reflect.construct(constructorFn, dependencies);
    };
};
//# sourceMappingURL=class-factory.js.map