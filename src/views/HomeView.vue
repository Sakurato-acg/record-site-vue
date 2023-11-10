<script setup></script>

<template>
  <div class="home">
    <el-container style="flex-direction: column">
      <blog-header></blog-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  // height: 100%;
  // overflow: auto;

  // background-color: rgb(212, 229, 243);
  // background: url(../assets/test/background.jpg);
  background: url(../assets/background.png);
}
.el-main {
  --el-main-padding: none;
  // height: 100vh;
  width: 100%;
  overflow-x: hidden;
  // margin-top: 57.6px;
}
</style>
