<script setup>
import { onMounted, ref } from 'vue'
import { articleHomeListService } from '../../api/blog/article'
import { categoryHomeListService } from '../../api/blog/category'
import { tagHomeListService } from '../../api/blog/tag'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '../../stores/index'

const router = useRouter()
const layoutStore = useLayoutStore()

//文章列表
const articleHomeList = ref({})
//加载文章列表
const getAtricleList = () => {
  articleHomeListService(page.value)
    .then((data) => {
      page.value.total = data.total
      layoutStore.setSummaryArticle(data.total)
      articleHomeList.value = data.list
    })
    .catch((err) => {
      console.log(err)
    })
}
//分类列表
const categoryList = ref([])
//加载分类列表
const getCategoryList = () => {
  categoryHomeListService()
    .then((data) => {
      categoryList.value = data.list
      layoutStore.setSummaryCategory(data.total)
    })
    .catch((err) => {
      console.log(err)
    })
}
//标签列表
const tagList = ref([])
const getTagList = () => {
  tagHomeListService()
    .then((data) => {
      tagList.value = data.list
      layoutStore.setSummaryTag(data.total)
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  getAtricleList()
  getCategoryList()
  getTagList()
})

//分页
const page = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})
const handleCurrentChange = (val) => {
  page.value.currentPage = val
  getAtricleList()
}

const friends = ref([
  {
    name: 'Ra ',
    url: 'https://www.moerats.com'
  },
  {
    name: 'dadas ',
    url: 'https://www.moerats.com'
  },
  {
    name: 'baidu',
    url: 'https://www.moerats.com'
  }
])
</script>
<template>
  <div class="header-bg">
    <div class="info">
      <p class="title">Record-Site</p>
      <p class="about">Don't repeat yourself</p>
    </div>
  </div>
  <el-row class="main">
    <el-col :span="16" class="list" :xs="22">
      <list-card :data="item" v-for="(item, index) in articleHomeList" :key="index"></list-card>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
        style="float: right; margin-bottom: 20px"
      />
    </el-col>
    <el-col :span="7" :offset="1" :xs="22" class="main-info">
      <el-card>
        <div>
          <summary-aside style="border-bottom: 2px #eaecef solid"></summary-aside>
        </div>
        <div class="categories">
          <div class="title">
            <div class="left">
              <el-icon><Menu /></el-icon>
              <span>Categories</span>
            </div>
            <a class="right" href="">
              <span> more </span>
              <el-icon><DArrowRight /></el-icon>
            </a>
          </div>
          <div>
            <div
              v-for="(item, index) in categoryList"
              :key="index"
              class="categories-item"
              @click="router.push('/category/' + item.id)"
            >
              <span class="name" style="">
                {{ item.name }}
              </span>
              <span class="count">
                {{ item.count }}
              </span>
            </div>
          </div>
        </div>
        <div class="tags">
          <div class="title">
            <div class="left">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              <span>Tags</span>
            </div>
            <a class="right" href="">
              <span>more</span>
              <el-icon><DArrowRight /></el-icon>
            </a>
          </div>
          <div>
            <div
              class="tags-item"
              v-for="(item, index) in tagList"
              :key="index"
              @click="router.push('/tag/' + item.id)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="friends">
          <div class="title">
            <div class="left">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
                />
              </svg>
              <span>Friend Links</span>
            </div>
            <a href="" class="right">
              <span>more</span>
              <el-icon><DArrowRight /></el-icon>
            </a>
          </div>
          <div>
            <div
              class="friends-item"
              v-for="(item, index) in friends"
              :key="index"
              @click="test(item.url)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <h1>test</h1>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.header-bg {
  margin-top: 57.6px;
  width: 100%;
  height: 50vh;
  background-image: url(../../assets/test/bg19e.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;

  .info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;

    .title {
      font-size: 40px;
    }
    .about {
      font-size: 25.6px;
      margin-top: 40px;
    }
  }
}
.header-bg::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  content: '';
}

.main {
  margin: 40px auto 0;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  //   background-color: aquamarine;
}

.main-info {
  .el-card__body > div {
    // border-bottom: 2px #eaecef solid;
  }
  .title {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    .left {
      display: flex;
      align-items: center;
      > span:last-of-type {
        margin-left: 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        padding-right: 5px;
      }
    }
    .right:hover {
      color: #3eaf7c;
    }
  }
  .categories {
    .categories-item {
      margin-bottom: 20px;
      width: 100%;
      overflow: hidden;
      padding: 10px 20px;
      border-radius: 0.25rem;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      cursor: pointer;

      display: flex;
      justify-content: space-between;
      .name:hover {
        color: #3eaf7c;
        text-decoration: underline;
      }
    }
    .categories-item:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .tags,
  .friends {
    overflow: hidden;
    padding-bottom: 20px;
    .tags-item,
    .friends-item {
      float: left;
      margin: 5px;
      padding: 5px 10px;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .categories-item,
  .friends-item,
  .tags-item {
    transition: all 0.4s;
  }
}

.count {
  background-color: #f8b26a;
  width: 25.6px;
  height: 25.6px;
  text-align: center;
  line-height: 25.6px;
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
}
@media screen and (max-width: 768px) {
  .list {
    margin-left: 4.1666666667%;
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
