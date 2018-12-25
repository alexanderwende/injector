import { Constructor } from '../decorators';
import { Factory } from './index';
export interface SingletonFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createSingletonFactory: <T>(constructorFn: Constructor<T>) => SingletonFactory<T>;
