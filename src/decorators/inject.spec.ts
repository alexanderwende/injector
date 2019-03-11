import { injectable } from './injectable';
import { inject } from './inject';
import { Injector } from '../injector';
import { InjectToken } from '../inject-token';
import { ClassProvider } from '../providers';

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

        const fooClient = injector.resolve(MessageClient)!;

        expect(fooClient.service).toBeDefined();
        expect(fooClient.service instanceof FooMessageService).toBe(true);
        expect(fooClient.service.getMessage()).toBe('foo');
    });

    it('should inject tokens', () => {

        // decorate the consumer as injectable
        @injectable()
        class MessageClient {

            // inject the implementation by using the `@inject` decorator and the `InjectToken`
            constructor (@inject(MESSAGE_SERVICE) public service: MessageService) { }
        }

        // create an `Injector` instance
        const injector = new Injector();

        // tell the injector how to provide the MESSAGE_SERVICE token
        // we are using a `ClassProvider` here, but we could use other providers as well
        injector.provide(MESSAGE_SERVICE, new ClassProvider(FooMessageService));

        // create instances by letting the `Injector` resolve them
        const fooClient = injector.resolve(MessageClient)!;

        expect(fooClient.service).toBeDefined();
        expect(fooClient.service instanceof FooMessageService).toBe(true);
        expect(fooClient.service.getMessage()).toBe('foo');
    });

    it('should inject tokens into class properties', () => {

        @injectable()
        class MessageClient {

            @inject(MESSAGE_SERVICE)
            public service!: BarMessageService;
        }

        const injector = new Injector();

        injector.provide(MESSAGE_SERVICE, new ClassProvider(BarMessageService));

        const fooClient = injector.resolve(MessageClient)!;

        expect(fooClient.service).toBeDefined();
        expect(fooClient.service instanceof BarMessageService).toBe(true);
        expect(fooClient.service.getMessage()).toBe('bar');
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

    xit('should inject dependencies by class', () => {

        @injectable()
        class MessageClient {
            // FIXME: this corrently throws a NO_PROVIDER error
            constructor (@inject(FooMessageService) public service: any) {}
        }

        const injector = new Injector();

        const fooClient = injector.resolve(MessageClient)!;

        expect(fooClient.service).toBeDefined();
        expect(fooClient.service instanceof BarMessageService).toBe(true);
        expect(fooClient.service.getFoo()).toBe('bar');
    });
});
