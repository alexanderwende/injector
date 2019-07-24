import { setParameterAnnotation, setPropertyAnnotation } from '../annotations/index.js';
export const optional = () => {
    return (target, propertyKey, parameterIndex) => {
        if (typeof parameterIndex === 'number') {
            // decorator is a parameter decorator
            setParameterAnnotation(target, parameterIndex, { optional: true });
        }
        else {
            // decorator is a property decorator
            setPropertyAnnotation(target.constructor, propertyKey, { optional: true });
        }
    };
};
//# sourceMappingURL=optional.js.map