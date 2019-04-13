import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';
import { ParameterDependencies, PropertyDependencies } from './provider';
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
export declare class ClassProvider<T> extends BaseProvider<T> {
    constructor(constructorFn: Constructor<T>, parameters?: ParameterDependencies, properties?: PropertyDependencies);
}
//# sourceMappingURL=class-provider.d.ts.map