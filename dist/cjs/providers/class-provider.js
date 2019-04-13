"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("../annotations");
const factories_1 = require("../factories");
const base_provider_1 = require("./base-provider");
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
class ClassProvider extends base_provider_1.BaseProvider {
    constructor(constructorFn, parameters, properties) {
        super(factories_1.createClassFactory(constructorFn), parameters || annotations_1.getParameterAnnotations(constructorFn), properties || annotations_1.getPropertyAnnotations(constructorFn));
    }
}
exports.ClassProvider = ClassProvider;
//# sourceMappingURL=class-provider.js.map