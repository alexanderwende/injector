"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../annotations/index.js");
const inject_token_js_1 = require("../inject-token.js");
exports.injectable = () => {
    return (target) => {
        const token = new inject_token_js_1.InjectToken(target.name);
        index_js_1.setTokenAnnotation(target, token);
    };
};
//# sourceMappingURL=injectable.js.map