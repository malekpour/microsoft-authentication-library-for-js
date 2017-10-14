import { Authority, AuthorityType } from "./Authority";
/**
* @hidden
*/
export declare class AadAuthority extends Authority {
    private static readonly AadInstanceDiscoveryEndpoint;
    private readonly AadInstanceDiscoveryEndpointUrl;
    constructor(authority: string, validateAuthority: boolean);
    readonly AuthorityType: AuthorityType;
    private static readonly TrustedHostList;
    GetOpenIdConfigurationEndpointAsync(): Promise<string>;
    IsInTrustedHostList(host: string): boolean;
}
