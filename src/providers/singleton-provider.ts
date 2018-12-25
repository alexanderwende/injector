import { ClassProvider } from './class-provider';

export class SingletonProvider<T> extends ClassProvider<T> {

    protected _instance: T | undefined;

    provide (): T {

        if (!this._instance) this._instance = super.provide();

        return this._instance;
    }
}
