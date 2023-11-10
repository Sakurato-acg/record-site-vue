<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

//展示表格
const tableData = ref([
  {
    //博文id
    id: '1',
    //标题
    title: 'SpringSecurity从入门到精通',
    //摘要
    summary: 'SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',
    //分类id
    categoryId: '1',
    //状态
    status: '0'
  },
  {
    //博文id
    id: '1',
    //标题
    title: 'SpringSecurity从入门到精通',
    //摘要
    summary: 'SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',
    //分类id
    categoryId: '1',
    //状态
    status: '0'
  },
  {
    //博文id
    id: '1',
    //标题
    title: 'SpringSecurity从入门到精通',
    //摘要
    summary: 'SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',
    //分类id
    categoryId: '1',
    //状态
    status: '0'
  },
  {
    //博文id
    id: '1',
    //标题
    title: 'SpringSecurity从入门到精通',
    //摘要
    summary: 'SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',
    //分类id
    categoryId: '1',
    //状态
    status: '0'
  }
])

//弹窗 + 添加数据
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
const router = useRouter()
const add = () => {
  dialog.value.dialogFormVisible = true
  router.push('/admin/blog/edit')
}

//检索表格//检索条件重置
const formInline = ref({
  user: '',
  region: ''
})
const onSubmit = () => {
  formInline.value = {
    user: '',
    region: ''
  }
}

//布局
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
}
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
}
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
<template>
  <div class="articleView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="70px"
          label-position="right"
          class="demo-form-inline"
        >
          <el-form-item label="标题">
            <el-input v-model="formInline.user" placeholder="请输入博文标题"></el-input>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input v-model="formInline.user" placeholder="请输入摘要"></el-input>
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
      <el-button type="primary" plain @click="add()">
        <el-icon>
          <component is="plus"></component>
        </el-icon>
        添加
      </el-button>
      <el-button type="danger" plain>
        <el-icon>
          <component is="delete"></component>
        </el-icon>
        删除
      </el-button>
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
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="summary" label="摘要" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 0">{{ '可用' }}</el-tag>
            <el-tag type="danger" v-else>{{ '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="router.push('/blog/edit')">修改</el-button>
            <!-- <el-button @click="update(scope.row);$router.push('/blog/edit')">修改</el-button> -->
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
        </el-pagination
      ></el-config-provider>
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
  background-color: white;
  padding: 20px;
}
</style>
