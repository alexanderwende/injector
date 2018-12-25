import { createClassFactory } from './class-factory';

class Class {

    constructor (public name: string) {}
}

describe('createClassFactory', () => {

    it('creates a factory for a class', () => {

        const factory      = createClassFactory(Class);
        const dependencies = ['Alex'];
        const instance     = factory(...dependencies);

        expect(instance).toBeDefined();
        expect(instance.name).toBe('Alex');
    });

    it('factory returns a new instance every time', () => {

        const factory      = createClassFactory(Class);
        const dependencies = ['Alex'];
        const instance     = factory(...dependencies);
        const instance2    = factory(...dependencies);

        expect(instance).not.toBe(instance2);
        expect(instance.name).toBe(instance2.name);

        const instance3 = factory(...dependencies);

        expect(instance3).not.toBe(instance2);
        expect(instance3.name).toBe(instance2.name);
        expect(instance3).not.toBe(instance);
        expect(instance3.name).toBe(instance.name);
    });
});