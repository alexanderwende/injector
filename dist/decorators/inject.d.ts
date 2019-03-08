import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';
/**
 * @internal
 */
export declare const CLASS_NOT_INJECTABLE: (constructorFn: Constructor<any>) => Error;
export declare const inject: <T>(constructorOrToken?: Constructor<T> | InjectToken<T> | undefined) => (target: Object, propertyKey: string | symbol, parameterIndex?: number | undefined) => void;
//# sourceMappingURL=inject.d.ts.map