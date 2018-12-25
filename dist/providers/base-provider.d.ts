import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { Provider } from './index';
export declare const PROVIDER_UNREGISTERED: Error;
export declare class BaseProvider<T> implements Provider<T> {
    factory: Factory<T>;
    dependencies: ParameterAnnotation[];
    properties: {
        [key: string]: PropertyAnnotation;
    };
    injector: Injector | undefined;
    constructor(factory: Factory<T>, dependencies?: ParameterAnnotation[], properties?: {
        [key: string]: PropertyAnnotation;
    });
    provide(): T;
    protected _createValue(dependencies: any[], properties: {
        [key: string]: any;
    }): T;
    protected _resolveDependencies(): any[];
    protected _resolveProperties(): {
        [key: string]: any;
    };
}
