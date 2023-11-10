<script setup>
import { articleDetailService } from '../../api/blog/article'
import { commentListService } from '../../api/blog/comment'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Prism from 'prismjs' //导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
import 'prismjs/themes/prism-okaidia.min.css' //引入代码高亮主题
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js' //行号插件
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css' //行号插件的样式
import * as tocbot from 'tocbot'
import { useCommentStore } from '../../stores/index'

const router = useRouter()
const commentStore = useCommentStore()
//目录
tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3,h4,h5',
  // For headings inside relative or absolute positioned containers within content.
  hasInnerContainers: true,
  headingsOffset: 64,
  scrollSmoothOffset: -64,
  collapseDepth: 3
})

//tools
const menu = ref({
  visable: false,
  content: undefined
})
const changeMenu = () => {
  menu.value.visable = !menu.value.visable

  menu.value.content = window.document.querySelector('.js-toc').innerHTML
}
//文章id
const article = ref({
  id: undefined,
  content: undefined,
  title: undefined,
  username: undefined,
  createTime: undefined,
  category: {},
  tags: [],
  viewCount: undefined
})

onMounted(async () => {
  article.value.id = router.currentRoute.value.params.id
  await articleDetailService(article.value.id)
    .then((data) => {
      article.value = data
    })
    .catch((error) => {
      console.log(error)
      // ElMessage.error(error)
      router.push('/error')
    })
  Prism.highlightAll() // 全局代码高亮
  tocbot.refresh({ ...tocbot.options, hasInnerContainers: true })
  commentListService({
    type: 0,
    currentPage: 1,
    pageSize: 10,
    articleId: article.value.id
  })
    .then((data) => {
      commentStore.setCommentList(data)
      commentStore.setCommentAId(article.value.id)
    })
    .catch((error) => {
      console.log(error)
    })
})
const date = computed(() => {
  let temp = new Date(article.value.createTime)
  return temp.getFullYear() + '年' + temp.getMonth() + '月' + temp.getDate() + '日'
})
</script>
<template>
  <div class="article">
    <el-row>
      <el-col
        :span="16"
        :offset="1"
        :xs="22"
        style="margin-top: 100px; background: #fff"
        class="box-shadow"
      >
        <div class="top">
          <h2 class="title">
            {{ article.title }}
          </h2>
          <div class="info">
            <div class="user">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
              <span>{{ article.username }}</span>
            </div>
            <div class="time">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>
              <span>{{ date }}</span>
            </div>
            <div class="category">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
                ></path>
              </svg>
              <a>
                {{ article.category.name }}
              </a>
            </div>
            <div class="tag">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              <a v-for="(tag, index) in article.tags" :key="index" style="margin-right: 5px">
                {{ tag.name }}
              </a>
            </div>
            <div class="viewCount">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>
              <span>
                {{ article.viewCount }}
              </span>
            </div>
          </div>
          <hr />
        </div>
        <article class="markdown-body line-numbers heti">
          <VueShowdown
            :markdown="article.content"
            flavor="github"
            :options="{ emoji: true }"
            class="js-toc-content"
          />
        </article>
      </el-col>
      <div class="js-toc jc-toc-lg" style="overflow-y: visible"></div>
      <!--右下角工具栏-->
      <div class="tools">
        <el-drawer :model-value="menu.visable" :append-to-body="true">
          <div
            class="js-toc"
            style="overflow-y: visible; position: unset"
            v-html="menu.content"
          ></div>
        </el-drawer>
        <button class="menu" @click="changeMenu()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M2 3.75A.75.75 0 0 1 2.75 3h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 2 3.75Zm0 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM2.75 7a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z"
            ></path>
          </svg>
        </button>
      </div>
    </el-row>
    <article-comment></article-comment>
  </div>
</template>
<style lang="less" scoped>
.article {
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-color: antiquewhite;
    padding: 20px 10px 20px;
    .title {
      margin-bottom: 20px;
    }
    .info {
      display: flex;
      // justify-content: center;
      flex-wrap: wrap;
      // background-color: aquamarine;
      > div {
        display: flex;
        align-items: center;
        margin-right: 20px;
        float: left;
        > svg {
          margin-right: 10px;
          fill: #7f7f7f;
          path {
            fill: #7f7f7f;
          }
        }
      }
      a,
      span {
        color: #7f7f7f;
      }
      a:hover {
        color: #3eaf7c;
        cursor: pointer;
      }
    }
  }
  .tools {
    position: fixed;
    right: 10px;
    bottom: 2vh;
    z-index: 1;
    button {
      width: 3em;
      height: 3em;
      color: #39c5bb;
      background-color: #ffffff;
      margin-top: 0.5em;

      box-shadow:
        0 0 10px #7878781a,
        0 5px 20px #78787833;
      border-radius: 66%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      width: 50%;
      height: 50%;
    }
    @media screen and (min-width: 768px) {
      .menu {
        display: none;
      }
    }
  }
}
.markdown-body {
  // border: 1px black solid;
  padding: 0 20px 20px;
}
.js-toc-lg {
  position: fixed;
  right: 5vw;
  top: 15vh;
  height: 20px;
  font-size: 18px;
}
.js-toc {
  position: fixed;
  right: 5vw;
  top: 15vh;
  height: 20px;
  font-size: 18px;
  .toc-list {
    background-color: #ecfafa;
    border: 1px black solid;
  }
}
@media screen and (max-width: 768px) {
  .jc-toc-lg {
    display: none;
    // top: unset;
    // right: 10px;
    // bottom: 2vh;
  }
}
</style>
<style lang="less">
.markdown-body {
  .line-numbers {
    overflow-y: hidden;
    .line-numbers-rows {
      font-size: 17px !important;
    }
  }
  h1::before {
    content: 'H1';
  }
  h2::before {
    content: 'H2';
  }
  h3::before {
    content: 'H3';
  }
  h4::before {
    content: 'H4';
  }
  h1::before,
  h2::before,
  h3::before,
  h4::before {
    color: #b0b0b0;
    font-size: medium;
    padding-right: 5px;
  }
}
.article .tools {
  .el-drawer {
    width: 55% !important;
  }
}
.el-drawer {
  width: 50% !important;
}
</style>
<style lang="sass">
@import 'tocbot/src/scss/tocbot'
</style>
