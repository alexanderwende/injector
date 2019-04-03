import { inject, injectable, optional } from '../decorators';
import { ClassProvider } from './class-provider';
import { Injector } from '../injector';

describe('ClassProvider', () => {

    it('should create a provider', () => {

        @injectable()
        class Foo { }

        const provider = new ClassProvider(Foo);

        expect(provider).toBeDefined();
    });

    it('should create parameter and property dependencies automatically', () => {

        @injectable()
        class Foo { }

        @injectable()
        class Bar { }

        @injectable()
        class FooBar {

            @optional()
            @inject()
            bar!: Bar;

            constructor (public foo: Foo) { }
        }

        const provider = new ClassProvider(FooBar);

        expect(provider.parameters.get(0)).toBeDefined();
        expect(provider.parameters.get(0)!.token).toBe(Foo);
        expect(provider.parameters.get(0)!.optional).toBe(false);

        expect(provider.properties.get('bar')).toBeDefined();
        expect(provider.properties.get('bar')!.token).toBe(Bar);
        expect(provider.properties.get('bar')!.optional).toBe(true);

        const injector = new Injector();

        injector.register(FooBar, provider);

        const result = injector.resolve(FooBar)!;

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.bar instanceof Bar).toBe(true);
    });

    it('should provide a new instances every time', () => {

        @injectable()
        class Foo {}

        const injector = new Injector();
        const provider = new ClassProvider(Foo);

        const foo1 = provider.provide(injector);

        expect(foo1 instanceof Foo).toBe(true);

        const foo2 = provider.provide(injector);

        expect(foo2 instanceof Foo).toBe(true);

        expect(foo1).not.toBe(foo2);
    });
});
