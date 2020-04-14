<template>
    <v-app>
        <!--color="blue darken-3"-->
        <v-app-bar app clipped-right dark src="../assets/img/bar.jpg">
            <v-toolbar-title><span style="font-size: 20px">顺势而为,请热爱生活</span>&nbsp;
                <v-icon color="red">mdi-heart</v-icon>
                <v-icon color="red">mdi-heart</v-icon>
                <v-icon color="red">mdi-heart</v-icon>
                &nbsp;
                加油！思密达
            </v-toolbar-title>
            <v-spacer/>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app clipped right>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{userName}}</v-list-item-title>
                    <v-list-item-subtitle>您好</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.to" two-line>
                    <v-list-item-icon>
                        <v-icon v-text="item.icon" size="26"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-left">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <div class="pa-3">
                    <v-btn block class="text-center" @click="logout">退出</v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-content>
            <!--            <v-container ma-0 class="fill-all">-->
            <router-view></router-view>
            <!--            </v-container>-->
        </v-content>
        <v-footer app class="footer_bg">
            <span>&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>


    import {HTTP_HEADER_TOKEN_VAL, USER_ID, USER_NAME} from "../const/constant";
    import {removePrefix} from "../util/util";

    export default {
        name: 'Home',
        components: {},
        data: () => ({
            drawer: false,
            items: [
                {title: '日志记录', icon: 'assignment', to: '/home/diary'},
                {title: '交易记录', icon: 'poll', to: '/home/record'},
                {title: '数据分析', icon: 'show_chart', to: '/home/analyse'},
                {title: '资金管理', icon: 'account_balance_wallet', to: '/home/balance'},
                {title: '用户信息', icon: 'account_box', to: '/home/user'},
            ],
            userName: ''
        }),

        methods: {
            logout: function () {
                sessionStorage.clear();
                this.$router.replace('/');
            }
        },

        created() {
            console.log(sessionStorage.getItem(USER_ID));
            console.log(sessionStorage.getItem(HTTP_HEADER_TOKEN_VAL));
            console.log(localStorage.getItem(USER_NAME));
            this.userName = removePrefix(localStorage.getItem(USER_NAME));
            console.log(localStorage.getItem(localStorage.getItem(USER_NAME)));
        },

        computed: {},

        watch: {}

    }
</script>

<style scoped>
    .footer_bg {
        background: url("../assets/img/foot.png") repeat-x;
    }
</style>
