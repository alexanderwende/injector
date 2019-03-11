import { inject, injectable, optional } from './decorators';
import { InjectToken } from './inject-token';
import { Injector, NO_PROVIDER } from './injector';
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

        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

        expect(injector.resolve(WEAPON_TOKEN)! instanceof Sword).toBe(true);
        expect(injector.resolve(WEAPON_TOKEN)!.use()).toBe('Sword strike...');

        expect(injector.resolve(NAME_TOKEN)!).toBe('Clay');
    });

    it('should resolve dependencies correctly', () => {

        const injector = new Injector();

        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

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

        injector.provide(WEAPON_TOKEN, new ClassProvider(Revolver));
        injector.provide(NAME_TOKEN, new ValueProvider('Cliff'));

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

        injector.provide(WEAPON_TOKEN, new SingletonProvider(Gun));
        injector.provide(NAME_TOKEN, new ValueProvider('Smith'));

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

    it('should throw exception on missing dependencies', () => {

        const injector = new Injector();

        injector.provide(NAME_TOKEN, new ValueProvider('Cliff'));

        const resolve = () => {

            injector.resolve(Warrior);
        };

        expect(resolve).toThrowError(NO_PROVIDER(WEAPON_TOKEN).message);
    });

    it('should pass undefined for optional missing dependency', () => {

        const injector = new Injector();

        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));

        const warrior = injector.resolve(Warrior)!;

        expect(warrior.name).toBeUndefined();
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('undefined fights: Sword strike...');
        expect(warrior.fight()).toBe('undefined fights: Fist punch...');
        expect(warrior.rest()).toBe('undefined rests: Gulp, gulp, gulp...');
    });

    it('can use parent injectors', () => {

        const injector = new Injector();

        // we set up the root injector
        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

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
        childInjector.provide(WEAPON_TOKEN, new ClassProvider(Revolver));
        childInjector.provide(NAME_TOKEN, new ValueProvider('John'));

        const warrior3 = childInjector.resolve(Warrior)!;

        expect(warrior3.name).toBe('John');
        expect(warrior3.weapon instanceof Revolver).toBe(true);
        expect(warrior3.drink instanceof Water).toBe(true);

        expect(warrior3.fight(true)).toBe('John fights: Revolver shot...');
        expect(warrior3.fight()).toBe('John fights: Fist punch...');
        expect(warrior3.rest()).toBe('John rests: Gulp, gulp, gulp...');
    });
});
