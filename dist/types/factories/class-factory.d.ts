import { Constructor } from '../utils/index.js';
import { Factory } from './factory.js';
export interface ClassFactory<T> extends Factory<T> {
    (...dependencies: any[]): T;
}
export declare const createClassFactory: <T>(constructorFn: Constructor<T>) => ClassFactory<T>;
//# sourceMappingURL=class-factory.d.ts.map