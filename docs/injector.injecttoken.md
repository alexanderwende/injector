[Home](./index) &gt; [injector](./injector.md) &gt; [InjectToken](./injector.injecttoken.md)

# InjectToken class

A token that represents a dependency

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`description`](./injector.injecttoken.description.md) |  | `string` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(description)`](./injector.injecttoken.constructor.md) |  |  | Constructs a new instance of the [InjectToken](./injector.injecttoken.md) class |

## Remarks

An [InjectToken](./injector.injecttoken.md) should be used to inject any type, which does not have a runtime representation, e.g. an interface, callable type or a plain value. An [InjectToken](./injector.injecttoken.md) is tied to a [Provider](./injector.provider.md) using the [Injector.provide](./injector.injector.provide.md) method.
```javascript
interface MessageService {
     getMessage (): string;
}

interface MessageClientConfig {
     checkMessages: boolean;
     answerMessages: boolean;
}

class FooMessageService implements MessageService {
     getMessage () { return 'foo'; }
}

// use a generic type to tie the token to the interface type
const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');
const CONFIG = new InjectToken<MessageClientConfig>('MessageClientConfig');

const injector = new Injector();

injector.provide(MESSAGE_SERVICE, new ClassProvider(FooMessageService));
injector.provide(CONFIG, new ValueProvider({ checkMessages: true, answerMessages: false }));

injector.resolve(MESSAGE_SERVICE).getMessage(); // --> 'foo'
injector.resolve(CONFIG); // --> { checkMessages: true, answerMessages: false }

```
