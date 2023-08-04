import axios from 'axios';// 自己封装的axios
import router from '@/router';
import {Loading, MessageBox} from 'element-ui';

const ServiceLoading = {
    count: 0,
    instance : null,
    open: function() {
        if(this.count === 0) this.instance = Loading.service({text: "loading"});
        this.count++;
    },
    close: function() {
        if(this.count === 1) this.instance.close();
        if(this.count >= 1) this.count--;
    }
};

const service = axios.create({
    baseURL: "http://localhost:2999",
    timeout: 1000
})

// 添加一个请求拦截器
service.interceptors.request.use(
    async config => {    // 请求发出前一定会走这里
        ServiceLoading.open();       // 开启loading效果
        await new Promise(resolve => setTimeout(() => resolve() , 300)); // 故意等一秒再发ajax让loading站住一秒
        // 所有的ajax都强制带上请求头且在Authorization上带token
        config.headers = Object.assign({}, {Authorization: sessionStorage.getItem("token")}, config.headers || {});
        return config;
    }, 
    error => {    // 请求无法正常发出
        ServiceLoading.close();      // 关闭loading效果
        MessageBox.alert(error.message, "警告", {type: "warning"});// 向用户提示错误信息 
        return Promise.reject(error);
    }
);
// 添加一个响应拦截器
service.interceptors.response.use(
    async ({data: {code, data, msg}}) => {    // 客户端正常收到了服务器的响应
        ServiceLoading.close();      // 关闭loading效果
        switch(code) {
            case 200:
                return data;
            case 401:
                // 向用户提示错误信息 
                MessageBox.alert('未登录或登录超时，请重新登录！', '警告', {type: "warning"});
                router.push('/login');
                return Promise.reject(new Error("未登录或登录超时"));
            case 199:
            case 500:
            case 404:
                MessageBox.alert(msg, '警告', {type: "warning"});// 向用户提示错误信息
                return Promise.reject(new Error(msg));
            default: 
                console.log('永远到不了这里');
        }
    },
    error => {    // 客户端无法收到服务器的响应(服务器没开，url写错到不了服务器)
        ServiceLoading.close();          // 关闭loading效果
        MessageBox.alert(error.message, '警告', {type: "warning"});    // 向用户提示错误信息
        return Promise.reject(error);
    }
);

export default service;
