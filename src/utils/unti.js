import ddbase from '../api/ddbase';
function getComeIN(e) {
    if(e){
        sessionStorage.setItem("comein",e)
        return  e
    }
    if(!e){
        return sessionStorage.getItem("comein")
    }
}
function isYzjApp() {
    return navigator.userAgent.match(/Qing\/.*;(iOS|iPhone|Android).*/) ? true : false;
}
function getuserInfs(_this,fun,props) {
    if(_this.userInfo.jobnumber){
        if(props){
            fun&&fun(...props)
        }else {
            fun&&fun()
        }
        return
    }
    if (isYzjApp()) {
        qing.call('rotateUI', {
            'orientation':'portrait',
        });
        // qing.call('createPop', {
        //
        //     'popTitle': '反馈',
        //
        //     'popTitleCallBackId': 'callbackEJL',
        //
        //     'success': function (resp) {
        //
        //         if (resp.success == true || resp.success == 'true') {
        //
        //             //将下面地址替换成对应应用的反馈地址
        //
        //             window.location.href='http://s.haier.com/ejl/mobile/feedback?systemId=3200&uid=01465346&pid=2520&t='+Math.random();
        //
        //         }
        //
        //     }
        //
        //
        // });

        XuntongJSBridge.call('getPersonInfo', {},  (result)=>{
            if (result.data.userName != null && result.data.userName != '') {
                // alert(JSON.stringify(result.data))
                _this.$api.getUserInfo({jobNumber:result.data.userName}).then((res)=>{
                    _this.setUserInfo({
                        jobnumber:res.userId,
                        name:res.userName,
                        userLevel: parseInt(res.userLevel),
                        phone:res.phone,
                        depName:res.depName,
                        remark:parseInt(res.remark),
                        isAuthorize:res.isAuthorize,
                        passivityAuthorizerNum:res.passivityAuthorizerNum,
                        passivityAuthorizerName:res.passivityAuthorizerName,
                        authorizerLevel:parseInt(res.authorizerLevel)
                    })
                    _this.setisDD(false)
                    if(props){
                        fun&&fun(...props)
                    }else {
                        fun&&fun()
                    }
                })
            } else {
                Haier.toast("用户名获取失败!");
            }
        });
    }else {
        ddbase.getAuthCode().then((res) => {
            return _this.$api.login({authCode: res.code});
        }).then((res) => {
            _this.setisDD(true)
            _this.setUserInfo({
                jobnumber:res.userId,
                name:res.userName,
                userLevel:parseInt(res.userLevel),
                phone:res.phone,
                depName:res.depName,
                remark: parseInt(res.remark),
                isAuthorize:res.isAuthorize,
                passivityAuthorizerNum:res.passivityAuthorizerNum,
                passivityAuthorizerName:res.passivityAuthorizerName,
                authorizerLevel:parseInt(res.authorizerLevel)
            })
            if(props){
                fun&&fun(...props)
            }else {
                fun&&fun()
            }
        }).catch((err)=>{
        })
    }
}
function ClearComeIN() {
    sessionStorage.setItem("comein",'')
}

export default {
    getComeIN: getComeIN,
    ClearComeIN: ClearComeIN,
    getuserInfs: getuserInfs,
    isYzjApp:isYzjApp
}
