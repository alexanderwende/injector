[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md)

# BaseProvider class

The `BaseProvider` class

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`dependencies`](./injector.baseprovider.dependencies.md) |  | `ParameterAnnotations` |  |
|  [`factory`](./injector.baseprovider.factory.md) |  | `Factory<T>` |  |
|  [`injector`](./injector.baseprovider.injector.md) |  | `Injector | undefined` |  |
|  [`properties`](./injector.baseprovider.properties.md) |  | `PropertyAnnotations` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(factory, dependencies, properties)`](./injector.baseprovider.constructor.md) |  |  | The `BaseProvider` constructor |
|  [`createValue(dependencies, properties)`](./injector.baseprovider.createvalue.md) | `protected` | `T` | Creates the provider's provided value by invoking the factory |
|  [`provide(injector)`](./injector.baseprovider.provide.md) |  | `T` | Get the provider's provided value |
|  [`resolveDependencies(injector)`](./injector.baseprovider.resolvedependencies.md) | `protected` | `any[]` | Resolves the parameter dependencies for the factory from the current injector |
|  [`resolveProperties(injector)`](./injector.baseprovider.resolveproperties.md) | `protected` | `any` | Resolves the property dependencies for the factory from the current injector |

## Remarks

`BaseProvider` uses a factory function to provide a value. The provider's parameter dependencies will be used to invoke the factory function. The provider's property dependencies will be set on the factory function's return value. Each of the dependencies will be resolved using an `Injector` instance which must be passed to the provider's provide method.

// TODO: test this
```javascript
@injectable()
class Foo {}

@injectable()
class Bar {}

interface FooBar {
     foo: Foo;
     bar: Bar;
}

const token = new InjectToken<FooBar>('FooBar');

const factory = (foo: Foo, bar: Bar) => ({ foo: foo, bar: bar });

const provider = new BaseProvider(factory, new Map([
     [0, { token: Foo, optional: false }],
     [1, { token: Bar, optional: false }],
]));

const injector = new Injector();

provider.provide(injector);

// or more naturally

injector.provide(token, provider);

injector.resolve(token);

```
