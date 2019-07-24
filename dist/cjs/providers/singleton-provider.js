"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_provider_js_1 = require("./class-provider.js");
/**
 * A provider for singleton class instances
 *
 * @remarks
 * The `SingletonProvidr` caches the first instance of a class it creates and subsequently
 * returns the cached instance instead of creating new instances.
 */
class SingletonProvider extends class_provider_js_1.ClassProvider {
    provide(injector) {
        if (!this._instance)
            this._instance = super.provide(injector);
        return this._instance;
    }
}
exports.SingletonProvider = SingletonProvider;
//# sourceMappingURL=singleton-provider.js.map