<style scoped>
    .v-data-table thead tr th {
        color: red;
        height: 200px;
    }

</style>
<template>
    <v-row justify="center" class="fill-height ma-0">
        <v-col cols="12" style="height: 70px">
            <v-card width="100%" class="my-2" elevation="1" height="70px" outlined>
                <v-form style="width: 100%;padding: 8px;height: 70px">
                    <v-row dense justify="center" align="center">
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
                                    <v-text-field v-model="qryParams.alias" label="股票别名" clearable dense/>
                                </v-col>
                                <v-col lg="6">
                                    <v-select :items="profitStates" label="盈利状态" clearable dense
                                              v-model="qryParams.profit"/>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col lg="3">
                            <v-row align="center" dense>
                                <v-col lg="6">
                                    <v-select :items="orderBys" label="时间排序" clearable dense v-model="qryParams.asc"/>
                                </v-col>
                                <v-col lg="6">
                                    <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :return-value.sync="qryParams.startDate"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="qryParams.startDate"
                                                    label="开始日期"
                                                    prepend-icon="event"
                                                    readonly
                                                    clearable dense
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="qryParams.startDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(qryParams.startDate)">OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col lg="3">
                            <v-row align="center" dense>
                                <v-col lg="6">
                                    <v-menu
                                            ref="menu2"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :return-value.sync="qryParams.endDate"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="qryParams.endDate"
                                                    label="结束日期"
                                                    prepend-icon="event"
                                                    readonly
                                                    clearable dense
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="qryParams.endDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu2.save(qryParams.endDate)">OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
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
                    style="width: 100%"
                    :headers="headers"
                    :items="records"
                    sort-by="calories"
                    class="elevation-4 mt-2"
                    :server-items-length="total"
                    :options.sync="options"
                    :page.sync="page"
                    @update:page="updatePage"
            >
                <template v-slot:top>
                    <v-row>
                        <v-col lg="2" style="text-align: start">
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" class="ma-2" v-on="on">新增记录</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.name"
                                                                  label="股票名称"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.alias"
                                                                  label="股票别名"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.code"
                                                                  label="股票代码"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.buyPrice"
                                                                  label="买入价格/元"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.sellPrice"
                                                                  label="卖出价格/元"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.buyTime"
                                                                  label="买入时间"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.sellTime"
                                                                  label="卖出时间"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.buyCount"
                                                                  label="交易数量/股"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>

                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">重置数据</v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>

</template>

<script>
    import {historyQryPagination} from "../../api/record/recordRequest";

    export default {
        name: "RecordHistoryQry",
        data() {
            return {
                menu: false,
                menu2: false,
                tableData: [],
                page: 1,
                total: 0,
                options: {},
                currentPage: 1,
                qryParams: {
                    profit: '',
                    endDate: '',
                    startDate: '',
                    asc: '',
                    code: '',
                    name: '',
                    alias: ''
                },
                profitStates: [
                    {
                        value: 'Y',
                        text: '盈利'
                    }, {
                        value: 'N',
                        text: '亏损'
                    }
                ],
                orderBys: [
                    {
                        value: 'Y',
                        text: '由远到近'
                    }, {
                        value: 'N',
                        text: '由近到远'
                    }
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                dialog: false,
                headers: [
                    {
                        text: '股票名称',
                        align: 'start',
                        sortable: false,
                        value: 'name'
                    },
                    {text: '股票别名', value: 'alias'},
                    {text: '股票代码', value: 'code'},
                    {text: '买入价格/元', value: 'buyPrice'},
                    {text: '卖出价格/元', value: 'sellPrice'},
                    {text: '买入时间', value: 'buyTime'},
                    {text: '卖出时间', value: 'sellTime'},
                    {text: '交易数量/股', value: 'buyCount'},
                    {text: '操作', value: 'actions'}
                ],
                records: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    alias: '',
                    code: '',
                    buyPrice: null,
                    sellPrice: null,
                    buyCount: null,
                    buyTime: '',
                    sellTime: ''
                },
                defaultItem: {
                    name: '',
                    alias: '',
                    code: '',
                    buyPrice: null,
                    sellPrice: null,
                    buyCount: null,
                    buyTime: '',
                    sellTime: ''
                },
            }
        },
        methods: {
            updatePage: function () {
                this.fetchData(this.page);
            },
            assembleData: function (rows) {
                this.records.splice(0, this.records.length);
                for (let index in rows) {
                    this.records.push(rows[index]);
                }
            },
            query: function () {
                console.log(this.qryParams);
            },
            fetchData: function (pageNum) {
                let self = this;
                this.qryParams.pageSize = 10;
                this.qryParams.pageNum = pageNum;
                historyQryPagination(this.qryParams, (json) => {
                    self.assembleData(json.rows);
                    self.total = json.total;
                }, (json) => {
                    self.$toast.error(json.message);
                });
            },
            initialize() {
                this.fetchData(1);
            },

            editItem(item) {
                this.editedIndex = this.records.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.records.indexOf(item)
                confirm('你确定想要删除此项记录吗?') && this.records.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.records[this.editedIndex], this.editedItem)
                } else {
                    this.records.push(this.editedItem)
                }
                this.close()
            },
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新增记录' : '编辑记录'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize();
            console.log("初始化");
        },
    }
</script>

