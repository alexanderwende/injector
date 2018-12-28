import { Constructor } from '../utils';
import { Factory } from './factory';
export interface ClassFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createClassFactory: <T>(constructorFn: Constructor<T>) => ClassFactory<T>;
