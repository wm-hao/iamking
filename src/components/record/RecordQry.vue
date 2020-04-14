<template>
    <v-container class="fill-all">
        <v-row class="fill-all">
            <v-row class="fill-all">
                <v-tabs right>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab to="/home/record/qry/history">
                        <v-icon large>list</v-icon>
                        <span style="font-size: 16px">历史查询</span>
                    </v-tab>
                    <v-tab to="/home/record/qry/profit">
                        <v-icon large>list</v-icon>
                        <span style="font-size: 16px">盈利查询</span>
                    </v-tab>
                </v-tabs>
            </v-row>
            <v-row class="fill-all">
                <router-view/>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "RecordQry"
    }
</script>

<style scoped>

</style>