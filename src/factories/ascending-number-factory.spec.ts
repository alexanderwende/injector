import { Factory } from './factory';

interface AscendingNumberFactory extends Factory<number> {
    (): number;
}

const createAscendingNumberFactory = (startWith: number = 0): AscendingNumberFactory => {

    return () => startWith++;
};

describe('AscendingNumberFactory', () => {

    it('should create ascending numbers', () => {

        const factory = createAscendingNumberFactory();

        expect(factory()).toBe(0);
        expect(factory()).toBe(1);
        expect(factory()).toBe(2);
        expect(factory()).toBe(3);
    });

    it('should accept a different starting number', () => {

        const factory = createAscendingNumberFactory(10);

        expect(factory()).toBe(10);
        expect(factory()).toBe(11);
        expect(factory()).toBe(12);
        expect(factory()).toBe(13);
    });
});
