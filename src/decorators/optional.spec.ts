import { injectable } from './injectable';
import { optional } from './optional';
import { inject } from './inject';
import { Injector } from '../injector';
import { InjectToken } from '../inject-token';
import { ValueProvider } from '../providers';

describe('@optional', () => {

    // an injectable class
    @injectable()
    class FooMessageService {

        getMessage (): string {
            return 'foo';
        }
    }

    // a non-injectable class
    class BarMesageService {

        getMessage (): string {
            return 'bar';
        }
    }

    interface MessageClientConfig {
        checkMessages: boolean;
        answerMessages: boolean;
    }

    // an InjectToken for an interface which we won't register
    const CONFIG = new InjectToken<MessageClientConfig>('MessageClientConfig');

    it('should resolve optional dependencies', () => {

        // this is a baseline test to ensure the `@optional` decorator doesn't change the
        // default behavior of the injector, when the optional dependencies exist

        @injectable()
        class MessageClient {

            @optional()
            @inject()
            serviceProperty!: FooMessageService;

            constructor (
                @optional() public serviceParameter?: FooMessageService,
                @optional() @inject(CONFIG) public config?: MessageClientConfig
            ) { }
        }

        const injector = new Injector();

        injector.register(CONFIG, new ValueProvider({ checkMessages: true, answerMessages: false }));

        const client = injector.resolve(MessageClient)!;

        expect(client.serviceParameter).toBeDefined();
        expect(client.serviceParameter instanceof FooMessageService).toBe(true);
        expect(client.serviceParameter!.getMessage()).toBe('foo');

        expect(client.config).toBeDefined();
        expect(client.config!.checkMessages).toBe(true);
        expect(client.config!.answerMessages).toBe(false);

        expect(client.serviceProperty).toBeDefined();
        expect(client.serviceProperty instanceof FooMessageService).toBe(true);
        expect(client.serviceProperty.getMessage()).toBe('foo');

    });

    it('should resolve missing optional parameter dependencies with undefined', () => {

        @injectable()
        class MessageClient {

            constructor (
                // BarMessageService is not injectable, by marking it as optional we can prevent an error
                @optional() public service?: BarMesageService,
                // MessageClientConfig is just an interface, by marking it as optional we can prevent an error
                @optional() public config?: MessageClientConfig
            ) { }
        }

        const injector = new Injector();

        const client = injector.resolve(MessageClient)!;

        expect(client.service).toBeUndefined();
        expect(client.config).toBeUndefined();
    });

    it('should resolve missing optional property dependencies with undefined', () => {

        @injectable()
        class MessageClient {

            // CONFIG has no provider, by marking it as optional we can prevent an error
            @optional()
            @inject(CONFIG)
            config?: MessageClientConfig;

            // BarMessageService is not injectable, by marking it as optional we can prevent an error
            @optional()
            @inject()
            service?: BarMesageService;
        }

        const injector = new Injector();

        const client = injector.resolve(MessageClient)!;

        expect(client.service).toBeUndefined();
        expect(client.config).toBeUndefined();
    });
});
