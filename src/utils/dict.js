import Vue from "vue"
/**
 * 全局字典，公共的一些枚举属性
 */
const dict = {
    /* 性别 */
    sexEnum: {
        0: "男",
        1: "女"
    },
    companyEnum: {
        1: "阿里",
        2: "网易",
        3: "腾讯",
        4: "顺丰"
    }
}

Vue.prototype.$DICT = dict