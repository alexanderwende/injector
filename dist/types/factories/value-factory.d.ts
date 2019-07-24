import { Factory } from './factory.js';
export interface ValueFactory<T> extends Factory<T> {
    (): T;
}
export declare const createValueFactory: <T>(value: T) => ValueFactory<T>;
//# sourceMappingURL=value-factory.d.ts.map