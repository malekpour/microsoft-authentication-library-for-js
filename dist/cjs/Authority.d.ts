import { IUri } from "./IUri";
/**
* @hidden
*/
export declare enum AuthorityType {
    Aad = 0,
    Adfs = 1,
    B2C = 2,
}
/**
* @hidden
*/
export declare abstract class Authority {
    protected constructor(authority: string, validateAuthority: boolean);
    readonly abstract AuthorityType: AuthorityType;
    IsValidationEnabled: boolean;
    readonly Tenant: string;
    private tenantDiscoveryResponse;
    readonly AuthorizationEndpoint: string;
    readonly EndSessionEndpoint: string;
    readonly SelfSignedJwtAudience: string;
    private validateResolved();
    CanonicalAuthority: string;
    private canonicalAuthority;
    private canonicalAuthorityUrlComponents;
    readonly CanonicalAuthorityUrlComponents: IUri;
    protected readonly DefaultOpenIdConfigurationEndpoint: string;
    private validateAsUri();
    private DiscoverEndpoints(openIdConfigurationEndpoint);
    ResolveEndpointsAsync(): Promise<Authority>;
    abstract GetOpenIdConfigurationEndpointAsync(): Promise<string>;
}
