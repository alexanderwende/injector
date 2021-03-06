## API Report File for "injector"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export class BaseProvider<T> implements Provider<T> {
    constructor(factory: Factory<T>, parameters?: ParameterDependencies, properties?: PropertyDependencies);
    protected createValue(parameters?: any[], properties?: any): T;
    // (undocumented)
    factory: Factory<T>;
    // (undocumented)
    injector: Injector | undefined;
    // (undocumented)
    parameters: Map<number, DependencyAnnotation | any>;
    // (undocumented)
    properties: Map<PropertyKey, DependencyAnnotation | any>;
    provide(injector?: Injector): T;
    protected resolveParameters(injector: Injector): any[];
    protected resolveProperties(injector: Injector): any;
}

// Warning: (ae-internal-missing-underscore) The name "CLASS_NOT_PROVIDABLE" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export const CLASS_NOT_PROVIDABLE: (constructorFn: Constructor<any>) => Error;

// Warning: (ae-internal-missing-underscore) The name "CLASS_NOT_RESOLVABLE" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export const CLASS_NOT_RESOLVABLE: (constructorFn: Constructor<any>) => Error;

// @public (undocumented)
export interface ClassFactory<T> extends Factory<T> {
    // (undocumented)
    (...dependencies: any[]): T;
}

// @public
export class ClassProvider<T> extends BaseProvider<T> {
    constructor(constructorFn: Constructor<T>, parameters?: ParameterDependencies, properties?: PropertyDependencies);
}

// @public (undocumented)
export type Constructor<T = any> = {
    new (...args: any[]): T;
};

// @public (undocumented)
export const createClassFactory: <T>(constructorFn: Constructor<T>) => ClassFactory<T>;

// @public (undocumented)
export const createSingletonFactory: <T>(constructorFn: Constructor<T>) => SingletonFactory<T>;

// @public (undocumented)
export const createValueFactory: <T>(value: T) => ValueFactory<T>;

// @public
export class DependencyAnnotation<T = any> {
    constructor(token: InjectToken<T> | Constructor<T>, optional?: boolean);
    // (undocumented)
    optional: boolean;
    // (undocumented)
    token: InjectToken<T> | Constructor<T>;
}

// @public (undocumented)
export interface Factory<T> {
    // (undocumented)
    (...dependencies: any[]): T;
}

// Warning: (ae-internal-missing-underscore) The name "getParameterAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const getParameterAnnotation: (target: Constructor<any>, parameterIndex: number) => DependencyAnnotation<any>;

// Warning: (ae-internal-missing-underscore) The name "getParameterAnnotations" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const getParameterAnnotations: (target: Constructor<any>) => Map<number, DependencyAnnotation<any>>;

// Warning: (ae-internal-missing-underscore) The name "getPropertyAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const getPropertyAnnotation: (target: Constructor<any>, propertyKey: string | number | symbol) => DependencyAnnotation<any>;

// Warning: (ae-internal-missing-underscore) The name "getPropertyAnnotations" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const getPropertyAnnotations: (target: Constructor<any>) => Map<string | number | symbol, DependencyAnnotation<any>>;

// Warning: (ae-internal-missing-underscore) The name "getTokenAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const getTokenAnnotation: <T>(target: Constructor<T>) => InjectToken<T> | undefined;

// @public
export const inject: <T>(injectToken?: InjectToken<T> | undefined) => (target: Object, propertyKey: string | number | symbol, parameterIndex?: number | undefined) => void;

// @public (undocumented)
export const injectable: () => (target: Constructor<object>) => void;

// @public
export class Injector {
    constructor(parent?: Injector);
    constructor(config?: Partial<InjectorConfiguration>);
    constructor(parent?: Injector, config?: Partial<InjectorConfiguration>);
    // @internal (undocumented)
    protected _getProvider<T>(token: InjectToken<T>): Provider<T> | undefined;
    register<T>(constructorOrToken: Constructor<T> | InjectToken<T>, provider: Provider<T>): void;
    resolve<T>(target: Constructor<T> | InjectToken<T>, optional?: boolean): T | undefined;
    // @internal (undocumented)
    protected _resolveConstructor<T>(constructorFn: Constructor<T>, optional?: boolean): T | undefined;
    // @internal (undocumented)
    protected _resolveToken<T>(token: InjectToken<T>, optional?: boolean): T | undefined;
}

// @public
export interface InjectorConfiguration {
    defaultProvider: {
        new <T = any>(constructor: Constructor<T>): Provider<T>;
    };
}

// @public
export class InjectToken<T = any> {
    constructor(description: string);
    // (undocumented)
    description: string;
}

// Warning: (ae-internal-missing-underscore) The name "NO_PROVIDER" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export const NO_PROVIDER: (token: InjectToken<any>) => Error;

// @public (undocumented)
export const optional: () => (target: Object, propertyKey: string | symbol, parameterIndex?: number | undefined) => void;

// @public
export type ParameterAnnotations = Map<number, DependencyAnnotation>;

// @public
export type ParameterDependencies = (DependencyAnnotation | any)[] | Map<number, DependencyAnnotation | any> | ParameterAnnotations;

// @public
export type PropertyAnnotations = Map<PropertyKey, DependencyAnnotation>;

// @public
export type PropertyDependencies = {
    [key: string]: DependencyAnnotation | any;
    [key: number]: DependencyAnnotation | any;
} | Map<PropertyKey, DependencyAnnotation | any> | PropertyAnnotations;

// @public
export interface Provider<T> {
    // (undocumented)
    factory: Factory<T>;
    // (undocumented)
    injector: Injector | undefined;
    // (undocumented)
    parameters: ParameterDependencies;
    // (undocumented)
    properties: PropertyDependencies;
    // (undocumented)
    provide(injector?: Injector): T;
}

// Warning: (ae-internal-missing-underscore) The name "PROVIDER_UNREGISTERED" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export const PROVIDER_UNREGISTERED: Error;

// @public
export interface ProviderConfiguration<T = any> {
    // (undocumented)
    provider: Provider<T>;
    // (undocumented)
    token: InjectToken<T> | Constructor<T>;
}

// Warning: (ae-internal-missing-underscore) The name "setParameterAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const setParameterAnnotation: (target: Constructor<any>, parameterIndex: number, annotation: Partial<DependencyAnnotation<any>>) => void;

// Warning: (ae-internal-missing-underscore) The name "setPropertyAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const setPropertyAnnotation: (target: Constructor<any>, propertyKey: string | number | symbol, annotation: Partial<DependencyAnnotation<any>>) => void;

// Warning: (ae-internal-missing-underscore) The name "setTokenAnnotation" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal
export const setTokenAnnotation: <T>(target: Constructor<T>, token: InjectToken<T>) => void;

// @public (undocumented)
export interface SingletonFactory<T> extends Factory<T> {
    // (undocumented)
    (...dependencies: any[]): T;
}

// @public
export class SingletonProvider<T> extends ClassProvider<T> {
    // (undocumented)
    protected _instance: T | undefined;
    // (undocumented)
    provide(injector?: Injector): T;
}

// @public (undocumented)
export interface ValueFactory<T> extends Factory<T> {
    // (undocumented)
    (): T;
}

// @public
export class ValueProvider<T> extends BaseProvider<T> {
    constructor(value: T);
}


// (No @packageDocumentation comment for this package)

```
