<template>
    <v-row class="fill-height ma-0">
        <v-col cols="12">
            <v-tabs>
                <v-tabs-slider></v-tabs-slider>
                <v-tab to="/home/record/qry/history">
                    <v-icon>list</v-icon>
                    <span style="font-size: 16px">历史查询</span>
                </v-tab>
                <v-tab to="/home/record/qry/profit">
                    <v-icon>list</v-icon>
                    <span style="font-size: 16px">盈利查询</span>
                </v-tab>
                <v-tab to="/home/record/create">
                    <v-icon>add_box</v-icon>
                    <span style="font-size: 16px">导入记录</span>
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
        name: "Record"
    }
</script>

<style scoped>

</style>