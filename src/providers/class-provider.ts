import { Constructor } from '../decorators';
import { createClassFactory } from '../factories';
import { getParameterAnnotations, getPropertyAnnotations, ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { BaseProvider } from './index';

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
