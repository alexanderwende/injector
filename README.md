# Injector

A lightweight reflective dependency injection container.

[![Build Status](https://travis-ci.org/alexanderwende/injector.svg?branch=master)](https://travis-ci.org/alexanderwende/injector)
[![Coverage Status](https://coveralls.io/repos/github/alexanderwende/injector/badge.svg?branch=master)](https://coveralls.io/github/alexanderwende/injector?branch=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

- Minified Size:  4.03 KB
- Gzipped Size:  1.48 KB
- Brotli size: 1.33 KB

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

Use the `@injectable` decorator to mark classes as injectable. Create an injector instance and obtain instances of injectable classes by using `Injector`'s `resolve` method. The `resolve` method infers instance types from the classes you are resolving.

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


// create an injector instance
const injector = new Injector();

// create instances by letting the injector resolve them
const client = injector.resolve(MessageClient)!;

client.service.getMessage(); // --> 'foo'
```

### @injectable

The `@injectable` decorator marks a class as injectable by creating an `InjectToken` for the constructor and storing it as metadata on the class. `Injector` will later use the stored `InjectToken` to find the appropriate provider for the token and resolve its dependencies. Constructor parameter dependencies are automatically resolved by type, as long as the depended-on classes have been marked as injectable as well. `Injector` relies on TypeScript emitting decorator metadata for that.

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


// create an injector instance
const injector = new Injector();

// create instances by letting the injector resolve them
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


// create an injector instance
const injector = new Injector();

// tell the injector how to resolve the MESSAGE_SERVICE token
// we are using a `ClassProvider` here, but we could use other providers as well
injector.register(MESSAGE_SERVICE, new ClassProvider(FooMessageService));

// create instances by letting the injector resolve them
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

// an InjectToken for an interface which we won't register
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

### Concepts

`Injector` is a reflective, hierarchical dependency injection container. Reflective means that it relies on reflection to identify and resolve dependencies. Hierarchical means that multiple `Injector` instances can co-exist in a hierarchical relation at different levels of an application.

#### Reflection

In order for a dependency injection container to resolve a class - or any dependency - the container needs knowledge about the dependencies of that class. The dependencies themselves can be classes and have their own dependencies. A dependency injection container needs to know the entire dependency graph of a given dependency in order to resolve it.

One way to solve this problem is to explicitly provide the dependency graph to the container through configuration. There are some drawbacks with that approach though:

- It creates boilerplate
- It's not DRY - it duplicates information that already exists (a class's constructor already defines its parameters explicitly)
- It's hard to maintain (if you change a constructor's signature you have to remember to update the dependency graph as well)

Another way to solve this problem is to generate the dependency graph at runtime with the help of reflection. Reflection is the ability of a program to examine, introspect and modify its own structure and behavior. In the context of dependency injection it means that the container is able to gain knowledge about how to resolve a dependency by examining the dependency itself. The key benefits of using reflection are:

- Less boilerplate - no unnecessary configuration
- Your code remains DRY (dependencies can be directly inferred from a class's constructor)
- It's easier to maintain (changing a constructor's signature will generate a new dependency graph at runtime)

`Injector` makes use of reflection in multiple ways. Let's illustrate this with an example:

```typescript
@injectable()
class Service {}

@injectable()
class Configuration {}

@injectable()
class Client {
    constructor (
        private service: Service, 
        private config: Configuration) { ... }
}

const injector = new Injector();
const client = injector.resolve(Client)!;
```

`Injector` is capable of resolving an instance of `Client` by using reflection to examine the types of `Client`'s constructor parameters - or dependencies so to speak. It does that with the help of TypeScript's `emitDecoratorMetadata` compiler option. If set to `true` TypeScript will store references to the constructor parameters' respective classes in `Client`'s metadata. `Injector` will read this metadata and create the necessary dependencies in order to create a `Client` instance.

`Injector` also uses reflection to modify aspects of a class's dependencies with the help of decorators. Let's see another example:

```typescript
interface Configuration { ... }

@injectable()
class Client {
    constructor (@optional() private config?: Configuration) { ... }
}

const injector = new Injector();
const client = injector.resolve(Client)!;
```

In this example we don't have a class for `Client`'s dependency - only an interface. Interfaces don't exist at runtime, hence, they cannot be instantiated. `Injector` would not be able to resolve `Client`'s dependency and throw an error. However, by using the `@optional()` decorator, we can modify `Client`'s dependency and let `Injector` know, that this dependency is not required and can be resolved with `undefined` if it cannot be resolved otherwise. The `@optional()` decorator stores this information in `Client`'s metadata as well, for `Injector` to read. The key advantage here is that the decorator can be applied directly to the constructor parameter. All the information about `Client`'s dependency is in one place: The constructor.

#### Hierarchy

`Injector` employs a hierarchical design in order to allow for a couple of interesting use cases. Generally speaking, hierarchical design means that an instance of `Injector` can be related to another instance in a parent-child relationship. This is especially useful in modular application architectures. Let's look at an example:

```typescript
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
class FacebookMessageService implements MessageService {
    sendMessage (message: string, user: User) { ... }
}

@injectable()
class TwitterMessageService implements MessageService {
    sendMessage (message: string, user: User) { ... }
}

@injectable()
class MessageClient {
    constructor (
        @inject(MESSAGE_SERVICE) public service: MessageService, 
        @inject(USER) public user: User) { ... }
}
```

In the example above, we have a `MessageClient` that depends on a `MessageService` in order to send messages. Furthermore, we have two classes implementing the `MessageService` interface. We know intuitively that we can use the same `MessageClient` implementation to send messages via Facebook or Twitter by simply creating a `MessageClient` instance with the appropriate `MessageService` implementation passed into the client's constructor. 

In addition, the client depends on a `User` which is needed to send a message. The `User` is the same for either `MessageService` implementation. This is where the hierarchical design of `Injector` comes in. Imagine we want to build a Facebook message module and a Twitter message module that both share the same `User`. We can easily do this using child injectors:

```typescript
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
        // in the twitter module, we would provide the TwitterMessageService here
        this.injector.register(MESSAGE_SERVICE, new ClassProvider(FacebookMessageService));
        // we resolve the message client through the child injector
        this.client = this.injector.resolve(MessageClient)!;
    }
}

// this will be the parent injector
const rootInjector = new Injector();

// we can register the USER token with the parent injector
rootInjector.register(USER, new ValueProvider({ username: 'john' }));

// our facebook module is self-contained and can be resolved from the root injector
// an implementation like this provides strong decoupling
const facebookModule = rootInjector.resolve(FacebookMessageModule)!;
```

The example shows how we can effectively use parent- and child-injectors. The implementation of the `TwitterMessageModule` has been left out intentionally for brevity. The key point is that dependencies that remain the same throughout different application levels can be set up on a root injector. Child injectors don't need to register providers for dependencies which are already registered on a parent injector (like the provider for the `USER` token in the example). Instead, a child injector will walk up its parent injectors to resolve a dependency that it can't resolve itself. It will always chose to resolve a dependency from the closest parent injector which has a matching registered provider. This allows for deeply nested modular design.

On the other hand, a child injector can register providers for dependencies which don't exist on any of its parent injectors (just like the provider for the `MESSAGE_SERVICE` token in the example above). Or it can chose to override a parent injector's provider by registering a different one. This allows your application to stay decoupled, as your parent modules don't need to know about the dependencies of your child modules. Instead, your child modules can define their own dependencies with child injectors.
