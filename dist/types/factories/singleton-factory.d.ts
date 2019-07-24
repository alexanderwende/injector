import { Constructor } from '../utils/index.js';
import { Factory } from './factory.js';
export interface SingletonFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createSingletonFactory: <T>(constructorFn: Constructor<T>) => SingletonFactory<T>;
//# sourceMappingURL=singleton-factory.d.ts.map