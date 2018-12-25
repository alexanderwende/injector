import { Constructor } from '../decorators';
import { Factory } from './index';

export interface SingletonFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}

export const createSingletonFactory = <T> (constructorFn: Constructor<T>): SingletonFactory<T> => {

    let instance: T;

    return (...dependencies: any[]) => {

        if (!instance) instance = new constructorFn(...dependencies);

        return instance;
    };
};