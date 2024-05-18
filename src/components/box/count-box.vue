<!--无用组价-->
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  data: Object
})
const { data } = toRefs(props)
</script>

<template>
  <div class="count-box" v-if="data.count == undefined || data.count == null">
    <div type="danger" class="count-box-name" style="color: red;">
      分类
      <!-- <br> -->
      [{{ data.name }}]
      <!-- <br> -->
      封禁或删除
    </div>
  </div>

  <div class="count-box" v-else>
    <div class="count-box-name">{{ data.name }}</div>
    <div class="count-box-count">
      {{ data.count }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.count-box {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d0d1d3;
  padding: 5px;
  .count-box-count {
    min-width: 30px;
    padding: 2px;
    border-radius: 10px;
    background-color: #3eaf7c;
    color: white;
  }
}
</style>
