import { getParameterAnnotation, getPropertyAnnotation, getTokenAnnotation } from '../annotations';
import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';

export const inject = <T> (constructorOrToken?: Constructor<T> | InjectToken<T>) => {

    return (target: Object, propertyKey: string | symbol, parameterIndex?: number): void => {

        const isParameterDecorator = typeof parameterIndex === 'number';

        const token: Constructor<T> | InjectToken<T> = (constructorOrToken instanceof InjectToken) ?
                                                       constructorOrToken :
                                                       (constructorOrToken instanceof Function) ?
                                                       getTokenAnnotation(constructorOrToken) :
                                                       (isParameterDecorator) ?
                                                       getParameterAnnotation(target as Constructor, parameterIndex!).token :
                                                       getPropertyAnnotation(target.constructor as Constructor, propertyKey as string).token;

        if (isParameterDecorator) {

            // decorator is a parameter decorator
            const parameterAnnotation = getParameterAnnotation(target as Constructor, parameterIndex!);

            parameterAnnotation.token = token;

            // console.log('inject()... ', parameterAnnotation);

        } else {

            // decorator is a property decorator
            const propertyAnnotation = getPropertyAnnotation(target.constructor as Constructor, propertyKey as string);

            propertyAnnotation.token = token;

            // console.log('inject()... ', propertyAnnotation);
        }
    };
};
