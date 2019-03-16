[Home](./index) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [register](./injector.injector.register.md)

# Injector.register method

Register a provider for a dependency with the injector

**Signature:**
```javascript
register<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
```
**Returns:** `void`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `constructorOrToken` | `Constructor<T> | InjectToken<T>` | The class or [InjectToken](./injector.injecttoken.md) for which to register a provider for |
|  `provider` | `Provider<T>` | The [Provider](./injector.provider.md) which will be used to resolve the class or token |

