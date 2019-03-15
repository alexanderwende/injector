[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [createValue](./injector.baseprovider.createvalue.md)

# BaseProvider.createValue method

Creates the provider's provided value by invoking the factory

**Signature:**
```javascript
protected createValue(dependencies?: any[], properties?: any): T;
```
**Returns:** `T`

The value created by the provider's factory

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `dependencies` | `any[]` | The parameter dependencies of the factory |
|  `properties` | `any` | The property dependencies of the instance returned from the factory |

