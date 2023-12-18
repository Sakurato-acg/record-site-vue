<script setup>
import { onMounted, ref } from 'vue'
import {
  roleSelectService,
  roleListService,
  roleInfoService,
  roleUpdateService,
  roleDeleteService
} from '../../api/system/role'

//中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
const locale = ref(zhCn)

//布局
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
//换表格项数量
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  searchform.value.pageSize = val
  getRoleList()
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getRoleList()
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
  roleName: undefined,
  roleKey: undefined,
  status: undefined
})
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    roleName: undefined,
    roleKey: undefined,
    status: undefined
  }
  getRoleList()
}

const tableData = ref([])
const defaultProps = {
  children: 'children',
  label: 'label'
}
const getRoleList = () => {
  roleListService(searchform.value)
    .then((data) => {
      ElMessage.success('查询成功')
      tableData.value = data.list
      searchform.value.total = data.total
    })
    .catch((error) => {
      tableData.value = undefined
      searchform.value.total = 0
      console.log(error)
    })
}
const onSubmit = () => {
  getRoleList()
}
const roleSelectList = ref([])
const getRoleSelectList = () => {
  roleSelectService()
    .then((data) => {
      roleSelectList.value = data
    })
    .catch((error) => {})
}

const tree = (data) => {
  let arr = []
  for (let i = 0; i < data.length; i++) {
    let temp = {}
    temp.id = data[i].id
    temp.label = data[i].name
    if (data[i].children != undefined) {
      temp.children = tree(data[i].children)
    }
    arr.push(temp)
  }
  return arr
}
onMounted(() => {
  getRoleList()
  getRoleSelectList()
})

//增

//删
const deleteRole = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        roleDeleteService(id)
          .then((data) => {
            getRoleList()
          })
          .catch((err) => {})
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          roleDeleteService(deleteIds)
            .then((data) => {
              getRoleList()
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
  menuList: [],
  form: {
    id: undefined,
    roleName: undefined,
    roleKey: undefined,
    status: undefined,
    remark: undefined,
    menuList: []
  }
})
const tree_select = ref()

const openUpdateForm = (row) => {
  changeUpdateFormVisable()
  roleInfoService(row.id)
    .then((data) => {
      updateForm.value.form = data
      updateForm.value.menuList = tree(data.menuList)
      updateForm.value.form.menuList = []

      let ids = []
      for (let i = 0; i < row.menuList.length; i++) {
        if (row.menuList[i].children != undefined) {
          for (let j = 0; j < row.menuList[i].children.length; j++) {
            ids.push(row.menuList[i].children[j].id)
          }
        }
        ids.push(row.menuList[i].id)
      }

      tree_select.value.setCheckedKeys(ids, false)
    })
    .catch((error) => {
      changeUpdateFormVisable()
    })
}
const cancleUpdate = () => {
  changeUpdateFormVisable()
  updateForm.value.form = {
    id: undefined,
    avatar: undefined,
    userName: undefined,
    email: undefined,
    roleName: undefined,
    status: undefined,
    url: undefined
  }
}
const changeUpdateFormVisable = () => {
  updateForm.value.dialogFormVisible = !updateForm.value.dialogFormVisible
}
const update = () => {
  updateForm.value.form.menuList = tree_select.value
    .getHalfCheckedKeys()
    .concat(tree_select.value.getCheckedKeys())

  roleUpdateService(updateForm.value.form)
    .then((data) => {
      changeUpdateFormVisable()
      getRoleList()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<template>
  <div class="roleView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="70px"
          label-position="right"
          class="demo-form-inline"
        >
          <!--角色-->
          <el-form-item label="角色">
            <el-select v-model="searchform.roleName" placeholder="选择角色">
              <el-option
                :label="item.roleName"
                :value="item.roleName"
                v-for="(item, index) in roleSelectList"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--权限字符-->
          <el-form-item label="权限字符">
            <el-input v-model="searchform.roleKey" placeholder="请输入权限字符"></el-input>
          </el-form-item>

          <!--角色状态-->
          <el-form-item label="角色状态">
            <el-select v-model="searchform.status" placeholder="角色状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <!--操作-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="clearSearch">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" plain @click="deleteRole()">
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

      <!--  筛选按钮
      <el-popover placement="left-start" title="列筛选" trigger="click" style="float: right">
        <el-checkbox-group
          v-model="checkList"
          @change="columnFilter"
          style="display: flex; flex-direction: column"
        >
          <el-checkbox v-for="item in tableList" :label="item.title" :key="item.title"
            >{{ item.title }}
          </el-checkbox>
        </el-checkbox-group>
        <template #reference>
          <el-button>
            <el-icon>
              <component is="menu"></component>
            </el-icon>
          </el-button>
        </template>
      </el-popover> -->
    </div>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        fit
        border
        table-layout="auto"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <div style="margin: 10px 30px">
              <h3 style="margin: 10px">权限</h3>
              <el-tree
                :data="tree(scope.row.menuList)"
                :props="defaultProps"
                :default-expand-all="true"
              />
            </div>
          </template>
        </el-table-column>
        <!--选择框-->
        <el-table-column type="selection" align="center"></el-table-column>
        <!--序号-->
        <el-table-column type="index" label="序号" align="center" :index="indexMethod">
        </el-table-column>

        <!--角色名称-->
        <el-table-column prop="roleName" label="角色名称" align="center"> </el-table-column>
        <!--角色权限字符-->
        <el-table-column prop="roleKey" label="角色权限" align="center"> </el-table-column>
        <!--状态-->
        <el-table-column prop="status" label="角色状态" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 0">{{ '正常' }}</el-tag>
            <el-tag type="danger" v-else>{{ '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openUpdateForm(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
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
        <el-dialog title="修改角色" v-model="updateForm.dialogFormVisible" widt="50%" align-center>
          <el-form :model="updateForm.form" :label-width="updateForm.formLabelWidth" :inline="true">
            <!--角色名字-->
            <el-form-item label="角色名字" width="90px">
              <el-input v-model="updateForm.form.roleName" placeholder="角色名字"></el-input>
            </el-form-item>
            <!--角色权限-->
            <el-form-item label="角色权限">
              <el-input v-model="updateForm.form.roleKey" placeholder="角色权限"></el-input>
            </el-form-item>
            <!--角色备注-->
            <el-form-item label="角色备注">
              <el-input v-model="updateForm.form.remark" placeholder="角色备注"></el-input>
            </el-form-item>
            <!--角色状态-->
            <el-form-item label="角色状态">
              <el-select v-model="updateForm.form.status" placeholder="角色状态">
                <el-option label="正常" :value="0"></el-option>
                <el-option label="禁用" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <hr />
            <!--权限-->
            <el-form-item label="权限">
              <el-tree
                ref="tree_select"
                node-key="id"
                :data="updateForm.menuList"
                :props="defaultProps"
                :render-after-expand="false"
                :default-expand-all="true"
                show-checkbox
                highlight-current
                :check-strictly="true"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="cancleUpdate()">取 消</el-button>
              <el-button type="primary" @click="update()">确 定</el-button>
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
  padding: 20px;
}
.table-outer {
  .el-input {
    --el-input-width: 208px;
  }
}
</style>
