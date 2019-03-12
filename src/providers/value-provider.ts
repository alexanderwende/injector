import { createValueFactory } from '../factories';
import { BaseProvider } from './base-provider';

export class ValueProvider<T> extends BaseProvider<T> {

    constructor (value: T) {

        super(createValueFactory(value));
    }
}
