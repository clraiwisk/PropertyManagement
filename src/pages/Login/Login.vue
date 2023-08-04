<template>
    <el-container>

        <el-main>
            <el-carousel :interval="5000" arrow="always" height="100vh">
                <el-carousel-item v-for="(item, index) in images" :key="index">
                    <el-image :src="item"></el-image>
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-main>

        <el-form :model="model" :rules="rules" @submit.native.prevent="login" ref="form">
            <h1 style="color: white;">智慧物业管理系统</h1>

            <el-form-item prop="name">
                <el-input placeholder="请输入用户名..." v-model.trim="model.name">
                    <template slot="prepend">
                        <span class="pre-style">
                            <i class="el-icon-user-solid"></i>
                        </span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="pwd">
                <el-input placeholder="请输入密码..." type="password" v-model.trim="model.pwd" :show-password="true">
                    <template slot="prepend">
                        <span class="pre-style">
                            <i class="el-icon-lock"></i>
                        </span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="num">
                <el-input placeholder="请输入企业编号..." v-model.trim="model.num">
                    <template slot="prepend">
                        <span class="pre-style">
                            <i class="el-icon-user"></i>
                        </span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="verification">
                <el-input placeholder="请输入验证码..." v-model.trim="model.verification">
                    <template slot="prepend">
                        <span class="pre-style">
                            <i class="el-icon-circle-check"></i>
                        </span>
                    </template>
                    <template slot="append">
                        <span @click="generateCode">{{ code }}</span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button native-type="submit">登录</el-button>
            </el-form-item>

        </el-form>
    </el-container>
</template>

<script>
export default {
    name: 'login-main',
    data() {
        return {
            isLoggedIn: false, // 是否已登录
            model: {
                name: '',
                pwd: '',
            },
            images: [
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            ],
            code: "",
            rules: Object.freeze({
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '请输入企业编号', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ],
                verification: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { pattern: /^\w{4}$/, message: '请输入四位验证码', trigger: 'blur' }
                ]
            })
        };
    },
    methods: {
        async login() {
            await this.$refs.form.validate();                   // 非空验证
            const enteredVerificationCode = this.model.verification;
            const generatedCode = this.code;

            if (enteredVerificationCode === generatedCode) {// 验证码验证通过，执行进一步的操作
                let token = await this.$api.user.login(this.model); // 发送ajax
                sessionStorage.setItem('token', token); // token存入缓存
                sessionStorage.setItem('name', this.model.name); // 用户名存入缓存
                console.log(this.model.name)
                this.$message({ message: '登录成功...', type: 'success' });
                this.$router.replace('/home');
            } else {
                this.$message.error('验证码不匹配');    // 验证码不匹配，显示验证错误信息
            }
        },
        generateCode() {
            this.code = "";
            let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            for (var i = 1; i <= 4; i++) {
                this.code += letters[Math.floor(Math.random() * letters.length)];
            }
        },
    },
    created() {
        this.generateCode();
    }
}
</script>

<style lang="scss" scoped>
.el-main {
    padding: 0;
}

.el-carousel__item h3 {
    color: #7692b6;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-container {
    height: 100%;
    width: 100%;

    .el-form {
        z-index: 100;
        width: 300px;
        height: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        .pre-style {
            display: inline-block;
            width: 20px;
        }
    }

}
</style>