<script setup>
import { onMounted, ref } from 'vue'
import { categoryHomeListService } from '../../api/blog/category'
import { tagHomeListService } from '../../api/blog/tag'
import { useRouter } from 'vue-router'
import { articleFrontListService } from '../../api/blog/article'

const router = useRouter()

//分类列表
const categoryList = ref([])
//加载分类列表
const getCategoryList = async () => {
  await categoryHomeListService()
    .then((data) => {
      categoryList.value = data.list
    })
    .catch((err) => {
      console.log(err)
    })
}

//标签列表
const tagList = ref([])
//加载标签列表
const getTagList = async () => {
  await tagHomeListService(undefined, page.value.categoryName)
    .then((data) => {
      tagList.value = data.list
    })
    .catch((err) => {
      // console.log(err)
      tagList.value = []
    })
}

//文章列表
const articleList = ref([])
const page = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  categoryName: undefined,
  tagName: undefined
})
const getArticleList = () => {
  articleFrontListService(page.value)
    .then((data) => {
      articleList.value = data.list
      page.value.total = data.total
    })
    .catch((err) => {
      page.value.total = 0
      // console.log(err)
    })
}

//跳转
const clickCategory = (category) => {
  if (category != undefined) {
    if (checkCategory(category)) {
      page.value.categoryName = undefined
    } else {
      page.value.categoryName = category.name
    }
  }
  articleList.value = []
  page.value.tagName = undefined
  page.value.currentPage = 1

  router.push({
    path: '/blog/collation',
    query: {
      category: page.value.categoryName,
      tag: page.value.tagName
    }
  })

  getTagList()
  getArticleList()
}
const clickTag = (tag) => {
  if (tag != undefined) {
    if (checkTag(tag)) {
      page.value.tagName = undefined
    } else {
      page.value.tagName = tag.name
    }
  }
  articleList.value = []

  router.push({
    path: '/blog/collation',
    query: {
      category: page.value.categoryName,
      tag: page.value.tagName
    }
  })
  getArticleList()
}

// const current = computed(() => {
//   let temp = router.currentRoute.value.params.name || categoryList.value[0].name
//   return temp
// })
const checkCategory = (category) => {
  return category.name == page.value.categoryName
}
const checkTag = (tag) => {
  return tag.name == page.value.tagName
}

onMounted(async () => {
  await getCategoryList()
  await getTagList()
  page.value.categoryName = router.currentRoute.value.query.category
  page.value.tagName = router.currentRoute.value.query.tag
  getArticleList()
})

const handleCurrentChange = (val) => {
  page.value.currentPage = val
  getArticleList()
}
</script>

<template>
  <div id="blogCategory" class="front-top">
    <el-row>
      <el-col :span="16" :offset="4" class="nav-box box-border">
        <div class="navList underLine">
          <h4>分类：</h4>
          <nav>
            <a
              :class="{
                background: checkCategory(category),
                'btn-primary': checkCategory(category)
              }"
              class="btn"
              @click="clickCategory(category)"
              v-for="category in categoryList"
              :key="category.id"
            >
              <span>{{ category.name }}</span>
              <span>({{ category.count }})</span>
            </a>
          </nav>
        </div>
        <div class="navList">
          <h4>标签：</h4>
          <nav>
            <a
              :class="{ background: checkTag(tag), 'btn-primary': checkTag(tag) }"
              class="btn"
              v-for="tag in tagList"
              :key="tag.id"
              @click="clickTag(tag)"
            >
              <span>{{ tag.name }}</span>
            </a>
          </nav>
        </div>
      </el-col>
      <el-col :span="16" :offset="4">
        <list-card :data="item" v-for="(item, index) in articleList" :key="index"></list-card>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
          style="float: right; margin-bottom: 20px"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
#blogCategory {
  min-height: 100vh;
  .navList {
    // background-color: aliceblue;
    // padding-left: 64px;
    // padding-right: 64px;
    display: flex;
    align-items: baseline;
    padding: 10px;

    > h4 {
      min-width: 50px
      // margin-right: 10px;
    }
    > nav {
      display: flex;
      justify-content: left;
      align-items: center;
      height: fit-content;
      flex-wrap: wrap;
      gap: 5px;
      > a {
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.5s;
        cursor: pointer;
      }
      > a:hover {
        // background-color: #727cf5;
        // color: #ffffff;
        // background-color: #e9e8ea;
      }
      > a[class='background'] {
        background-color: #e9e8ea;
        // color: #fff;
        // background-color: #727cf5;
        border-color: #727cf5;
        // box-shadow: 0 2px 6px 0 rgb(0 0 0  / 50);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
      }
    }
  }
  .nav-box{
    padding: 10px;
    background-color: #ffffff;
    margin-bottom: 50px;

  }
}
.underLine{
  // border-bottom: 1px solid #b1b8bd;
}
</style>
