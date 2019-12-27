<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [(constructor)](./injector.injector._constructor__1.md)

## Injector.(constructor)

Creates an injector instance

<b>Signature:</b>

```typescript
constructor(config?: Partial<InjectorConfiguration>);
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  config | <code>Partial&lt;InjectorConfiguration&gt;</code> |  |

## Remarks

An injector can be configured with a default provider.

 

```typescript
// configures the injector to use the SingletonProvider for injectable classes by default
const injector = new Injector({ defaultProvider: SingletonProvider });

```
