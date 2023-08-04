import * as student from './student.js';
import * as user from './user.js';
import * as personnelManage from './personnelManage.js';
import * as ticketConfiguration from './ticketConfiguration.js';
import * as warrantyManage from './warrantyManage.js';
import * as orderManage from './orderManage.js';
import * as homeMain from './homeMain.js';
import * as ParkingManage from './ParkingManage.js';
import * as PaymentManage from './PaymentManage.js';
import * as propertyManage from './propertyManage.js';

export default {
    install: function(Vue) {
        Vue.prototype.$api = {student, user, personnelManage, ticketConfiguration, warrantyManage, orderManage, homeMain, ParkingManage, PaymentManage, propertyManage}
    }
}