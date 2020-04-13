<template>
    <v-app class="bg">
        <v-content>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" md="4">
                        <v-row align="center" justify="center">
                            <v-col cols="8">
                                <v-card class="mx-auto elevation-9" outlined>
                                    <v-toolbar color="primary" dark flat>
                                        <v-toolbar-title>Login form</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form>
                                            <v-text-field
                                                    name="login"
                                                    prepend-icon="mdi-account"
                                                    type="text"
                                                    v-model="user.userName"
                                            />

                                            <v-text-field
                                                    id="password"
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
                                    <v-card-actions>
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
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    import {userValidate} from "../api/user/userRequest";

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    userName: '',
                    password: ''
                },
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
                let param = {
                    userName: 'abc',
                    password: '123'
                };
                userValidate(param, success, error, error);

            },

        }
    }

    function success() {
        this.$router.push({path: '/home'});
    }

    function error() {
        console.log("登录失败")
    }
</script>

<style scoped>
    .bg {
        background: url("../assets/img/bg2.jpg") no-repeat;
    }
</style>