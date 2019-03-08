import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
export interface Provider<T> {
    injector: Injector | undefined;
    factory: Factory<T>;
    dependencies: ParameterAnnotation[];
    properties: {
        [key: string]: PropertyAnnotation;
    };
    provide(injector?: Injector): T;
}
//# sourceMappingURL=provider.d.ts.map