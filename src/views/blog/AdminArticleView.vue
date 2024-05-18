<script setup>
import { onMounted, ref } from 'vue'
import { articleAdminListService, articleDeleteService } from '../../api/blog/article'
import { categorySelectListService } from '../../api/blog/category'
import { tagSelectListService } from '../../api/blog/tag'

//中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../../router'
const locale = ref(zhCn)

//布局
const tableRowClassName = ({ row, rowIndex }) => {
  // console.log(row)
  // if (row.parentId == 0) {
  //   return 'success-row'
  // }
  // return ''
}
//换表格项数量
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  searchform.value.pageSize = val
  getArticleList()
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getArticleList()
}

const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const indexMethod = (index) => {
  return (index += (searchform.value.currentPage - 1) * searchform.value.pageSize + 1)
}

const tree = (data) => {
  let arr = []
  for (let i = 0; i < data.length; i++) {
    let temp = {}
    temp.value = data[i].id
    temp.label = data[i].name
    if (data[i].children != undefined) {
      temp.children = tree(data[i].children)
    }
    arr.push(temp)
  }
  return arr
}

//查
const searchform = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  title: undefined,
  author: undefined,
  categoryId: undefined,
  tagIds: undefined,
  isTop: undefined,
  status: undefined
})
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    title: undefined,
    author: undefined,
    categoryId: undefined,
    isTop: undefined,
    status: undefined
  }
  getArticleList()
}
const tableData = ref([])
const selectList = ref({
  category: [],
  tags: []
})

const getArticleList = () => {
  console.log(searchform.value)
  articleAdminListService(searchform.value)
    .then((data) => {
      tableData.value = data.list
      searchform.value.total = data.total
    })
    .catch((error) => {
      tableData.value = undefined
      searchform.value.total = 0
    })
}
const onSubmit = () => {
  getArticleList()
}
const getFlag = (data) => {
  let temp = true
  for (let i = 0; i < data.tags.length; i++) {
    if (data.tags[i].status == 1) {
      temp = false
      break
    }
  }

  return data.status == 1 && data.category.status == 0 && data.author.status == 0 && temp
}

const getSelectList = () => {
  categorySelectListService()
    .then((data) => {
      selectList.value.category = data
    })
    .catch((error) => {
      ElMessage.error(error)
    })
  tagSelectListService()
    .then((data) => {
      selectList.value.tags = data
    })
    .catch((error) => {
      ElMessage.error(error)
    })
}

onMounted(() => {
  getArticleList()
  getSelectList()
})

//增
const openAddForm = () => {
  router.push('/admin/blog/edit/-1')
}

//删
const deleteArticle = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        articleDeleteService(id)
          .then((data) => {
            getArticleList()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          articleDeleteService(deleteIds)
            .then((data) => {
              getArticleList()
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          ElMessage.error('未选择要删除的行')
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

//更
const openEdit = (row) => {
  router.push('/admin/blog/edit/' + row.id)
}
</script>
<template>
  <div class="adminAtricleView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="70px"
          label-position="right"
          class="demo-form-inline"
          @keyup.enter="getArticleList()"
        >
          <!--文章标题-->
          <el-form-item label="文章标题">
            <el-input v-model="searchform.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <!--文章作者-->
          <el-form-item label="文章作者">
            <el-input v-model="searchform.author" placeholder="请输入文章作者"></el-input>
          </el-form-item>
          <br />
          <!--状态-->
          <el-form-item label="状态" style="margin-right: 10px">
            <el-select v-model="searchform.status" placeholder="文章状态">
              <el-option label="发布" value="1"></el-option>
              <el-option label="草稿" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!--置顶-->
          <el-form-item label="置顶">
            <el-select v-model="searchform.isTop" placeholder="是否置顶">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>

          <!--文章分类-->
          <el-form-item label="文章分类">
            <el-select v-model="searchform.categoryId" placeholder="分类">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in selectList.category"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--文章标签-->
          <el-form-item label="文章标签">
            <el-select v-model="searchform.tagIds" placeholder="标签" multiple>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in selectList.tags"
                :key="index"
              />
            </el-select>
          </el-form-item>

          <br />
          <!--操作-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="clearSearch">重置</el-button>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" plain @click="openAddForm()">
              <el-icon>
                <component is="plus"></component>
              </el-icon>
              添加
            </el-button>

            <el-button type="danger" plain @click="deleteArticle()">
              <el-icon>
                <component is="delete"></component>
              </el-icon>
              删除
            </el-button>
          </el-form-item>
        </el-form>

        <!--   <el-button type="primary" plain @click="changeAddFormVisable()">
          <el-icon>
            <component is="plus"></component>
          </el-icon>
          添加
        </el-button> -->
      </el-row>
    </div>
    <div class="tableMain">
      <el-text type="danger" style="float: right">*红色表示封禁或已删除</el-text>

      <el-table
        :data="tableData"
        style="width: 100%"
        fit
        border
        table-layout="auto"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        default-expand-all
        row-key="id"
      >
        <!--选择框-->
        <el-table-column type="selection" align="center"></el-table-column>
        <!--序号-->
        <el-table-column type="index" label="序号" align="center" :index="indexMethod">
        </el-table-column>
        <!--标题-->
        <el-table-column label="标题" prop="title" align="center">
          <template #default="scope">
            <el-link
              v-if="getFlag(scope.row)"
              type="success"
              :href="'/blog/article/' + scope.row.id"
              target="_blank"
            >
              {{ scope.row.title }}
            </el-link>
            <el-link v-else type="danger" disabled>
              {{ scope.row.title }}
            </el-link>
          </template>
        </el-table-column>
        <!--作者-->
        <el-table-column prop="author.nickName" label="作者" align="center">
          <template #default="scope">
            <el-text v-if="scope.row.author.status == 0">{{ scope.row.author.nickName }}</el-text>
            <el-text v-else type="danger">{{ scope.row.author.nickName }}</el-text>
          </template>
        </el-table-column>
        <!--状态-->
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 1">{{ '发布' }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status == 0">{{ '草稿' }}</el-tag>
          </template>
        </el-table-column>
        <!--是否置顶-->
        <el-table-column prop="isTop" label="是否置顶" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.isTop == 1">{{ '置顶' }}</el-tag>
            <el-tag v-else-if="scope.row.isTop == 0">{{ '未置顶' }}</el-tag>
          </template>
        </el-table-column>
        <!--浏览量-->
        <el-table-column prop="viewCount" label="浏览量" align="center"></el-table-column>
        <!--更新时间-->
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <!--分类-->
        <el-table-column prop="category" label="分类" align="center" width="150px">
          <template #default="scope">
            <el-tag v-if="scope.row.category.status == 0">{{ scope.row.category.name }}</el-tag>
            <el-tag v-else-if="scope.row.category.status == 1" type="danger">
              {{ scope.row.category.name }}
            </el-tag>
          </template>
        </el-table-column>
        <!--标签-->
        <el-table-column prop="tags" label="标签" align="center">
          <template #default="scope">
            <div
              v-for="(item, index) in scope.row.tags"
              :key="index"
              style="margin: 5px; float: left"
            >
              <el-tag v-if="item.status == 0">
                {{ item.name }}
              </el-tag>
              <el-tag v-else-if="item.status == 1" type="danger">
                {{ item.name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <!--操作-->
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openEdit(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-config-provider :locale="locale">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchform.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="searchform.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchform.total"
        >
        </el-pagination>
      </el-config-provider>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tableHeader {
  background-color: white;
  padding: 20px 20px 0;
}
.tableMain {
  background-color: white;
  padding: 0 20px 20px;
}
.table-outer {
  .el-input {
    --el-input-width: 300px;
  }
}
</style>
