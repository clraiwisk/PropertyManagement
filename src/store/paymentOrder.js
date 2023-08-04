export default {
  namespaced: true,
  state: {
      // 导出excel表格的代码---start
      title: "123表格",
      json_fields: {
          "流水号": "serial",
          "订单编号": "billNumber",
          "所属房屋": "ownedHouse",
          "账单类目": "billtype",
          "实收金额": "amount",
          "缴费时间": "time",
          "订单状态": "paymentStatus",
          "支付方式": "payType"
      }
  },
  getters: {

  },
  mutations: {
      detailExcel(state, payload) {
          state.DetailForm = payload; // actions中的函数对state中的数据进行修改时所需要借助的辅助函数
      },
  },
  actions: {
      
  }
};