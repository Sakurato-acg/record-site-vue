<script setup>
import { computed, ref, toRefs } from 'vue'
import { useUserStore, useCommentStore } from '../../stores'
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
})
const form = ref()
const submitForm = ref({
  content: undefined
})

const rules = ref({
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
  ]
})

const submit = () => {
  // if (userStore.token='' || userStore.token==undefined) {

  // }
  form.value.validate(async (valid) => {
    if (valid) {
      await getLocationService()
        .then((res) => {
          info.value.location = res.data.adcode.o
        })
        .catch((error) => {
          console.log(error);
        })

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
</script>
<template>
  <div class="leave">
    <h4>发表评论</h4>
    <el-form :model="submitForm" :inline="true" aria-autocomplete="false" :rules="rules" ref="form">
      <!-- 昵称 -->
      <!-- <el-form-item prop="userName"> -->
      <!-- <el-input disabled v-model="submitForm.userName" placeholder="昵称*" size="large" /> -->
      <!-- </el-form-item> -->
      <!--邮箱-->
      <!-- <el-form-item prop="email"> -->
      <!-- <el-input disabled v-model="submitForm.email" placeholder="邮箱" size="large"> </el-input> -->
      <!-- </el-form-item> -->
      <!--网址-->
      <!-- <el-form-item prop="url"> -->
      <!-- <el-input disabled v-model="submitForm.url" placeholder="网址" size="large"> </el-input> -->
      <!-- </el-form-item> -->
      <!--内容-->
      <el-form-item prop="content">
        <el-input
          v-model="submitForm.content"
          placeholder="快来评论吧 (*≧ω≦)ﾉ  需要登录后评论"
          type="textarea"
        />
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
