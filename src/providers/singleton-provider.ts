import { ClassProvider } from './class-provider';
import { Injector } from '../injector';

/**
 * A provider for singleton class instances
 *
 * @remarks
 * The `SingletonProvidr` caches the first instance of a class it creates and subsequently
 * returns the cached instance instead of creating new instances.
 */
export class SingletonProvider<T> extends ClassProvider<T> {

    protected _instance: T | undefined;

    provide (injector?: Injector): T {

        if (!this._instance) this._instance = super.provide(injector);

        return this._instance;
    }
}
