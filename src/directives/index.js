import statusColor from "./statusColor"; 


const directiveList = {
	statusColor
};

const directives = {
	install: function(Vue) {
		Object.keys(directiveList).forEach(key => {
			directiveList[key](Vue);
		});
	}
};

export default directives;