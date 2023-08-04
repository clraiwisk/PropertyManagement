import service from '@/utils/service.js';

export const total = () => service({url: '/homeMain/total', method: 'post'});
export const barTotal = () => service({url: '/homeMain/barTotal', method: 'post'});
export const pieTotal = () => service({url: '/homeMain/pieTotal', method: 'post'});