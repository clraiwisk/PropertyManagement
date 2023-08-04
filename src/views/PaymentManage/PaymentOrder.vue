<template>
    <div class="djdd">
        <el-form inline>
            <el-container>
                <el-header>
                    <el-form-item label="账单编号：">
                        <el-input placeholder="请输入账单编号..." v-model.trim="search.billNumber" @change="currentPage = 1" size="mini" :style="{ width: '120px', height: '25px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="所属房屋：">
                        <el-input placeholder="请输入房屋地址..." v-model.trim="search.ownedHouse" @change="currentPage = 1" size="mini" :style="{ width: '120px', height: '25px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="账单类型：">
                        <el-select v-model="search.billtype" @change="currentPage = 1" size="mini" :style="{ width: '80px', height: '25px' }">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="代缴电费" value="代缴电费"></el-option>
                            <el-option label="代缴水费" value="代缴水费"></el-option>
                            <el-option label="车位管理费" value="车位管理费"></el-option>
                            <el-option label="物业费" value="物业费"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付状态：">
                        <el-select v-model="search.paymentStatus" @change="currentPage = 1" size="mini" :style="{ width: '80px', height: '25px' }">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="已支付" value="已支付"></el-option>
                            <el-option label="未支付" value="未支付"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button icon="el-icon-refresh" type="success" size="mini" @click="refresh">重置</el-button>
                        <download-excel class="export-excel-wrapper"
                            :data="DetailForm"
                            :fields="json_fields"
                            :header="title"
                            name="data.xls">
                            <el-button icon="el-icon-upload" type="danger" size="mini">导出</el-button>
                        </download-excel>
                    </el-form-item>
                </el-header>
                <el-main v-show="show">
                    <span class="block">认证时间:</span>
                    <el-date-picker
                    v-model="search.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="年/月/日"
                    end-placeholder="年/月/日" size="mini" @change="currentPage === 1">
                    </el-date-picker>
                </el-main>
                <el-footer>
                    <el-form-item>
                        <el-button icon="el-icon-arrow-down" type="success" size="mini" @click="show = true" v-if="show === false"></el-button>
                        <el-button icon="el-icon-arrow-up" type="success" size="mini" @click="show = false" v-else></el-button>  
                    </el-form-item>
                </el-footer>  
            </el-container>
        </el-form>
        <el-table :data="list" >
            <el-table-column label="流水号" sortable prop="serial" ></el-table-column>
            <el-table-column label="账号编号" prop="billNumber"></el-table-column>
            <el-table-column label="所属房屋" prop="ownedHouse" width="200px"></el-table-column>
            <el-table-column label="账单类目" prop="billtype" width="120px"></el-table-column>
            <el-table-column label="实收金额" prop="amount"></el-table-column>
            <el-table-column label="缴费时间" prop="time"></el-table-column>
            <el-table-column label="帐单状态" prop="paymentStatus" width="100px"></el-table-column>
            <el-table-column label="支付方式">
                <span class="main">详情</span>
            </el-table-column>
        </el-table>

        <el-pagination
            align="left"
            :current-page="search.currentPage"
            :page-sizes="[5,10,15]"
            :page-size.sync="search.pageSize"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @size-change="currentPage = 1"
            @current-change="value => currentPage = value">
        </el-pagination>

    </div>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        name: "Djdd-main",
        data() {
            return {
                show: false,
                list: [],
                search: {
                    billNumber: "",
                    ownedHouse: "",
                    billtype: "全部",
                    paymentStatus: "全部",
                    time: "",
                    currentPage: 1,
                    pageSize: 10
                },
                total: 15,
                title: "缴费订单",
                DetailForm: []
            }
        },
        computed: {
            ...mapState("paymentOrder", ["json_fields"]),
            currentPage: {
                get() {return this.search.currentPage},
                set(value) {
                    this.search.currentPage = value;
                    this.getDate();
                }
            }
        },
        created() {this.currentPage = 1},
        methods: {
            async getDate() {
                const { total, list } = await this.$api.PaymentManage.getList(this.search);
                this.total = total;
                this.list = list
                this.DetailForm = this.list;
            },
            refresh() {
                this.search= {
                    billNumber: "",
                    ownedHouse: "",
                    billtype: "全部",
                    paymentStatus: "全部",
                    time: "",
                    currentPage: 1,
                    pageSize: 10
                }
                this.currentPage = 1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .djdd {
        background-color: #fff;
        padding: 20px 0;
        .el-form {
            text-align: left;
            padding: 0 10px;
            .el-header {
                height: 40px;
                .el-form-item {
                    font-size: 12px;
                    line-height: 0;
                    padding-right: 40px;
                    margin: 0;
                    .el-form-item__label {
                        vertical-align: middle;
                        width: 40px;
                        font-size: 12px;
                        padding: 0;
                    }
                    .el-input {
                        width: 120px;
                        height: 25px;
                        font-size: 12px;
                    }
                }
            }
            .el-footer {
                text-align: center; 
                padding: 0 20px;
                border-bottom: 1px solid black;
                .el-form-item {
                    line-height: 0; 
                    padding-top: 20px;
                    margin: 0;
                    .el-button {
                        border-radius: 10px;
                        width: 80px;
                    }
                }
                    
            }
            .el-main {
                padding: 0 20px;
                span {
                    font-size: 14px;
                    padding-right: 10px;
                }
            }
            .el-picker-panel__content {
                width: 300px;
                height: 260px;
            }
        }
    }
    .main {
        text-decoration: underline;
        color: blue;
        font-size: 14px;
    }
</style>