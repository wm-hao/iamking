<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="qryParams.name"
                            :counter="4"
                            label="股票名称"
                    ></v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="qryParams.code"
                            :counter="6"
                            label="股票代码"
                    ></v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="qryParams.alias"
                            label="股票别名"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "RecordHistoryQry",
        data() {
            return {
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
                        label: '盈利'
                    }, {
                        value: 'N',
                        label: '亏损'
                    }
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        }
    }
</script>

<style scoped>

</style>