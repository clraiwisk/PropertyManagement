import service from "@/utils/service";

export const checked = data => service({url: '/personnelManage/checked', method: 'post', data});
export const toreview = data => service({url: '/personnelManage/toreview', method: 'post', data});
export const overrule = data => service({url: '/personnelManage/overrule', method: 'post', data});
export const moveout = data => service({url: '/personnelManage/moveout', method: 'post', data});
export const del = id => service({url:'/personnelManage/delete?id=' + id, method: 'delete'});
export const getModel = id => service({url: '/personnelManage/model/' + id});
export const bulkdelete = data => service({url: '/personnelManage/bulkdelete', method: 'post', data});
export const add = data => service({url: '/personnelManage/add', method: 'post', data});
export const update = data => service({url: '/personnelManage/update', method: 'put', data});
export const preupload = () => service({url: '/personnelManage/preupload', method: 'post'});
export const excel = data => service({url: '/personnelManage/excel', method: 'post', data});
export const back = id => service({url: '/personnelManage/back?id=' + id, method: 'post'});
export const tomove = id => service({url: '/personnelManage/tomove?id=' + id, method: 'post'});
export const userrealchecked = data => service({url: '/personnelManage/userrealchecked', method: 'post', data});
export const userrealtoreview = data => service({url: '/personnelManage/userrealtoreview', method: 'post', data});
export const userrealoverrule = data => service({url: '/personnelManage/userrealoverrule', method: 'post', data});
export const numToString = data => service({url: '/personnelManage/numToString', method: 'post', data});

