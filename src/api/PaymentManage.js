import service from '@/utils/service.js';


export const getData = data => service({url: '/PaymentManage/list', method: 'post', data});
export const getList = data => service({url: '/PaymentManage/list1', method: 'post', data});