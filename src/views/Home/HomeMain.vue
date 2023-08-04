<template>
    <div>
        <div class="home-container">
            <div class="home-top">
                <div class="top-left">
                    <div class="top-left-top">
                        <span
                            style="background-color: #CFEAFE; color: #0A92FA; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="el-icon-office-building"></i>
                        </span>
                        <span></span>
                        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                            <span v-text="totalList[0]"></span>
                            <span>房屋总数</span>
                        </span>
                    </div>
                    <div class="top-left-bottom">
                        <span
                            style="background-color: #FDE7CD; color: #F58700; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="el-icon-truck"></i>
                        </span>
                        <span></span>
                        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                            <span v-text="totalList[2]"></span>
                            <span>车辆总数</span>
                        </span>
                    </div>
                </div>

                <div class="top-middle">
                    <div class="middle-left-top">
                        <span
                            style="background-color: #D5F6FB; color: #33D5E9; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="el-icon-s-custom"></i>
                        </span>
                        <span></span>
                        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                            <span v-text="totalList[1]"></span>
                            <span>住户人数</span>
                        </span>
                    </div>
                    <div class="middle-left-bottom">
                        <span
                            style="background-color: #cffee9; color: #0afa7e; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="el-icon-star-off"></i>
                        </span>
                        <span></span>
                        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                            <span v-text="totalList[3]"></span>
                            <span>维修人数</span>
                        </span>
                    </div>
                </div>

                <div class="top-right" style="padding: 0 10px; box-sizing: border-box;">
                    <span class="right-title" @click="refrech"
                        style="display: flex; align-items: center; justify-content: space-between; height: 50px;">
                        <span>代办事务</span>
                        <i class="el-icon-refresh-right" style="font-size: 30px;"></i>
                    </span>
                    <ul>
                        <li>
                            <span>住户审核管理</span>
                            <span v-text="totalList[4]"></span>
                        </li>
                        <li>
                            <span>住户认证审核</span>
                            <span v-text="totalList[5]"></span>
                        </li>
                        <li>
                            <span>待分配工单</span>
                            <span v-text="totalList[6]"></span>
                        </li>
                        <li>
                            <span>待接工单数</span>
                            <span v-text="totalList[7]"></span>
                        </li>
                        <li>
                            <span>已完成工单数</span>
                            <span v-text="totalList[8]"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="home-bar">
                <Bar></Bar>
            </div>

            <div class="home-pie">
                <Pie></Pie>
            </div>
        </div>
    </div>
</template>

<script>
import Pie from '@/views/Graph/Pie.vue';
import Bar from '@/views/Graph/Bar.vue';

export default {
    name: "home-main",
    components: { Pie, Bar },
    data() {
        return {
            totalList: [],
        };
    },
    async created() {
        this.totalList = await this.$api.homeMain.total();
    },
    methods: {
        async refrech() {
            this.totalList = await this.$api.homeMain.total();

        }
    }

}
</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 690px;
    overflow: auto;

    .home-top {
        height: 400px;
        display: flex;
        justify-content: space-between;

        .top-left,
        .top-middle {
            width: 36%;
            height: 100%;
        }

        .top-left,
        .top-middle {
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            div {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                height: calc(96% / 2);
                background-color: #fff;
                width: 100%;

                i {
                    font-size: 90px;
                }

                span {
                    font-size: 22px;
                    color: #666;
                    line-height: 30px;
                }
            }
        }
    }

    .top-right {
        background-color: #fff;
        width: 26%;

        .right-title {
            line-height: 30px;
            font-size: 20px;
            font-weight: 600;
            color: #666;
        }

        ul {
            line-height: 50px;
            list-style: none;
            display: flex;
            flex-direction: column;

            li {
                font-size: 18px;
                font-weight: 600;
                color: #666;
                display: flex;
                justify-content: space-between;
                padding: 0 30px;
                box-sizing: border-box;
                margin: 8px 0;
                border-radius: 10px;
                background-color: #E7F4FF;
            }

            li:hover {
                background-color: #0A92FA;
            }
        }
    }

    .home-bar,
    .home-pie {
        margin-top: 20px;
        background-color: #fff;
    }
}</style>