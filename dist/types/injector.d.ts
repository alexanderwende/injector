import { InjectToken } from './inject-token.js';
import { Provider } from './providers/index.js';
import { Constructor } from './utils/index.js';
/**
 * @internal
 */
export declare const CLASS_NOT_PROVIDABLE: (constructorFn: Constructor<any>) => Error;
/**
 * @internal
 */
export declare const CLASS_NOT_RESOLVABLE: (constructorFn: Constructor<any>) => Error;
/**
 * @internal
 */
export declare const NO_PROVIDER: (token: InjectToken<any>) => Error;
/**
 * A configuration interface for providers
 */
export interface ProviderConfiguration<T = any> {
    token: InjectToken<T> | Constructor<T>;
    provider: Provider<T>;
}
/**
 * A configuration interface for Injector
 */
export interface InjectorConfiguration {
    /**
     * The default provider used by the injector
     *
     * @remarks
     * Injector will use the default provider as provider for {@link injectable} classes, which have
     * no provider registered explicitly. A default provider needs to accept a reference to the class
     * it is created for as only constructor argument. {@link ClassProvider} and {@link SingletonProvider}
     * can be used as default providers. Alternatively a custom provider with the same interface can
     * be created and configured.
     *
     * The default value for this option is {@link ClassProvider}.
     */
    defaultProvider: {
        new <T = any>(constructor: Constructor<T>): Provider<T>;
    };
}
/**
 * The injector class
 *
 * @remarks
 * - can provide itself
 * - can create child injectors
 */
export declare class Injector {
    private _registry;
    private _parent;
    private _config;
    /**
     * Creates an injector instance
     *
     * @remarks
     * A child injector can be created by passing the parent injector as a constructor argument.
     *
     * ```typescript
     * const parentInjector = new Injector();
     * const childInjector = new Injector(parentInjector);
     * ```
     */
    constructor(parent?: Injector);
    /**
     * Creates an injector instance
     *
     * @remarks
     * An injector can be configured with a default provider.
     *
     * @see {@link InjectorConfiguration#defaultProvider}
     *
     * ```typescript
     * // configures the injector to use the SingletonProvider for injectable classes by default
     * const injector = new Injector({ defaultProvider: SingletonProvider });
     * ```
     */
    constructor(config?: Partial<InjectorConfiguration>);
    /**
     * Creates an injector instance
     *
     * @remarks
     * A child injector can be configured with a default provider.
     *
     * @see {@link InjectorConfiguration#defaultProvider}
     *
     * ```typescript
     * const parentInjector = new Injector();
     *
     * // configures the injector to use the SingletonProvider for injectable classes by default
     * const childInjector = new Injector(parentInjector, { defaultProvider: SingletonProvider });
     * ```
     */
    constructor(parent?: Injector, config?: Partial<InjectorConfiguration>);
    /**
     * Register a provider for a dependency with the injector
     *
     * @param constructorOrToken - The class or {@link InjectToken} for which to register the provider
     * @param provider - The {@link Provider} which will be used to resolve the class or token
     */
    register<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
    /**
     * Resolve a dependency
     *
     * @param target - The class or {@link InjectToken} to resolve
     * @param optional - Should the dependency be optional. If `true` the injector will not throw an
     * error if it cannot resolve the dependency and returns `undefined`. If `false` the injector will
     * throw an error if the dependency cannot be resolved.
     */
    resolve<T>(target: Constructor<T> | InjectToken<T>, optional?: boolean): T | undefined;
    /**
     * @internal
     */
    protected _resolveConstructor<T>(constructorFn: Constructor<T>, optional?: boolean): T | undefined;
    /**
     * @internal
     */
    protected _resolveToken<T>(token: InjectToken<T>, optional?: boolean): T | undefined;
    /**
     * @internal
     */
    protected _getProvider<T>(token: InjectToken<T>): Provider<T> | undefined;
}
//# sourceMappingURL=injector.d.ts.map