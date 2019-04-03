import { inject, injectable, optional } from './decorators';
import { InjectToken } from './inject-token';
import { CLASS_NOT_PROVIDABLE, CLASS_NOT_RESOLVABLE, Injector, NO_PROVIDER } from './injector';
import { ClassProvider, SingletonProvider, ValueProvider } from './providers';

describe('Injector', () => {

    it('should create an injector', () => {

        const injector = new Injector();

        expect(injector).toBeDefined();
        expect(injector instanceof Injector).toBe(true);
    });

    it('should resolve classes', () => {

        @injectable()
        class Service {

            get () { return 'foo'; }
        }

        const injector = new Injector();

        expect(injector.resolve(Service)! instanceof Service).toBe(true);
        expect(injector.resolve(Service)!.get()).toBe('foo');
    });

    it('should resolve tokens', () => {

        @injectable()
        class Service {

            get () { return 'foo'; }
        }

        const SERVICE = new InjectToken<Service>('Service');
        const CONFIG = new InjectToken<any>('Config');

        const injector = new Injector();

        injector.register(SERVICE, new ClassProvider(Service));
        injector.register(CONFIG, new ValueProvider({ foo: true }));

        expect(injector.resolve(SERVICE)! instanceof Service).toBe(true);
        expect(injector.resolve(SERVICE)!.get()).toBe('foo');

        expect(injector.resolve(CONFIG)!).toEqual({ foo: true });
    });

    it('should resolve class dependencies', () => {

        interface User {
            username: string;
        }

        const USER = new InjectToken<User>('User');

        interface MessageServiceConfig {
            receiveMessages: boolean;
        }

        const MESSAGE_SERVICE_CONFIG = new InjectToken<MessageServiceConfig>('MessageServiceConfig');

        @injectable()
        class MessageService {

            constructor (@inject(MESSAGE_SERVICE_CONFIG) public config: MessageServiceConfig) { }

            getMessage (username: string): string | undefined {

                return this.config.receiveMessages ? `new message for ${ username }: Hi!` : undefined;
            }
        }

        @injectable()
        class MessageClient {

            @inject(USER)
            user!: User;

            constructor (public service: MessageService) { }

            getMessage (): string | undefined {

                return this.service.getMessage(this.user.username);
            }
        }

        const injector = new Injector();

        injector.register(USER, new ValueProvider<User>({ username: 'steven' }));
        injector.register(MESSAGE_SERVICE_CONFIG, new ValueProvider<MessageServiceConfig>({ receiveMessages: true }));

        const client = injector.resolve(MessageClient)!;

        expect(client).toBeDefined();
        expect(client.user).toEqual({ username: 'steven' });
        expect(client.service instanceof MessageService).toBe(true);
        expect(client.service.config).toEqual({ receiveMessages: true });
        expect(client.getMessage()).toBe('new message for steven: Hi!');

        injector.register(MESSAGE_SERVICE_CONFIG, new ValueProvider<MessageServiceConfig>({ receiveMessages: false }));

        const client2 = injector.resolve(MessageClient)!;

        expect(client2.user).toEqual({ username: 'steven' });
        expect(client2.service instanceof MessageService).toBe(true);
        expect(client2.service.config).toEqual({ receiveMessages: false });
        expect(client2.getMessage()).toBe(undefined);
    });

    it('should resolve singleton dependencies correctly', () => {

        @injectable()
        class MessageServiceConfig {

            constructor (@optional() public receiveMessages: boolean = true) { }
        }

        @injectable()
        class MessageService {

            constructor (public config: MessageServiceConfig) { }

            getMessage (): string | undefined {

                return this.config.receiveMessages ? `new message: Hi!` : undefined;
            }
        }

        @injectable()
        class MessageClient {

            constructor (public service: MessageService) { }

            getMessage (): string | undefined {

                return this.service.getMessage();
            }
        }

        const injector = new Injector();

        injector.register(MessageService, new SingletonProvider(MessageService));

        const client = injector.resolve(MessageClient)!;

        expect(client).toBeDefined();
        expect(client.service instanceof MessageService).toBe(true);
        expect(client.service.config instanceof MessageServiceConfig).toBe(true);
        expect(client.service.config.receiveMessages).toBe(true);
        expect(client.getMessage()).toBe('new message: Hi!');

        const client2 = injector.resolve(MessageClient)!;

        expect(client2).toBeDefined();
        expect(client2.service instanceof MessageService).toBe(true);
        expect(client2.service.config instanceof MessageServiceConfig).toBe(true);
        expect(client2.service.config.receiveMessages).toBe(true);
        expect(client2.getMessage()).toBe('new message: Hi!');

        // the instances of service and service.config should be the same in both clients
        expect(client.service).toBe(client2.service);
        // even though config is not registered as singleton, it should be created only once
        // during the creation of the service instance
        expect(client.service.config).toBe(client2.service.config);
    });

    it('should allow registering providers for classes', () => {

        @injectable()
        class MessageService {

            getMessage (): string {
                return 'message';
            }
        }

        @injectable()
        class MessageClient {

            constructor (public service: MessageService) { }
        }

        const injector = new Injector();

        injector.register(MessageService, new SingletonProvider(MessageService));

        const client1 = injector.resolve(MessageClient)!;
        const client2 = injector.resolve(MessageClient)!;

        expect(client1.service instanceof MessageService).toBe(true);
        expect(client2.service instanceof MessageService).toBe(true);
        expect(client1.service).toBe(client2.service);
    });

    it('should throw if no provider is registered', () => {

        const token = new InjectToken<string>('token');

        const injector = new Injector();

        const resolve = () => {

            injector.resolve(token);
        };

        expect(resolve).toThrowError(NO_PROVIDER(token).message);
    });

    it('should throw if class cannot be resolved', () => {

        class MessageClient { }

        const injector = new Injector();

        const resolve = () => {

            injector.resolve(MessageClient);
        };

        expect(resolve).toThrowError(CLASS_NOT_RESOLVABLE(MessageClient).message);
    });

    it('should throw when registering a provider for a class which is not providable', () => {

        class MessageClient { }

        const injector = new Injector();

        const register = () => {

            injector.register(MessageClient, new ClassProvider(MessageClient));
        };

        expect(register).toThrowError(CLASS_NOT_PROVIDABLE(MessageClient).message);
    });

    it('should provide itself', () => {

        @injectable()
        class Service {

            constructor (public injector: Injector) { }
        }

        const injector = new Injector();

        expect(injector.resolve(Injector)).toBe(injector);

        const child = new Injector(injector);

        expect(child.resolve(Injector)).toBe(child);

        let service = injector.resolve(Service)!;

        expect(service.injector).toBe(injector);

        service = child.resolve(Service)!;

        expect(service.injector).toBe(child);
    });

    it('should be able to use hierarchical injectors', () => {

        interface User {
            username: string;
        }

        interface MessageService {
            sendMessage (message: string, user: User): void;
        }

        // we always need an InjectToken to inject an interface
        const USER = new InjectToken<User>('User');
        const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');

        @injectable()
        class NoopMessageService implements MessageService {
            sendMessage (message: string, user: User) { }
        }

        @injectable()
        class FacebookMessageService implements MessageService {
            sendMessage (message: string, user: User) { }
        }

        @injectable()
        class TwitterMessageService implements MessageService {
            sendMessage (message: string, user: User) { }
        }

        @injectable()
        class MessageClient {
            constructor (
                @inject(MESSAGE_SERVICE) public service: MessageService,
                @inject(USER) public user: User) { }
        }

        // this is a self-contained module which creates its own child injector
        @injectable()
        class FacebookMessageModule {
            // the child injector of the module
            private injector: Injector;
            // the message client of the module
            public client: MessageClient;

            // the parent injector will inject itself into the constructor
            constructor (parentInjector: Injector) {
                // we create the child injector inside the module
                this.injector = new Injector(parentInjector);
                // we register the appropriate provider for the MESSAGE_SERVICE token
                this.injector.register(MESSAGE_SERVICE, new ClassProvider(FacebookMessageService));
                // we resolve the message client through the child injector
                this.client = this.injector.resolve(MessageClient)!;
            }
        }

        // this is a module which needs to be resolved from a child injector
        @injectable()
        class TwitterMessageModule {
            constructor (public client: MessageClient) { }
        }

        // this will be the parent injector
        const rootInjector = new Injector();

        // we can register the USER token with the parent injector
        rootInjector.register(USER, new ValueProvider({ username: 'john' }));
        // we can also register the NoopMessageService with the parent injector
        rootInjector.register(MESSAGE_SERVICE, new ClassProvider(NoopMessageService));

        // we create a child injector for the twitter module by passing the rootInjector
        // as a constructor argument - this sets up the parent-child relationship
        const twitterInjector = new Injector(rootInjector);

        // on the child injector, we register the appropriate message service implementation
        twitterInjector.register(MESSAGE_SERVICE, new ClassProvider(TwitterMessageService));

        // now we can resolve our twitter module from the child injector
        const twitterModule = twitterInjector.resolve(TwitterMessageModule)!;

        // our facebook module is self-contained and can be resolved from the root injector
        // an implementation like this is preferrable, as it is better decoupled
        const facebookModule = rootInjector.resolve(FacebookMessageModule)!;

        // we can also resolve a generic client from the root injector
        const defaultClient = rootInjector.resolve(MessageClient)!;

        expect(defaultClient instanceof MessageClient).toBe(true);
        expect(defaultClient.service instanceof NoopMessageService).toBe(true);
        expect(defaultClient.user.username).toBe('john');

        expect(facebookModule instanceof FacebookMessageModule).toBe(true);
        expect(facebookModule.client instanceof MessageClient).toBe(true);
        expect(facebookModule.client.service instanceof FacebookMessageService).toBe(true);
        expect(facebookModule.client.user.username).toBe('john');

        expect(twitterModule instanceof TwitterMessageModule).toBe(true);
        expect(twitterModule.client instanceof MessageClient).toBe(true);
        expect(twitterModule.client.service instanceof TwitterMessageService).toBe(true);
        expect(twitterModule.client.user.username).toBe('john');
    });
});
