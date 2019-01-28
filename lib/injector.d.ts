import { InjectToken } from './inject-token';
import { Provider } from './providers';
import { Constructor } from './utils';
export declare const CLASS_NOT_PROVIDABLE: (constructorFn: Constructor<any>) => Error;
export declare const NO_PROVIDER: (token: InjectToken<any>) => Error;
export declare class Injector {
    private _registry;
    private _parent;
    constructor(parent?: Injector);
    provide<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
    resolve<T>(target: Constructor<T> | InjectToken<T>, optional?: boolean): T | undefined;
    protected _resolveConstructor<T>(constructorFn: Constructor<T>, optional?: boolean): T | undefined;
    protected _resolveToken<T>(token: InjectToken<T>, optional?: boolean): T | undefined;
    protected _getProvider<T>(token: InjectToken<T>): Provider<T> | undefined;
}
//# sourceMappingURL=injector.d.ts.map