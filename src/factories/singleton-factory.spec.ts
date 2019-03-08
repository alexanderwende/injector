import { createSingletonFactory } from './singleton-factory';

class Singleton {

    constructor (public name: string) {}
}

describe('createSingletonFactory', () => {

    it('creates a factory for a singleton', () => {

        const factory   = createSingletonFactory(Singleton);
        const singleton = factory('Alex');

        expect(singleton).toBeDefined();
        expect(singleton.name).toBe('Alex');
    });

    it('factory returns the same instance every time', () => {

        const factory   = createSingletonFactory(Singleton);
        const singleton = factory('Alex');

        expect(factory('Clark')).toBe(singleton);
        expect(singleton.name).toBe('Alex');
        expect(factory('Clyde')).toBe(singleton);
        expect(singleton.name).toBe('Alex');
    });
});
