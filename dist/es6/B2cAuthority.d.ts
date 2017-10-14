import { AadAuthority } from "./AadAuthority";
import { AuthorityType } from "./Authority";
/**
* @hidden
*/
export declare class B2cAuthority extends AadAuthority {
    constructor(authority: string, validateAuthority: boolean);
    readonly AuthorityType: AuthorityType;
    GetOpenIdConfigurationEndpointAsync(): Promise<string>;
}
