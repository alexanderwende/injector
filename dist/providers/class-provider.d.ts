import { Constructor } from '../decorators';
import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { BaseProvider } from './index';
export declare class ClassProvider<T> extends BaseProvider<T> {
    constructor(constructorFn: Constructor<T>, dependencies?: ParameterAnnotation[], properties?: {
        [key: string]: PropertyAnnotation;
    });
}
