import { arr2tree } from "@/utils/common.js";
import service from "@/utils/service";

export default {
    namespaced: true,
    state: {
        userFuncs: [],
        openFuncKeys: ["home"],
        activeFuncKey: "home" // 通过element-ui自带的value和v-model属性可以进行激活和不激活的设置
    },
    getters: {
        AsyncComponentMap(state) {
            return state.userFuncs.reduce(function(result, item) { // 将在服务器中请求过来的数据，映射成组件的地址
                if(item.key) result[item.key] = () => import(`@/views${item.path}`);
                return result;
                // {    rsult 的结果
                //     ljk: () => import {@/views/Ljk/Ljk.vue},
                //     yx: () => import {@/views/Yx/Yx.vue},
                //     zcy: () => import {@/views/Zcy/Zcy.vue},
                //     wxx: () => import {@/views/Wxx/Wxx.vue},
                // }
            }, {});
        },
        menuData(state) {    // 树形功能数据动态渲染菜单用的
            return state.userFuncs.length === 0 ? [] : arr2tree(state.userFuncs, "id","fid");  // 根据已有的从服务器请求过来的线性数据转换为树形数据
        }
    },
    mutations: {
        init(state, payload) {
            state.userFuncs = payload; // actions中的函数对state中的数据进行修改时所需要借助的辅助函数
        },
        toggleTab(state, payload) {
            state.activeFuncKey = payload; //点击后进行状态激活的切换
        },
        addTab(state, payload){
            if(state.openFuncKeys.indexOf(payload) === -1) state.openFuncKeys.push(payload);//如果在打开的页面中没有这个tab则就渲染这个数据，就将点击对应的tab状态激活
            state.activeFuncKey = payload;
        },
        removeTab(state, payload) {
            const i = state.openFuncKeys.indexOf(payload);
            if(state.openFuncKeys.length === 1) state.activeFuncKey = "";// 当还有一个时，对其进行删除的操作就什么都不显示
            else if(i === state.openFuncKeys.length - 1) state.activeFuncKey = state.openFuncKeys[i - 1]; // 删的是最后一个的情况，显示最后一个
            else state.activeFuncKey = state.openFuncKeys[i + 1]; // 显示后面的紧靠着的一个tab

            state.openFuncKeys.splice(i, 1);
        }
    },
    actions: {
        async init({commit}) {
            // 携带token发送ajax请求当前登录的用户对应的可用的功能列表(线性/树形)
            // 线性数据
            const ajaxResult = await service({url: '/menu/list', method: "post"});
            commit("init", ajaxResult);                                    // 半闭loading效果
        }
    }
}