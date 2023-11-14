<script setup>
import { ref } from 'vue'
import { userRegisterService } from '../../api/auth/user.js'
import { getQQAvatarService } from '../../api/tool'

//父组件,显示
const prop = defineProps({
  isRegister: Boolean
})

const form = ref()
const registerForm = ref({
  userName: '',
  password: '',
  repassword: '',
  email: '',
  avatar: ''
})
const registerRules = ref({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 2,
      max: 20,
      message: '用户名必须是 2-20位 的字符',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      trigger: 'blur',
      validator: function (rule, value, callback) {
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
          value
        )
        if (value == '' || value == null) {
          callback(new Error('请输入邮箱'))
          return
        } else if (isEmail != true) {
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
  ],
  repassword: [
    {
      required: true,

      trigger: 'blur',
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (registerForm.value.password == '' || registerForm.value.password == null) {
          callback(new Error('两次输入密码不一致'))
        } else if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      }
    }
  ]
})

const emit = defineEmits(['change'])
const backToLogin = () => {
  emit('change', !prop.isRegister)
}
const register = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      //向后台发请求
      await userRegisterService(registerForm.value)
        .then((res) => {
          ElMessage.success(res.msg)
          backToLogin()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('校验失败')
    }
  })
}
</script>
<template>
  <!--注册表格-->
  <el-form
    :model="registerForm"
    ref="form"
    aria-autocomplete="false"
    :rules="registerRules"
    label-width="auto"
    label-position="left"
  >
    <!-- //登录标题 -->
    <el-form-item class="header">
      <img src="../../assets/img/logo.png" alt="" />
      <label class="label">博客管理系统</label>
    </el-form-item>
    <div class="form">
      <!--上传头像-->
      <!-- //账号或邮箱 -->
      <el-form-item prop="userName" label="用户名">
        <el-input placeholder="请输入用户名" v-model="registerForm.userName" class="input">
        </el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input placeholder="请输入邮箱 / 游客邮箱" v-model="registerForm.email" class="input">
        </el-input>
      </el-form-item>

      <!-- //密码 -->
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="registerForm.password"
          name="password"
          type="password"
          placeholder="请输入密码"
          class="input"
        >
        </el-input>
      </el-form-item>
      <!--再次输入密码-->
      <el-form-item prop="repassword" label="再次输入">
        <el-input
          v-model="registerForm.repassword"
          name="password"
          type="password"
          placeholder="请再次输入"
          class="input"
        >
        </el-input>
      </el-form-item>

      <!-- //登录 -->
      <el-form-item>
        <el-button @click="register()" type="primary" style="background-color: #727cf5"
          >注册
        </el-button>
        <el-button @click="backToLogin()" type="primary" style="background-color: #39afd1"
          >返回登录
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style></style>
