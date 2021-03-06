<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [register](./injector.injector.register.md)

## Injector.register() method

Register a provider for a dependency with the injector

<b>Signature:</b>

```typescript
register<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  constructorOrToken | <code>Constructor&lt;T&gt; &#124; InjectToken&lt;T&gt;</code> | The class or [InjectToken](./injector.injecttoken.md) for which to register the provider |
|  provider | <code>Provider&lt;T&gt;</code> | The [Provider](./injector.provider.md) which will be used to resolve the class or token |

<b>Returns:</b>

`void`

