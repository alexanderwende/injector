import { DependencyAnnotation, ParameterAnnotations, PropertyAnnotations } from '../annotations/index.js';
import { Factory } from '../factories/index.js';
import { Injector } from '../injector.js';
/**
 * A provider's parameter dependencies
 *
 * @remarks
 * Parameter dependencies are the dependencies that will be passed into the provider's
 * factory method. Dependencies can be {@link DependencyAnnotation}s - in which case their
 * tokens will be resolved through the provider - or actual values - in which case they
 * will be passed to the factory method as-is.
 *
 * Parameter dependencies can be specified as arrays in the order of the factory method's
 * function parameters or as Maps, where the key represents the index of the function
 * parameter. Internally the provider will convert them into Maps.
 */
export declare type ParameterDependencies = (DependencyAnnotation | any)[] | Map<number, DependencyAnnotation | any> | ParameterAnnotations;
/**
 * A provider's property dependencies
 *
 * @remarks
 * Property dependencies are the dependencies that will be set on the provider's factory
 * method return value. Dependencies can be {@link DependencyAnnotation}s - in which case
 * their tokens will be resolved through the provider - or actual values - in which case
 * they will be set on the factory method's return value as-is.
 *
 * Property dependencies can be specified as objects with keys matching the appropriate
 * property keys of the factory method's return value or as Maps, where the key represents
 * the matching property key of the factory method's return value. Internally the provider
 * will convert them into Maps.
 */
export declare type PropertyDependencies = {
    [key: string]: DependencyAnnotation | any;
    [key: number]: DependencyAnnotation | any;
} | Map<PropertyKey, DependencyAnnotation | any> | PropertyAnnotations;
/**
 * The generic provider interface
 */
export interface Provider<T> {
    injector: Injector | undefined;
    factory: Factory<T>;
    parameters: ParameterDependencies;
    properties: PropertyDependencies;
    provide(injector?: Injector): T;
}
//# sourceMappingURL=provider.d.ts.map