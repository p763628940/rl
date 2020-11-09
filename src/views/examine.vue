<template>
    <div class="content" id="applyPassport">
        <div class="single_Item_content"  v-for="(item,index) in singleApply" :key="index">
            <div class="main_contents_single_Item">
                <div class="single_row">
                    <div class="for_img1"><div class="for_content">通行区域:</div></div>
                    <div class="forDatas">{{item.area}}</div>
                </div>
                <div class="single_row notFisrt">
                    <div class="for_img2"><div class="for_content">通行次数:</div></div>
                    <div class="forDatas">{{item.times}}次访问</div>
                </div>

            </div>
        </div>
        <!--        <div class="topPart">-->
        <!--            <div class="position">-->
        <!--                <div class="for_img1">-->
        <!--                    <div class="area_item_left">通行区域 :</div>-->
        <!--                    <div class="area_item_right" @click="ShouPup('position')">{{position-->
        <!--                        ||"请选择通行区域"}}-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="area">-->
        <!--                <div class="for_img2">-->
        <!--                    <div class="area_item_left">通行次数 :</div>-->
        <!--                    <div class="area_item_right" style="left: 10px;" @click="ShouPup('times')">{{times}}访问</div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="persion" v-if="userInfo.userLevel!=='09'">-->
        <!--                <div class="for_img3">-->
        <!--                    <img :src="img3" alt="">-->
        <!--                    <div class="persion_item_left">审核人 :</div>-->
        <!--                    <div class="persion_item_right" disabled>-->
        <!--                        {{persion ||"请选择审核人"}}-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <div class="bottomPart">-->
        <!--            <div class="position">-->
        <!--                <div class="for_img4">-->
        <!--                    <div class="pos_item_left">通行时间 :</div>-->
        <!--                    <div class="pos_item_right"  @click="open('datatimePicker')">{{today}}</div>-->
        <!--                </div>-->
        <!--                <div class="for_arrow"></div>-->
        <!--            </div>-->
        <!--            <div class="theLine1"></div>-->
        <!--            <div class="area">-->
        <!--                <div class="for_img5">-->
        <!--                    <div class="area_item_left">通行次数 :</div>-->
        <!--                    <div class="area_item_right" style="left: 10px;" @click="ShouPup('times')">{{times}}</div>-->
        <!--                </div>-->
        <!--                <div class="for_arrow"></div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="topPart part2">
            <div class="position">
                <div class="for_img83">
                    <div class="pos_item_left">审核人 :</div>
                    <div class="pos_item_right">{{persion}}</div>
                </div>
            </div>
            <div class="theLine1"></div>
            <div class="position second">
                <div class="for_img4">
                    <div class="pos_item_left pastime">通行时间 :</div>
                    <div class="pos_item_right">{{today}}</div>
                </div>
            </div>
            <div class="theLine1"></div>
            <div class="position">
                <div class="for_img7">
                    <div class="pos_item_left reason2">通行理由 :</div>
                </div>
            </div>
            <div class="font_area">
                <div><textarea
                        style="background: rgba(243,243,243,1);outline: none"
                        name="Test" cols="45" rows="4" class="inputtext" placeholder="请输入原因"
                        v-model="notedata"></textarea>
                </div>
            </div>
            <div class="forButtons" v-if="status !==-10 && status !==20">
                <div class="subButton" @click="agree"><span class="subcontent">同意</span></div>
                <div class="rejButton" @click="reject"><span class="subcontent">拒绝</span></div>
            </div>
        </div>
        <mt-datetime-picker
                ref="datatimePicker"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="timeValue"
                :startDate="new Date()"
                @confirm="handleChange"
        ></mt-datetime-picker>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
            <div class="for_arrow2" @click="go_bk">取消</div>
            <div class="font_area2">
                选择办公区域
            </div>
            <div class="forNew" @click="selected">确定</div>
            <div class="select_area">

                <div class="left_area">
                    <mt-picker :slots="slots" value-key="name" @change="onValuesChange" showToolbar></mt-picker>
                </div>
                <div class="mid_position" ref="spPicker">
                    <mt-picker :slots="slots2" value-key="name" @change="onValuesChange2" showToolbar></mt-picker>
                </div>
                <div class="right_times">
                    <mt-picker :slots="slots4" @change="onValuesChange4" showToolbar></mt-picker>
                </div>
            </div>
            <!--            <mt-picker v-show="status=='persion'" :slots="slots3" value-key="name" @change="onValuesChange3" style="width: 375px;" showToolbar></mt-picker>-->

        </mt-popup>

        <div id="mypopsss">
            <mt-popup
                    v-model="popupVisible2"
                    popup-transition="popup-fade">
                <div class="mypopups">
                    <div class="mypopups_top">
                        <div class="mypopups_topl"></div>
                        <div class="mypopups_topr">无需申请，请直接扫码通行</div>
                    </div>
                    <div class="qr" @click="popupVisible2=false">确 认</div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import {Toast} from "mint-ui";
    import ddbase from "../api/ddbase";
    import unt from "../utils/unti"
    export default {
        data() {
            return {
                popupVisible2: false,
                img3: require("../assets/img/apply_3.png"),
                initList: [],
                slots: [
                    {
                        flex: 1,
                        values: ['请选择园区'],
                        className: 'slot1',
                        valueKey: 'name'
                    },
                ],
                slots2: [
                    {
                        flex: 1,
                        values: ['a区域', 'b区域', 'c区域'],
                        className: 'slot1',
                        valueKey: 'name',
                        content: 'select',
                    }
                ],
                slots4: [
                    {
                        values: ['1次'],
                        // ['1', '2', '3', '4', '5', '10', '20'],
                    }
                ],
                status: '',
                singleApply:[],
                timeValue: '',
                today: '',
                name: '',
                times: "1",
                area: '',
                position_id: '',
                position: '',
                loading:false,
                persion: '',
                persion_id: '',
                message: "请选择通行次数",
                popupVisible: false,
                allData: [],
                top1: 0,
                notedata: '',
                forgardenList: [],
                forareaList: [],
                forarea: '',
                seledA: false,
                seledP: false,
            };
        },
        watch: {
            // popupVisible(val, oldVal){
            //    alert("old"+val+"new:"+oldVal);
            // }
        },
        mounted() {
            // var refoutsidecomponentTem={
            //     template:"<div class='childComp'>test</div>"
            // };
            let _this = this;
            let nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            this.today = date.year + '-' + 0 + date.month + '-' + date.date;
            unt.getuserInfs(_this, this.getData);


            // const newfood = this.$createElement(
            //     // {String | Object | Function}
            //     // 一个 HTML 标签，组件设置，或一个函数
            //     // 必须 Return 上述其中一个
            //     'span',
            //     // {Object}
            //     // 一个对应属性的数据对象
            //     // 您可以在 template 中使用.可选项.
            //     {
            //         style: {
            //             width: "20px",
            //             position: "absolute",
            //             height: "20px",
            //             background: "#fafafa",
            //             border: "2px solid #0f97ff",
            //             right: "20px",
            //             top:"6px"
            //         },
            //     },
            // )
            var newfood = document.createElement('div');

            // foodMenu.appendChild(newfood);
            newfood.innerText = "1";
            newfood.className = "chebox";
            // newfood2.innerText = "2";
            this.$refs.spPicker.querySelectorAll('.picker-item').forEach(item => {
                item.append(newfood.cloneNode());
            });
            // this.$refs.spPicker.querySelectorAll('.picker-item').append(newfood);
            // document.queryselectorAll('.mid_position .picker-item picker-selected').append(newfood);
        },
        methods: {
            getData() {
                Indicator.open();
                let _this = this;
                this.$api.getdetails({id:this.$route.params.id}).then((res) => {
                    for (let i = 0; i <res.area.split(",").length; i++) {
                        let nL=[];
                        nL.area=res.garden.split(",")[i]+"-"+ res.area.split(",")[i]
                        nL.times=res.goCount.toString().split(",")[i]
                        _this.singleApply.push(nL);
                    }
                    this.persion=res.auditorName;
                    this.notedata=res.applyReason;
                    this.today=res.dateDay;
                    this.status=res.status;
                    // _this.forareaList=res.gardenList[0].areaList;
                    // _this.slots[0].values = res.gardenList;
                    // _this.slots2[0].values = res.gardenList[0].areaList;
                    Indicator.close();
                }).catch((err) => {
                    console.log(err);
                    Indicator.close();
                })
            },
            agree() {
                Indicator.open();
                let ids =[]
                ids.push(this.$route.params.id)
                this.$api.agree({ids: ids, auditor: this.userInfo.jobnumber}).then((res) => {
                   Indicator.close();
                    Toast('审核已通过');
                    this.$router.push({ name: 'CheckList'})
                }).catch((err) => {
                    Indicator.close();
                    Toast(err.data.msg);
                    console.log(err)
                })
            },
            reject() {
                Indicator.open();
                let ids =[]
                ids.push(this.$route.params.id)
                this.$api.reject({ids: ids, auditor: this.userInfo.jobnumber}).then((res) => {
                    Indicator.close();
                    Toast('审核已驳回');
                    this.$router.push({ name: 'CheckList'})
                }).catch((err) => {
                    Indicator.close();
                    console.log(err)
                })
            },
            removeItem(index){
                this.singleApply.splice(index,1);
            },
            submit() {
                if (this.userInfo.userLevel === '09') {
                    this.popupVisible2 = true
                    return;
                }
                if (!this.position_id) {
                    Toast('请选择通行区域!');
                    return;
                }
                if (!this.persion_id) {
                    Toast('没有审核人无法提交!');
                    return;
                }
                if (!this.notedata) {
                    Toast('请输入原因!');
                    return;
                }
                let subParams = {
                    areaId: this.position_id,
                    jobNumber: this.userInfo.jobnumber,//this.userInfo.jobnumber,//this.userInfo.jobnumber
                    auditor: this.persion_id,
                    dateDay: this.today,
                    goCount: this.times.split("次")[0],
                    applyReason: this.notedata,
                    name: this.userInfo.name,//"姚远方",//this.userInfo.name
                    auditorName: this.persion,
                    userLevel: this.userInfo.userLevel
                }
                this.$api.requestForTimes(subParams).then((res) => {
                    console.log(res);
                    this.$router.push({name: 'ApplyList'})
                }).catch((err) => {
                    Toast('本区域已有申请在审核中');
                })
            },
            open(picker) {
                // 初始化时间为当前时间，可填满上部空白，可选过期时间
                this.timeValue = new Date()
                this.$refs[picker].open()
            },
            ShouPup() {
                this.slots[0].values = this.forgardenList;
                this.popupVisible = true
            },
            // ShouPup(which) {
            //     switch (which) {
            //         case "area":
            //             this.status = "area";
            //             this.slots[0].values = this.forgardenList;
            //             break
            //         case "position":
            //             if(this.area =='请选择通行园区' ||this.area ==''){
            //                 Toast('请先选择通行园区');
            //                 return
            //             }else{
            //                 this.slots2[0].values=this.forareaList;
            //             }
            //             this.status = "position";
            //             break;
            //         case "persion":
            //             this.status = "persion";
            //             break
            //         case "times":
            //             this.status = "times";
            //             break
            //         default:
            //             //这里是没有找到对应的值处理
            //             break
            //     }
            //     this.popupVisible = true
            // },
            go_bk() {
                this.popupVisible = false
            },
            selected() {
                this.popupVisible = false;
            },
            onValuesChange3(picker, values) {
                this.persion = values[0].name
            },
            onValuesChange4(picker, values) {
                this.times = values[0];
            },

            handleChange(value) {
                this.noScroll();
                this.today = this.$moment(value).format('YYYY-MM-DD')
            },
        },
    };
</script>
<style>
    #applyPassport .picker {
        min-width: calc(475px - 100px);
    }

    #applyPassport .picker mint-datetime-picker {
        min-width: calc(475px - 100px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    #applyPassport .picker-toolbar {
        background: white;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #applyPassport .picker-slot-wrapper {
        background: white;
    }

    #applyPassport .left_area .picker-items {
        display: inline-flex;
        background: white;
        top: 12px;
        width: 148px;
        height: 35vh;
    }

    #applyPassport .mid_position .picker-items {
        display: inline-flex;
        background: white;
        top: 12px;
        width: 148px;
        height: 35vh;
        margin-left: 22px;
    }

    #applyPassport .mid_position .picker-item {
        text-align: left;
    }

    #applyPassport .right_times .picker-items {
        display: inline-flex;
        background: white;
        top: 12px;
        width: 70px;
        height: 35vh;
        margin-left: -5px;
    }

    #applyPassport .picker-selected {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 26px;
        color: rgba(15, 151, 255, 1);
    }

    #mypopsss.mint-popup {
        background: none;
    }

</style>

<style scoped>
    .aNA_contents {
        width: 102px;
        height: 15px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 26px;
        color: rgba(2, 97, 255, 1);
        margin: 0 auto;
        line-height: 48px;
    }

    .left2 {
        width: 125px !important;
    }

    .left3 {
        width: 90px !important;
    }

    .addNewArea {
        width: 348px;
        height: 48px;
        margin: 0 auto;
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .left_area {
        width: 130px;
        white-space: nowrap;
        display: inline-block;
    }

    .mid_position {
        width: 130px;
        white-space: nowrap;
        display: inline-block;
    }

    .right_times {
        width: 80px;
        margin-left: 45px;
        white-space: nowrap;
        display: inline-block;
    }
    .pastime{
        margin-left: 26px !important;
    }
    .single_row {
        height: 12px;
        width: 100%;
        white-space: nowrap;
        display: inline-block;
    }

    .select_area {
        display: flex;
        width: 375px;
        flex-wrap: wrap;
        white-space: nowrap;
        display: inline-block;
        background: rgba(247, 247, 247, 1);
        height: 284px;
        margin-top: 8px;
    }

    .LongContent {
        width: 270px;
    }

    .forDatas {
        text-align: right;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        margin-top: 5px;
        color: rgba(154, 154, 154, 1);
    }

    .notFisrt {
        margin-top: 11px;
    }

    .single_Item_content {
        width: 348px;
        height: 76px;
        background: white;
        margin: 0 auto;
        padding-top: 18px;
        margin-top: 10px;
        position: relative;
    }

    .main_contents_single_Item {
        width: 295px;
        height: 36px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }

    .qr {
        width: 93px;
        height: 28px;
        background: rgba(6, 55, 158, 1);
        opacity: 1;
        border-radius: 8px;
        text-align: center;
        line-height: 28px;
        margin-top: 29px;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
    }
    .removeClass{
        background: url("../assets/img/deleteIonic.png") no-repeat center;
        background-size: 100% auto;
        width: 14px;
        height: 14px;
        margin-top: -10%;
        margin-left: 94%;
    }

    .mypopups {
        width: 282px;
        height: 135px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px !important;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .mypopups_topr {
        margin-left: 13px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(70, 70, 70, 1);
    }

    .mypopups_top {
        display: flex;
        margin-top: 32px;
        align-items: center;
    }

    .mypopups_topl {
        width: 24px;
        height: 24px;
        background: url("../assets/tip_icon.png") no-repeat center;
        background-size: 100% 100%;
    }

    ::-webkit-input-placeholder {
        font-size: 12px;
    }

    .font_area textarea {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        padding-left: 10px;
        padding-top: 6px;

    }

    .part2 {
        margin-top: 12px;
        height: 300px !important;
        padding-top: 10px !important;
    }

    .pos_item_left {
        position: absolute;
        width: 70px;
        height: 15px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(44, 44, 44, 1);
        margin-left: 28px;
        display: flex;
        justify-content: space-between;
    }

    .reason2 {
        margin-left: 25px;
        margin-top: -2px;
    }

    .pos_item_right {
        text-align: right;
        right: 42px;
        position: absolute;
        width: 169px;
        height: 17px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(155, 155, 155, 1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .area_item_left {
        position: absolute;
        width: 70px;
        height: 15px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(44, 44, 44, 1);
        margin-left: 28px;
        display: flex;
        justify-content: space-between;
    }

    .forNew {
        position: absolute;
        right: 0;
        margin: 20px;
    }

    .for_arrow {
        position: absolute;
        background: url("../assets/img/arrow.gif") no-repeat center;
        background-size: 100% auto;
        width: 12px;
        height: 22px;
        margin-left: 335px;
        margin-top: -21px;
    }

    .area_item_right {
        text-align: right;
        position: absolute;
        width: 150px;
        right: 52px;
        height: 17px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(155, 155, 155, 1);
        margin-left: 169px;
        left: -17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .persion_item_left {
        position: absolute;
        width: 70px;
        height: 17px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(44, 44, 44, 1);
        margin-left: 28px;
        margin-top: -18px;
    }

    .persion_item_right {
        text-align: right;
        position: absolute;
        width: 150px;
        height: 17px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(155, 155, 155, 1);
        margin-left: 169px;
        left: -17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: -18px;
    }

    .for_img1 {
        position: absolute;
        background: url("../assets/img/examine_4.png") no-repeat center;
        background-size: 100% auto;
        width: 21px;
        height: 21px;
    }

    .for_img4 {
        background: url("../assets/img/examine_6.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 31px;
        width: 19.57px;
        height: 20px;
    }
    .for_img83 {
        background: url("../assets/img/examine_1.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 30px;
        width: 19.57px;
        height: 20px;
    }

    .for_img2 {
        position: absolute;
        background: url("../assets/img/examine_5.png") no-repeat center;
        background-size: 100% auto;
        width: 21px;
        height: 21px;
    }

    .for_img5 {
        background: url("../assets/img/apply_5.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 20px;
        margin-top: 18px;
    }

    .for_img3 {
        position: absolute;
        background: url("../assets/img/newperson.png") no-repeat center;
        background-size: 100% auto;
        width: 13px;
        height: 13px;
        margin-left: 1px;
    }


    .for_img7 {
        position: absolute;
        background: url("../assets/img/newItem83.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 34px;
        margin-top: 10px;
        width: 13px;
        height: 13px;
    }

    .content {
        background: #f2f4f5;
        min-height: 100vh;
        padding-top: 16px;
        padding-bottom: 80px;
    }

    .topPart {
        width: 375px;
        height: 166px;
        background: white;
        padding-top: 23px;
    }

    .bottomPart {
        margin-top: 18px;
        width: 375px;
        height: 117px;
        background: rgba(255, 255, 255, 1);
        padding-top: 23px;
    }
    .forButtons {
        display: flex;
        justify-content: space-between;
        width: 375px;
        margin-top: 10px;
        padding: 0 20px 0 26px;
    }
    .subButton {
        background: url("../assets/img/agreebutton.png") no-repeat center;
        width: 160px;
        height: 53px;
        padding-top: 12px;
    }
    .rejButton {
        background: url("../assets/img/rejectbutton.png") no-repeat center;
        width: 160px;
        height: 53px;
        padding-top: 12px;
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

    .persion {
        display: flex;
        justify-content: space-between;
    }

    .for_img6 {
        background: url("../assets/img/applyReason.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 18px;
    }

    .font_area {
        width: 317px;
        height: 118px;
        background: rgba(243, 243, 243, 1);
        border: 1px solid rgba(210, 210, 210, 1);
        opacity: 1;
        border-radius: 6px;
        margin-top: 35px;
        margin-left: 23px;
    }
    .second{
        margin-top: 10px;
    }
    .picker-items {
        bottom: 28px;
        margin-top: -33px;
        display: inline-flex;
    }

    .font_area2 {
        font-size: 15px;
        font-weight: 500;
        color: rgba(44, 44, 44, 1);
        position: absolute;
        margin-top: 20px;
        left: 50%;
        width: 120px;
        margin-left: -60px;
        height: 16px;
        line-height: 16px;
        text-align: center;
    }

    .for_arrow2 {
        position: absolute;
        left: 0;
        margin: 20px;
    }

    .area {
        margin-top: -12px;
    }

    .for_content{
        margin-left: 25px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        margin-top: 1.533vw;
    }
    .persion {
        margin-top: -18px;
    }
</style>
