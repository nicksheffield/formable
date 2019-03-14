"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a = require('react'), useReducer = _a.useReducer, useCallback = _a.useCallback, useMemo = _a.useMemo;
var initialState = {};
var reducer = function (state, _a) {
    var type = _a.type, key = _a.key, val = _a.val;
    var _b;
    switch (type) {
        case 'set':
            return __assign({}, state, (_b = {}, _b[key] = val, _b));
        case 'reset':
            return initialState;
        default:
            throw new Error("Unexpected action type: '" + type + "'");
    }
};
var useFormable = function (data) {
    var _a = useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    var get = useCallback(function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ''; }
        if (state[key] !== undefined)
            return state[key];
        if (data && data[key] !== undefined)
            return data[key];
        return defaultValue;
    }, [state, data]);
    var set = useCallback(function (key, val) { return dispatch({ type: 'set', key: key, val: val }); }, []);
    var merged = useMemo(function () { return (__assign({}, data, state)); }, [data, state]);
    var reset = useCallback(function () { return dispatch({ type: 'reset' }); }, [data]);
    return [get, set, merged, state, reset];
};
module.exports = useFormable;
