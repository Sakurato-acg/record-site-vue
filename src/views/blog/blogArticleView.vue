<script setup>
import { articleFrontDetailService, articleViewCountUpdatedService } from '../../api/blog/article'
import { commentListService } from '../../api/blog/comment'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Prism from 'prismjs' //导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
import { useCommentStore } from '../../stores/index'

const router = useRouter()
const commentStore = useCommentStore()

//tools
const menu = ref({
  visable: false,
  content: undefined
})
const changeMenu = () => {
  menu.value.visable = !menu.value.visable
}
const showdown = ref()
const titles = ref([])
const createTocbot = () => {
  let nodes = document.querySelector('article').querySelectorAll('h1,h2,h3,h4,h5,h6')
  // let tempIndex = {
  //   H1: 1,
  //   H2: 1,
  //   H3: 1,
  //   h3: 1,
  //   H4: 1,
  //   H5: 1
  // }
  // let tempNode = null
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    let regex = /^H[1-6]{1}$/
    if (regex.exec(node.tagName)) {
      node.id = node.id
    }
    let toc = {
      id: node.id,
      title: node.innerText,
      level: parseInt(node.tagName.substring(1))
    }
    // if (tempNode != null && tempNode.level != toc.level) {
    //   // tempIndex[]
    // }
    // toc.prefix = `${toc.level}-${tempIndex[node.tagName]++}`
    // tempNode = toc
    titles.value.push(toc)
  }
}
const handleNodeClick = (node_id) => {
  let node = document.getElementById(node_id)
  // node.scrollIntoView({
  //   alignToTop: '107.6px',
  //   behavior: 'smooth',
  //   block: 'start'
  // })
  window.scrollTo({
    top: node.offsetTop - 40,
    left: 0,
    behavior: 'smooth'
  })
  if (menu.value.visable == true) {
    menu.value.visable = false
  }
}
const menu_item = ref()
watch(menu_item, (oldView, newView) => {
  console.log(2)
})

//文章id
const article = ref({
  id: undefined,
  content: undefined,
  title: undefined,
  author: {},
  createTime: undefined,
  category: {},
  tags: [],
  viewCount: undefined
})
const commentQuery = computed(() => {
  return commentStore.commentQuery
})

onMounted(async () => {
  article.value.id = router.currentRoute.value.params.id

  //更新文章浏览量
  await articleViewCountUpdatedService(article.value.id)
    .then((data) => {})
    .catch((error) => {})
  //加载文章信息
  await articleFrontDetailService(article.value.id)
    .then((data) => {
      article.value = data
      commentStore.setCommentAId(article.value.id)
    })
    .catch((error) => {
      console.log(error)
      router.push('/error')
    })
  // 全局代码高亮

  Prism.highlightAll()
  // tocbot.refresh({ ...tocbot.options, hasInnerContainers: true })
  // 目录
  createTocbot()
  //加载评论信息
  commentListService({ ...commentQuery.value, articleId: article.value.id })
    .then((data) => {
      commentStore.setCommentList(data.list)
      commentStore.setTotal(data.total)
      commentStore.setSum(data.sum)
    })
    .catch((error) => {
      console.log(error)
    })
})
const date = computed(() => {
  let temp = new Date(article.value.createTime)
  return temp.getFullYear() + '年' + (temp.getMonth() + 1) + '月' + temp.getDate() + '日'
})
</script>
<!-- :class="active == index ? 'structure active' : 'structure'" -->
<template>
  <div class="article front-top">
    <el-row>
      <el-col :span="16" :offset="1" :xs="22" class="box-border">
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
              <span>{{ article.author.nickName }}</span>
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
        </div>
        <hr />
        <article class="markdown-body heti line-numbers">
          <VueShowdown :markdown="article.content" ref="showdown" class="js-toc-content" />
        </article>
      </el-col>
      <div class="box-border tocbot">
        <h3>目录</h3>
        <div>
          <a
            :style="{ paddingLeft: (item.level - 1) * 1.5 + 'em' }"
            style="display: block; cursor: pointer; margin: 5px 0"
            v-for="(item, index) in titles"
            :key="index"
            @click="handleNodeClick(item.id)"
          >
            <div>
              <!-- <el-icon v-if="item.level == 2"><ArrowRight /></el-icon> -->
              <span> &nbsp;{{ item.title }} </span>
            </div>
          </a>
        </div>
      </div>
      <!--右下角工具栏-->
      <div class="tools">
        <el-drawer :model-value="menu.visable" :append-to-body="true">
          <a
            :style="{ paddingLeft: (item.level - 1) * 1.5 + 'em' }"
            style="display: block; cursor: pointer; margin: 5px 0"
            v-for="(item, index) in titles"
            :key="index"
            @click="handleNodeClick(item.id)"
          >
            {{ item.title }}
          </a>
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
  // margin-top: 100px;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px 20px;

    .title {
      margin: 25px auto;
    }
    .info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      > div {
        display: flex;
        align-items: center;
        margin: 5px;
        // float: left;
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
    z-index: 2;
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
  // background-color: rgb(234, 250, 215);
  background-color: #fff;

  // border: 1px black solid;
  padding: 0 35px 20px;
}
.tocbot {
  width: 16.7%;
  max-height: 60vh;
  overflow-y: auto;
  position: fixed;
  right: 10vw;
  z-index: 1;
  padding: 10px;
}
@media screen and (max-width: 768px) {
  .tocbot {
    display: none;
  }
}
// @media screen and (max-width: 1350px) {
//   .tocbot {
//     right: vw;
//   }
// }
hr {
  margin: 0 auto;
  width: 90%;
  border: 1px solid #e3eaef;
}
</style>
<style lang="less">
.markdown-body {
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: unset;
    letter-spacing: 1px;
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
    left: -30px;
    // top: 10%;
    position: absolute;
    color: #b0b0b0;
    font-size: medium;
    // padding-right: 5px;
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
