import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
import * as ANNOTATION from './metadata-keys';

/**
 * @internal
 */
export { ANNOTATION };

export interface ParameterAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
}

export interface PropertyAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
}

/**
 * @internal
 */
export const getTokenAnnotation = <T> (target: Constructor<T>): InjectToken<T> | undefined => {

    return Reflect.getOwnMetadata(ANNOTATION.TOKEN, target);
};

/**
 * @internal
 */
export const setTokenAnnotation = <T> (target: Constructor<T>, token: InjectToken<T>): void => {

    Reflect.defineMetadata(ANNOTATION.TOKEN, token, target);
};

/**
 * @internal
 */
export const getParameterAnnotation = (target: Constructor, parameterIndex: number): ParameterAnnotation => {

    ensureParameterAnnotations(target);

    return (Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target) as ParameterAnnotation[])[parameterIndex];
};

/**
 * @internal
 */
export const getParameterAnnotations = (target: Constructor): ParameterAnnotation[] => {

    ensureParameterAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target) as ParameterAnnotation[];
};

/**
 * @internal
 */
export const ensureParameterAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PARAMETERS, target)) {

        const parameterTypes: Constructor[] = Reflect.getOwnMetadata(ANNOTATION.DESIGN_PARAMETER_TYPES, target) || [];
        const parameterAnnotations: ParameterAnnotation[] = parameterTypes.map(type => createParameterAnnotation(type));

        Reflect.defineMetadata(ANNOTATION.PARAMETERS, parameterAnnotations, target);
    }
};

/**
 * @internal
 */
export const getPropertyAnnotation = (target: Constructor, propertyKey: string): PropertyAnnotation => {

    ensurePropertyAnnotation(target, propertyKey);

    return (Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target) as { [key: string]: PropertyAnnotation })[propertyKey];
};

/**
 * @internal
 */
export const getPropertyAnnotations = (target: Constructor): { [key: string]: PropertyAnnotation } => {

    ensurePropertyAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target) as { [key: string]: PropertyAnnotation };
};

/**
 * @internal
 */
export const ensurePropertyAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PROPERTIES, target)) {

        Reflect.defineMetadata(ANNOTATION.PROPERTIES, {}, target);
    }
};

/**
 * @internal
 */
export const ensurePropertyAnnotation = (target: Constructor, propertyKey: string) => {

    const properties = getPropertyAnnotations(target);

    if (!properties.hasOwnProperty(propertyKey)) {

        const propertyType: InjectToken | Constructor = Reflect.getOwnMetadata(ANNOTATION.DESIGN_TYPE, target.prototype, propertyKey) as InjectToken | Constructor;

        properties[propertyKey] = createPropertyAnnotation(propertyType);
    }
};

/**
 * @internal
 */
export const createParameterAnnotation = <T> (token: InjectToken<T> | Constructor<T>, optional = false): ParameterAnnotation<T> => ({
    token: token,
    optional: optional
});

/**
 * @internal
 */
export const createPropertyAnnotation = <T> (token: InjectToken<T> | Constructor<T>, optional = false): PropertyAnnotation<T> => ({
    token: token,
    optional: optional
});
