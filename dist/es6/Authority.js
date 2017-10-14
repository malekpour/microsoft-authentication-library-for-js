import { Utils } from "./Utils";
import { ErrorMessage } from "./ErrorMessage";
import { XhrClient } from "./XhrClient";
//import { AadAuthority } from "./AadAuthority";
//import { B2cAuthority } from "./B2cAuthority";
/**
* @hidden
*/
export var AuthorityType;
(function (AuthorityType) {
    AuthorityType[AuthorityType["Aad"] = 0] = "Aad";
    AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
    AuthorityType[AuthorityType["B2C"] = 2] = "B2C";
})(AuthorityType || (AuthorityType = {}));
/**
* @hidden
*/
export class Authority {
    constructor(authority, validateAuthority) {
        this.IsValidationEnabled = validateAuthority;
        this.CanonicalAuthority = authority;
        this.validateAsUri();
    }
    get Tenant() {
        return this.CanonicalAuthorityUrlComponents.PathSegments[0];
    }
    get AuthorizationEndpoint() {
        this.validateResolved();
        return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace("{tenant}", this.Tenant);
    }
    get EndSessionEndpoint() {
        this.validateResolved();
        return this.tenantDiscoveryResponse.EndSessionEndpoint.replace("{tenant}", this.Tenant);
    }
    get SelfSignedJwtAudience() {
        this.validateResolved();
        return this.tenantDiscoveryResponse.Issuer.replace("{tenant}", this.Tenant);
    }
    validateResolved() {
        if (!this.tenantDiscoveryResponse) {
            throw "Please call ResolveEndpointsAsync first";
        }
    }
    /*
    * A URL that is the authority set by the developer
    */
    get CanonicalAuthority() {
        return this.canonicalAuthority;
    }
    ;
    set CanonicalAuthority(url) {
        this.canonicalAuthority = Utils.CanonicalizeUri(url);
        this.canonicalAuthorityUrlComponents = null;
    }
    get CanonicalAuthorityUrlComponents() {
        if (!this.canonicalAuthorityUrlComponents) {
            this.canonicalAuthorityUrlComponents = Utils.GetUrlComponents(this.CanonicalAuthority);
        }
        return this.canonicalAuthorityUrlComponents;
    }
    /*
    * // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
    */
    get DefaultOpenIdConfigurationEndpoint() {
        return `${this.CanonicalAuthority}v2.0/.well-known/openid-configuration`;
    }
    /*
    * Given a string, validate that it is of the form https://domain/path
    */
    validateAsUri() {
        let components;
        try {
            components = this.CanonicalAuthorityUrlComponents;
        }
        catch (e) {
            throw ErrorMessage.invalidAuthorityType;
        }
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
            throw ErrorMessage.authorityUriInsecure;
        }
        ;
        if (!components.PathSegments || components.PathSegments.length < 1) {
            throw ErrorMessage.authorityUriInvalidPath;
        }
    }
    /*
    * Calls the OIDC endpoint and returns the response
    */
    DiscoverEndpoints(openIdConfigurationEndpoint) {
        let client = new XhrClient();
        return client.sendRequestAsync(openIdConfigurationEndpoint, "GET", /*enableCaching:*/ true)
            .then((response) => {
            return {
                AuthorizationEndpoint: response.authorization_endpoint,
                EndSessionEndpoint: response.end_session_endpoint,
                Issuer: response.issuer
            };
        });
    }
    /*
    * Returns a promise.
    * Checks to see if the authority is in the cache
    * Discover endpoints via openid-configuration
    * If successful, caches the endpoint for later use in OIDC
    */
    ResolveEndpointsAsync() {
        let openIdConfigurationEndpoint = "";
        return this.GetOpenIdConfigurationEndpointAsync().then(openIdConfigurationEndpointResponse => {
            openIdConfigurationEndpoint = openIdConfigurationEndpointResponse;
            return this.DiscoverEndpoints(openIdConfigurationEndpoint);
        }).then((tenantDiscoveryResponse) => {
            this.tenantDiscoveryResponse = tenantDiscoveryResponse;
            return this;
        });
    }
}
//# sourceMappingURL=Authority.js.map