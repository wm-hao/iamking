import {USER_ID} from "../../const/constant";
import {get, post} from "../http"

export function analyseFrequency(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return get("share/frequency", params, success, fail, err);
}

export function analyseTopData(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return get("share/top", params, success, fail, err);
}

export function analyseDuration(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("share/keep", params, success, fail, err);
}

export function analyseProfit(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return get("share/profitAll", params, success, fail, err);
}