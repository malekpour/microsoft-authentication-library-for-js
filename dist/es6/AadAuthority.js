import { Authority, AuthorityType } from "./Authority";
import { XhrClient } from "./XhrClient";
/**
* @hidden
*/
export class AadAuthority extends Authority {
    constructor(authority, validateAuthority) {
        super(authority, validateAuthority);
    }
    get AadInstanceDiscoveryEndpointUrl() {
        return `${AadAuthority.AadInstanceDiscoveryEndpoint}?api-version=1.0&authorization_endpoint=${this.CanonicalAuthority}oauth2/v2.0/authorize`;
    }
    get AuthorityType() {
        return AuthorityType.Aad;
    }
    /*
    * Returns a promise which resolves to the OIDC endpoint
    * Only responds with the endpoint
    */
    GetOpenIdConfigurationEndpointAsync() {
        var resultPromise = new Promise((resolve, reject) => resolve(this.DefaultOpenIdConfigurationEndpoint));
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        let host = this.CanonicalAuthorityUrlComponents.HostNameAndPort;
        if (this.IsInTrustedHostList(host)) {
            return resultPromise;
        }
        let client = new XhrClient();
        return client.sendRequestAsync(this.AadInstanceDiscoveryEndpointUrl, "GET", true)
            .then((response) => {
            return response.tenant_discovery_endpoint;
        });
    }
    /*
    * Checks to see if the host is in a list of trusted hosts
    * @param {string} The host to look up
    */
    IsInTrustedHostList(host) {
        return AadAuthority.TrustedHostList[host.toLowerCase()];
    }
}
AadAuthority.AadInstanceDiscoveryEndpoint = "https://login.microsoftonline.com/common/discovery/instance";
AadAuthority.TrustedHostList = {
    "login.windows.net": "login.windows.net",
    "login.chinacloudapi.cn": "login.chinacloudapi.cn",
    "login.cloudgovapi.us": "login.cloudgovapi.us",
    "login.microsoftonline.com": "login.microsoftonline.com",
    "login.microsoftonline.de": "login.microsoftonline.de"
};
//# sourceMappingURL=AadAuthority.js.map