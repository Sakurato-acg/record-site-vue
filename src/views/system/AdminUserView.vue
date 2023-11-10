<script setup>
import { ref } from 'vue'

//中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)

//检索表单
const formInline = ref({ user: '', region: '' })

//展示表单的数据
const tableData = ref([
  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',
    createTime: '2022-01-05 09:01:56',
    delFlag: 0,
    email: '23412332@qq.com',
    id: '1',
    password: '$2a$10$Jnq31rRkNV3RNzXe0REsEOSKaYK8UgVZZqlNlNXqn.JeVcj2NdeZy',
    phonenumber: '18888888888',
    sex: '0',
    status: '0',
    type: '1',
    updateBy: '1',
    updateTime: '2022-01-30 15:37:03',
    userName: 'sg'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',
    createTime: '2022-01-05 13:28:43',
    delFlag: 0,
    id: '3',
    password: '$2a$10$ydv3rLkteFnRx9xelQ7elOiVhFvXOooA98xCqk/omh7G94R.K/E3O',
    sex: '0',
    status: '0',
    type: '1',
    phonenumber: '18888888888',

    updateTime: '2022-01-05 13:28:43',
    userName: 'test'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',

    createTime: '2023-03-28 16:34:44',
    delFlag: 0,
    email: '23412332@qq.com',
    id: '4',
    password: '$2a$10$kY4T3SN7i4muBccZppd2OOkhxMN6yt8tND1sF89hXOaFylhY2T3he',
    phonenumber: '19098790742',
    sex: '0',
    status: '0',
    type: '1',
    updateTime: '2023-03-28 16:34:46',
    userName: 'lpl'
  },

  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',

    createTime: '2022-01-06 03:51:13',
    delFlag: 0,
    id: '5',
    password: '',
    phonenumber: '18246845873',
    sex: '1',
    status: '0',
    type: '1',
    updateTime: '2022-01-06 07:00:50',
    userName: 'sg2233'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',

    createTime: '2022-01-16 06:54:26',
    delFlag: 0,
    email: '2312321',
    id: '6',
    password: '$2a$10$Jnq31rRkNV3RNzXe0REsEOSKaYK8UgVZZqlNlNXqn.JeVcj2NdeZy',
    phonenumber: '17777777777',
    sex: '0',
    status: '1',
    type: '1',
    updateTime: '2022-01-16 07:06:34',
    userName: 'sangeng'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/106546816?v=4',

    createBy: '-1',
    createTime: '2023-03-29 16:32:34',
    delFlag: 0,
    email: '2858534773@qq.com',
    id: '7',
    password: '$2a$10$qIPjkQjdvj/pl3wH46jzGOG52br4W1u/o8enUVXAggozq3gy669nG',
    sex: '0',
    status: '0',
    type: '1',
    updateBy: '1',
    updateTime: '2023-04-02 17:14:11',
    userName: '2120400146'
  }
])
//新增表单
const dialog = ref({
  dialogFormVisible: false,
  formLabelWidth: '120px',
  form: {
    avatar: '',
    userName: '',
    role: '',
    phonenumber: '',
    status: ''
  }
})

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
}
//切换当前页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
}

const onSubmit = () => {}
</script>
<template>
  <div class="userView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="70px"
          label-position="left"
          class="demo-form-inline"
        >
          <el-form-item label="用户名">
            <el-input v-model="formInline.user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.user" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="用户状态">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-button type="primary" plain @click="dialog.dialogFormVisible = true">
        <i class="el-icon-plus"></i>
        添加
      </el-button>
      <el-button type="danger" plain>
        <i class="el-icon-delete"></i>
        删除
      </el-button>
      <!-- 筛选按钮
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
    <div class="table-outer">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        fit
        border
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"> </el-table-column>
        <el-table-column prop="avatar" label="头像" width="90px" align="center">
          <template #default="scope">
            <el-avatar :size="80" shape="square" fit="fit" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"> </el-table-column>
        <el-table-column prop="role" label="用户角色" align="center"> </el-table-column>
        <el-table-column prop="phonenumber" label="电话" align="center"> </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 0">{{ '可用' }}</el-tag>
            <el-tag type="danger" v-else>{{ '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"> </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="update(scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteSingle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-config-provider :locale="locale">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-config-provider>
    </div>
    <div class="floatWindow">
      <div class="dialog">
        <el-dialog title="添加用户" v-model="dialog.dialogFormVisible">
          <el-form :model="dialog.form">
            <el-form-item label="头像" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.avatar"></el-input>
            </el-form-item>

            <el-form-item label="用户名" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.userName"></el-input>
            </el-form-item>

            <el-form-item label="用户角色" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.role"></el-input>
            </el-form-item>

            <el-form-item label="电话" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.phonenumber"></el-input>
            </el-form-item>

            <el-form-item label="状态" :label-width="dialog.formLabelWidth">
              <el-switch v-model="dialog.form.avatar"> </el-switch>
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialog.dialogFormVisible = false">确 定</el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style lang="less">
// ::-webkit-scrollbar {
//   display: block !important;
// }
// .table-outer {
//   background-color: rgb(255, 255, 255);
//   padding: 10px;
// }
.tableHeader {
  //   background-color: #bbddeb;
  background-color: white;
  padding: 20px;
  // border-bottom: 1px solid black;
}
</style>
