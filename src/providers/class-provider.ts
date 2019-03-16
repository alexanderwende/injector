import {
    getParameterAnnotations,
    getPropertyAnnotations,
    ParameterAnnotations,
    PropertyAnnotations
} from '../annotations';
import { createClassFactory } from '../factories';
import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';

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
 * injector.provide(FooBar, provider);
 *
 * const fooBar = injector.resolve(FooBar)!;
 * ```
 */
export class ClassProvider<T> extends BaseProvider<T> {

    constructor (
        constructorFn: Constructor<T>,
        parameters?: ParameterAnnotations,
        properties?: PropertyAnnotations) {

        super(
            createClassFactory(constructorFn),
            parameters || getParameterAnnotations(constructorFn),
            properties || getPropertyAnnotations(constructorFn)
        );
    }
}
