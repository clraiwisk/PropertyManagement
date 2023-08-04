import service from "@/utils/service";

export const list = () => service({url: '/ticketConfiguration/list', method: "post"});
export const menuList = fid => service({url:'/ticketConfiguration/menuList?fid=' + fid, method: 'post'});
export const del = (id,fid) => service({url:'/ticketConfiguration/delete?id=' + id + '&fid=' + fid, method: 'delete'});
export const getModel = id => service({url: '/ticketConfiguration/model/' + id});
export const add = data => service({url: '/ticketConfiguration/add', method: 'post', data});
export const update = data => service({url: '/ticketConfiguration/update', method: 'put', data});
export const stutas = id => service({url:'/ticketConfiguration/stutas/' + id, method: 'get'});
export const listNumToString = data => service({url: '/ticketConfiguration/listNumToString', method: "post", data});
export const menuNumToString = data => service({url: '/ticketConfiguration/menuNumToString', method: "post", data});