<template>
    <v-row class="fill-all">
        <v-col md="2">
            <v-tabs vertical>
                <v-tabs-slider></v-tabs-slider>
                <v-tab>
                    <v-icon left large>list</v-icon>
                    <span style="font-size: 16px">浏览日志</span>
                </v-tab>
                <v-tab to="/home/diary/create">
                    <v-icon left large>create</v-icon>
                    <span style="font-size: 16px">添加日志</span>
                </v-tab>
            </v-tabs>
        </v-col>
        <v-col md="10">
            <router-view/>
        </v-col>
    </v-row>

</template>

<script>

    export default {
        name: "Diary",
    }
</script>

<style scoped>

</style>