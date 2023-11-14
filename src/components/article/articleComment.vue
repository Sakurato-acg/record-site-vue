<script setup>
import { computed, ref } from 'vue'
import { useCommentStore } from '../../stores'
import { commentListService } from '../../api/blog/comment'

const commentStore = useCommentStore()

const comment = computed(() => {
  return commentStore.comment
})

const commentQuery = computed(() => {
  return commentStore.commentQuery
})

const handleCurrentChange = (val) => {
  commentStore.setCurrentPage(val)
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
const data=ref({
  parentId:-1,
  type:0
})
</script>
<template>
  <el-row class="comment">
    <el-col :span="16" :offset="1" :xs="22">
      <comment-leave :data="data"></comment-leave>
      <div class="comment-list">
        <h4>共有评论{{ commentQuery.sum }}条</h4>
        <div v-if="comment.list != null && comment.list.length != 0">
          <comment-info
            :data="comment.list[index]"
            class="parentComment"
            v-for="(item, index) in comment.list"
            :key="index"
          >
          </comment-info>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="commentQuery.currentPage"
          :page-size="commentQuery.pageSize"
          layout="prev, pager, next"
          :total="commentQuery.total"
          style="float: right; margin-bottom: 20px"
        />
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
<style>
.el-pagination button {
  font-size: 17px;
  color: #999999 !important;
  background-color: transparent;
}
.el-pager li {
  font-size: 17px;
  background-color: transparent;
  /* margin: 0 4px; */
}
.el-pagination button:disabled {
  font-size: 17px;
  background-color: transparent;
}
.el-pager li.is-active {
  color: #fff;
  background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69 100%);
  border-radius: 5px;
  box-shadow: 0 0 12px rgba(237, 110, 160, 0.3);
}
</style>
