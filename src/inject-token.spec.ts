import { InjectToken } from './inject-token';

class Foo {}

const Bar = Symbol('Bar');

describe('InjectToken', () => {

    it('creates an inject token', () => {

        const token = new InjectToken('TOKEN_NAME');

        expect(token).toBeDefined();
        expect(token.description).toBe('TOKEN_NAME');
        expect(typeof token.value === 'symbol').toBe(true);
    });

    it('creates an inject token with the same symbol for the same class', () => {

        const token = new InjectToken(Foo);

        expect(token).toBeDefined();
        expect(token.description).toBe('Foo');
        expect(typeof token.value === 'symbol').toBe(true);

        const token2 = new InjectToken(Foo);

        expect(token2).toBeDefined();
        expect(token2.description).toBe('Foo');
        expect(typeof token2.value === 'symbol').toBe(true);

        // TODO: This should maybe be rethought...
        expect(token2.value === token.value).toBe(true);

        expect(token === token2).toBe(false);
    });

    it('creates an inject token with the same symbol for the same symbol', () => {

        const token = new InjectToken(Bar);

        expect(token).toBeDefined();
        expect(token.description).toBe('Symbol(Bar)');
        expect(typeof token.value === 'symbol').toBe(true);
        expect(token.value === Bar).toBe(true);

        const token2 = new InjectToken(Bar);

        expect(token2).toBeDefined();
        expect(token2.description).toBe('Symbol(Bar)');
        expect(typeof token2.value === 'symbol').toBe(true);
        expect(token2.value === token.value).toBe(true);

        expect(token === token2).toBe(false);
    });
});