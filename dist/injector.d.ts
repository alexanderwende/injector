import { Constructor } from './decorators';
import { InjectToken } from './inject-token';
import { Provider } from './providers';
export declare const CLASS_NOT_INJECTABLE: (constructorFn: Constructor<any>) => Error;
export declare const NO_PROVIDER: (token: InjectToken<any>) => Error;
export declare class Injector {
    private _registry;
    provide<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
    resolve<T>(target: Constructor<T> | InjectToken<T>, optional?: boolean): T | undefined;
    protected _resolveConstructor<T>(constructorFn: Constructor<T>, optional?: boolean): T | undefined;
    protected _resolveToken<T>(token: InjectToken<T>, optional?: boolean): T | undefined;
}
