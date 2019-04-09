[Home](./index) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md)

# BaseProvider class

The `BaseProvider` class

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`factory`](./injector.baseprovider.factory.md) |  | `Factory<T>` |  |
|  [`injector`](./injector.baseprovider.injector.md) |  | `Injector | undefined` |  |
|  [`parameters`](./injector.baseprovider.parameters.md) |  | `Map<number, DependencyAnnotation | any>` |  |
|  [`properties`](./injector.baseprovider.properties.md) |  | `Map<PropertyKey, DependencyAnnotation | any>` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(factory, parameters, properties)`](./injector.baseprovider.constructor.md) |  |  | The `BaseProvider` constructor |
|  [`createValue(parameters, properties)`](./injector.baseprovider.createvalue.md) | `protected` | `T` | Creates the provider's provided value by invoking the factory |
|  [`provide(injector)`](./injector.baseprovider.provide.md) |  | `T` | Get the provider's provided value |
|  [`resolveParameters(injector)`](./injector.baseprovider.resolveparameters.md) | `protected` | `any[]` | Resolves the parameter dependencies for the factory |
|  [`resolveProperties(injector)`](./injector.baseprovider.resolveproperties.md) | `protected` | `any` | Resolves the property dependencies for the factory |

## Remarks

`BaseProvider` uses a factory function to provide a value. The provider's parameter dependencies will be used to invoke the factory function. The provider's property dependencies will be set on the factory function's return value. Each of the dependencies will be resolved using an `Injector` instance which must be passed to the provider's provide method.
```javascript
@injectable()
class Foo {}

@injectable()
class Bar {}

const factory = (foo: Foo, bar: Bar) => ({ foo: foo, bar: bar });

const provider = new BaseProvider(factory, [
     new DependencyAnnotation(Foo),
     new DependencyAnnotation(Bar)
]);

const injector = new Injector();

provider.provide(injector);

// or more naturally...

interface FooBar {
     foo: Foo;
     bar: Bar;
}

const token = new InjectToken<FooBar>('FooBar');

injector.register(token, provider);

injector.resolve(token)!;

```
