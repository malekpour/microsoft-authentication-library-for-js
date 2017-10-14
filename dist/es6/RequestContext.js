import { Logger } from './Logger';
/**
* @hidden
*/
export class RequestContext {
    get correlationId() { return this._correlationId; }
    get logger() { return this._logger; }
    constructor(correlationId) {
        if (RequestContext._instance) {
            return RequestContext._instance;
        }
        this._logger = new Logger(correlationId);
        this._correlationId = this._logger.correlationId;
        RequestContext._instance = this;
    }
}
//# sourceMappingURL=RequestContext.js.map