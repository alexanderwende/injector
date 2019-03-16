import { createValueFactory } from '../factories';
import { BaseProvider } from './base-provider';

/**
 * A provider for static values
 *
 * @remarks
 * The `ValueProvider` provides an already existing value and therefore has no dependencies.
 * This is useful for providing primitive values, configuration objects or any value that
 * does not need to be instantiated.
 *
 * ```typescript
 * const CONFIG = {
 *      receiveMessages: true,
 *      answerMessages: false,
 *      channelId: 'some_id'
 * }
 *
 * const token = new InjectToken('CONFIG');
 *
 * const injector = new injector();
 *
 * injector.provide(token, new ValueProvider(CONFIG));
 *
 * injector.resolve(token)!; // --> { receiveMessages: true, answerMessages: false, channelId: 'some_id' }
 * ```
 */
export class ValueProvider<T> extends BaseProvider<T> {

    constructor (value: T) {

        super(createValueFactory(value));
    }
}
