import { AadAuthority } from "./AadAuthority";
import { AuthorityType } from "./Authority";
import { Utils } from "./Utils";
import { ErrorMessage } from "./ErrorMessage";
/**
* @hidden
*/
export class B2cAuthority extends AadAuthority {
    constructor(authority, validateAuthority) {
        super(authority, validateAuthority);
        let urlComponents = Utils.GetUrlComponents(authority);
        let pathSegments = urlComponents.PathSegments;
        if (pathSegments.length < 3) {
            throw ErrorMessage.b2cAuthorityUriInvalidPath;
        }
        this.CanonicalAuthority = `https://${urlComponents.HostNameAndPort}/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}/`;
    }
    get AuthorityType() {
        return AuthorityType.B2C;
    }
    /*
    * Returns a promise with the TenantDiscoveryEndpoint
    */
    GetOpenIdConfigurationEndpointAsync() {
        var resultPromise = new Promise((resolve, reject) => resolve(this.DefaultOpenIdConfigurationEndpoint));
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        if (this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)) {
            return resultPromise;
        }
        return new Promise((resolve, reject) => reject(ErrorMessage.unsupportedAuthorityValidation));
    }
}
//# sourceMappingURL=B2cAuthority.js.map