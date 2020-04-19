import axios from 'axios'
import {HTTP_HEADER_TOKEN_KEY, HTTP_HEADER_TOKEN_VAL, HTTP_RESPONSE_SUCCESS_CODE, USER_ID} from "../const/constant";
import {Message} from "element-ui";

const http = axios.create({
    baseURL: 'http://localhost:11111/',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": '*'
    }
});


// 添加请求拦截器，在请求头中加token
http.interceptors.request.use(
    req => {
        req.headers[HTTP_HEADER_TOKEN_KEY] = sessionStorage.getItem(HTTP_HEADER_TOKEN_VAL) || '';
        return req;
    },
    error => {
        window.vm.$toast.error(error.message || '后台服务错误');
        Message({
            message: '错误'
        });
        return Promise.reject(error);
    });

// 添加响应拦截器
http.interceptors.response.use(response => {
    return response
}, error => {
    let msg = error.message !== undefined ? error.message : '后台服务出错，请联系管理员';
    window.vm.$toast.error(msg);
    return Promise.reject(error)
});

export function post(url, params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    http.post(url, params).then(
        function (response) {
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
        if (err) {
            err(error);
        }
    })
}

export function get(url, params, success, fail, err) {
    if (params) {
        params.userId = sessionStorage.getItem(USER_ID);
    }
    http.get(url, {
        params: params
    }).then(
        function (response) {
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
        window.vm.$toast.error(error.message || '调用服务出现错误');
        if (err) {
            err(error);
        }
    })
}

export default http;
