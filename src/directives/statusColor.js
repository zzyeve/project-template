function setColor(el, { value }) {
	if (el.style.getPropertyValue("color")) {
		el.removeAttribute("style");
	}
	let status = ["已禁用", "已关闭", "禁用", "已解绑", "Disabled", "disabled"];
	if (status.includes(value)) {
		el.style.color = "red";
	}
}

export default function(Vue) {
	Vue.directive("statusColor", {
		inserted: setColor,
		update: setColor
	});
}