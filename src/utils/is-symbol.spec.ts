import { isSymbol } from "./is-symbol";

describe('isSymbol', () => {

    it('should return true for a symbol', () => {

        const testSymbol = Symbol();

        expect(isSymbol(testSymbol)).toBe(true);
        expect(isSymbol(Symbol.iterator)).toBe(true);
    });

    it('should return false for non-symbols', () => {

        expect(isSymbol('foo')).toBe(false);
        expect(isSymbol(1)).toBe(false);
        expect(isSymbol(true)).toBe(false);
        expect(isSymbol([1, 2])).toBe(false);
        expect(isSymbol({})).toBe(false);
        expect(isSymbol(() => ({}))).toBe(false);
    });
});
