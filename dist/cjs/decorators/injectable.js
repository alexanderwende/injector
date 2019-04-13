"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("../annotations");
const inject_token_1 = require("../inject-token");
exports.injectable = () => {
    return (target) => {
        const token = new inject_token_1.InjectToken(target.name);
        annotations_1.setTokenAnnotation(target, token);
    };
};
//# sourceMappingURL=injectable.js.map