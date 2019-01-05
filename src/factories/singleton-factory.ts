import { Constructor } from '../utils';
import { Factory } from './factory';

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
