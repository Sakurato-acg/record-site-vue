<script setup>
import RegisterForm from '../../components/login/AdminRegisterForm.vue'
import LoginForm from '../../components/login/AdminLoginForm.vue'
import { ref } from 'vue'

const isRegister = ref(false)

const change = () => {
  isRegister.value = !isRegister.value
}
// const
</script>
<template>
  <blog-header></blog-header>
  <el-row class="loginView">
    <el-col :xs="22" :sm="12" :md="8">
      <h2 style="padding: 30px 10px; color: #6c757d" v-if="!isRegister">登录</h2>
      <h2 style="padding: 30px 10px; color: #6c757d" v-else>注册</h2>
      <RegisterForm v-if="isRegister" :isRegister="isRegister" @change="change"> </RegisterForm>
      <LoginForm v-else :isRegister="isRegister" @change="change"></LoginForm>
    </el-col>
  </el-row>
</template>

<style lang="less">
.loginView {
  transition: none;
  min-width: 350px;
  height: 100vh;
  background: url('../../assets/background.png');
  // background: url('../../assets/comBg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-form {
    background-color: #ffffff;
    box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
  }

  .header {
    background-color: #63a6f0;
    text-align: center;
    padding: 1.25rem 1.5rem;

    .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 15%;
    }
    .label {
      padding-left: 20px;
      font-size: 30px;
      // color: #fed0fb;
      color: #fff;
      // -webkit-text-stroke: 1px #f3c483;
    }
  }
  .form {
    margin-top: -20px;
    padding: 1.5rem;
    .el-form-item__label,
    .el-checkbox__label {
      color: #6c757d;
      font-weight: bold;
      font-size: medium;
    }

    input {
      width: 100%;
      height: 40px;
      border-style: none;
      // border: 1px solid #dee2e6;
    }
    .el-button {
      color: #fff;
      margin-right: 10px;
      margin-bottom: 16px;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    }
    .line {
      color: #b5b5b5;
      text-align: center;
    }
    .line:after,
    .line:before {
      content: '';
      display: inline-block;
      background-color: #d8d8d8;
      width: 60px;
      height: 1px;
      margin: 0 12px;
      vertical-align: middle;
    }
    .otherMethod {
      margin-top: 1rem;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      a {
        margin: 0 10px;
        padding: 5px;
        border-radius: 50%;
        text-align: center;
      }
      path {
        fill: white;
      }
    }
  }
}
</style>
