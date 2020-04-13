import {HTTP_RESPONSE_SUCCESS_CODE} from "../../const/constant";
import http from "../http";

// 用户验证
export function userValidate(param, success, fail, err) {
    http.post('user/validate', param).then(
        function (response) {
            console.log(response);
            if (response.data.code === HTTP_RESPONSE_SUCCESS_CODE) {
                if (success) {
                    success(response.data);
                }
            } else {
                if (fail) {
                    fail(response.data);
                }
            }
        }
    ).catch(function (error) {
        console.log(error);
        if (err) {
            err(error);
        }
    })
}