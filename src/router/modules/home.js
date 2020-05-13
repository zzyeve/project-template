import Layout from "@/components/Layout"

const Home = () =>
	import(/* webpackChunkName: "home" */ "@/pages/home");

export default {
	path: "/home",
	component: Layout,
	name: "首页",
	redirect: "/home/list",
	children: [
		{
			path: "list",
			component: Home,
			name: "首页列表"
		}
	]
};
