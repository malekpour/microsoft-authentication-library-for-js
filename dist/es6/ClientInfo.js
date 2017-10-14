import { Utils } from "./Utils";
/**
* @hidden
*/
export class ClientInfo {
    get uid() {
        return this._uid ? this._uid : "";
    }
    set uid(uid) {
        this._uid = uid;
    }
    get utid() {
        return this._utid ? this._utid : "";
    }
    set utid(utid) {
        this._utid = utid;
    }
    constructor(rawClientInfo) {
        if (!rawClientInfo || Utils.isEmpty(rawClientInfo)) {
            this.uid = "";
            this.utid = "";
            return;
        }
        try {
            const decodedClientInfo = Utils.base64DecodeStringUrlSafe(rawClientInfo);
            const clientInfo = JSON.parse(decodedClientInfo);
            if (clientInfo) {
                if (clientInfo.hasOwnProperty("uid")) {
                    this.uid = clientInfo.uid;
                }
                if (clientInfo.hasOwnProperty("utid")) {
                    this.utid = clientInfo.utid;
                }
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
//# sourceMappingURL=ClientInfo.js.map