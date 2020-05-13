import axios from "axios";
import API_HOST from "./host";
import ecode from "./ecode";
import { Notification } from "element-ui";
import router from "@/router";

const dataType = obj => {
	if (obj === null) return "Null";
	if (obj === undefined) return "Undefined";

	return Object.prototype.toString.call(obj).slice(8, -1);
};

// 处理对象参数值，排除对象参数值为""、null、undefined,并返回一个新对象
const dealObjectValue = obj => {
	const param = {};
	if (obj === null || obj === undefined || obj === "") return param;
	Object.keys(obj).forEach((item, index) => {
		if (dataType(obj[item]) === "Object") {
			param[item] = dealObjectValue(obj[item]);
		} else if (dataType(obj[item]) === "Array" && obj[item].length == 0) {
			delete obj[item];
		} else if (obj[item] !== null && obj[item] !== undefined && obj[item] !== "" && !Number.isNaN(obj[item])) {
			param[item] = obj[item];
		}
	});
	return param;
};

// 新建一个 axios 实例
const instance = axios.create({
	baseURL: API_HOST,
	withCredentials: true,
	timeout: 1000 * 60,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		Pragma: "no-cache"
	},
	transformRequest: [
		data => {
			/* 剔除为空的参数 */
			if (Object.prototype.toString.call(data) === "[object FormData]") {
				// 上传excel对参数不做处理
				return data;
			} else {
				data = dealObjectValue(data);
				return JSON.stringify(data);
			}
		}
	]
});


// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// config.headers.token = storage.getToken();
		return config;
    },
	error => Promise.error(error)
);

// 添加响应拦截器
instance.interceptors.response.use(
    // 响应成功
	res => {
		if (res.status === 200) {
			let {code, message} = res.data;

			if (code == 401) {
				// token失效 或者被挤下线
				// sessionStorage.clear();
				router.push("/login");
			}

			if (code !== 200) {
				Notification.error(message || ecode[code]);
				return Promise.reject(res.data);
			}

			return Promise.resolve(res.data);
		} else {
			return Promise.reject(res);
		}
	},
	error => {
		const {response} = error;
		if (response) {
			// 收到响应，但是不在2xx的范围
			let code = response.status;
			if (code in ecode) {
				Notification.error(`${code}: ${ecode[code]}`);
			}
			return Promise.reject(response);
		} else {
			// 请求超时或断网时
			Notification.error("请检查网络连接！");
		}
	}
);

export default instance;
