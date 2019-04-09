[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [resolveParameters](./injector.baseprovider.resolveparameters.md)

# BaseProvider.resolveParameters method

Resolves the parameter dependencies for the factory

**Signature:**
```javascript
protected resolveParameters(injector: Injector): any[];
```
**Returns:** `any[]`

An array of resolved parameter dependencies

## Remarks

If a parameter dependency is a [DependencyAnnotation](./injector.dependencyannotation.md) it will be resolved from the current injector. Otherwise its value will be used to resolve the dependency.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `injector` | `Injector` | The current injector that runs the provider |

