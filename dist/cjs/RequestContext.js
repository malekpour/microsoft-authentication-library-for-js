"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("./Logger");
/**
* @hidden
*/
var RequestContext = (function () {
    function RequestContext(correlationId) {
        if (RequestContext._instance) {
            return RequestContext._instance;
        }
        this._logger = new Logger_1.Logger(correlationId);
        this._correlationId = this._logger.correlationId;
        RequestContext._instance = this;
    }
    Object.defineProperty(RequestContext.prototype, "correlationId", {
        get: function () { return this._correlationId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "logger", {
        get: function () { return this._logger; },
        enumerable: true,
        configurable: true
    });
    return RequestContext;
}());
exports.RequestContext = RequestContext;
//# sourceMappingURL=RequestContext.js.map