<template>
    <div class="contents">
        <div :class="'backgroundImg'+today_num">
            <div class="userName">{{userInfo.name}}</div>
            <div class="menhu_box">
                <!--                <div class="menhu" v-if="userInfo.depName">{{userInfo.depName!='null'?userInfo.depName:'海尔集团'}}</div>-->
                <div class="menhu">{{userInfo.depName?userInfo.depName:'海尔集团'}}</div>
                <div class="menhu_down">
                    <div class="bt">
                        <div class="Numb">NO:</div>
                        <div class="numbContent">{{userInfo.jobnumber}}</div>
                    </div>
                    <div class="bt bt2">
                        <div class="phoneImg"></div>
                        <div class="numbContent"><span style="margin-right: 3px;margin-left: -8px">:</span>{{userInfo.phone}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="perImg" v-if="witchColor!=='red'" @click="goFace">
                <img class="imgCir"
                     :src="imgsrc()"
                     style="border:3px solid rgba(212,169,72,1)"
                     alt="">
                <div class="healthTital">
                    <div class="fontContentofimg">{{witchColor=='green'?"限时通行:"+time:'人脸设备专用'}}</div>
                </div>
            </div>

            <div class="perImg" v-if="witchColor=='red'">
                <img class="imgCir"
                     :src="imgsrc()"
                     style="border:3px solid rgba(77,77,77,1)"
                     alt="">
                <div class="healthTital2">
                    <div class="fontContentofimg" style="color: white;" @click="goAppley">无通行权限</div>
                </div>
            </div>
            <!--            <div class="touxiangArea" v-if="areaCode">-->
            <!--                <span class="tongxingfont">通行区域: <span class="areaLable"></span><span class="dataArea">{{detail.garden}}-{{detail.area}}</span></span>-->
            <!--                &lt;!&ndash;                <span class="tongxingfont"  >通行区域: <span class="areaLable"></span><span class="dataArea">海尔园区-创牌大厦</span></span>&ndash;&gt;-->
            <!--            </div>-->
            <div class="codeImg">
                <div class="codeImg_inner">
                    <img :src="bkgif" v-if="detail.color==1&& areaCode" alt="" class="bkgif">
                    <vue-qr class="ewm"
                            :text="url"
                            :margin="0"
                            :colorDark="colorDark"
                            colorLight="#fff"
                            :logoScale="0.3"
                            :size="200"
                    >
                    </vue-qr>
                </div>
            </div>

            <div class="bottom_items">
                <div class="flashImg2" @click="goUrl"></div>
                <span class="fontStyle2" @click="goUrl">查看健康码</span>
                <div class="shuxian"></div>
                <div class="flashImg" @click="geturl"></div>
                <span class="fontStyle" @click="geturl">刷新二维码</span>
            </div>
            <div class="new_button">
                <div class="forScanImg"></div>
                <div class="forFont"></div>
            </div>

            <div class="forNewButton" v-if="witchColor=='red'">
                <div class="forNewItem"></div>
                <div class="fontS" style="margin-left: 5px" @click="goAppley">申请通行权限</div>
            </div>
            <div class="forNewButtonItem" :style="{background:'url('+require('../assets/img/newButton1.png')+') no-repeat center'}" v-if="witchColor=='green'">
                <div class="forNewButton3_con">
                    <div class="newItemc"></div>
                    <div class="fontSS"> {{nowTime}}</div>
                </div>
            </div>
            <div class="fontSSS" v-if="witchColor=='green'">通行区域: <span class="areaLable"></span><span class="contentsItself">{{detail.garden}}-{{detail.area}}</span>
            </div>
<!--            <div class="fontSSS" v-if="witchColor=='black'">通行区域: <span class="areaLable"></span><span class="contentsItself">海尔工业园-创牌中心</span>-->
<!--            </div>-->
            <div class="forNewButtonItem" :style="{background:'url('+require('../assets/img/newButton1.png')+') no-repeat center'}" v-if="witchColor=='black'">
                <div class="forNewButton3_con">
                    <div class="fontS">二维码可通行人脸识别设备</div>
                </div>
            </div>
            <!--            <div class="havetime_box" v-if="havetime">-->
            <!--                <div class="TimeImg"></div>-->
            <!--                <span class="nowTime"><span class="havetime_text">限时通行</span><span class="time">{{time}}</span></span>-->
            <!--            </div>-->
            <!--            <div class="havetime_box">-->
            <!--                <div class="TimeImg" ></div>-->
            <!--                <span class="nowTime"><span class="havetime_text">限时通行</span><span class="time">04:59</span></span>-->
            <!--            </div>-->
            <mt-popup v-model="showtip" popup-transition="popup-fade" closeOnClickModal="true" position="middle">
                <div class="PopupItem">
                    <div class="gantanhao"></div>
                    <div class="fontContent">{{tiptwxt}}</div>
                    <button class="goBack" @click="hiddenShare">
                        <div class="font_Style">返回</div>
                    </button>
                </div>
            </mt-popup>
        </div>
        <div class="zhezhao" v-if="showzhehao"></div>
    </div>
</template>
<script>
    import vueQr from 'vue-qr'
    import ddbase from '../api/ddbase';
    import axios from 'axios';
    import {MessageBox} from 'mint-ui';
    import unt from "../utils/unti"

    export default {
        name: 'login',
        components: {
            vueQr
        },
        data() {
            return {
                today_num:1,
                id: -1,
                detail: {
                    url: '',
                    color: 2
                },
                tiptwxt: '',
                showzhehao: false,
                showtip: false,
                url: 'morentoxingma',
                time: '',
                nowTime: '',
                bkgif: require('../assets/bk.gif'),
                newButton1: require('../assets/img/newButton1.png'),
                areaCode: '',
                havetime: '',
                popupVisible: true,
                witchColor: '',
            };
        },
        created() {
            this.$api.getRandomNumber().then((res)=>{
                this.today_num =res
            })
            // this.today_num =this.$moment().isoWeekday()
            // this.today_num =6
            // setTimeout(()=>{
            //
            // },1000)


            if (this.$dd.env.platform === "notInDingTalk"&& !unt.isYzjApp()) {
                this.showzhehao = true
                MessageBox({
                    title: "友情提示",
                    message: "该应用只能在iHaier客户端访问！",
                    confirmButtonText: '去下载'
                }).then(action => {
                    window.location.href = "https://openapi.haier.net/mock/load.html";
                });
                return
            }
            let areaCode = this.$route.query.areaCode;
            this.areaCode = areaCode;
            // 判断 进入是否
            let session_code = this.$unt.getComeIN(this.areaCode)
            if (session_code) {
                this.areaCode = session_code
            }
            let _this = this
            unt.getuserInfs(_this, this.thenFunc)
        },
        mounted() {
            // this.getData();
            var _this = this;
            this.timer = setInterval(() => {
                _this.nowTime = _this.formatDate(new Date()); // 修改日期数据
            }, 1000);
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
            }
            ;
        },
        computed: {
            colorDark() {
                let _this = this
                if (!this.areaCode) {
                    _this.witchColor = 'black';
                    return '#000';
                }
                if (this.detail.color == 1) {
                    _this.witchColor = 'green';
                    return '#007706'
                } else {
                    _this.witchColor = 'red';
                    return '#d60000'
                }
            }
        },
        methods: {
            thenFunc() {
                if (localStorage.getItem(this.areaCode)) {
                    this.detail = JSON.parse(localStorage.getItem(this.areaCode))
                    if (!this.timeCheck()) {   //有时间 有区域id   // 没有区域id 没有时间
                        this.geturl()
                        return
                    } else {
                        if (!this.areaCode) {
                            this.geturl()
                            return
                        } else {
                            this.getcode()
                        }
                    }
                } else {
                    if (!this.areaCode) {
                        this.geturl()
                        return
                    } else {
                        this.getcode()
                    }
                }
            },
            goAppley() {
                this.$router.replace('/applyPassport')
            },
            claerL() {
                localStorage.clear()
            },
            setZero(a) {//设置小于10的数字在加0
                return a < 10 ? "0" + a : a;
            },
            goFace() {
                if(this.isDD){
                    window.location.href = "https://hiface.haier.net/myface/newindex.html?showmenu=false";
                }else {
                    qing.call('gotoLightApp',{appId:'500000219',appName:'人脸识别'})
                }
            },
            // goScan() {
            //     this.$dd.biz.util.scan({
            //         // type: String, // type 为 all、qrCode、barCode，默认是all。
            //         onSuccess: function (data) {
            //             window.location.href = data.test;
            //         },
            //         onFail: function (err) {
            //         }
            //     })
            // },
            // 格式转换
            moumentUse(data, type1) {
                if (type1 == 1) {
                    return this.$moment(data).format('L').split("/").reverse().join("/");
                } else {
                    return this.$moment(data).format(' h:mm:ss');
                }
            },
            hiddenShare() {
                this.showtip = false;
            },
            goUrl() {
                window.location.href = "https://render.alipay.com/p/s/i/?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D2021001136608745%26page%3Dpages%252Findex%252Findex%26enbsv%3D0.2.2006281711.13%26chInfo%3Dch_share__chsub_CopyLink";
            },
            timeCheck(type) {
                if (!this.detail.time) {
                    return true
                }
                let timestamp = new Date().getTime() //获取当前时间
                // alert( this.$moment(timestamp).format(' h:mm:ss'))
                // alert( this.$moment(this.detail.time).format(' h:mm:ss'))
                let thenTime = timestamp - this.detail.time; //获取差值
                if (thenTime <= (this.detail.goCountTime * 1000)) {  // 判断是否有有效期
                    this.havetime = (this.detail.goCountTime * 1000) - thenTime
                    this.tiptwxt = '请于扫码后5分钟内通行'
                    // if (this.$unt.getComeIN(this.areaCode)) {
                    //     this.showtip = true//记录本次剩余时间
                    // }
                    if (this.t) {                            //是否存在倒计时计时器
                        clearInterval(this.t)                //清除计时器
                    }
                    this.t = setInterval(() => {
                        // 设置计时器
                        let timestamp = new Date().getTime() //获取当前时间
                        // alert( this.$moment(timestamp).format(' h:mm:ss'))
                        // alert( this.$moment(this.detail.time).format(' h:mm:ss'))
                        let thenTime = timestamp - this.detail.time; //获取差值
                        this.havetime = (this.detail.goCountTime * 1000) - thenTime- 1000//计时器 结束后将颜色设置为红色并清除计时器
                        this.time = this.$moment(this.havetime).format('mm:ss');
                        if (this.havetime <= 0) {
                            clearTimeout(this.t)
                            this.havetime = 0
                            this.detail.color = 2
                            this.$unt.ClearComeIN()
                        }
                    }, 1000)
                    return false                            //返回false
                } else {
                    return true
                }
            },
            imgsrc() {
                return 'https://hicar.haier.net/hipassjava/ihaier/getFace?jobNumber=' + this.userInfo.jobnumber
                // return 'http://103.120.225.186:9003/hipass/ihaier/getFace?jobNumber=01515942'
            },
            getFace(cn) {
                axios({
                    method: 'post',
                    url: 'https://hiface.haier.net/getFace',
                    dataType: 'json',
                    headers: {
                        Authorization: getAuthorization(),
                        appKey: ''
                    },
                    data: {
                        UserId: cn,
                        UserType: 'employee'
                    },
                    contentType: 'application/json',
                }).then((res) => {
                    if (rd && rd.object && rd.object.base64Str.length > 50) {
                        $('.touxiangImg').attr('src', rd.object.base64Str);
                        console.log()
                    } else {
                        alert('头像获取失败！');
                    }
                });

            },
            cloclik() {
                setInterval(() => {
                    this.time = this.$moment().format(' h:mm:ss');
                }, 1000)

            },
            formatDate(nowTime) {  //当前时间格式化处理
                let _this = this;
                var str = "";
                str += _this.setZero(nowTime.getHours()) + ":"; //获取时
                str += _this.setZero(nowTime.getMinutes()) + ":"; //获取分
                str += _this.setZero(nowTime.getSeconds()); //获取秒
                return str;
            },
            formatSeconds(value) {
                var reg = /^(-|\+)?\d+$/;
                if (reg.test(value)) {
                    var hour = Math.floor(value / 3600);
                    var minute = Math.floor((value % 3600) / 60);
                    var second = value % 60;
                    var posstr = "";
                    if (hour) {
                        if (hour < 10)
                            posstr += "0";
                        posstr += hour;
                        posstr += ":";
                    } else {
                        posstr += "00:";
                    }
                    if (minute < 10)
                        posstr += "0";
                    posstr += minute;
                    posstr += ":";
                    if (second < 10)
                        posstr += "0";
                    posstr += second;
                    return posstr;
                } else {
                    return "";
                }
            },
            getcode() {
                const useData = {
                    jobNumber: this.userInfo.jobnumber,
                    isTrack: true,
                    areaCode: this.areaCode,
                    name: this.userInfo.name,
                    userLevel: this.userInfo.userLevel
                }
                this.$api.getCode(useData).then((res) => {
                    this.detail = res
                    if (res.color == 1) {
                        localStorage.setItem(this.areaCode, JSON.stringify(res))
                        this.geturl()
                        this.timeCheck(333)
                    } else {
                        this.geturl()
                        if (this.areaCode) {
                            this.showtip = true
                            this.tiptwxt = '未申请该区域的通行权限'
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            geturl() {
                this.$api.myUrl({validTime: 60, entryTimes: 1, jobNumber: this.userInfo.jobnumber})
                    .then((res) => {
                        if (res.url) {
                            this.url = res.url
                        }
                    }).catch((err) => {
                    Toast(err);
                })
            },
            // 获取 easy-mock 的模拟数据
            //A0038335 单单
            //A0037835 大成哥
            //A0000206 chengzhi
            getData() {
                this.loading = true
                const myData = {}
                this.$api.robList(myData).then((res) => {
                    console.log(res)
                    this.tableData = res.records //[1,2,3]
                    this.pageTotal = parseInt(res.totalCount)
                    this.loading = false
                }).catch((err) => {
                    console.log(err)
                    this.loading = false
                })
            },
            forAlert() {

            },
        },
    };
</script>

<style scoped>
    .zhezhao {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.8;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .havetime_text {
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
    }

    .time {
        font-size: 18px;
        margin-left: 5px;
        color: rgba(255, 255, 255, 1);
    }

    .nowTime {
        height: 20px;
        font-size: 20px;
        font-family: SourceHanSansCN-Medium;
        line-height: 22px;
        color: rgba(106, 106, 106, 1);
        opacity: 1;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .TimeImg {
        background: url("../assets/img/newColock.png") no-repeat center;
        width: 17px;
        height: 17px;
        margin-left: 8px;
    }

    .havetime_box {
        display: flex;
        align-items: center;
        position: absolute;
        width: 140px;
        height: 31px;
        bottom: 2%;
        right: 1.4vh;
        background: url("../assets/img/timeLabelNew.png") no-repeat center;
    }

    .passingTime {
        position: absolute;
        left: 18px;
        bottom: 25px;
        height: 13px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(151, 151, 151, 1);
    }

    .fontStyle {
        height: 12px;
        font-size: 12px;
        font-family: SourceHanSansCN-Medium;
        line-height: 22px;
        color: rgba(106, 106, 106, 1);
        left: 59%;
        bottom: 120px;
        position: absolute;
        text-align: center;

    }

    .fontStyle2 {
        height: 12px;
        font-size: 12px;
        font-family: SourceHanSansCN-Medium;
        line-height: 22px;
        color: rgba(106, 106, 106, 1);
        left: 30%;
        bottom: 120px;
        position: absolute;
    }

    .flashImg {
        width: 12px;
        height: 12px;
        background: url("../assets/img/reFlash.png") no-repeat center;
        position: absolute;
        left: 53%;
        bottom: 116px;
    }

    .flashImg2 {
        width: 17px;
        height: 12px;
        background: url("../assets/img/ToHeathCode.png") no-repeat center;
        position: absolute;
        left: 23%;
        bottom: 116px;
    }

    .shuxian {
        width: 1px;
        height: 17px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        left: 50%;
        bottom: 116px;
        position: absolute;
    }


    .codeImg {
        width: 243px;
        border-radius: 5px;
        height: 244px;
        left: 50%;
        margin-left: -122px;
        bottom: 132px;
        position: absolute;
        z-index: 1;
        background: white;
    }

    .codeImg_inner {
        position: relative;
        width: 223px;
        height: 224px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .bkgif {
        position: absolute;
        width: 280px;
        height: auto;
        top: -30px;
        left: -30px;
        pointer-events:none
    }
    .dataArea {
        width: 145px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 7.967vw;
        color: white;
        opacity: 1;
        position: absolute;
        left: 80px;
    }

    .areaLable {
        width: 12px;
        height: 16px;
        background: url("../assets/img/newItem2.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        top: 40%;
        margin-left: 2px;
        margin-top: -5px;
    }

    .tongxingfont {
        width: 60px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 28px;
        color: white;
        opacity: 1;
        position: absolute;
        left: 48px;
        margin-top: 1.633vw;
    }

    .touxiangArea {
        width: 307px;
        height: 41px;
        background: url("../assets/img/areaLabelNew.png") no-repeat center;
        top: 214px;
        left: 16px;
        position: absolute;
        padding-left: 15px;
    }

    .perImg {
        width: 189px;
        height: 142px;
        top: 65px;
        right: -9px;
        position: absolute;
        opacity: 1;
        margin: 0 auto;
    }

    .imgCir {
        width: 104px;
        height: 104px;
        margin-top: 5px;
        border-radius: 52px;
        top: calc(50% - 1.7rem);
        left: calc(50% - 1.8rem);
        object-fit: cover;
        margin-left: 10vw;
        background: url("../assets/facebg.png") no-repeat center;
        display: block;
        background-size: 100% 100%;
    }

    .userName {
        height: 34px;
        font-size: 34px;
        font-family: SourceHanSansCN-Medium;
        line-height: 32px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        left: 43px;
        position: absolute;
        top: 83px;
    }

    .menhu_box {
        display: flex;
        width: 150px;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 10px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 32px;
        color: rgba(255, 255, 255, 1);
        height: 50px;
        margin-left: 44px;
        margin-top: 128px;
        align-items: center;
    }

    .bt2 {
        margin-left: 20px;
    }

    .bt {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menhu_down {
        display: flex;
        align-items: center;
        margin-top: 5px;
    }

    .menhu {
        font-size: 8px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        line-height: 10px;
        height: 10px;
        text-align: left;
        margin-top: 16px;
    }

    .Numb {
        font-size: 8px;
        font-family: SourceHanSansCN-Regular;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        height: 20px;
    }

    .numbContent {
        width: 44px;
        font-size: 8px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 31px;
        height: 31px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        margin-left: 10px;
    }

    .contents {
        background: #f2f4f5;
        width: 375px;
        min-height: calc(100vh - 80px);
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .backgroundImg {
        background: url("../assets/img/newBackGround.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg1 {
        background: url("../assets/img/1.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg2 {
        background: url("../assets/img/2.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg3{
        background: url("../assets/img/3.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg4 {
        background: url("../assets/img/4.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg5{
        background: url("../assets/img/5.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .backgroundImg6 {
        background: url("../assets/img/6.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }

    .backgroundImg7{
        background: url("../assets/img/7.png") no-repeat center;
        width: 371px;
        height: 583px;
        background-size: 100% 100%;
        position: absolute;
    }
    .bggif {
        height: auto;
        position: absolute;
        left: 5%;
        width: 90%;
    }

    .PopupItem {
        width: 282px;
        height: 135px;
        border-radius: 16px;
        display: flex;
        justify-content: center;
    }

    .goBack {
        width: 93px;
        height: 28px;
        background: rgba(6, 55, 158, 1);
        margin: 0 auto;
        border-radius: 8px;
        margin-top: 85px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }

    .font_Style {
        width: 40px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        text-align: center;
    }

    .gantanhao {
        width: 24px;
        height: 24px;
        background: url("../assets/img/gantan.png") no-repeat center;
        background-size: 100% 100%;
        margin-top: 32px;
        position: absolute;
        left: 33px
    }

    .fontContent {
        width: 180px;
        height: 17px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        line-height: 26px;
        color: rgba(70, 70, 70, 1);
        opacity: 1;
        margin-top: 32px;
        margin-left: 15px;
        text-align: center;


    }

    .healthTital {
        width: 94px;
        height: 20px;
        background: url("../assets/img/healthCode.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        bottom: 28px;
        left: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .healthTital2 {
        width: 94px;
        height: 20px;
        background: url("../assets/img/healthCode2.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        bottom: 28px;
        left: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fontContentofimg {
        text-align: center;
        width: 82px;
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(97, 68, 0, 1);
    }

    .forNewButton {
        width: 174px;
        height: 45px;
        line-height: 45px;
        background: url("../assets/img/newButton.png") no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 310px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forNewButton2 {
        height: 45px;
        line-height: 45px;
        background: url("../assets/img/newButton.png") no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 310px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 282px
    }

    .forNewButton3 {
        height: 30px;
        background: url("../assets/img/newButton1.png") no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 300px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 160px;
        line-height: 45px;
    }

    .forNewButtonItem {
        height: 30px;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 300px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 160px;
        line-height: 45px;
        border-radius: 6px;
    }

    .forNewButton3_con {
        display: flex;
        align-items: center;
        height: 45px;
    }

    .fontSS {
        font-size: 25px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 28px;
        color: rgba(255, 255, 255, 1);
        margin-left: 6px;
    }
    .fontS {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 28px;
        color: rgba(255, 255, 255, 1);
        margin-left: 6px;
    }
    .forNewItem {
        width: 12px;
        height: 12px;
        background: url("../assets/img/newItem1.png") no-repeat center;
        background-size: 100% 100%;
    }

    .forNewItem2 {
        width: 10px;
        height: 10px;
        background: url("../assets/img/newItem3.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: -5px;
    }

    .phoneImg {
        width: 7px;
        height: 10px;
        background: url("../assets/img/newItem4.png") no-repeat center;
        background-size: 100% 100%;
    }

    .contentsItself {
        margin-left: 18px;
    }

    .bottom_items {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-right: 6px;
    }

    .newItemc {
        background: url("../assets/img/newItemClock.png") no-repeat center;
        width: 21px;
        height: 21px;
        background-size: 100% 100%;
        margin-right: 6px;
    }

    .fontSSS{
        display: flex;
        margin-top: 2px;
        justify-content: center;
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 28px;
        color: rgba(65,110,179,1);
    }
</style>
