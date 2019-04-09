[Home](./index) &gt; [injector](./injector.md) &gt; [InjectorConfiguration](./injector.injectorconfiguration.md) &gt; [defaultProvider](./injector.injectorconfiguration.defaultprovider.md)

# InjectorConfiguration.defaultProvider property

The default provider used by the injector

**Signature:**
```javascript
defaultProvider: {
        new <T = any>(constructor: Constructor<T>): Provider<T>;
    }
```

## Remarks

Injector will use the default provider as provider for injectable classes, which have no provider registered explicitly. A default provider needs to accept a reference to the class it is created for as only constructor argument. [ClassProvider](./injector.classprovider.md) and [SingletonProvider](./injector.singletonprovider.md) can be used as default providers. Alternatively a custom provider with the same interface can be created and configured.

The default value for this option is [ClassProvider](./injector.classprovider.md)<!-- -->.