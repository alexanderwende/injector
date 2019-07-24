import { getTokenAnnotation } from './annotations/index.js';
import { injectable } from './decorators/index.js';
import { InjectToken } from './inject-token.js';
import { ClassProvider, Provider, ValueProvider } from './providers/index.js';
import { Constructor } from './utils/index.js';

/**
 * @internal
 */
export const CLASS_NOT_PROVIDABLE = (constructorFn: Constructor) =>
    new Error(`Class '${ constructorFn.name }' has not been decorated as injectable and cannot be provided.`);

/**
 * @internal
 */
export const CLASS_NOT_RESOLVABLE = (constructorFn: Constructor) =>
    new Error(`Class '${ constructorFn.name }' has not been decorated as injectable and cannot be resolved.`);

/**
 * @internal
 */
export const NO_PROVIDER = (token: InjectToken) =>
    new Error(`No provider has been found for the requested token '${ token.description }'.`);


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
    defaultProvider: { new <T = any>(constructor: Constructor<T>): Provider<T> };
}

// TODO: update docs
/**
 * The injector class
 *
 * @remarks
 * - can provide itself
 * - can create child injectors
 */
@injectable()
export class Injector {

    private _registry: Map<InjectToken<any>, Provider<any>> = new Map();

    private _parent: Injector | null = null;

    private _config: InjectorConfiguration = { defaultProvider: ClassProvider };

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
    constructor (parent?: Injector);
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
    constructor (config?: Partial<InjectorConfiguration>);
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
    constructor (parent?: Injector, config?: Partial<InjectorConfiguration>);
    constructor (...args: any[]) {

        const parent = (args.length && (args[0] instanceof Injector))
            ? args[0]
            : undefined;

        const config = (args.length && !(args[0] instanceof Injector))
            ? args[0]
            : args[1] ? args[1] : undefined;

        if (parent) {
            // if a parent provider was given, store the reference
            this._parent = parent;
            // and inherit the parent provider's configuration
            this._config = { ...parent._config };
        }

        if (config) {
            // if a configuration was given, extend the default configuration
            this._config = { ...this._config, ...config };
        }

        // register the Injector instance itself
        this.register(Injector, new ValueProvider(this));
    }

    // TODO: add an overload which allows to register multiple providers?
    // providers.forEach(({ token, provider }) => this.register(token, provider));
    /**
     * Register a provider for a dependency with the injector
     *
     * @param constructorOrToken - The class or {@link InjectToken} for which to register the provider
     * @param provider - The {@link Provider} which will be used to resolve the class or token
     */
    register<T> (constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>) {

        const token: InjectToken<T> | undefined = constructorOrToken instanceof InjectToken
            ? constructorOrToken
            : getTokenAnnotation(constructorOrToken);

        // class was not decorated with @injectable, throw
        if (!token) throw CLASS_NOT_PROVIDABLE(constructorOrToken as Constructor);

        provider.injector = this;

        this._registry.set(token, provider);
    }

    /**
     * Resolve a dependency
     *
     * @param target - The class or {@link InjectToken} to resolve
     * @param optional - Should the dependency be optional. If `true` the injector will not throw an
     * error if it cannot resolve the dependency and returns `undefined`. If `false` the injector will
     * throw an error if the dependency cannot be resolved.
     */
    resolve<T> (target: Constructor<T> | InjectToken<T>, optional = false): T | undefined {

        let resolved: T | undefined;

        if (target instanceof InjectToken) {

            resolved = this._resolveToken(target, optional);

        } else {

            resolved = this._resolveConstructor(target, optional);
        }

        return resolved;
    }

    /**
     * @internal
     */
    protected _resolveConstructor<T> (constructorFn: Constructor<T>, optional = false): T | undefined {

        const token: InjectToken<T> | undefined = getTokenAnnotation(constructorFn);

        // class was not decorated with @injectable, throw if not optional
        if (!token) {

            if (!optional) throw CLASS_NOT_RESOLVABLE(constructorFn);

            return undefined;
        }

        // class has no provider yet, we create one
        if (!this._getProvider(token)) {

            this.register(token, new this._config.defaultProvider(constructorFn));
        }

        return this._resolveToken(token, optional);
    }

    /**
     * @internal
     */
    protected _resolveToken<T> (token: InjectToken<T>, optional = false): T | undefined {

        const provider = this._getProvider(token);

        // token has no provider, throw if not optional
        if (!provider) {

            if (!optional) throw NO_PROVIDER(token);

            return undefined;
        }

        return provider!.provide(this);
    }

    /**
     * @internal
     */
    protected _getProvider<T> (token: InjectToken<T>): Provider<T> | undefined {

        if (this._registry.has(token)) {

            return this._registry.get(token);

        } else if (this._parent) {

            return this._parent._getProvider(token);
        }
    }
}
