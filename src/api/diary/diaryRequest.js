import {HTTP_RESPONSE_SUCCESS_CODE} from "../../const/constant";

export function validate(param, json, success, fail, err) {
    this.$http.post('daily/select', param).then(
        function (response) {
            if (response.data.code === HTTP_RESPONSE_SUCCESS_CODE) {
                success(json);
            } else {
                fail(json);
            }
        }
    ).catch(function (error) {
        console.log(error);
        err(error);
    })
}