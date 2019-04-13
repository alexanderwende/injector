"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingletonFactory = (constructorFn) => {
    let instance;
    return (...dependencies) => {
        if (!instance)
            instance = Reflect.construct(constructorFn, dependencies);
        return instance;
    };
};
//# sourceMappingURL=singleton-factory.js.map