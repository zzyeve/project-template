import Vue from "vue";
import dayjs from "dayjs";

// 自定义日期
export const formatDate = (date, formater = "YYYY/MM/DD") => {
	if (!date) return "--";
	return dayjs(date).format(formater);
};

// 长日期
export const longDate = (date, formater = "YYYY/MM/DD HH:mm:ss") => {
	if (!date) return "--";
	return dayjs(date).format(formater);
};

// 短日期
export const shortDate = (date, formater = "YYYY/MM/DD") => {
	if (!date) return "--";
	return dayjs(date).format(formater);
};

// 时长
export const duration = duration => {
	if (!duration) return "--";
	return dayjs("2019-01-01")
		.second(duration)
		.format("HH:mm:ss");
};

// 处理金额
export const toMoney = num => {
	if (num) {
		num = typeof num == "string" ? parseFloat(num) : num;
		num = num.toFixed(2);
		num = parseFloat(num);
		num = num.toLocaleString();
		if (num.indexOf(".") == -1) {
			num = num + ".00";
		} else {
			let [int, decimal] = num.split(".");
			num = decimal.length < 2 ? num + "0" : num;
		}
		return num;
	} else {
		return "0.00";
	}
};

// 掩码身份证&&银行卡
export const formatNumber = value => {
	if (value) {
		let len = String(value).length - 7;
		let reg = new RegExp(`(\\d{3})\\d{${len}}(\\d{3}([0-9]|X))`, "i");
		return String(value).replace(reg, `$1${"*".repeat(len)}$2`);
	}
	return "/";
};

export const filters = {
	formatDate,
	longDate,
	shortDate,
	toMoney,
	formatNumber,
	duration
};

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});
