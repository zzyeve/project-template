<template src="./index.html"></template>
<script>
export default {
    data() {
        return {
            loading: false,
            page: 1,
            size: 10,
            total: 100,
            form: {},
            dataList: [
                {name: 1, id:1},
                {name: 1, id:2},
                {name: 1, id:3},
                {name: 1, id:4},
                {name: 1, id:5},
                {name: 1, id:6},
                {name: 1, id:7},
                {name: 1, id:8},
                {name: 1, id:9}

            ]
        }
    },
    methods: {
        // 表格数据请求
        tableList() {
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>