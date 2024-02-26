<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userInfoService, userUpdateService } from '../../api/auth/user'
import { uploadImageService } from '../../api/system/upload'
import { useRouter } from 'vue-router';

const router=useRouter()

//校验
const ruleForm = ref()
const registerRules = ref({
  userName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      min: 2,
      max: 20,
      message: '账号必须是 2-20位 的字符',
      trigger: 'blur'
    }
  ],
  nickName: [
    { required: false, message: '请输入昵称', trigger: 'blur' },
    {
      min: 2,
      max: 20,
      message: '账号必须是 2-20位 的字符',
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
    { required: false, message: '请输入新的密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  avatar: [{ required: true, message: '请输入上传头像', trigger: 'blur' }],
  url: [{ required: false, message: '请输入个人链接', trigger: 'blur' }]
})
//获取用户信息
const form = ref({
  userName: undefined,
  password: undefined,
  email: undefined,
  avatar: undefined,
  url: undefined
})

onMounted(() => {
  userInfoService()
    .then((data) => {
      form.value = data
    })
    .catch((error) => {
      console.log(error)
    })
})
//更新信息
let goback = () =>
  setTimeout(() => {
    router.back()
  }, 2000)
const onSubmit = () => {
  userUpdateService(form.value)
    .then((data) => {
      // goback()
      // clearTimeout(goback)
    })
    .catch((error) => {
      console.log(error)
    })
}

//上传列表 ,文件上传相关
const fileList = ref([])
const beforeUpload = (file) => {
  // 判断是否大于2M
  const size = file.size / 1024 / 1024 < 200
  if (!size) {
    ElMessage.error('最大200MB')
    return false
  }
  if (!file.type.includes('image/')) {
    ElMessage.error('仅支持图片')
    return false
  }
  if (fileList.value.length > 1) {
    ElMessage.error('仅支持上传一个图片')
    return false
  }
  fileList.value.push(file)
}

const handleUpload = async (params) => {
  let file = new FormData()
  file.append('multipartFile', fileList.value[0])

  await uploadImageService('user', file)
    .then((data) => {
      fileList.value = []
      form.value.avatar = data.url
    })
    .catch((error) => {
      console.log(error)
      fileList.value = []
    })
}
</script>
<template>
  <el-row>
    <el-col :md="12" id="userEdit">
      <el-form
        ref="ruleForm"
        :model="form"
        label-width="120px"
        aria-autocomplete="false"
        :rules="registerRules"
      >
        <!--用户名-->
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入新的用户名" />
        </el-form-item>
        <!--用户名-->
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入新的昵称" />
        </el-form-item>
        <!--密码-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入新的密码" />
        </el-form-item>
        <!--邮箱-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入新的邮箱" />
        </el-form-item>
        <!--头像-->
        <el-form-item label="头像" prop="avatar">
          <el-avatar style="margin-bottom: 10px" shape="square" :size="80" :src="form.avatar" />
          <el-upload
            style="width: 100%"
            :drag="true"
            :multiple="false"
            accept="image"
            :before-upload="beforeUpload"
            :http-request="handleUpload"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <!--个人链接-->
        <el-form-item label="个人链接" prop="url">
          <el-input v-model="form.url" placeholder="请输入新的链接" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
#userEdit {
  width: 100%;
  background-color: white;
  padding: 32px 80px 12px 12px;
  border-radius: 18px;
}
.border-line {
  height: 100px;
  width: 1px;
  background: #e5e9ef;
  float: left;
  margin-left: 40px;
  margin-right: 40px;
}
.el-upload-dragger {
}
</style>
