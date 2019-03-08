import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';
export declare class ClassProvider<T> extends BaseProvider<T> {
    constructor(constructorFn: Constructor<T>, dependencies?: ParameterAnnotation[], properties?: {
        [key: string]: PropertyAnnotation;
    });
}
//# sourceMappingURL=class-provider.d.ts.map