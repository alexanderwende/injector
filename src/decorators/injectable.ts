import { setTokenAnnotation } from '../annotations';
import { InjectToken } from '../inject-token';
import { Constructor } from '../utils';

export const injectable = () => {

    return (target: Constructor<object>) => {

        const token = new InjectToken(target);

        setTokenAnnotation(target, token);
    };
};
