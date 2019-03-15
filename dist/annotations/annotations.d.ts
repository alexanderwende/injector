import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
/**
 * A dependency annotation describes a constructor parameter or class property dependency
 */
export interface DependencyAnnotation<T = any> {
    token: InjectToken<T> | Constructor<T>;
    optional: boolean;
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