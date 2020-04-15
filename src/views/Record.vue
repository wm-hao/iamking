<template>
    <v-row class="fill-height ma-1">
        <!--<v-col md="3" lg="1" class="px-0 py-1">
            <v-card class="fill-height">
                <v-tabs vertical>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab to="/home/record/qry/history" class="mt-3">
                        &lt;!&ndash;                        <v-icon left class="fill-height">list</v-icon>&ndash;&gt;
                        <span style="font-size: 18px">记录查询</span>
                    </v-tab>
                    <v-tab to="/home/record/create">
                        &lt;!&ndash;                        <v-icon left>create</v-icon>&ndash;&gt;
                        <span style="font-size: 18px">记录添加</span>
                    </v-tab>
                </v-tabs>
            </v-card>
        </v-col>
        <v-col md="9" lg="11">-->
            <router-view/>
     <!--   </v-col>-->
    </v-row>
</template>

<script>
    export default {
        name: "Record"
    }
</script>

<style scoped>

</style>