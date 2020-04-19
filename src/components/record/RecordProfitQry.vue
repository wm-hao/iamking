<template>
    <v-row justify="center" class="fill-height ma-0">
        <v-col cols="12" style="height: 70px">
            <v-card width="100%" class="my-2" elevation="1" height="70px" outlined>
                <v-form style="width: 100%;padding: 8px;height: 70px">
                    <v-row dense justify="start" align="start">
                        <v-col lg="3">
                            <v-row dense>
                                <v-col lg="6">
                                    <v-text-field v-model="qryParams.name" label="股票名称" clearable dense/>
                                </v-col>
                                <v-col lg="6">
                                    <v-text-field v-model="qryParams.code" label="股票代码" clearable dense/>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col lg="3">
                            <v-row dense>
                                <v-col lg="6">
                                    <v-select :items="orders" label="排列顺序" clearable dense
                                              v-model="qryParams.asc"/>
                                </v-col>
                                <v-col lg="6">
                                    <v-btn color="primary" @click="query">点击查询</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <v-data-table
                    style="width: 100%;overflow-y: auto;overflow-x: hidden"
                    :headers="headers"
                    :items="records"
                    class="elevation-4 mt-2"
                    :server-items-length="total"
                    :options.sync="options"
                    :page.sync="page"
                    :items-per-page.sync="perPage"
                    @update:items-per-page="query"
                    @update:page="query"
                    :no-data-text='noDataText'
            >
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
    import {recordProfitQry} from "../../api/record/recordRequest";

    export default {
        name: "RecordProfitQry",
        data() {
            return {
                noDataText: '暂无数据',
                tableData: [],
                perPage: 10,
                page: 1,
                total: 0,
                options: {},
                currentPage: 1,
                qryParams: {
                    asc: '',
                    code: '',
                    name: '',
                    alias: ''
                },
                orders: [
                    {
                        value: 'Y',
                        text: '由盈到亏'
                    }, {
                        value: '',
                        text: '由亏到盈'
                    }
                ],
                headers: [
                    {text: '股票名称', value: 'name'},
                    {text: '股票代码', value: 'code'},
                    {text: '盈利/元', value: 'profit'},
                ],
                records: [],
            }
        },
        methods: {
            assembleData: function (rows) {
                this.records.splice(0, this.records.length);
                for (let index in rows) {
                    this.records.push(rows[index]);
                }
            },
            query: function () {
                this.fetchData(this.page, this.perPage);
            },
            fetchData: function (pageNum, pageSize) {
                let self = this;
                this.qryParams.pageSize = pageSize;
                this.qryParams.pageNum = pageNum;
                recordProfitQry(this.qryParams, (json) => {
                    self.assembleData(json.rows);
                    self.total = json.total;
                }, (json) => {
                    self.$toast.error(json.message);
                });
            },
            initialize() {
                this.query();
            },
        }
    }
</script>

<style scoped>

</style>