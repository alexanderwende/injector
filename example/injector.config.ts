import { Injector, ValueProvider } from '../src';
import { MOCK_USER, USER } from './user';

export const injector = new Injector();

injector.register(USER, new ValueProvider(MOCK_USER));
