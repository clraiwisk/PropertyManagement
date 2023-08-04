<template>
    <el-container>
        <el-header>
            <div class="header-left">
                <span>
                    <img src="" alt="">
                </span>

                <span>
                    智慧物业<span style="color: #33D5E9">管理系统</span>
                </span>
            </div>

            <div class="header-middle">
                物业管理
            </div>

            <div class="header-right">
                <el-select v-model="value" placeholder="请选择" style="width: 130px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>

                <i class="el-icon-bell"></i>

                <div style="display: flex; justify-content: space-between; align-items: center; width: 180px;">
                    <span>欢迎</span>
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                    <span v-text="user"></span>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <HomeMenu></HomeMenu>
            </el-aside>
            <el-container>
                <el-main>
                    <HomeTab></HomeTab>
                </el-main>

                <el-footer>
                    <span>
                        Copyright © XCZ, All Rights Reserved.<br>
                        Email : 668668668@qq.com  QQ: 668668668
                    </span>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import HomeTab from '@/pages/Home/HomeTab.vue';
import HomeMenu from '@/pages/Home/HomeMenu.vue';

export default {
    name: 'home-main',
    components: { HomeTab, HomeMenu },
    data() {
        return {
            options: [
                { value: '选项一', label: '智慧社区 I' }
            ],
            value: '智慧社区 I',
            user: sessionStorage.getItem('name'),
        };
    },
    created() {
        this.$store.dispatch("dashboard/init");
        console.log(this.user);
    }
}

</script>

<style lang="scss" scoped> 
.el-container {
     width: 100%;
     height: 100%;
     overflow: auto;

 }

 .el-header {
     background-color: #415C85;
     display: flex;
     justify-content: space-between;
     align-items: center;
 }

 .el-footer {
     background-color: #F2F2F2;
     color: #999;
     text-align: center;
     display: flex;
     align-items: center;
     justify-content: center;
 }

 .el-aside {
     background-color: #ffffff;
     color: #333;
     text-align: left;
     line-height: 200px;
 }

 .el-main {
     background-color: #ECF5FF;
     color: #333;
     text-align: center;
     line-height: 60px;
 }

 .header-left {
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
    filter: blur(0.6px) contrast(10);
 }

 .header-middle {
    font-size: 22px;
    color: #33D5E9;
}
 .header-right {
    width: 400px;
    display: flex;
    // flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    i {
        font-size: 28px;
        color: #ffffff;
    }
    span{ 
        font-size: 18px;
        color: #fff;
    }
    .el-select  {
        background-color: transparent;
    }
 }
</style>