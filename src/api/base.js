import axios from 'axios'
import {Message} from 'element-ui'

// 创建axios实例

let baseURL = 'http://localhost:9090/modeler'
let URL = window.location.origin;
let URL1 = '';
if (window.location.pathname == '/') {
    URL1 = '/';
} else {
    URL1 = window.location.pathname;
}

const service = axios.create({
    baseURL, // api的base_url
    timeout: 15000, // 请求超时时间
    // withCredentials: true
});

// respone拦截器
service.interceptors.response.use(response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
            // console.log(response);
        const res = response.data;

        return res;

    },
    error => {
        console.log('err' + error) // for debug

        let errcode = String(error);
        if (errcode.includes('500')) {
            Message.error({
                message: `${error.response.data.message}`
            });
        }
        if (errcode.includes('Network')) {
            Message.error({
                message: `请求超时请重试!`
            });
        }

        return Promise.reject(error)
    }
)

export default service
