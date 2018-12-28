import { ParameterAnnotation, PropertyAnnotation } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { Provider } from './provider';

export const PROVIDER_UNREGISTERED = new Error('Provider is not registered with an injector.');

export class BaseProvider<T> implements Provider<T> {

    public injector: Injector | undefined;

    constructor (public factory: Factory<T>,
                 public dependencies: ParameterAnnotation[]               = [],
                 public properties: { [key: string]: PropertyAnnotation } = {}) {}

    provide (injector?: Injector): T {

        if (!injector) injector = this.injector;

        if (!injector) throw PROVIDER_UNREGISTERED;

        // console.group('Provider.provide()');

        // console.log('provider: ', this);
        // console.log('resolving dependencies: ', this.dependencies);

        const dependencies = this._resolveDependencies(injector);

        // console.log('resolved dependencies: ', dependencies);

        // console.log('resolving properties: ', this.properties);

        const properties = this._resolveProperties(injector);

        // console.log('resolved properties: ', properties);

        // console.groupEnd();

        return this._createValue(dependencies, properties);
    }

    protected _createValue (dependencies: any[], properties: { [key: string]: any }): T {

        const value = this.factory(...dependencies);

        return (value instanceof Object) ? Object.assign(value, properties) : value;
    }

    protected _resolveDependencies (injector: Injector): any[] {

        return this.dependencies.map(dependency => injector.resolve(dependency.token, dependency.optional));
    }

    protected _resolveProperties (injector: Injector): { [key: string]: any } {

        return Object.entries(this.properties).reduce((result, [key, value]) => {

            result[key] = injector.resolve(value.token, value.optional);

            return result;

        }, {} as { [key: string]: any });
    }
}
