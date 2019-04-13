"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A token that represents a dependency
 *
 * @remarks
 * An {@link InjectToken} should be used to inject any type, which does not have a runtime
 * representation, e.g. an interface, callable type or a plain value. An {@link InjectToken}
 * is tied to a {@link Provider} using the {@link Injector.register} method.
 *
 * ```typescript
 * interface MessageService {
 *      getMessage (): string;
 * }
 *
 * interface MessageClientConfig {
 *      checkMessages: boolean;
 *      answerMessages: boolean;
 * }
 *
 * class FooMessageService implements MessageService {
 *      getMessage () { return 'foo'; }
 * }
 *
 * // use a generic type to tie the token to the interface type
 * const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');
 * const CONFIG = new InjectToken<MessageClientConfig>('MessageClientConfig');
 *
 * const injector = new Injector();
 *
 * injector.register(MESSAGE_SERVICE, new ClassProvider(FooMessageService));
 * injector.register(CONFIG, new ValueProvider({ checkMessages: true, answerMessages: false }));
 *
 * injector.resolve(MESSAGE_SERVICE).getMessage(); // --> 'foo'
 * injector.resolve(CONFIG); // --> { checkMessages: true, answerMessages: false }
 * ```
 */
class InjectToken {
    constructor(description) {
        this.description = description;
    }
}
exports.InjectToken = InjectToken;
//# sourceMappingURL=inject-token.js.map