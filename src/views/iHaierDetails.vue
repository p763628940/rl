<template>
    <div class="content">
        <div class="topPart">
            <div class="for_img1">
                <div class="position">
                    <div class="pos_item_left">申请人 :</div>
                    <div class="pos_item_right">{{detail.name}}</div>
                </div>
            </div>
            <div class="theLine1"></div>
            <div class="for_img2">
                <div class="position">
                    <div class="pos_item_left">工号 :</div>
                    <div class="pos_item_right">{{detail.jobNumber}}</div>
                </div>
            </div>
            <div class="theLine2"></div>

            <div class="for_img3">
                <div class="position">
                    <div class="pos_item_left">所属园区 :</div>
                    <div class="pos_item_right">{{detail.garden}}</div>
                </div>
            </div>
        </div>
        <div class="topPart" style="margin-top: 14px;">
            <div class="for_img4">
                <div class="position">
                    <div class="pos_item_left">通行区域 :</div>
                    <div class="pos_item_right">{{detail.area}}</div>
                </div>
            </div>
            <div class="theLine1"></div>
            <div class="for_img5">
                <div class="position">
                    <div class="pos_item_left">通行次数 :</div>
                    <div class="pos_item_right">{{detail.goCount}}</div>
                </div>
            </div>
            <div class="theLine2" style="margin-top: 22px"></div>
            <div class="for_img6">
                <div class="position">
                    <div class="pos_item_left">通行时间 :</div>
                    <div class="pos_item_right">{{detail.dateDay}}</div>
                </div>
            </div>
        </div>
        <div class="topPart" style="margin-top: 16px;height: 161px">
            <div class="position">
                <div class="for_img7">
                    <div class="pos_item_left" style="margin-top: -5px;margin-left: -5px">通行理由 :</div>
                </div>
            </div>
            <div class="font_area">
                <div><textarea v-model="forReason" disabled
                               style="background: rgba(243,243,243,1);border: none; margin-top: 9px;margin-left: 5px;outline: none"
                               name="Test" cols="40" rows="4" class="inputtext" placeholder="请输入原因"
                               id="joinReason"></textarea></div>
            </div>
        </div>
        <div class="forButtons" v-if="detail.status==10">
            <div class="subButton" @click="agree"><span class="subcontent">同意</span></div>
            <div class="rejButton" @click="reject"><span class="subcontent">拒绝</span></div>
        </div>
        <div class="subButtona" v-else-if="detail.status==-10||detail.status==20 && status == 1"><span class="subcontent2">审核中</span>
        </div>
        <div class="subButtona" v-else-if="status == 2"><span class="subcontent2">审核已通过</span></div>
        <div class="subButtona" v-else-if="status == 3"><span class="subcontent2">审核已驳回</span></div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    export default {
        data() {
            return {
                detail: {},
                forReason: '',
                status:1
            };
        },
        mounted() {
            if (this.isYzjApp()) {
                XuntongJSBridge.call('getPersonInfo', {},  (result)=>{
                    if (result.data.userName != null && result.data.userName != '') {
                        this.setUserInfo({
                            jobnumber:result.data.userName,
                            name:result.data.name,
                            userLevel:null
                        })
                        this.getDetail(this.$route.query.id);
                    } else {
                        Haier.toast("用户名获取失败!");
                    }
                });
            }
        },
        methods: {
            isYzjApp() {
                return navigator.userAgent.match(/Qing\/.*;(iOS|iPhone|Android).*/) ? true : false;
            },
            agree() {
                let ids = []
                ids.push(this.$route.query.id)
                this.$api.agree({ids: ids, auditor: this.userInfo.jobnumber}).then((res) => {
                    Toast('审核已通过');
                    this.status=2;
                    this.getDetail(this.$route.query.id);
                }).catch((err) => {
                    Toast(err.data.msg);
                    console.log(err)
                })
            },
            reject() {
                let ids = []
                ids.push(this.$route.query.id)
                this.$api.reject({ids: ids, auditor: this.userInfo.jobnumber}).then((res) => {
                    Toast('审核已驳回');
                    this.status=3;
                    this.getDetail(this.$route.query.id);
                }).catch((err) => {
                    console.log(err)
                })
            },
            getDetail(id) {
                let _this = this;
                const usedata = {id: id}
                this.$api.getdetails(usedata).then((res) => {
                    _this.detail = res;
                    this.forReason = res.applyReason;
                })
            }
        }
    };
</script>

<style scoped>
    .pos_item_left {
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(147, 147, 147, 1);
        padding-left: 29px;
        width: 100px;
    }

    .forButtons {
        display: flex;
        justify-content: space-between;
        width: 375px;
        padding: 0 20px 0 26px;
    }

    .pos_item_right {
        width: 150px;
        height: 15px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(65, 64, 64, 1);
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .area_item_left {
        width: 58px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(147, 147, 147, 1);
        margin-left: 28px;
    }

    .for_arrow {
        position: absolute;
        background: url("../assets/img/arrow.gif") no-repeat center;
        background-size: 100% auto;
        width: 15px;
        height: 25px;
        margin-left: 317px;
        margin-top: -21px;
    }

    .area_item_right {
        width: 60px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 20px;
        color: rgba(65, 64, 64, 1);
        margin-right: 40px;
        text-align: right;
    }

    .persion_item_left {
        width: 58px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(147, 147, 147, 1);
        margin-left: 28px;
    }

    .persion_item_right {
        width: 95px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(65, 64, 64, 1);
        float: right;
    }

    .for_img1 {
        background: url("../assets/img/examine_1.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 18px;
    }

    .for_img2 {
        position: absolute;
        background: url("../assets/img/examine_2.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        margin-top: 20px;
        width: 19.57px;
        height: 18px;
    }

    .for_img3 {
        position: absolute;
        background: url("../assets/img/examine_3.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        margin-top: 20px;
        width: 19.57px;
        height: 18px;
    }

    .for_img4 {
        background: url("../assets/img/examine_4.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 18px;
    }

    .for_img5 {
        background: url("../assets/img/examine_5.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 18px;
        margin-top: 20px;
    }

    .for_img6 {
        position: absolute;
        background: url("../assets/img/examine_6.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        margin-top: 20px;
        width: 19.57px;
        height: 18px;
    }

    .content {
        background: #f2f4f5;
        min-height: 100vh;
        padding-top: 31px;
        padding-bottom: 80px;
    }

    .topPart {
        width: 375px;
        height: 166px;
        background: white;
        padding-top: 23px;
    }

    .bottomPart {
        margin-top: 29px;
        width: 375px;
        height: 117px;
        background: rgba(255, 255, 255, 1);
        padding-top: 23px;
    }

    .subButton {
        background: url("../assets/img/agreebutton.png") no-repeat center;
        width: 160px;
        height: 53px;
        margin-top: 16px;
        padding-top: 12px;
    }

    .rejButton {
        background: url("../assets/img/rejectbutton.png") no-repeat center;
        width: 160px;
        height: 53px;
        margin-top: 16px;
        padding-top: 12px;

    }

    ::-webkit-input-placeholder {
        color: #bbbbbb;
        font-size: 3px;
    }

    .subcontent {
        position: relative;
        width: 43px;
        height: 15px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 26px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        align-items: center;
        margin-left: 63px;
    }

    .theLine1 {
        width: 317px;
        height: 1px;
        background: rgb(230, 230, 230);
        opacity: 1;
        margin-left: 30px;
        margin-top: 9px;
    }

    .theLine2 {
        width: 317px;
        height: 1px;
        background: rgb(230, 230, 230);
        opacity: 1;
        margin-left: 30px;
        margin-top: 55px;
    }

    .for_img7 {
        background: url("../assets/img/reason.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 32px;
        width: 12px;
        height: 13px;
        margin-top: -7px;
    }

    .font_area {
        width: 317px;
        height: 85px;
        background: rgba(243, 243, 243, 1);
        border: 1px solid rgba(210, 210, 210, 1);
        opacity: 1;
        border-radius: 6px;
        margin-top: 16px;
        margin-left: 23px;
    }

    .subButtona {
        width: 191px;
        height: 39px;
        background: rgba(218, 218, 218, 1);
        opacity: 1;
        border-radius: 20px;
        margin-left: 88px;
        text-align: center;
        margin-top: 16px;
        padding-top: 6px;
    }

    .subcontent2 {
        width: 45px;
        height: 15px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 26px;
        color: rgba(112, 112, 112, 1);

    }

    .position {
        display: flex;
        justify-content: space-between;
        height: 20px;
        flex-wrap: wrap;
        width: 315px;
    }
</style>
