import { ClassProvider } from './class-provider';
export declare class SingletonProvider<T> extends ClassProvider<T> {
    protected _instance: T | undefined;
    provide(): T;
}
//# sourceMappingURL=singleton-provider.d.ts.map