<template>
    <div class="cwgl">
        <el-form inline>
            <el-container>
                <el-header style="height: 40px">
                    <el-form-item label="车牌号：" >
                        <el-input placeholder="请输入车牌号" v-model.trim="search.numberPlate" @change="currentPage = 1" size="mini" :style="{ width: '120px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名：">
                        <el-input placeholder="请输入用户名" v-model.trim="search.userName" @change="currentPage = 1" size="mini" :style="{ width: '120px'}"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话：">
                        <el-input placeholder="请输入用户电话" v-model.trim="search.userPhone" @change="currentPage = 1" size="mini" :style="{ width: '120px'}"></el-input>
                    </el-form-item>
                    <el-form-item label="运营方式：">
                        <el-select v-model="search.vehicleStatus" @change="currentPage = 1" size="mini" :style="{ width: '80px'}">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="正常" value="正常"></el-option>
                            <el-option label="失效" value="失效"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button icon="el-icon-upload" type="danger" size="mini" @click="add">新增</el-button>
                        <el-button icon="el-icon-refresh" type="success" size="mini" @click="refresh">重置</el-button>
                        <el-button icon="el-icon-upload" type="danger" size="mini">导入</el-button>
                    </el-form-item>
                </el-header>
                <el-main v-show="show" style="height: 40px">
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
            <el-table-column label="车牌号"  prop="numberPlate" align="center"></el-table-column>
            <el-table-column label="用户姓名" prop="userName" align="center"></el-table-column>
            <el-table-column label="用户电话" prop="userPhone"></el-table-column>
            <el-table-column label="状态" prop="vehicleStatus" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="reviewTime" width="200"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="{row}">
                    <span @click="modelUpdate(row.id)" class="main">编辑</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="vehic">
            <el-dialog :visible.sync="dialog" :show-close="false" title="用户车辆管理">
                <el-form>
                    <el-form-item>
                        <el-input v-model="model.userName" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>用户名:</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="model.userPhone" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>用户电话:</span> 
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="park">运营方式：</span>
                        <el-select v-model="search.vehicleStatus" size="mini">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="正常" value="正常"></el-option>
                            <el-option label="失效" value="失效"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="model.numberPlate" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>车牌号:</span> 
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="model.number" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>车位号:</span> 
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="model.community" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>所属区域:</span> 
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="model.operationalModes" size="mini" style="width: 400px;">
                            <template slot="prepend">
                                <span>运营模式:</span> 
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="save" type="success">保存</el-button>
                        <el-button @click="cancel" type="danger">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
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
export default {
    name: "VehicleManage",
    data() {
        return {
            block: {
                oldDate: "2021/06/30",
                newDate: "2022/06/30"
            },
            show: false,
            list: [],
            search: {
                numberPlate: "",
                userPhone: "",
                userName: "",
                vehicleStatus: "全部",
                reviewTime: "",
                currentPage: 1,
                pageSize: 10
            },
            total: 15,
            dialog: false,
            model: {},
            input: false,
        }
    },
    computed: {
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
        cancel() {
            this.dialog = false;
        },
        async getDate() {
            const { total, list } = await this.$api.ParkingManage.vehic(this.search);
            this.total = total;
            this.list = list
        },
        refresh() {
            this.search= {
                numberPlate: "",
                userPhone: "",
                userName: "",
                vehicleStatus: "全部",
                reviewTime: "",
                currentPage: 1,
                pageSize: 10
            }
            this.currentPage = 1
        },
        async modelUpdate(id) {
            this.model = await this.$api.ParkingManage.getModel(id);
            this.dialog = true; 
        },
        async save() {
            if(this.model.id === 0) {
                await this.$api.ParkingManage.add(this.model);
                this.currentPage = 1
            } else {
                this.list = await this.$api.ParkingManage.update(this.model);
                this.getDate();
            }
            this.dialog = false;
            this.$message({message: "编辑成功！", type: "success"});
        },
        async add() {
            this.model= {
                id: 0,
                numberPlate: "",
                userPhone: "",
                userName: "",
                vehicleStatus: "全部",
                reviewTime: "",
                currentPage: 1,
                pageSize: 10
            }
            this.$nextTick(() => {
                this.dialog = true;
                this.input = !this.input
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.cwgl {
    background-color: #fff;
    padding: 10px 0;
    .el-form {
        text-align: left;
        padding: 10px;
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

.vehic {
    .el-dialog {
        padding: 0;
        .el-dialog__body {
            padding: 0;
            .el-form {
                font-size: 12px;
                box-sizing: content-box;
                text-align: center;
                padding: 0;
                .el-form-item {
                    font-size: 12px;
                    span {
                        display: inline-block;
                        width: 100px;
                    }
                }
            }
        } 
    }
    .park {
        margin-left: -96px;
        border: 1px solid #DCDFE6 ;
        font-size: 12px;
        border-radius: 5px;
        background-color: #F5F7FA;
        color: #909399;
    }
}
</style>