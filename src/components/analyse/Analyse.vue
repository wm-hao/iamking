<template>
    <v-row class="fill-height ma-0">
        <v-col cols="12">
            <v-tabs>
                <v-tabs-slider></v-tabs-slider>
                <v-tab to="/home/analyse/frequency">
                    <v-icon>list</v-icon>
                    <span style="font-size: 16px">交易频率</span>
                </v-tab>
                <v-tab to="/home/analyse/top">
                    <v-icon>list</v-icon>
                    <span style="font-size: 16px">榜单数据</span>
                </v-tab>
                <v-tab to="/home/analyse/profit">
                    <v-icon>add_box</v-icon>
                    <span style="font-size: 16px">盈亏数据</span>
                </v-tab>
                <v-tab to="/home/analyse/duration">
                    <v-icon>add_box</v-icon>
                    <span style="font-size: 16px">时长分析</span>
                </v-tab>
            </v-tabs>
            <v-row class="fill-height">
                <router-view/>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Analyse"
    }
</script>

<style scoped>

</style>