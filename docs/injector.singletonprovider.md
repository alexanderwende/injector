[Home](./index) &gt; [injector](./injector.md) &gt; [SingletonProvider](./injector.singletonprovider.md)

# SingletonProvider class

A provider for singleton class instances

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`_instance`](./injector.singletonprovider._instance.md) |  | `T | undefined` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`provide(injector)`](./injector.singletonprovider.provide.md) |  | `T` |  |

## Remarks

The `SingletonProvidr` caches the first instance of a class it creates and subsequently returns the cached instance instead of creating new instances.
