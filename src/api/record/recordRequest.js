import {USER_ID} from "../../const/constant";
import {post} from "../http";

export function historyQryPagination(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("share/list/page", success, fail, err);
}

export function recordUpdate(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("share/update", success, fail, err);
}