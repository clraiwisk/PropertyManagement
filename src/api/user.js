import service from '@/utils/service.js';

export const login = data => service({url: '/user/login', method: 'post', data});