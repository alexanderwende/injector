import { Constructor } from '../utils/index.js';
import { Factory } from './factory.js';

export interface SingletonFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}

export const createSingletonFactory = <T> (constructorFn: Constructor<T>): SingletonFactory<T> => {

    let instance: T;

    return (...dependencies: any[]) => {

        if (!instance) instance = Reflect.construct(constructorFn, dependencies);

        return instance;
    };
};
