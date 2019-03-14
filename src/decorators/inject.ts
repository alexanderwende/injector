import { getParameterAnnotation, getPropertyAnnotation, getTokenAnnotation, setParameterAnnotation, setPropertyAnnotation } from '../annotations';
import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';

/**
 * @internal
 */
export const CLASS_NOT_INJECTABLE = (constructorFn: Constructor) => new Error(`Class '${ constructorFn.name }' has not been decorated as injectable and cannot be injected.`);

// TODO: inject should only accept InjectTokens, not constructors
export const inject = <T> (constructorOrToken?: Constructor<T> | InjectToken<T>) => {

    return (target: Object, propertyKey: string | symbol, parameterIndex?: number): void => {

        const isParameterDecorator = typeof parameterIndex === 'number';

        const token: Constructor<T> | InjectToken<T> | undefined = (constructorOrToken instanceof InjectToken)
            ? constructorOrToken
            : (constructorOrToken instanceof Function)
                ? getTokenAnnotation(constructorOrToken)
                : (isParameterDecorator)
                    ? getParameterAnnotation(target as Constructor, parameterIndex!).token
                    : getPropertyAnnotation(target.constructor as Constructor, propertyKey).token;

        // token can only be undefined, when injecting a class type
        if (!token) {

            throw CLASS_NOT_INJECTABLE(constructorOrToken as Constructor);
        }

        if (isParameterDecorator) {

            // decorator is a parameter decorator
            setParameterAnnotation(target as Constructor, parameterIndex!, { token });

        } else {

            // decorator is a property decorator
            setPropertyAnnotation(target.constructor as Constructor, propertyKey, { token });
        }
    };
};

export const inject2 = <T> (injectToken?: InjectToken<T>) => {

    return (target: Object, propertyKey: PropertyKey, parameterIndex?: number): void => {

        const isParameterDecorator = typeof parameterIndex === 'number';

        const token: InjectToken<T> | Constructor<T> = injectToken instanceof InjectToken
            ? injectToken
            : isParameterDecorator
                ? getParameterAnnotation(target as Constructor, parameterIndex!).token
                : getPropertyAnnotation(target.constructor as Constructor, propertyKey).token;


        if (isParameterDecorator) {

            setParameterAnnotation(target as Constructor, parameterIndex!, { token });

        } else {

            setPropertyAnnotation(target.constructor as Constructor, propertyKey, { token });
        }
    };
};
