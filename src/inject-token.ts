import { Constructor, isConstructor, isSymbol } from './decorators';

export class InjectToken<T = any> {

    description: string;

    value: Symbol;

    constructor (value: Constructor<T> | symbol | string) {

        if (isConstructor(value)) {

            this.value       = Symbol.for(value.name);
            this.description = value.name;

        } else if (isSymbol(value)) {

            this.value       = value;
            this.description = value.toString();

        } else {

            this.value       = Symbol.for(value);
            this.description = value;
        }
    }
}