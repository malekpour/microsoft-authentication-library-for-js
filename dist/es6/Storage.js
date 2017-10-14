import { AccessTokenCacheItem } from "./AccessTokenCacheItem";
import { Constants } from "./Constants";
/**
* @hidden
*/
export class Storage {
    constructor(cacheLocation) {
        if (Storage._instance) {
            return Storage._instance;
        }
        this._cacheLocation = cacheLocation;
        this._localStorageSupported = typeof window[this._cacheLocation] != "undefined" && window[this._cacheLocation] != null;
        this._sessionStorageSupported = typeof window[cacheLocation] != "undefined" && window[cacheLocation] != null;
        Storage._instance = this;
        if (!this._localStorageSupported && !this._sessionStorageSupported) {
            throw new Error("localStorage and sessionStorage not supported");
        }
        return Storage._instance;
    }
    // add value to storage
    setItem(key, value) {
        if (window[this._cacheLocation]) {
            window[this._cacheLocation].setItem(key, value);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
    // get one item by key from storage
    getItem(key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].getItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
    // remove value from storage
    removeItem(key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].removeItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
    // clear storage (remove all items from it)
    clear() {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].clear();
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
    getAllAccessTokens(clientId, userIdentifier) {
        const results = [];
        let accessTokenCacheItem;
        const storage = window[this._cacheLocation];
        if (storage) {
            let key;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.match(clientId) && key.match(userIdentifier)) {
                        let value = this.getItem(key);
                        if (value) {
                            accessTokenCacheItem = new AccessTokenCacheItem(JSON.parse(key), JSON.parse(value));
                            results.push(accessTokenCacheItem);
                        }
                    }
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
        return results;
    }
    removeAcquireTokenEntries(acquireTokenUser, acquireTokenStatus) {
        const storage = window[this._cacheLocation];
        if (storage) {
            let key;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if ((key.indexOf(acquireTokenUser) > -1) || (key.indexOf(acquireTokenStatus) > -1)) {
                        this.removeItem(key);
                    }
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
    resetCacheItems() {
        const storage = window[this._cacheLocation];
        if (storage) {
            let key;
            for (key in storage) {
                if (storage.hasOwnProperty(key) && key.indexOf(Constants.msal) !== -1) {
                    storage[key] = "";
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    }
}
//# sourceMappingURL=Storage.js.map