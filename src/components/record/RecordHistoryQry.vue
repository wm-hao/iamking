<template>
    <v-row class="fill-height ma-0">
        <v-card width="100%" class="ma-1" elevation="1" height="70px" outlined>
            <v-form style="width: 100%;padding: 8px">
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
        <v-card width="100%" class="ma-0" elevation="4">
            <v-data-table
                    :headers="headers"
                    :items="records"
                    sort-by="calories"
                    class="elevation-4"
                    :server-items-length="total"
                    :options.sync="options"
                    :page.sync="page"
            >
                <template v-slot:header.name="{ header }">
                    <span class="test">{{ header.text.toUpperCase() }}</span>
                </template>
                <template v-slot:top>
                    <!--<v-toolbar color="white" elevation="0"  class="ma-0">
                        <v-toolbar-title>交易记录</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical/>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary"  class="ma-2" v-on="on">新增记录</v-btn>
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
                                                              label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.calories"
                                                              label="Calories"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.carbs"
                                                              label="Carbs (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.protein"
                                                              label="Protein (g)"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>-->
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>

    </v-row>

</template>

<script>
    import {historyQryPagination} from "../../api/record/recordRequest";
    import {USER_ID} from "../../const/constant";

    export default {
        name: "RecordHistoryQry",
        data() {
            return {
                menu: false,
                menu2: false,
                tableData: [],
                page: 1,
                total: 10,
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
                        value: 'name',
                    },
                    {text: '股票别名', value: 'alias'},
                    {text: '股票代码', value: 'code'},
                    {text: '买入价格/元', value: 'buyPrice'},
                    {text: '卖出价格/元', value: 'sellPrice'},
                    {text: '买入时间', value: 'buyTime'},
                    {text: '卖出时间', value: 'sellTime'},
                    {text: '交易数量/股', value: 'buyCount'},
                ],
                records: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
            }
        },
        methods: {
            query: function () {
                console.log(this.qryParams);
                let self = this;
                this.qryParams.pageSize = 10;
                this.qryParams.pageNum = 1;
                historyQryPagination(this.qryParams, (json) => {
                    // console.log(json);
                    console.log(json.message);
                }, (json) => {
                    self.$toast.error(json.message);
                });
                this.qryParams.userId = Number(sessionStorage.getItem(USER_ID));
                this.$http.post("share/list/page", this.qryParams).then(function (rsp) {
                    console.log(rsp.data);
                })
            },
            initialize() {
                this.records = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },
    }
</script>

<style scoped>
    .col {
        height: 70px;
    }

    .test {
        font-size: 20px;
    }
</style>