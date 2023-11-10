<script setup>
import { computed, onMounted } from 'vue'
import { useCommentStore } from '../../stores'

const commentStore = useCommentStore()

const comment = computed(() => {
  return commentStore.comment
})

const total = computed(() => {
  console.log(comment.value.articleId)
  let sum = 0
  for (let i = 0; i < comment.value.list.length; i++) {
    sum++
    if (comment.value.list[i].children != undefined) {
      sum += comment.value.list[i].children.length
    }
  }
  return sum
})
const submitData = computed(() => {
  return {
    articleId: comment.value.articleId
  }
})
</script>
<template>
  <el-row class="comment" v-if="commentStore.comment.list.lenght != 0">
    <el-col :span="16" :offset="1" :xs="22">
      <comment-leave :data="submitData"></comment-leave>
      <div class="comment-list">
        <h4>共有评论{{ total }}条</h4>
        <comment-info
          :data="comment.list[index]"
          class="parentComment"
          v-for="(item, index) in comment.list"
          :key="index"
        >
        </comment-info>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.comment {
  margin-top: 20px;
  margin-bottom: 100px;
  //   background-color: aquamarine;

  .comment-list {
    margin-top: 60px;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 0 0 1px #dcdfeb;
    background-color: #ffffff;
    // background-color: cadetblue;
    > h4 {
      font-size: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
}
blockquote {
  border-left: 5px solid #3498db;
  padding-left: 10px;
}
</style>
<style lang="less">
.leave {
  input {
    font-size: larger;
  }
  .el-form-item {
    width: 28%;
  }
  .commit {
    float: right;
  }
  .el-form-item:last-of-type {
    width: 100%;
  }
  textarea {
    height: 8em;
    background: url(../../assets/img/comment.png) right bottom no-repeat;
    background-color: white;
    resize: none;
    font-size: larger;
  }
  @media screen and (max-width: 789px) {
    .el-form-item {
      width: 100%;
    }
  }
}
</style>
