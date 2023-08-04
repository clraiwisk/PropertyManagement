import service from "@/utils/service";

export const getData = data => service({url: '/student/list', method: 'post', data});
export const getModel = id => service({url: '/student/model/' + id});
export const del = id => service({url: '/student/delete?id=' + id, method: 'delete'});
export const add = data => service({url: '/student/add', method: 'post', data});
export const update = data => service({url: 'student/update', method: 'put', data});
export const bulkdelete = data => service({url: '/student/bulkdelete', method: 'post', data});
