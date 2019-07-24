import { getParameterAnnotations, getPropertyAnnotations } from '../annotations/index.js';
import { createClassFactory } from '../factories/index.js';
import { BaseProvider } from './base-provider.js';
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
export class ClassProvider extends BaseProvider {
    constructor(constructorFn, parameters, properties) {
        super(createClassFactory(constructorFn), parameters || getParameterAnnotations(constructorFn), properties || getPropertyAnnotations(constructorFn));
    }
}
//# sourceMappingURL=class-provider.js.map