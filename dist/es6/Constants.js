/**
* @hidden
*/
export class Constants {
    static get errorDescription() { return "error_description"; }
    static get error() { return "error"; }
    static get scope() { return "scope"; }
    static get acquireTokenUser() { return "msal_acquireTokenUser"; }
    static get clientInfo() { return "client_info"; }
    static get clientId() { return "clientId"; }
    static get authority() { return "authority"; }
    static get idToken() { return "id_token"; }
    static get accessToken() { return "access_token"; }
    static get expiresIn() { return "expires_in"; }
    static get sessionState() { return "session_state"; }
    static get msalClientInfo() { return "msal.client.info"; }
    static get msalError() { return "msal.error"; }
    static get msalErrorDescription() { return "msal.error.description"; }
    static get msalSessionState() { return "msal.session.state"; }
    static get tokenKeys() { return "msal.token.keys"; }
    static get accessTokenKey() { return "msal.access.token.key"; }
    static get expirationKey() { return "msal.expiration.key"; }
    static get stateLogin() { return "msal.state.login"; }
    static get stateAcquireToken() { return "msal.state.acquireToken"; }
    static get stateRenew() { return "msal.state.renew"; }
    static get nonceIdToken() { return "msal.nonce.idtoken"; }
    static get userName() { return "msal.username"; }
    static get idTokenKey() { return "msal.idtoken"; }
    static get loginRequest() { return "msal.login.request"; }
    static get loginError() { return "msal.login.error"; }
    static get renewStatus() { return "msal.token.renew.status"; }
    static get msal() { return "msal"; }
    static get resourceDelimeter() { return "|"; }
    static get loadFrameTimeout() {
        return this._loadFrameTimeout;
    }
    ;
    static set loadFrameTimeout(timeout) {
        this._loadFrameTimeout = timeout;
    }
    ;
    static get tokenRenewStatusCancelled() { return "Canceled"; }
    static get tokenRenewStatusCompleted() { return "Completed"; }
    static get tokenRenewStatusInProgress() { return "In Progress"; }
    static get popUpWidth() { return this._popUpWidth; }
    static set popUpWidth(width) {
        this._popUpWidth = width;
    }
    ;
    static get popUpHeight() { return this._popUpHeight; }
    static set popUpHeight(height) {
        this._popUpHeight = height;
    }
    ;
    static get login() { return "LOGIN"; }
    static get renewToken() { return "renewToken"; }
    static get unknown() { return "UNKNOWN"; }
}
Constants._loadFrameTimeout = 6000;
Constants._popUpWidth = 483;
Constants._popUpHeight = 600;
/**
* @hidden
*/
export class ErrorCodes {
    static get loginProgressError() { return "login_progress_error"; }
    static get acquireTokenProgressError() { return "acquiretoken_progress_error"; }
    static get inputScopesError() { return "input_scopes_error"; }
    static get endpointResolutionError() { return "endpoints_resolution_error"; }
    static get popUpWindowError() { return "popup_window_error"; }
    static get userLoginError() { return "user_login_error"; }
    static get userCancelledError() { return "user_cancelled"; }
}
/**
* @hidden
*/
export class ErrorDescription {
    static get loginProgressError() { return "Login is in progress"; }
    static get acquireTokenProgressError() { return "Acquire token is in progress"; }
    static get inputScopesError() { return "Invalid value of input scopes provided"; }
    static get endpointResolutionError() { return "Endpoints cannot be resolved"; }
    static get popUpWindowError() { return "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."; }
    static get userLoginError() { return "User login is required"; }
    static get userCancelledError() { return "User closed the popup window window and cancelled the flow"; }
}
//# sourceMappingURL=Constants.js.map