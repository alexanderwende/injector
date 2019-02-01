[Home](./index) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [resolve](./injector.injector.resolve.md)

# Injector.resolve method

Resolve a dependency

**Signature:**
```javascript
resolve<T>(target: Constructor<T> | InjectToken<T>, optional?: boolean): T | undefined;
```
**Returns:** `T | undefined`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `target` | `Constructor<T> | InjectToken<T>` | A class constructor or [InjectToken](./injector.injecttoken.md) to resolve |
|  `optional` | `boolean` | Should the dependency be optional. If `true` the injector will not throw an error if it cannot resolve the dependency and returns `undefined`<!-- -->. If `false` the injector will throw an error if the dependency cannot be resolved. |

