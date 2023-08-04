<!-- 待审核 -->

<template>
    <div style="position: relative;">
        <el-form inline align="left" class="formlist" style="position: relative; border-bottom: 1px solid #999;">
            <el-header>

                <el-form-item label="住户姓名：" class="divlist">
                    <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.name"
                        @change="currentPage = 1">
                    </el-input>
                </el-form-item>

                <el-form-item label="住户电话：">
                    <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.tel"
                        @change="currentPage = 1">
                    </el-input>
                </el-form-item>

                <el-form-item label="住户类型：">
                    <el-select v-model="search.idType" @change="currentPage = 1">
                        <el-option label="- 全部户主 -" :value="-1"></el-option>
                        <el-option label="业主" :value="0"></el-option>
                        <el-option label="租户" :value="1"></el-option>
                        <el-option label="快递" :value="2"></el-option>
                        <el-option label="公职人员" :value="3"></el-option>
                        <el-option label="物业员工" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 200px;">
                    <el-button icon="el-icon-refresh-right" type="success" @click="refresh">刷新</el-button>
                    <el-button icon="el-icon-delete" type="danger" :disabled="selectIds.length === 0"
                        @click="BulkDeleteHandler">批量删除</el-button>
                    <download-excel class="export-excel-wrapper" :data="DetailForm" :fields="json_fields" :header="title"
                        name="data.xls" style="display: inline-block; margin-left:10px">
                        <el-button type="success">导出Excel</el-button>
                    </download-excel>
                </el-form-item>

            </el-header>
            <el-main v-show="show">
                <el-form-item label="住户地址：">
                    <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.adds"
                        @change="currentPage = 1">
                    </el-input>
                </el-form-item>
                <el-form-item label="提交时间：">
                    <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.time"
                        @change="currentPage = 1">
                    </el-input>
                </el-form-item>
            </el-main>
            <span @click="show = !show" class="headerline">
                <span>更多功能</span>
                <i v-show="!show" class="el-icon-arrow-up"></i>
                <i v-show="show" class="el-icon-arrow-down"></i>
            </span>
        </el-form>




        <el-table :data="list" @selection-change="selectionChangeHandler">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>

            <el-table-column prop="tel" label="电话" width="130" align="center">
                <template slot-scope="{row}">
                    <span v-text="row.tel"></span>
                </template>
            </el-table-column>

            <el-table-column prop="sex" label="性别" width="70" align="center">
                <template slot-scope="{row}">
                    <el-tag v-if="row.sex === '男'" v-text="row.sex"></el-tag>
                    <el-tag v-else type="danger" v-text="row.sex"></el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="adds" label="住址（房屋）" width="180" align="center">
                <template slot-scope="{row}">
                    <span v-text="row.adds"></span>
                </template>
            </el-table-column>

            <el-table-column prop="idCard" label="身份证号" width="250" align="center">
                <template slot-scope="{row}">
                    <span v-text="row.idCard"></span>
                </template>
            </el-table-column>

            <el-table-column prop="idType" label="住户类型" width="120" align="center">
                <template slot-scope="{row}">
                    <span v-text="row.idType"></span>
                </template>
            </el-table-column>

            <el-table-column prop="time" label="提交时间" width="200" align="center">
                <template slot-scope="{row}">
                    <span v-text="row.time"></span>
                </template>
            </el-table-column>

            <el-table-column label="操作" min-width="300" align="center">
                <template slot-scope="{row}">
                    <el-button icon="el-icon-edit" type="warning" @click="beginUpdata(row.id)">修改</el-button>
                    <el-button icon="el-icon-delete" type="danger" @click="deleteHandler(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog align="left" title="—— 编辑列表 ——" :visible="isEditing" :show-close="false" width="700px" style="top: -125px">

            <el-form ref="editForm" label-width="150px" :model="model" :rules="rules" status-icon>
                <el-form-item label="住户姓名：" prop="name">
                    <el-input style="width: 300px" placeholder="请输入姓名..." v-model.trim="model.name"></el-input>
                </el-form-item>
                <!-- prop="name" -->
                <el-form-item label="住户电话：" prop="tel">
                    <el-input style="width: 300px" placeholder="请输入电话..." v-model.trim="model.tel"></el-input>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-radio-group v-model="model.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="住户类型：">
                    <el-select style="width: 300px" v-model="model.idType">
                        <el-option label="- 全部户主 -" :value="-1"></el-option>
                        <el-option label="业主" :value="0"></el-option>
                        <el-option label="租户" :value="1"></el-option>
                        <el-option label="快递" :value="2"></el-option>
                        <el-option label="公职人员" :value="3"></el-option>
                        <el-option label="物业员工" :value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="住户地址：" prop="adds">
                    <el-input style="width: 300px" placeholder="请输入地址信息..." v-model.trim="model.adds"></el-input>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idCard">
                    <el-input style="width: 300px" placeholder="请输入证件信息..." v-model.trim="model.idCard"></el-input>
                </el-form-item>

                <el-form-item label="有效期：" prop="vPeriod">
                    <el-input style="width: 300px" placeholder="请输入住宿时间..." v-model.trim="model.vPeriod"></el-input>
                </el-form-item>

                <el-form-item label="认证状态">
                    <el-select style="width: 300px" v-model="model.approvalStatus">
                        <el-option label="已审核" :value="0"></el-option>
                        <el-option label="待审核" :value="1"></el-option>
                        <el-option label="已驳回" :value="2"></el-option>
                        <el-option label="已迁出" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="提交时间：">
                    <el-input style="width: 300px" placeholder="请输入认证时间信息..." v-model.trim="model.time"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button type="warning" @click="back">驳回</el-button>
                <el-button type="primary" @click="save">通过</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>

        <el-pagination align="left" :current-page="currentPage" :page-sizes="[3, 5, 8, 10, 12]"
            :page-size.sync="search.pageSize" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
            @size-change="currentPage = 1" @current-change="value => currentPage = value">
        </el-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "resident-toreview",
    data() {
        return {
            list: [],
            total: 7,
            show: false,
            model: { id: 0, name: "", tel: "", sex: -1, adds: "", idCard: "", idType: -1, time: "", img: "", vPeriod: "", approvalStatus: 0, conType: 0 },
            isEditing: false,
            selectIds: [],
            DetailForm: []
            // 导出excel表格的代码---end
        };
    },
    computed: {
        // 从vuex中获取数据，用于搜索和表单验证
        ...mapState("residentReviewed", ["drawer", "search", "rules", "title", "json_fields"]),
        currentPage: {
            // 获取当前页码
            get() { return this.search.currentPage; },
            set(value) {
                this.search.currentPage = value;
                this.getData();
            }
        }
    },
    created() { this.currentPage = 1; },
    methods: {
        selectionChangeHandler(selectRows) {
            // 把所有选中行的id收缩成一个数组后， 赋值给selectIds
            this.selectIds = selectRows.reduce((ids, row) => { ids.push(row.id); return ids }, []);
        },
        async getData() { //重新获取数据
            const { list, total } = await this.$api.personnelManage.toreview(this.search); // 这行才是核心模拟从服务器拿数据的请求
            this.list = list;// 更新居民列表数据
            this.total = total;// 更新总数据条数
            this.list = await this.$api.personnelManage.numToString({data: this.list});
            this.DetailForm = this.list;
        },
        // 驳回申请
        async back() {
            await this.$confirm("您真的要将该申请驳回吗？", "警告", { type: "warning" });
            // 调用接口将申请驳回
            await this.$api.personnelManage.back(this.model.id);
            this.getData();
            this.isEditing = false;
        },
        // 删除所选的居民数据
        async deleteHandler(id) { // 删除所点的数据
            await this.$confirm("真的要删除该数据吗？", "警告", "success");
            await this.$api.personnelManage.del(id);
            this.getData();
            this.$message({ message: "删除成功！", type: "success" });
        },
        // 批量删除选中的居民数据
        async BulkDeleteHandler() { // 批量删除数据
            await this.$confirm("真的要删除这些数据吗？", "警告", "success");
            await this.$api.personnelManage.bulkdelete({ ids: this.selectIds });
            this.getData();  // 根据当前的条件重新获取数据
            this.$message({ message: "删除成功！", type: "success" });
        },
        // 取消编辑对话框
        async cancel() {
            await this.$confirm("数据未保存，确定要退出吗？", "警告", { type: "warning" });
            this.isEditing = false;
        },
        refresh() {
            this.getData();
        },
        // 打开编辑对话框并回显数据
        async beginUpdata(id) {
            // 获取要编辑的数据，并赋值给model对象
            this.model = await this.$api.personnelManage.getModel(id) // 回显数据
            this.$refs.editForm?.resetFields(); // 将表单重置
            this.$nextTick(() => this.isEditing = true);  // 在下一个时间片打开dialoag
        },
        // 保存编辑后的数据
        async save() {
            // 表单验证
            await this.$refs.editForm.validate();
            if (this.model.id === 0) {
                // 如果ID为0，表示新增数据，将时间字段设置为当前时间
                this.model.time = new Date().toLocaleString();
                // 调用接口新增数据
                await this.$api.personnelManage.add(this.model);
                this.currentPage = 1;
            } else {
                this.model.time = new Date().toLocaleString();
                await this.$api.personnelManage.update(this.model);
                this.getData();
            }

            this.isEditing = false;
            this.$message({ message: "编辑成功！", type: "success" });
        }
    }
}
</script>

<style lang="scss" scoped>
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

<style>
div.el-form-item label.el-form-item__label {
    vertical-align: top;
}
</style>