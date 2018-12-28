export interface Factory<T> {
    (...dependencies: any[]): T;
}