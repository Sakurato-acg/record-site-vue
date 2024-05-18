<script setup>
import { ref } from 'vue'

const props = defineProps({
  layout: Boolean
})

const src = ref('https://lain.bgm.tv/r/400/pic/cover/l/73/26/110467_Fx9tT.jpg')
</script>
<template>
  <div class="anime-card box-border" :class="{ 'anime-card-ms': layout }">
    <!--左边-->
    <el-image
      class="left"
      :src="src"
      lazy
      fit="cover"
      :zoom-rate="1.2"
      :preview-src-list="[src]"
      :initial-index="0"
      :preview-teleported="true"
      :hide-on-click-modal="true"
    >
    </el-image>
    <!--右边-->
    <div class="right">
      <!--标题-->
      <div class="title">
        <div class="cn-name">白箱</div>
        <div class="jp-name">SHIROBAKO</div>
      </div>
      <!--基本信息-->
      <div class="info">
        <div class="year">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>2014-7</span>
        </div>
        <div class="type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>番剧</span>
        </div>
        <div class="status">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>看完</span>
        </div>
      </div>
      <!--标签-->
      <div class="tag">
        <!-- <span>P.A.WORKS</span> -->
        <!-- <span>原创</span> -->
        <!-- <span>励志</span> -->
        <span>白箱</span>
        <span>2014年10月</span>
        <!-- <span>动画制作</span> -->
        <!-- <span>TV</span> -->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.anime-card {
  display: flex;
  width: 100%;
  // max-width: 420px;
  // max-width: 480px;
  min-height: 180px;
  border-radius: 10px;
  // box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  background-color: #f9f8f9;
  overflow: hidden;
  transition: all 0.5s;

  .left {
    flex: 0 0 35%;
  }
  .right {
    flex: 0 0 65%;
    overflow: hidden;
    padding: 10px;
    // padding: 40px;
    .title {
      font-weight: 700;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.5;
      .cn-name {
        font-size: 18px;
        color: #1a1523;
      }
      .jp-name {
        font-size: 12px;
        color: #6f6e77;
      }
    }
    .info {
      padding: 8px 0;
      color: #6f6e77;
      display: flex;
      align-items: center;
      justify-content: left;
      flex-wrap: wrap;
      line-height: 1.5;
      > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 10px;
        > span {
          font-size: 14px;
          margin-left: 5px;
        }
      }
      svg {
        width: 16px;
      }
    }
    .tag {
      width: 100%;
      // max-height: 20%;
      display: inline-flex;
      overflow: hidden;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 8px;
      > span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        line-height: 1;
        background-color: #ffe5e5;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        color: #cd2b31;
      }
    }
  }
  // @media screen and (max-width: 992px) {
  //   .left {
  //     flex: 0 0 40%;
  //   }
  //   .right {
  //     flex: 0 0 60%;
  //   }
  // }
}
.anime-card-ms {
  // padding: 20px;
  height: 240px;
  .left {
    flex: 0 0 100%;
  }
  .right {
    display: none;
  }
}
</style>
