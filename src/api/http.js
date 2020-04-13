import axios from 'axios'


const http = axios.create({
    baseURL: 'localhost:11111/',
    timeout: 10000,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin'": "*"
    }
});


// 添加请求拦截器，在请求头中加token
http.interceptors.request.use(
    req => {
        // this.$toast.error('msg');
        return req;
    },
    error => {
        return Promise.reject(error);
    });

// 添加响应拦截器
http.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log('TCL: error', error)
    // let msg = error.message !== undefined ? error.message : '后台服务出错，请联系管理员';
    return Promise.reject(error)
})

export default http;
