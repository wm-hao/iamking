<template>
    <v-row class="fill-height">
        <v-col cols="12" class="pa-2">
            <v-card class="ma-4" elevation="3">
                <div id="day" :style="style"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="ml-4 mr-1" elevation="3">
                <div id="month" :style="style2"></div>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="mr-4 ml-1" elevation="3">
                <v-row justify="center">
                    <div id="year" :style="style2"></div>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {analyseFrequency} from "../../api/analyse/analyseRequest";
    import {createBaseBar} from "../../util/baseChart";
    import {getDimensionHalfStyle, getDimensionQuarterStyle} from "../../util/dimension";

    export default {
        name: "AnalyseFrequency",
        data() {
            return {
                style2: '',
                style: ''
            }
        },
        methods: {
            createDayBar: function (category, data) {
                let config = {
                    title: '日交易次数',
                    dataName: '交易次数',
                    barWidth: '5',
                    zoom: true,
                    zoomStart: 80,
                    zoomEnd: 100,
                    xInterval: 2
                };
                createBaseBar(category, data, 'day', config);
            },
            createMonthBar: function (category, data) {
                let config = {
                    title: '月交易次数',
                    dataName: '交易次数',
                    barWidth: '10',
                    zoom: true,
                    zoomStart: 50,
                    zoomEnd: 100,
                    xInterval: 2
                };
                createBaseBar(category, data, 'month', config);
            },
            createYearBar: function (category, data) {
                let config = {
                    title: '年交易次数',
                    dataName: '交易次数',
                    barWidth: '20',
                    xInterval: 2
                };
                createBaseBar(category, data, 'year', config);
            },
        },
        created() {
            this.style = getDimensionHalfStyle();
            this.style2 = getDimensionQuarterStyle();
        },
        mounted() {
            let self = this;
            analyseFrequency({}, (json) => {
                self.createDayBar(json.rows[0], json.rows[1]);
                self.createMonthBar(json.rows[2], json.rows[3]);
                self.createYearBar(json.rows[4], json.rows[5]);
            }, (json) => {
                self.$msg.error(json.message);
            });
        }
    }
</script>

<style scoped>

</style>