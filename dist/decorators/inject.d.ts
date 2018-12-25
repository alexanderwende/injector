import { InjectToken } from '../inject-token';
export declare const inject: <T>(token: InjectToken<T>) => (target: Object, propertyKey: string | symbol, parameterIndex?: number | undefined) => void;
