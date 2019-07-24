"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../annotations/index.js");
const index_js_2 = require("../factories/index.js");
const base_provider_js_1 = require("./base-provider.js");
/**
 * A provider for class instances
 *
 * @remarks
 * The `ClassProvider` provides instances of classes. It can be created by passing a reference to a class
 * to its constructor. `ClassProvider` automatically analyzes parameter and property dependencies of the
 * class and resolves them when creating instances.
 *
 * ```typescript
 * @injectable()
 * class Foo { }
 *
 * @injectable()
 * class Bar { }
 *
 * @injectable()
 * class FooBar {
 *
 *     @optional()
 *     @inject()
 *     bar!: Bar;
 *
 *     constructor (public foo: Foo) { }
 * }
 *
 * const provider = new ClassProvider(FooBar);
 * const injector = new Injector();
 *
 * injector.register(FooBar, provider);
 *
 * const fooBar = injector.resolve(FooBar)!;
 * ```
 */
class ClassProvider extends base_provider_js_1.BaseProvider {
    constructor(constructorFn, parameters, properties) {
        super(index_js_2.createClassFactory(constructorFn), parameters || index_js_1.getParameterAnnotations(constructorFn), properties || index_js_1.getPropertyAnnotations(constructorFn));
    }
}
exports.ClassProvider = ClassProvider;
//# sourceMappingURL=class-provider.js.map