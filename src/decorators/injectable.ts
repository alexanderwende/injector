import { setTokenAnnotation } from '../annotations/index.js';
import { InjectToken } from '../inject-token.js';
import { Constructor } from '../utils/index.js';

export const injectable = () => {

    return (target: Constructor<object>) => {

        const token = new InjectToken(target.name);

        setTokenAnnotation(target, token);
    };
};
