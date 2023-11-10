<template>
  <div class="table-outer">
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" fit>
      <slot name="table-item"></slot>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="avatar" label="头像"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="role" label="用户角色"> </el-table-column>
      <el-table-column prop="phonenumber" label="电话"></el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" size="small" -->
          <!-- >查看</el-button -->
          <!-- > -->
          <!-- <el-button type="danger" size="small">编辑</el-button> -->
          <el-button @click="update(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteSingle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
    //以上都是布局
  },

  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
  background-color: #eeeeee; /*滚动条的背景颜色*/
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
  background-color: rgb(145, 143, 143); /*滚动条的背景颜色*/
}
::-webkit-scrollbar {
  display: block;
}
/* .table-outer {
  background-color: rgb(255, 255, 255);
  padding: 10px;
} */
.el-pagination {
  margin-top: 25px;
}
</style>
