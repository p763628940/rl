<template>

    <div class="content" id="mycontent">
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div class="singleCase" v-for="(item,index) in list" :key="index">
                <div v-if="item.status!=10" class="shuxian_box">
                    <div class="shuxian_boxl">
                        <div class="shuxian" style="background:rgba(0,175,65,1);"></div>
                        <span class="single_item1" style="color:rgba(0,175,65,1);">已审核</span>
                    </div>
                    <span class="single_time">{{item.createTime}}</span>
                </div>
                <div v-if="item.status==10" class="shuxian_box" style="display: flex;flex-direction: column">
                    <div class="shuxian_boxl2">
                        <div style="display: flex">
                            <div class="shuxian" style="background:#152C6E;"></div>
                            <span class="single_item1" style="color:#152C6E;">进行中</span>
                        </div>
                        <div class="single_time">{{item.createTime}}</div>

                    </div>
                    <div class="singleLine"></div>
                </div>

                <div class="mainContent">

                    <div class="mainContent_item">
                        <div class="mainTitle">申请人:</div>
                        <span class="targetData">{{item.proposer}}</span></div>

                    <div class="mainContent_item">
                        <div class="mainTitle">审核意见:</div>
                        <span class="targetData">
                    <span v-if="item.status==10">待审核</span>
                    <span v-if="item.status==20">同意</span>
                    <span v-if="item.status==-10">不同意</span>
                    </span>
                    </div>


                    <div class="mainContent_item">
                        <div class="mainTitle">通行时间:</div>
                        <span class="targetData">{{item.dateDay }} </span>
                    </div>

                    <div class="mainContent_item">
                        <div class="mainTitle">通行区域:</div>
                        <span class="targetData">{{item.area }} </span>
                    </div>

                </div>
                <div class="detailsButton">
                    <span class="detailsItem" @click="goto('followingDetails',item)">查看详情</span>
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
    </div>
</template>
<script>
    // @ is an alias to /src
    import MescrollVue from 'mescroll.js/mescroll.vue'

    const nodata = require("../assets/nodata.png")
    import unt from "../utils/unti"

    export default {
        components: {
            MescrollVue // 注册mescroll组件
        },
        data() {
            return {
                loading: false,
                list: [],
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
                    noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
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
            console.log(this.userInfo)
        },
        methods: {
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit(mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback(page, mescroll) {
                // 联网请求
                let _this = this;
                unt.getuserInfs(_this, this.getdata, [page, mescroll])
            },
            goto(name, item) {
                this.$router.push({name: name, params: {id: item.id}})
            },
            restSearch() {
                this.query.pageNo = 1
                this.list = []
            },
            timestampToTime(time) {
                var date = new Date(time * 1) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var h = date.getHours() + ':'
                var m = date.getMinutes() + ':'
                var s = date.getSeconds()
                return Y + M + D
            },
            getdata(page, mescroll) {
                let _this = this;
                this.loading = true
                let usedata = {jobNumber: this.userInfo.jobnumber, pageNo: page.num, pageSize: page.size}
                this.query.pageNo++;
                this.$api.goApplyPage(usedata).then((res => {
                    res.records.forEach(item => {
                        item.createTime = _this.timestampToTime(item.createTime);
                    })
                    if (page.num === 1) {
                        this.list = []
                    }
                    this.list = this.list.concat(res.records);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.records.length)
                    })
                    if (this.pageNo < res.pages) {
                        this.loading = false
                    }
                })).catch((e) => {
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr()
                })
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
            }
        }
    };
</script>

<style>
    #mycontent .mescroll-empty .empty-icon {
        width: 226px;
        height: 164px;
    }

    #mycontent .mescroll-empty {
        padding-top: 50%;
        margin-top: -82px;
    }

    .mycontent .empty-tip {
        margin-top: 12px;
        font-size: 18px;
    }
</style>

<style scoped>
    .mainContent_item{
        margin-top: 10px;
    }
    .mescroll {
        top: 0;
        max-height: calc(100vh - 80px);
        position: fixed;
    }

    .shuxian_boxl {
        display: flex;
        align-items: center;

    }

    .shuxian_boxl2 {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;

    }

    .shuxian_box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .content {
        width: 375px;
        background: #f2f4f5;
        padding-top: 16px;
        min-height: 100vh;
        height: auto;
    }

    .singleCase {
        width: 355px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 0.8;
        border-radius: 4px;
        margin-left: 10px;
        padding-top: 18px;
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
    }

    .single_item1 {
        height: 15px;
        width: 200px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(208, 8, 8, 1);
        opacity: 1;
        margin-left: 6px;
        margin-right: 0;
        margin-top: -5px;
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
        margin-right: 10px;
    }

    .singleLine {
        width: 322px;
        height: 1px;
        background: rgba(238, 238, 238, 1);
        margin-left: -10px;
        margin-bottom: 10px;
    }

    .mainContent {
        position: relative;
        width: 345px;
        min-height: 85px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
    }

    .mainTitle {
        width: 60px;
        height: 12px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
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
        line-height: 20px;
        color: rgba(42, 42, 42, 1);
        float: right;
    }

    .detailsButton {
        width: 104px;
        height: 25px;
        background: rgba(25, 94, 215, 1);
        opacity: 1;
        border-radius: 12px;
        margin-left: 126px;
        margin-bottom: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
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
</style>
