<script setup>
import { ref, toRefs } from 'vue'
import { getLocationService } from '../../api/tool'
const props = defineProps({
  data: Object
})
const { data } = toRefs(props)
const submitData = {
  parentId: data.value.parentId == -1 ? data.value.id : data.value.parentId,
  recoverId: data.value.id,
  articleId: data.value.articleId
}
const layout = ref(false)
const changeLayout = () => {
  layout.value = !layout.value
}

// const getLocation = (ip) => {
//   getLocationService(ip)
//     .then((data) => {
//       console.log(data.data.adcode.n)
//       return data.data.adcode.n
//     })
//     .catch((error) => {})
// }
</script>
<template>
  <div class="comment-info">
    <div class="top">
      <div class="avatar">
        <el-avatar size="large" :src="data.avatar" />
      </div>
      <div class="name">
        <a v-if="data.url != ''" :href="data.url">{{ data.createBy }}</a>
        <a v-else>{{ data.createBy }}</a>
        <span v-if="data.recoverUsername != ''" style="margin-left: 5px">
          回复
          <span style="margin-left: 5px">{{ data.recoverUsername }}</span>
        </span>
      </div>
    </div>
    <div class="mid">
      <p>{{ data.content }}</p>
    </div>
    <div class="bottom">
      <!--点赞-->
      <div class="dianzan">
        <svg
          data-v-79ba69ea=""
          focusable="false"
          viewBox="0 0 1024 1024"
          fill="currentColor"
          width="14"
          height="14"
          aria-hidden="true"
        >
          <g>
            <path
              d="M474.1731 112c-18.9701 0-36.1608 11.1725-43.8642 28.5082L280.1358 478.456A48 48 0 0 0 276 497.9478V911c0 26.5097 21.4903 48.0048 48 48.0048h436.252-.5357c61.3753.6784 113.8776-43.9592 123.0806-104.6476l51.798-337.8707c5.4294-35.7783-5.103-72.0607-28.7977-99.3154l-.7141-.8142c-23.4316-26.4793-57.1259-41.6043-92.483-41.513l-.6771.0041H634.802l.001-102.1987C634.803 183.9272 562.8878 112 474.173 112zm28.3009 102.514.506.2474c21.2353 10.5943 35.823 32.5364 35.823 57.8879v150.199c0 26.5097 21.4903 48 48 48l225.5324-.0008.2727-.0023c7.9422-.0903 15.5267 3.3143 20.7399 9.311a27.109 27.109 0 0 1 6.3445 21.855l-51.7987 337.8756c-2.0178 13.3058-13.3664 23.0703-26.6996 23.1177H372V508.131l130.474-293.617z"
            ></path>
            <path
              d="m223.832 445.012.6254.0078c-68.3137-1.209-126.8272 52.9355-136.0247 120.9665A48 48 0 0 0 88 572.4172v263.3314a48 48 0 0 0 .4327 6.431l.2898 2.0287c9.9457 66.0991 66.8558 114.9731 133.686 114.7918l1.2675-.0141 100.324.0002c26.5097 0 48-21.4903 48-48v-417.974l-.0064-.7937c-.424-26.1436-21.749-47.2062-47.9936-47.2062l-100.168-.0003zm-2.1548 95.9942.5068-.0062 1.424.0123L276 541.012v321.974l-52.392.0002-.4247.0019-1.0148.012c-18.4628.0497-34.3058-12.9072-38.0996-30.7884L184 831.879V576.243l.1115-.5453c4.0676-19.3121 20.8022-34.351 37.5657-34.6915z"
            ></path>
          </g>
        </svg>
        <span v-if="data.likeCount != 0">{{ data.likeCount }}</span>
        <span v-else>点赞</span>
      </div>
      <!--回复-->
      <div class="huifu">
        <svg
          data-v-79ba69ea=""
          focusable="false"
          viewBox="0 0 1024 1024"
          fill="currentColor"
          width="14"
          height="14"
          aria-hidden="true"
        >
          <g>
            <path
              d="M815 164H209c-79.529 0-144 64.471-144 144v406.2857l.0193 2.3813C66.2909 795.0977 130.2663 858.2857 209 858.2857l35.549-.0007.001 20.1563c0 44.1827 35.8172 80 80 80h.797a80.04 80.04 0 0 0 41.9912-12.4044L505.965 858.285l309.035.0007c79.529 0 144-64.471 144-144V308c0-79.529-64.471-144-144-144zm-606 96h606c26.5097 0 48 21.4903 48 48v406.2857c0 26.5097-21.4903 48-48 48H492.05l-.649.0044a48 48 0 0 0-25.0239 7.4382L340.549 849.377l.001-39.0913c0-26.5097-21.4903-48-48-48H209c-26.5097 0-48-21.4903-48-48V308c0-26.5097 21.4903-48 48-48z"
            ></path>
            <path
              d="M313 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L361 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L265 541v-59c0-26.5097 21.4903-48 48-48zM513 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L561 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L465 541v-59c0-26.5097 21.4903-48 48-48zM711 434c26.2446 0 47.5697 21.0627 47.9936 47.2062L759 482v59c0 26.5097-21.4903 48-48 48-26.2446 0-47.5697-21.0627-47.9936-47.2062L663 541v-59c0-26.5097 21.4903-48 48-48z"
            ></path>
          </g>
        </svg>
        <span v-if="layout == false" @click="changeLayout()">回复</span>
        <span v-else @click="changeLayout()">取消回复</span>
      </div>
      <!--其他信息-->
      <div class="info">
        <span>发布于 {{ data.createTime }}</span>
        <!-- <span>{{ data.location }}</span> -->
      </div>
    </div>
    <comment-leave v-if="layout == true" :data="submitData"> </comment-leave>
    <div class="childen" v-if="data.children != undefined && data.children.length > 0">
      <comment-info
        v-for="(item, index) in data.children"
        :key="index"
        :data="data.children[index]"
        class="childenComment"
      >
      </comment-info>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comment-info {
  margin-top: 10px;
  padding: 10px;

  // border-bottom: 1px solid #dcd8d8;
  .top {
    display: flex;
    align-items: center;
    justify-content: left;
    .name {
      margin-left: 15px;
      a {
        font-size: 18px;
      }
      a:hover {
        color: #32ca99;
      }
    }
  }
  .mid {
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 70px;
  }
  .bottom {
    margin-left: 70px;
    display: flex;
    flex-wrap: wrap-reverse;
    align-items: center;
    justify-content: left;
    color: #999999;
    .dianzan,
    .huifu {
      display: flex;
      margin-right: 20px;
      align-items: center;
      cursor: pointer;
    }
    .dianzan:hover,
    .huifu:hover {
      color: #32ca99;
    }
    @media screen and (max-width: 425px) {
      .dianzan,
      .huifu {
        margin-top: 10px;
      }
    }
    .info {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
  .childen {
    margin-left: 30px;
    background: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #dcdfeb;
  }
  .active {
    color: #32ca99;
  }
}
</style>
