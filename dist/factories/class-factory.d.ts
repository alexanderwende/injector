import { Constructor } from '../decorators';
import { Factory } from './index';
export interface ClassFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createClassFactory: <T>(constructorFn: Constructor<T>) => ClassFactory<T>;
