import { getTokenAnnotation } from './annotations';
import { Constructor } from './decorators';
import { InjectToken } from './inject-token';
import { ClassProvider, Provider } from './providers';

export const CLASS_NOT_INJECTABLE = (constructorFn: Constructor) => new Error(`Class '${constructorFn.name}' has not been decorated as injectable and cannot be resolved.`);
export const NO_PROVIDER          = (token: InjectToken) => new Error(`No provider has been found for the requested token '${token.description}'.`);

export class Injector {

    private _registry: Map<InjectToken<any>, Provider<any>> = new Map();

    provide<T> (constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>) {

        const token: InjectToken<T> = constructorOrToken instanceof InjectToken ?
                                      constructorOrToken :
                                      getTokenAnnotation(constructorOrToken);

        // class was not decorated with @injectable, throw
        if (!token) throw CLASS_NOT_INJECTABLE(constructorOrToken as Constructor);

        provider.injector = this;

        this._registry.set(token, provider);
    }

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

    protected _resolveConstructor<T> (constructorFn: Constructor<T>, optional = false): T | undefined {

        const token: InjectToken<T> = getTokenAnnotation(constructorFn);

        // class was not decorated with @injectable, throw
        if (!token) throw CLASS_NOT_INJECTABLE(constructorFn);

        // class has no provider yet, we create one
        if (!this._registry.has(token)) this.provide(token, new ClassProvider(constructorFn));

        return this._resolveToken(token, optional);
    }

    protected _resolveToken<T> (token: InjectToken<T>, optional = false): T | undefined {

        const provider = this._registry.get(token);

        if (!provider) {

            if (!optional) throw NO_PROVIDER(token);

            return undefined;
        }

        return provider!.provide();
    }
}
