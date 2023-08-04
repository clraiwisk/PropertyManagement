export default {
  namespaced: true,
  state: {
      // 导出excel表格的代码---start
      title: "123表格",
      json_fields: {
          "车牌号": "numberPlate",
          "用户姓名": "userName",
          "用户电话": "userPhone",
          "状态": "vehicleStatus",
          "创建时间": "reviewTime",
          "所属小区": "community",
          "类型": 'parkType',
          "运营": 'operationalModes',
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