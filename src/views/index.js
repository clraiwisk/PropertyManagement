// 统一导入所有功能组件，整合成"动态组件映射对象"再导出，给Home.vue用
export default Object.freeze({
    ResidentAuditManage: () => import('@/views/PersonnelManage/ResidentAuditManage.vue'),
    UserRealNameManage: () => import('@/views/PersonnelManage/UserRealNameManage.vue'),
    TicketConfiguration: () => import('@/views/PropertyManage/TicketConfiguration.vue'),
    WarrantyManage: () => import('@/views/PropertyManage/WarrantyManage.vue'),
    OrderManage: () => import('@/views/PropertyManage/OrderManage.vue'),
    HomeMain: () => import('@/views/Home/HomeMain.vue'),
    ParkingManage: () => import('@/views/ParkingManage/ParkingManage.vue'),
    VehicleManage: () => import('@/views/ParkingManage/VehicleManage.vue'),
    PaymentOrder: () => import('@/views/PaymentManage/PaymentOrder.vue'),
    PaymentRecord: () => import('@/views/PaymentManage/PaymentRecord.vue'),
    PropertyManage: () => import('@/views/HousingManage/PropertyManage.vue'),
});