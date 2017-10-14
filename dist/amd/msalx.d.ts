declare module "IUri" {
    /**
    * @hidden
    */
    export interface IUri {
        Protocol: string;
        HostNameAndPort: string;
        AbsolutePath: string;
        Search: string;
        Hash: string;
        PathSegments: string[];
    }
}
declare module "ClientInfo" {
    /**
    * @hidden
    */
    export class ClientInfo {
        private _uid;
        uid: string;
        private _utid;
        utid: string;
        constructor(rawClientInfo: string);
    }
}
declare module "IdToken" {
    /**
    * @hidden
    */
    export class IdToken {
        rawIdToken: string;
        issuer: string;
        objectId: string;
        subject: string;
        tenantId: string;
        version: string;
        preferredName: string;
        name: string;
        homeObjectId: string;
        nonce: string;
        expiration: string;
        constructor(rawIdToken: string);
    }
}
declare module "User" {
    import { ClientInfo } from "ClientInfo";
    import { IdToken } from "IdToken";
    export class User {
        displayableId: string;
        name: string;
        identityProvider: string;
        userIdentifier: string;
        /**
        * @hidden
        */
        constructor(displayableId: string, name: string, identityProvider: string, userIdentifier: string);
        /**
        * @hidden
        */
        static createUser(idToken: IdToken, clientInfo: ClientInfo, authority: string): User;
    }
}
declare module "Utils" {
    import { IUri } from "IUri";
    import { User } from "User";
    /**
    * @hidden
    */
    export class Utils {
        static compareObjects(u1: User, u2: User): boolean;
        static expiresIn(expires: string): number;
        static now(): number;
        static isEmpty(str: string): boolean;
        static extractIdToken(encodedIdToken: string): any;
        static base64EncodeStringUrlSafe(input: string): string;
        static base64DecodeStringUrlSafe(base64IdToken: string): string;
        static encode(input: string): string;
        static utf8Encode(input: string): string;
        static decode(base64IdToken: string): string;
        static decodeJwt(jwtToken: string): any;
        static deserialize(query: string): any;
        static isIntersectingScopes(cachedScopes: Array<string>, scopes: Array<string>): boolean;
        static containsScope(cachedScopes: Array<string>, scopes: Array<string>): boolean;
        static convertToLowerCase(scopes: Array<string>): Array<string>;
        static removeElement(scopes: Array<string>, scope: string): Array<string>;
        static decimalToHex(num: number): string;
        static getLibraryVersion(): string;
        /**
         * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
         * @param href The url
         * @param tenantId The tenant id to replace
         */
        static replaceFirstPath(href: string, tenantId: string): string;
        static createNewGuid(): string;
        static GetUrlComponents(url: string): IUri;
        static CanonicalizeUri(url: string): string;
        /**
         * Checks to see if the url ends with the suffix
         * Required because we are compiling for es5 instead of es6
         * @param url
         * @param str
         */
        static endsWith(url: string, suffix: string): boolean;
    }
}
declare module "ITenantDiscoveryResponse" {
    /**
    * @hidden
    */
    export interface ITenantDiscoveryResponse {
        AuthorizationEndpoint: string;
        EndSessionEndpoint: string;
        Issuer: string;
    }
}
declare module "ErrorMessage" {
    /**
    * @hidden
    */
    export class ErrorMessage {
        static readonly authorityUriInvalidPath: string;
        static readonly authorityUriInsecure: string;
        static readonly invalidAuthorityType: string;
        static readonly unsupportedAuthorityValidation: string;
        static readonly b2cAuthorityUriInvalidPath: string;
    }
}
declare module "XhrClient" {
    /**
    * XHR client for JSON endpoints
    * https://www.npmjs.com/package/async-promise
    * @hidden
    */
    export class XhrClient {
        sendRequestAsync(url: string, method: string, enableCaching?: boolean): Promise<any>;
        protected handleError(responseText: string): any;
    }
}
declare module "Authority" {
    import { IUri } from "IUri";
    /**
    * @hidden
    */
    export enum AuthorityType {
        Aad = 0,
        Adfs = 1,
        B2C = 2,
    }
    /**
    * @hidden
    */
    export abstract class Authority {
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
}
declare module "AadAuthority" {
    import { Authority, AuthorityType } from "Authority";
    /**
    * @hidden
    */
    export class AadAuthority extends Authority {
        private static readonly AadInstanceDiscoveryEndpoint;
        private readonly AadInstanceDiscoveryEndpointUrl;
        constructor(authority: string, validateAuthority: boolean);
        readonly AuthorityType: AuthorityType;
        private static readonly TrustedHostList;
        GetOpenIdConfigurationEndpointAsync(): Promise<string>;
        IsInTrustedHostList(host: string): boolean;
    }
}
declare module "AccessTokenKey" {
    /**
    * @hidden
    */
    export class AccessTokenKey {
        authority: string;
        clientId: string;
        userIdentifier: string;
        scopes: string;
        constructor(authority: string, clientId: string, scopes: string, uid: string, utid: string);
    }
}
declare module "AccessTokenValue" {
    /**
    * @hidden
    */
    export class AccessTokenValue {
        accessToken: string;
        idToken: string;
        expiresIn: string;
        clientInfo: string;
        constructor(accessToken: string, idToken: string, expiresIn: string, clientInfo: string);
    }
}
declare module "AccessTokenCacheItem" {
    import { AccessTokenKey } from "AccessTokenKey";
    import { AccessTokenValue } from "AccessTokenValue";
    /**
    * @hidden
    */
    export class AccessTokenCacheItem {
        key: AccessTokenKey;
        value: AccessTokenValue;
        constructor(key: AccessTokenKey, value: AccessTokenValue);
    }
}
declare module "AuthenticationRequestParameters" {
    import { Authority } from "Authority";
    /**
    * @hidden
    */
    export class AuthenticationRequestParameters {
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
}
declare module "B2cAuthority" {
    import { AadAuthority } from "AadAuthority";
    import { AuthorityType } from "Authority";
    /**
    * @hidden
    */
    export class B2cAuthority extends AadAuthority {
        constructor(authority: string, validateAuthority: boolean);
        readonly AuthorityType: AuthorityType;
        GetOpenIdConfigurationEndpointAsync(): Promise<string>;
    }
}
declare module "AuthorityFactory" {
    import { Authority } from "Authority";
    export class AuthorityFactory {
        private static DetectAuthorityFromUrl(authorityUrl);
        static CreateInstance(authorityUrl: string, validateAuthority: boolean): Authority;
    }
}
declare module "Constants" {
    /**
    * @hidden
    */
    export class Constants {
        static readonly errorDescription: string;
        static readonly error: string;
        static readonly scope: string;
        static readonly acquireTokenUser: string;
        static readonly clientInfo: string;
        static readonly clientId: string;
        static readonly authority: string;
        static readonly idToken: string;
        static readonly accessToken: string;
        static readonly expiresIn: string;
        static readonly sessionState: string;
        static readonly msalClientInfo: string;
        static readonly msalError: string;
        static readonly msalErrorDescription: string;
        static readonly msalSessionState: string;
        static readonly tokenKeys: string;
        static readonly accessTokenKey: string;
        static readonly expirationKey: string;
        static readonly stateLogin: string;
        static readonly stateAcquireToken: string;
        static readonly stateRenew: string;
        static readonly nonceIdToken: string;
        static readonly userName: string;
        static readonly idTokenKey: string;
        static readonly loginRequest: string;
        static readonly loginError: string;
        static readonly renewStatus: string;
        static readonly msal: string;
        static readonly resourceDelimeter: string;
        private static _loadFrameTimeout;
        static loadFrameTimeout: number;
        static readonly tokenRenewStatusCancelled: string;
        static readonly tokenRenewStatusCompleted: string;
        static readonly tokenRenewStatusInProgress: string;
        private static _popUpWidth;
        static popUpWidth: number;
        private static _popUpHeight;
        static popUpHeight: number;
        static readonly login: string;
        static readonly renewToken: string;
        static readonly unknown: string;
    }
    /**
    * @hidden
    */
    export class ErrorCodes {
        static readonly loginProgressError: string;
        static readonly acquireTokenProgressError: string;
        static readonly inputScopesError: string;
        static readonly endpointResolutionError: string;
        static readonly popUpWindowError: string;
        static readonly userLoginError: string;
        static readonly userCancelledError: string;
    }
    /**
    * @hidden
    */
    export class ErrorDescription {
        static readonly loginProgressError: string;
        static readonly acquireTokenProgressError: string;
        static readonly inputScopesError: string;
        static readonly endpointResolutionError: string;
        static readonly popUpWindowError: string;
        static readonly userLoginError: string;
        static readonly userCancelledError: string;
    }
}
declare module "Logger" {
    export interface ILoggerCallback {
        (level: LogLevel, message: string, containsPii: boolean): void;
    }
    export enum LogLevel {
        Error = 0,
        Warning = 1,
        Info = 2,
        Verbose = 3,
    }
    export class Logger {
        /**
        * @hidden
        */
        private static _instance;
        /**
        * @hidden
        */
        private _correlationId;
        correlationId: string;
        /**
        * @hidden
        */
        private _level;
        level: LogLevel;
        /**
        * @hidden
        */
        private _piiLoggingEnabled;
        piiLoggingEnabled: boolean;
        /**
        * @hidden
        */
        private _localCallback;
        localCallback: ILoggerCallback;
        constructor(correlationId: string);
        /**
        * @hidden
        */
        private logMessage(logMessage, logLevel, containsPii);
        /**
        * @hidden
        */
        executeCallback(level: LogLevel, message: string, containsPii: boolean): void;
        /**
        * @hidden
        */
        error(message: string): void;
        /**
        * @hidden
        */
        errorPii(message: string): void;
        /**
        * @hidden
        */
        warning(message: string): void;
        /**
        * @hidden
        */
        warningPii(message: string): void;
        /**
        * @hidden
        */
        info(message: string): void;
        /**
        * @hidden
        */
        infoPii(message: string): void;
        /**
        * @hidden
        */
        verbose(message: string): void;
        /**
        * @hidden
        */
        verbosePii(message: string): void;
    }
}
declare module "RequestContext" {
    import { Logger } from "Logger";
    /**
    * @hidden
    */
    export class RequestContext {
        private static _instance;
        private _correlationId;
        readonly correlationId: string;
        private _logger;
        readonly logger: Logger;
        constructor(correlationId: string);
    }
}
declare module "Storage" {
    import { AccessTokenCacheItem } from "AccessTokenCacheItem";
    /**
    * @hidden
    */
    export class Storage {
        private static _instance;
        private _localStorageSupported;
        private _sessionStorageSupported;
        private _cacheLocation;
        constructor(cacheLocation: string);
        setItem(key: string, value: string): void;
        getItem(key: string): string;
        removeItem(key: string): void;
        clear(): void;
        getAllAccessTokens(clientId: string, userIdentifier: string): Array<AccessTokenCacheItem>;
        removeAcquireTokenEntries(acquireTokenUser: string, acquireTokenStatus: string): void;
        resetCacheItems(): void;
    }
}
declare module "RequestInfo" {
    /**
    * @hidden
    */
    export class TokenResponse {
        valid: boolean;
        parameters: Object;
        stateMatch: boolean;
        stateResponse: string;
        requestType: string;
        constructor();
    }
}
declare module "UserAgentApplication" {
    import { User } from "User";
    /**
    * A type alias of for a tokenReceivedCallback function.
    * @param tokenReceivedCallback.errorDesc error description returned from the STS if API call fails.
    * @param tokenReceivedCallback.token token returned from STS if token request is successful.
    * @param tokenReceivedCallback.error error code returned from the STS if API call fails.
    * @param tokenReceivedCallback.tokenType tokenType returned from the STS if API call is successful. Possible values are: id_token OR access_token.
    */
    export type tokenReceivedCallback = (errorDesc: string, token: string, error: string, tokenType: string) => void;
    export class UserAgentApplication {
        /**
        * @hidden
        */
        private _cacheLocations;
        /**
        * @hidden
        */
        private _cacheLocation;
        /**
        * Used to get the cache location
        */
        readonly cacheLocation: string;
        /**
        * @hidden
        */
        private _interactionModes;
        /**
        * @hidden
        */
        private _interactionMode;
        /**
        * @hidden
        */
        private _requestContext;
        /**
        * @hidden
        */
        private _loginInProgress;
        /**
        * @hidden
        */
        private _acquireTokenInProgress;
        /**
        * @hidden
        */
        private _renewStates;
        /**
        * @hidden
        */
        private _activeRenewals;
        /***
        * @hidden
        */
        private _clockSkew;
        /**
        * @hidden
        */
        private _cacheStorage;
        /**
        * @hidden
        */
        private _tokenReceivedCallback;
        /**
        * @hidden
        */
        private _user;
        /**
        * Client ID assigned to your app by Azure Active Directory.
        */
        clientId: string;
        /***
        * @hidden
        */
        private authorityInstance;
        /**
        * Used to get the authority.
        */
        /**
        * Used to set the authority.
        * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
        * - In Azure AD, it is of the form https://&lt;tenant&gt;/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
        * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
        * - Default value is: "https://login.microsoftonline.com/common"
        */
        authority: string;
        /**
        * Used to turn authority validation on/off.
        * When set to true (default), MSAL will compare the application's authority against well-known URLs templates representing well-formed authorities. It is useful when the authority is obtained at run time to prevent MSAL from displaying authentication prompts from malicious pages.
        */
        validateAuthority: boolean;
        /**
        * The redirect URI of the application, this should be same as the value in the application registration portal.
        * Defaults to `window.location.href`.
        */
        private _redirectUri;
        /**
        * Used to redirect the user to this location after logout.
        * Defaults to `window.location.href`.
        */
        private _postLogoutredirectUri;
        /**
        * Used to redirect the user back to the redirectUri after login.
        * True = redirects user to redirectUri
        */
        private _navigateToLoginRequestUrl;
        /**
        * Used to keep track of opened popup windows.
        */
        private _openedWindows;
        /**
        * Used to track the authentication request.
        */
        private _requestType;
        /**
        * Initialize a UserAgentApplication with a given clientId and authority.
        * @constructor
        * @param {string} clientId - The clientID of your application, you should get this from the application registration portal.
        * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
        * - In Azure AD, it is of the form https://&lt;instance>/&lt;tenant&gt;,\ where &lt;instance&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
        * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenantId&gt;/&lt;policyName&gt;/
        * - Default value is: "https://login.microsoftonline.com/common"
        * @param _tokenReceivedCallback -  The function that will get the call back once this API is completed (either successfully or with a failure).
        * @param {boolean} validateAuthority -  boolean to turn authority validation on/off.
        */
        constructor(clientId: string, authority: string, tokenReceivedCallback: tokenReceivedCallback, options?: {
            validateAuthority?: boolean;
            cacheLocation?: string;
            redirectUri?: string;
            postLogoutRedirectUri?: string;
            navigateToLoginRequestUrl?: boolean;
        });
        /**
        * Initiate the login process by redirecting the user to the STS authorization endpoint.
        * @param {Array.<string>} scopes - Permissions you want included in the access token. Not all scopes are guaranteed to be included in the access token returned.
        * @param {string} extraQueryParameters - Key-value pairs to pass to the authentication server during the interactive authentication flow.
        */
        loginRedirect(scopes?: Array<string>, extraQueryParameters?: string): void;
        /**
        * Initiate the login process by opening a popup window.
        * @param {Array.<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token returned.
        * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the interactive authentication flow.
        * @returns {Promise.<string>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the token or error.
        */
        loginPopup(scopes: Array<string>, extraQueryParameters?: string): Promise<string>;
        /**
         * Used to redirect the browser to the STS authorization endpoint
         * @param {string} urlNavigate - URL of the authorization endpoint
         * @hidden
         */
        private promptUser(urlNavigate);
        /**
        * Used to send the user to the redirect_uri after authentication is complete. The user's bearer token is attached to the URI fragment as an id_token/access_token field.
        * This function also closes the popup window after redirection.
        * @hidden
        * @ignore
        */
        private openWindow(urlNavigate, title, interval, instance, resolve?, reject?);
        /**
        * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
        * Defaults behaviour is to redirect the user to `window.location.href`.
        */
        logout(): void;
        /**
        * Used to configure the popup window for login.
        * @ignore
        * @hidden
        */
        private clearCache();
        /**
        * Configures popup window for login.
        * @ignore
        * @hidden
        */
        private openPopup(urlNavigate, title, popUpWidth, popUpHeight);
        /**
        * Used to validate the scopes input parameter requested  by the developer.
        * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
        * @ignore
        * @hidden
        */
        private validateInputScope(scopes);
        /**
         * Used to remove openid and profile from the list of scopes passed by the developer.These scopes are added by default
         * @hidden
         */
        private filterScopes(scopes);
        /**
        * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
        * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
        * @param {string} expectedState - Unique state identifier (guid).
        * @param {Function} resolve - The resolve function of the promise object.
        * @param {Function} reject - The reject function of the promise object.
        * @ignore
        * @hidden
        */
        private registerCallback(expectedState, scope, resolve, reject);
        /**
        * Used to get token for the specified set of scopes from the cache
        * @param {AuthenticationRequestParameters} authenticationRequest - Request sent to the STS to obtain an id_token/access_token
        * @param {User} user - User for which the scopes were requested
        * @hidden
        */
        private getCachedToken(authenticationRequest, user);
        /**
        * Used to filter all cached items and return a list of unique users based on userIdentifier.
        * @param {Array<User>} Users - users saved in the cache.
        */
        getAllUsers(): Array<User>;
        /**
        * Used to filter users based on userIdentifier
        * @param {Array<User>}  Users - users saved in the cache
        * @ignore
        * @hidden
        */
        private getUniqueUsers(users);
        /**
       * Used to get a unique list of authoritues from the cache
       * @param {Array<AccessTokenCacheItem>}  accessTokenCacheItems - accessTokenCacheItems saved in the cache
       * @ignore
       * @hidden
       */
        private getUniqueAuthority(accessTokenCacheItems, property);
        /**
        * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
        * domain_hint can be one of users/organisations which when added skips the email based discovery process of the user
        * domain_req utid received as part of the clientInfo
        * login_req uid received as part of clientInfo
        * @param {string} urlNavigate - Authentication request url
        * @param {User} user - User for which the token is requested
        * @ignore
        * @hidden
        */
        private addHintParameters(urlNavigate, user);
        /**
        * Checks if the authorization endpoint URL contains query string parameters
        * @ignore
        * @hidden
        */
        private urlContainsQueryStringParameter(name, url);
        /**
        * Used to obtain an access_token by redirecting the user to the authorization endpoint.
        * To renew idToken, clientId should be passed as the only scope in the scopes array.
        * @param {Array<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token. Scopes like 'openid' and 'profile' are sent with every request.
        * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
        * - In Azure AD, it is of the form https://{instance}/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
        * - In Azure B2C, it is of the form https://{instance}/tfp/&lt;tenant&gt;/<policyName>
        * - Default value is: "https://login.microsoftonline.com/common"
        * @param {User} user - The user for which the scopes are requested.The default user is the logged in user.
        * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the  authentication flow.
        */
        acquireTokenRedirect(scopes: Array<string>): void;
        acquireTokenRedirect(scopes: Array<string>, authority: string): void;
        acquireTokenRedirect(scopes: Array<string>, authority: string, user: User): void;
        acquireTokenRedirect(scopes: Array<string>, authority: string, user: User, extraQueryParameters: string): void;
        /**
        * Used to acquire an access token for a new user using interactive authentication via a popup Window.
        * To request an id_token, pass the clientId as the only scope in the scopes array.
        * @param {Array<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token. Scopes like 'openid' and 'profile' are sent with every request.
        * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
        * - In Azure AD, it is of the form https://&lt;tenant&gt;/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
        * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
        * - Default value is: "https://login.microsoftonline.com/common".
        * @param {User} user - The user for which the scopes are requested.The default user is the logged in user.
        * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the  authentication flow.
        * @returns {Promise.<string>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the token or error.
        */
        acquireTokenPopup(scopes: Array<string>): Promise<string>;
        acquireTokenPopup(scopes: Array<string>, authority: string): Promise<string>;
        acquireTokenPopup(scopes: Array<string>, authority: string, user: User): Promise<string>;
        acquireTokenPopup(scopes: Array<string>, authority: string, user: User, extraQueryParameters: string): Promise<string>;
        /**
        * Used to get the token from cache.
        * MSAL will return the cached token if it is not expired.
        * Or it will send a request to the STS to obtain an access_token using a hidden iframe. To renew idToken, clientId should be passed as the only scope in the scopes array.
        * @param {Array<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token. Scopes like 'openid' and 'profile' are sent with every request.
        * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
        * - In Azure AD, it is of the form https://&lt;tenant&gt;/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
        * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
        * - Default value is: "https://login.microsoftonline.com/common"
        * @param {User} user - The user for which the scopes are requested.The default user is the logged in user.
        * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the  authentication flow.
        * @returns {Promise.<string>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Resolved with token or rejected with error.
        */
        acquireTokenSilent(scopes: Array<string>, authority?: string, user?: User, extraQueryParameters?: string): Promise<string>;
        /**
        * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
        * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
        * @ignore
        * @hidden
        */
        private loadFrameTimeout(urlNavigate, frameName, scope);
        /**
        * Loads iframe with authorization endpoint URL
        * @ignore
        * @hidden
        */
        private loadFrame(urlNavigate, frameName);
        /**
        * Adds the hidden iframe for silent token renewal.
        * @ignore
        * @hidden
        */
        private addAdalFrame(iframeId);
        /**
        * Acquires access token using a hidden iframe.
        * @ignore
        * @hidden
        */
        private renewToken(scopes, resolve, reject, user, authenticationRequest, extraQueryParameters?);
        /**
        * Renews idtoken for app's own backend when clientId is passed as a single scope in the scopes array.
        * @ignore
        * @hidden
        */
        private renewIdToken(scopes, resolve, reject, user, authenticationRequest, extraQueryParameters?);
        /**
         * Returns the signed in user (received from a user object created at the time of login) or null.
         */
        getUser(): User;
        /**
        * This method must be called for processing the response received from the STS. It extracts the hash, processes the token or error information and saves it in the cache. It then
        * calls the registered callbacks in case of redirect or resolves the promises with the result.
        * @param {string} [hash=window.location.hash] - Hash fragment of Url.
        * @param {Function} resolve - The resolve function of the promise object.
        * @param {Function} reject - The reject function of the promise object.
        * @hidden
        */
        handleAuthenticationResponse(hash: string): void;
        /**
        * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
        * @param {string} authority authority received in the redirect response from AAD.
        * @param {TokenResponse} requestInfo an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
        * @param {User} user user object for which scopes are consented for. The default user is the logged in user.
        * @param {ClientInfo} clientInfo clientInfo received as part of the response comprising of fields uid and utid.
        * @param {IdToken} idToken idToken received as part of the response.
        * @ignore
        * @private
        * @hidden
        */
        private saveAccessToken(authority, tokenResponse, user, clientInfo, idToken);
        /**
        * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the user object.
        * @ignore
        * @hidden
        */
        private saveTokenFromHash(tokenResponse);
        /**
        * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
        * @param {string} hash - Hash passed from redirect page.
        * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
        * @hidden
        */
        isCallback(hash: string): boolean;
        /**
        * Returns the anchor part(#) of the URL
        * @ignore
        * @hidden
        */
        private getHash(hash);
        /**
         * Creates a requestInfo object from the URL fragment and returns it.
         * @param {string} hash  -  Hash passed from redirect page
         * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
         * @ignore
         * @hidden
         */
        private getRequestInfo(hash);
        /**
         * Extracts scope value from the state sent with the authentication request.
         * @returns {string} scope.
         * @ignore
         * @hidden
         */
        private getScopeFromState(state);
        /**
         * Returns whether current window is in ifram for token renewal
         * @ignore
         * @hidden
         */
        private isInIframe();
    }
}
declare module "index" {
    export * from "UserAgentApplication";
}
