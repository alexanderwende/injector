import { getParameterAnnotation, getPropertyAnnotation } from '../annotations';
import { Constructor } from '../utils';

export const optional = () => {

    return (target: Object, propertyKey: string | symbol, parameterIndex?: number): void => {

        if (typeof parameterIndex === 'number') {

            // decorator is a parameter decorator
            const parameterAnnotation = getParameterAnnotation(target as Constructor<any>, parameterIndex);

            parameterAnnotation.optional = true;

        } else {

            // decorator is a property decorator
            const propertyAnnotation = getPropertyAnnotation(target.constructor as Constructor<any>, propertyKey as string);

            propertyAnnotation.optional = true;
        }
    };
};
