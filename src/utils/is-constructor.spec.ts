import { isConstructor } from "./is-constructor";

describe('isConstructor', () => {

    it('should return true for a constructor', () => {

        class TestClass {}

        function TestFunction () {}

        expect(isConstructor(TestClass)).toBe(true);
        expect(isConstructor(TestFunction)).toBe(true);
        expect(isConstructor(Number)).toBe(true);
    });

    it('should return false for non-constructors', () => {

        expect(isConstructor('foo')).toBe(false);
        expect(isConstructor(1)).toBe(false);
        expect(isConstructor(true)).toBe(false);
        expect(isConstructor([1, 2])).toBe(false);
        expect(isConstructor({})).toBe(false);
        expect(isConstructor(() => ({}))).toBe(false);
    });
});
