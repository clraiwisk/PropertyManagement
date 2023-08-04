<template>
    <div class="cwgl">
        <el-form inline>
            <el-container>
                <el-header style="height: 40px;">
                    <el-form-item label="车位编号：" >
                        <el-input placeholder="请输入车位号" v-model.trim="search.number" @change="currentPage = 1" size="mini" :style="{ width: '120px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名：">
                        <el-input placeholder="请输入用户名" v-model.trim="search.userName" @change="currentPage = 1" size="mini" :style="{ width: '120px'}"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话：">
                        <el-input placeholder="请输入用户电话" v-model.trim="search.userPhone" @change="currentPage = 1" size="mini" :style="{ width: '120px'}"></el-input>
                    </el-form-item>
                    <el-form-item label="运营方式：">
                        <el-select v-model="search.operationalModes" @change="currentPage = 1" size="mini" :style="{ width: '80px'}">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="销售" value="销售"></el-option>
                            <el-option label="租赁" value="租赁"></el-option>
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
                <el-main v-show="show" style="height: 40px;">
                    <span class="block">认证时间:</span>
                    <el-date-picker
                    v-model="search.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="年/月/日"
                    end-placeholder="年/月/日" size="mini" @change="currentPage === 1">
                    </el-date-picker>
                </el-main>
                <el-footer style="height: 40px">
                    <el-form-item>
                        <el-button icon="el-icon-arrow-down" type="success" size="mini" @click="show = true" v-if="show === false"></el-button>
                        <el-button icon="el-icon-arrow-up" type="success" size="mini" @click="show = false" v-else></el-button>  
                    </el-form-item>
                </el-footer>  
            </el-container>
        </el-form>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="车位号"  prop="number" width="100"></el-table-column>
            <el-table-column label="所属小区" prop="community" width="100" align="center"></el-table-column>
            <el-table-column label="类型" prop="parkType" width="100"></el-table-column>
            <el-table-column label="运营方式" prop="operationalModes" width="120" align="center"></el-table-column>
            <el-table-column label="运营状态" prop="operationalStatus" width="120" align="center"></el-table-column>
            <el-table-column label="用户名" prop="userName" width="200" align="center"></el-table-column>
            <el-table-column label="用户电话" prop="userPhone" width="160"></el-table-column>
            <el-table-column label="审核时间" prop="reviewTime" width="200"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="{row}">
                    <span @click="modelUpdate(row.id)" class="main">详情</span>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer :visible.sync="drawer" direction="rtl" :show-close="false" size="30%">
            <div class="drawer">
                <el-form>
                    <el-form-item style="text-align: right; padding-right: 40px;">
                        <el-button @click="drawer = false">返回</el-button>
                        <el-button @click="save">保存</el-button>   
                    </el-form-item>
                    <el-form-item label="序号:">
                        <span v-text="model.id"></span>
                    </el-form-item>
                    <el-form-item label="车位号:">
                        <span v-text="model.number"></span>
                    </el-form-item>
                    <el-form-item label="类型:">
                        <span v-text="model.parkType"></span>
                    </el-form-item>
                    <el-form-item label="运营模式:">
                        <span v-text="model.operationalModes"></span>
                    </el-form-item>
                    <el-form-item label="运营状态:">
                        <el-select v-model="model.operationalStatus" :style="{ width: '90px', height: '25px' }" size="mini">
                            <el-option label="正常" :value="0"></el-option>
                            <el-option label="待租" :value="1"></el-option>
                            <el-option label="维修中" :value="2"></el-option>
                            <el-option label="待售" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户名:">
                        <el-input v-model="model.userName" size="mini" :style="{ width: '60px', height: '25px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话:">
                        <el-input v-model="model.userPhone" size="mini" :style="{ width: '120px', height: '25px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期:">
                        <el-input size="mini" :style="{ width: '100px', height: '25px' }" v-model="block.oldDate"></el-input>
                        至
                        <el-input size="mini" :style="{ width: '100px', height: '25px' }" v-model="block.newDate"></el-input>    
                    </el-form-item>
                    <el-form-item label="审核时间:">
                        <span v-text="model.reviewTime"></span>
                    </el-form-item>
                </el-form>
            </div> 
        </el-drawer>

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
        name: "cwgl-cwyy",
        data() {
            return {
                block: {
                    oldDate: "2021/06/30",
                    newDate: "2022/06/30"
                },
                show: false,
                list: [],
                search: {
                    number: "",
                    userPhone: "",
                    userName: "",
                    operationalModes: "全部",
                    reviewTime: "",
                    currentPage: 1,
                    pageSize: 10
                },
                total: 15,
                drawer: false,
                model: {},
                title: "车位运营",
                DetailForm: []
            }
        },
        computed: {
            ...mapState("parkingManage", ["json_fields"]),
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
                const { total, list } = await this.$api.ParkingManage.getData(this.search);
                this.total = total;
                this.list = list
            },
            refresh() {
                this.search= {
                    number: "",
                    userPhone: "",
                    userName: "",
                    operationalModes: "全部",
                    reviewTime: "",
                    currentPage: 1,
                    pageSize: 10
                }
                this.currentPage = 1
            },
            async modelUpdate(id) {
                this.model = await this.$api.ParkingManage.getModel(id);
                this.drawer = true; 
            },
            async save() {
                this.list = await this.$api.ParkingManage.update(this.model);
                this.drawer = false;
                this.getDate();
            }
        }
    }
</script>

<style lang="scss" scoped>
.cwgl {
    background-color: #fff;
    .el-form {
        text-align: left;
        .el-header {
            height: 40px;
            padding: 0;
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
                padding: 0;
                .el-button {
                    border-radius: 10px;
                    width: 80px;
                }
            }
                
        }
        .el-main {
            padding: 0;
            padding-top: 10px;
            line-height: 0;
            span {
                font-size: 14px;
                padding-right: 10px;
            }
        }
    }
    .el-table {
        .el-table-column {
            padding-left: 20px;
        }
    }
        
}
.main {
    text-decoration: underline;
    color: blue;
    font-size: 14px;
}
.drawer {
    padding: 20px;
    .el-form {
        .el-form-item {
            height: 30px;
            margin-bottom: 10px;
        }
    }
}
</style>