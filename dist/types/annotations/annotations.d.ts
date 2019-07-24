import { InjectToken } from '../inject-token.js';
import { Constructor } from '../utils/index.js';
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
export declare class DependencyAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
    constructor(token: InjectToken<T> | Constructor<T>, optional?: boolean);
}
/**
 * A map of constructor parameter dependency annotations
 */
export declare type ParameterAnnotations = Map<number, DependencyAnnotation>;
/**
 * A map of class property dependency annotations
 */
export declare type PropertyAnnotations = Map<PropertyKey, DependencyAnnotation>;
/**
 * Gets the {@link InjectToken} of a class
 *
 * @internal
 */
export declare const getTokenAnnotation: <T>(target: Constructor<T>) => InjectToken<T> | undefined;
/**
 * Sets the {@link InjectToken} of a class
 *
 * @internal
 */
export declare const setTokenAnnotation: <T>(target: Constructor<T>, token: InjectToken<T>) => void;
/**
 * Gets the {@link DependencyAnnotation} of a constructor parameter
 *
 * @internal
 */
export declare const getParameterAnnotation: (target: Constructor<any>, parameterIndex: number) => DependencyAnnotation<any>;
/**
 * Updates a {@link DependencyAnnotation} of a constructor parameter with the values from the partial annotation
 *
 * @internal
 */
export declare const setParameterAnnotation: (target: Constructor<any>, parameterIndex: number, annotation: Partial<DependencyAnnotation<any>>) => void;
/**
 * Gets the {@link ParameterAnnotations} of a class's constructor
 *
 * @internal
 */
export declare const getParameterAnnotations: (target: Constructor<any>) => Map<number, DependencyAnnotation<any>>;
/**
 * Gets the {@link DependencyAnnotation} of a class property
 *
 * @internal
 */
export declare const getPropertyAnnotation: (target: Constructor<any>, propertyKey: string | number | symbol) => DependencyAnnotation<any>;
/**
 * Updates a {@link DependencyAnnotation} of a class property with the values from the partial annotation
 *
 * @internal
 */
export declare const setPropertyAnnotation: (target: Constructor<any>, propertyKey: string | number | symbol, annotation: Partial<DependencyAnnotation<any>>) => void;
/**
 * Gets the {@link PropertyAnnotations} of a class
 *
 * @internal
 */
export declare const getPropertyAnnotations: (target: Constructor<any>) => Map<string | number | symbol, DependencyAnnotation<any>>;
//# sourceMappingURL=annotations.d.ts.map