/** 下拉框公共封装，只用指定data，绑定值即可 */
<template>
    <div>
        <!-- 非多选情况 -->
        <el-select 
            v-if="!multiple"
            :value="value" 
            :placeholder="placeholder" 
            filterable clearable 
            @input="change($event)" 
            :style="{width:width}">
            <el-option 
                v-for="(item, key) in dataList" 
                :value="item.value || key" :key="key" :label="item.label || item">

            </el-option>
        </el-select>
        <!-- 多选情况 -->
        <el-select 
            v-if="multiple" 
            :value="value" 
            :placeholder="placeholder" 
            filterable multiple
            collapse-tags
            @input="change($event)"
            :style="{width:width}">
            <el-option v-for="(item, key) in dataList" :value="item.value || key" :key="key" :label="item.label || item">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            type: String,
            default: '162px'
        },
        multiple: {
            type:  Boolean,
            default: false,
            required: false
        },
        placeholder: {
            type: String,
            default: '请选择',
            required: false
        },
        value: {
            type: [String, Array],
            required: true,
            default: ''
        },
        dataList: {
            type: [Array, Object],
            required: true
        }
    },
    data() {
        return {};
    },
    methods: {
        // select的change事件
        change(val) {
            this.$emit('input', val);
        }
    }
};
</script>
