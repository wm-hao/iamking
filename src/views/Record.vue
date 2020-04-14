<template>
    <v-row class="fill-height ma-1">
        <v-col md="1" class="px-0 py-1">
            <v-card class="fill-height">
                <v-tabs vertical >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab to="/home/record/qry" class="mt-3">
                        <v-icon left class="fill-height">list</v-icon>
                        <span style="font-size: 18px">记录查询</span>
                    </v-tab>
                    <v-tab to="/home/record/create">
                        <v-icon left>create</v-icon>
                        <span style="font-size: 18px">记录添加</span>
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
        name: "Record"
    }
</script>

<style scoped>

</style>