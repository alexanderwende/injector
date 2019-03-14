import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
import * as ANNOTATION from './metadata-keys';

/**
 * A dependency annotation describes a constructor parameter or class property dependency
 */
export interface DependencyAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
}

/**
 * An array of constructor parameter dependency annotations
 */
export type ParameterAnnotations = DependencyAnnotation[];

/**
 * A map of class property dependency annotations
 */
export type PropertyAnnotations = { [key: string]: DependencyAnnotation };

/**
 * Gets the {@link InjectToken} of a class
 *
 * @internal
 */
export const getTokenAnnotation = <T> (target: Constructor<T>): InjectToken<T> | undefined => {

    return Reflect.getOwnMetadata(ANNOTATION.TOKEN, target);
};

/**
 * Sets the {@link InjectToken} of a class
 *
 * @internal
 */
export const setTokenAnnotation = <T> (target: Constructor<T>, token: InjectToken<T>): void => {

    Reflect.defineMetadata(ANNOTATION.TOKEN, token, target);
};

/**
 * Gets the {@link DependencyAnnotation} of a constructor parameter
 *
 * @internal
 */
export const getParameterAnnotation = (target: Constructor, parameterIndex: number): DependencyAnnotation => {

    ensureParameterAnnotations(target);

    return (Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target) as ParameterAnnotations)[parameterIndex];
};

/**
 * Updates a {@link DependencyAnnotation} of a constructor parameter with the values from the partial annotation
 *
 * @internal
 */
export const setParameterAnnotation = (
    target: Constructor,
    parameterIndex: number,
    annotation: Partial<DependencyAnnotation>): void => {

    ensureParameterAnnotations(target);

    const annotations = Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target) as ParameterAnnotations;

    Object.assign(annotations[parameterIndex], annotation);
};

/**
 * Gets the {@link ParameterAnnotations} of a class's constructor
 *
 * @internal
 */
export const getParameterAnnotations = (target: Constructor): ParameterAnnotations => {

    ensureParameterAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target) as ParameterAnnotations;
};

/**
 * Gets the {@link DependencyAnnotation} of a class property
 *
 * @internal
 */
export const getPropertyAnnotation = (target: Constructor, propertyKey: PropertyKey): DependencyAnnotation => {

    ensurePropertyAnnotation(target, propertyKey);

    // we have to use a type cast as TypeScript currently doesn't support Symbols as index types
    return (Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target) as PropertyAnnotations)[propertyKey as string];
};

/**
 * Updates a {@link DependencyAnnotation} of a class property with the values from the partial annotation
 *
 * @internal
 */
export const setPropertyAnnotation = (
    target: Constructor,
    propertyKey: PropertyKey,
    annotation: Partial<DependencyAnnotation>): void => {

    ensurePropertyAnnotation(target, propertyKey);

    const annotations = Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target) as PropertyAnnotations;

    // we have to use a type cast as TypeScript currently doesn't support Symbols as index types
    Object.assign(annotations[propertyKey as string], annotation);
};

/**
 * Gets the {@link PropertyAnnotations} of a class
 *
 * @internal
 */
export const getPropertyAnnotations = (target: Constructor): PropertyAnnotations => {

    ensurePropertyAnnotations(target);

    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target) as PropertyAnnotations;
};



const ensureParameterAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PARAMETERS, target)) {

        const parameterTypes: Constructor[] = Reflect.getOwnMetadata(ANNOTATION.DESIGN_PARAMETER_TYPES, target) || [];
        const parameterAnnotations: ParameterAnnotations = parameterTypes.map(type => createDependencyAnnotation(type));

        Reflect.defineMetadata(ANNOTATION.PARAMETERS, parameterAnnotations, target);
    }
};

const ensurePropertyAnnotation = (target: Constructor, propertyKey: PropertyKey) => {

    const properties = getPropertyAnnotations(target);

    if (!properties.hasOwnProperty(propertyKey)) {

        const type = Reflect.getOwnMetadata(
            ANNOTATION.DESIGN_TYPE,
            target.prototype,
            // we force a type cast here as reflection types the PropertyKey as string | symbol,
            // at runtime numberic property keys work too
            propertyKey as string | symbol
        ) as InjectToken | Constructor;

        // we have to use a type cast as TypeScript currently doesn't support Symbols as index types
        properties[propertyKey as string] = createDependencyAnnotation(type);
    }
};

const ensurePropertyAnnotations = (target: Constructor) => {

    if (!Reflect.hasOwnMetadata(ANNOTATION.PROPERTIES, target)) {

        Reflect.defineMetadata(ANNOTATION.PROPERTIES, {}, target);
    }
};

const createDependencyAnnotation = <T> (
    token: InjectToken<T> | Constructor<T>,
    optional = false
): DependencyAnnotation<T> => ({
    token: token,
    optional: optional
});
