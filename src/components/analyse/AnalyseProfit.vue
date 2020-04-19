<template>
    <v-row class="fill-height">
        <v-col cols="12" class="pa-2">
            <v-card class="ma-4" elevation="3">
                <div id="all" :style="style"></div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {getDimensionFullStyle} from "../../util/dimension";
    import {createBaseBar} from "../../util/baseChart";
    import {analyseProfit} from "../../api/analyse/analyseRequest";

    export default {
        name: "AnalyseProfit",
        data() {
            return {
                style: ''
            }
        },
        created() {
            this.style = getDimensionFullStyle();
        },
        mounted() {
            let self = this;
            analyseProfit({}, (json) => {
                self.createAllBar(json.rows[0], json.rows[1]);
            }, (json) => {
                self.$msg.error(json.message);
            });
        },
        methods: {
            createAllBar: function (category, data) {
                let config = {
                    title: '盈亏数据',
                    dataName: '盈利/元',
                    barWidth: '8',
                    zoom: true,
                    zoomStart: 60,
                    zoomEnd: 80,
                    xInterval: 0
                };
                createBaseBar(category, data, 'all', config);
            }
        }

    }
</script>

<style scoped>

</style>