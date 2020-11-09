import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userInfo:{
          jobnumber:'A0038337',
          // name:'姚远方',
          // jobnumber:'A0037835',
          // jobnumber: '01468643',
          // name:'张崇阳',
          // jobnumber:'A0032378',
          // name:'张志杰',
          // depName:'海尔集团',‘
          // phone:'156545565',
          // name:'董方旭',
          // jobnumber:'01515942',
          //
          // jobnumber:'A0037835',
          // phone:'156545565',
          // name:'张重阳',
          // userLevel:'09',

          // jobnumber:'a0038335',
          // name:'袁单单',
          // userLevel:9,
          // remark:1,
          // jobnumber:'a0000206',
          // name:'吴承志',
      },
      isAffair:false,
      setbar:'applyPassport',
      showbar:true,
      detailsId:'',
      isDD:false
  },
  mutations: {
      setshowbar(state,data){
          state.showbar = data;
      },
      setUserInfo(state,data){
          state.userInfo = data;
      },
      setUserInfoIsAuthorize(state,data){
          state.userInfo.isAuthorize = data;
      },
      setisAffair (state, data) {
          state.isAffair = data
      },setSetbar(state,data){
          state.setbar=data
      },setDetais(state,data){
          state.detailsId=data
      },setisDD(state,data){
          state.isDD=data
      }
  },
  actions: {
  }
})
