<script setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import { useUserStore, useCommentStore } from '../../stores'
import { userInfoService } from '../../api/auth/user'
import { getLocationService } from '../../api/tool'
import { commentAddService, commentListService } from '../../api/blog/comment'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const commentStore = useCommentStore()

const comment = computed(() => {
  return commentStore.comment
})
const commentQuery = computed(() => {
  return commentStore.commentQuery
})

//父级数据
const props = defineProps({
  data: Object
})
const { data } = toRefs(props)

//提交的评论信息
//ip和ua信息
const info = ref({
  location: undefined,
  ua: undefined
})
const form = ref()
const submitForm = ref({
  userName: undefined,
  email: undefined,
  url: undefined,
  content: undefined
})

const rules = ref({
  userName: [
    {
      required: true,
      message: '请输入昵称，支持游客留言',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '昵称必须是 1-10位 的非空字符',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入留言',
      trigger: 'blur'
    },
    {
      pattern: /^.+$/,
      message: '留言不能为空',
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
  url: [
    {
      required: false,
      message: '请输入昵称，支持游客留言',
      trigger: 'blur'
    },
    {
      pattern: /^(https|http|ftp)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[\S]*)?$/,
      message: '网址格式错误，示例:https://www.bilibili.com/,要写http',
      trigger: 'blur'
    }
  ]
})

const submit = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      await getLocationService()
        .then((res) => {
          info.value.ip = res.data.ipinfo.text
        })
        .catch((error) => {})

      await commentAddService({
        ...submitForm.value,
        ...data.value,
        ...info.value,
        articleId: comment.value.articleId
      })
        .then((data) => {
          ElMessage.success('评论成功')
        })
        .catch((error) => {
          console.log(error)
        })
      commentListService({ ...commentQuery.value, articleId: comment.value.articleId })
        .then((data) => {
          commentStore.setCommentList(data.list)
          commentStore.setTotal(data.total)
          commentStore.setSum(data.sum)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}

onMounted(() => {
  if (userStore.token != '') {
    userInfoService()
      .then((data) => {
        submitForm.value.userName = data.userName
        submitForm.value.email = data.email
        submitForm.value.url = data.url
      })
      .catch((error) => {})
  }
})
</script>
<template>
  <div class="leave">
    <h4>发表评论</h4>
    <el-form :model="submitForm" :inline="true" aria-autocomplete="false" :rules="rules" ref="form">
      <!--昵称-->
      <el-form-item prop="userName">
        <el-input
          v-if="userStore.token != ''"
          disabled
          v-model="submitForm.userName"
          placeholder="昵称*"
          size="large"
        />
        <el-input v-else v-model="submitForm.userName" placeholder="昵称*" size="large" />
      </el-form-item>
      <!--邮箱-->
      <el-form-item prop="email">
        <el-input
          v-if="userStore.token != ''"
          disabled
          v-model="submitForm.email"
          placeholder="邮箱"
          size="large"
        >
        </el-input>
        <el-input v-else v-model="submitForm.email" placeholder="邮箱*" size="large"> </el-input>
      </el-form-item>
      <!--网址-->
      <el-form-item prop="url">
        <el-input
          v-if="userStore.token != ''"
          disabled
          v-model="submitForm.url"
          placeholder="网址"
          size="large"
        >
        </el-input>
        <el-input v-else v-model="submitForm.url" placeholder="网址http://" size="large">
        </el-input>
      </el-form-item>
      <!--内容-->
      <el-form-item prop="content">
        <el-input v-model="submitForm.content" placeholder="快来评论吧 (*≧ω≦)ﾉ" type="textarea" />
      </el-form-item>
      <label class="btn btn-primary commit" @click="submit()" style="cursor: pointer"> 发送 </label>
    </el-form>
  </div>
</template>
<style lang="less">
.comment .leave {
  // background-color: rgb(183, 219, 255);
  h4 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
