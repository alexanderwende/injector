[Home](./index) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [provide](./injector.injector.provide.md)

# Injector.provide method

Provide a provider for a dependency to the injector

**Signature:**
```javascript
provide<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
```
**Returns:** `void`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `constructorOrToken` | `Constructor<T> | InjectToken<T>` | A class constructor or [InjectToken](./injector.injecttoken.md) to provide |
|  `provider` | `Provider<T>` | A [Provider](./injector.provider.md) which will be used to resolve the class or token |

