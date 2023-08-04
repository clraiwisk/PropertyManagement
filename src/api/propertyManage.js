import service from '@/utils/service.js';

export const list = data => service({url:"propertyManagement/list", method: "post", data});

export const menuList = data => service({url:'propertyManagement/menulist' , method: 'post', data});
export const getModel = id => service({url: '/propertyManagement/model/' + id});
export const add = data => service({url: "/propertyManagement/add", method:"post", data});
export const update = data => service({url: "propertyManagement/update", method:"put", data});
export const del = id => service({url: "propertyManagement/delete?id=" + id, method: "delete"});
