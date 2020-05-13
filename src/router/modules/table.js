import Layout from "@/components/Layout"

const Table = () =>
	import(/* webpackChunkName: "table" */ "@/pages/table/list/index.vue");

export default {
	path: "/table",
	component: Layout,
	name: "表格",
	redirect: "/table/list",
	children: [
		{
			path: "list",
			component: Table,
			name: "表格列表"
		}
	]
};
