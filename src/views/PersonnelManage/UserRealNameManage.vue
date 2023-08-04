<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="已审核">
                <UserRealNameReviewed></UserRealNameReviewed>
            </el-tab-pane>
            <el-tab-pane label="待审核">
                <UserRealNameToReview></UserRealNameToReview>
            </el-tab-pane>
            <el-tab-pane label="已驳回">
                <UserRealNameOverrule></UserRealNameOverrule>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UserRealNameOverrule from './UserRealNameOverrule.vue';
import UserRealNameReviewed from './UserRealNameReviewed.vue';
import UserRealNameToReview from './UserRealNameToReview.vue';

export default {
    name: "userreal-name",
    components: {UserRealNameOverrule, UserRealNameReviewed, UserRealNameToReview}
}
</script>

<style lang="scss" scoped></style>