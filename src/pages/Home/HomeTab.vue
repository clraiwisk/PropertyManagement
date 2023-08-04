<template>
    <el-tabs :value="activeFuncKey" @tab-click="tabClickHandler" @tab-remove="tabRemoveHandler" type="card" closable>
        <el-tab-pane v-for="key in openFuncKeys" :key="key" :name="key"
            :label="userFuncs.find(item => item.key === key).title"> <!-- 就是将tab的title设置成想要显示的数据-->
            <!-- 这一步很重要 -->
            <component :is="AsyncComponentMap[key]"></component>
            <!-- 非常重要的一部分，关系到整个项目的生死 -->
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import{mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "home-tab",
        computed: {
            ...mapState("dashboard", ["userFuncs", "openFuncKeys", "activeFuncKey"]),
            ...mapGetters("dashboard", ["AsyncComponentMap"])
        },
        methods: {
            ...mapMutations("dashboard", ["toggleTab", "removeTab"]),
            tabClickHandler(tab) {this.toggleTab(tab.name)},
            tabRemoveHandler(name) {this.removeTab(name)}
        }
        
    }
</script>

<style>

</style>