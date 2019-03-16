import { ParameterAnnotations, PropertyAnnotations } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';

export interface Provider<T> {
    injector: Injector | undefined;
    factory: Factory<T>;
    parameters: ParameterAnnotations;
    properties: PropertyAnnotations;

    provide (injector?: Injector): T;
}
