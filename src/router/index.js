import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import routes from "./routes";

const router = new Router({
	mode: "history",
	routes
});

router.beforeEach(async (to, from, next) => {
    next();
	// NProgress.start()
	// if (!storage.getToken()) {
	// 	if (to.path === "/login") {
	// 		next();
	// 	} else {
	// 		next("/login");
	// 	}
	// } else {
	// 	let userInfo = storage.getUserInfo();
	// 	/* 密码为88888888时，跳转到修改密码 */
	// 	if (to.path !== "/mine/resetPassword" && userInfo.pw) {
	// 		next("/mine/resetPassword");
	// 	} else {
	// 		const hasAuth = store.getters.authorizes && store.getters.authorizes.length > 0;
	// 		if (!hasAuth) {
	// 			await store.dispatch("getAuthorizes");
	// 		}
	// 		next();
	// 	}
	// }
});

// router.afterEach((to, from) => {
// 	NProgress.done()
// })

export default router;
