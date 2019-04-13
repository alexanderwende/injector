import { setTokenAnnotation } from '../annotations';
import { InjectToken } from '../inject-token';
export const injectable = () => {
    return (target) => {
        const token = new InjectToken(target.name);
        setTokenAnnotation(target, token);
    };
};
//# sourceMappingURL=injectable.js.map