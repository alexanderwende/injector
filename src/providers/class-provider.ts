import {
    getParameterAnnotations,
    getPropertyAnnotations,
    ParameterAnnotations,
    PropertyAnnotations
} from '../annotations';
import { createClassFactory } from '../factories';
import { Constructor } from '../utils';
import { BaseProvider } from './base-provider';

export class ClassProvider<T> extends BaseProvider<T> {

    constructor (
        constructorFn: Constructor<T>,
        dependencies?: ParameterAnnotations,
        properties?: PropertyAnnotations) {

        super(
            createClassFactory(constructorFn),
            dependencies || getParameterAnnotations(constructorFn),
            properties || getPropertyAnnotations(constructorFn)
        );
    }
}
