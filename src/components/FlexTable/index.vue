<template>
    <div class="flex-table">
        <slot></slot>
        <div class="table-container" :ref="reference">
            <slot name="table" :height="height"></slot>
        </div>
        <div class="table-pagination" v-if="pager">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 50, 100, 200]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                background>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: "FlexTable",
    props: {
        page: {
            type: [Number, String],
            default: 0
        },
        size: {
            type: [Number, String],
            default: 10
        },
        total: {
            type: [Number, String],
            default: 0
        },
        pager: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            height: 0
        }
    },
    computed: {
        reference() {
            return `reference-${Math.random().toString(36).substr(6)}`
        }
    },
    created() {
        this.$nextTick(() => {
            this.setHeight(200)
        })
        window.addEventListener("resize", this.setHeight)
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeight)
    },
    methods: {
        // 根据窗口自动设置高度
        setHeight(delay = 0) {
            setTimeout(() => {
                let refer = this.$refs[this.reference]
                this.height = refer.clientHeight || refer.offsetHeight
            }, delay);
        },
        handleSizeChange(size) {
            this.$emit("update:size", size)
            this.$emit("update:page", 1)
            this.$emit("change")
        },
        handleCurrentChange(page) {
            this.$emit("update:page", page)
            this.$emit("change")
        }
    }
}
</script>
<style lang="scss" scoped>
.flex-table {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .table-container {
        flex: 1;
        position: relative;
        .el-table {
            position: absolute;
            width: 100%;
        }
    }
    .table-pagination {
        width: 100%;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
    }
}
</style>