<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { useUserStore } from '../../stores'
import { userInfoService } from '../../api/auth/user'
const store = useUserStore()

const props = defineProps({
  data: Object
})
const { data } = toRefs(props)
const submitForm = ref({
  userName: undefined,
  email: undefined,
  url: undefined,
  content: undefined,
  parentId: -1
})
const submit = () => {
  console.log({ ...submitForm.value, ...data.value })
}

onMounted(() => {
  if (store.token != '') {
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
    <el-form :model="submitForm" :inline="true">
      <!--昵称-->
      <el-form-item>
        <el-input
          v-if="submitForm.userName != undefined"
          disabled
          v-model="submitForm.userName"
          placeholder="昵称*"
          size="large"
        />
        <el-input v-else v-model="submitForm.userName" placeholder="昵称*" size="large" />
      </el-form-item>
      <!--邮箱-->
      <el-form-item>
        <el-input
          v-if="submitForm.email != undefined"
          disabled
          v-model="submitForm.email"
          placeholder="邮箱"
          size="large"
        >
        </el-input>
        <el-input v-else v-model="submitForm.email" placeholder="邮箱" size="large"> </el-input>
      </el-form-item>
      <!--网址-->
      <el-form-item>
        <el-input
          v-if="submitForm.url"
          disabled
          v-model="submitForm.url"
          placeholder="网址"
          size="large"
        >
        </el-input>
        <el-input v-else v-model="submitForm.url" placeholder="网址" size="large"> </el-input>
      </el-form-item>
      <!--内容-->
      <el-form-item>
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
