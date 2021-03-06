<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [createValue](./injector.baseprovider.createvalue.md)

## BaseProvider.createValue() method

Creates the provider's provided value by invoking the factory

<b>Signature:</b>

```typescript
protected createValue(parameters?: any[], properties?: any): T;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  parameters | <code>any[]</code> | The parameter dependencies of the factory |
|  properties | <code>any</code> | The property dependencies of the instance returned from the factory |

<b>Returns:</b>

`T`

The value created by the provider's factory

