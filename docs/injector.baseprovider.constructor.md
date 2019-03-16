[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [constructor](./injector.baseprovider.constructor.md)

# BaseProvider.constructor method

The `BaseProvider` constructor

**Signature:**
```javascript
constructor(factory: Factory<T>, parameters?: ParameterAnnotations, properties?: PropertyAnnotations);
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `factory` | `Factory<T>` | The provider's factory function |
|  `parameters` | `ParameterAnnotations` | The parameter dependencies of the factory function |
|  `properties` | `PropertyAnnotations` | The property dependencies of the value returned from the factory function |

