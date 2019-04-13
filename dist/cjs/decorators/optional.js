"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("../annotations");
exports.optional = () => {
    return (target, propertyKey, parameterIndex) => {
        if (typeof parameterIndex === 'number') {
            // decorator is a parameter decorator
            annotations_1.setParameterAnnotation(target, parameterIndex, { optional: true });
        }
        else {
            // decorator is a property decorator
            annotations_1.setPropertyAnnotation(target.constructor, propertyKey, { optional: true });
        }
    };
};
//# sourceMappingURL=optional.js.map