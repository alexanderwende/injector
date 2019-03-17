import { inject, injectable, optional } from './decorators';
import { InjectToken } from './inject-token';
import { Injector, NO_PROVIDER, CLASS_NOT_RESOLVABLE, CLASS_NOT_PROVIDABLE } from './injector';
import { ClassProvider, SingletonProvider, ValueProvider } from './providers';

describe('Injector', () => {

    interface Weapon {

        use (): string;
    }

    @injectable()
    class Sword implements Weapon {

        use () {

            return 'Sword strike...';
        }
    }

    @injectable()
    class Gun implements Weapon {

        use () {

            return 'Gun shot...';
        }
    }

    @injectable()
    class Revolver extends Gun {

        constructor () {

            super();
        }

        use () {

            return 'Revolver shot...';
        }
    }

    @injectable()
    class Water {

        drink () {

            return 'Gulp, gulp, gulp...';
        };
    }

    // interfaces disappear after compilation, so we need to create an InjectToken
    // for the interface if we want to use it in the injector
    const WEAPON_TOKEN = new InjectToken<Weapon>('Weapon');

    // we can also create tokens for arbitrary values
    const NAME_TOKEN = new InjectToken<string>('NAME');

    @injectable()
    class Warrior {

        @optional() @inject(NAME_TOKEN)
        public name!: string;

        constructor (@inject(WEAPON_TOKEN) public weapon: Weapon, public drink?: Water) { }

        fight (useWeapon: boolean = false) {

            return `${ this.name } fights: ${ useWeapon ? this.weapon.use() : 'Fist punch...' }`;
        }

        rest () {

            return `${ this.name } rests: ${ this.drink ? this.drink.drink() : '' }`;
        }
    }

    it('should create an injector', () => {

        const injector = new Injector();

        expect(injector).toBeDefined();
        expect(injector instanceof Injector).toBe(true);
    });

    it('should resolve classes', () => {

        const injector = new Injector();

        expect(injector.resolve(Sword)! instanceof Sword).toBe(true);
        expect(injector.resolve(Sword)!.use()).toBe('Sword strike...');

        expect(injector.resolve(Water)! instanceof Water).toBe(true);
        expect(injector.resolve(Water)!.drink()).toBe('Gulp, gulp, gulp...');
    });

    it('should resolve tokens', () => {

        const injector = new Injector();

        injector.register(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.register(NAME_TOKEN, new ValueProvider('Clay'));

        expect(injector.resolve(WEAPON_TOKEN)! instanceof Sword).toBe(true);
        expect(injector.resolve(WEAPON_TOKEN)!.use()).toBe('Sword strike...');

        expect(injector.resolve(NAME_TOKEN)!).toBe('Clay');
    });

    it('should resolve dependencies correctly', () => {

        const injector = new Injector();

        injector.register(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.register(NAME_TOKEN, new ValueProvider('Clay'));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBe('Clay');
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('Clay fights: Sword strike...');
        expect(warrior.fight()).toBe('Clay fights: Fist punch...');
        expect(warrior.rest()).toBe('Clay rests: Gulp, gulp, gulp...');

        const warrior2 = injector.resolve(Warrior)!;

        expect(warrior2.name).toBe('Clay');
        expect(warrior2.weapon instanceof Sword).toBe(true);
        expect(warrior2.drink instanceof Water).toBe(true);

        // instances of Sword and Water should be distinct
        expect(warrior.weapon).not.toBe(warrior2.weapon);
        expect(warrior.drink).not.toBe(warrior2.drink);
    });

    it('can be configured with different dependencies', () => {

        const injector = new Injector();

        injector.register(WEAPON_TOKEN, new ClassProvider(Revolver));
        injector.register(NAME_TOKEN, new ValueProvider('Cliff'));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBe('Cliff');
        expect(warrior.weapon instanceof Revolver).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('Cliff fights: Revolver shot...');
        expect(warrior.fight()).toBe('Cliff fights: Fist punch...');
        expect(warrior.rest()).toBe('Cliff rests: Gulp, gulp, gulp...');
    });

    it('should resolve singleton dependencies correctly', () => {

        const injector = new Injector();

        injector.register(WEAPON_TOKEN, new SingletonProvider(Gun));
        injector.register(NAME_TOKEN, new ValueProvider('Smith'));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBe('Smith');
        expect(warrior.weapon instanceof Gun).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        const warrior2 = injector.resolve(Warrior)!;

        expect(warrior2.name).toBe('Smith');
        expect(warrior2.weapon instanceof Gun).toBe(true);
        expect(warrior2.drink instanceof Water).toBe(true);

        // instances of Gun should be the same
        expect(warrior.weapon).toBe(warrior2.weapon);
    });

    // this is new
    it('should allow providing classes directly', () => {

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

    it('should pass undefined for optional missing dependency', () => {

        const injector = new Injector();

        injector.register(WEAPON_TOKEN, new ClassProvider(Sword));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBeUndefined();
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('undefined fights: Sword strike...');
        expect(warrior.fight()).toBe('undefined fights: Fist punch...');
        expect(warrior.rest()).toBe('undefined rests: Gulp, gulp, gulp...');
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

    it('can use parent injectors', () => {

        const injector = new Injector();

        // we set up the root injector
        injector.register(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.register(NAME_TOKEN, new ValueProvider('Clay'));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBe('Clay');
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        // we create a child injector
        const childInjector = new Injector(injector);

        const warrior2 = childInjector.resolve(Warrior)!;

        expect(warrior2.name).toBe('Clay');
        expect(warrior2.weapon instanceof Sword).toBe(true);
        expect(warrior2.drink instanceof Water).toBe(true);

        // we configure the child injector
        childInjector.register(WEAPON_TOKEN, new ClassProvider(Revolver));
        childInjector.register(NAME_TOKEN, new ValueProvider('John'));

        const warrior3 = childInjector.resolve(Warrior)!;

        expect(warrior3.name).toBe('John');
        expect(warrior3.weapon instanceof Revolver).toBe(true);
        expect(warrior3.drink instanceof Water).toBe(true);

        expect(warrior3.fight(true)).toBe('John fights: Revolver shot...');
        expect(warrior3.fight()).toBe('John fights: Fist punch...');
        expect(warrior3.rest()).toBe('John rests: Gulp, gulp, gulp...');
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
            constructor (public client: MessageClient) {}
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
