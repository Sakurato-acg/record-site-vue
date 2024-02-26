<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {
  articleAdminDetailService,
  articleAddService,
  articleUpdateService,
  articleDeleteService
} from '../../api/blog/article'
import { categorySelectListService } from '../../api/blog/category'
import { tagSelectListService } from '../../api/blog/tag'
import { uploadMdService, uploadImageService } from '../../api/system/upload'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
let goback = () =>
  setTimeout(() => {
    router.back()
  }, 2000)

// 加载
const loading = ref(false)

const handleSubmit = () => {
  //提交表单
}
const handleSave = () => {
  //保存到草稿箱
}

//上传列表 ,文件上传相关
const fileList = ref([])
const beforeUpload = (file) => {
  // 判断是否大于2M
  const size = file.size / 1024 / 1024 < 200
  if (!size) {
    ElMessage.error('最大200MB')
    return false
  }
  if (file.type != 'application/zip') {
    ElMessage.error('仅支持zip格式')
    return false
  }
  if (fileList.value.length > 1) {
    ElMessage.error('仅支持上传一个zip文件')
    return false
  }
  fileList.value.push(file)
}
const handleUpload = async (params) => {
  let file = new FormData()
  file.append('multipartFile', fileList.value[0])
  loading.value = true

  await uploadMdService(file)
    .then((data) => {
      fileList.value = []
      article.value.content = data.content
      article.value.fileList = data.fileList
    })
    .catch((error) => {
      console.log(error)
      fileList.value = []
    })
  loading.value = false
}

//表单
const article = ref({
  content: undefined,
  createTime: undefined,
  id: undefined,
  isTop: 0,
  status: 0,
  tagIds: [],
  title: undefined,
  viewCount: 0,
  categoryId: undefined,
  fileList: []
})
const categoryList = ref([])
const tagList = ref([])

//上传图片
const onUploadImg = async (files, callback) => {
  // console.log(files)

  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        uploadImageService('article', form)
          .then((data) => rev(data))
          .catch((error) => rej(error))
      })
    })
  )

  callback(
    res.map((data) => {
      data.fileList.map((file) => {
        article.value.fileList.push(file)
      })
      return data.url
    })
  )
}

//查询文章
onBeforeMount(() => {
  article.value.id = router.currentRoute.value.params.id
  if (article.value.id != -1 && article.value.id != undefined && article.value.id != '') {
    //文章详情
    articleAdminDetailService(article.value.id)
      .then((data) => {
        article.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //分类列表
  categorySelectListService()
    .then((data) => {
      categoryList.value = data
    })
    .catch((error) => {
      console.log(error)
    })
  //标签列表
  tagSelectListService()
    .then((data) => {
      tagList.value = data
    })
    .catch((error) => {
      console.log(error)
    })
})

// 保存文章
const submit = () => {
  // console.log(article.value)
  articleAddService(article.value)
    .then((data) => {
      goback()
      clearTimeout(goback)
    })
    .catch((error) => {
      console.log(error)
    })
}

//更新文章
const update = () => {
  articleUpdateService(article.value)
    .then((data) => {
      goback()
      clearTimeout(goback)
    })
    .catch((error) => {
      console.log(error)
    })
}

//删除文章
//删
const deleteArticle = () => {
  ElMessageBox.confirm('数据将要删除,是否继续', '提示', {
    type: 'warning',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(() => {
      if (article.value.id > 0) {
        articleDeleteService(article.value.id)
          .then((data) => {
            goback()
            clearTimeout(goback)
          })
          .catch((err) => {
            log.error(err)
          })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

//markdown展示
// const value = ref('# Axios\n## 起步\### 介绍\n```bash\nnpm install axios\n```')
// const getHtml = (html) => {
//   console.log(html)
// }
</script>
<template>
  <!-- 指定一个容器 -->
  <div class="adminAtricleEditView" v-loading="loading">
    <div class="tableHeader">
      <el-row>
        <el-col>
          <el-form
            :inline="true"
            :model="article"
            label-width="70px"
            label-position="right"
            style="background-color: white; padding: 10px"
          >
            <el-col>
              <!--分类-->
              <el-form-item label="分类">
                <el-select v-model="article.categoryId" placeholder="请选择">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <!--标签-->
              <el-form-item label="标签" style="align-items: center">
                <el-select
                  v-model="article.tagIds"
                  placeholder="请选择"
                  filterable
                  allow-create
                  multiple
                >
                  <el-option
                    v-for="tag in tagList"
                    :key="tag.id"
                    :label="tag.name"
                    :value="tag.id"
                  />
                </el-select>
              </el-form-item>
              <!--置顶-->
              <el-form-item label="置顶">
                <el-select v-model="article.isTop" placeholder="是否置顶">
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <!--状态-->
              <el-form-item label="状态" style="margin-right: 10px">
                <el-select v-model="article.status" placeholder="文章状态">
                  <el-option label="发布" :value="1"></el-option>
                  <el-option label="草稿" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--文章标题-->
            <el-form-item label="文章标题" prop="title" style="width: 100%">
              <el-input v-model="article.title" placeholder="请输入文章标题" maxlength="30" />
            </el-form-item>
            <br />
            <el-form-item label="外部导入">
              <el-upload
                style="width: 50%"
                :drag="true"
                :multiple="false"
                :show-file-list="true"
                accept="application/zip"
                :before-upload="beforeUpload"
                :http-request="handleUpload"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖拽文件或<em>点击上传</em></div>
                <template #tip>
                  <div class="el-upload__tip">支持通过zip导入md文档</div>
                </template>
              </el-upload>
              <div class="example">
                <img src="@/assets/edit/zip.jpg" alt="" />
                <span>picture文件夹为md文件里的图片，上传后替换为服务器图片路径</span>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="tableMain">
      <div class="flex">
        <el-text type="primary">
          建议使用其他编辑器编写文本，如Typora。这里用于纯文本和微调<br />直接粘贴的话图片不会上传</el-text
        >
        <div>
          <el-button v-if="article.id > 0" type="primary" plain @click="update()">
            <el-icon>
              <component is="plus"></component>
            </el-icon>
            更新
          </el-button>
          <el-button v-else type="primary" plain @click="submit()">
            <el-icon>
              <component is="plus"></component>
            </el-icon>
            保存
          </el-button>
          <el-button type="danger" plain @click="deleteArticle()">
            <el-icon>
              <component is="delete"></component>
            </el-icon>
            删除
          </el-button>
        </div>
      </div>
      <MdEditor
        v-model="article.content"
        theme="light"
        :show-code-row-number="true"
        previewTheme="default"
        code-theme="paraiso"
        :showToolbarName="true"
        @onUploadImg="onUploadImg"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tableHeader {
  background-color: white;
  padding: 20px 20px 0;
  .example {
    flex: 1;
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px dashed #dcdfe6;
  }
}
.tableMain {
  background-color: white;
  padding: 0 20px 40px;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
}
.table-outer {
  .el-input {
    --el-input-width: 300px;
  }
}
// .vditor {
// padding: 10px;
// background-color: white;
// }
// .Edit-form {
//   display: flex;
//   flex-wrap: wrap;
// }
</style>
<!-- 
       

 -->
