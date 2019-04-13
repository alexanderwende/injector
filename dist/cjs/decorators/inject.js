"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("../annotations");
const inject_token_1 = require("../inject-token");
/**
 * Decorates a class property or constructor parameter as injection target
 *
 * @remarks
 * The inject decorator has two use cases:
 * - Injecting dependencies into class properties
 * - Injecting non-class dependencies through {@link InjectToken}s
 *
 * When used to inject class properties, it can be used without specifying an {@link InjectToken}.
 * The property type will be used as token and the injector will create a {@link ClassProvider} for
 * the type automatically.
 *
 * ```typescript
 * // decorate the dependency as injectable
 * @injectable()
 * class MessageService {
 *     getMessage () { return 'foo'; }
 * }
 *
 * // decorate the consumer as injectable
 * @injectable()
 * class MessageClient {
 *     // decorate the property you want to inject
 *     @inject()
 *     public service!: MessageService;
 * }
 * ```
 *
 * When used to inject non-class properties, an {@link InjectToken} needs to be provided.
 * An {@link InjectToken} can be used for property and parameter injection alike.
 *
 * ```typescript
 * // an interface describing the MessageService
 * interface MessageService {
 *     getMessage (): string;
 * }
 *
 * // an `InjectToken` representing the interface
 * // use a generic type to tie the token to the interface type
 * const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');
 *
 * // a class implementing the MessageService interface - decorated as injectable
 * @injectable()
 * class FooMessageService implements MessageService {
 *     getMessage () { return 'foo'; }
 * }
 *
 * // decorate the consumer as injectable
 * @injectable()
 * class MessageClient {
 *     // inject the implementation by using the `InjectToken`
 *     constructor (@inject(MESSAGE_SERVICE) public service: MessageService) {}
 * }
 *
 * // create an `Injector` instance
 * const injector = new Injector();
 *
 * // tell the injector how to resolve the MESSAGE_SERVICE token
 * // we are using a `ClassProvider` here, but we could use other providers as well
 * injector.register(MESSAGE_SERVICE, new ClassProvider(FooMessageService));
 * ```
 *
 * @param injectToken - An {@link InjectToken} identifying the dependency to inject
 */
exports.inject = (injectToken) => {
    return (target, propertyKey, parameterIndex) => {
        const isParameterDecorator = typeof parameterIndex === 'number';
        const token = injectToken instanceof inject_token_1.InjectToken
            ? injectToken
            : isParameterDecorator
                ? annotations_1.getParameterAnnotation(target, parameterIndex).token
                : annotations_1.getPropertyAnnotation(target.constructor, propertyKey).token;
        // TODO: This sets the token twice - once during the get (caused by ensure) and then by the set
        if (isParameterDecorator) {
            annotations_1.setParameterAnnotation(target, parameterIndex, { token });
        }
        else {
            annotations_1.setPropertyAnnotation(target.constructor, propertyKey, { token });
        }
    };
};
//# sourceMappingURL=inject.js.map