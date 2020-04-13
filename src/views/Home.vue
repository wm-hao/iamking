<template>
    <v-app>
        <!--color="blue darken-3"-->
        <v-app-bar app clipped-right dark src="../assets/img/bar.jpg">
            <!--<v-row align="center" justify="center" class="fill-height">

                <span style="font-size: 20px;margin-left: 20px;">顺势而为,请热爱生活</span>
                <v-spacer/>

                <v-btn class="mx-3" fab dark @click="drawer = !drawer">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
            </v-row>-->
            <v-toolbar-title>顺势而为,请热爱生活</v-toolbar-title>
            <v-spacer/>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app clipped right>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>zhuhh</v-list-item-title>
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
                    <v-btn block class="text-center" to="/">退出</v-btn>
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
        }),

        computed: {},

        watch: {},

        created() {
            this.$toast.error('欢迎', {
                x: '',
                y: 'top'
            });
        },

        methods: {},
    }
</script>

<style scoped>
    .footer_bg {
        background: url("../assets/img/foot.png") repeat-x;
    }
</style>
