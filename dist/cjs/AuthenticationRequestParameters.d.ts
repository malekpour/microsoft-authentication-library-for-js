import { Authority } from "./Authority";
/**
* @hidden
*/
export declare class AuthenticationRequestParameters {
    authorityInstance: Authority;
    clientId: string;
    nonce: string;
    state: string;
    correlationId: string;
    xClientVer: string;
    xClientSku: string;
    scopes: Array<string>;
    responseType: string;
    promptValue: string;
    extraQueryParameters: string;
    loginHint: string;
    domainHint: string;
    redirectUri: string;
    readonly authority: string;
    constructor(authority: Authority, clientId: string, scope: Array<string>, responseType: string, redirectUri: string);
    createNavigateUrl(scopes: Array<string>): string;
    translateclientIdUsedInScope(scopes: Array<string>): void;
    parseScope(scopes: Array<string>): string;
}
