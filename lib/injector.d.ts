import { InjectToken } from './inject-token';
import { Provider } from './providers';
import { Constructor } from './utils';
/**
 * @internal
 */
export declare const CLASS_NOT_PROVIDABLE: (constructorFn: Constructor<any>) => Error;
/**
 * @internal
 */
export declare const NO_PROVIDER: (token: InjectToken<any>) => Error;
export declare class Injector {
    private _registry;
    private _parent;
    /**
     * Creates an injector instance.
     *
     * @remarks
     * A child injector can be created by passing the parent injector as a constructor argument.
     * ```typescript
     * const rootInjector = new Injector();
     * const childInjector = new Injector(rootInjector);
     * ```
     *
     * @param parent - A parent injector
     *
     * @public
     */
    constructor(parent?: Injector);
    /**
     * Provide a provider for a dependency to the injector
     *
     * @param constructorOrToken - A class constructor or {@link InjectToken} to provide
     * @param provider - A {@link Provider} which will be used to resolve the class or token
     *
     * @public
     */
    provide<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
    /**
     * Resolve a dependency
     *
     * @param target - A class constructor or {@link InjectToken} to resolve
     * @param optional - Should the dependency be optional. If `true` the injector will not throw an error if it cannot resolve the dependency and returns `undefined`. If `false` the injector will throw an error if the dependency cannot be resolved.
     *
     * @public
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