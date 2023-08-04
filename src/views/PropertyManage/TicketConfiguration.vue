<!-- 工单配置 -->
<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <el-menu @select="selectList" default-active="0">
                    <div class="menu-header">
                        <i class="el-icon-notebook-1"></i>
                        <span>工单大类</span>
                        <i class="el-icon-circle-plus" style="color: #0A92FA;"></i>
                    </div>
                    <el-menu-item v-for="item in list" :key="item.id" :index="item.key.toString()">
                        <span slot="title" v-text="item.name"></span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main style="padding: 0 10px; box-sizing: border-box; text-align: left;">
                <el-button icon="el-icon-plus" type="primary" plain @click="beginAdd">新增分类</el-button>

                <el-table :data="menuList">
                    <el-table-column type="selection" width="60" align="center"></el-table-column>
                    <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                    <el-table-column prop="name" label="二级工单分类" width="200" align="center"></el-table-column>

                    <el-table-column prop="area" label="关联区域" width="130" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.area"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="view" label="内容描述" width="180" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.view"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="Responsible" label="可派单责任人" width="250" align="center">
                        <template slot-scope="{row}">
                            <!-- <span :v-text="fixPeople(row.Responsible)"></span> -->
                            <span v-text="row.Responsible"></span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" min-width="300" align="center">
                        <template slot-scope="{row}">
                            <el-button icon="el-icon-edit" type="warning" @click="beginUpdata(row.id)">修改</el-button>
                            <el-button icon="el-icon-delete" type="danger"
                                @click="deleteHandler(row.id, row.fid)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <el-dialog align="left" title="—— 编辑列表 ——" :visible="isEditing" :show-close="false" width="700px"
                    style="top: -125px">

                    <el-form ref="editForm" label-width="150px" :model="model" :rules="rules" status-icon
                        class="demo-ruleForm">
                        <el-form-item label="工单名称：" prop="name">
                            <el-input style="width: 300px" placeholder="请输入名称..." v-model.trim="model.name"></el-input>
                        </el-form-item>
                        <!-- prop="name" -->
                        <el-form-item label="所属区域：" prop="area">
                            <el-input style="width: 300px" placeholder="请输入区域范围..." v-model.trim="model.area"></el-input>
                        </el-form-item>

                        <el-form-item label="内容描述：" prop="view">
                            <el-input style="width: 300px" placeholder="请输入鉴语..." v-model.trim="model.view"></el-input>
                        </el-form-item>

                        <el-form-item label="维修责任人：">
                            <el-select style="width: 300px" v-model="model.Responsible">
                                <el-option label="李先生" :value="0"></el-option>
                                <el-option label="赵先生" :value="1"></el-option>
                                <el-option label="王先生" :value="2"></el-option>
                                <el-option label="唐先生" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <div slot="footer">
                        <el-button type="primary" @click="save">确定</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "ticket-configuration",
    data() {
        return {
            list: [],
            menuList: [],
            isEditing: false,
            model: { 
                id: 0, 
                fid: 0, 
                name: "", 
                view: "", // 鉴评
                area: "", // 区域
                Responsible: "" // 负责人
            },
            activedFid: 0,
            rules: {
                name: [
                    { required: true, message: "* 姓名不能为空..", trigger: "blur" },
                    { min: 2, max: 20, message: "* 姓名长度为2~20", trigger: "blur" }
                ],
                area: [
                    { required: true, message: "* 区域不能为空..", trigger: "blur" },
                    { min: 2, max: 20, message: "* 区域长度为2~20", trigger: "blur" }
                ],
                view: [
                    { required: true, message: "* 鉴评不能为空..", trigger: "blur" },
                    { min: 2, max: 20, message: "* 鉴评长度为2~20", trigger: "blur" }
                ]
            },
        };
    },
    // 组件创建时调用
    async created() {
        // 从服务器获取数据列表
        this.list = await this.$api.ticketConfiguration.list();
        // 将数据列表中的数字转换为对应的中文字符
        this.list = await this.$api.ticketConfiguration.listNumToString({ data: this.list });
        // 获取菜单列表
        this.menuList = await this.$api.ticketConfiguration.menuList(0);
        // 将菜单列表中的数字转换为对应的中文字符
        this.menuList = await this.$api.ticketConfiguration.menuNumToString({ data: this.menuList });
    },
    // 选择菜单列表的处理函数
    methods: {
        // async fixPeople(id) {
        //     console.log( await this.$api.ticketConfiguration.stutas(id));
        //     return await this.$api.ticketConfiguration.stutas(id);
        // },

        // 根据选中的父ID获取子菜单列表
        async selectList(index) {
            // 设置当前选中的父ID
            
            this.activedFid = index;
            this.menuList = await this.$api.ticketConfiguration.menuList(index);
            // 将子菜单列表中的数字转换为对应的中文字符
            this.menuList = await this.$api.ticketConfiguration.menuNumToString({ data: this.menuList });
        },
        // 删除数据的处理函数
        async deleteHandler(id, fid) { // 删除所点的数据
            await this.$confirm("真的要删除该数据吗？", "警告", "success");
            // 向服务器发送删除请求
            await this.$api.ticketConfiguration.del(id);
            // 根据父ID获取更新后的子菜单列表
            this.menuList = await this.$api.ticketConfiguration.menuList(fid);
            this.$message({ message: "删除成功！", type: "success" });
        },
        // 开始编辑数据的处理函数
        async beginUpdata(id) {
            // 开始编辑数据的处理函数
            this.model = await this.$api.ticketConfiguration.getModel(id) // 回显数据
            this.$refs.editForm?.resetFields(); // 将表单重置
            this.$nextTick(() => this.isEditing = true);  // 在下一个时间片打开dialoag
        },
        // 取消编辑的处理函数
        async cancel() {
            await this.$confirm("数据未保存，确定要退出吗？", "警告", { type: "warning" });
            this.isEditing = false;
        },
        async save() {
            await this.$refs.editForm.validate();
            // 将当前选中的父ID赋值给数据对象的fid属性
            this.model.fid = parseInt(this.activedFid);
            if (this.model.id === 0) {
                // 向服务器发送新增数据请求
                await this.$api.ticketConfiguration.add(this.model);
            } else {
                // 向服务器发送更新数据请求
                await this.$api.ticketConfiguration.update(this.model);
            }
            // 根据父ID获取更新后的子菜单列表
            this.menuList = await this.$api.ticketConfiguration.menuList(this.activedFid);
            // 将子菜单列表中的数字转换为对应的中文字符
            this.menuList = await this.$api.ticketConfiguration.menuNumToString({ data: this.menuList });
            this.isEditing = false;
            this.$message({ message: "编辑成功！", type: "success" });
        },
        beginAdd() {
            // 表单关联数据回到初始状态
            this.model = { id: 0, fid: 0, name: "", view: "", area: "", Responsible: "" }; // 表单关联数据回到初始状态
            this.$refs.editForm?.resetFields();  // 将表单重置
            this.$nextTick(() => this.isEditing = true);  // 在下一个时间片打开dialoag
        },
    }
}
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

.el-form {
    // border-bottom: 1px solid #999;
    // position: relative;

    span.headerline {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: -15px;
        right: 3%;
        z-index: 1;
        height: 30px;
        font-weight: bold;
        color: #b0deff;
        background-color: #fff;
        cursor: pointer;
    }
}
</style>
