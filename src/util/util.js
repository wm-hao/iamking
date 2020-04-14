import {TRADE_PREFIX} from "../const/constant";

export function removePrefix(origin) {
    if (origin && origin.length > TRADE_PREFIX.length) {
        return origin.substr(TRADE_PREFIX.length);
    }
    return '';
}

export function addPrefix(origin) {
    if (origin) {
        return TRADE_PREFIX + origin;
    }
    return '';
}

export function parseUserIDAndToken(origin) {
    let array = new Array();
    if (origin) {
        let index = origin.indexOf('-');
        if (index > 0) {
            array.push(origin.substr(0, index));
            array.push(origin.substr(index + 1));
        }
    }
    return array;
}