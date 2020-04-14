<template>
    <v-row class="fill-height ma-1">
        <v-col md="1" class="px-0 py-1">
            <v-card class="fill-height">
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
            </v-card>
        </v-col>
        <v-col md="11">
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