import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { Provider } from './provider';
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
    provide(injector?: Injector): T;
    resolveDependencies(injector: Injector): any[];
    resolveProperties(injector: Injector): {
        [key: string]: any;
    };
    createValue(dependencies?: any[], properties?: {
        [key: string]: any;
    }): T;
}
//# sourceMappingURL=base-provider.d.ts.map