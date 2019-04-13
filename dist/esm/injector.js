var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Injector_1;
import { getTokenAnnotation } from './annotations';
import { injectable } from './decorators';
import { InjectToken } from './inject-token';
import { ClassProvider, ValueProvider } from './providers';
/**
 * @internal
 */
export const CLASS_NOT_PROVIDABLE = (constructorFn) => new Error(`Class '${constructorFn.name}' has not been decorated as injectable and cannot be provided.`);
/**
 * @internal
 */
export const CLASS_NOT_RESOLVABLE = (constructorFn) => new Error(`Class '${constructorFn.name}' has not been decorated as injectable and cannot be resolved.`);
/**
 * @internal
 */
export const NO_PROVIDER = (token) => new Error(`No provider has been found for the requested token '${token.description}'.`);
// TODO: update docs
/**
 * The injector class
 *
 * @remarks
 * - can provide itself
 * - can create child injectors
 */
let Injector = Injector_1 = class Injector {
    constructor(...args) {
        this._registry = new Map();
        this._parent = null;
        this._config = { defaultProvider: ClassProvider };
        const parent = (args.length && (args[0] instanceof Injector_1))
            ? args[0]
            : undefined;
        const config = (args.length && !(args[0] instanceof Injector_1))
            ? args[0]
            : args[1] ? args[1] : undefined;
        if (parent) {
            // if a parent provider was given, store the reference
            this._parent = parent;
            // and inherit the parent provider's configuration
            this._config = Object.assign({}, parent._config);
        }
        if (config) {
            // if a configuration was given, extend the default configuration
            this._config = Object.assign({}, this._config, config);
        }
        // register the Injector instance itself
        this.register(Injector_1, new ValueProvider(this));
    }
    // TODO: add an overload which allows to register multiple providers?
    // providers.forEach(({ token, provider }) => this.register(token, provider));
    /**
     * Register a provider for a dependency with the injector
     *
     * @param constructorOrToken - The class or {@link InjectToken} for which to register the provider
     * @param provider - The {@link Provider} which will be used to resolve the class or token
     */
    register(constructorOrToken, provider) {
        const token = constructorOrToken instanceof InjectToken
            ? constructorOrToken
            : getTokenAnnotation(constructorOrToken);
        // class was not decorated with @injectable, throw
        if (!token)
            throw CLASS_NOT_PROVIDABLE(constructorOrToken);
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
    resolve(target, optional = false) {
        let resolved;
        if (target instanceof InjectToken) {
            resolved = this._resolveToken(target, optional);
        }
        else {
            resolved = this._resolveConstructor(target, optional);
        }
        return resolved;
    }
    /**
     * @internal
     */
    _resolveConstructor(constructorFn, optional = false) {
        const token = getTokenAnnotation(constructorFn);
        // class was not decorated with @injectable, throw if not optional
        if (!token) {
            if (!optional)
                throw CLASS_NOT_RESOLVABLE(constructorFn);
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
    _resolveToken(token, optional = false) {
        const provider = this._getProvider(token);
        // token has no provider, throw if not optional
        if (!provider) {
            if (!optional)
                throw NO_PROVIDER(token);
            return undefined;
        }
        return provider.provide(this);
    }
    /**
     * @internal
     */
    _getProvider(token) {
        if (this._registry.has(token)) {
            return this._registry.get(token);
        }
        else if (this._parent) {
            return this._parent._getProvider(token);
        }
    }
};
Injector = Injector_1 = __decorate([
    injectable(),
    __metadata("design:paramtypes", [Object])
], Injector);
export { Injector };
//# sourceMappingURL=injector.js.map