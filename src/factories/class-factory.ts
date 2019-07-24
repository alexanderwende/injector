import { Constructor } from '../utils/index.js';
import { Factory } from './factory.js';

export interface ClassFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}

export const createClassFactory = <T> (constructorFn: Constructor<T>): ClassFactory<T> => {

    return (...dependencies: any[]) => {

        return Reflect.construct(constructorFn, dependencies);
    };
};
