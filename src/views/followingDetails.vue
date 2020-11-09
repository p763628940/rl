<template>
    <div class="followingContent">
        <div class="TopPart">
            <div class="fontItem">
                <div class="status_title">当前状态:</div>
                <div class="status_item">{{status==10?'审核中':'已完成'}}</div>
            </div>
            <div class="imgGroup">
                <div class="fontInImgGroup"><span class="fontItself">创建</span><span class="fontItself">{{status==10?"完成":''}}</span></div>
                <div class="stepNow" :style="{'margin-left':status== 10 ? '42%':'82%'}">
                    <div class="stepName"><span class="shenheOfstepName">{{status==10?'审核':'完成'}}</span></div>
                    <div class="Point"></div>
                </div>

                <div class="stepNow" v-if="status !== 10" style="margin-left: 42%">
                    <div class="theAname">审核</div>
                    <div class="Point"></div>
                </div>
                <div class="line"><div class="whiteLine" :style="{'width':status==10 ? '49%':'100%'}"></div></div>
                <div class="personOfimgGroup" v-if="status==10"><div class="yellowcircular"></div><div style="margin-top: -7px">当前处理人:{{auditorName}}</div></div>
            </div>
        </div>
        <div class="mainContents">
            <div class="liucheng">流程日志</div>
            <div class="singleCase">
                <div class="singleCase_item">
                    <div class="singleCase_item_l">
                        <div class="shuxian" style="background:#152C6E;"></div>
                        <span class="single_item1" style="color:#152C6E;">创建</span>
                    </div>
                    <span class="single_time">{{createdTIme}}</span>
                </div>
                <div class="singleLine L1" ></div>
                <div class="mainContent">
                    <div class="mainContent_inner">
                        <div class="mainContent_innerl">
                            <div class="mainTitle">创建人: </div><span class="targetData">{{applicant}}</span>
                        </div>
                   <span class="shenqing">发起申请</span>
                    </div>
                </div>
                <div class="detailsButton">
                    <span class="detailsItem" @click="goto('GoDetails',details)">查看详情</span>
                </div>
            </div>

            <div class="singleCase" >
                <div class="singleCase_item">
                    <div class="singleCase_item_l">
                        <div class="shuxian" style="background:#152C6E;"></div>
                        <span class="single_item1" style="color:#152C6E;">审核申请</span>
                    </div>
                    <span class="single_time">{{dateDay}}</span>
                </div>
                <div class="singleLine"></div>
                <div class="mainContent mainContent2">
                    <div class="mainContent_box">
                        <div class="mainContent_item">
                            <div class="mainTitle">审核人: </div><span class="targetData">{{auditorName}}</span>
                        </div>
                        <div class="mainContent_item">
                            <div class="mainTitle">电话: </div><span class="targetData">{{auditorMobile}}</span>
                        </div>
                        <div class="mainContent_item">
                            <div class="mainTitle">邮箱: </div><span class="targetData">{{auditorEmail}}</span>
                        </div>
                    </div>
                    <span class="shenheing">{{status==10?'正在审核中':'审核已完成'}}</span>
                </div>
            </div>

            <div class="singleCase singleCase2">
                <div class="singleCase_item">
                    <div class="singleCase_item_l">
                        <div class="shuxian" style="background:#152C6E;"></div>
                        <span class="single_item1" style="color:#152C6E;">通行码下发</span>
                    </div>
                    <span class="single_time">{{dateDay}}</span>
                </div>
                <div class="singleLine"></div>
                <div class="mainContent">
                    <div class="mainContent_box">
                        <div class="mainContent_item">
                            <div class="mainTitle"> Hi-Face : </div><span class="targetData"></span>
                        </div>
                    </div>
                    <span class="shenheing" style="color: #00AF41;margin-top: 18px">{{status==10?'等待处理中':'审核已完成'}}</span>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                applicant: '',
                details:{},
                auditor:'',
                status: '',
                timeValue: '',
                today: "2020/06/22",
                name: '',
                times: "1",
                area: '',
                position: '',
                persion: '',
                message: "请选择通行次数",
                popupVisible: false,
                createdTIme:'',
                dateDay:''
            };

        },
        mounted() {
            if(this.detailsId){
                this.getData(this.detailsId);
                this.setDetais('');
            }else{
                this.getData(this.$route.params.id);
            }
        },
        methods: {
            getData(id) {
                Indicator.open();
                this.$api.getdetails({id:id}).then((res) => {
                    this.details = res;
                    this.createdTIme= this.timestampToTime(res.createTime);
                    this.dateDay=res.dateDay;
                    this.applicant=res.name;
                    this.auditor =res.auditor;
                    this.auditorName =res.auditorName
                    this.auditorEmail=res.auditorEmail;
                    this.auditorMobile=res.auditorMobile;
                    this.status=res.status;
                    Indicator.close();
                }).catch((err) => {
                    console.log(err)
                    Indicator.close();
                })
            },
            timestampToTime(time) {
                var date = new Date(time * 1) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + (date.getDate() ) : date.getDate())
                var h = date.getHours() + ':'
                var m = date.getMinutes() + ':'
                var s = date.getSeconds()
                return Y + M + D
            },
            handleChange(value) {
                this.today = this.$moment(value).format('YYYY-MM-DD')
            },
            goto(name,item){
                this.$router.push({ name: name, params: { id: item.id }})
            },
        },

    };
</script>

<style scoped>
    .shenheing{
        width:60px;
        height:12px;
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:500;
        line-height:10px;
        color:rgba(208,8,8,1);
    }
    .followingContent {
        background: #f2f4f5;
        min-height: 100vh;
        padding-bottom: 80px;
        width: 375px;
    }
    .TopPart{
        width:375px;
        height:267px;
        background:linear-gradient(138deg,rgba(60,115,255,1) 0%,rgba(113,174,255,1) 100%);
        opacity:1;
        display: flex;
        flex-wrap: wrap;
    }
    .mainContents{
        margin-top: 15px;
        background: white;
        height: 484px;
        width: 375px;
        flex-wrap: wrap;
        padding-top: 15px;

    }
    .liucheng{
        margin-left: 19px;
        height:15px;
        font-size:15px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        line-height:26px;
        color:rgba(0,0,0,1);
    }

    .case2{
        margin-top: 19px;height: 141px;padding-bottom:20px
    }
    .singleCase_item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 0 11px;
    }
    .singleCase_item_l{
        display: flex;
        align-items: center;
    }
    .singleCase2{
        height: 97px !important;
    }
    .singleCase{
        width:337px;
        height:149px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity:0.8;
        border-radius:4px;
        align-items: center;
        margin: 0 auto;
        margin-top: 16px;
    }
    .single_item1{
        font-size:15px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(208,8,8,1);
        opacity:1;
        margin-left: 6px;
        margin-right: 0;
        margin-top: -3px;
    }
    .shuxian{
        width:2px;
        height:15px;
        background:rgba(208,8,8,1);
        opacity:1;
    }
    .single_time{
        height:9px;
        font-size:9px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(147,147,147,1);
        opacity:1;
    }
    .singleLine{
        width:322px;
        height: 1px;
        background: rgb(230, 230, 230);
        margin-left: 12px;
    }
    .mainContent{
        position: relative;
        padding:  0 11px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }
    .mainContent_inner{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .mainContent_innerl{
        display: flex;
        align-items: center;
    }
    .mainContent_item{
        line-height: 20px;
    }
    .mainContent_item{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .mainTitle{
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(141,141,141,1);
        width: 60px;
    }
    .targetData{
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(42,42,42,1);
        float: right;
    }
    .detailsButton{
        width:104px;
        height:25px;
        background:rgba(25,94,215,1);
        border-radius:12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 24px;

    }
    .detailsItem{
        width:40px;
        height:6px;
        font-size:9px;
        font-family:Source Han Sans CN;
        font-weight:500;
        line-height:16px;
        color:rgba(255,255,255,1);
        opacity:1;
        margin-bottom: 9px;
        z-index: 999;
    }
    .shenqing{
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(25,94,215,1);
    }
    .fontItem{
        height: 50px;
        width: 90px;
        margin-top: 65px;
        margin-left: 143px;
    }
    .status_title{
        width:60px;
        height:12px;
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:300;
        line-height:20px;
        color:rgba(255,255,255,1);
        margin-left: 18px;
    }
    .status_item{
        text-align: center;
        width:90px;
        height:30px;
        font-size:30px;
        font-family:Source Han Sans CN;
        font-weight:500;
        line-height:51px;
        color:rgba(255,255,255,1);
        margin-top: 7px;
    }
    .fontInImgGroup{
        height: 30px;
        display: flex;
        justify-content: space-between;
        margin-top: 34px;
    }
    .fontItself{
        width:22px;
        height:9px;
        font-size:9px;
        font-family:Source Han Sans CN;
        font-weight:300;
        line-height:16px;
        color:rgba(255,255,255,1);
        margin-left: 28px;
        margin-right: 19px;
        margin-top: 12px;
    }
    .imgGroup{
        width: 370px;
        height:105px;
    }
    .line{
        background: url("../assets/img/line.png") no-repeat center;
        width: 305px;
        height: 2px;
        margin-left: 38px;
    }
    .stepNow{
        width: 60px;
        height: 60px;
        margin-left: 135px;
        position: absolute;
        top: 162px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .stepName{
        background: url("../assets/img/maopao.png") no-repeat center;
        width: 58px;
        height: 25px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .shenheOfstepName{
        width:24px;
        height:12px;
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:500;
        line-height:20px;
        color:rgba(21,44,110,1);
        margin-bottom: 13px;
    }
    .Point{
        background: url("../assets/img/point.png") no-repeat center;
        width: 31px;
        height: 31px;
    }
    .whiteLine{
        width:129px;
        height:0px;
        border:2px solid rgba(255,255,255,1);
        opacity:1;
        z-index: 99;
        background: white;
    }
    .personOfimgGroup{
        width:125px;
        height:12px;
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:500;
        line-height:20px;
        color:rgba(244,255,190,1);
        margin-left: 137px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        padding-right: 12px;
    }
    .yellowcircular{
        width:7px;
        height:7px;
        background:rgba(235,255,138,1);
        border-radius:50%;
    }
    .theAname{
        width:50px;
        height:9px;
        font-size:9px;
        font-family:Source Han Sans CN;
        font-weight:300;
        line-height:16px;
        color:rgba(255,255,255,1);
        margin: 0 auto;
        text-align: center;
        margin-top: 20px;
    }
</style>
