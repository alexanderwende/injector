import { Constructor } from '../utils';
import { Factory } from './factory';
export interface SingletonFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createSingletonFactory: <T>(constructorFn: Constructor<T>) => SingletonFactory<T>;
