"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tries_1 = __importDefault(require("./Tries"));
function easyTries(options) {
    if (options === void 0) { options = {
        trim: true,
        casing: "sensitive",
        getDepth: 1,
    }; }
    Tries_1.default.prototype.processWithOptions = function (string) {
        return [
            options.trim ? function (x) { return x.trim(); } : function (x) { return x; },
            options.casing === "lower"
                ? function (x) { return x.toLowerCase(); }
                : options.casing === "upper"
                    ? function (x) { return x.toUpperCase(); }
                    : function (x) { return x; },
        ].reduce(function (acc, fn) { return fn(acc); }, string);
    };
    Tries_1.default.prototype.minDepthMet = function (string) {
        return string.length >= options.getDepth;
    };
    return new Tries_1.default();
}
exports.easyTries = easyTries;
