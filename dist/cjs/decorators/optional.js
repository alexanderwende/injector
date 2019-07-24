"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../annotations/index.js");
exports.optional = () => {
    return (target, propertyKey, parameterIndex) => {
        if (typeof parameterIndex === 'number') {
            // decorator is a parameter decorator
            index_js_1.setParameterAnnotation(target, parameterIndex, { optional: true });
        }
        else {
            // decorator is a property decorator
            index_js_1.setPropertyAnnotation(target.constructor, propertyKey, { optional: true });
        }
    };
};
//# sourceMappingURL=optional.js.map