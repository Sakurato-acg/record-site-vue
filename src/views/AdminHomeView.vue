<script setup></script>

<template>
  <div class="adminHome" style="height: 100%; min-width: 350px">
    <el-container style="width: 100%; height: 100vh">
      <admin-aside></admin-aside>
      <el-container style="flex-direction: column">
        <admin-header />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <bg-hidden></bg-hidden>
  </div>
</template>

<style scoped lang="less">
.el-main {
  background-color: #f7f7f7;
}
</style>
<style>
::-webkit-scrollbar {
  /* display: none !important; */
}
</style>
