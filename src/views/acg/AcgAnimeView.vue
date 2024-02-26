<script setup></script>
<template>
  <div id="animeView" class="front-top">
    <el-row>
      <el-col :span="18" class="nav-box box-border">
        <div class="navList underLine">
          <h3>番剧索引</h3>
          <hr />
          <h4>类型：</h4>
          <nav>
            <a>
              <span>全部</span>
            </a>
          </nav>
        </div>
        <div class="navList">
          <h4>标签：</h4>
          <nav>
            <a
              :class="{ background: checkTag(tag) }"
              v-for="tag in tagList"
              :key="tag.id"
              @click="clickTag(tag)"
            >
              <span>{{ tag.name }}</span>
            </a>
          </nav>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
#animeView {
  height: 100vh;
}
</style>
