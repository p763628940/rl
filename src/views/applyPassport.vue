<template>
    <div class="content" id="applyPassport">
        <div class="single_Item_content" v-if="singleApply.length>0" v-for="(item,index) in singleApply" :key="index">
            <div class="main_contents_single_Item" @click="ShouTimesPup(item,index)">
                <div class="single_row">
                    <div class="for_img1"><div class="for_content">通行区域:</div></div>
                    <div class="forDatas">{{item.areaName}}</div>
                </div>
                <div class="single_row notFisrt">
                    <div class="for_img2"><div class="for_content">通行次数:</div></div>
                    <div class="forDatas">{{item.goCount}}次</div>
                </div>
                <div class="single_row notFisrt">
                    <div class="for_img3"><div class="for_content">审核人:</div></div>
                    <div class="forDatas">{{item.auditorName}}</div>
                </div>
            </div>
            <div class="removeClass" @click="removeItem(index)"></div>
        </div>
        <div class="addNewArea">
            <div class="aNA_contents" @click="ShouPup">+添加通行申请</div>
        </div>
        <div class="aNA_contents_bt">
            请多选申请区域，实现来往楼宇通行
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
                <div class="for_img4">
                    <div class="pos_item_left">通行时间 :</div>
                    <div class="pos_item_right" @click="open('datatimePicker')">{{today}}</div>
                </div>
                <div class="for_arrow"></div>
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
            <div class="subButton" @click="submit"><span class="subcontent">提交申请</span></div>
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
            <div class="top_title">
                <div class="for_arrow2" @click="go_bk">取消</div>
                <div >
                    选择申请区域
                </div>
                <div  @click="selected">确定</div>
            </div>

            <div class="select_area">
                <div class="left_area">
                    <div class="single_area" :style="{'background': (activegarInxex==index ? 'white':'')}" v-for="(item,index) in forareaList" :key="index">
                        <span :class="[activegarInxex==index?'active':'']"
                              @click="activegarInxex=index">{{item.name}}</span>
                    </div>
                </div>
<!--                <div class="shuxian_box"></div>-->
                <div class="mid_position">
                    <mt-checklist
                            v-model="value"
                            align="right"
                            @change="checkon($event)"
                            :options="options">
                    </mt-checklist>
                    <!--                    <div class="left_area">-->
                    <!--                        <div class="single_area" v-for="(item,index) in forarea2List" :key="index">{{item}}</div>-->
                    <!--                    </div>-->
                </div>
            </div>
            <!--            <mt-picker v-show="status=='persion'" :slots="slots3" value-key="name" @change="onValuesChange3" style="width: 375px;" showToolbar></mt-picker>-->

        </mt-popup>
        <mt-popup v-model="popupVisible3" popup-transition="popup-fade" id="forDate" closeOnClickModal="true" position="bottom">
            <div class="top_title">
                <div @click="go_bk2">取消</div>
                <div >
                    选择通行次数
                </div>
                <div  @click="selected2">确定</div>
            </div>
            <mt-picker :slots="slots4" @change="onValuesChange4" style="width: 375px;" showToolbar></mt-picker>
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
        <div style="display: none" v-if="forareaList.length>0">{{activeAre}}</div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import {Indicator} from 'mint-ui';
    import ddbase from "../api/ddbase";
    import unt from "../utils/unti"

    export default {
        data() {
            return {
                activegarInxex: 0,
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
                value: [],
                //checklist设置
                options: ['区域1', '区域2', '区域3', '区域4', '区域5', '区域6', '区域7', '区域8', '区域9'],
                status: '',
                singleApply: [],
                popupVisible3: false,
                timeValue: '',
                today: '',
                name: '',
                times: "1",
                area: '',
                position_id: '',
                position: '',
                persion: '',
                goCount:'',
                persion_id: '',
                message: "请选择通行次数",
                popupVisible: false,
                allData: [],
                top1: 0,
                isActive: false,
                notedata: '',
                forareaList: [],
                forarea2List: ['区域1', '区域2', '区域3', '区域4', '区域5', '区域6', '区域7', '区域8', '区域9'],
                forarea: '',
                selectedTimes:'0',
                seledA: false,
                seledP: false,
                selectedItem: "0",
                noOne: false,
                applyListV: []
            };
        },
        watch: {
            forareaList: {
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler(curVal, oldVal) {
                    console.log(curVal, oldVal);
                },
                deep: true
            }
        },
        computed: {
            activeAre() {
                this.options = this.forareaList[this.activegarInxex].areaList
                return ''
            }
        },
        mounted() {
            // var refoutsidecomponentTem={
            //     template:"<div class='childComp'>test</div>"
            // };
            let _this = this;
            let nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1) + '-',
                date: (nowDate.getDate() < 10 ? '0' + (nowDate.getDate()) : nowDate.getDate())
            }
            this.today = date.year + '-' + date.month + date.date;
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
            // this.$refs.spPicker.querySelectorAll('.picker-item').forEach(item => {
            //     item.append(newfood.cloneNode());
            // });
            // this.$refs.spPicker.querySelectorAll('.picker-item').append(newfood);
            // document.queryselectorAll('.mid_position .picker-item picker-selected').append(newfood);
        },
        methods: {
            getData() {
                Indicator.open();
                let _this = this;
                this.$api.getAllAreaParams({}).then((res) => {
                    _this.status = "area"
                    _this.allData = res;
                    res.gardenList.forEach((item)=>{
                        item.checked_ = false;
                        item.areaList.forEach((item2)=>{
                            item2.value = {
                                areaId: item2.id,
                                jobNumber: this.userInfo.jobnumber,//this.userInfo.jobnumber,//this.userInfo.jobnumber
                                // auditor: this.persion_id,
                                goCount: '1',
                                name: this.userInfo.name,//"姚远方",//this.userInfo.name
                                // auditorName: this.persion,
                                userLevel: this.userInfo.userLevel,
                                goType: item2.goType,
                                areaLevel:item2.areaLevel,
                                applyCount: item2.applyCount,
                                areaName: item.name + "-" + item2.name
                            }
                            item2.label = item2.name

                        })
                    })
                    _this.forareaList = res.gardenList;
                    _this.options =  _this.forareaList[0].areaList;
                    Indicator.close();
                    // _this.options=res.gardenList[0].areaList;
                    // _this.slots[0].values = res.gardenList;
                    // _this.slots2[0].values = res.gardenList[0].areaList;
                }).catch((err) => {
                    console.log(err)
                    Indicator.close();
                })
            },
            ShouTimesPup(item, index) {
                this.selectedItem = index;
                let list = [];
                for (let i = 1; i <= item.applyCount * 1; i++) {
                    list.push(i * 1);
                }
                this.slots4[0].values = list;
                this.popupVisible3 = true
            },
            removeItem(index) {
                this.singleApply.splice(index, 1);
                this.singleApply.forEach(item => {
                    if (!item.auditor) {
                        this.noOne = true;
                        return
                    } else {
                        this.noOne = false;
                    }
                });
            },
            checkon(event) {
                console.log(event)
                this.applyListV = this.value;
            },
            seletedItem(item, index) {
                let _this = this;
                if (item.checked_ == false) {
                    this.$set(
                        _this.forareaList[index],
                        'checked_',
                        true,
                    );
                } else {
                    this.$set(
                        _this.forareaList[index],
                        'checked_',
                        false,
                    );
                }


                // console.log(e)
            },
            submit() {
                if (!this.singleApply.length) {
                    Toast('请添加申请!');
                    return;
                }
                if (!this.notedata) {
                    Toast('请输入原因!');
                    return;
                }
                this.singleApply.forEach(item => {
                    if (!item.auditor) {
                        this.noOne = true;
                        return
                    }
                    item.dateDay = this.today;
                    item.applyReason = this.notedata;
                });
                this.singleApply.forEach(item => {
                    if (item.userLevel ==null) {
                        item.userLevel = 0;
                    }
                    if (item.userLevel*1 >= item.areaLevel*1) {
                        item.isAudit ="Y";
                        item.auditorName = this.userInfo.name;
                        item.auditor = this.userInfo.jobNumber;
                    }else{
                        item.isAudit ="N";
                    }
                });
                if (this.noOne) {
                    Toast('没有区域审核人无法提交申请!');
                    return;
                }
                Indicator.open();
                this.$api.requestForTimes({applyListVo: this.singleApply}).then((res) => {
                    Indicator.close();
                    Toast("申请成功!");
                    this.$router.push({name: "ApplyList"})
                }).catch((err) => {
                    Indicator.close();
                    Toast('本区域已有申请在审核中');
                })
            },
            open(picker) {
                // 初始化时间为当前时间，可填满上部空白，可选过期时间
                this.timeValue = new Date()
                this.$refs[picker].open()
            },
            ShouPup() {
                // if ( parseInt(this.userInfo.userLevel) >= 9) {
                //     Toast("无需申请直接通过!");
                //     return
                // }
                if (!this.userInfo.remark) {
                    Toast("抱歉您无权限申请!");
                    return
                }
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
            selected2(){
                this.singleApply[this.selectedItem].goCount = this.selectedTimes[0];
                this.popupVisible3 = false
            },
            go_bk2() {
                this.popupVisible3 = false
            },
            selected() {
                let promiseArr = [];
                this.applyListV.forEach(item => {
                    let _this = this;
                    if (item.goType !== 3) {
                        let getPersion = {
                            type: item.goType,
                            jobNumber: item.jobNumber
                        }

                        promiseArr.push(_this.$api.GetManagerListOfArea2(getPersion).then((res) => {
                            if (res) {
                                // this.slots3[0].values = res;
                                if(parseInt(this.userInfo.userLevel)>=item.areaLevel){
                                    item.auditorName = this.userInfo.name;
                                    item.auditor = this.userInfo.jobnumber;
                                }else {
                                    if (res.jobNumber) {
                                        item.auditorName = res.name;
                                        item.auditor = res.jobNumber;
                                    }else {
                                        item.auditorName = "该区域暂无审核人!";
                                        item.auditor = null;
                                    }
                                }
                            } else {
                                console.log(res);
                            }
                        }).catch((err) => {
                            console.log(err)
                        }))
                    } else {
                        promiseArr.push(_this.$api.findAuditorByAreaId({areaId: item.areaId}).then((res) => {
                            if (res) {
                                console.log(item);
                                console.log(res);
                                if(parseInt(this.userInfo.userLevel)>=item.areaLevel){
                                    item.auditorName = this.userInfo.name;
                                    item.auditor = this.userInfo.jobnumber;
                                }else {
                                    if (res[0].jobNumber) {
                                        let person = res[0]
                                        item.auditorName = person.name;
                                        item.auditor = person.jobNumber;
                                    }
                                }
                                // this.slots3[0].values = res;

                            } else {
                                item.auditorName = "该区域暂无审核人!";
                                item.auditor = null;
                                console.log(res);
                            }
                        }).catch((err) => {
                            console.log(err)
                        }))
                    }
                });
                Promise.all(promiseArr).then((values) => {
                    this.popupVisible = false;
                    this.singleApply = this.applyListV;
                })
                // try {
                //
                // }catch (e) {
                //     console.log(e)
                //     Indicator.close();
                // }

                // this.$api.findAuditorByAreaId({areaId:areaIds}).then((res) => {
                //     if (res) {
                //         // this.slots3[0].values = res;
                //         this.persion = res.userName;
                //         this.persion_id = res.userId;
                //     } else {
                //         _this.slots3[0].values = ["该区域无审批人"];
                //         this.persion = "该区域无审批人";
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })

            },
            // onValuesChange(picker, values) {
            //     this.forarea = values[0].name;
            //     this.forareaList = values[0].areaList;
            // },
            // onValuesChange2(picker, values) {
            //     if (!values[0] || values[0] == "请选择区域") {
            //         return;
            //     }
            //     let _this = this;
            //     let list = [];
            //     for (let i = 1; i <= values[0].applyCount * 1; i++) {
            //         list.push(i * 1 + "次");
            //     }
            //     this.slots4[0].values = list;
            //     if (this.slots4.length < 1) {
            //         this.slots4[0].values = '1次'
            //     }
            //     this.position_id = values[0].id;
            //     this.position = values[0].name;
            //     this.persion = "该区域无审批人";
            //     if (values[0].goType !== 3) {
            //         let getPersion = {
            //             type: values[0].goType,
            //             jobNumber: this.userInfo.jobnumber
            //         }
            //         this.$api.GetManagerListOfArea2(getPersion).then((res) => {
            //             if (res) {
            //                 // this.slots3[0].values = res;
            //                 this.persion = res.userName;
            //                 this.persion_id = res.userId;
            //             } else {
            //                 _this.slots3[0].values = ["该区域无审批人"];
            //                 this.persion = "该区域无审批人";
            //             }
            //         }).catch((err) => {
            //             console.log(err)
            //         })
            //     } else {
            //         let getPersion = {
            //             areaId: values[0].id,
            //         }
            //         this.$api.GetManagerListOfArea(getPersion).then((res) => {
            //             if (res.length !== 0) {
            //                 this.slots3[0].values = res;
            //                 this.persion = res[0].name;
            //                 this.persion_id = res[0].jobNumber;
            //             } else {
            //                 _this.slots3[0].values = ["该区域无审批人"];
            //                 this.persion = "该区域无审批人";
            //             }
            //         }).catch((err) => {
            //             console.log(err)
            //         })
            //     }
            // },
            // onValuesChange3(picker, values) {
            //     this.persion = values[0].name
            // },
            onValuesChange4(picker, values) {
                // this.selectedItem=values;
                this.selectedTimes=values;
            },
            handleChange(value) {
                this.today = this.$moment(value).format('YYYY-MM-DD')
            },
        },
    };
</script>
<style>
    #applyPassport .picker {
        min-width: calc(475px - 100px);
    }
    .mint-checkbox-core{
       border-radius: 0 !important;
    }
    .mint-cell {
        display: unset !important;
    }

    .mint-checklist-title {
        display: none;
    }

    .mint-checklist-label {
        text-align: left;
    }

    .mint-cell-wrapper {
        background-size: 120% 0px !important;
        height: 40px !important;
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
    #forDate .picker-slot-wrapper {
        width: 375px;
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
    .aNA_contents_bt{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #ff0000;
    }
    .top_title{
        display: flex;
        height: 40px;
        line-height: 40px;
        justify-content: space-between;
        padding: 0 10px;
    }
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
        text-align: center;
        width: 50vw !important;
        height: 308px;
        overflow: auto;
    }
    .shuxian_box{
        min-height: 62vw !important;
        margin-top: 1vw !important;
        margin-bottom: 1vh;
        background: #80808059;
        text-align: center;
        width: 1px;
        max-height: 67.5vw !important;
        display: inline-block;
        overflow: auto;
    }
    .mid_position {
        text-align: center;
        width: 50vw !important;
        display: inline-block;
        height: 308px;
        overflow: auto;
        background: white !important;
    }

    .right_times {
        width: 80px;
        margin-left: 45px;
        white-space: nowrap;
        display: inline-block;
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
        background: rgba(247, 247, 247, 1);
        height: 308px;
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
        color: rgba(154, 154, 154, 1);
    }

    .notFisrt {
        margin-top: 11px;
    }

    .single_Item_content {
        width: 348px;
        height: 94px;
        background: white;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
        padding-top: 18px;
        margin-top: 10px;
        position: relative;
    }

    .main_contents_single_Item {
        width: 295px;
        height: 58px;
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

    .removeClass {
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
        height: 260px !important;
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
        margin-left: 28px;
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
    .for_content{
        margin-left: 25px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        margin-top: 2px;
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
        background: url("../assets/img/apply_1New.png") no-repeat center;
        background-size: 100% auto;
        width: 14px;
        height: 12px;
    }

    .for_img4 {
        background: url("../assets/img/apply_4.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        width: 19.57px;
        height: 18px;
    }

    .for_img2 {
        position: absolute;
        background: url("../assets/img/newApply_2.png") no-repeat center;
        background-size: 100% auto;
        width: 13px;
        height: 11px;
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
    }


    .for_img7 {
        position: absolute;
        background: url("../assets/img/newItem8.png") no-repeat center;
        background-size: 100% auto;
        margin-left: 28px;
        margin-top: 10px;
        width: 14px;
        height: 16px;
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

    .active {
        color: rgba(15, 151, 255, 1);
    }

    .subButton {
        background: url("../assets/img/subButton.png") no-repeat center;
        background-size: 100% auto;
        width: 230px;
        height: 53px;
        margin-left: 73px;
        margin-top: 8px;
        padding-top: 12px;
    }

    .subcontent {
        position: relative;
        width: 60px;
        height: 15px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 26px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        align-items: center;
        margin-left: 85px;
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
        margin: 0 auto;
        margin-top: 35px;
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
    }

    .area {
        margin-top: -12px;
    }

    .persion {
        margin-top: -18px;
    }

    .single_area {
        height: 48px;
        line-height: 48px;
    }
</style>
