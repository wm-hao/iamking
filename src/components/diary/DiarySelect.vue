<template>
    <v-row class="fill-height" justify="center">
        <v-col cols="12">
            <v-card class="my-4">
                <v-row align="center" justify="center" class="px-1">
                    <v-col col="12">
                        <v-row>
                            <v-col cols="4">
                                <v-row justify="start">
                                    <v-col cols="1">
                                        <v-icon @click="prevPage">mdi-arrow-left-bold</v-icon>

                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">

                            </v-col>
                            <v-col cols="4">
                                <v-row justify="end">
                                    <v-col cols="1">
                                        <v-icon @click="nextPage">mdi-arrow-right-bold</v-icon>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-carousel v-model="model" :height="height * 0.6">
                    <v-carousel-item v-for="(record, i) in records" :key="record.id">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-card class="mx-0 fill-height" style="overflow-y: scroll;overflow-x: hidden;width: 100%">
                                <v-img class="white--text align-end" height="150px"
                                       :src="images[((Number(record.id) + 1) %(images.length))]">
                                    <v-card-title>每日日志-{{record.createDate.substr(0, 10)}}</v-card-title>
                                </v-img>
                                <v-card-subtitle class="align-start">创建于{{record.createDate}}</v-card-subtitle>

                                <v-card-text class="text-start">
                                    <div>{{ record.idea}}</div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-row>
                                        <v-col lg="10"></v-col>
                                        <v-col lg="2">
                                            <v-dialog v-model="dialog" persistent max-width="600">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="green" text block dark v-on="on"
                                                           @click="editRecord(record, i)">修改日志
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title class="headline">修改日志</v-card-title>
                                                    <v-card-text>
                                                        <v-textarea
                                                                style="width: 100%"
                                                                v-model="editedItem.idea"
                                                        ></v-textarea>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="green darken-1" text @click="close">取消</v-btn>
                                                        <v-btn color="green darken-1" text @click="save">保存</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-row>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    import {diarySelect, diaryUpdate} from "../../api/diary/diaryRequest";
    import jpg_home from '../../assets/img/house.jpg';
    import jpg_road from '../../assets/img/road.jpg';
    import jpg_plane from '../../assets/img/plane.jpg';

    export default {
        name: "DiarySelect",
        data() {
            return {
                model: 0,
                colors: [
                    'primary',
                    'secondary',
                    'yellow darken-2',
                    'red',
                    'orange',
                ],
                showLimit: 100,
                pageNum: 1,
                pageSize: 5,
                records: [],
                total: 0,
                qryParams: {
                    asc: 'N'
                },
                images: [
                    jpg_home,
                    jpg_plane,
                    jpg_road
                ],
                height: 900,
                editIndex: -1,
                editedItem: {
                    createDate: '',
                    id: 0,
                    idea: ''
                },
                defaultItem: {
                    createDate: '',
                    id: 0,
                    idea: ''
                },
                dialog: false,
            }
        },
        methods: {
            editRecord: function (record, index) {
                this.editedItem = Object.assign({}, record);
                this.editIndex = index;
            },
            close() {
                this.dialog = false;
            },

            save() {
                let self = this;
                diaryUpdate(this.editedItem, (json) => {
                    self.$msg.success(json.message);
                    Object.assign(self.records[self.editIndex], self.editedItem);
                    console.log(self.records);
                }, ((json) => {
                    self.$msg.error(json.message);
                }));
                self.dialog = false;
            },
            prevPage: function () {
                if (this.pageNum <= 1) {
                    this.pageNum = 1;
                    this.$msg.warning('前面没有了');
                } else {
                    this.pageNum--;
                    this.fetchData(this.pageNum, this.pageSize);
                }

            },
            nextPage: function () {
                this.pageNum++;
                let startIndex = (this.pageNum - 1) * this.pageSize;
                if (startIndex > this.total) {
                    this.$msg.warning('已经到最后了');
                    this.pageNum--;
                } else {
                    this.fetchData(this.pageNum, this.pageSize);
                }
            },
            assembleData: function (rows) {
                this.records.splice(0, this.records.length);
                for (let index in rows) {
                    let item = rows[index];
                    item.show = false;
                    this.records.push(item);
                }
            },
            query: function () {
                this.fetchData(this.page, this.pageSize);
            },
            fetchData: function (pageNum, pageSize) {
                let self = this;
                this.qryParams.pageSize = pageSize;
                this.qryParams.pageNum = pageNum;
                diarySelect(this.qryParams, (json) => {
                    self.assembleData(json.rows);
                    self.total = json.total;
                }, (json) => {
                    self.$msg.error(json.message);
                });
            },
        },
        created() {
            this.query();
            this.height = document.documentElement.clientHeight;
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
    }
</script>

<style scoped>
    .g {
        background: url("../../assets/img/road.jpg");
    }
</style>