import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
export declare const inject: <T>(constructorOrToken?: Constructor<T> | InjectToken<T> | undefined) => (target: Object, propertyKey: string | symbol, parameterIndex?: number | undefined) => void;
