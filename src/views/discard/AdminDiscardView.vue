<script setup></script>
<template>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="8">
      <el-card>
        <div class="user">
          <img src="https://avatars.githubusercontent.com/u/106546816?v=4" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <div class="access">超级管理员</div>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间 :<span>2021-1-2</span></p>

          <p>上次登录地点 :<span>武汉</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <el-icon>
          <component is="document"></component>
        </el-icon>
        <div class="count">
          <p>文章数</p>
          <strong>34</strong>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <el-icon>
          <component is="document"></component>
        </el-icon>
        <div class="count">
          <p>文章数</p>
          <strong>34</strong>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <el-icon>
          <component is="document"></component>
        </el-icon>
        <div class="count">
          <p>文章数</p>
          <strong>34</strong>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <el-icon>
          <component is="document"></component>
        </el-icon>
        <div class="count">
          <p>文章数</p>
          <strong>34</strong>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="less">
// .el-row {
//   background-color: #eff1f4;
//   height: 100%;
// }
.el-card {
  border-radius: 10px;
  border-color: rgb(198, 206, 206);
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;

    img {
      width: 150px;
      border-radius: 50%;
    }
    .userinfo {
      //   margin-left: 50px;
      .name {
        font-size: 2rem;
        margin-bottom: 10px;
      }
    }
  }
  @media screen and (max-width: 1030px) {
    .user {
      justify-content: center;
    }
  }
  .login-info {
    display: flex;
    flex-direction: column;

    padding-top: 20px;
    span {
      margin-left: 10px;
    }
  }
}
// .box-card {
//   --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
//     0 4px 6px -4px rgb(0 0 0 / 0.1);
//   --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
//     0 4px 6px -4px var(--tw-shadow-color);
//   box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
//     var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
// }
.box-card .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 50px;
    color: #f4516c;
  }
  p {
    font-size: 22px;
    color: #8c8c8c;
    padding-bottom: 10px;
  }
}
</style>
