import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import VuetifyToast from "vuetify-toast-snackbar";


Vue.use(VuetifyToast);
Vue.config.productionTip = false;
import http from "./api/http";
Vue.prototype.$http = http;
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
