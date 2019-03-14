import { ParameterAnnotations, PropertyAnnotations } from '../annotations';
import { Factory } from '../factories';
import { Injector } from '../injector';
import { Provider } from './provider';

/**
 * @internal
 */
export const PROVIDER_UNREGISTERED = new Error('Provider is not registered with an injector.');

export class BaseProvider<T> implements Provider<T> {

    public injector: Injector | undefined;

    constructor (
        public factory: Factory<T>,
        public dependencies: ParameterAnnotations = [],
        public properties: PropertyAnnotations = {}) { }

    provide (injector?: Injector): T {

        if (!injector) injector = this.injector;

        if (!injector) throw PROVIDER_UNREGISTERED;

        const dependencies = this.resolveDependencies(injector);

        const properties = this.resolveProperties(injector);

        return this.createValue(dependencies, properties);
    }

    resolveDependencies (injector: Injector): any[] {

        return this.dependencies.map(dependency => injector.resolve(dependency.token, dependency.optional));
    }

    resolveProperties (injector: Injector): { [key: string]: any } {

        return Object.entries(this.properties).reduce((result, [key, value]) => {

            result[key] = injector.resolve(value.token, value.optional);

            return result;

        }, {} as { [key: string]: any });
    }

    createValue (dependencies: any[] = [], properties: { [key: string]: any } = {}): T {

        const value = this.factory(...dependencies);

        return (value instanceof Object) ? Object.assign(value, properties) : value;
    }
}
