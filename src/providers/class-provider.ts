import { getParameterAnnotations, getPropertyAnnotations, ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { createClassFactory } from '../factories';
import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';

export class ClassProvider<T> extends BaseProvider<T> {

    constructor (constructorFn: Constructor<T>,
                 dependencies?: ParameterAnnotation[],
                 properties?: { [key: string]: PropertyAnnotation }) {

        super(
            createClassFactory(constructorFn),
            dependencies || getParameterAnnotations(constructorFn),
            properties || getPropertyAnnotations(constructorFn)
        );
    }
}
