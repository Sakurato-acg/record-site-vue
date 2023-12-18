<script setup>
import { onMounted, ref } from 'vue'
import {
  menuListService,
  menuInfoService,
  menuSelectService,
  menuUpdateService,
  menuAddService,
  menuDeleteService,
} from '../../api/system/menu'

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
  getMenuList()
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getMenuList()
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
//筛选相关
const searchform = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  path: undefined,
  name: undefined,
  component: undefined,
  meta: undefined,
  menuType: undefined,
  visible: undefined,
  perms: undefined,
  remark: undefined
})
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    path: undefined,
    name: undefined,
    component: undefined,
    meta: undefined,
    menuType: undefined,
    visible: undefined,
    perms: undefined,
    remark: undefined
  }
  getMenuList()
}

const tableData = ref([])

const getMenuList = () => {
  menuListService(searchform.value)
    .then((data) => {
      ElMessage.success('查询成功')

      tableData.value = data.list
      searchform.value.total = data.total
    })
    .catch((error) => {
      tableData.value = undefined
      searchform.value.total = 0
    })
}
const onSubmit = () => {
  getMenuList()
}

onMounted(() => {
  getMenuList()
})

//增
const addForm = ref({
  dialogFormVisible: false,
  formLabelWidth: '100px',
  avatarVisible: false,
  menuOptions: [],
  form: {
    parentId: 0,
    menuType: 'C',
    icon: undefined,
    name: undefined,
    orderNum: 1,
    path: undefined,
    component: undefined,
    perms: undefined,
    visible: 0
  }
})
const openAddForm = (row) => {
  changeAddFormVisable()
  menuSelectService()
    .then((data) => {
      let temp = [
        {
          value: 0,
          label: '根目录',
          children: tree(data)
        }
      ]
      addForm.value.menuOptions = temp
    })
    .catch((error) => {
      changeAddFormVisable()
    })
}
const changeAddFormVisable = () => {
  addForm.value.dialogFormVisible = !addForm.value.dialogFormVisible
}

const cancleAdd = () => {
  changeAddFormVisable()
  addForm.value.form = {
    parentId: 0,
    menuType: 'C',
    icon: undefined,
    name: undefined,
    orderNum: 1,
    path: undefined,
    component: undefined,
    perms: undefined,
    visible: 0
  }
}
const add = () => {
  //api
  menuAddService(addForm.value.form)
    .then((data) => {
      changeAddFormVisable()
      getMenuList()
    })
    .catch((error) => {
      console.log(error)
    })
}

//删
const deleteMenu = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        menuDeleteService(id)
          .then((data) => {
            getMenuList()
          })
          .catch((err) => {})
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          menuDeleteService(deleteIds)
            .then((data) => {
              getMenuList()
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
    id: undefined,
    parentId: undefined
    // avatar: undefined,
    // userName: undefined,
    // email: undefined,
    // roleId: undefined,
    // status: undefined,
    // url: undefined
  }
})
const openUpdateForm = (row) => {
  changeUpdateFormVisable()
  menuInfoService(row.id)
    .then((data) => {
      // updateForm.value.form.parentId = data.parentId
      updateForm.value.form = data
    })
    .catch((error) => {
      changeUpdateFormVisable()
    })
  menuSelectService()
    .then((data) => {
      let temp = [
        {
          value: 0,
          label: '根目录',
          children: tree(data)
        }
      ]
      updateForm.value.menuOptions = temp
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
  menuUpdateService(updateForm.value.form)
    .then((data) => {
      changeUpdateFormVisable()
      getMenuList()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<template>
  <div class="menuView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="70px"
          label-position="right"
          class="demo-form-inline"
          @keyup.enter="getMenuList()"
        >
          <!--名称-->
          <el-form-item label="名称">
            <el-input v-model="searchform.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <!--访问路径-->
          <el-form-item label="访问路径">
            <el-input v-model="searchform.path" placeholder="请输入访问路径"></el-input>
          </el-form-item>
          <!--组件路径-->
          <el-form-item label="组件路径">
            <el-input v-model="searchform.component" placeholder="请输入组件路径"></el-input>
          </el-form-item>
          <!--路径名称-->
          <el-form-item label="路径名称">
            <el-input v-model="searchform.meta" placeholder="请输入路径名称"></el-input>
          </el-form-item>
          <!--权限标识-->
          <el-form-item label="权限标识">
            <el-input v-model="searchform.perms" placeholder="请输入权限标识"></el-input>
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注">
            <el-input v-model="searchform.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <!--类型-->
          <el-form-item label="类型">
            <el-select v-model="searchform.menuType" placeholder="类型">
              <el-option label="目录" value="M"></el-option>
              <el-option label="菜单" value="C"></el-option>
            </el-select>
          </el-form-item>
          <!--可见-->
          <el-form-item label="可见">
            <el-select v-model="searchform.visible" placeholder="可见">
              <el-option label="显示" value="0"></el-option>
              <el-option label="隐藏" value="1"></el-option>
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

            <el-button type="danger" plain @click="deleteMenu()">
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
        fit
        border
        table-layout="auto"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        default-expand-all
        row-key="id"
      >
        <!---->
        <!--选择框-->
        <el-table-column type="selection" align="center"></el-table-column>
        <!--序号-->
        <el-table-column type="index" label="序号" align="center" :index="indexMethod">
        </el-table-column>
        <!--图标-->
        <el-table-column label="图标" prop="icon" align="center">
          <template #default="props">
            <el-icon>
              <component :is="props.row.icon"></component>
            </el-icon>
          </template>
        </el-table-column>
        <!--名称-->
        <el-table-column prop="name" label="名称" align="center"> </el-table-column>
        <!--类型-->
        <el-table-column prop="menuType" label="类型" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.menuType == 'C'">{{ '菜单' }}</el-tag>
            <el-tag v-else-if="scope.row.menuType == 'M'">{{ '目录' }}</el-tag>
          </template>
        </el-table-column>
        <!--可见-->
        <el-table-column prop="visible" label="可见" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.visible == 0">{{ '显示' }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.visible == 1">{{ '隐藏' }}</el-tag>
          </template>
        </el-table-column>
        <!--权限标识-->
        <el-table-column prop="perms" label="权限标识" align="center"> </el-table-column>
        <!--访问路径-->
        <el-table-column prop="path" label="访问路径" align="center"></el-table-column>
        <!--组件路径-->
        <el-table-column prop="component" label="组件路径" align="center"> </el-table-column>
        <!--header路径-->
        <!-- <el-table-column prop="meta" label="meta/title" align="center"> </el-table-column> -->
        <!--排序-->
        <el-table-column prop="orderNum" label="排序" align="center"> </el-table-column>

        <!--操作-->
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openUpdateForm(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteMenu(scope.row.id)">删除</el-button>
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
            <!--上级菜单-->
            <el-form-item label="上级">
              <el-tree-select
                v-model="updateForm.form.parentId"
                :data="updateForm.menuOptions"
                :render-after-expand="false"
                :default-expand-all="true"
                show-checkbox
                :check-strictly="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
            <!--菜单类型-->
            <el-form-item label="类型">
              <el-radio-group v-model="updateForm.form.menuType">
                <el-radio label="C">菜单</el-radio>
                <el-radio label="M">目录</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--图标-->
            <el-form-item label="图标">
              <el-input v-model="updateForm.form.icon" placeholder="图标" />
              <el-icon size="24px" style="margin-left: 20px">
                <component :is="updateForm.form.icon"></component>
              </el-icon>
            </el-form-item>
            <!--名称-->
            <el-form-item label="名称">
              <el-input v-model="updateForm.form.name" placeholder="名称" />
            </el-form-item>
            <!--显示排序-->
            <el-form-item label="显示排序">
              <el-input-number
                v-model="updateForm.form.orderNum"
                :min="1"
                controls-position="right"
                size="default"
              />
            </el-form-item>
            <!--路由地址-->
            <el-form-item label="路由地址">
              <el-input v-model="updateForm.form.path" placeholder="路由地址" />
            </el-form-item>
            <!--组件路径-->
            <el-form-item label="组件路径" v-if="updateForm.form.menuType == 'C'">
              <el-input v-model="updateForm.form.component" placeholder="组件路径" />
            </el-form-item>
            <!--权限字符-->
            <el-form-item label="权限字符">
              <el-input v-model="updateForm.form.perms" placeholder="权限字符" />
            </el-form-item>
            <!--显示状态-->
            <el-form-item label="显示状态">
              <el-radio-group v-model="updateForm.form.visible">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">隐藏</el-radio>
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
            <!--上级菜单-->
            <el-form-item label="上级">
              <el-tree-select
                v-model="addForm.form.parentId"
                :data="addForm.menuOptions"
                :render-after-expand="false"
                :default-expand-all="true"
                show-checkbox
                :check-strictly="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
            <!--菜单类型-->
            <el-form-item label="类型">
              <el-radio-group v-model="addForm.form.menuType">
                <el-radio label="C">菜单</el-radio>
                <el-radio label="M">目录</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--图标-->
            <el-form-item label="图标">
              <el-input v-model="addForm.form.icon" placeholder="图标" />
              <el-icon size="24px" style="margin-left: 20px">
                <component :is="addForm.form.icon"></component>
              </el-icon>
            </el-form-item>
            <!--名称-->
            <el-form-item label="名称">
              <el-input v-model="addForm.form.name" placeholder="名称" />
            </el-form-item>
            <!--显示排序-->
            <el-form-item label="显示排序">
              <el-input-number
                v-model="addForm.form.orderNum"
                :min="1"
                controls-position="right"
                size="default"
              />
            </el-form-item>
            <!--路由地址-->
            <el-form-item label="路由地址">
              <el-input v-model="addForm.form.path" placeholder="路由地址" />
            </el-form-item>
            <!--组件路径-->
            <el-form-item label="组件路径" v-if="addForm.form.menuType == 'C'">
              <el-input v-model="addForm.form.component" placeholder="组件路径" />
            </el-form-item>
            <!--权限字符-->
            <el-form-item label="权限字符">
              <el-input v-model="addForm.form.perms" placeholder="权限字符" />
            </el-form-item>
            <!--显示状态-->
            <el-form-item label="显示状态">
              <el-radio-group v-model="addForm.form.visible">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">隐藏</el-radio>
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
  padding: 20px;
}
.table-outer {
  .el-input {
    --el-input-width: 300px;
  }
}
</style>
