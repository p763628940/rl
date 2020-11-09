import Vue from 'vue'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
/**
 * 引入elementUI 请求接口  提示 errorMsg
 * */
import { Toast } from 'mint-ui';
Vue.component(Toast.name, Toast)
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl.baseUrl;// 开发环境
// axios.defaults.baseURL = window.location.href.split('/view/PICCVideo')[0];// 测试环境
const result_OK = 0;
import { stringify } from 'qs';
import {Indicator} from 'mint-ui';

axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if(config.method === 'post') { // post请求时，处理数据
        config.data=JSON.stringify(config.data)
        // config.data = stringify( {
        //     ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
        // })
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
//添加响应拦截器
axios.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
});
/**
 * method方法 get post
 * 数据返回数据固定格式 {errorCode, data, errorMsg}
 * errorCode 等于 result_OK 表示返回成功
 * data 为返回的数据
 * errorMsg 不等于 result_OK 时 返回的提示
 * */
export function get(url) {
    return function (params) {
        return axios.get(url, {params: params}).then(res => {
            const {code, data, msg} = res.data;
            if( code ==='200'){
                return data
            }else {
                Toast(msg);
            }
        }).catch(err => {
            console.log("dsfsdsadf")
            console.log(err)
        })
    }
}
export function post(url) {
    return  function(params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                const {code, data, msg} = res.data;
                if( code =='200'){
                    resolve(data)
                }else {
                    Indicator.close();
                    Toast(msg)
                    reject(data)
                }
            }).catch(err => {
                reject(err)
            })
        })

    }
}

