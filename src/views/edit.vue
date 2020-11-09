<template>
    <div class="contents">
        <!--<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
            <!--<van-swipe-item v-for="(item,index) in images ">-->
                <!--<img :src="imgbaseUrl+item.pictureAddress" alt="">-->
            <!--</van-swipe-item>-->
        <!--</van-swipe>-->
        <!--<div class="myyy">-->
            <!--<div class="myyytitle yytitle">-->
            <!--<div class="myyytitlel">我的应用</div>-->
                <!--<div  class="all_app_text" @click="show=true"></div>-->
            <!--</div>-->
            <!--<div class="myyy_con">-->
                <!--<div class="yyI_item" v-for="(item,index) in app1" @click="jump(item)">-->
                    <!--<img class="yyI_item_icon" :src="imgbaseUrl+item.pictureurl" alt="">-->
                    <!--<div class="yytext">{{item.applyname}}</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="myyy">-->
            <!--<div class="myyytitle">我的场景</div>-->
            <!--<div class="myyy_con">-->
                <!--<div class="yyI_item" v-for="(item,index) in app2">-->
                    <!--<img class="yyI_item_icon" :src="imgbaseUrl+item.pictureurl" alt="">-->
                    <!--<div class="yytext">{{item.applyname}}</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="calendarbox">-->
            <!--<div class="calendarboxr">假期剩余{{HolidayBalance}}天</div>-->
            <!--<van-calendar-->
                    <!--v-if="HolidayList.length>0"-->
                    <!--class="mycalendar"-->
                    <!--title="日历"-->
                    <!--:poppable="false"-->
                    <!--:show-confirm="false"-->
                    <!--:formatter="formatter"-->
            <!--/>-->
        <!--</div>-->
        <van-popup v-model="show">
            <div class="change_box">
            <div class="change_box_title" v-if="diaType==1">
                <div plain type="primary"  @click="diaType=0" class="clean">取消</div>
                <div @click="updateCustomMenu" class="complete">保存</div>
            </div>
                <div class="myyy">
                    <div class="myyytitle yytitle">
                        <div class="myyytitlel">我的应用
                        </div>
                        <div class="set_icon" @click="diaType=1" v-if="diaType==0"></div>
                    </div>
                    <!--<vuedraggable class="myyy_con" :delay="2" v-model="app1" v-if="app1.length>0">-->
                        <!--<transition-group>-->
                      <!---->
                        <!--</transition-group>-->
                    <!--</vuedraggable>-->
                    <div class="myyy_con" v-if="app1.length>0">
                        <div class="yyI_item" v-for="(item,index) in app1":key="index" v-if="item.show" >
                            <!--<img class="yyI_item_icon" :src="imgbaseUrl+item.pictureurl" alt="">-->
                            <img class="yyI_item_icon" :style="{background: background('data:image/jpeg;base64,'+item.pictureCode,item)}" alt="">
                            <div class="yytext">{{item.applyname}}</div>
                            <div class="closemy" @click.stop.prevent="delIcon(item,index)" v-if="diaType==1"></div>
                        </div>
                    </div>

                </div>
                <div class="myyy">
                    <div class="myyytitle yytitle">
                        <div class="myyytitlel">全部应用</div>
                    </div>
                    <div class="myyy_con">
                        <div class="yyI_item" v-for="(item,index) in applist" v-if="item.allshow"  >
                            <img class="yyI_item_icon"  :src="'data:image/jpeg;base64,'+item.pictureCode" alt="" @click="jump(item)">
                            <div class="yytext">{{item.applyname}}</div>
                            <div class="close close2" @click.self="addToMyApp(item)" v-if="diaType==1">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import Vue from 'vue'
    import vueQr from 'vue-qr'
    import {MessageBox} from 'mint-ui';
    import unt from "../utils/unti"
    import {ImagePreview} from 'vant';
    import baseUrl from '../../config/baseUrl'
    import { Dialog } from 'vant';
    import vuedraggable from 'vuedraggable';
    import { Toast } from 'vant';
    export default {
        name: 'login',
        components: {
            vueQr,
            [ImagePreview.Component.name]: ImagePreview.Component,
            vuedraggable
        },
        data() {
            return {
                showzhehao:false,
                // A1 工卡
                // A2 打印
                // A3 餐饮
                // A4 通行
                // 预览
                applist:[],
                diaType:1,
                show:true,
                index: 0,
                images: [],
                HolidayList:[],
                app1:[],
                app2:[],
                faceshow: false,
                imgbaseUrl:baseUrl.imgurl,
                HolidayBalance:'',
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    // Some Swiper option/callback...
                },
            };
        },
        created() {
            // this.$api.getUserInfo({jobNumber:'20025311'}).then((res)=>{
            //     console.log(res)
            // })
            // qing.call('setWebViewTitle',{'title':'工卡'})
            // if (this.$dd.env.platform === "notInDingTalk"&& !unt.isYzjApp()) {
            //     this.showzhehao = true
            //     MessageBox({
            //         title: "友情提示",
            //         message: "该应用只能在iHaier客户端访问！",
            //         confirmButtonText: '去下载'
            //     }).then(action => {
            //         window.location.href = "https://openapi.haier.net/mock/load.html";
            //     });
            //     return
            // }
            let _this = this
            unt.getuserInfs(_this, this.getallQr)
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
        },
        methods: {
            background(url,item){
                console.log(url)
                console.log(item)
                let strurl='';
                // return 'url("'+url+'")'
                // return
                return 'url("'+url+'")'
            },
            jump(item){
                if(this.diaType==1){return}
                console.log(item.jumplink)
                window.location.href=item.jumplink
            },
            getleng(){
                let arr =  this.app1.filter((item)=>{return item.show==true});
                return arr.length
            },
            // 添加到我的应用
            addToMyApp(useItem){
                console.log(useItem)
                if(this.getleng()>=8){
                    Toast('我的应用最大数量为8个');
                    return
                }
                let index =false; //是否存在
                useItem.allshow=false
                this.app1.forEach((item)=>{
                    if(useItem.id==item.id){
                        index=true;
                        item.show=true
                    }
                })
                if(!index){
                    useItem.show=true
                    this.app1.push(useItem)
                }
            },
            clear(){
                if(this.diaType==1){
                    this.diaType=0
                }else {
                    this.show=false
                }
            },
            formatter(day) {
                console.log(day)
                const month = day.date.getMonth() + 1;
                const date = day.date.getDate();
                this.HolidayList.forEach((item)=>{
                    if(month == item.month){
                        if (date === parseInt(item.date.split('-')[2])) {
                            day.text = '休息';
                        }
                    }
                })
                return day;
            },
            delIcon(useitem,index){
                useitem.show=false
                Vue.set( this.app1,index , useitem )
                this.applist.forEach((item,index2)=>{
                    if(useitem.applyid==item.id||useitem.id==item.id){
                        item.allshow=true;
                        // Vue.set( this.applist,index2, item )
                    }
                })
            },
            //更新我的应用
            updateCustomMenu(){
                let arr =[];
                this.app1.forEach((item,index)=>{
                    if(item.show){
                        let ite ={
                            applyid:item.applyid||item.id,
                            sort:index,
                            empsn:this.userInfo.jobnumber
                        }
                        arr.push(ite)
                    }
                })
                let data ={
                    list:arr,
                    empsn:this.userInfo.jobnumber
                }
                this.$api.updateCustomMenu(data).then((res)=>{
                    // this.$router.go(-1);//返回上一层
                    this.diaType=0
                })
            },
            test(dataUrl,id){
                this.imgurls['img'+id]=dataUrl
            },
            spname(data) {
                let arrstr = data.split("/");
                if(arrstr.length<=3){
                    return arrstr[arrstr.length-2]
                }else {
                    return arrstr[arrstr.length-3]
                }
            },
            getPayStatus(){
                console.log(this.payCode)
                if(this.payCode){
                    let data ={
                        jobNumber:this.userInfo.userId,
                        payCode: encodeURIComponent(this.payCode)
                    }
                    this.$api.getPayStatus(data).then((res)=>{
                        let payStatus =res.code
                        if(payStatus==201||payStatus==200){
                            this.getPayCode(this.activeitem,this.activeindex)
                        }
                        if(payStatus==301){
                            clearInterval(this.t)
                            Dialog.alert({
                                title: '提示',
                                message: '余额不足',
                            }).then(() => {
                                // on close
                            });
                        }
                    })
                }
            },
            getCustomMenuByEmpsn(){
                this.$api.getCustomMenuByEmpsn({empsn:this.userInfo.jobnumber}).then((res)=>{
                    res.listA.forEach((item)=>{
                        item.show=true
                    })
                    res.listS.forEach((item)=>{
                        item.show=true
                    })
                    this.app1=res.listA
                    this.app2=res.listS
                    this.$api.pageList({applytype:'A',isuse:'1'}).then((res)=>{
                        console.log(res)
                        res.forEach((item,index)=>{
                            item.allshow=true
                            this.app1.forEach((item2)=>{
                                if(item.id==item2.applyid){
                                    item.allshow=false
                                }
                            })
                        })
                        this.applist=res

                    })
                })
            },
            getallQr() {
                this.$api.getHolidayList({}).then((res)=>{
                    console.log(res)
                    this.HolidayList=res
                })
                this.getCustomMenuByEmpsn()
                this.$api.getHolidayBalance({empsn:this.userInfo.jobnumber}).then((res=>{
                    console.log(res)
                    this.HolidayBalance=res
                }))
                this.$api.getPlayImgs({}).then((res)=>{
                    console.log(res)
                    this.images=res
                })
                // this.$api.selectByInfoCode({jobNumber: this.userInfo.userId}).then((res) => {
                //     this.roullData = res
                //     this.swiper.slideTo(3, 1000, false)
                //     this.roullData.forEach((item, index) => {
                //         if (item.code == 'A1') {
                //             this.createPrintCode(item, index)
                //         }
                //         if (item.code == 'A2') {
                //             this.createPrintCode(item, index)
                //         }
                //         if (item.code == 'A3') {
                //             this.getPayCode(item, index)
                //         }
                //         if (item.code == 'A4') {
                //             this.geturl(item, index)
                //         }
                //     })
                //     this.t=setInterval(()=>{
                //         this.getPayStatus()
                //     },2000)
                // })
            },
            goFace() {
                if (this.isDD) {
                    window.location.href = "https://hiface.haier.net/myface/newindex.html?showmenu=false";
                } else {
                    qing.call('gotoLightApp', {appId: '500000219', appName: '人脸识别'})
                }
            },
            goto(name, item) {
                this.$router.push({name: name})
            },
            // 打印二维码
            createPrintCode(item, index) {
                this.$api.createPrintCode({jobNumber: this.userInfo.userId}).then((res) => {
                    item.url = res
                    this.roullData.splice(index,1,item)
                    console.log(this.roullData)
                })

            },
            //通行二维码
            geturl(item, index) {
                this.$api.myUrl({validTime: 500, entryTimes: 10, jobNumber: this.userInfo.userId})
                    .then((res) => {
                        item.url = res.url
                        this.roullData.splice(index,1,item)
                    }).catch((err) => {
                    Toast(err);
                })
            },
            //餐厅二维码
            getPayCode(item, index) {
                this.$api.getPayCode({jobNumber: this.userInfo.userId}).then((res) => {
                    item.url = res;
                    this.activeitem =item
                    this.activeindex=index
                    this.payCode=res
                    this.roullData.splice(activeindex,1,activeitem)

                })
            },
            checktype(type) {
                this.checkindex = type
                console.log(this.roullData[type])
                this.swiper.slideTo(type, 1000, false)
            }
            // imgsrc() {
            //     return 'http://103.120.225.186:8080/workcard/ihaier/getFace?jobNumber=' + this.userInfo.jobnumber
            //     // return 'http://103.120.225.186:9003/hipass/ihaier/getFace?jobNumber=01515942'
            // },
        },
        mounted() {
        }
    };
</script>
<style>
    .van-toast__text{
     padding: 20px;
        font-size: 25px;
    }
    .myyy_con span{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .my-swipe{
        width: 688px;
        height: 300px;
        margin: 0 auto;
        margin-top: 20px;
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        text-align: center;
        border-radius: 10px;
        width: 688px;
        height: 300px;
        background: #00b1ff;
        line-height: 300px;
    }
    .van-calendar__header-title{
        display: none;
    }
    .van-calendar__header-subtitle{
        height: 84px;
        line-height: 84px;
        box-sizing: border-box;
        padding-left: 30px;
        text-align: left;
        font-size: 24px;
    }
    .van-swipe-item img{


    }
</style>
<style scoped>
    .complete{
        color: #00b1ff;
        font-size: 32px;
    }
    .clean{
        color: #ccc;
        font-size: 32px;
    }
    .closemy{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #ccc;
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        font-size: 40px;
        line-height: 40px;
        z-index: 9999;
        background-image: url("../assets/img/close.png");
        background-position: center;
        background-repeat: no-repeat ;
        background-size: 60% 60%;
    }
    .change_box{
        width: 100vw;
        height: 100vh;
    }
    .change_box_title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        height: 80px;
        line-height: 80px;
    }
    .back{
        background: url("../assets/img/back_icon.png") no-repeat center;
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
    }
    .fhcon{
        display: flex;
        align-items: center;
        font-size: 25px;
    }
.contents{
   min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
}
    .myyy{
        width: 688px;
        height: 403px;
        border-radius: 20px;
        background: #fff;
        margin: 0 auto;
        margin-top: 15px;
    }
    .all_app_text{
        background: url("../assets/img/all_icon.png") no-repeat center;
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        margin-right: 20px;
    }
    .myyytitle{
        height: 93px;
        line-height: 93px;
        font-size: 24px;
        padding-left: 30px;
    }
.yytitle{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.set_icon{
    background: url("../assets/img/set.png") no-repeat center;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    margin-right: 5px;
}
    .yyI_item{
        position: relative;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 18px;
    }

    .close{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background: #ccc;
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        font-size: 40px;
        line-height: 40px;
        z-index: 9999;
    }
    .close2{
        font-size: 40px;
        transform:rotate(0deg);
    }
    .yyI_item_icon{
        width: 80px;
        height: 80px;
        border-radius: 4px;
        background-size: 100% 100% !important;
    }
    .yytext{
        height: 50px;
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
    }
    .myyy_con{
        display: flex;
        flex-wrap: wrap;
        background: url("");
    }

    .calendarbox{
        height: 480px;
        width: 688px;
        margin: 0 auto;
        margin-top: 14px;
        position: relative;
    }
    .calendarboxr{
        position: absolute;
        right: 17px;
        top: 0;
        font-size: 24px;
        height: 84px;
        line-height: 84px;

    }
</style>
