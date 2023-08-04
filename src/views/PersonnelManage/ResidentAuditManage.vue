<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="已审核">
                <!-- 第一个选项卡面板：已审核的居民 -->
                <ResidentReviewed></ResidentReviewed>
            </el-tab-pane>
            <el-tab-pane label="待审核">
                <!-- 第二个选项卡面板：待审核的居民 -->
                
                <ResidentToReview></ResidentToReview>
            </el-tab-pane>

            <!-- 第三个选项卡面板：已驳回的居民 -->
            <el-tab-pane label="已驳回">
                <ResidentMoveout></ResidentMoveout>
            </el-tab-pane>

            <!-- 第四个选项卡面板：已迁出的居民 -->
            <el-tab-pane label="已迁出">
                <ResidentOverrule></ResidentOverrule>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ResidentReviewed from './ResidentReviewed.vue';
import ResidentToReview from './ResidentToReview.vue';
import ResidentMoveout from './ResidentMoveout.vue';
import ResidentOverrule from './ResidentOverrule.vue';

export default {
    name: "resident-auditManage",
    components: {ResidentReviewed, ResidentToReview, ResidentMoveout, ResidentOverrule}
}
</script>

<style lang="scss" scoped></style>