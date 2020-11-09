import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import {mapState, mapMutations} from 'vuex'
import api from './api/api'
import moment from 'moment';
import 'swiper/swiper-bundle.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import * as dd from 'dingtalk-jsapi'
import { Checklist } from 'mint-ui';
import islogin from './utils/mintImport'
import unt from './utils/unti'
// var hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
// require('viewport-units-buggyfill').init({
//     hacks: hacks
// });
Vue.mixin({
    computed: {
        ...mapState([
            'userInfo',
            'isAffair',
            'setbar',
            'showbar',
            'detailsId',
            'isDD',
        ]),
    },
    methods: {
        ...mapMutations([
            'setUserInfo',
            'setisAffair',
            'setSetbar',
            'setshowbar',
            'setDetais',
            'setUserInfoIsAuthorize',
            'setisDD',
        ]),
    }
});
Vue.prototype.noScroll = function () {
    var mo = function (e) { e.preventDefault() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}

//弹出框可以滑动
Vue.prototype.canScroll = function () {
    var mo = function (e) {
        e.preventDefault()
    }
    document.body.style.overflow = ''// 出现滚动条
    document.removeEventListener('touchmove', mo, false)
}

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.prototype.$api = api;
Vue.prototype.$dd = dd;
Vue.prototype.$unt = unt;
router.beforeEach((to, from, next) => {
    // ...
    console.log(to)
    window.document.title = to.meta.title
    if(to.name=='applyPassport'||to.name=='CheckList'||to.name=='ApplyList'||to.name=='home'||to.name=='passCode'){
        store.commit('setSetbar',to.name)
    }
    if(to.name=='iHaierDetails'){
        store.commit('setshowbar',false)
    }

    next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
