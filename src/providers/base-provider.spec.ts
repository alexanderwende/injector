import { BaseProvider, PROVIDER_UNREGISTERED } from './base-provider';
import { Injector } from '../injector';
import { InjectToken } from '../inject-token';
import { injectable } from '../decorators';
import { DependencyAnnotation } from '../annotations';
import { Factory } from '../factories';

describe('BaseProvider', () => {

    it('should create a provider', () => {

        const provider = new BaseProvider(() => 'foo');

        expect(provider).toBeDefined();
    });

    it('should provide', () => {

        const injector = new Injector();
        const provider = new BaseProvider(() => 'foo');

        expect(provider.provide(injector)).toBe('foo');
    });

    it('should register with an injector', () => {

        const injector = new Injector();
        const provider = new BaseProvider(() => 'foo');

        const token = new InjectToken('foo');

        injector.register(token, provider);

        // provider should use the injector it is registered with
        expect(provider.provide()).toBe('foo');

        // injector can resolve via token
        expect(injector.resolve(token)).toBe('foo');
    });

    it('should throw if not registered with an injector', () => {

        const noInjector = () => {

            const provider = new BaseProvider(() => 'foo');

            provider.provide();
        }

        expect(noInjector).toThrowError(PROVIDER_UNREGISTERED.message);
    });

    it('should allow setting dependency annotations manually', () => {

        @injectable()
        class Foo { }

        // don't make Bar injectable and make the dependency optional
        class Bar { }

        @injectable()
        class Baz { }

        const factory = (foo: Foo, bar?: Bar, baz?: Baz) => ({ foo: foo, bar: bar, baz: baz });

        const provider = new BaseProvider(
            factory,
            // parameter dependencies
            [
                new DependencyAnnotation(Foo),
                new DependencyAnnotation(Bar, true)
            ],
            // property dependencies
            {
                baz: new DependencyAnnotation(Baz, true)
            }
        );

        const injector = new Injector();

        let result = provider.provide(injector);

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.bar).toBeUndefined();
        expect(result.baz instanceof Baz).toBe(true);

        // provide by resolving through injector

        const token = new InjectToken<any>('FooBar');

        injector.register(token, provider);

        result = injector.resolve(token)!;

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.bar).toBeUndefined();
        expect(result.baz instanceof Baz).toBe(true);
    });

    it('should allow setting plain values for dependencies', () => {

        const BAZ = Symbol('baz');

        interface FooBar {
            foo: string;
            bar: number;
            [BAZ]: boolean;
        }

        const factory: Factory<FooBar> = (foo: string, bar: number, baz: boolean) => ({
            foo: foo,
            bar: bar,
            [BAZ]: baz
        });

        const provider = new BaseProvider<FooBar>(factory, ['foo', 1], { [BAZ]: true });

        const injector = new Injector();

        let result = provider.provide(injector);

        expect(result.foo).toBe('foo');
        expect(result.bar).toBe(1);
        expect(result[BAZ]).toBe(true);

        // provide by resolving through injector

        const token = new InjectToken<FooBar>('FooBar');

        injector.register(token, provider);

        result = injector.resolve(token)!;

        expect(result.foo).toBe('foo');
        expect(result.bar).toBe(1);
        expect(result[BAZ]).toBe(true);
    });

    it('should allow setting mixed dependencies', () => {

        class Foo { }

        type Bar = 'BAR' | 'Bar' | 'bar';

        const FOO = new Foo();

        const BAR = new InjectToken<Bar>('Bar');

        const BAY = new InjectToken<number>('Bay');

        const BAZ = Symbol('baz');

        const factory = (foo: Foo, bar: Bar, bay?: number, baz?: boolean) => ({
            foo: foo,
            bar: bar,
            bay: bay,
            [BAZ]: baz
        });

        const provider = new BaseProvider(
            factory,
            [
                FOO,
                new DependencyAnnotation(BAR, true)
            ],
            {
                bay: new DependencyAnnotation(BAY, true),
                [BAZ]: false
            }
        );

        const injector = new Injector();

        let result = provider.provide(injector);

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.foo).toBe(FOO);
        expect(result.bar).toBeUndefined();
        expect(result.bay).toBeUndefined();
        expect(result[BAZ]).toBe(false);

        injector.register(BAR, new BaseProvider<Bar>(() => 'bar'));
        injector.register(BAY, new BaseProvider<number>(() => 4));

        result = provider.provide(injector);

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.foo).toBe(FOO);
        expect(result.bar).toBe('bar');
        expect(result.bay).toBe(4);
        expect(result[BAZ]).toBe(false);

        // provide by resolving through injector

        const token = new InjectToken<any>('FooBar');

        injector.register(token, provider);

        result = injector.resolve(token)!;

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.foo).toBe(FOO);
        expect(result.bar).toBe('bar');
        expect(result.bay).toBe(4);
        expect(result[BAZ]).toBe(false);
    });
});
