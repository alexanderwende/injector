# Injector

A lightweight reflective dependency injection container.

[![Build Status](https://travis-ci.org/alexanderwende/injector.svg?branch=master)](https://travis-ci.org/alexanderwende/injector)
[![Coverage Status](https://coveralls.io/repos/github/alexanderwende/injector/badge.svg?branch=master)](https://coveralls.io/github/alexanderwende/injector?branch=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

- Minified Size:  3.88 KB
- Gzipped Size:  1.44 KB
- Brotli size: 1.27 KB

## Features

- use decorators for annotating dependencies
- automatic, type-based dependency resolution for constructor parameters
- class property injection
- optional dependencies
- hierarchical child injectors
- providers for classes, singletons and values
- create your own custom providers
- token based dependencies to allow non-class dependencies

## Guide

### Installation

Injector is not yet published as npm module. However, you can directly install it from its git repository:

```shell
npm install --save github:alexanderwende/injector.git#semver:^1.0.5
```

Injector relies on the [Metadata Reflection API](https://rbuckton.github.io/reflect-metadata/), as used by TypeScript's decorators or Angular's DI. This API has not landed in browsers yet, so injector relies on a polyfill for that. There are several polyfills available, such as:

- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
- [core-js/es7/reflect](https://www.npmjs.com/package/core-js)
- [reflection](https://github.com/abraham/reflection)

Reflection is the most lightweight implementation (~3K) yet and therefore the peer-dependency of choice for injector. If you're targeting modern browsers, this is all you should need. To install `reflection` run

```shell
npm install --save @abraham/reflection
```

To use injector make sure to enable experimental decorators and decorator metadata in your `tsconfig.json`:

```json
{
    "compilerOptions": {
        ...
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

### Quickstart

Use the `@injectable` decorator to mark classes as injectable. Create an injector instance and obtain instances of injectable classes by using the `Injector`'s `resolve` method. The `resolve` method infers instance types from the classes you are resolving.

```typescript
import { Injector, injectable } from 'injector';

// decorate the dependency as injectable
@injectable()
class FooService {

    getFoo () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class FooClient {

    // `Injector` will resolve constructor parameter dependencies automatically
    constructor (public service: FooService) {}
}


// create an `Injector` instance
const injector = new Injector();

// create instances by letting the `Injector` resolve them
const fooClient = injector.resolve(FooClient)!;

fooClient.service.getFoo(); // --> 'foo'
```

### @injectable

The `@injectable` decorator marks a class as injectable by creating an `InjectToken` for the constructor and storing it as metadata on the class. The `Injector` will later use the stored `InjectToken` to find the appropriate provider for the token and resolve its dependencies. Constructor parameter dependencies are automatically resolved by type, as long as the depended on classes have been marked as injectable as well. `Injector` relies on TypeScript emitting decorator metadata for that.

### @inject

The `@inject` decorator has two use cases:

**Injecting dependencies into class properties**. This can be useful if you have constructor-less classes or you simply prefer not providing dependencies through constructor parameters.

```typescript
import { Injector, injectable, inject } from 'injector';

// decorate the dependency as injectable
@injectable()
class FooService {

    getFoo () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class FooClient {

    // decorate the property you want to inject
    @inject()
    public service!: FooService;
}


// create an `Injector` instance
const injector = new Injector();

// create instances by letting the `Injector` resolve them
const fooClient = injector.resolve(FooClient)!;

fooClient.service.getFoo(); // --> 'foo'
```

**Injecting non-class dependencies through `InjectToken`s**. Primitive values - and values in general - can not be injected reflectively as they can't be solely identified by a type. Interfaces disappear at runtime and connot be injected reflectively either. For those cases we need an `InjectToken` to tie the value or interface to a token that can be identified by the injector. You can read more about [`InjectToken`](#injecttoken)s below.

```typescript
import { Injector, InjectToken, injectable, inject, ClassProvider } from 'injector';

// an interface describing the FooService
interface FooService {
    getFoo (): string;
}

// an `InjectToken` representing the interface
// use a generic type to let TypeScript know about the token's type
const FOO_SERVICE = new InjectToken<FooService>('FooService');

// a class implementing the FooService interface - decorated as injectable
@injectable()
class FooServiceImplementation implements FooService {

    getFoo () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class FooClient {

    // inject the implementation by using the `@inject` decorator and the `InjectToken`
    constructor (@inject(FOO_SERVICE) public service: FooService) {}
}


// create an `Injector` instance
const injector = new Injector();

// tell the injector how to provide the FOO_SERVICE token
// we are using a `ClassProvider` here, but we could use other providers as well
injector.provide(FOO_SERVICE, new ClassProvider(FooServiceImplementation));

// create instances by letting the `Injector` resolve them
const fooClient = injector.resolve(FooClient)!;

fooClient.service.getFoo(); // --> 'foo'
```

### @optional

By default, `Injector` will throw an error, if a dependency cannot be resolved. 

### Injector

### InjectToken

### Provider

### Factory

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
