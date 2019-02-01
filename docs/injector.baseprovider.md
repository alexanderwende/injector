[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md)

# BaseProvider class

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`dependencies`](./injector.baseprovider.dependencies.md) |  | `ParameterAnnotation[]` |  |
|  [`factory`](./injector.baseprovider.factory.md) |  | `Factory<T>` |  |
|  [`injector`](./injector.baseprovider.injector.md) |  | `Injector | undefined` |  |
|  [`properties`](./injector.baseprovider.properties.md) |  | `{`<p/>`        [key: string]: PropertyAnnotation;`<p/>`    }` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(factory, dependencies, properties)`](./injector.baseprovider.constructor.md) |  |  | Constructs a new instance of the [BaseProvider](./injector.baseprovider.md) class |
|  [`createValue(dependencies, properties)`](./injector.baseprovider.createvalue.md) |  | `T` |  |
|  [`provide(injector)`](./injector.baseprovider.provide.md) |  | `T` |  |
|  [`resolveDependencies(injector)`](./injector.baseprovider.resolvedependencies.md) |  | `any[]` |  |
|  [`resolveProperties(injector)`](./injector.baseprovider.resolveproperties.md) |  | `{`<p/>`        [key: string]: any;`<p/>`    }` |  |

