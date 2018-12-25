import { getParameterAnnotation, getPropertyAnnotation } from '../annotations';
import { InjectToken } from '../inject-token';
import { Constructor } from './index';

export const inject = <T> (token: InjectToken<T>) => {

    return (target: Object, propertyKey: string | symbol, parameterIndex?: number): void => {

        if (typeof parameterIndex === 'number') {

            // decorator is a parameter decorator
            const parameterAnnotation = getParameterAnnotation(target as Constructor<any>, parameterIndex);

            parameterAnnotation.token = token;

            // console.log('inject()... ', parameterAnnotation);

        } else {

            // decorator is a property decorator
            const propertyAnnotation = getPropertyAnnotation(target.constructor as Constructor<any>, propertyKey as string);

            propertyAnnotation.token = token;

            // console.log('inject()... ', propertyAnnotation);
        }
    };
};
