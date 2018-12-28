import { Factory } from './factory';
export interface ValueFactory<T> extends Factory<T> {
    (): T;
}
export declare const createValueFactory: <T>(value: T) => ValueFactory<T>;
