<template>
    <v-container class="fill-height">
        <v-row class="fill-height ma-0" justify="center">
            <v-col cols="12">
                <v-tabs>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab to="/home/diary/select">
                        <v-icon>list</v-icon>
                        <span style="font-size: 16px">日志列表</span>
                    </v-tab>
                </v-tabs>
                <v-row class="fill-height ma-0" justify="center">
                    <router-view/>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: "Diary",
    }
</script>

<style scoped>

</style>