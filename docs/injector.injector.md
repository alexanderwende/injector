[Home](./index) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md)

# Injector class

The injector class

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(parent)`](./injector.injector.constructor.md) |  |  | Creates an injector instance. |
|  [`register(constructorOrToken, provider)`](./injector.injector.register.md) |  | `void` | Register a provider for a dependency with the injector |
|  [`resolve(target, optional)`](./injector.injector.resolve.md) |  | `T | undefined` | Resolve a dependency |

## Remarks

The `Injector` class is a reflective, hierarchical dependency injection container. Reflective means that it relies on metadata reflection to resolve dependencies. Hierarchical means that it can have child-containers. Child-containers can register different providers for tokens, but can also look up tokens from their respective parent-containers.
