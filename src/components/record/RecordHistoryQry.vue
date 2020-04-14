<template>
    <v-row class="fill-height ma-0">
        <v-card width="100%" class="ma-1">
            <v-form style="width: 100%;padding: 8px">
                <v-row class="fill-height ma-0">
                    <v-col lg="2" md="4">
                        <v-text-field v-model="qryParams.name" :counter="4" label="股票名称"/>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-text-field v-model="qryParams.code" :counter="6" label="股票代码"/>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-text-field v-model="qryParams.alias" :counter="4" label="股票别名"/>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-select :items="profitStates" label="盈利状态" clearable v-model="qryParams.profit"/>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-select :items="orderBys" label="时间排序规则" clearable v-model="qryParams.asc"/>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-btn class="primary" block @click="query">查询</v-btn>
                    </v-col>
                    <v-col lg="2" md="4">
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
                                        label="选择开始日期"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="qryParams.startDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(qryParams.startDate)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col lg="2" md="4">
                        <v-btn class="primary" block @click="query">查询</v-btn>
                    </v-col>

                </v-row>
            </v-form>

        </v-card>
    </v-row>

</template>

<script>
    export default {
        name: "RecordHistoryQry",
        data() {
            return {
                menu: false,
                tableData: [],
                total: 0,
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
            }
        },
        methods: {
            query: function () {
                console.log(this.qryParams);
            }
        }
    }
</script>

<style scoped>

</style>