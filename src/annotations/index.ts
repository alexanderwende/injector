import { Constructor } from '../decorators';
import { InjectToken } from '../inject-token';
import * as ANNOTATION from './metadata-keys';

export { ANNOTATION };

export interface ParameterAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
}

export interface PropertyAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
}

export const getTokenAnnotation = <T> (target: Constructor<T>): InjectToken<T> => {

    return Reflect.getOwnMetadata(ANNOTATION.TOKEN, target);
};

export const setTokenAnnotation = <T> (target: Constructor<T>, token: InjectToken<T>): void => {

    Reflect.defineMetadata(ANNOTATION.TOKEN, token, target);
};

export const getParameterAnnotation = (target: Constructor, parameterIndex: number): ParameterAnnotation => {

    ensureParameterAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target)[parameterIndex];
};

export const getParameterAnnotations = (target: Constructor): ParameterAnnotation[] => {

    ensureParameterAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target);
};

export const ensureParameterAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PARAMETERS, target)) {

        const parameterTypes: Constructor[]               = Reflect.getOwnMetadata(ANNOTATION.DESIGN_PARAMETER_TYPES, target) || [];
        const parameterAnnotations: ParameterAnnotation[] = parameterTypes.map(type => createParameterAnnotation(type));

        Reflect.defineMetadata(ANNOTATION.PARAMETERS, parameterAnnotations, target);
    }
};

export const getPropertyAnnotation = (target: Constructor, propertyKey: string): PropertyAnnotation => {

    ensurePropertyAnnotation(target, propertyKey);

    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target)[propertyKey];
};

export const getPropertyAnnotations = (target: Constructor): { [key: string]: PropertyAnnotation } => {

    ensurePropertyAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target);
};

export const ensurePropertyAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PROPERTIES, target)) {

        Reflect.defineMetadata(ANNOTATION.PROPERTIES, {}, target);
    }
};

export const ensurePropertyAnnotation = (target: Constructor, propertyKey: string) => {

    ensurePropertyAnnotations(target);

    const properties: { [key: string]: PropertyAnnotation } = Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target);

    if (!properties.hasOwnProperty(propertyKey)) {

        properties[propertyKey] = createPropertyAnnotation(Reflect.getOwnMetadata(ANNOTATION.DESIGN_TYPE, target.prototype, propertyKey));
    }
};

export const createParameterAnnotation = <T> (token: InjectToken<T> | Constructor<T>, optional = false): ParameterAnnotation<T> => ({
    token:    token,
    optional: optional
});

export const createPropertyAnnotation = <T> (token: InjectToken<T> | Constructor<T>, optional = false): PropertyAnnotation<T> => ({
    token:    token,
    optional: optional
});