[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [resolveProperties](./injector.baseprovider.resolveproperties.md)

# BaseProvider.resolveProperties method

Resolves the property dependencies for the factory

**Signature:**
```javascript
protected resolveProperties(injector: Injector): any;
```
**Returns:** `any`

An object of resolved property dependencies

## Remarks

If a property dependency is a [DependencyAnnotation](./injector.dependencyannotation.md) it will be resolved from the current injector. Otherwise its value will be used to resolve the dependency.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `injector` | `Injector` | The current injector that runs the provider |

