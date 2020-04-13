import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import http from "./api/http";
import VuetifyToast from "vuetify-toast-snackbar";


Vue.use(VuetifyToast, {
    x: '',
    y: 'top'
});
Vue.config.productionTip = false;

Vue.prototype.$http = http;
window.vm = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
