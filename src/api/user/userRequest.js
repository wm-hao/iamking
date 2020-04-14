import {post} from "../http";

// 用户验证
export function userValidate(params, success, fail, err) {
    return post("user/validate", params, success, fail, err);
}