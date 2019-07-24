import { setParameterAnnotation, setPropertyAnnotation } from '../annotations/index.js';
import { Constructor } from '../utils/index.js';

export const optional = () => {

    return (target: Object, propertyKey: string | symbol, parameterIndex?: number): void => {

        if (typeof parameterIndex === 'number') {

            // decorator is a parameter decorator
            setParameterAnnotation(target as Constructor, parameterIndex, { optional: true });

        } else {

            // decorator is a property decorator
            setPropertyAnnotation(target.constructor as Constructor, propertyKey, { optional: true });
        }
    };
};
