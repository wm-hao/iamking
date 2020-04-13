// import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify, {VSnackbar, VBtn, VIcon} from 'vuetify/lib';

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VBtn,
        VIcon
    }
});
export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
});
