<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [injector](./injector.md) &gt; [BaseProvider](./injector.baseprovider.md)

## BaseProvider class

The `BaseProvider` class

<b>Signature:</b>

```typescript
export declare class BaseProvider<T> implements Provider<T> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(factory, parameters, properties)](./injector.baseprovider._constructor_.md) |  | The <code>BaseProvider</code> constructor |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [factory](./injector.baseprovider.factory.md) |  | <code>Factory&lt;T&gt;</code> |  |
|  [injector](./injector.baseprovider.injector.md) |  | <code>Injector &#124; undefined</code> |  |
|  [parameters](./injector.baseprovider.parameters.md) |  | <code>Map&lt;number, DependencyAnnotation &#124; any&gt;</code> |  |
|  [properties](./injector.baseprovider.properties.md) |  | <code>Map&lt;PropertyKey, DependencyAnnotation &#124; any&gt;</code> |  |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [createValue(parameters, properties)](./injector.baseprovider.createvalue.md) |  | Creates the provider's provided value by invoking the factory |
|  [provide(injector)](./injector.baseprovider.provide.md) |  | Get the provider's provided value |
|  [resolveParameters(injector)](./injector.baseprovider.resolveparameters.md) |  | Resolves the parameter dependencies for the factory |
|  [resolveProperties(injector)](./injector.baseprovider.resolveproperties.md) |  | Resolves the property dependencies for the factory |

## Remarks

`BaseProvider` uses a factory function to provide a value. The provider's parameter dependencies will be used to invoke the factory function. The provider's property dependencies will be set on the factory function's return value. Each of the dependencies will be resolved using an `Injector` instance which must be passed to the provider's  method.

```typescript
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

