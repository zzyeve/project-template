<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    data() {
        return {
            breadList: []
        }
    },
    mounted() {
        this.getBreadList(this.$route)
    },
    methods: {
        // 获取当前位置设置面包屑
        getBreadList(allRoute) {
            let { matched } = allRoute;
            this.breadList = matched;
        }
    }
}
</script>
<style scoped>
    .breadcrumb {
        margin-bottom: 10px;
    }
</style>