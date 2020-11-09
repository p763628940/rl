import {
    Picker,  //选择器
    Tabbar,  //tabbar
    TabItem,  //tabbar
    Toast
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Picker.name, Picker);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Toast);
export default {
    islogin: 'yes'
}
