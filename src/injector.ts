import { getTokenAnnotation } from './annotations';
import { InjectToken } from './inject-token';
import { ClassProvider, Provider } from './providers';
import { Constructor } from './utils';

/**
 * @internal
 */
export const CLASS_NOT_PROVIDABLE = (constructorFn: Constructor) => new Error(`Class '${ constructorFn.name }' has not been decorated as injectable and cannot be resolved.`);

/**
 * @internal
 */
export const NO_PROVIDER          = (token: InjectToken) => new Error(`No provider has been found for the requested token '${ token.description }'.`);

export class Injector {

    private _registry: Map<InjectToken<any>, Provider<any>> = new Map();

    private _parent: Injector | null = null;

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
    constructor (parent?: Injector) {

        if (parent) this._parent = parent;
    }

    /**
     * Provide a provider for a dependency to the injector
     *
     * @param constructorOrToken - A class constructor or {@link InjectToken} to provide
     * @param provider - A {@link Provider} which will be used to resolve the class or token
     *
     * @public
     */
    provide<T> (constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>) {

        const token: InjectToken<T> | undefined = constructorOrToken instanceof InjectToken ?
                                                  constructorOrToken :
                                                  getTokenAnnotation(constructorOrToken);

        // class was not decorated with @injectable, throw
        if (!token) throw CLASS_NOT_PROVIDABLE(constructorOrToken as Constructor);

        provider.injector = this;

        this._registry.set(token, provider);
    }

    /**
     * Resolve a dependency
     *
     * @param target - A class constructor or {@link InjectToken} to resolve
     * @param optional - Should the dependency be optional. If `true` the injector will not throw an error if it cannot resolve the dependency and returns `undefined`. If `false` the injector will throw an error if the dependency cannot be resolved.
     *
     * @public
     */
    resolve<T> (target: Constructor<T> | InjectToken<T>, optional = false): T | undefined {

        let resolved: T | undefined;

        // console.group('Injector.resolve()');

        if (target instanceof InjectToken) {

            // console.log('resolving: ', target.value);
            resolved = this._resolveToken(target, optional);

        } else {

            // console.log('resolving: ', target.name);
            resolved = this._resolveConstructor(target, optional);
        }

        // console.groupEnd();

        return resolved;
    }

    /**
     * @internal
     */
    protected _resolveConstructor<T> (constructorFn: Constructor<T>, optional = false): T | undefined {

        const token: InjectToken<T> | undefined = getTokenAnnotation(constructorFn);

        // class was not decorated with @injectable, throw
        if (!token) throw CLASS_NOT_PROVIDABLE(constructorFn);

        // class has no provider yet, we create one
        if (!this._getProvider(token)) {

            this.provide(token, new ClassProvider(constructorFn));
        }

        return this._resolveToken(token, optional);
    }

    /**
     * @internal
     */
    protected _resolveToken<T> (token: InjectToken<T>, optional = false): T | undefined {

        const provider = this._getProvider(token);

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
