<script setup>
import { onMounted, ref } from 'vue'

import {
  categoryAdminListService,
  categoryAddService,
  categoryInfoService,
  categoryUpdateService,
  categoryDeleteService
} from '../../api/blog/category'
//中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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
  getCategoryList()
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getCategoryList()
}

const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const indexMethod = (index) => {
  return (index += (searchform.value.currentPage - 1) * searchform.value.pageSize + 1)
}

//查
//筛选相关
const searchform = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  name: undefined,
  status: undefined
})
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    name: undefined,
    status: undefined
  }
  getCategoryList()
}

const tableData = ref([])

const getCategoryList = () => {
  categoryAdminListService(searchform.value)
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
  getCategoryList()
}

onMounted(() => {
  getCategoryList()
})

//增
const addForm = ref({
  dialogFormVisible: false,
  formLabelWidth: '100px',
  avatarVisible: false,
  form: {
    name: undefined,
    status: 0
  }
})
const openAddForm = (row) => {
  changeAddFormVisable()
}
const changeAddFormVisable = () => {
  addForm.value.dialogFormVisible = !addForm.value.dialogFormVisible
}

const cancleAdd = () => {
  changeAddFormVisable()
  addForm.value.form = {
    name: undefined,
    status: undefined
  }
}
const add = () => {
  //api
  categoryAddService(addForm.value.form)
    .then((data) => {
      changeAddFormVisable()
      getCategoryList()
    })
    .catch((error) => {
      console.log(error)
    })
}

//删
const deleteCategory = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        categoryDeleteService(id)
          .then((data) => {
            getCategoryList()
          })
          .catch((err) => {})
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          categoryDeleteService(deleteIds)
            .then((data) => {
              getCategoryList()
            })
            .catch((err) => {})
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
const updateForm = ref({
  dialogFormVisible: false,
  formLabelWidth: '100px',
  avatarVisible: false,
  menuOptions: [],
  form: {
    name: undefined,
    status: undefined
  }
})
const openUpdateForm = (row) => {
  changeUpdateFormVisable()
  categoryInfoService(row.id)
    .then((data) => {
      updateForm.value.form = data
    })
    .catch((error) => {
      changeUpdateFormVisable()
    })
}
const cancleUpdate = () => {
  changeUpdateFormVisable()
  updateForm.value.form = {}
}
const changeUpdateFormVisable = () => {
  updateForm.value.dialogFormVisible = !updateForm.value.dialogFormVisible
}

const update = () => {
  //api
  categoryUpdateService(updateForm.value.form)
    .then((data) => {
      changeUpdateFormVisable()
      getCategoryList()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<template>
  <div class="categoryView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="70px"
          label-position="right"
          class="demo-form-inline"
          @keyup.enter="getCategoryList()"
        >
          <!--分类名-->
          <el-form-item label="分类名">
            <el-input v-model="searchform.name" placeholder="请输入分类名"></el-input>
          </el-form-item>
          <!--分类状态-->
          <el-form-item label="分类状态">
            <el-select v-model="searchform.status" placeholder="分类状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--操作-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="clearSearch">重置</el-button>
          </el-form-item>
          <!--添加|删除-->
          <el-form-item>
            <el-button type="primary" plain @click="openAddForm()">
              <el-icon>
                <component is="plus"></component>
              </el-icon>
              添加
            </el-button>

            <el-button type="danger" plain @click="deletCategory()">
              <el-icon>
                <component is="delete"></component>
              </el-icon>
              删除
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="tableMain">
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
        <!--分类名-->
        <el-table-column label="分类名" prop="name" align="center"></el-table-column>
        <!--分类状态-->
        <el-table-column prop="status" label="分类状态" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 0">{{ '正常' }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status == 1">{{ '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <!--文章数量-->
        <el-table-column label="文章数量" prop="count" align="center"></el-table-column>

        <!--操作-->
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openUpdateForm(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteCategory(scope.row.id)">删除</el-button>
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
    <div class="table-outer">
      <div class="dialog">
        <el-dialog title="修改" v-model="updateForm.dialogFormVisible" widt="50%" align-center>
          <el-form
            :model="updateForm.form"
            :label-width="updateForm.formLabelWidth"
            :inline="false"
          >
            <!--分类名-->
            <el-form-item label="分类名">
              <el-input v-model="updateForm.form.name" placeholder="请输入分类名" />
            </el-form-item>
            <!--分类状态-->
            <el-form-item label="分类状态">
              <el-radio-group v-model="updateForm.form.status">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="cancleUpdate()">取 消</el-button>
              <el-button type="primary" @click="update()">确 定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog title="添加" v-model="addForm.dialogFormVisible" widt="50%" align-center>
          <el-form :model="addForm.form" :label-width="addForm.formLabelWidth" :inline="false">
            <!--分类名-->
            <el-form-item label="分类名">
              <el-input v-model="addForm.form.name" placeholder="请输入分类名" />
            </el-form-item>
            <!--分类状态-->
            <el-form-item label="分类状态">
              <el-radio-group v-model="addForm.form.status">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="cancleAdd()">取 消</el-button>
              <el-button type="primary" @click="add()">确 定</el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tableHeader {
  background-color: white;
  padding: 20px;
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
