import service from "@/utils/service";

export const getData = data => service({url:"/orderManage/list", method: "post", data});
export const workTotal = () => service({url: "/orderManage/workTotal", method: "post"});
export const del = id => service({url:"/orderManage/delete?id=" + id, method: "delete"});
export const bulkdelete = data => service({url: '/orderManage/bulkdelete', method: 'post', data});
export const getModel = id => service({url: '/orderManage/model/' + id});
export const update = data => service({url: '/orderManage/update', method: 'put', data});
export const numToString = data => service({url: '/orderManage/numToString', method: "post", data});