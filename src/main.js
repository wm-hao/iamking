import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import http from "./api/http";
import VuetifyToast from "vuetify-toast-snackbar";
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MyMessage from "./util/message";
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$msg = MyMessage;
Vue.use(ElementUI);
Vue.use(VueCookies);

Vue.use(VuetifyToast, {
    x: '',
    y: 'top',
    classes: ['test']
});
Vue.config.productionTip = false;

Vue.prototype.$http = http;
window.vm = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
