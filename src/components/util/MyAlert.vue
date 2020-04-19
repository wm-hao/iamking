<template>
    <v-alert
            border="top"
            colored-border
            :type="type"
            elevation="2"
    >
        {{msg}}
    </v-alert>
</template>

<script>
    export default {
        name: "MyAlert",
        props: {
            msg: String,
            type: String
        }
    }
</script>

<style scoped>

</style>