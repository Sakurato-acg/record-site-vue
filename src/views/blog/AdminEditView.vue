<script setup>
import { ref } from 'vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//检索表单
const form = ref({
  title: '',
  categoryId: '',
  tags: '',
  summary: '',
  isComment: true,
  isTop: true,
  //缩略图
  thumbnail: '',
  content: ''
})

const handleSubmit = () => {
  //提交表单
}
const handleSave = () => {
  //保存到草稿箱
}

//上传列表 ,文件上传相关
const fileList = ref([])
const categoryList = ref([])
const tagList = ref([])
const aId = ref(-1)
const beforeUpload = (file) => {
  // 判断图片是否大于2M
  const isLt2M = file.size / 1024 / 1024 < 2
  // const fileType = file.name.substring(file.name.lastIndexOf('.')+1)
  // 判断图片的类型
  const isJpg =
    file.type == 'image/jpeg' ||
    file.type == 'image/jpg' ||
    file.type == 'image/png' ||
    file.type == 'image/gif'
  if (!isJpg) {
    this.$message.error('只能上传jpg, jpeg, png, gif格式的图片！')
    return false
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 2MB!')
    return false
  }
}
const handleUpload = (img) => {
  form.value.thumbnail = 'https://avatars.githubusercontent.com/u/106546816?v=4'
  fileList.value.push({
    name: img.file.name,
    url: 'https://avatars.githubusercontent.com/u/106546816?v=4'
  })
}
const onExceed = () => {}
const fileRemove = () => {
  //文件移除时
}

//markdown展示
const value = ref('# Axios\n## 起步\### 介绍\n```bash\nnpm install axios\n```')
</script>
<template>
  <!-- 指定一个容器 -->
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      style="background-color: white; padding: 10px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入文章标题" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分类">
            <el-select v-model="form.categoryId" placeholder="请选择">
              <el-option
                v-for="category in categoryList"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-select v-model="form.tags" placeholder="请选择" multiple>
              <el-option v-for="tag in tagList" :key="tag.id" :label="tag.name" :value="tag.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章摘要">
            <el-input v-model="form.summary" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="允许评论">
            <el-radio-group v-model="form.isComment">
              <el-radio :key="'0'" :label="'0'">正常</el-radio>
              <el-radio :key="'1'" :label="'1'">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否置顶">
            <el-radio-group v-model="form.isTop">
              <el-radio :key="'0'" :label="'0'">是</el-radio>
              <el-radio :key="'1'" :label="'1'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" />

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="缩略图">
            <el-upload
              class="upload-demo"
              action="upload"
              :before-upload="beforeUpload"
              :on-remove="fileRemove"
              :file-list="fileList"
              list-type="picture"
              name="img"
              :limit="1"
              :http-request="handleUpload"
              :on-exceed="onExceed"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" size="default" @click="handleSubmit">
              {{ aId ? '更新' : '发布' }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!aId" type="info" @click="handleSave">保存到草稿箱 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <mavon-editor
            v-model="value"
            :subfield="true"
            defaultOpen="preview"
            :toolbarsFlag="true"
            fontSize="20px"
            :ishljs="true"
            :navigation="true"
            previewBackground="#fff"
          >
          </mavon-editor>
        </el-col>
      </el-row>
    </el-form>

    <el-button @click="get()">内容</el-button>
    <!-- <ArticleDetail></ArticleDetail> -->
  </div>
</template>

<style lang="less">
.vditor {
  padding: 10px;
  background-color: white;
}
// .Edit-form {
//   display: flex;
//   flex-wrap: wrap;
// }
</style>
