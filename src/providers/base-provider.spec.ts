import { BaseProvider, PROVIDER_UNREGISTERED } from './base-provider';
import { Injector } from '../injector';
import { InjectToken } from '../inject-token';
import { injectable } from '../decorators';

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

    it('should allow setting dependencies manually', () => {

        @injectable()
        class Foo { }

        @injectable()
        class Bar { }

        const factory = (foo: Foo, bar: Bar) => ({ foo: foo, bar: bar });

        const provider = new BaseProvider(factory, new Map([
            [0, { token: Foo, optional: false }],
            [1, { token: Bar, optional: false }],
        ]));

        const injector = new Injector();

        let result = provider.provide(injector);

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.bar instanceof Bar).toBe(true);

        // provide by resolving through injector

        const token = new InjectToken<any>('FooBar');

        injector.register(token, provider);

        result = injector.resolve(token)!;

        expect(result.foo instanceof Foo).toBe(true);
        expect(result.bar instanceof Bar).toBe(true);
    });
});
