<script setup>
import { onMounted, ref } from 'vue'
import { userListService, userDeleteService, userUpdateService } from '../../api/system/user'
import { userInfoService } from '../../api/auth/user'
import { roleSelectService } from '../../api/system/role'

//中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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
  getUserList()
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getUserList()
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
  userName: undefined,
  nickName: undefined,
  email: undefined,
  status: undefined,
  type: undefined,
  roleName: undefined
})
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    userName: undefined,
    nickName: undefined,
    email: undefined,
    status: undefined,
    type: undefined,
    roleName: undefined
  }
  getUserList()
}

const tableData = ref([])

const getUserList = () => {
  userListService(searchform.value)
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
  getUserList()
}
const roleSelectList = ref([])
const getRoleList = () => {
  roleSelectService()
    .then((data) => {
      roleSelectList.value = data
    })
    .catch((error) => {})
}

onMounted(() => {
  getUserList()
  getRoleList()
})

//增

//删
const deleteUser = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        userDeleteService(id)
          .then((data) => {
            getUserList()
          })
          .catch((err) => {})
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          userDeleteService(deleteIds)
            .then((data) => {
              getUserList()
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
  form: {
    id: undefined,
    avatar: undefined,
    userName: undefined,
    nickName: undefined,
    email: undefined,
    roleId: undefined,
    status: undefined,
    url: undefined
  }
})
const openUpdateForm = (row) => {
  changeUpdateFormVisable()
  userInfoService(row.id)
    .then((data) => {
      updateForm.value.form = data
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
    nickName: undefined,
    email: undefined,
    roleName: undefined,
    status: undefined,
    url: undefined
  }
}
const changeUpdateFormVisable = () => {
  updateForm.value.dialogFormVisible = !updateForm.value.dialogFormVisible
}
const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
  updateForm.value.form.avatar = file.url
  updateForm.value.avatarVisible = true
}
const update = () => {
  //api
  userUpdateService(updateForm.value.form)
    .then((data) => {
      changeUpdateFormVisable()
      getUserList()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<template>
  <div class="userView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="60px"
          label-position="right"
          class="demo-form-inline"
        >
          <!--用户名-->
          <el-form-item label="用户名">
            <el-input v-model="searchform.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!--昵称-->
          <el-form-item label="昵称">
            <el-input v-model="searchform.nickName" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <!--邮箱-->
          <el-form-item label="邮箱">
            <el-input v-model="searchform.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
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
          <!--状态-->
          <el-form-item label="状态">
            <el-select v-model="searchform.status" placeholder="账号状态">
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
            <el-button type="danger" plain @click="deleteUser()">
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
        :row-class-name="tableRowClassName"
        fit
        border
        @selection-change="handleSelectionChange"
      >
        <!--选择框-->
        <el-table-column type="selection" align="center"></el-table-column>
        <!--序号-->
        <el-table-column type="index" label="序号" align="center" :index="indexMethod">
        </el-table-column>
        <!--头像-->
        <el-table-column prop="avatar" label="头像" width="90px" align="center">
          <template #default="scope">
            <el-avatar :size="80" shape="square" fit="fit" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <!--用户名-->
        <el-table-column prop="userName" label="用户名" align="center" width="130px">
        </el-table-column>
        <!--昵称-->
        <el-table-column prop="nickName" label="昵称" align="center" width="130px">
        </el-table-column>
        <!--邮箱-->
        <el-table-column prop="email" label="邮箱" align="center" width="170px"> </el-table-column>
        <!--用户角色-->
        <el-table-column prop="role" label="用户角色" align="center" width="100px">
          <template #default="scope">
            <el-tag v-if="scope.row.role.status == 0">{{ scope.row.role.roleName }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.role.status == 1">{{
              scope.row.role.roleName
            }}</el-tag>
            <el-tag type="danger" v-else>未设置</el-tag>
          </template>
        </el-table-column>
        <!--状态-->
        <el-table-column prop="status" label="账户状态" align="center" width="100px">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 0">{{ '正常' }}</el-tag>
            <el-tag type="danger" v-else>{{ '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <!--个人地址-->
        <el-table-column prop="url" label="用户个人地址" align="center">
          <template #default="scope">
            <el-link type="success" :href="scope.row.url" target="_blank">{{
              scope.row.url
            }}</el-link>
          </template>
        </el-table-column>

        <!--创建时间-->
        <el-table-column prop="createTime" label="创建时间" align="center"> </el-table-column>
        <!--操作-->
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openUpdateForm(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
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
        <el-dialog title="修改用户" v-model="updateForm.dialogFormVisible" widt="50%" align-center>
          <el-form :model="updateForm.form" :label-width="updateForm.formLabelWidth" :inline="true">
            <!--头像地址,之后完善图片上传-->
            <!-- <el-form-item label="头像地址">
              <el-input v-model="updateForm.form.avatar" placeholder="头像地址"></el-input>
            </el-form-item> -->
            <!--头像显示-->
            <el-form-item label="头像" width="90px">
              <el-avatar :size="80" shape="square" fit="fit" :src="updateForm.form.avatar">
              </el-avatar>
            </el-form-item>
            <hr />
            <!--用户名-->
            <el-form-item label="用户名">
              <el-input v-model="updateForm.form.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <!--昵称-->
            <el-form-item label="昵称">
              <el-input v-model="updateForm.form.nickName" placeholder="用户名"></el-input>
            </el-form-item>
            <!--邮箱-->
            <el-form-item label="邮箱">
              <el-input v-model="updateForm.form.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <!--账户状态-->
            <el-form-item label="账户状态">
              <el-select v-model="updateForm.form.status" placeholder="账户状态">
                <el-option label="正常" :value="0"></el-option>
                <el-option label="禁用" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <!--个人地址-->
            <el-form-item label="个人地址">
              <el-input v-model="updateForm.form.url" placeholder="个人地址"></el-input>
            </el-form-item>
            <!--用户角色-->
            <el-form-item label="角色">
              <el-select v-model="updateForm.form.roleId" placeholder="选择角色">
                <el-option
                  :label="item.roleName"
                  :value="item.id"
                  v-for="(item, index) in roleSelectList"
                  :key="index"
                >
                </el-option>
              </el-select>
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
