import { ParameterAnnotations, PropertyAnnotations, DependencyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { Provider } from './provider';

/**
 * @internal
 */
export const PROVIDER_UNREGISTERED = new Error('Provider is not registered with an injector.');

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
 * const provider = new BaseProvider(factory, new Map([
 *      [0, { token: Foo, optional: false }],
 *      [1, { token: Bar, optional: false }],
 * ]));
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
 * injector.provide(token, provider);
 *
 * injector.resolve(token)!;
 * ```
 */
export class BaseProvider<T> implements Provider<T> {

    public injector: Injector | undefined;

    /**
     * The `BaseProvider` constructor
     *
     * @param factory - The provider's factory function
     * @param parameters - The parameter dependencies of the factory function
     * @param properties - The property dependencies of the value returned from the factory function
     */
    constructor (
        public factory: Factory<T>,
        public parameters: ParameterAnnotations = new Map(),
        public properties: PropertyAnnotations = new Map()) { }

    /**
     * Get the provider's provided value
     *
     * @param injector - The injector to use to resolve the provider's dependencies
     * @returns The provider's provided value
     */
    provide (injector?: Injector): T {

        if (!injector) injector = this.injector;

        if (!injector) throw PROVIDER_UNREGISTERED;

        const parameters = this.resolveParameters(injector);

        const properties = this.resolveProperties(injector);

        return this.createValue(parameters, properties);
    }

    /**
     * Resolves the parameter dependencies for the factory from the current injector
     *
     * @param injector - The current injector that runs the provider
     * @returns An array of resolved parameter dependencies
     */
    protected resolveParameters (injector: Injector): any[] {

        const parameters: any[] = [];

        this.parameters.forEach(({ token, optional }, index) => parameters[index] = injector.resolve(token, optional));

        return parameters;
    }

    /**
     * Resolves the property dependencies for the factory from the current injector
     *
     * @param injector - The current injector that runs the provider
     * @returns An object of resolved property dependencies
     */
    protected resolveProperties (injector: Injector): any {

        const result: any = {};

        this.properties.forEach(({ token, optional }, key) => result[key] = injector.resolve(token, optional));

        return result;
    }

    /**
     * Creates the provider's provided value by invoking the factory
     *
     * @param parameters - The parameter dependencies of the factory
     * @param properties - The property dependencies of the instance returned from the factory
     * @returns The value created by the provider's factory
     */
    protected createValue (parameters: any[] = [], properties: any = {}): T {

        const value = this.factory(...parameters);

        return (value instanceof Object) ? Object.assign(value, properties) : value;
    }
}
