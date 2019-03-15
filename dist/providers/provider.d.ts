import { ParameterAnnotations, PropertyAnnotations } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
export interface Provider<T> {
    injector: Injector | undefined;
    factory: Factory<T>;
    dependencies: ParameterAnnotations;
    properties: PropertyAnnotations;
    provide(injector?: Injector): T;
}
//# sourceMappingURL=provider.d.ts.map