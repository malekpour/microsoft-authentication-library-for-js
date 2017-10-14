import { Utils } from "./Utils";
/**
* @hidden
*/
export class AuthenticationRequestParameters {
    get authority() {
        return this.authorityInstance.CanonicalAuthority;
    }
    constructor(authority, clientId, scope, responseType, redirectUri) {
        this.authorityInstance = authority;
        this.clientId = clientId;
        this.scopes = scope;
        this.responseType = responseType;
        this.redirectUri = redirectUri;
        // randomly generated values
        this.correlationId = Utils.createNewGuid();
        this.state = Utils.createNewGuid();
        this.nonce = Utils.createNewGuid();
        // telemetry information
        this.xClientSku = "MSAL.JS";
        this.xClientVer = Utils.getLibraryVersion();
    }
    createNavigateUrl(scopes) {
        if (!scopes) {
            scopes = [this.clientId];
        }
        if (scopes.indexOf(this.clientId) === -1) {
            scopes.push(this.clientId);
        }
        const str = [];
        str.push("response_type=" + this.responseType);
        this.translateclientIdUsedInScope(scopes);
        str.push("scope=" + encodeURIComponent(this.parseScope(scopes)));
        str.push("client_id=" + encodeURIComponent(this.clientId));
        str.push("redirect_uri=" + encodeURIComponent(this.redirectUri));
        str.push("state=" + encodeURIComponent(this.state));
        str.push("nonce=" + encodeURIComponent(this.nonce));
        str.push("client_info=1");
        //str.push("slice=testslice");
        //str.push("uid=true");
        str.push(`x-client-SKU=${this.xClientSku}`);
        str.push(`x-client-Ver=${this.xClientVer}`);
        if (this.extraQueryParameters) {
            str.push(this.extraQueryParameters);
        }
        str.push("client-request-id=" + encodeURIComponent(this.correlationId));
        let authEndpoint = this.authorityInstance.AuthorizationEndpoint;
        // If the endpoint already has queryparams, lets add to it, otherwise add the first one
        if (authEndpoint.indexOf("?") < 0) {
            authEndpoint += '?';
        }
        else {
            authEndpoint += '&';
        }
        let requestUrl = `${authEndpoint}${str.join("&")}`;
        return requestUrl;
    }
    translateclientIdUsedInScope(scopes) {
        const clientIdIndex = scopes.indexOf(this.clientId);
        if (clientIdIndex >= 0) {
            scopes.splice(clientIdIndex, 1);
            if (scopes.indexOf("openid") === -1) {
                scopes.push("openid");
            }
            if (scopes.indexOf("profile") === -1) {
                scopes.push("profile");
            }
        }
    }
    parseScope(scopes) {
        let scopeList = "";
        if (scopes) {
            for (let i = 0; i < scopes.length; ++i) {
                scopeList += (i !== scopes.length - 1) ? scopes[i] + " " : scopes[i];
            }
        }
        return scopeList;
    }
}
//# sourceMappingURL=AuthenticationRequestParameters.js.map