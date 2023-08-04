import service from "@/utils/service";


export const getData = data => service({url: '/ParkingManage/list', method: 'post', data});
export const getList = data => service({url: '/ParkingManage/list1', method: 'post', data});
export const vehic = data => service({url: '/ParkingManage/list2', method: 'post', data});
export const getModel = id => service({url: '/ParkingManage/model/' + id});
export const update = data => service({url: '/ParkingManage/update', method: 'put', data});
export const add = data => service({url: '/ParkingManage/add', method: 'post', data});