export const createClassFactory = (constructorFn) => {
    return (...dependencies) => {
        return Reflect.construct(constructorFn, dependencies);
    };
};
//# sourceMappingURL=class-factory.js.map