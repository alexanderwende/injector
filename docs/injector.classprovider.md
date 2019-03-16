[Home](./index) &gt; [injector](./injector.md) &gt; [ClassProvider](./injector.classprovider.md)

# ClassProvider class

A provider for class instances

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(constructorFn, parameters, properties)`](./injector.classprovider.constructor.md) |  |  | Constructs a new instance of the [ClassProvider](./injector.classprovider.md) class |

## Remarks

The `ClassProvider` provides instances of classes. It can be created by passing a reference to a class to its constructor. `ClassProvider` automatically analyzes parameter and property dependencies of the class and resolves them when creating instances.
```javascript
@injectable()
class Foo { }

@injectable()
class Bar { }

@injectable()
class FooBar {

    @optional()
    @inject()
    bar!: Bar;

    constructor (public foo: Foo) { }
}

const provider = new ClassProvider(FooBar);
const injector = new Injector();

injector.register(FooBar, provider);

const fooBar = injector.resolve(FooBar)!;

```
