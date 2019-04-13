import { ClassProvider } from './class-provider';
/**
 * A provider for singleton class instances
 *
 * @remarks
 * The `SingletonProvidr` caches the first instance of a class it creates and subsequently
 * returns the cached instance instead of creating new instances.
 */
export class SingletonProvider extends ClassProvider {
    provide(injector) {
        if (!this._instance)
            this._instance = super.provide(injector);
        return this._instance;
    }
}
//# sourceMappingURL=singleton-provider.js.map