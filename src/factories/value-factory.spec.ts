import { createValueFactory } from './value-factory';

describe('createValueFactory', () => {

    it('creates a factory for a value', () => {

        const value   = 12;
        const factory = createValueFactory(value);

        expect(factory()).toBe(value);
        expect(factory()).toBe(value);
    });
});
