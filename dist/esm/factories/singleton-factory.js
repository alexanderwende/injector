export const createSingletonFactory = (constructorFn) => {
    let instance;
    return (...dependencies) => {
        if (!instance)
            instance = Reflect.construct(constructorFn, dependencies);
        return instance;
    };
};
//# sourceMappingURL=singleton-factory.js.map