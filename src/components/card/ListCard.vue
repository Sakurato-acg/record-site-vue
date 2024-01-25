<script setup>
import { computed } from 'vue'
import router from '../../router'

const props = defineProps(['data'])

const date = computed(() => {
  let temp = new Date(props.data.createTime)
  console.log(temp.getMonth())
  return temp.getFullYear() + '年' + (temp.getMonth() + 1) + '月' + temp.getDate() + '日'
})
</script>
<template>
  <div class="listcard" v-if="data != undefined" @click="router.push('/blog/article/' + data.id)">
    <!--标题-->
    <div class="title">
      <!--链接-->
      <!-- <router-link to="/think/漫画《旅程》.html">{{ data.title }}</router-link> -->
      <el-link>{{ data.title }}</el-link>
    </div>
    <div class="info">
      <div class="user">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
          />
        </svg>
        <span>{{ data.author.userName }}</span>
      </div>
      <div class="time">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
          />
        </svg>
        <span>{{ date }}</span>
      </div>
      <div class="category">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
          ></path>
        </svg>
        <a>
          {{ data.category.name }}
        </a>
      </div>
      <div class="tag">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          />
        </svg>
        <a v-for="(tag, index) in data.tags" :key="index">
          {{ tag.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.listcard {
  margin-bottom: 20px;
  //   background-color: rgb(71, 253, 193);
  width: 100%;
  overflow: hidden;
  padding: 16px 20px;
  border-radius: 0.25rem;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  background-color: #fff;
  cursor: pointer;
  .title {
    a {
      // font-size: 20.48px;
      line-height: 46px;
      font-size: 18px;
      // line-height: 30px;
    }
  }
  .info {
    margin-top: 10px;
    color: #7f7f7f;
    fill: #7f7f7f;
    font-size: 15px;
    svg {
      float: left;
      padding-right: 5px;
    }
    span {
      float: left;
    }
    > div {
      float: left;
      display: flex;
      align-items: center;
      margin-right: 15px;
    }
    .tag,
    .category {
      a {
        padding: 0 5px 0 0;
        color: #7f7f7f;
      }
      a:hover {
        color: #3eaf7c;
      }
    }
  }
}
.listcard:hover {
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
