# Injector

A lightweight dependency injection container.

## Usage

```
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

const warrior = injector.resolve<Warrior>(Warrior)!;
```