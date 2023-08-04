<template>
    <div class="cwgl">
        <el-form inline>
            <el-container>
                <el-header>
                    <el-form-item label="车位编号：" >
                        <el-input placeholder="请输入车位号" v-model.trim="search.number" @change="currentPage = 1" size="mini" :style="{ width: '120px'}"></el-input>
                    </el-form-item>
                    <el-form-item label="所属小区:">
                        <el-select v-model="search.community" @change="currentPage = 1" size="mini" :style="{ width: '80px'}">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="A区" value="A区"></el-option>
                            <el-option label="B区" value="B区"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车位类型:">
                        <el-select v-model="search.parkType" @change="currentPage = 1" size="mini" :style="{ width: '80px'}">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="地面" value="地面"></el-option>
                            <el-option label="地库" value="地库"></el-option>
                        </el-select>
                    </el-form-item>    
                    <el-form-item label="运营方式：">
                        <el-select v-model="search.operationalModes" @change="currentPage = 1" size="mini" :style="{ width: '80px'}">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="销售" value="销售"></el-option>
                            <el-option label="租赁" value="租赁"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button icon="el-icon-upload" type="danger" size="mini" @click="add">新增</el-button>
                        <el-button icon="el-icon-refresh" type="success" size="mini" @click="refresh">重置</el-button>
                        <el-button icon="el-icon-upload" type="danger" size="mini">导入</el-button>
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
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="车位号"  prop="number" align="center"></el-table-column>
            <el-table-column label="所属小区" prop="community" align="center"></el-table-column>
            <el-table-column label="类型" prop="parkType"></el-table-column>
            <el-table-column label="运营方式" prop="operationalModes" align="center"></el-table-column>
            <el-table-column label="运营状态" prop="operationalStatus" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="reviewTime" width="200"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="{row}">
                    <span @click="modelUpdate(row.id)" class="main">详情</span>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer :visible.sync="drawer" direction="rtl" :show-close="false" :with-header="false" size="30%">
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
                        <el-input v-model="model.number" size="mini" :style="{ width: '80px', height: '25px' }"></el-input>
                    </el-form-item>
                    <el-form-item label="所属小区:">
                        <el-select v-model="model.community" :style="{ width: '90px', height: '25px' }" size="mini">
                            <el-option label="A区" :value="0"></el-option>
                            <el-option label="B区" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型:">
                        <el-select v-model="model.parkType" :style="{ width: '90px', height: '25px' }" size="mini">
                            <el-option label="地面" :value="1"></el-option>
                            <el-option label="地库" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运营方式:">
                        <el-select v-model="model.operationalModes" :style="{ width: '90px', height: '25px' }" size="mini">
                            <el-option label="租赁" :value="0"></el-option>
                            <el-option label="销售" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核时间:">
                        <el-input v-model="model.reviewTime" size="mini" :style="{ width: '120px', height: '25px' }"></el-input>    
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
export default {
    name: "cwgl-cwda",
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
                    community: '全部',
                    parkType: '全部',
                    operationalModes: '全部',
                    reviewTime: "",
                    currentPage: 1,
                    pageSize: 10
                },
                total: 15,
                drawer: false,
                model: {}
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
            async getDate() {
                const { total, list } = await this.$api.ParkingManage.getList(this.search);
                this.total = total;
                this.list = list
            },
            refresh() {
                this.search= {
                    number: "",
                    community: '全部',
                    parkType: '全部',
                    operationalModes: '全部',
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
                if(this.model.id === 0) {
                    await this.$api.ParkingManage.add(this.model);
                    this.currentPage = 1
                } else {
                    this.list = await this.$api.ParkingManage.update(this.model);
                    this.getDate();
                }
                this.drawer = false;
                this.$message({message: "编辑成功！", type: "success"});
            },
            async add() {
                this.model= {
                    id: 0,
                    number: "",
                    community: 0,
                    parkType: 0,
                    operationalModes: 0,
                    reviewTime: "",
                }
                this.$nextTick(() => this.drawer = true);
            }
        }
    }
</script>

<style lang="scss" scoped>
.cwgl {
    background-color: #fff;
    padding: 20px 0;
    .el-form {
        text-align: left;
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