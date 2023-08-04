export default {
    namespaced: true,
    state: {
        list: [],// 数据列表
        total: 7,
        drawer: true,
        search: { name: "", idType: -1, tel: "", adds: "", time: "", approvalStatus: 0, pageSize: 5, currentPage: 1 },
        // model: { id: 0, name: "", tel: "", sex: -1, adds: "", idCard: "", idType: -1, time: "", img: "", vPeriod: "", approvalStatus: 0 },
        // isEditing: false,
        rules: {
            name: [
                { required: true, message: "* 姓名不能为空..", trigger: "blur" },
                { min: 2, max: 20, message: "* 姓名长度为2~20", trigger: "blur" }
            ],
            tel: [
                { required: true, message: "* 电话不能为空..", trigger: "blur" },
                { min: 11, max: 11, message: "* 电话长度为11", trigger: "blur" }
            ],
            adds: [
                { required: true, message: "* 地址不能为空..", trigger: "blur" },
                { min: 2, max: 20, message: "* 地址长度为2~20", trigger: "blur" }
            ],
            idCard: [
                { required: true, message: "* 身份号吗不能为空..", trigger: "blur" },
                { min: 18, max: 18, message: "* 身份号吗长度为18", trigger: "blur" }
            ],
            vPeriod: [
                { required: true, message: "* 有效时间不能为空..", trigger: "blur" },
                { min: 2, max: 20, message: "* 有效时间长度为2~20", trigger: "blur" }
            ]
        },
        // 导出excel表格的代码---start
        title: "123表格",
        json_fields: {
            "姓名": "name",
            "电话": "tel",
            "性别": "sex",
            "住址": "adds",
            "身份证号": "idCard",
            "住户类型": "idType",
            "提交时间": "time"
        }
    },
    getters: {

    },
    mutations: {
        totalFix(state, payload) {
            state.total = payload; // actions中的函数对state中的数据进行修改时所需要借助的辅助函数
        },
        currentPageFix(state, payload) {
            state.currentPage = payload; // actions中的函数对state中的数据进行修改时所需要借助的辅助函数
        },
        detailExcel(state, payload) {
            state.DetailForm = payload; // actions中的函数对state中的数据进行修改时所需要借助的辅助函数
        },
    },
    actions: {
        
    }
};