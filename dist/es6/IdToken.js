import { Utils } from "./Utils";
/**
* @hidden
*/
export class IdToken {
    constructor(rawIdToken) {
        if (Utils.isEmpty(rawIdToken)) {
            throw new Error("null or empty raw idtoken");
        }
        try {
            this.rawIdToken = rawIdToken;
            const decodedIdToken = Utils.extractIdToken(rawIdToken);
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
}
//# sourceMappingURL=IdToken.js.map