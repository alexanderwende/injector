# Injector

A lightweight dependency injection container.

- Minified Size:  3.9 KB
- Gzipped Size:  1.46 KB
- Brotli size: 1.29 KB

## Usage

```ts
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

    // properties can be injected as well - this is useful if your class
    // doesn't have a constructor
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



// create an injector
const injector = new Injector();

// register custom InjectTokens with a provider
injector.provide(WEAPON_TOKEN, new ClassProvider(Sword));
injector.provide(NAME_TOKEN, new ValueProvider('Clay'));

// create an instance by resolving from the injector
const warrior = injector.resolve<Warrior>(Warrior)!;

expect(warrior.name).toBe('Clay');
expect(warrior.weapon instanceof Sword).toBe(true);
expect(warrior.drink instanceof Water).toBe(true);



// you can create child injectors to handle dependencies in different scopes
const childInjector = new Injector(injector);

// register different providers for the child injector
// all other providers will be resolved from the parent injector
childInjector.provide(NAME_TOKEN, new ValueProvider('John'));

// create an instance by resolving from the child injector
const warrior2 = childInjector.resolve<Warrior>(Warrior)!;

expect(warrior.name).toBe('John');
expect(warrior.weapon instanceof Sword).toBe(true);
expect(warrior.drink instanceof Water).toBe(true);
```
