import { InjectToken } from '../inject-token';
import { Injector } from '../injector';
import { ClassProvider } from '../providers';
import { inject } from './inject';
import { injectable } from './injectable';

describe('@inject', () => {

    // an interface describing the MessageService
    interface MessageService {
        getMessage (): string;
    }

    // a class implementing the MessageService interface - decorated as injectable
    @injectable()
    class FooMessageService implements MessageService {

        getMessage () {
            return 'foo';
        }
    }

    // a class implementing the MessageService interface - decorated as injectable
    @injectable()
    class BarMessageService implements MessageService {

        getMessage () {
            return 'bar';
        }
    }

    // an `InjectToken` representing the MessageService interface
    const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');

    it('should inject class properties', () => {

        @injectable()
        class MessageClient {

            @inject()
            public service!: FooMessageService;
        }

        const injector = new Injector();

        const client = injector.resolve(MessageClient)!;

        expect(client.service).toBeDefined();
        expect(client.service instanceof FooMessageService).toBe(true);
        expect(client.service.getMessage()).toBe('foo');
    });

    it('should inject tokens into constructor parameters', () => {

        // decorate the consumer as injectable
        @injectable()
        class MessageClient {

            // inject the implementation by using the `@inject` decorator and the `InjectToken`
            constructor (@inject(MESSAGE_SERVICE) public service: MessageService) { }
        }

        // create an `Injector` instance
        const injector = new Injector();

        // tell the injector how to resolve the MESSAGE_SERVICE token
        // we are using a `ClassProvider` here, but we could use other providers as well
        injector.register(MESSAGE_SERVICE, new ClassProvider(FooMessageService));

        // create instances by letting the `Injector` resolve them
        const client = injector.resolve(MessageClient)!;

        expect(client.service).toBeDefined();
        expect(client.service instanceof FooMessageService).toBe(true);
        expect(client.service.getMessage()).toBe('foo');
    });

    it('should inject tokens into class properties', () => {

        @injectable()
        class MessageClient {

            @inject(MESSAGE_SERVICE)
            public service!: BarMessageService;
        }

        const injector = new Injector();

        injector.register(MESSAGE_SERVICE, new ClassProvider(BarMessageService));

        const client = injector.resolve(MessageClient)!;

        expect(client.service).toBeDefined();
        expect(client.service instanceof BarMessageService).toBe(true);
        expect(client.service.getMessage()).toBe('bar');
    });

    it('should inject tokens into numeric class properties', () => {

        @injectable()
        class MessageClient {

            @inject(MESSAGE_SERVICE)
            public 0: BarMessageService;
        }

        const injector = new Injector();

        injector.register(MESSAGE_SERVICE, new ClassProvider(BarMessageService));

        const client = injector.resolve(MessageClient)!;

        expect(client[0]).toBeDefined();
        expect(client[0] instanceof BarMessageService).toBe(true);
        expect(client[0].getMessage()).toBe('bar');
    });

    it('should inject tokens into symbol class properties', () => {

        const symbol = Symbol();

        @injectable()
        class MessageClient {

            @inject(MESSAGE_SERVICE)
            public [symbol]: BarMessageService;
        }

        const injector = new Injector();

        injector.register(MESSAGE_SERVICE, new ClassProvider(BarMessageService));

        const client = injector.resolve(MessageClient)!;

        expect(client[symbol]).toBeDefined();
        expect(client[symbol] instanceof BarMessageService).toBe(true);
        expect(client[symbol].getMessage()).toBe('bar');
    });

    it('should have no effect on a typed constructor parameter', () => {

        @injectable()
        class MessageClient {

            constructor (@inject() public service: FooMessageService) { }
        }

        const injector = new Injector();

        const fooClient = injector.resolve(MessageClient)!;

        expect(fooClient.service).toBeDefined();
        expect(fooClient.service instanceof FooMessageService).toBe(true);
        expect(fooClient.service.getMessage()).toBe('foo');
    });
});
