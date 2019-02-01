import '@abraham/reflection';
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
export declare const getTokenAnnotation: <T>(target: Constructor<T>) => InjectToken<T> | undefined;
/**
 * @internal
 */
export declare const setTokenAnnotation: <T>(target: Constructor<T>, token: InjectToken<T>) => void;
/**
 * @internal
 */
export declare const getParameterAnnotation: (target: Constructor<any>, parameterIndex: number) => ParameterAnnotation<any>;
/**
 * @internal
 */
export declare const getParameterAnnotations: (target: Constructor<any>) => ParameterAnnotation<any>[];
/**
 * @internal
 */
export declare const ensureParameterAnnotations: (target: Constructor<any>) => void;
/**
 * @internal
 */
export declare const getPropertyAnnotation: (target: Constructor<any>, propertyKey: string) => PropertyAnnotation<any>;
/**
 * @internal
 */
export declare const getPropertyAnnotations: (target: Constructor<any>) => {
    [key: string]: PropertyAnnotation<any>;
};
/**
 * @internal
 */
export declare const ensurePropertyAnnotations: (target: Constructor<any>) => void;
/**
 * @internal
 */
export declare const ensurePropertyAnnotation: (target: Constructor<any>, propertyKey: string) => void;
/**
 * @internal
 */
export declare const createParameterAnnotation: <T>(token: InjectToken<T> | Constructor<T>, optional?: boolean) => ParameterAnnotation<T>;
/**
 * @internal
 */
export declare const createPropertyAnnotation: <T>(token: InjectToken<T> | Constructor<T>, optional?: boolean) => PropertyAnnotation<T>;
//# sourceMappingURL=index.d.ts.map