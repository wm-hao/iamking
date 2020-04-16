<template>
    <v-row justify="center" class="ma-0" style="height: 100px" align="center">
        <v-col cols="11">
            <v-file-input accept=".xlsx" show-size counter label="上传文件" clearable class="mx-5"
                          full-width accpet
                          @change="fileChange" ref="file" v-model="fileName"></v-file-input>
        </v-col>
        <v-col cols="1">
            <v-row align="center" justify="start">
                <v-col>
                    <v-btn color="primary" @click="upload">导入到后台</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

</template>
<script>
    import {HTTP_HEADER_TOKEN_VAL, HTTP_RESPONSE_SUCCESS_CODE, USER_ID} from "../../const/constant";

    export default {
        data: () => {
            return {
                file: null,
                fileName: null
            }
        },
        methods: {
            fileChange: function (files) {
                this.file = files;
            },
            upload: function () {
                if (this.file !== null) {
                    let self = this;
                    let params = new FormData();
                    params.append('file', this.file);
                    params.append("userId", sessionStorage.getItem(USER_ID));
                    let config = {
                        //添加请求头
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Access-Control-Allow-Origin": '*',
                            HTTP_HEADER_TOKEN_KEY: sessionStorage.getItem(HTTP_HEADER_TOKEN_VAL) || ''
                        }
                    };
                    this.$http.post("share/insertByFile", params, config).then(function (response) {
                        if (response.data.code === HTTP_RESPONSE_SUCCESS_CODE) {
                            self.$toast.success(response.data.message);
                            self.file = null;
                            self.fileName = null;
                        } else {
                            self.$toast.error(response.data.message);
                        }
                    }).catch(function (error) {
                        self.$toast.error(error.message);
                    })

                } else {
                    this.$toast.error('上传文件不能为空，请先选择文件');
                }

            }
        }
    }
</script>