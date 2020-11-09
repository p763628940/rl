
import * as dd from 'dingtalk-jsapi'
import parameters from '../../config/constant'
//获取免登录码
function getAuthCode(){
    return new Promise(function (resolve,reject) {
        dd.runtime.permission.requestAuthCode({
            corpId:parameters.corpId,
            onSuccess: function(result) {
                /*{
                    code: 'hYLK98jkf0m' //string authCode
                }*/
                resolve(result)
            },
            onFail : function(err) {
                reject(err)
            }
        })
    })
}
export default {
    getAuthCode
}

