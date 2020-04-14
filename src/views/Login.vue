<template>
    <v-app class="fill-all">
        <v-content class="fill-all bg">
            <v-row align="center" justify="center" class="fill-height">
                <!--                <v-img src="../assets/img/bar.jpg" max-height="1170px" :aspect-ratio="16/9">-->
                <v-col md="6" class="fill-height pa-0">
                    <v-row align="center" justify="center" class="fill-height">
                        <v-col md="6">
                            <v-card class="mx-auto elevation-9" outlined>
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form ref="loginForm">
                                        <v-text-field
                                                name="login"
                                                prepend-icon="mdi-account"
                                                :rules="[rules.required]"
                                                type="text"
                                                v-model="user.userName"
                                        />

                                        <v-text-field
                                                name="password"
                                                prepend-icon="mdi-lock"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, rules.min]"
                                                :type="showPassword ? 'text' : 'password'"
                                                v-model="user.password"
                                                @click:append="showPassword = !showPassword"
                                        />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions class="pa-0">
                                    <v-row class="fill-all" justify="start">
                                        <v-col cols="12">
                                            <v-row>
                                                <v-col cols="6" offset="1" class="py-0">
                                                    <v-switch v-model="rememberPassword" label="记住密码"
                                                              class="pa-0"
                                                              dense></v-switch>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="4" offset="1">
                                                    <v-btn to="/home" block>
                                                        注册
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="4" offset="2">
                                                    <v-btn color="primary" block @click="login">
                                                        登录
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!--         </v-img>-->
            </v-row>
        </v-content>
    </v-app>
</template>

<script>

    import {userValidate} from "../api/user/userRequest";
    import {md5} from "../util/md5";
    import {HTTP_HEADER_TOKEN_VAL, REMEMBER_PASS, STATUS_CODE_TRUE, USER_ID, USER_NAME} from "../const/constant";
    import {addPrefix, parseUserIDAndToken, removePrefix} from "../util/util";

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    userName: '',
                    password: ''
                },
                rememberPassword: false,
                showPassword: false,
                rules: {
                    required: value => !!value || '必要字段',
                    min: v => v.length >= 8 || '最少8个字符',
                    emailMatch: v => /.+@.+\..+/.test(v) || ('邮箱格式不正确'),
                },
            }
        },
        methods: {
            login: function () {
                let self = this;
                let valid = this.$refs.loginForm.validate();
                if (valid) {
                    let params = {
                        userName: this.user.userName,
                        password: md5(this.user.password).toString()
                    };
                    userValidate(params, (json) => {
                        console.log('后台返回-token=:' + json.message);
                        let userIdAndToken = parseUserIDAndToken(json.message);
                        console.log('解析后:' + userIdAndToken);
                        sessionStorage.setItem(USER_ID, userIdAndToken[0]);
                        sessionStorage.setItem(HTTP_HEADER_TOKEN_VAL, userIdAndToken[1]);
                        let name = addPrefix(self.user.userName);
                        if (self.rememberPassword) {
                            localStorage.setItem(REMEMBER_PASS, STATUS_CODE_TRUE);
                            localStorage.setItem(USER_NAME, name);
                            localStorage.setItem(name, self.user.password);
                        } else {
                            localStorage.removeItem(REMEMBER_PASS);
                            localStorage.removeItem(USER_NAME);
                            localStorage.removeItem(name);
                        }
                        self.$router.push('/home');
                    }, (json) => {
                        self.$toast.error(json.message || '登录校验失败');
                    });
                }
            },
        },
        created() {
            let remember = localStorage.getItem(REMEMBER_PASS);
            if (STATUS_CODE_TRUE === remember) {
                let name = removePrefix(localStorage.getItem(USER_NAME));
                this.user.userName = name;
                this.user.password = localStorage.getItem(localStorage.getItem(USER_NAME));
                this.rememberPassword = true;
            }
        }
    }

</script>

<style scoped>
    .bg {
        background: url("../assets/img/bar.jpg") no-repeat;
        background-size: 100% 100%;
    }
</style>