<template src="./index.html"></template>
<script>
import { getListData } from '@/api/api'
export default {
    data() {
        return {
            loading: false,
            page: 1,
            size: 10,
            total: 100,
            form: {
                number: "",
                sex: "",
                companyID: []
            },
            dataList: [
                {
                    name: 1, id:1,
                    imgUrl: "https://kaifa.qiaoxingtx.com/data/images/newContract/0/20200513163318.jpg"
                },
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
    created() {
        // this.tableList()
    },
    methods: {
        // 表格数据请求
        tableList() {
            let params = {
                page: this.page,
                size: this.size
            }
            getListData(params).then(res => {
                console.log(res)
            })
        }
    },
    
}
</script>
<style lang="scss" scoped>
    
</style>