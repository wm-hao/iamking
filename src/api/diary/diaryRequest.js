import {USER_ID} from "../../const/constant";
import {post} from "../http";

export function diarySelect(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("daily/select", params, success, fail, err);
}

export function diaryUpdate(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("daily/update", params, success, fail, err);
}

export function diaryInsert(params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    return post("daily/insert", params, success, fail, err);
}