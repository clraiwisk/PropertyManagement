<!-- 组件的递归 -->
<template>
    <div>
        <template v-for="item in arr" >
            <el-menu-item :key="item.id" :index="item.key"  v-if="item.key">
                <i :class="item.classkey"></i>
                <span slot="title" v-text="item.title"></span>
            </el-menu-item>
            <el-submenu :key="item.id" :index="item.id.toString()" v-else >
                <template slot="title">
                    <i :class="item.classkey"></i>
                    <span slot="title" v-text="item.title"></span>
                </template>
                <!-- 自己调用自己，管你多少级全给你递归出来，无限级递归 -->
                <menu-content  v-if="item.children" :arr="item.children"></menu-content>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: "menu-content",
        props: ["arr"]
    };
</script>
