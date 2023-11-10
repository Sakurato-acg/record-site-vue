<script setup>
import router from '../../router'
</script>
<template>
  <el-row style="width: 100vw; height: 100vh">
    <el-col :sm="24">
      <el-result icon="error" title="页面不存在" sub-title="点击按钮返回首页">
        <template #extra>
          <el-button type="primary" @click="router.push('/')">Back</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>
<style lang="less">
.error {
  color: red;
}
</style>
