<template>
    <el-menu @select="addTab" :default-active="activeFuncKey">  <!--将addTab直接调用vuex仓库中的函数，这里回自己将index当成参数-->

        <menu-content :arr="menuData"></menu-content>

    </el-menu>
</template>

<script>
    import MenuContent from './MenuContent.vue';
    import{mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "home-menu",
        components: {MenuContent},
        computed: {
            ...mapState("dashboard", ["activeFuncKey"]),
            ...mapGetters("dashboard", ["menuData"])
        },
        methods: {
            ...mapMutations("dashboard", ["addTab"])
        }

    }
</script>

<style>

</style>