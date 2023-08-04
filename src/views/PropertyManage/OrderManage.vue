<!-- 接派单管理 -->
<template>
    <div>
        <div class="container-main">
            <div class="container-top">
                <div style="text-align: left;">
                    <span>工单统计</span>
                    <p>数据更新时间：<span v-text="updateTime"></span></p>
                </div>
                <div style="border-right: 2px solid #ddd; padding-right: 120px;">
                    <span>工单总数</span>
                    <p v-text="workTotal[0]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color: #D4321C; width: 10px; border-radius: 50%; height: 10px"></span>
                        待分配</span>
                    <p v-text="workTotal[1]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color: #F58700; width: 10px; border-radius: 50%; height: 10px"></span>
                        待接单</span>
                    <p v-text="workTotal[2]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color:#33D5E9; width: 10px; border-radius: 50%; height: 10px"></span>
                        进行中</span>
                    <p v-text="workTotal[3]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color:#00E266; width: 10px; border-radius: 50%; height: 10px"></span>
                        已完成</span>
                    <p v-text="workTotal[4]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color: #333333; width: 10px; border-radius: 50%; height: 10px"></span>
                        已关闭</span>
                    <p v-text="workTotal[5]"></p>
                </div>
                <div style="text-align: right;">
                    <span>
                        <span
                            style="display: inline-block; background-color: #CCCCCC; width: 10px; border-radius: 50%; height: 10px"></span>
                        已作废</span>
                    <p v-text="workTotal[6]"></p>
                </div>
            </div>

            <div class="container-body">
                <el-form inline align="left" class="formlist" style="position: relative; border-bottom: 1px solid #999;">
                    <el-header>

                        <el-form-item label="工单编号：" class="divlist">
                            <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.ticketNumber"
                                @change="currentPage = 1">
                            </el-input>
                        </el-form-item>
                        
                        <el-form-item label="认证时间：">
                            <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.time"
                                @change="currentPage = 1">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="工单状态：">
                            <el-select v-model="search.ticketStatus" @change="currentPage = 1">
                                <el-option label="- 全部户主 -" :value="-1"></el-option>
                                <el-option label="待分配" :value="0"></el-option>
                                <el-option label="待接单" :value="1"></el-option>
                                <el-option label="进行中" :value="2"></el-option>
                                <el-option label="已完成" :value="3"></el-option>
                                <el-option label="已关闭" :value="4"></el-option>
                                <el-option label="已作废" :value="5"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item style="margin-left: 200px;">
                            <el-button icon="el-icon-refresh-right" type="success" @click="refresh">刷新</el-button>
                            <el-button icon="el-icon-delete" type="danger" :disabled="selectIds.length === 0"
                                @click="BulkDeleteHandler">批量删除</el-button>
                            <download-excel class="export-excel-wrapper" :data="DetailForm" :fields="json_fields"
                                :header="title" name="data.xls" style="display: inline-block; margin-left:10px">
                                <el-button type="success">导出Excel</el-button>
                            </download-excel>
                        </el-form-item>

                    </el-header>
                    <el-main v-show="show">

                        <el-form-item label="报修人：">
                            <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容..." clearable v-model="search.repairPerson"
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
                    <el-table-column prop="ticketNumber" label="工单编号" width="150" align="center"></el-table-column>

                    <el-table-column prop="tel" label="工单状态" width="100" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.ticketStatus"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="ticketCategory" label="工单类别" width="130" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.ticketCategory"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="repairPerson" label="报修人" width="80" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.repairPerson"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="adds" label="报修位置" width="200" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.adds"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="source" label="报修来源" width="100" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.source"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="time" label="审核时间" width="200" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.time"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sendPerson" label="派单人" width="100" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.sendPerson"></span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="orderTaker" label="接单人" width="120" align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.orderTaker"></span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" min-width="180" align="center">
                        <template slot-scope="{row}">
                            <el-button icon="el-icon-edit" type="warning" @click="beginUpdata(row.id)">修改</el-button>
                            <el-button icon="el-icon-delete" type="danger" @click="deleteHandler(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination align="left" :current-page="currentPage" :page-sizes="[3, 5, 8, 10, 12]"
                    :page-size.sync="search.pageSize" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                    @size-change="currentPage = 1" @current-change="value => currentPage = value">
                </el-pagination>

                <el-dialog align="left" title="—— 分配工单列表 ——" :visible="isEditing" :show-close="false" width="700px"
                    style="top: -125px">

                    <el-form ref="editForm" label-width="150px" :model="model" :rules="rules" status-icon>
                        <el-form-item label="工单编号：" prop="ticketNumber">
                            <el-input style="width: 300px" placeholder="请输入工单编号..." v-model.trim="model.ticketNumber"></el-input>
                        </el-form-item>

                        <el-form-item label="报修类型：">
                            <el-select v-model="model.ticketCategory">
                                <el-option label="房屋维修" :value="0"></el-option>
                                <el-option label="车位维修" :value="1"></el-option>
                                <el-option label="公区维修" :value="2"></el-option>
                                <el-option label="电梯维修" :value="3"></el-option>
                                <el-option label="事件报警" :value="4"></el-option>
                                <el-option label="环境保洁" :value="5"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="工单状态：">
                            <el-select v-model="model.ticketStatus">
                                <el-option label="置回待接单" :value="1"></el-option>
                                <el-option label="接单" :value="2"></el-option>
                                <el-option label="标注完成" :value="3"></el-option>
                                <el-option label="关闭工单" :value="4"></el-option>
                                <el-option label="标志作废" :value="5"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="维修人员：">
                            <el-select v-model="model.orderTaker">
                                <el-option label="李先生" :value="0"></el-option>
                                <el-option label="赵先生" :value="1"></el-option>
                                <el-option label="王先生" :value="2"></el-option>
                                <el-option label="唐先生" :value="3"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="报修来源：">
                            <el-select v-model="model.source">
                                <el-option label="APP" :value="0"></el-option>
                                <el-option label="公众号" :value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="派单备注：">
                            <el-input style="width: 300px" placeholder="请输入地址信息..." v-model.trim="model.view"></el-input>
                        </el-form-item>

                    </el-form>
                    <div slot="footer">
                        <el-button type="primary" @click="save">确定</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>

                </el-dialog>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "order-manage",
    data() {
        return {
            list: [],
            total: 7,
            show: false,
            drawer: true,// 控制抽屉的显示与隐藏
            selectIds: [],
            workTotal: [0, 0, 0, 0, 0, 0, 0],// 工单统计数据
            updateTime: new Date().toLocaleString(),// 更新时间
            // 查询条件对象
            search: { id: 0, 
                ticketNumber: "", // 工单编号
                ticketStatus: -1, // 工单状态
                ticketCategory: -1, // 工单类别
                repairPerson: "", // 报修人
                adds: "", // 报修位置
                source: -1, // 报修来源
                time: "", // 提交时间
                sendPerson: "", // 派单人
                orderTaker: -1, // 接单人
                view: "", // 鉴评
                pageSize: 5, // 每页显示的数据条数
                currentPage: 1 // 当前页数
            },
            model: { id: 0, ticketNumber: "", ticketStatus: 0, ticketCategory: 0, repairPerson: "", adds: "", source: 0, time: "", sendPerson: "", orderTaker: 0, view: "" },
            isEditing: false,// 标记是否处于编辑状态
            rules: {// 表单验证规则
                ticketNumber: [
                    { required: true, message: "* 工单编号不能为空..", trigger: "blur" },
                ]
            },
            // 导出excel表格的代码---start
            title: "123表格",
            // 导出excel表格的字段映射
            json_fields: {
                "工单编号": "ticketNumber",
                "工单状态": "ticketStatus",
                "工单类别": "ticketCategory",
                "报修人": "repairPerson",
                "报修位置": "adds",
                "报修来源": "source",
                "提交时间": "time",
                "派单人": "sendPerson",
                "接单人":"orderTaker"
            },
            DetailForm: [

            ]
            // 导出excel表格的代码---end
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
    created() { this.currentPage = 1; },
    methods: {
        selectionChangeHandler(selectRows) {// 有这一行的每一个组件都看一下是否还存在这个的引用
            // 把所有选中行的id收缩成一个数组后， 赋值给selectIds
            this.selectIds = selectRows.reduce((ids, row) => { ids.push(row.id); return ids }, []);
        },
        async getData() { //重新获取数据 -- 在这里发送数据统计的Ajax
            const { list, total } = await this.$api.orderManage.getData(this.search); // 这行才是核心模拟从服务器拿数据的请求
            this.list = list;
            this.total = total;
            // 获取工单统计数据
            this.workTotal = await this.$api.orderManage.workTotal();
            // 将数据列表中的数字转换为对应的中文字符
            this.list = await this.$api.orderManage.numToString({data: this.list});
            // 更新详细表单数据
            this.DetailForm = JSON.parse(JSON.stringify(this.list));            
        },
        // 删除数据的处理函数
        async deleteHandler(id) { // 删除所点的数据
            await this.$confirm("真的要删除该数据吗？", "警告", "success");
            // 向服务器发送删除请求
            await this.$api.orderManage.del(id);
            this.getData();
            this.$message({ message: "删除成功！", type: "success" });
        },
        // 批量删除数据的处理函数
        async BulkDeleteHandler() { // 批量删除数据
            await this.$confirm("真的要删除这些数据吗？", "警告", "success");
            // 向服务器发送批量删除请求
            await this.$api.orderManage.bulkdelete({ ids: this.selectIds });
            this.getData();  // 根据当前的条件重新获取数据
            this.$message({ message: "删除成功！", type: "success" });
        },
        // 取消编辑的处理函数
        async cancel() {
            await this.$confirm("数据未保存，确定要退出吗？", "警告", { type: "warning" });
            this.isEditing = false;// 取消编辑状态
        },
        refresh() {
            this.getData();
        },
        // 开始编辑数据的处理函数
        async beginUpdata(id) {
            // 从服务器获取数据并回显
            this.model = await this.$api.orderManage.getModel(id) // 回显数据
            this.$refs.editForm?.resetFields(); // 将表单重置
            this.$nextTick(() => this.isEditing = true);  // 在下一个时间片打开dialoag
        },
        // 保存编辑后的数据的处理函数
        async save() {
            await this.$refs.editForm.validate();
                // 更新提交时间
                this.model.time = new Date().toLocaleString();
                // 更新更新时间
                this.updateTime = new Date().toLocaleString();
            if (this.model.id === 0) {
                await this.$api.orderManage.add(this.model);
                this.currentPage = 1;
            } else {
                await this.$api.orderManage.update(this.model);
                this.getData();
            }

            this.isEditing = false;
            this.$message({ message: "编辑成功！", type: "success" });
        }
    }

}
</script>

<style lang="scss" scoped>
.container-main {
    width: 100%;
    height: 690px;

    .container-top {
        color: #555555;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        line-height: 30px;
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        padding: 10px 0;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);

        span span {
            margin-right: 5px;
        }
    }

    .container-body {
        padding: 10px 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 100px;
        background-color: rgb(255, 255, 255);
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
}
</style>

<style>
div.el-form-item label.el-form-item__label {
    vertical-align: top;
}
</style>