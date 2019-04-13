import * as ANNOTATION from './metadata-keys';
/**
 * A dependency annotation describes a dependency that should be resolved by an injector
 *
 * @remarks
 * Most classes have dependencies, either in the form of constructor parameters or in
 * the form of properties which can be injected. When a provider is created for a class
 * it needs to know about the class's dependencies. The provider can obtain a map of the
 * class's dependencies by respectively calling {@link getParameterAnnotations} or
 * {@link getPropertyAnnotations} if the class was decorated as {@link injectable}. A
 * DependencyAnnotation does not contain a value itself, but rather a token which allows
 * the provider to resolve the class's dependency via the injector. This allows a great
 * deal of flexibility, especially when combined with child injectors.
 *
 * DependencyAnnotations are not only useful for class dependencies though. They can be
 * equally useful when creating simple factory providers, where the factories dependencies
 * should be resolved through an {@link InjectToken} at runtime.
 */
export class DependencyAnnotation {
    constructor(token, optional = false) {
        this.token = token;
        this.optional = optional;
    }
}
/**
 * Gets the {@link InjectToken} of a class
 *
 * @internal
 */
export const getTokenAnnotation = (target) => {
    return Reflect.getOwnMetadata(ANNOTATION.TOKEN, target);
};
/**
 * Sets the {@link InjectToken} of a class
 *
 * @internal
 */
export const setTokenAnnotation = (target, token) => {
    Reflect.defineMetadata(ANNOTATION.TOKEN, token, target);
};
/**
 * Gets the {@link DependencyAnnotation} of a constructor parameter
 *
 * @internal
 */
export const getParameterAnnotation = (target, parameterIndex) => {
    ensureParameterAnnotations(target);
    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target).get(parameterIndex);
};
/**
 * Updates a {@link DependencyAnnotation} of a constructor parameter with the values from the partial annotation
 *
 * @internal
 */
export const setParameterAnnotation = (target, parameterIndex, annotation) => {
    ensureParameterAnnotations(target);
    const annotations = Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target);
    Object.assign(annotations.get(parameterIndex), annotation);
};
/**
 * Gets the {@link ParameterAnnotations} of a class's constructor
 *
 * @internal
 */
export const getParameterAnnotations = (target) => {
    ensureParameterAnnotations(target);
    return Reflect.getOwnMetadata(ANNOTATION.PARAMETERS, target);
};
/**
 * Gets the {@link DependencyAnnotation} of a class property
 *
 * @internal
 */
export const getPropertyAnnotation = (target, propertyKey) => {
    ensurePropertyAnnotation(target, propertyKey);
    // we have to use a type cast as TypeScript currently doesn't support Symbols as index types
    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target).get(propertyKey);
};
/**
 * Updates a {@link DependencyAnnotation} of a class property with the values from the partial annotation
 *
 * @internal
 */
export const setPropertyAnnotation = (target, propertyKey, annotation) => {
    ensurePropertyAnnotation(target, propertyKey);
    const annotations = Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target);
    Object.assign(annotations.get(propertyKey), annotation);
};
/**
 * Gets the {@link PropertyAnnotations} of a class
 *
 * @internal
 */
export const getPropertyAnnotations = (target) => {
    ensurePropertyAnnotations(target);
    return Reflect.getOwnMetadata(ANNOTATION.PROPERTIES, target);
};
const ensureParameterAnnotations = (target) => {
    if (!Reflect.hasOwnMetadata(ANNOTATION.PARAMETERS, target)) {
        const parameterTypes = Reflect.getOwnMetadata(ANNOTATION.DESIGN_PARAMETER_TYPES, target) || [];
        const parameterAnnotations = new Map(parameterTypes.map((type, index) => [index, new DependencyAnnotation(type)]));
        Reflect.defineMetadata(ANNOTATION.PARAMETERS, parameterAnnotations, target);
    }
};
const ensurePropertyAnnotation = (target, propertyKey) => {
    const properties = getPropertyAnnotations(target);
    if (!properties.has(propertyKey)) {
        const propertyType = Reflect.getOwnMetadata(ANNOTATION.DESIGN_TYPE, target.prototype, 
        // we force a type cast here as reflection types the PropertyKey as string | symbol,
        // at runtime numeric property keys work too
        propertyKey);
        properties.set(propertyKey, new DependencyAnnotation(propertyType));
    }
};
const ensurePropertyAnnotations = (target) => {
    if (!Reflect.hasOwnMetadata(ANNOTATION.PROPERTIES, target)) {
        Reflect.defineMetadata(ANNOTATION.PROPERTIES, new Map(), target);
    }
};
//# sourceMappingURL=annotations.js.map