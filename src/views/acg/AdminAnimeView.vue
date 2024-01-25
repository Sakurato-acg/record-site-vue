<script setup>
import { ref, onMounted } from 'vue'
import {
  animeListService,
  animeAddService,
  animeUpdateService,
  animeDeleteService,
  animeGetByIdService
} from '../../api/acg/anime.js'
import { subjectInfoService } from '../../api/bangumi/bangumi'
import { ElMessage, ElMessageBox } from 'element-plus'

//展示表格
const tableData = ref([])
//获取展示表格数据
const getAnimeList = () => {
  animeListService(searchform.value)
    .then((data) => {
      tableData.value = data.list
      searchform.value.total = data.total
    })
    .catch((err) => {
      console.log(err)
      clearTableData()
    })
}
const clearTableData = () => {
  tableData.value = []
}
onMounted(getAnimeList)

//弹窗 + 添加数据
const addForm = ref({
  dialogFormVisible: false,
  formLabelWidth: '100px',
  form: {
    name: undefined,
    type: '番剧',
    status: '待看',
    year: undefined,
    quarter: undefined,
    picture: undefined,
    url: undefined
  },
  appendToBody: true
})
const changeAddFormVisable = () => {
  addForm.value.dialogFormVisible = !addForm.value.dialogFormVisible
}
const getBangumi = (form) => {
  let url
  if (form.form.url.includes('https://bgm.tv/subject/')) {
    url = form.form.url.substring('https://bgm.tv/subject/'.length)
  } else {
    ElMessage.error('网址有误')
    return
  }
  subjectInfoService(url)
    .then((res) => {
      if (res.status === 200) {
        ElMessage.success('获取成功')
      } else {
        ElMessage.error('服务异常')
      }
      let data = res.data
      form.form.name = data.name_cn
      let date = data.date.split('-')
      /*
      date=2013-01-02
      */
      form.form.year = date[0]
      if (['01', '02', '03'].includes(date[1])) {
        form.form.quarter = 1
      } else if (['04', '05', '06'].includes(date[1])) {
        form.form.quarter = 4
      } else if (['07', '08', '09'].includes(date[1])) {
        form.form.quarter = 7
      } else if (['10', '11', '12'].includes(date[1])) {
        form.form.quarter = 10
      }

      form.form.picture = data.images.large
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
const submitAddForm = () => {
  animeAddService(addForm.value.form)
    .then((data) => {
      changeAddFormVisable()
      getAnimeList()
      clearAddForm()
    })
    .catch((err) => {
      console.log(err)
    })
}
const clearAddForm = () => {
  addForm.value.form = {
    name: undefined,
    type: '番剧',
    status: '待看',
    year: undefined,
    quarter: undefined,
    picture: undefined,
    url: undefined
  }
}
//内部弹窗
const innerDialog = ref({
  visable: false,
  url: 'https://bgm.tv/subject_search'
})
const changeInnerVisible = () => {
  innerDialog.value.visable = !innerDialog.value.visable
}

//修改数据
const updateForm = ref({
  dialogFormVisible: false,
  formLabelWidth: '100px',
  form: {
    id: undefined,
    name: undefined,
    type: undefined,
    status: undefined,
    year: undefined,
    quarter: undefined,
    picture: undefined,
    url: undefined
  },
  appendToBody: true
})
const openUpdateForm = (row) => {
  animeGetByIdService(row.id)
    .then((data) => {
      updateForm.value.form = data
    })
    .catch((err) => {
      ElMessage.error(err)
    })
  changeUpdateFormVisable()
}
const changeUpdateFormVisable = () => {
  updateForm.value.dialogFormVisible = !updateForm.value.dialogFormVisible
}
const submitUpdateForm = () => {
  animeUpdateService(updateForm.value.form)
    .then((data) => {
      clearUpdateForm()
      changeUpdateFormVisable()
      getAnimeList()
    })
    .catch((err) => {
      console.log(err)
    })
}
const clearUpdateForm = () => {
  updateForm.value.form = {
    id: undefined,
    name: undefined,
    type: undefined,
    status: undefined,
    year: undefined,
    quarter: undefined,
    picture: undefined,
    url: undefined
  }
}

//删除番剧
const deleteAnime = (id) => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (id !== undefined) {
        animeDeleteService(id)
          .then((data) => {
            getAnimeList()
          })
          .catch((err) => {})
      } else {
        let deleteIds = []
        if (multipleSelection.value.length > 0) {
          for (let i = 0; i < multipleSelection.value.length; i++) {
            deleteIds.push(multipleSelection.value[i].id)
          }

          animeDeleteService(deleteIds)
            .then((data) => {
              getAnimeList()
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
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

/**
 *
 *
 */
//查询番剧数据
const searchform = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  name: undefined,
  type: undefined,
  status: undefined,
  year: undefined,
  quarter: undefined
})
const getYear = () => {
  let year = []
  let nowYear = new Date().getFullYear()
  for (let index = 2000; index <= nowYear; index++) {
    year.unshift(index)
  }
  return year
}
const onSubmit = () => {
  getAnimeList()
}
const clearSearch = () => {
  searchform.value = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    name: undefined,
    type: undefined,
    status: undefined,
    year: undefined,
    quarter: undefined
  }
  getAnimeList()
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
const indexMethod = (index) => {
  return (index += (searchform.value.currentPage - 1) * searchform.value.pageSize + 1)
}
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  searchform.value.pageSize = val
  getAnimeList()
}
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  searchform.value.currentPage = val
  getAnimeList()
}
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
<template>
  <div class="animeView">
    <div class="tableHeader">
      <el-row>
        <el-form
          :inline="true"
          :model="searchform"
          label-width="40px"
          label-position="right"
          class="demo-form-inline"
        >
          <!--番剧名字-->
          <el-form-item label="番名">
            <el-input v-model="searchform.name" placeholder="请输入番名"></el-input>
          </el-form-item>
          <!--类型-->
          <el-form-item label="类型">
            <el-select v-model="searchform.type" placeholder="请选择番剧类型">
              <el-option label="番剧" value="番剧"></el-option>
              <el-option label="剧场版" value="剧场版"></el-option>
              <el-option label="番外" value="番外"></el-option>
            </el-select>
          </el-form-item>
          <!--状态-->
          <el-form-item label="状态">
            <el-select v-model="searchform.status" placeholder="进度状态">
              <el-option label="待看" value="待看"></el-option>
              <el-option label="看完" value="看完"></el-option>
              <el-option label="在看" value="在看"></el-option>
            </el-select>
          </el-form-item>
          <!--年度-->
          <el-form-item label="年份">
            <el-select v-model="searchform.year" placeholder="选择年度">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in getYear()"
                :key="index"
              >
              </el-option>
              <el-option label="更早" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--季度-->
          <el-form-item label="季度">
            <el-select v-model="searchform.quarter" placeholder="选择季度">
              <el-option label="一月番" value="1"></el-option>
              <el-option label="四月番" value="4"></el-option>
              <el-option label="七月番" value="7"></el-option>
              <el-option label="十月番" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="searchform.name" placeholder="请选择标签"></el-input>
          </el-form-item>
          <!--排序规则-->
          <el-form-item label="排序">
            <el-select v-model="searchform.quarter" placeholder="选择季度">
              <el-option label="一月番" value="1"></el-option>
              <el-option label="四月番" value="4"></el-option>
              <el-option label="七月番" value="7"></el-option>
              <el-option label="十月番" value="10"></el-option>
            </el-select>
          </el-form-item>
          <!--操作-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="clearSearch()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="changeAddFormVisable()">
          <el-icon>
            <component is="plus"></component>
          </el-icon>
          添加
        </el-button>
        <el-button type="danger" plain @click="deleteAnime()">
          <el-icon>
            <component is="delete"></component>
          </el-icon>
          删除
        </el-button>
      </el-row>
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
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="name" label="番名" align="center"> </el-table-column>
        <el-table-column prop="picture" label="封面" align="center" width="150px">
          <template #default="scope">
            <el-image
              :src="scope.row.picture"
              fit="fill"
              lazy
              :zoom-rate="1.2"
              :preview-src-list="[scope.row.picture]"
              :initial-index="0"
              :preview-teleported="true"
              :hide-on-click-modal="true"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center"> </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.status == '待看'">{{ scope.row.status }}</el-tag>
            <el-tag type="success" v-else-if="scope.row.status='看完'">{{ scope.row.status }}</el-tag>
            <el-tag type="primary" v-else-if="scope.row.status='在看'">{{ scope.row.status }}</el-tag>
            <!-- <el-tag type="success" v-if="scope.row.status == 0">{{ '可用' }}</el-tag> -->
            <!-- <el-tag type="danger" v-else>{{ '禁用' }}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="year" label="年份" align="center"></el-table-column>
        <el-table-column prop="quarter" label="时间(按季度分)" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="openUpdateForm(scope.row)">修改</el-button>
            <!-- <el-button @click="update(scope.row);$router.push('/blog/edit')">修改</el-button> -->
            <el-button type="danger" @click="deleteAnime(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog title="编辑番剧" v-model="addForm.dialogFormVisible" width="50%" align-center>
        <el-form :model="addForm" :label-width="addForm.formLabelWidth" :inline="true">
          <!--番剧名字-->
          <el-form-item label="番剧名字">
            <el-input v-model="addForm.form.name" placeholder="番剧名字"></el-input>
          </el-form-item>
          <!--番剧类型-->
          <el-form-item label="番剧类型">
            <el-select v-model="addForm.form.type" placeholder="番剧类型">
              <el-option label="番剧" value="番剧"></el-option>
              <el-option label="剧场版" value="剧场版"></el-option>
              <el-option label="番外" value="番外"></el-option>
            </el-select>
          </el-form-item>
          <!--状态-->
          <el-form-item label="番剧状态">
            <el-select v-model="addForm.form.status" placeholder="进度状态">
              <el-option label="待看" value="待看"></el-option>
              <el-option label="看完" value="看完"></el-option>
              <el-option label="在看" value="在看"></el-option>
            </el-select>
          </el-form-item>
          <!--年度-->
          <el-form-item label="番剧年份">
            <el-select v-model="addForm.form.year" placeholder="番剧年代">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in getYear()"
                :key="index"
              >
              </el-option>
              <el-option label="更早" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--季度-->
          <el-form-item label="番剧季度">
            <el-select v-model="addForm.form.quarter" placeholder="番剧所处的季度（几月番）">
              <el-option label="一月番" :value="1"></el-option>
              <el-option label="四月番" :value="4"></el-option>
              <el-option label="七月番" :value="7"></el-option>
              <el-option label="十月番" :value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="addForm.form.name" placeholder="请选择标签"></el-input>
          </el-form-item>

          <!--bangumi网址-->
          <el-form-item label="bangumi网址" class="bangumiUrl">
            <el-input
              placeholder="https://bgm.tv/subject/{id}"
              v-model="addForm.form.url"
              clearable
              style="margin-right: 50px"
            >
            </el-input>
            <el-button style="background-color: #727cf5; color: #fff" @click="changeInnerVisible()">
              打开bangumi
            </el-button>
            <el-button style="background-color: #727cf5; color: #fff" @click="getBangumi(addForm)">
              获取信息
            </el-button>
          </el-form-item>
          <br />
          <el-form-item label="番剧封面" style="width: 50%" class="bangumiPic">
            <p style="width: 80%; text-align: center">{{ addForm.form.name }}</p>
            <!-- <img
              :src="updateData.picture"
              alt=""
              style="width: 80%; height: 300px; object-fit: contain"
            /> -->
            <el-image
              :src="addForm.form.picture"
              fit="fill"
              lazy
              :zoom-rate="1.2"
              :preview-src-list="[addForm.form.picture]"
              :initial-index="0"
              :preview-teleported="true"
              :hide-on-click-modal="true"
            >
            </el-image>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="changeAddFormVisable()">取 消</el-button>
            <el-button type="primary" @click="submitAddForm()">确 定</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog title="修改番剧" v-model="updateForm.dialogFormVisible" width="50%" align-center>
        <el-form :model="updateForm" :label-width="updateForm.formLabelWidth" :inline="true">
          <!--番剧名字-->
          <el-form-item label="番剧名字">
            <el-input v-model="updateForm.form.name" placeholder="番剧名字"></el-input>
          </el-form-item>
          <!--番剧类型-->
          <el-form-item label="番剧类型">
            <el-select v-model="updateForm.form.type" placeholder="番剧类型">
              <el-option label="番剧" value="番剧"></el-option>
              <el-option label="剧场版" value="剧场版"></el-option>
              <el-option label="番外" value="番外"></el-option>
            </el-select>
          </el-form-item>
          <!--状态-->
          <el-form-item label="番剧状态">
            <el-select v-model="updateForm.form.status" placeholder="进度状态">
              <el-option label="待看" value="待看"></el-option>
              <el-option label="看完" value="看完"></el-option>
              <el-option label="在看" value="在看"></el-option>
            </el-select>
          </el-form-item>
          <!--年度-->
          <el-form-item label="番剧年份">
            <el-select v-model="updateForm.form.year" placeholder="番剧年代">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in getYear()"
                :key="index"
              >
              </el-option>
              <el-option label="更早" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--季度-->
          <el-form-item label="番剧季度">
            <el-select v-model="updateForm.form.quarter" placeholder="番剧所处的季度（几月番）">
              <el-option label="一月番" :value="1"></el-option>
              <el-option label="四月番" :value="4"></el-option>
              <el-option label="七月番" :value="7"></el-option>
              <el-option label="十月番" :value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="updateForm.form.name" placeholder="请选择标签"></el-input>
          </el-form-item>

          <!--bangumi网址-->
          <el-form-item label="bangumi网址" class="bangumiUrl">
            <el-input
              placeholder="https://bgm.tv/subject/{id}"
              v-model="updateForm.form.url"
              clearable
              style="margin-right: 50px"
            >
            </el-input>
            <el-button style="background-color: #727cf5; color: #fff" @click="changeInnerVisible()">
              打开bangumi
            </el-button>
            <el-button
              style="background-color: #727cf5; color: #fff"
              @click="getBangumi(updateForm)"
            >
              获取信息
            </el-button>
          </el-form-item>
          <br />
          <el-form-item label="番剧封面" style="width: 50%" class="bangumiPic">
            <p style="width: 80%; text-align: center">{{ updateForm.form.name }}</p>
            <!-- <img
              :src="updateData.picture"
              alt=""
              style="width: 80%; height: 300px; object-fit: contain"
            /> -->
            <el-image
              :src="updateForm.form.picture"
              fit="fill"
              lazy
              :zoom-rate="1.2"
              :preview-src-list="[updateForm.form.picture]"
              :initial-index="0"
              :preview-teleported="true"
              :hide-on-click-modal="true"
              style="width: 85%"
            >
            </el-image>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="changeUpdateFormVisable()">取 消</el-button>
            <el-button type="primary" @click="submitUpdateForm()">确 定</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog
        v-model="innerDialog.visable"
        width="50%"
        title="Inner Dialog"
        :append-to-body="addForm.appendToBody"
        class="innerDialog"
      >
        <iframe :src="innerDialog.url" style="width: 100%; height: 60vh"> </iframe>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="less" scoped>
// ::-webkit-scrollbar {
//   display: block !important;
// }
.tableMain {
  background-color: rgb(255, 255, 255);
  padding: 10px;
}

.tableHeader {
  background-color: white;
  padding: 20px;
}

.table-outer {
  .el-input {
    --el-input-width: 208px;
  }
}
</style>
<style lang="less">
.bangumiUrl {
  @media screen and (max-width: 768px) {
    .el-input.el-input--suffix {
      width: 100%;
    }
  }
}
.bangumiPic {
  .el-form-item__content {
    justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .innerDialog {
    --el-dialog-width: 100% !important;
  }
}
</style>
