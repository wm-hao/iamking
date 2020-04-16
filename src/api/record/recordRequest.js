import {USER_ID} from "../../const/constant";
import {post} from "../http";

export function historyQryPagination(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    console.log(JSON.stringify(params));
    return post("share/list/page", params, success, fail, err);
}

export function recordUpdate(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("share/update", params, success, fail, err);
}

export function recordDelete(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("share/delete", params, success, fail, err);
}