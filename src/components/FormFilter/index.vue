<template>
    <div class="form-filter">
        <div ref="filter" >
            <el-form :model="formFilter" label-width="120" inline ref="formFilter">
                <slot name="form"></slot>
                <el-form-item>
                    <el-button type="primary" @click="reset">重 置</el-button>
                    <el-button type="primary" @click="search">查 询</el-button>
                    <slot name="btns"></slot>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "FormFilter",
    props: {
        formFilter: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    methods: {
        // 重置
        reset() {
            this.$refs["formFilter"].resetFields();
            this.search()
        },
        // 查询
        search() {
            this.$emit("search")
        }
    }
}
</script>
<style lang="scss" scoped>
    .search-btn {
        margin-bottom: 10px;
    }
</style>