<template>
    <div class="cwgl">
        <el-tabs v-model="activeName">
            <el-tab-pane label="车位运营" name="first">
                <ClglCwyy></ClglCwyy>
            </el-tab-pane>
            <el-tab-pane label="车位档案" name="second">
                <ClglCwda></ClglCwda>
            </el-tab-pane>
        </el-tabs>
        

    </div>
</template>

<script>
import ClglCwyy from './Cwyy.vue'
import ClglCwda from './Cwda.vue'
    export default {
        name: "Cwgl-main",
        components: {ClglCwyy, ClglCwda},
        data() {
            return {
                activeName: 'first'
            }
        }
    }   
</script>

<style lang="scss" scoped>
.cwgl {
        background-color: #fff;
        padding: 20px 0;
        .el-tabs {
            padding-left: 20px;
        }
}
</style>
