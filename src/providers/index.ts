import { Factory } from '../factories';
import { Injector } from '../injector';
import { ParameterAnnotation, PropertyAnnotation } from '../annotations';

export interface Provider<T> {
    injector: Injector | undefined;
    factory: Factory<T>;
    dependencies: ParameterAnnotation[];
    properties: { [key: string]: PropertyAnnotation };

    provide (): T;
}

export * from './base-provider';
export * from './class-provider';
export * from './singleton-provider';
export * from './value-provider';
