<template>
    <div class="content" id="mycontent">
        <div class="search_box">
            <input name="Test" @keydown.enter='searchByNameOrNum'  @focus="focus($event)" class="inputSearch" placeholder="工号/姓名"
                   v-model="NameOrNum"> </input>
            <div class="searchButton" :style="{display:(NameOrNum?'none':'')}" @click="searchByNameOrNum"></div>
            <div class="search_img" @click="open('datatimePicker1')"></div>
            <div class="search_img2" @click="ShouPup" v-if="userInfo.isAuthorize==0&&userInfo.userLevel>=userInfo.authorizerLevel"></div>
            <div class="search_img3" @click="ShouPup" v-if="userInfo.isAuthorize!=0&&userInfo.userLevel>=userInfo.authorizerLevel"></div>
        </div>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="singleCase" v-for="(item,index) in list" :key="index">
                <div v-if="item.status!=10" class="shuxian_box"
                     style="display: flex;justify-content: space-between;align-items: center;width: 100%">
                    <div style="display: flex;align-items: center;">
                        <div class="shuxian" style="background:rgba(0,175,65,1);"></div>
                        <span class="single_item1" style="color:rgba(0,175,65,1);">已审核</span>
                    </div>
                    <div class="single_time">{{item.createTime}}</div>
                </div>
                <div v-if="item.status==10" class="shuxian_box" style="display: flex;flex-direction: column">
                    <div style="display: flex;align-items: center;justify-content: space-between;width: 100%">
                        <div style="display: flex;">
                            <div class="shuxian"></div>
                            <span class="single_item1">待审核</span>
                        </div>
                        <div class="single_time">{{item.createTime}}</div>
                    </div>
                    <div class="singleLine"></div>
                </div>
                <div class="mainContent">
                    <div class="mainContent_item">
                        <div class="mainTitle">申请人:</div>
                        <span class="targetData">{{item.proposer}}</span>
                    </div>
                    <div class="placeItem" v-for="(item,index) in item.where">
                        <div class="mainTitle">通行区域:</div>
                        <span class="targetData newTD" :id="item.detailsID">{{item.place}}</span> <span
                            class="showTimes">{{item.counts}}次访问</span>
                    </div>
                    <div class="mainContent_item">
                        <div class="mainTitle">通行时间:</div>
                        <span class="targetData">{{item.dateDay}} </span>
                    </div>
                </div>
                <div class="detailsButton">
                    <span class="detailsItem" @click="goto('examine',item)">查看详情</span>
                </div>
            </div>
        </mescroll-vue>
        <!--<div class="singleCase" style="margin-top: 16px;">-->
        <!--<div class="shuxian" style="background:rgba(0,175,65,1);"></div><span class="single_item1" style="color:rgba(0,175,65,1);">已审核</span><span class="single_time">今天 13:00</span>-->
        <!--<div class="singleLine"></div>-->
        <!--<div class="mainContent">-->
        <!--<div class="mainTitle">申请人: </div><span class="targetData">周杰伦</span>-->
        <!--<div class="mainTitle">通行区域: </div><span class="targetData">青岛-海尔园西园区-创牌大厦</span>-->
        <!--<div class="mainTitle">通行时间: </div><span class="targetData">2020-06-22  1次访问</span>-->
        <!--</div>-->
        <!--<div class="detailsButton">-->
        <!--<span class="detailsItem">查看详情</span>-->
        <!--</div>-->
        <!--</div>-->
        <mt-datetime-picker
                ref="datatimePicker1"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="timeValue"
                :startDate="new Date('2020-07-01')"
                :end-date="new Date('2030-07-13')"
                @confirm="handleChange"
        ></mt-datetime-picker>
        <mt-popup
                v-model="popupVisible"
                position="middle"
                popup-transition="popup-fade">
            <div class="mypopups">
                <div class="mypopups_top">
                    <span>被授予人:</span><input name="TestOfpop" @keydown.enter='searchByNameOrNum' class="inputSearch"
                                             placeholder="工号" v-model="shouquanNameOrNum" :disabled="userInfo.isAuthorize==0?false:true">
                </div>
                <div class="for_shouyuButtons" v-if="userInfo.isAuthorize==0">
                    <div class="confireit" @click="shouquan"><span class="confireStyle">确定</span></div>
                    <div class="cancelit" @click="cancelshouqu"><span class="confireStyle">取消</span></div>
                </div>
                <div class="for_shouyuButtons" v-if="userInfo.isAuthorize!=0">
                    <div class="confireit" @click="cancelshouquan"><span class="confireStyle">取消授权</span></div>
                    <div class="cancelit" @click="cancelshouqu"><span class="confireStyle">取消</span></div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    // @ is an alias to /src
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import ddbase from "../api/ddbase";
    import unt from "../utils/unti"
    import {Toast} from "mint-ui";

    export default {
        components: {
            MescrollVue // 注册mescroll组件
        },
        created() {
            qing.call('setWebViewTitle',{'title':'智慧通行'})
            if(this.userInfo.passivityAuthorizerName){
                this.shouquanNameOrNum=this.userInfo.passivityAuthorizerName;
            }
        },
        data() {
            return {
                sqtype:true,
                shouquanNameOrNum: '',
                loading: false,
                nodata: require('../assets/img/noDataImg.png'),
                timeimg: "",
                today: '',
                timeValue: '',
                NameOrNum: '',
                popupVisible: false,
                didshouquan:true,
                input: '',
                list: [],
                endDate: new Date('2020-04-30'),
                query: {
                    pageNo: 1,
                    pageSize: 10,
                    hasTotal: true
                },
                mescroll: null, // mescroll实例对象
                mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
                mescrollUp: { // 上拉加载的配置.
                    callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                    //以下是一些常用的配置,当然不写也可以的.
                    page: {
                        num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                        size: 10 //每页数据条数,默认10
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
                    noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
                    // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    // 这就是为什么无更多数据有时候不显示的原因
                    // toTop: {
                    //     //回到顶部按钮
                    //     src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
                    //     offset: 1000 //列表滚动1000px才显示回到顶部按钮
                    // },
                    empty: {
                        icon: require('../assets/img/noDataImg.png'), //图标,默认null,支持网络图
                        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                        warpId: "mycontent", //父布局的id (1.3.5版本支持传入dom元素)
                        tip: "暂无数据" //提示
                    }
                },
            };
        },
        mounted() {
        },
        methods: {
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit(mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback(page, mescroll) {
                // 联网请求
                let _this = this
                unt.getuserInfs(_this, this.getpageDdata, [page, mescroll])
            },
            focus(event) {
                if(!this.NameOrNum){
                    this.NameOrNum='';
                    this.$forceUpdate()
                }
            },
            goto(name, item) {
                this.$router.push({name: name, params: {id: item.id}})
            },
            open(picker) {
                // 初始化时间为当前时间，可填满上部空白，可选过期时间
                this.timeValue = new Date()
                this.$refs[picker].open()
            },
            ShouPup() {
                this.popupVisible = true
            },
            shouquan() {
                if(!this.sqtype){
                    return
                }
                var pattern2 = new RegExp("[\u4E00-\u9FA5]+");
                if (pattern2.test(this.shouquanNameOrNum)) {
                    Toast("请输入工号！")
                    return;
                }
                this.sqtype=false
                let _this = this;
                let subParams = {
                    authorizerNum: this.userInfo.jobnumber,//this.userInfo.jobnumber,//this.userInfo.jobnumber
                    passivityAuthorizerNum: this.shouquanNameOrNum,
                    createUserid: this.userInfo.jobnumber,
                    createUser: this.userInfo.name,//"姚远方",//this.userInfo.name
                }
                this.$api.editAuthorizer(subParams).then((res => {
                    this.sqtype=true
                    this.getuserIfro()
                    console.log(res);
                    Toast('授权完成!');
                    _this.popupVisible = false;
                    _this.upCallback({num:1, size:10},this.mescroll);
                })).catch((err)=>{
                    this.sqtype=true
                })

            },
            getuserIfro(){
                this.$api.getUserInfo({jobNumber:this.userInfo.jobnumber}).then((res)=> {
                    this.setUserInfo({
                        jobnumber: res.userId,
                        name: res.userName,
                        userLevel: res.userLevel,
                        phone: res.phone,
                        depName: res.depName,
                        remark: parseInt(res.remark),
                        isAuthorize: res.isAuthorize,
                        passivityAuthorizerNum: res.passivityAuthorizerNum,
                        passivityAuthorizerName: res.passivityAuthorizerName
                    })
                })
            },
            cancelshouqu(){
                this.popupVisible = false;
            },
            cancelshouquan() {
                let subParams = {
                    authorizerNum: this.userInfo.jobnumber,//this.userInfo.jobnumber,//this.userInfo.jobnumber
                    passivityAuthorizerNum: this.shouquanNameOrNum,
                    createUserid: this.userInfo.jobnumber,
                    createUser: this.userInfo.name,//"姚远方",//this.userInfo.name
                }
                this.$api.cancleAuthorizer(subParams).then((res => {
                        this.getuserIfro()
                    Toast('已取消授权!');
                    this.popupVisible = false;
                    this.upCallback({num:1, size:10},this.mescroll);
                })).catch((err)=>{

                })
            },
            handleChange(value) {
                let _this = this;
                this.today = this.$moment(value).format('YYYY-MM-DD');
                this.loading = true;
                let usedata
                if(this.NameOrNum){
                    var pattern = new RegExp("[\u4E00-\u9FA5]+");
                    if (pattern.test(this.NameOrNum)) {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            name: this.NameOrNum,
                            dateDay: this.today
                        }
                    } else {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            jobNumber: this.NameOrNum,
                            dateDay: this.today
                        }
                    }
                }else{
                     usedata = {
                        auditor: this.userInfo.jobnumber,
                        pageNo: this.mescrollUp.page.num,
                        pageSize: this.mescrollUp.page.size,
                        dateDay: this.today
                    }
                }
                this.query.pageNo++;
                this.$api.goApplyPage(usedata).then((res => {
                    // res.records.forEach(item => {
                    //     item.createTime = _this.timestampToTime(item.createTime);
                    // })
                    res.records.forEach(item => {
                        let li = [];
                        let ob = {};
                        for (let i = 0; i < item.area.split(',').length; i++) {
                            ob = {
                                place: item.garden.split(',')[i] + '-' + item.area.split(',')[i],
                                counts: new String(item.goCount).split(',')[i],
                                detailsID:  new String(item.detailId).split(',')[i]
                            }
                            li.push(ob);
                        }
                        item.createTime = _this.timestampToTime(item.createTime);
                        item.where = li
                    })
                    if (this.mescrollUp.page.num === 1) {
                        this.list = []
                    }
                    this.list = this.list.concat(res.records);

                    this.$nextTick(() => {
                        this.mescroll.endSuccess(res.records.length)
                    })
                    if (this.pageNo < res.pages) {
                        this.loading = false
                    }
                }))
            },
            searchByNameOrNum() {
                let _this = this;
                this.loading = true;
                var pattern = new RegExp("[\u4E00-\u9FA5]+");
                let usedata
                if(this.today){
                    if (pattern.test(this.NameOrNum)) {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            name: this.NameOrNum,
                            dateDay: this.today
                        }
                    } else {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            jobNumber: this.NameOrNum,
                            dateDay: this.today
                        }
                    }
                }else{
                    if (pattern.test(this.NameOrNum)) {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            name: this.NameOrNum,
                        }
                    } else {
                        usedata = {
                            auditor: this.userInfo.jobnumber,
                            pageNo: this.mescrollUp.page.num,
                            pageSize: this.mescrollUp.page.size,
                            jobNumber: this.NameOrNum,
                        }
                    }
                }

                this.query.pageNo++;
                this.$api.goApplyPage(usedata).then((res => {
                    // res.records.forEach(item => {
                    //     item.createTime = _this.timestampToTime(item.createTime);
                    // })
                    res.records.forEach(item => {
                        let li = [];
                        let ob = {};
                        for (let i = 0; i < item.area.split(',').length; i++) {
                            ob = {
                                place: item.garden.split(',')[i] + '-' + item.area.split(',')[i],
                                counts: new String(item.goCount).split(',')[i],
                                detailsID:  new String(item.detailId).split(',')[i]
                            }
                            li.push(ob);
                        }
                        item.createTime = _this.timestampToTime(item.createTime);
                        item.where = li
                    })
                    if (this.mescrollUp.page.num === 1) {
                        this.list = []
                    }
                    this.list = this.list.concat(res.records);

                    this.$nextTick(() => {
                        this.mescroll.endSuccess(res.records.length)
                    })
                    if (this.pageNo < res.pages) {
                        this.loading = false
                    }
                }))
            },
            restSearch() {
                this.query.pageNo = 1
                this.list = []
            },
            getdata() {
                if (!this.userInfo.jobnumber) {
                    ddbase.getAuthCode().then((res) => {
                        return this.$api.login({authCode: res.code});
                    }).then((res) => {
                        this.setUserInfo(res);
                    })
                } else {
                    let _this = this
                    this.loading = true
                    let usedata = {auditor: this.userInfo.jobnumber, pageNo: 1, pageSize: 10}
                    this.query.pageNo++;
                    this.$api.goApplyPage(usedata).then((res => {
                        res.records.forEach(item => {
                            let li = [];
                            let ob = {};
                            for (let i = 0; i < item.area.split(',').length; i++) {
                                ob = {
                                    place: item.garden.split(',')[i] + '-' + item.area.split(',')[i],
                                    counts: new String(item.goCount).split(',')[i],
                                    detailsID: new String(item.detailId).split(',')[i]
                                }
                                li.push(ob);
                            }
                            item.createTime = _this.timestampToTime(item.createTime);
                            item.where = li
                        })
                        if (page.num === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.records);
                        // this.list = this.list.concat(res.data);
                        this.$nextTick(() => {
                            mescroll.endSuccess(res.records.length)
                        })
                        if (this.pageNo < res.pages) {
                            this.loading = false
                        }
                    }))
                }

            },
            getpageDdata(page, mescroll) {
                let _this = this
                this.loading = true
                let usedata = {auditor: this.userInfo.jobnumber, pageNo: page.num, pageSize: page.size}
                this.query.pageNo++;
                this.$api.goApplyPage(usedata).then((res => {
                    res.records.forEach(item => {
                        let li = [];
                        let ob = {};
                        for (let i = 0; i < item.area.split(',').length; i++) {
                            ob = {
                                place: item.garden.split(',')[i] + '-' + item.area.split(',')[i],
                                counts: new String(item.goCount).split(',')[i],
                                detailsID:  new String(item.detailId).split(',')[i]
                            }
                            li.push(ob);
                        }
                        item.createTime = _this.timestampToTime(item.createTime);
                        item.where = li
                    })
                    // res.records.forEach(item => {
                    //     item.createTime = _this.timestampToTime(item.createTime);
                    // })
                    if (page.num === 1) {
                        this.list = []
                    }
                    this.list = this.list.concat(res.records);

                    this.$nextTick(() => {
                        mescroll.endSuccess(res.records.length)
                    })
                    if (this.pageNo < res.pages) {
                        this.loading = false
                    }
                }))
            },
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);
            },
            timestampToTime(time) {
                var date = new Date(time * 1) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
                var h = date.getHours() + ':'
                var m = date.getMinutes() + ':'
                var s = date.getSeconds()
                return Y + M + D
            },
        }
    };
</script>
<style>
    #mycontent .mescroll-empty .empty-icon {
        width: 226px;
        height: 164px;
    }
    #mycontent .v-modal{
        z-index: 1998 !important;
    }
    #mycontent .mescroll-empty {
        padding-top: 50%;
        margin-top: -82px;
    }

    .mescroll-empty .empty-tip {
        margin-top: 12px;
        font-size: 18px;
    }
    .mint-toast{
        z-index: 99999 !important;
    }
   .is-placemiddle{
        z-index: 99999 !important;
    }
</style>
<style scoped>
    .mainContent_item{
        margin-top: 10px;
    }
    .placeItem{
        margin-top: 10px;
    }
    .mescroll {
        top: 50px;
        max-height: calc(100vh - 150px);
        position: fixed;
    }

    .qr {
        text-align: center;
        margin-top: 10px;
    }

    .mypopups {
        width: 335px;
        height: 193px;
        padding-top: 10px;

    }
    .shuxian_box {
        display: flex;
        width: 100%;
        padding-bottom: 3px;
    }

    .mypopups_top {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 375px;
        background: #f2f4f5;
        padding-top: 16px;
        height: auto;
        min-height: 100vh;
        position: relative;
    }

    .singleCase {
        width: 355px;
        min-height: 198px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 0.8;
        border-radius: 4px;
        margin-left: 10px;
        padding-top: 18px;
        margin-top: 23px;
        display: flex;
        flex-wrap: wrap;
    }

    ::-webkit-input-placeholder {
        text-align: center;
    }

    .single_item1 {
        height: 15px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(208, 8, 8, 1);
        opacity: 1;
        margin-left: 6px;
        margin-right: 0;
        margin-top: -5px;
    }

    .newTD {
        width: 180px !important;
    }

    .shuxian {
        width: 2px;
        height: 15px;
        background: rgba(208, 8, 8, 1);
        opacity: 1;
        margin-left: 13px;
    }

    .single_time {
        height: 9px;
        font-size: 9px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 16px;
        color: rgba(147, 147, 147, 1);
        opacity: 1;
        margin-right: 20px;
    }

    .singleLine {
        width: 322px;
        height: 1px;
        background: rgba(238, 238, 238, 1);
        margin-left: 12px;
        margin-top: 5px;
    }

    .mainContent {
        position: relative;
        width: 345px;
        min-height: 45px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 5px;
    }

    .mainTitle {
        width: 60px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        color: rgba(141, 141, 141, 1);
        margin-left: 21px;
        float: left;
    }

    .targetData {
        width: 250px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 12px;
        margin-left: 14px;
        color: rgba(42, 42, 42, 1);
        float: right;
    }

    .showTimes {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
    }

    .for_shouyuButtons {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 280px;
        margin-top: 30px;
    }

    .detailsButton {
        width: 104px;
        height: 25px;
        background: rgba(25, 94, 215, 1);
        opacity: 1;
        border-radius: 12px;
        margin-left: 126px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .detailsItem {
        height: 6px;
        font-size: 9px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        margin-bottom: 9px;
    }

    .search_box {
        width: 365px;
        height: 28px;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }

    .confireit {
        background: url("../assets/img/shouquanconfirm.png") no-repeat center;
        background-size: 100% auto;
        width: 123px;
        height: 35px;
        display: flex;
    }

    .confireStyle {
        line-height: 35px;
        color: white;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 0 auto;
    }

    .cancelit {
        background: url("../assets/img/shouquancancel.png") no-repeat center;
        background-size: 100% auto;
        width: 123px;
        height: 35px;
        display: flex;
    }

    .search_img {
        background: url("../assets/img/timePikerNew.png") no-repeat center;
        background-size: 100% auto;
        width: 63px;
        height: 27px;
        z-index: 999;
    }


    .search_img2 {
        background: url("../assets/img/shouquanNew.png") no-repeat center;
        background-size: 100% auto;
        width: 63px;
        height: 27px;
        z-index: 999;
    }

    .search_img3 {
        background: url("../assets/img/cancelshouquan.png") no-repeat center;
        background-size: 100% auto;
        width: 63px;
        height: 27px;
        z-index: 999;
    }
    .inputSearch {
        width: 202px;
        height: 29px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        margin-left: 16px;
        z-index: 998;
        padding-left: 4px;
    }

    .placeItem {
        display: flex;
        align-items: center;
        height: 15px;
    }

    .searchButton {
        background: url("../assets/img/searchButton.png") no-repeat center;
        background-size: 100% auto;
        width: 12px;
        height: 12px;
        z-index: 999;
        margin-top: 2%;
        position: absolute;
        margin-left: 21%;
    }
</style>
