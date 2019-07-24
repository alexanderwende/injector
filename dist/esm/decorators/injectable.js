import { setTokenAnnotation } from '../annotations/index.js';
import { InjectToken } from '../inject-token.js';
export const injectable = () => {
    return (target) => {
        const token = new InjectToken(target.name);
        setTokenAnnotation(target, token);
    };
};
//# sourceMappingURL=injectable.js.map