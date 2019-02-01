[Home](./index) &gt; [injector](./injector.md) &gt; [Injector](./injector.injector.md) &gt; [constructor](./injector.injector.constructor.md)

# Injector.constructor method

Creates an injector instance.

**Signature:**
```javascript
constructor(parent?: Injector);
```

## Remarks

A child injector can be created by passing the parent injector as a constructor argument.
```javascript
const rootInjector = new Injector();
const childInjector = new Injector(rootInjector);

```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `parent` | `Injector` | A parent injector |

