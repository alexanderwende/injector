import { Factory } from './factory.js';

export interface ValueFactory<T> extends Factory<T> {
    (): T;
}

export const createValueFactory = <T> (value: T): ValueFactory<T> => {

    return () => value;
};
