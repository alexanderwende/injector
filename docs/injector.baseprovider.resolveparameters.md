<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md) &gt; [resolveParameters](./injector.baseprovider.resolveparameters.md)

## BaseProvider.resolveParameters() method

Resolves the parameter dependencies for the factory

<b>Signature:</b>

```typescript
protected resolveParameters(injector: Injector): any[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  injector | <code>Injector</code> | The current injector that runs the provider |

<b>Returns:</b>

`any[]`

An array of resolved parameter dependencies

## Remarks

If a parameter dependency is a [DependencyAnnotation](./injector.dependencyannotation.md) it will be resolved from the current injector. Otherwise its value will be used to resolve the dependency.

