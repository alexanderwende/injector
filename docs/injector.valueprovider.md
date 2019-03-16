[Home](./index) &gt; [injector](./injector.md) &gt; [ValueProvider](./injector.valueprovider.md)

# ValueProvider class

A provider for static values

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(value)`](./injector.valueprovider.constructor.md) |  |  | Constructs a new instance of the [ValueProvider](./injector.valueprovider.md) class |

## Remarks

The `ValueProvider` provides an already existing value and therefore has no dependencies. This is useful for providing primitive values, configuration objects or any value that does not need to be instantiated.
```javascript
const CONFIG = {
     receiveMessages: true,
     answerMessages: false,
     channelId: 'some_id'
}

const token = new InjectToken('CONFIG');

const injector = new injector();

injector.register(token, new ValueProvider(CONFIG));

injector.resolve(token)!; // --> { receiveMessages: true, answerMessages: false, channelId: 'some_id' }

```
