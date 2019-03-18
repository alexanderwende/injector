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

- can provide itself - can create child injectors
