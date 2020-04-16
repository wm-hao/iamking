<template>
    <v-row justify="center" class="fill-height ma-0">
        <v-file-input accept=".xlsx" show-size counter label="上传文件" clearable class="mx-5" full-width accpet
                      @change="fileChange"></v-file-input>
        <v-btn color="primary" @click="upload">导入到后台</v-btn>

    </v-row>

</template>
<script>
    export default {
        data: () => {
            return {
                file: null
            }
        },
        methods: {
            fileChange: function (files) {
                this.file = new FormData();
                if (files && files.length > 0) {
                    this.file.append('file', files[0]);
                }
            },
            upload: function () {
                console.log(this.file);
            }
        }
    }
</script>