import '@abraham/reflection';
import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
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
export declare const getTokenAnnotation: <T>(target: Constructor<T>) => InjectToken<T> | undefined;
export declare const setTokenAnnotation: <T>(target: Constructor<T>, token: InjectToken<T>) => void;
export declare const getParameterAnnotation: (target: Constructor<any>, parameterIndex: number) => ParameterAnnotation<any>;
export declare const getParameterAnnotations: (target: Constructor<any>) => ParameterAnnotation<any>[];
export declare const ensureParameterAnnotations: (target: Constructor<any>) => void;
export declare const getPropertyAnnotation: (target: Constructor<any>, propertyKey: string) => PropertyAnnotation<any>;
export declare const getPropertyAnnotations: (target: Constructor<any>) => {
    [key: string]: PropertyAnnotation<any>;
};
export declare const ensurePropertyAnnotations: (target: Constructor<any>) => void;
export declare const ensurePropertyAnnotation: (target: Constructor<any>, propertyKey: string) => void;
export declare const createParameterAnnotation: <T>(token: InjectToken<T> | Constructor<T>, optional?: boolean) => ParameterAnnotation<T>;
export declare const createPropertyAnnotation: <T>(token: InjectToken<T> | Constructor<T>, optional?: boolean) => PropertyAnnotation<T>;
//# sourceMappingURL=index.d.ts.map