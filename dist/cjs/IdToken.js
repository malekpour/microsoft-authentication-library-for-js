"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
/**
* @hidden
*/
var IdToken = (function () {
    function IdToken(rawIdToken) {
        if (Utils_1.Utils.isEmpty(rawIdToken)) {
            throw new Error("null or empty raw idtoken");
        }
        try {
            this.rawIdToken = rawIdToken;
            var decodedIdToken = Utils_1.Utils.extractIdToken(rawIdToken);
            if (decodedIdToken) {
                if (decodedIdToken.hasOwnProperty("iss")) {
                    this.issuer = decodedIdToken.iss;
                }
                if (decodedIdToken.hasOwnProperty("oid")) {
                    this.objectId = decodedIdToken.oid;
                }
                if (decodedIdToken.hasOwnProperty("sub")) {
                    this.subject = decodedIdToken.sub;
                }
                if (decodedIdToken.hasOwnProperty("tid")) {
                    this.tenantId = decodedIdToken.tid;
                }
                if (decodedIdToken.hasOwnProperty("ver")) {
                    this.version = decodedIdToken.ver;
                }
                if (decodedIdToken.hasOwnProperty("preferred_username")) {
                    this.preferredName = decodedIdToken.preferred_username;
                }
                if (decodedIdToken.hasOwnProperty("name")) {
                    this.name = decodedIdToken.name;
                }
                if (decodedIdToken.hasOwnProperty("nonce")) {
                    this.nonce = decodedIdToken.nonce;
                }
                if (decodedIdToken.hasOwnProperty("exp")) {
                    this.expiration = decodedIdToken.exp;
                }
            }
        }
        catch (e) {
            throw new Error("Failed to parse the returned id token");
        }
    }
    return IdToken;
}());
exports.IdToken = IdToken;
//# sourceMappingURL=IdToken.js.map