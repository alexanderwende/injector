"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../annotations/index.js");
/**
 * @internal
 */
exports.PROVIDER_UNREGISTERED = new Error('Provider is not registered with an injector.');
/**
 * The `BaseProvider` class
 *
 * @remarks
 * `BaseProvider` uses a factory function to provide a value. The provider's parameter dependencies
 * will be used to invoke the factory function. The provider's property dependencies will be set on
 * the factory function's return value. Each of the dependencies will be resolved using an
 * `Injector` instance which must be passed to the provider's {@link provide} method.
 *
 * ```typescript
 * @injectable()
 * class Foo {}
 *
 * @injectable()
 * class Bar {}
 *
 * const factory = (foo: Foo, bar: Bar) => ({ foo: foo, bar: bar });
 *
 * const provider = new BaseProvider(factory, [
 *      new DependencyAnnotation(Foo),
 *      new DependencyAnnotation(Bar)
 * ]);
 *
 * const injector = new Injector();
 *
 * provider.provide(injector);
 *
 * // or more naturally...
 *
 * interface FooBar {
 *      foo: Foo;
 *      bar: Bar;
 * }
 *
 * const token = new InjectToken<FooBar>('FooBar');
 *
 * injector.register(token, provider);
 *
 * injector.resolve(token)!;
 * ```
 */
class BaseProvider {
    /**
     * The `BaseProvider` constructor
     *
     * @param factory - The provider's factory function
     * @param parameters - The parameter dependencies of the factory function
     * @param properties - The property dependencies of the value returned from the factory function
     */
    constructor(factory, parameters = new Map(), properties = new Map()) {
        this.factory = factory;
        // TODO: update to TypeScript 3.4 for better support of map() --> we can then remove the assertion
        this.parameters = !(parameters instanceof Map)
            ? new Map(parameters.map((value, index) => [index, value]))
            : parameters;
        this.properties = !(properties instanceof Map)
            ? new Map([
                ...Object.getOwnPropertyNames(properties).map(key => [key, properties[key]]),
                ...Object.getOwnPropertySymbols(properties).map(symbol => [symbol, properties[symbol]])
            ])
            : properties;
    }
    /**
     * Get the provider's provided value
     *
     * @param injector - The injector to use to resolve the provider's dependencies
     * @returns The provider's provided value
     */
    provide(injector) {
        if (!injector)
            injector = this.injector;
        if (!injector)
            throw exports.PROVIDER_UNREGISTERED;
        const parameters = this.resolveParameters(injector);
        const properties = this.resolveProperties(injector);
        return this.createValue(parameters, properties);
    }
    /**
     * Resolves the parameter dependencies for the factory
     *
     * @remarks
     * If a parameter dependency is a {@link DependencyAnnotation} it will be resolved
     * from the current injector. Otherwise its value will be used to resolve the
     * dependency.
     *
     * @param injector - The current injector that runs the provider
     * @returns An array of resolved parameter dependencies
     */
    resolveParameters(injector) {
        const parameters = [];
        this.parameters.forEach((parameter, index) => {
            parameters[index] = (parameter instanceof index_js_1.DependencyAnnotation)
                ? injector.resolve(parameter.token, parameter.optional)
                : parameter;
        });
        return parameters;
    }
    /**
     * Resolves the property dependencies for the factory
     *
     * @remarks
     * If a property dependency is a {@link DependencyAnnotation} it will be resolved
     * from the current injector. Otherwise its value will be used to resolve the
     * dependency.
     *
     * @param injector - The current injector that runs the provider
     * @returns An object of resolved property dependencies
     */
    resolveProperties(injector) {
        const properties = {};
        this.properties.forEach((property, key) => {
            properties[key] = (property instanceof index_js_1.DependencyAnnotation)
                ? injector.resolve(property.token, property.optional)
                : property;
        });
        return properties;
    }
    /**
     * Creates the provider's provided value by invoking the factory
     *
     * @param parameters - The parameter dependencies of the factory
     * @param properties - The property dependencies of the instance returned from the factory
     * @returns The value created by the provider's factory
     */
    createValue(parameters = [], properties = {}) {
        const value = this.factory(...parameters);
        return (value instanceof Object) ? Object.assign(value, properties) : value;
    }
}
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=base-provider.js.map