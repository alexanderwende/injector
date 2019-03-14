import { InjectToken } from './inject-token';

describe('InjectToken', () => {

    it('should create an inject token', () => {

        const token = new InjectToken('TOKEN_NAME');

        expect(token).toBeDefined();
        expect(token.description).toBe('TOKEN_NAME');
    });
});
