let tokenName = "token",
	tokenUser = "user_info";
//  设置 当前用户的userinfo
const setUserInfo = data => {
	sessionStorage.setItem(tokenUser, JSON.stringify(data));
};

//  获取 当前用户的userinfo
const getUserInfo = () => {
	return JSON.parse(sessionStorage.getItem(tokenUser));
};

//  删除 当前用户的userinfo
const removeUserInfo = () => {
	sessionStorage.removeItem(tokenUser);
};

//  设置 当前用户的token
const setToken = token => {
	sessionStorage.setItem(tokenName, token);
};

//  获取 当前用户的token
const getToken = () => {
	return sessionStorage.getItem(tokenName);
};

//  删除 当前用户的token
const removeToken = () => {
	sessionStorage.removeItem(tokenName);
};

const storage = {
	setToken, //  设置 当前用户的token
	getToken, //  获取 当前用户的token
	removeToken, //  删除 当前用户的token
	getUserInfo, // 获取 当前用户的userinfo
	setUserInfo, // 设置 当前用户的userinfo
	removeUserInfo, // 删除 当前用户的userinfo
};

window.storage = storage

