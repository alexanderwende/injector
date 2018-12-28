import { Constructor } from '../utils';
import { Factory } from './factory';

export interface ClassFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}

export const createClassFactory = <T> (constructorFn: Constructor<T>): ClassFactory<T> => {

    return (...dependencies: any[]) => {

        // console.log(`ClassFactory<${constructorFn.name}>()... [dependencies]: `, dependencies);

        return new constructorFn(...dependencies);
    };
};