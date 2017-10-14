"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccessTokenCacheItem_1 = require("./AccessTokenCacheItem");
var Constants_1 = require("./Constants");
/**
* @hidden
*/
var Storage = (function () {
    function Storage(cacheLocation) {
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
    Storage.prototype.setItem = function (key, value) {
        if (window[this._cacheLocation]) {
            window[this._cacheLocation].setItem(key, value);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // get one item by key from storage
    Storage.prototype.getItem = function (key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].getItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // remove value from storage
    Storage.prototype.removeItem = function (key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].removeItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // clear storage (remove all items from it)
    Storage.prototype.clear = function () {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].clear();
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    Storage.prototype.getAllAccessTokens = function (clientId, userIdentifier) {
        var results = [];
        var accessTokenCacheItem;
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.match(clientId) && key.match(userIdentifier)) {
                        var value = this.getItem(key);
                        if (value) {
                            accessTokenCacheItem = new AccessTokenCacheItem_1.AccessTokenCacheItem(JSON.parse(key), JSON.parse(value));
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
    };
    Storage.prototype.removeAcquireTokenEntries = function (acquireTokenUser, acquireTokenStatus) {
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
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
    };
    Storage.prototype.resetCacheItems = function () {
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key) && key.indexOf(Constants_1.Constants.msal) !== -1) {
                    storage[key] = "";
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map