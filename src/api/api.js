import {get, post} from './http'
const test =get('/test');
export default {
    // login:post('/h5/login'), //登录(传authCode免登录)
    // getCode:post('/h5/go/myGo'), //获取通行码
    // getAllAreaParams:post('/h5/constant/findAll'), //获取地区全部参数
    // GetManagerListOfArea:post('/h5/constant/findAuditorByAreaId'), //获取区域审批人列表
    // GetManagerListOfArea2:post('/ihaier/getApproverId'), //获取区域审批人列表2
    // findAuditorByAreaId:post('/h5/constant/findAuditorByAreaId'), //获取区域审批人列表 New
    // requestForTimes:post('/h5/goApply/apply'), //请求通过次数
    // agree:post('/h5/goApply/agree'), //同意
    // reject:post('/h5/goApply/reject'), //驳回
    // getdetails:post('/h5/goApply/getDetail'), //获取申请详情
    // goApplyPage:post('/h5/goApply/page'), //申请分页

    getPlayImgs:post('/hrzone/playimgs/getPlayImgs'), //前台展示轮播图
    getHolidayList:post('/hrzone/playimgs/getHolidayList'), //获取节假日
    getHolidayBalance:get('/hrzone/playimgs/getHolidayBalance'), //查询员工剩余假日
    getCustomMenuByEmpsn:get('/hrzone/customMenu/getCustomMenuByEmpsn'), //展示我的应用/场景
    pageList:post('/hrzone/zoneapply/pageList'), //展示我的应用/场景
    updateCustomMenu:post('/hrzone/customMenu/updateCustomMenu'), //展示我的应用/场景
    getUserInfo:post('/hrzone/ihaier/getUserInfo'),//通行url/hipassjava
    // editAuthorizer:post('/manager/hpAuthorizer/editAuthorizer'), //授权
    // cancleAuthorizer:post('/manager/hpAuthorizer/cancleAuthorizer') ,//取消授权
    // getRandomNumber:get('/h5/constant/getRandomNumber') //取消授权
}



