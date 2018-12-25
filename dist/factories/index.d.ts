export interface Factory<T> {
    (...dependencies: any[]): T;
}
export * from './class-factory';
export * from './singleton-factory';
export * from './value-factory';
