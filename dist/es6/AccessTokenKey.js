import { Utils } from "./Utils";
/**
* @hidden
*/
export class AccessTokenKey {
    constructor(authority, clientId, scopes, uid, utid) {
        this.authority = authority;
        this.clientId = clientId;
        this.scopes = scopes;
        this.userIdentifier = Utils.base64EncodeStringUrlSafe(uid) + "." + Utils.base64EncodeStringUrlSafe(utid);
    }
}
//# sourceMappingURL=AccessTokenKey.js.map