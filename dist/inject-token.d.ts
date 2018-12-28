import { Constructor } from './utils';
export declare class InjectToken<T = any> {
    description: string;
    value: Symbol;
    constructor(value: Constructor<T> | symbol | string);
}
