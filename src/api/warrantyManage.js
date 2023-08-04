import service from "@/utils/service";

export const getData = data => service({url:"/warrantyManage/list", method: "post", data});
export const workTotal = () => service({url: "/warrantyManage/workTotal", method: "post"});
export const del = id => service({url:"/warrantyManage/delete?id=" + id, method: "delete"});
export const add = data => service({url: '/warrantyManage/add', method: 'post', data});
export const bulkdelete = data => service({url: '/warrantyManage/bulkdelete', method: 'post', data});
export const getModel = id => service({url: '/warrantyManage/model/' + id});
export const update = data => service({url: '/warrantyManage/update', method: 'put', data});
export const numToString = data => service({url: '/warrantyManage/numToString', method: "post", data});