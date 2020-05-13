import Vue from "vue";

import FlexTable from "./FlexTable";
import FormFilter from "./FormFilter";
import ViewSelect from "./ViewSelect";
import ViewImg from "./ViewImg";
const componentList = {
    FlexTable,
    FormFilter,
    ViewSelect,
    ViewImg
};


/* 注册全局组件 */
Object.keys(componentList).forEach(key => {
	Vue.component(key, componentList[key]);
});