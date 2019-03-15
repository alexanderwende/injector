import { ParameterAnnotations, PropertyAnnotations } from '../annotations';
import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';
export declare class ClassProvider<T> extends BaseProvider<T> {
    constructor(constructorFn: Constructor<T>, dependencies?: ParameterAnnotations, properties?: PropertyAnnotations);
}
//# sourceMappingURL=class-provider.d.ts.map