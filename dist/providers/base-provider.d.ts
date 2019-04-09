import { DependencyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { ParameterDependencies, PropertyDependencies, Provider } from './provider';
/**
 * @internal
 */
export declare const PROVIDER_UNREGISTERED: Error;
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
export declare class BaseProvider<T> implements Provider<T> {
    factory: Factory<T>;
    injector: Injector | undefined;
    parameters: Map<number, DependencyAnnotation | any>;
    properties: Map<PropertyKey, DependencyAnnotation | any>;
    /**
     * The `BaseProvider` constructor
     *
     * @param factory - The provider's factory function
     * @param parameters - The parameter dependencies of the factory function
     * @param properties - The property dependencies of the value returned from the factory function
     */
    constructor(factory: Factory<T>, parameters?: ParameterDependencies, properties?: PropertyDependencies);
    /**
     * Get the provider's provided value
     *
     * @param injector - The injector to use to resolve the provider's dependencies
     * @returns The provider's provided value
     */
    provide(injector?: Injector): T;
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
    protected resolveParameters(injector: Injector): any[];
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
    protected resolveProperties(injector: Injector): any;
    /**
     * Creates the provider's provided value by invoking the factory
     *
     * @param parameters - The parameter dependencies of the factory
     * @param properties - The property dependencies of the instance returned from the factory
     * @returns The value created by the provider's factory
     */
    protected createValue(parameters?: any[], properties?: any): T;
}
//# sourceMappingURL=base-provider.d.ts.map