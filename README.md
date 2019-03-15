# Injector

A lightweight reflective dependency injection container.

[![Build Status](https://travis-ci.org/alexanderwende/injector.svg?branch=master)](https://travis-ci.org/alexanderwende/injector)
[![Coverage Status](https://coveralls.io/repos/github/alexanderwende/injector/badge.svg?branch=master)](https://coveralls.io/github/alexanderwende/injector?branch=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

- Minified Size:  3.53 KB
- Gzipped Size:  1.29 KB
- Brotli size: 1.16 KB

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

If you are already using `reflect-metadata` or `core-js/es7/reflect` you don't have to install anything else. Just make sure to load the polyfill before loading injector.

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
class MessageService {

    getMessage () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class MessageClient {

    // `Injector` will resolve constructor parameter dependencies automatically
    constructor (public service: MessageService) {}
}


// create an `Injector` instance
const injector = new Injector();

// create instances by letting the `Injector` resolve them
const client = injector.resolve(MessageClient)!;

client.service.getMessage(); // --> 'foo'
```

### @injectable

The `@injectable` decorator marks a class as injectable by creating an `InjectToken` for the constructor and storing it as metadata on the class. The `Injector` will later use the stored `InjectToken` to find the appropriate provider for the token and resolve its dependencies. Constructor parameter dependencies are automatically resolved by type, as long as the depended-on classes have been marked as injectable as well. `Injector` relies on TypeScript emitting decorator metadata for that.

### @inject

The `@inject` decorator has two use cases:

**Injecting dependencies into class properties**. This can be useful if you have constructor-less classes or you simply prefer not providing dependencies through constructor parameters.

```typescript
import { Injector, injectable, inject } from 'injector';

// decorate the dependency as injectable
@injectable()
class MessageService {

    getMessage () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class MessageClient {

    // decorate the property you want to inject
    @inject()
    public service!: MessageService;
}


// create an `Injector` instance
const injector = new Injector();

// create instances by letting the `Injector` resolve them
const client = injector.resolve(MessageClient)!;

client.service.getMessage(); // --> 'foo'
```

**Injecting non-class dependencies through `InjectToken`s**. Primitive values - and values in general - can not be injected reflectively as they can't be solely identified by a type. Interfaces disappear at runtime and connot be injected reflectively either. For those cases we need an `InjectToken` to tie the value or interface to a token that can be identified by the injector. You can read more about [`InjectToken`](#injecttoken)s below.

```typescript
import { Injector, InjectToken, injectable, inject, ClassProvider } from 'injector';

// an interface describing the MessageService
interface MessageService {
    getMessage (): string;
}

// an `InjectToken` representing the interface
// use a generic type to tie the token to the interface type
const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');

// a class implementing the MessageService interface - decorated as injectable
@injectable()
class FooMessageService implements MessageService {

    getMessage () {
        return 'foo';
    }
}

// decorate the consumer as injectable
@injectable()
class MessageClient {

    // inject the implementation by using the `@inject` decorator and the `InjectToken`
    constructor (@inject(MESSAGE_SERVICE) public service: MessageService) {}
}


// create an `Injector` instance
const injector = new Injector();

// tell the injector how to provide the MESSAGE_SERVICE token
// we are using a `ClassProvider` here, but we could use other providers as well
injector.provide(MESSAGE_SERVICE, new ClassProvider(FooMessageService));

// create instances by letting the `Injector` resolve them
const client = injector.resolve(MessageClient)!;

client.service.getMessage(); // --> 'foo'
```

### @optional

By default, `Injector` will throw an error if a dependency cannot be resolved. In some cases, however, you might want a dependency to be optional. To tell the injector that a dependency is optional use the `@optional` decorator. If the injector cannot find a provider for an optional dependency it will resolve it with `undefined`.

```typescript
import { Injector, InjectToken, injectable, inject, optional } from 'injector';

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

// an InjectToken for an interface which we won't provide
const CONFIG = new InjectToken<MessageClientConfig>('MessageClientConfig');

@injectable()
class MessageClient {
    constructor (
        // BarMessageService is not injectable, by marking it as optional it won't throw an error
        @optional() public service?: BarMesageService,
        // CONFIG has no provider, by marking it as optional won't throw an error
        @optional() @inject(CONFIG) public config?: MessageClientConfig
    ) { }
}


const injector = new Injector();

const client = injector.resolve(MessageClient)!;

// client.service --> undefined
// client.config --> undefined
```

### Injector

### InjectToken

### Provider

### Factory
