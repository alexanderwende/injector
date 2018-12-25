import { InjectToken } from '../inject-token';
import { setTokenAnnotation } from '../annotations';
import { Constructor } from './index';

export const injectable = () => {

    return (target: Constructor<object>) => {

        const token = new InjectToken(target);

        setTokenAnnotation(target, token);
    };
};
