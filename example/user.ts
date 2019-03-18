import { InjectToken } from '../src';

export interface User {
    username: string;
}

export const USER = new InjectToken<User>('User');

export const MOCK_USER: User = {
    username: 'alex'
};
