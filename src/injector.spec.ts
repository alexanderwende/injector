import 'reflect-metadata';
import { inject, injectable, optional } from './decorators';
import { InjectToken } from './inject-token';
import { Injector, NO_PROVIDER } from './injector';
import { ClassProvider, ValueProvider } from './providers';

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

    constructor (@inject(WEAPON_TOKEN) public weapon: Weapon, public drink?: Water) {}

    fight (useWeapon: boolean = false) {

        return `${this.name} fights: ${useWeapon ? this.weapon.use() : 'Fist punch...'}`;
    }

    rest () {

        return `${this.name} rests: ${this.drink ? this.drink.drink() : ''}`;
    }
}

describe('Injector', () => {

    let injector: Injector;

    beforeEach(() => {

        injector = new Injector();
    });

    it('creates an injector', () => {

        expect(injector).toBeDefined();
        expect(injector instanceof Injector).toBe(true);
    });

    it('resolves dependencies correctly', () => {

        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

        const warrior = injector.resolve<Warrior>(Warrior)!;

        expect(warrior.name).toBe('Clay');
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('Clay fights: Sword strike...');
        expect(warrior.fight()).toBe('Clay fights: Fist punch...');
        expect(warrior.rest()).toBe('Clay rests: Gulp, gulp, gulp...');
    });

    it('can be configured with different dependencies', () => {

        injector.provide(WEAPON_TOKEN, new ClassProvider(Revolver));
        injector.provide(NAME_TOKEN, new ValueProvider('Cliff'));

        const warrior = injector.resolve<Warrior>(Warrior)!;

        expect(warrior.name).toBe('Cliff');
        expect(warrior.weapon instanceof Revolver).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('Cliff fights: Revolver shot...');
        expect(warrior.fight()).toBe('Cliff fights: Fist punch...');
        expect(warrior.rest()).toBe('Cliff rests: Gulp, gulp, gulp...');
    });

    it('throws exception on missing dependencies', () => {

        injector.provide(NAME_TOKEN, new ValueProvider('Cliff'));

        const resolve = () => {

            injector.resolve<Warrior>(Warrior);
        };

        expect(resolve).toThrowError(NO_PROVIDER(WEAPON_TOKEN).message);
    });

    it('passes undefined for optional missing dependency', () => {

        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));

        const warrior = injector.resolve<Warrior>(Warrior)!;

        expect(warrior.name).toBeUndefined();
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        expect(warrior.fight(true)).toBe('undefined fights: Sword strike...');
        expect(warrior.fight()).toBe('undefined fights: Fist punch...');
        expect(warrior.rest()).toBe('undefined rests: Gulp, gulp, gulp...');
    });

    it('can use parent injectors', () => {

        // we set up the root injector
        injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
        injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

        const warrior = injector.resolve<Warrior>(Warrior)!;

        expect(warrior.name).toBe('Clay');
        expect(warrior.weapon instanceof Sword).toBe(true);
        expect(warrior.drink instanceof Water).toBe(true);

        // we create a child injector
        const childInjector = new Injector(injector);

        const warrior2 = childInjector.resolve<Warrior>(Warrior)!;

        expect(warrior2.name).toBe('Clay');
        expect(warrior2.weapon instanceof Sword).toBe(true);
        expect(warrior2.drink instanceof Water).toBe(true);

        // we configure the child injector
        childInjector.provide(WEAPON_TOKEN, new ClassProvider(Revolver));
        childInjector.provide(NAME_TOKEN, new ValueProvider('John'));

        const warrior3 = childInjector.resolve<Warrior>(Warrior)!;

        expect(warrior3.name).toBe('John');
        expect(warrior3.weapon instanceof Revolver).toBe(true);
        expect(warrior3.drink instanceof Water).toBe(true);

        expect(warrior3.fight(true)).toBe('John fights: Revolver shot...');
        expect(warrior3.fight()).toBe('John fights: Fist punch...');
        expect(warrior3.rest()).toBe('John rests: Gulp, gulp, gulp...');
    });
});