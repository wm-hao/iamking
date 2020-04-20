<template>
    <v-row class="fill-height" no-gutters>
        <v-col cols="6">
            <v-card class="ma-2" elevation="3">
                <div id="top" :style="style"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="ma-2" elevation="3">
                <div id="bottom" :style="style"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="ma-2" elevation="3">
                <div id="count" :style="style"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="ma-2" elevation="3">
                <div id="compare" :style="style"></div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {analyseTopData} from "../../api/analyse/analyseRequest";
    import {createBaseBar} from "../../util/baseChart";
    import {getDimensionQuarterStyle} from "../../util/dimension";

    export default {
        name: "AnalyseTopData",
        data() {
            return {
                style: ''
            }
        },
        methods: {
            createTop: function (category, data) {
                let config = {
                    title: '盈利Top10',
                    dataName: '盈利/元',
                    barWidth: '10',
                    yInterval: 0,
                    barWidth: '8'
                };
                createBaseBar(category, data, 'top', config, true);
            },
            createBottom: function (category, data) {
                let config = {
                    title: '亏损Top10',
                    dataName: '亏损/元',
                    barWidth: '10',
                    yInterval: 0,
                    barWidth: '8'
                };
                createBaseBar(category, data, 'bottom', config, true);
            },
            createCount: function (category, data) {
                let config = {
                    title: '交易次数Top10',
                    dataName: '次数',
                    barWidth: '10',
                    yInterval: 0,
                    barWidth: '8'
                };
                createBaseBar(category, data, 'count', config, true);
            },
            createCompare: function (data) {
                let category = ['盈利', '平衡', '亏损'];
                let config = {
                    title: '盈亏次数对比',
                    dataName: '次数',
                    barWidth: '20'
                };
                createBaseBar(category, data, 'compare', config);
            }
        },

        created: function () {
            this.style = getDimensionQuarterStyle();
        },
        mounted() {
            let self = this;
            analyseTopData({}, (json) => {
                self.createTop(json.rows[0], json.rows[1]);
                self.createBottom(json.rows[2], json.rows[3]);
                self.createCount(json.rows[4], json.rows[5]);
                self.createCompare(json.rows[6]);
            }, (json) => {
                self.$msg.error(json.message);
            });
        }
    }
</script>

<style scoped>

</style>