import instance from "./index";

/******************** 公共接口 **********************/
/* 查询表格数据 */
export const getListData  = params => {
    return instance.get("/pictureList", params);
};


