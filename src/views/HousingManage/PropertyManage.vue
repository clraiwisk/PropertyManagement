<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <el-menu>
                    <div class="menu-header" :data="menuList">
                        <i class="el-icon-circle-plus" style="color: #0A92FA;"></i>
                        <i class="el-icon-office-building"></i>
                        <span>A区(一期)</span>
                    </div>
                    <el-menu-item v-for="item in list" :key="item.id">
                        <!-- <span slot="title" v-text="item.name"></span> -->
                    </el-menu-item>

                    <div class="menu-header">
                        <i class="el-icon-circle-plus" style="color: #0A92FA;"></i>
                        <i class="el-icon-office-building"></i>
                        <span>B区(二期)</span>
                    </div>
                    <el-menu-item v-for="item in list" :key="item.id">
                        <!-- <span slot="title" v-if="item.key === 1">公共区域</span>
                        <span slot="title" v-if="item.key === 2">01#</span>
                        <span slot="title" v-if="item.key === 3">02#</span>
                        <span slot="title" v-if="item.key === 4">03#</span> -->
                    </el-menu-item>
                </el-menu>
            </el-aside>


            <!-- 右侧 -->
            <el-main style="padding: 0 10px; box-sizing: border-box; text-align: left;">
                <el-button icon="el-icon-plus" type="primary" plain @click="beginAdd">新增房间</el-button>

                <el-table :data="menuList">
                    <el-table-column type="selection" width="60" align="center"></el-table-column>
                    <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                    <el-table-column prop="home" label="房间号" width="150" align="center"></el-table-column>

                    <el-table-column prop="floor" label="楼层" width="130" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.floor"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="unit" label="单元" width="180" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.unit"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="buildingName" label="楼栋" width="200" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.buildingName"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="name" label="小区名称" width="200" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.name"></span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" min-width="200" align="center">
                        <template slot-scope="{row}">
                            <el-button icon="el-icon-edit" type="warning" @click="beginUpdate(row.id)">修改</el-button>
                            <el-button icon="el-icon-delete" type="danger" @click="deleteHandler(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination align="left" :current-page="currentPage" :page-sizes="[3, 5, 8]"
                    :page-size.sync="search.pageSize" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                    @size-change="currentPage = 1" @current-change="value => currentPage = value">
                </el-pagination>
            </el-main>

            <el-dialog title="一房源编辑一" :visible="isEditing" width="500px" :show-close="false">
                <el-form label-width="70px" :model="model" status-icon ref="editForm">
                    <el-form-item label="房间号:" prop="home">
                        <el-input placeholder="请输入房间号.." v-model.trim="model.home"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层:" prop="floor">
                        <el-input placeholder="请输入楼层.." v-model.trim="model.floor"></el-input>
                    </el-form-item>
                    <el-form-item label="单元:" prop="unit">
                        <el-input placeholder="请输入单元号.." v-model.trim="model.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="小区名称:" label-width="72px">
                        <el-input placeholder="请输入小区名称.." v-model.trim="model.name"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button type="primary" plain @click="save">确定</el-button>
                    <el-button type="warning" plain @click="cancel">取消</el-button>
                </div>
            </el-dialog>

        </el-container>
    </div>
</template>

<script>
export default {
    name: "property-manage",
    data() {
        return {
            list: [],
            menuList: [],
            search: {
                name: "",
                home: "",
                floor: 0,
                buildingId: -1,
                housingStatus: -1,
                currentPage: 1,
                pageSize: 3
            },
            total: 0,
            model: {
                id: 0,
                name: "",
                home: "",
                floor: "",
                buildingId: -1,
                housingStatus: -1,
                currentPage: 1,
                pageSize: 3
            },
            isEditing: false,
        };
    },
    computed: {
        currentPage: {
            get() { return this.search.currentPage; },
            set(value) {
                this.search.currentPage = value;
                this.getData();
            }
        }
    },
    async created() {
        await this.getData();
    },
    methods: {
        async getData() {
            const { list, total } = await this.$api.propertyManage.menuList(this.search); // 这行才是核心模拟从服务器拿数据的请求
            this.menuList = list;
            this.total = total;
        },

        async deleteHandler(id) {
            await this.$confirm("真的要删除该数据吗？", "警告", { type: "success", });
            await this.$api.propertyManage.del(id);
            await this.getData();
            this.$message({ message: "删除成功！", type: "success" });
        },

        async beginUpdate(id) {
            this.model = await this.$api.propertyManage.getModel(id);             //拿到了要修改的回显的人
            this.$refs.editForm?.resetFields();             //表单重置，清除上一次的交互残留
            this.$nextTick(() => this.isEditing = true);    //在下一个vue的时间片去打开dialog, 进入新增状态
        },
        async save() {
            await this.$refs.editForm.validate();
            if (this.model.id === 0) {
                this.$api.propertyManage.add(this.model);
                this.currentPage = 1;       //触发调用getData()
            }
            else {
                this.$api.propertyManage.update(this.model);
                this.getData();             //保持当前页，更新数据
            }
            this.isEditing = false;     //关闭对话框，退出编辑状态
            this.$message({ message: "编辑成功..", type: "success" }); //提示用户，编辑用户
        },
        async cancel() {
            await this.$confirm("当前对话框未保存，确定退出?", "警告", { type: "warning" });
            this.isEditing = false;
        },
        beginAdd() {
            this.model = { id: 0, name: "", home: "", floor: "", buildingId: -1, housingStatus: -1, currentPage: 1, pageSize: 3 }; // 表单关联数据回到初始状态
            this.$refs.editForm?.resetFields();  // 将表单重置
            this.$nextTick(() => this.isEditing = true);  // 在下一个时间片打开dialoag
        },
    },
};
</script>


<style lang="scss" scoped>
.el-container {
    width: 100%;
    background-color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
}

.menu-header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin-left: 10px;

    i {
        font-size: 25px;
    }

    span {
        font-size: 18px;
        margin: 0 30px;
    }
}

.el-aside {
    height: 650px;
    border-right: 1px solid #ddd;
}
</style>