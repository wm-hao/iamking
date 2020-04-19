<template>
    <v-row class="fill-height">
        <v-col cols="12" class="pa-2">
            <v-card class="ma-4" elevation="3">
                <div id="all" :style="style"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="ml-4 mr-1" elevation="3">
                <div id="top" :style="style2"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="mr-4 ml-1" elevation="3">
                <div id="bottom" :style="style2"></div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {getDimensionHalfStyle, getDimensionQuarterStyle} from "../../util/dimension";
    import {analyseDuration} from "../../api/analyse/analyseRequest";
    import {createBaseBar} from "../../util/baseChart";

    export default {
        name: "AnalyseDuration",
        data() {
            return {
                style: '',
                style2: ''
            }
        },
        created() {
            this.style = getDimensionHalfStyle();
            this.style2 = getDimensionQuarterStyle();
        },
        mounted() {
            let self = this;
            let params = {
                dataType: '1'
            };
            analyseDuration(params, (json) => {
                self.createAllBar(json.rows[0], json.rows[1]);
            }, (json) => {
                self.$msg.error(json.message);
            });
            params = {
                dataType: '1',
                pageNum: 1,
                pageSize: 10,
                asc: 'N'
            };
            analyseDuration(params, (json) => {
                self.createTopBar(json.rows[0], json.rows[1]);
            }, (json) => {
                self.$msg.error(json.message);
            });
            params = {
                dataType: '1',
                pageNum: 1,
                pageSize: 10,
            };
            analyseDuration(params, (json) => {
                self.createBottomBar(json.rows[0], json.rows[1]);
            }, (json) => {
                self.$msg.error(json.message);
            });
        },
        methods: {
            createAllBar: function (category, data) {
                let config = {
                    title: '持股时长',
                    dataName: '时间/天',
                    barWidth: '8',
                    zoom: true,
                    zoomStart: 80,
                    zoomEnd: 100,
                    xInterval: 3
                };
                createBaseBar(category, data, 'all', config);
            },
            createTopBar: function (category, data) {
                let config = {
                    title: 'TOP10',
                    dataName: '时间/天',
                    barWidth: '8',
                };
                createBaseBar(category, data, 'top', config, true);
            },
            createBottomBar: function (category, data) {
                let config = {
                    title: 'BOTTOM10',
                    dataName: '时间/天',
                    barWidth: '8',
                };
                createBaseBar(category, data, 'bottom', config, true);
            }
        }
    }
</script>

<style scoped>

</style>