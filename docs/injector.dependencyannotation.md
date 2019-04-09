[Home](./index) &gt; [injector](./injector.md) &gt; [DependencyAnnotation](./injector.dependencyannotation.md)

# DependencyAnnotation class

A dependency annotation describes a dependency that should be resolved by an injector

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`optional`](./injector.dependencyannotation.optional.md) |  | `boolean` |  |
|  [`token`](./injector.dependencyannotation.token.md) |  | `InjectToken<T> | Constructor<T>` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(token, optional)`](./injector.dependencyannotation.constructor.md) |  |  | Constructs a new instance of the [DependencyAnnotation](./injector.dependencyannotation.md) class |

## Remarks

Most classes have dependencies, either in the form of constructor parameters or in the form of properties which can be injected. When a provider is created for a class it needs to know about the class's dependencies. The provider can obtain a map of the class's dependencies by respectively calling getParameterAnnotations or getPropertyAnnotations if the class was decorated as injectable<!-- -->. A DependencyAnnotation does not contain a value itself, but rather a token which allows the provider to resolve the class's dependency via the injector. This allows a great deal of flexibility, especially when combined with child injectors.

DependencyAnnotations are not only useful for class dependencies though. They can be equally useful when creating simple factory providers, where the factories dependencies should be resolved through an [InjectToken](./injector.injecttoken.md) at runtime.
