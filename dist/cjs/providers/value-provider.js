"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factories_1 = require("../factories");
const base_provider_1 = require("./base-provider");
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
 * injector.register(token, new ValueProvider(CONFIG));
 *
 * injector.resolve(token)!; // --> { receiveMessages: true, answerMessages: false, channelId: 'some_id' }
 * ```
 */
class ValueProvider extends base_provider_1.BaseProvider {
    constructor(value) {
        super(factories_1.createValueFactory(value));
    }
}
exports.ValueProvider = ValueProvider;
//# sourceMappingURL=value-provider.js.map