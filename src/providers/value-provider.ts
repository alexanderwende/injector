import { createValueFactory } from '../factories';
import { BaseProvider } from './base-provider';

export class ValueProvider<T> extends BaseProvider<T> {

    constructor (value: any) {

        super(createValueFactory(value));
    }
}
