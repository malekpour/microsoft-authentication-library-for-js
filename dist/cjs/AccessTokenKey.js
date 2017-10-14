"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
/**
* @hidden
*/
var AccessTokenKey = (function () {
    function AccessTokenKey(authority, clientId, scopes, uid, utid) {
        this.authority = authority;
        this.clientId = clientId;
        this.scopes = scopes;
        this.userIdentifier = Utils_1.Utils.base64EncodeStringUrlSafe(uid) + "." + Utils_1.Utils.base64EncodeStringUrlSafe(utid);
    }
    return AccessTokenKey;
}());
exports.AccessTokenKey = AccessTokenKey;
//# sourceMappingURL=AccessTokenKey.js.map