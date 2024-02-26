<script setup>
import { ref } from 'vue'
import { userLoginService } from '../../api/auth/user.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/index'

//路由
const router = useRouter()
//token pinia
const store = useUserStore()

const form = ref()
// 父组件,显示
const prop = defineProps({
  isRegister: Boolean
})
//登录表单
const loginForm = ref({
  account: '',
  password: ''
})
//校验规则
const loginRules = ref({
  account: [
    {
      required: true,
      trigger: 'blur',
      validator: function (rule, value, callback) {
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
          value
        )
        const isUsername = value.length >= 1 && value.length <= 20
        if (value == '' || value == null) {
          callback(new Error('请输入用户名或邮箱'))
          return
        } else if (isEmail != true && isUsername != true) {
          callback(new Error('格式有误'))
          return
        } else {
          callback()
          return
        }
      }
    }
  ],

  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ]
})
//登录login()
const login = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      //向后台发请求
      await userLoginService(loginForm.value)
        .then((data) => {
          store.setToken(data.token)
          ElMessageBox.confirm('前往哪里', '提示', {
            type: 'success',
            confirmButtonText: '管理后台',
            cancelButtonText: '返回之前的地址'
          })
            .then(() => {
              router.push('/admin')
            })
            .catch(() => {
              router.back()
            })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('校验失败')
      //就向用户提示错误信息
    }
  })
}
//忘记密码
const forget = () => {}

const emit = defineEmits(['change'])
const goToRegister = () => {
  emit('change', !prop.isRegister)
}
</script>

<template>
  <!-- 登录表格 -->
  <el-form
    :model="loginForm"
    ref="form"
    aria-autocomplete="false"
    :rules="loginRules"
    @keyup.enter="login"
  >
    <!-- //登录标题 -->
    <el-form-item class="header">
      <img src="../../assets/logo.png" alt="" />
      <label class="label">博客管理系统</label>
    </el-form-item>
    <div class="form">
      <!-- //账号或邮箱 -->
      <el-form-item prop="account" label="账号">
        <el-input placeholder="请输入用户名或邮箱" v-model="loginForm.account" class="input">
        </el-input>
      </el-form-item>

      <!-- //密码 -->
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="loginForm.password"
          name="password"
          type="password"
          placeholder="请输入密码"
          class="input"
        >
        </el-input>
      </el-form-item>

      <!-- //登录 -->
      <el-form-item>
        <el-button @click="login()" type="primary" style="background-color: #727cf5; border: none">
          登录
        </el-button>
        <el-button
          @click="goToRegister()"
          type="primary"
          style="background-color: #39afd1; border: none"
          >注册
        </el-button>
        <el-button
          @click="forget()"
          type="primary"
          style="background-color: #a6a9ad; border-style: none; border: none"
          >忘记密码</el-button
        >
      </el-form-item>
      <div class="line">其他方式登录</div>
      <div class="otherMethod">
        <a style="background-color: #00aaee">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"
            />
          </svg>
        </a>
        <a style="background-color: #67c23a">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"
            />
          </svg>
        </a>
        <a style="background-color: black" href="https://github.com/Sakurato-acg">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            />
          </svg>
        </a>
      </div>
    </div>
  </el-form>
</template>

<style></style>
